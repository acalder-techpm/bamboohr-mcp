import { z } from "zod";
import { client } from "../client.js";
import {
  ListGoalsSchema,
  CreateGoalSchema,
  UpdateGoalProgressSchema,
} from "../types.js";

export const goalsTools = [
  {
    name: "bamboohr_list_goals",
    description:
      "Get all performance goals for a specific employee, including status and percent complete.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
      },
      required: ["employeeId"],
    },
    async execute(input: z.infer<typeof ListGoalsSchema>) {
      const parsed = ListGoalsSchema.parse(input);
      return client.get(`/performance/employees/${parsed.employeeId}/goals`);
    },
  },
  {
    name: "bamboohr_get_goals_aggregate",
    description:
      "Get an aggregated summary of all goals for an employee including status counts and milestones.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
      },
      required: ["employeeId"],
    },
    async execute(input: { employeeId: string }) {
      return client.get(`/performance/employees/${input.employeeId}/goals/aggregate`);
    },
  },
  {
    name: "bamboohr_create_goal",
    description: "Create a new performance goal for an employee.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        dueDate: { type: "string", description: "YYYY-MM-DD" },
        percentComplete: { type: "number", description: "0-100" },
        sharedWithEmployeeIds: {
          type: "array",
          items: { type: "string" },
          description: "Employee IDs to share this goal with",
        },
      },
      required: ["employeeId", "title"],
    },
    async execute(input: z.infer<typeof CreateGoalSchema>) {
      const parsed = CreateGoalSchema.parse(input);
      const { employeeId, ...body } = parsed;
      return client.post(`/performance/employees/${employeeId}/goals`, body);
    },
  },
  {
    name: "bamboohr_update_goal_progress",
    description: "Update the percent complete on a goal and optionally add a progress note.",
    inputSchema: {
      type: "object" as const,
      properties: {
        goalId: { type: "string" },
        percentComplete: { type: "number", description: "0-100" },
        note: { type: "string" },
      },
      required: ["goalId", "percentComplete"],
    },
    async execute(input: z.infer<typeof UpdateGoalProgressSchema>) {
      const parsed = UpdateGoalProgressSchema.parse(input);
      return client.put(`/performance/goals/${parsed.goalId}`, {
        percentComplete: parsed.percentComplete,
        note: parsed.note,
      });
    },
  },
  {
    name: "bamboohr_close_goal",
    description: "Mark a goal as closed/complete.",
    inputSchema: {
      type: "object" as const,
      properties: {
        goalId: { type: "string" },
      },
      required: ["goalId"],
    },
    async execute(input: { goalId: string }) {
      return client.post(`/performance/goals/${input.goalId}/close`, {});
    },
  },
  {
    name: "bamboohr_reopen_goal",
    description: "Reopen a previously closed goal.",
    inputSchema: {
      type: "object" as const,
      properties: {
        goalId: { type: "string" },
      },
      required: ["goalId"],
    },
    async execute(input: { goalId: string }) {
      return client.post(`/performance/goals/${input.goalId}/reopen`, {});
    },
  },
  {
    name: "bamboohr_get_goal_status_counts",
    description:
      "Get counts of goals by status (on-track, behind, at-risk, etc.) for an employee.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
      },
      required: ["employeeId"],
    },
    async execute(input: { employeeId: string }) {
      return client.get(
        `/performance/employees/${input.employeeId}/goals/statusCounts`
      );
    },
  },
];
