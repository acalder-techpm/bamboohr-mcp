import { z } from "zod";
import { getClient } from "../context.js";
import { CreateDependentSchema } from "../types.js";

export const benefitsTools = [
  {
    name: "bamboohr_get_company_benefits",
    description:
      "Get all benefit plans offered by the company (health, dental, vision, 401k, etc.).",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/benefits/company_benefits");
    },
  },
  {
    name: "bamboohr_get_employee_benefits",
    description:
      "Get all benefit enrollments for a specific employee including plan details and coverage.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
      },
      required: ["employeeId"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: { employeeId: string }) {
      const client = getClient();
      return client.get(`/benefits/employees/${input.employeeId}/member_benefits`);
    },
  },
  {
    name: "bamboohr_get_benefit_coverages",
    description: "Get available benefit coverage types (e.g. 'Employee Only', 'Employee + Spouse').",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/benefits/coverages");
    },
  },
  {
    name: "bamboohr_get_benefit_deduction_types",
    description: "Get all benefit deduction types for payroll processing.",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/benefits/deduction_types");
    },
  },
  {
    name: "bamboohr_get_employee_dependents",
    description:
      "Get all dependents on record for a specific employee.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
      },
      required: ["employeeId"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: { employeeId: string }) {
      const client = getClient();
      return client.get(`/employees/${input.employeeId}/dependents`);
    },
  },
  {
    name: "bamboohr_create_employee_dependent",
    description:
      "Add a dependent (spouse, child, domestic partner) to an employee's record for benefits purposes.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        relationship: {
          type: "string",
          description: "e.g. 'Spouse', 'Child', 'Domestic Partner'",
        },
        dateOfBirth: { type: "string", description: "YYYY-MM-DD" },
        gender: { type: "string", enum: ["Male", "Female", "Other"] },
      },
      required: ["employeeId", "firstName", "lastName", "relationship"],
    },
    annotations: { destructiveHint: true },
    async execute(input: z.infer<typeof CreateDependentSchema>) {
      const client = getClient();
      const parsed = CreateDependentSchema.parse(input);
      const { employeeId, ...body } = parsed;
      return client.post(`/employees/${employeeId}/dependents`, body);
    },
  },
  {
    name: "bamboohr_get_member_benefit_events",
    description:
      "Get benefit life events (marriage, birth, etc.) for an employee that may trigger enrollment changes.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
      },
      required: ["employeeId"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: { employeeId: string }) {
      const client = getClient();
      return client.get(`/benefits/employees/${input.employeeId}/member_benefit_events`);
    },
  },
];
