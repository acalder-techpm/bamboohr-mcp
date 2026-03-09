import { z } from "zod";
import { client } from "../client.js";
import { UploadEmployeeFileSchema } from "../types.js";

export const filesTools = [
  {
    name: "bamboohr_get_employee_files",
    description:
      "Get all file categories and files for a specific employee.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
      },
      required: ["employeeId"],
    },
    async execute(input: { employeeId: string }) {
      return client.get(`/employees/${input.employeeId}/files/view`);
    },
  },
  {
    name: "bamboohr_get_employee_file",
    description: "Download a specific employee file by file ID.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        fileId: { type: "string" },
      },
      required: ["employeeId", "fileId"],
    },
    async execute(input: { employeeId: string; fileId: string }) {
      return client.get(`/employees/${input.employeeId}/files/${input.fileId}`);
    },
  },
  {
    name: "bamboohr_upload_employee_file",
    description:
      "Upload a file to an employee's record. File content must be base64-encoded.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        fileName: { type: "string" },
        fileContent: { type: "string", description: "Base64-encoded file content" },
        categoryId: { type: "string", description: "File category ID" },
        shareWithEmployee: {
          type: "boolean",
          description: "Whether the employee can see this file",
        },
      },
      required: ["employeeId", "fileName", "fileContent"],
    },
    async execute(input: z.infer<typeof UploadEmployeeFileSchema>) {
      const parsed = UploadEmployeeFileSchema.parse(input);
      return client.post(`/employees/${parsed.employeeId}/files`, {
        fileName: parsed.fileName,
        fileContent: parsed.fileContent,
        categoryId: parsed.categoryId,
        shareWithEmployee: parsed.shareWithEmployee ?? false,
      });
    },
  },
  {
    name: "bamboohr_delete_employee_file",
    description: "Delete a specific file from an employee's record.",
    inputSchema: {
      type: "object" as const,
      properties: {
        employeeId: { type: "string" },
        fileId: { type: "string" },
      },
      required: ["employeeId", "fileId"],
    },
    async execute(input: { employeeId: string; fileId: string }) {
      return client.delete(`/employees/${input.employeeId}/files/${input.fileId}`);
    },
  },
  {
    name: "bamboohr_get_company_files",
    description: "Get all company-level file categories and files.",
    inputSchema: { type: "object" as const, properties: {} },
    async execute() {
      return client.get("/files/view");
    },
  },
  {
    name: "bamboohr_create_employee_file_category",
    description: "Create a new file category in the employee files section.",
    inputSchema: {
      type: "object" as const,
      properties: {
        categoryName: { type: "string" },
      },
      required: ["categoryName"],
    },
    async execute(input: { categoryName: string }) {
      return client.post("/files/categories", { categoryName: input.categoryName });
    },
  },
];
