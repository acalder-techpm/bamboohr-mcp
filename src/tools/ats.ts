import { z } from "zod";
import { getClient } from "../context.js";
import {
  CreateJobOpeningSchema,
  CreateCandidateSchema,
  GetJobApplicationsSchema,
  UpdateApplicantStatusSchema,
} from "../types.js";

export const atsTools = [
  {
    name: "bamboohr_list_job_summaries",
    description:
      "List all job openings with summary info: title, department, location, status, and open count.",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/applicant_tracking/jobs");
    },
  },
  {
    name: "bamboohr_create_job_opening",
    description: "Create a new job opening in the ATS.",
    inputSchema: {
      type: "object" as const,
      properties: {
        jobTitle: { type: "string" },
        department: { type: "string" },
        location: { type: "string" },
        hiringLead: {
          type: "string",
          description: "Employee ID of the hiring lead",
        },
        description: { type: "string" },
        employmentType: {
          type: "string",
          enum: ["Full-Time", "Part-Time", "Contract", "Temp"],
        },
      },
      required: ["jobTitle"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: z.infer<typeof CreateJobOpeningSchema>) {
      const client = getClient();
      const parsed = CreateJobOpeningSchema.parse(input);
      return client.post("/applicant_tracking/jobs", parsed);
    },
  },
  {
    name: "bamboohr_get_company_locations",
    description:
      "Get all company locations used in job postings and employee records.",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/applicant_tracking/locations");
    },
  },
  {
    name: "bamboohr_create_candidate",
    description:
      "Create a new applicant/candidate record, optionally linked to a job opening.",
    inputSchema: {
      type: "object" as const,
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
        jobId: {
          type: "string",
          description: "Job opening ID to associate this candidate with",
        },
        resume: {
          type: "string",
          description: "Plain-text resume or cover note",
        },
      },
      required: ["firstName", "lastName"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: z.infer<typeof CreateCandidateSchema>) {
      const client = getClient();
      const parsed = CreateCandidateSchema.parse(input);
      return client.post("/applicant_tracking/candidates", parsed);
    },
  },
  {
    name: "bamboohr_get_job_applications",
    description:
      "Get all applications for a specific job opening. Optionally filter by status.",
    inputSchema: {
      type: "object" as const,
      properties: {
        jobId: { type: "string" },
        statusId: {
          type: "string",
          description: "Filter by applicant status ID",
        },
      },
      required: ["jobId"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: z.infer<typeof GetJobApplicationsSchema>) {
      const client = getClient();
      const parsed = GetJobApplicationsSchema.parse(input);
      const params: Record<string, string> = {};
      if (parsed.statusId) params.statusId = parsed.statusId;
      return client.get(
        `/applicant_tracking/jobs/${parsed.jobId}/applications`,
        params,
      );
    },
  },
  {
    name: "bamboohr_get_applicant_statuses",
    description: "Get all applicant statuses defined in the ATS pipeline.",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/applicant_tracking/statuses");
    },
  },
  {
    name: "bamboohr_update_applicant_status",
    description:
      "Move an applicant to a different stage in the pipeline (e.g. 'Phone Screen', 'Offer', 'Hired', 'Rejected').",
    inputSchema: {
      type: "object" as const,
      properties: {
        applicationId: { type: "string" },
        statusId: { type: "string" },
        note: { type: "string" },
      },
      required: ["applicationId", "statusId"],
    },
    annotations: { readOnlyHint: true },
    async execute(input: z.infer<typeof UpdateApplicantStatusSchema>) {
      const client = getClient();
      const parsed = UpdateApplicantStatusSchema.parse(input);
      return client.post(
        `/applicant_tracking/applications/${parsed.applicationId}/status`,
        { statusId: parsed.statusId, note: parsed.note ?? "" },
      );
    },
  },
  {
    name: "bamboohr_add_application_comment",
    description: "Add an internal comment to a job application.",
    inputSchema: {
      type: "object" as const,
      properties: {
        applicationId: { type: "string" },
        comment: { type: "string" },
      },
      required: ["applicationId", "comment"],
    },
    annotations: { destructiveHint: true },
    async execute(input: { applicationId: string; comment: string }) {
      const client = getClient();
      return client.post(
        `/applicant_tracking/applications/${input.applicationId}/comments`,
        { comment: input.comment },
      );
    },
  },
  {
    name: "bamboohr_get_hiring_leads",
    description: "Get a list of employees who can be assigned as hiring leads.",
    inputSchema: { type: "object" as const, properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const client = getClient();
      return client.get("/applicant_tracking/hiring_leads");
    },
  },
];
