import { z } from "zod";
import { getClient } from "../context.js";
import {
  GetEmployeeTrainingsSchema,
  CreateTrainingRecordSchema,
  CreateTrainingTypeSchema,
} from "../types.js";

export const trainingTools = [
  {
    name: "bamboohr_get_training_categories",
    description: "List all training categories defined in BambooHR.",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/training/category");
    },
  },
  {
    name: "bamboohr_get_training_types",
    description:
      "List all training types (courses/programs) available in BambooHR. Each type can have a renewal frequency.",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/training/type");
    },
  },
  {
    name: "bamboohr_create_training_type",
    description: "Create a new training type (course/certification) in BambooHR.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: { type: "string" },
        renewable: { type: "boolean" },
        frequency: {
          type: "number",
          description: "Months between required renewals (if renewable)",
        },
        dueFromHireDate: {
          type: "number",
          description: "Days after hire date that this training is due",
        },
        categoryId: { type: "string" },
      },
      required: ["name"],
    },
    annotations: { destructiveHint: true },
    async execute(input: z.infer<typeof CreateTrainingTypeSchema>) {
      const client = getClient();
      const parsed = CreateTrainingTypeSchema.parse(input);
      return client.post("/training/type", parsed);
    },
  },
  {
    name: "bamboohr_get_employee_trainings",
    description:
      "Get training records for a specific employee. Optionally filter by completion status.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        completed: {
          type: "boolean",
          description: "true = only completed, false = only incomplete",
        },
      },
      required: ["employeeId"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: z.infer<typeof GetEmployeeTrainingsSchema>) {
      const client = getClient();
      const parsed = GetEmployeeTrainingsSchema.parse(input);
      const params: Record<string, unknown> = {};
      if (parsed.completed !== undefined) params.completed = parsed.completed;
      return client.get(`/employees/${parsed.employeeId}/training/record`, params);
    },
  },
  {
    name: "bamboohr_create_training_record",
    description:
      "Assign a training record to an employee. Can be marked completed, scheduled, or due.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        trainingTypeId: { type: "string" },
        completedDate: { type: "string", description: "YYYY-MM-DD" },
        dueDate: { type: "string", description: "YYYY-MM-DD" },
        notes: { type: "string" },
        cost: { type: "number" },
        instructor: { type: "string" },
        hours: { type: "number" },
        credits: { type: "number" },
        status: { type: "string", enum: ["completed", "scheduled", "due"] },
      },
      required: ["employeeId", "trainingTypeId"],
    },
    annotations: { destructiveHint: true },
    async execute(input: z.infer<typeof CreateTrainingRecordSchema>) {
      const client = getClient();
      const parsed = CreateTrainingRecordSchema.parse(input);
      const { employeeId, ...body } = parsed;
      return client.post(`/employees/${employeeId}/training/record`, body);
    },
  },
  {
    name: "bamboohr_update_training_record",
    description: "Update an existing employee training record (e.g. mark as completed).",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        trainingRecordId: { type: "string" },
        completedDate: { type: "string", description: "YYYY-MM-DD" },
        status: { type: "string", enum: ["completed", "scheduled", "due"] },
        notes: { type: "string" },
        hours: { type: "number" },
        cost: { type: "number" },
      },
      required: ["employeeId", "trainingRecordId"],
    },
    annotations: { destructiveHint: true },
    async execute(input: {
      employeeId: string;
      trainingRecordId: string;
      completedDate?: string;
      status?: string;
      notes?: string;
      hours?: number;
      cost?: number;
    }) {
      const client = getClient();
      const { employeeId, trainingRecordId, ...body } = input;
      return client.put(
        `/employees/${employeeId}/training/record/${trainingRecordId}`,
        body
      );
    },
  },
];
