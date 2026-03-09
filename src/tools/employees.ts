import { z } from "zod";
import { client } from "../client.js";
import {
  GetEmployeeSchema,
  ListEmployeesSchema,
  CreateEmployeeSchema,
  UpdateEmployeeSchema,
} from "../types.js";

export const employeeTools = [
  {
    name: "bamboohr_get_employee",
    description:
      "Get a single employee's record by ID. Returns requested fields such as name, email, department, job title, hire date, and custom fields.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: {
          type: "string",
          description: "Numeric employee ID (use '0' for the API key owner)",
        },
        fields: {
          type: "string",
          description:
            "Comma-separated field names to return (e.g. 'firstName,lastName,workEmail,department'). Leave blank for defaults.",
        },
      },
      required: ["employeeId"],
    },
    async execute(input: z.infer<typeof GetEmployeeSchema>) {
      const parsed = GetEmployeeSchema.parse(input);
      const fields =
        parsed.fields ||
        "firstName,lastName,workEmail,department,jobTitle,location,hireDate,employmentStatus,supervisor";
      return client.get(`/employees/${parsed.employeeId}`, { fields });
    },
  },
  {
    name: "bamboohr_list_employees",
    description:
      "List all employees in the company directory. Returns id, name, department, job title, work email, and photo for each employee.",
    inputSchema: {
      type: "object" as const,
      properties: {
        fields: {
          type: "string",
          description: "Comma-separated fields to include per employee",
        },
      },
    },
    async execute(input: z.infer<typeof ListEmployeesSchema>) {
      const parsed = ListEmployeesSchema.parse(input);
      if (parsed.fields) {
        return client.get("/employees/directory", { fields: parsed.fields });
      }
      return client.get("/employees/directory");
    },
  },
  {
    name: "bamboohr_create_employee",
    description:
      "Create a new employee record. Returns the new employee's ID.",
    inputSchema: {
      type: "object" as const,
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        workEmail: { type: "string", description: "Work email address" },
        department: { type: "string" },
        jobTitle: { type: "string" },
        hireDate: { type: "string", description: "YYYY-MM-DD" },
        location: { type: "string" },
        employmentStatus: { type: "string" },
      },
      required: ["firstName", "lastName"],
    },
    async execute(input: z.infer<typeof CreateEmployeeSchema>) {
      const parsed = CreateEmployeeSchema.parse(input);
      return client.post("/employees", parsed);
    },
  },
  {
    name: "bamboohr_update_employee",
    description:
      "Update one or more fields on an existing employee record.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string", description: "Numeric employee ID" },
        fields: {
          type: "object",
          description:
            "Key-value pairs of fields to update (e.g. { \"department\": \"Engineering\", \"jobTitle\": \"Sr. Engineer\" })",
          additionalProperties: true,
        },
      },
      required: ["employeeId", "fields"],
    },
    async execute(input: z.infer<typeof UpdateEmployeeSchema>) {
      const parsed = UpdateEmployeeSchema.parse(input);
      return client.post(`/employees/${parsed.employeeId}`, parsed.fields);
    },
  },
  {
    name: "bamboohr_get_updated_employee_ids",
    description:
      "Get a list of employee IDs that have been updated since a given date. Useful for syncing external systems.",
    inputSchema: {
      type: "object" as const,
      properties: {
        since: {
          type: "string",
          description: "ISO 8601 datetime to check changes from",
        },
      },
      required: ["since"],
    },
    async execute(input: { since: string }) {
      return client.get("/employees/changed", { since: input.since });
    },
  },
  {
    name: "bamboohr_get_company_info",
    description:
      "Get general information about the BambooHR company account including name, subdomain, and contact info.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
    async execute() {
      return client.get("/company_information");
    },
  },
];
