import { z } from "zod";
import { getClient } from "../context.js";
import { RunReportSchema, QueryDatasetSchema } from "../types.js";

export const reportsTools = [
  {
    name: "bamboohr_list_reports",
    description:
      "List all saved reports available in BambooHR (both standard and custom).",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/reports/custom");
    },
  },
  {
    name: "bamboohr_run_report",
    description:
      "Run a specific BambooHR report by ID and return the data. Format defaults to JSON.",
    inputSchema: {
      type: "object" as const,
      properties: {
        reportId: { type: "string", description: "Report ID from bamboohr_list_reports" },
        format: {
          type: "string",
          enum: ["JSON", "CSV", "XLS", "XML", "PDF"],
          description: "Response format (default: JSON)",
        },
        fd: {
          type: "string",
          description: "Optional filter string",
        },
      },
      required: ["reportId"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: z.infer<typeof RunReportSchema>) {
      const client = getClient();
      const parsed = RunReportSchema.parse(input);
      return client.get(`/reports/${parsed.reportId}`, {
        format: parsed.format ?? "JSON",
        ...(parsed.fd ? { fd: parsed.fd } : {}),
      });
    },
  },
  {
    name: "bamboohr_list_datasets",
    description:
      "List all available datasets (structured data exports) in BambooHR.",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/datasets");
    },
  },
  {
    name: "bamboohr_get_dataset_fields",
    description: "Get the available fields for a specific dataset.",
    inputSchema: {
      type: "object" as const,
      properties: {
        datasetId: { type: "string" },
      },
      required: ["datasetId"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: { datasetId: string }) {
      const client = getClient();
      return client.get(`/datasets/${input.datasetId}/fields`);
    },
  },
  {
    name: "bamboohr_query_dataset",
    description:
      "Query a BambooHR dataset with specific fields and optional filters. Returns structured rows.",
    inputSchema: {
      type: "object" as const,
      properties: {
        datasetId: { type: "string" },
        fields: {
          type: "array",
          items: { type: "string" },
          description: "Fields to include in the response",
        },
        filters: {
          type: "object",
          description: "Key-value filter pairs",
          additionalProperties: true,
        },
        limit: { type: "number", description: "Max rows to return" },
      },
      required: ["datasetId", "fields"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: z.infer<typeof QueryDatasetSchema>) {
      const client = getClient();
      const parsed = QueryDatasetSchema.parse(input);
      return client.post(`/datasets/${parsed.datasetId}/data`, {
        fields: parsed.fields,
        filters: parsed.filters ?? {},
        limit: parsed.limit,
      });
    },
  },
];
