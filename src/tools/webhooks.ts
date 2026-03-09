import { z } from "zod";
import { getClient } from "../context.js";
import { CreateWebhookSchema, GetWebhookLogsSchema } from "../types.js";

export const webhooksTools = [
  {
    name: "bamboohr_list_webhooks",
    description: "List all webhooks configured in BambooHR.",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/webhooks");
    },
  },
  {
    name: "bamboohr_get_webhook",
    description: "Get details for a specific webhook by ID.",
    inputSchema: {
      type: "object" as const,
      properties: {
        webhookId: { type: "string" },
      },
      required: ["webhookId"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: { webhookId: string }) {
      const client = getClient();
      return client.get(`/webhooks/${input.webhookId}`);
    },
  },
  {
    name: "bamboohr_create_webhook",
    description:
      "Create a new BambooHR webhook that fires when specified employee fields change. Supports HMAC signing.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Friendly name for the webhook" },
        monitorFields: {
          type: "array",
          items: { type: "string" },
          description:
            "Employee fields to monitor for changes (e.g. ['department', 'jobTitle', 'employmentStatus'])",
        },
        postFields: {
          type: "object",
          description:
            "Map of payload key to BambooHR field (e.g. { employee_id: 'id', name: 'displayName' })",
          additionalProperties: { type: "string" },
        },
        url: { type: "string", description: "HTTPS webhook endpoint URL" },
        format: {
          type: "string",
          enum: ["json", "form-encoded"],
          description: "Payload format (default: json)",
        },
        privateKey: {
          type: "string",
          description: "HMAC-SHA256 signing secret for payload verification",
        },
        includeCompanyDomain: {
          type: "boolean",
          description: "Include company domain in payload",
        },
      },
      required: ["name", "monitorFields", "postFields", "url"],
    },
    annotations: { destructiveHint: true },
    async execute(input: z.infer<typeof CreateWebhookSchema>) {
      const client = getClient();
      const parsed = CreateWebhookSchema.parse(input);
      return client.post("/webhooks", parsed);
    },
  },
  {
    name: "bamboohr_update_webhook",
    description: "Update an existing webhook's configuration.",
    inputSchema: {
      type: "object" as const,
      properties: {
        webhookId: { type: "string" },
        name: { type: "string" },
        monitorFields: { type: "array", items: { type: "string" } },
        postFields: {
          type: "object",
          additionalProperties: { type: "string" },
        },
        url: { type: "string" },
        format: { type: "string", enum: ["json", "form-encoded"] },
        privateKey: { type: "string" },
      },
      required: ["webhookId"],
    },
    annotations: { destructiveHint: true },
    async execute(input: { webhookId: string; [key: string]: unknown }) {
      const client = getClient();
      const { webhookId, ...body } = input;
      return client.put(`/webhooks/${webhookId}`, body);
    },
  },
  {
    name: "bamboohr_delete_webhook",
    description: "Delete a webhook by ID.",
    inputSchema: {
      type: "object" as const,
      properties: {
        webhookId: { type: "string" },
      },
      required: ["webhookId"],
    },
    annotations: { destructiveHint: true },
    async execute(input: { webhookId: string }) {
      const client = getClient();
      return client.delete(`/webhooks/${input.webhookId}`);
    },
  },
  {
    name: "bamboohr_get_webhook_logs",
    description:
      "Get delivery logs for a webhook — see recent payloads, HTTP status codes, and failures.",
    inputSchema: {
      type: "object" as const,
      properties: {
        webhookId: { type: "string" },
        lastAttemptedDate: {
          type: "string",
          description: "Only show logs after this date YYYY-MM-DD",
        },
      },
      required: ["webhookId"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: z.infer<typeof GetWebhookLogsSchema>) {
      const client = getClient();
      const parsed = GetWebhookLogsSchema.parse(input);
      const params: Record<string, string> = {};
      if (parsed.lastAttemptedDate)
        params.lastAttemptedDate = parsed.lastAttemptedDate;
      return client.get(`/webhooks/${parsed.webhookId}/log`, params);
    },
  },
  {
    name: "bamboohr_get_webhook_monitor_fields",
    description: "Get all employee fields that can be monitored by webhooks.",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/webhooks/monitor_fields");
    },
  },
];
