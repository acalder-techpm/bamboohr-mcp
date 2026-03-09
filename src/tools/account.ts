import { client } from "../client.js";

export const accountTools = [
  {
    name: "bamboohr_get_fields",
    description:
      "Get all available employee fields — both standard BambooHR fields and custom fields — with their IDs, names, and types.",
    inputSchema: { type: "object" as const, properties: {} },
    async execute() {
      return client.get("/meta/fields");
    },
  },
  {
    name: "bamboohr_get_tabular_fields",
    description:
      "Get all tabular (table-based) fields like job history, compensation history, and education.",
    inputSchema: { type: "object" as const, properties: {} },
    async execute() {
      return client.get("/meta/tabular_fields");
    },
  },
  {
    name: "bamboohr_get_users",
    description:
      "Get all BambooHR user accounts including their employee ID, email, role, and last login.",
    inputSchema: { type: "object" as const, properties: {} },
    async execute() {
      return client.get("/meta/users");
    },
  },
  {
    name: "bamboohr_get_countries",
    description: "Get the list of countries supported by BambooHR.",
    inputSchema: { type: "object" as const, properties: {} },
    async execute() {
      return client.get("/meta/countries");
    },
  },
  {
    name: "bamboohr_get_states",
    description: "Get all states/provinces for a given country ID.",
    inputSchema: {
      type: "object" as const,
      properties: {
        countryId: {
          type: "string",
          description: "Country ID from bamboohr_get_countries",
        },
      },
      required: ["countryId"],
    },
    async execute(input: { countryId: string }) {
      return client.get(`/meta/countries/${input.countryId}/states`);
    },
  },
  {
    name: "bamboohr_get_list_field_details",
    description:
      "Get the options/values for a list-type custom field (e.g. 'Department', 'Employment Status').",
    inputSchema: {
      type: "object" as const,
      properties: {
        fieldId: { type: "string", description: "List field ID from bamboohr_get_fields" },
      },
      required: ["fieldId"],
    },
    async execute(input: { fieldId: string }) {
      return client.get(`/meta/lists/${input.fieldId}`);
    },
  },
  {
    name: "bamboohr_update_list_field_values",
    description:
      "Add or update values in a list-type field (e.g. adding a new department or office location).",
    inputSchema: {
      type: "object" as const,
      properties: {
        fieldId: { type: "string" },
        options: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "Existing option ID (omit to create new)" },
              value: { type: "string" },
              archived: { type: "string", enum: ["yes", "no"] },
            },
            required: ["value"],
          },
        },
      },
      required: ["fieldId", "options"],
    },
    async execute(input: {
      fieldId: string;
      options: Array<{ id?: string; value: string; archived?: string }>;
    }) {
      return client.put(`/meta/lists/${input.fieldId}`, { options: input.options });
    },
  },
];
