import { z } from "zod";
import { client } from "../client.js";
import {
  GetTimeOffRequestsSchema,
  CreateTimeOffRequestSchema,
  UpdateTimeOffStatusSchema,
  GetTimeOffBalanceSchema,
  GetWhosOutSchema,
} from "../types.js";

export const timeOffTools = [
  {
    name: "bamboohr_get_time_off_types",
    description: "List all available time off types (e.g. PTO, Sick, Bereavement).",
    inputSchema: { type: "object" as const, properties: {} },
    async execute() {
      return client.get("/meta/time_off/types");
    },
  },
  {
    name: "bamboohr_get_time_off_policies",
    description: "List all time off policies defined in BambooHR.",
    inputSchema: { type: "object" as const, properties: {} },
    async execute() {
      return client.get("/meta/time_off/policies");
    },
  },
  {
    name: "bamboohr_get_time_off_requests",
    description:
      "Get time off requests within a date range. Optionally filter by employee, status (approved, denied, requested, canceled), or time off type.",
    inputSchema: {
      type: "object" as const,
      properties: {
        start: { type: "string", description: "YYYY-MM-DD" },
        end: { type: "string", description: "YYYY-MM-DD" },
        employeeId: { type: "string" },
        status: {
          type: "string",
          enum: ["approved", "denied", "superceded", "requested", "canceled"],
        },
        type: { type: "string", description: "Time off type ID" },
      },
      required: ["start", "end"],
    },
    async execute(input: z.infer<typeof GetTimeOffRequestsSchema>) {
      const parsed = GetTimeOffRequestsSchema.parse(input);
      return client.get("/time_off/requests", parsed);
    },
  },
  {
    name: "bamboohr_create_time_off_request",
    description: "Submit a time off request for an employee.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        timeOffTypeId: { type: "string" },
        start: { type: "string", description: "YYYY-MM-DD" },
        end: { type: "string", description: "YYYY-MM-DD" },
        notes: { type: "string" },
      },
      required: ["employeeId", "timeOffTypeId", "start", "end"],
    },
    async execute(input: z.infer<typeof CreateTimeOffRequestSchema>) {
      const parsed = CreateTimeOffRequestSchema.parse(input);
      const body = {
        status: "approved",
        start: parsed.start,
        end: parsed.end,
        timeOffTypeId: parsed.timeOffTypeId,
        notes: { employee: { note: parsed.notes ?? "" } },
      };
      return client.put(`/employees/${parsed.employeeId}/time_off/request`, body);
    },
  },
  {
    name: "bamboohr_update_time_off_request_status",
    description:
      "Approve, deny, or cancel an existing time off request. Optionally include a manager note.",
    inputSchema: {
      type: "object" as const,
      properties: {
        requestId: { type: "string" },
        status: { type: "string", enum: ["approved", "denied", "canceled"] },
        note: { type: "string" },
      },
      required: ["requestId", "status"],
    },
    async execute(input: z.infer<typeof UpdateTimeOffStatusSchema>) {
      const parsed = UpdateTimeOffStatusSchema.parse(input);
      return client.post(`/time_off/requests/${parsed.requestId}/status`, {
        status: parsed.status,
        note: parsed.note ?? "",
      });
    },
  },
  {
    name: "bamboohr_get_time_off_balance",
    description:
      "Get an employee's current time off balances across all types. Optionally as of a specific date.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        date: { type: "string", description: "As-of date YYYY-MM-DD (defaults to today)" },
      },
      required: ["employeeId"],
    },
    async execute(input: z.infer<typeof GetTimeOffBalanceSchema>) {
      const parsed = GetTimeOffBalanceSchema.parse(input);
      const params: Record<string, string> = {};
      if (parsed.date) params.date = parsed.date;
      return client.get(
        `/employees/${parsed.employeeId}/time_off/calculator`,
        params
      );
    },
  },
  {
    name: "bamboohr_get_whos_out",
    description:
      "Get a list of employees who are out or have time off scheduled in a given date range. Great for checking team coverage.",
    inputSchema: {
      type: "object" as const,
      properties: {
        start: { type: "string", description: "YYYY-MM-DD" },
        end: { type: "string", description: "YYYY-MM-DD" },
      },
      required: ["start", "end"],
    },
    async execute(input: z.infer<typeof GetWhosOutSchema>) {
      const parsed = GetWhosOutSchema.parse(input);
      return client.get("/time_off/whos_out", { start: parsed.start, end: parsed.end });
    },
  },
  {
    name: "bamboohr_assign_time_off_policies",
    description: "Assign time off policies to an employee.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        policyAssignments: {
          type: "array",
          items: {
            type: "object",
            properties: {
              timeOffTypeId: { type: "string" },
              accrualStartDate: { type: "string", description: "YYYY-MM-DD" },
            },
          },
          description: "Array of policy assignments",
        },
      },
      required: ["employeeId", "policyAssignments"],
    },
    async execute(input: { employeeId: string; policyAssignments: unknown[] }) {
      return client.put(
        `/employees/${input.employeeId}/time_off/policies`,
        input.policyAssignments
      );
    },
  },
];
