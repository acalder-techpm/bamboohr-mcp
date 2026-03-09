import { z } from "zod";
import { getClient } from "../context.js";
import {
  GetTimesheetEntriesSchema,
  ClockInSchema,
  ClockOutSchema,
  CreateHourEntriesSchema,
} from "../types.js";

export const timeTrackingTools = [
  {
    name: "bamboohr_get_timesheet_entries",
    description:
      "Get timesheet clock or hour entries for one or all employees within a date range.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string", description: "Leave blank to get all employees" },
        start: { type: "string", description: "YYYY-MM-DD" },
        end: { type: "string", description: "YYYY-MM-DD" },
      },
      required: ["start", "end"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: z.infer<typeof GetTimesheetEntriesSchema>) {
      const client = getClient();
      const parsed = GetTimesheetEntriesSchema.parse(input);
      const params: Record<string, string> = {
        start: parsed.start,
        end: parsed.end,
      };
      if (parsed.employeeId) params.employeeId = parsed.employeeId;
      return client.get("/time_tracking/timesheet_entries", params);
    },
  },
  {
    name: "bamboohr_clock_in",
    description: "Record a clock-in entry for an employee. Defaults to the current time.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        clockInTime: {
          type: "string",
          description: "ISO 8601 datetime (defaults to now)",
        },
        note: { type: "string" },
      },
      required: ["employeeId"],
    },
    annotations: { destructiveHint: true },
    async execute(input: z.infer<typeof ClockInSchema>) {
      const client = getClient();
      const parsed = ClockInSchema.parse(input);
      return client.post("/time_tracking/clock_in", {
        employeeId: parsed.employeeId,
        clockInTime: parsed.clockInTime ?? new Date().toISOString(),
        note: parsed.note,
      });
    },
  },
  {
    name: "bamboohr_clock_out",
    description: "Record a clock-out entry for an employee. Defaults to the current time.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        clockOutTime: {
          type: "string",
          description: "ISO 8601 datetime (defaults to now)",
        },
      },
      required: ["employeeId"],
    },
    annotations: { destructiveHint: true },
    async execute(input: z.infer<typeof ClockOutSchema>) {
      const client = getClient();
      const parsed = ClockOutSchema.parse(input);
      return client.post("/time_tracking/clock_out", {
        employeeId: parsed.employeeId,
        clockOutTime: parsed.clockOutTime ?? new Date().toISOString(),
      });
    },
  },
  {
    name: "bamboohr_create_hour_entries",
    description: "Create or update timesheet hour entries for an employee on a given date.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        date: { type: "string", description: "YYYY-MM-DD" },
        hours: { type: "number", description: "Hours worked (e.g. 8.5)" },
        note: { type: "string" },
        projectId: { type: "string" },
      },
      required: ["employeeId", "date", "hours"],
    },
    annotations: { destructiveHint: true },
    async execute(input: z.infer<typeof CreateHourEntriesSchema>) {
      const client = getClient();
      const parsed = CreateHourEntriesSchema.parse(input);
      return client.post("/time_tracking/hour_entries/store", {
        entries: [
          {
            employeeId: parsed.employeeId,
            date: parsed.date,
            hours: parsed.hours,
            note: parsed.note,
            projectId: parsed.projectId,
          },
        ],
      });
    },
  },
  {
    name: "bamboohr_list_break_policies",
    description: "List all meal and rest break policies configured in BambooHR.",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/time_tracking/break_policies");
    },
  },
  {
    name: "bamboohr_list_employee_break_availability",
    description:
      "Get break availability (start/end times) for an employee on a given date.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        date: { type: "string", description: "YYYY-MM-DD" },
      },
      required: ["employeeId", "date"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: { employeeId: string; date: string }) {
      const client = getClient();
      return client.get(
        `/time_tracking/employees/${input.employeeId}/break_availability`,
        { date: input.date }
      );
    },
  },
];
