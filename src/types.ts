import { z } from "zod";

// ─── Common ───────────────────────────────────────────────────────────────────

export const EmployeeIdSchema = z.object({
  employeeId: z.string().describe("Numeric employee ID (e.g. '42')"),
});

export const DateRangeSchema = z.object({
  start: z.string().describe("Start date in YYYY-MM-DD format"),
  end: z.string().describe("End date in YYYY-MM-DD format"),
});

// ─── Employees ────────────────────────────────────────────────────────────────

export const GetEmployeeSchema = z.object({
  employeeId: z.string().describe("Numeric employee ID or '0' for the API key owner"),
  fields: z
    .string()
    .optional()
    .describe(
      "Comma-separated list of fields to return (e.g. 'firstName,lastName,workEmail'). Omit for default fields."
    ),
});

export const ListEmployeesSchema = z.object({
  fields: z
    .string()
    .optional()
    .describe("Comma-separated fields to include for each employee"),
});

export const CreateEmployeeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  workEmail: z.string().email().optional(),
  department: z.string().optional(),
  jobTitle: z.string().optional(),
  hireDate: z.string().optional().describe("YYYY-MM-DD"),
  location: z.string().optional(),
  employmentStatus: z.string().optional(),
});

export const UpdateEmployeeSchema = z.object({
  employeeId: z.string(),
  fields: z
    .record(z.string(), z.unknown())
    .describe("Key-value map of fields to update (e.g. { department: 'Engineering' })"),
});

// ─── Time Off ─────────────────────────────────────────────────────────────────

export const GetTimeOffRequestsSchema = z.object({
  start: z.string().describe("Filter start date YYYY-MM-DD"),
  end: z.string().describe("Filter end date YYYY-MM-DD"),
  employeeId: z.string().optional(),
  status: z
    .enum(["approved", "denied", "superceded", "requested", "canceled"])
    .optional(),
  type: z.string().optional().describe("Time off type ID"),
});

export const CreateTimeOffRequestSchema = z.object({
  employeeId: z.string(),
  timeOffTypeId: z.string().describe("Time off type ID"),
  start: z.string().describe("YYYY-MM-DD"),
  end: z.string().describe("YYYY-MM-DD"),
  notes: z.string().optional(),
});

export const UpdateTimeOffStatusSchema = z.object({
  requestId: z.string(),
  status: z.enum(["approved", "denied", "canceled"]),
  note: z.string().optional(),
});

export const GetTimeOffBalanceSchema = z.object({
  employeeId: z.string(),
  date: z.string().optional().describe("As-of date YYYY-MM-DD (defaults to today)"),
});

export const GetWhosOutSchema = z.object({
  start: z.string().describe("YYYY-MM-DD"),
  end: z.string().describe("YYYY-MM-DD"),
});

// ─── Time Tracking ────────────────────────────────────────────────────────────

export const GetTimesheetEntriesSchema = z.object({
  employeeId: z.string().optional(),
  start: z.string().describe("YYYY-MM-DD"),
  end: z.string().describe("YYYY-MM-DD"),
});

export const ClockInSchema = z.object({
  employeeId: z.string(),
  clockInTime: z.string().optional().describe("ISO 8601 datetime; defaults to now"),
  note: z.string().optional(),
});

export const ClockOutSchema = z.object({
  employeeId: z.string(),
  clockOutTime: z.string().optional().describe("ISO 8601 datetime; defaults to now"),
});

export const CreateHourEntriesSchema = z.object({
  employeeId: z.string(),
  date: z.string().describe("YYYY-MM-DD"),
  hours: z.number().positive(),
  note: z.string().optional(),
  projectId: z.string().optional(),
});

// ─── ATS ──────────────────────────────────────────────────────────────────────

export const CreateJobOpeningSchema = z.object({
  jobTitle: z.string(),
  department: z.string().optional(),
  location: z.string().optional(),
  hiringLead: z.string().optional().describe("Employee ID of hiring lead"),
  description: z.string().optional(),
  employmentType: z
    .enum(["Full-Time", "Part-Time", "Contract", "Temp"])
    .optional(),
});

export const CreateCandidateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  jobId: z.string().optional(),
  resume: z.string().optional().describe("Plain-text resume or cover note"),
});

export const GetJobApplicationsSchema = z.object({
  jobId: z.string().describe("Job opening ID"),
  statusId: z.string().optional().describe("Filter by applicant status ID"),
});

export const UpdateApplicantStatusSchema = z.object({
  applicationId: z.string(),
  statusId: z.string(),
  note: z.string().optional(),
});

// ─── Benefits ─────────────────────────────────────────────────────────────────

export const EmployeeBenefitsSchema = EmployeeIdSchema;

export const CreateDependentSchema = z.object({
  employeeId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  relationship: z.string().describe("e.g. 'Spouse', 'Child', 'Domestic Partner'"),
  dateOfBirth: z.string().optional().describe("YYYY-MM-DD"),
  ssn: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
});

// ─── Reports ──────────────────────────────────────────────────────────────────

export const RunReportSchema = z.object({
  reportId: z.string(),
  format: z.enum(["JSON", "CSV", "XLS", "XML", "PDF"]).default("JSON"),
  fd: z
    .string()
    .optional()
    .describe(
      "Filter delimiter and filtering string (e.g. ',(field1,op,value)')"
    ),
});

export const QueryDatasetSchema = z.object({
  datasetId: z.string(),
  fields: z.array(z.string()).describe("Fields to include"),
  filters: z
    .record(z.string(), z.unknown())
    .optional()
    .describe("Filter key-value pairs"),
  limit: z.number().int().positive().optional(),
});

// ─── Training ─────────────────────────────────────────────────────────────────

export const GetEmployeeTrainingsSchema = z.object({
  employeeId: z.string(),
  completed: z.boolean().optional(),
});

export const CreateTrainingRecordSchema = z.object({
  employeeId: z.string(),
  trainingTypeId: z.string(),
  completedDate: z.string().optional().describe("YYYY-MM-DD"),
  dueDate: z.string().optional().describe("YYYY-MM-DD"),
  notes: z.string().optional(),
  cost: z.number().optional(),
  instructor: z.string().optional(),
  hours: z.number().optional(),
  credits: z.number().optional(),
  status: z.enum(["completed", "scheduled", "due"]).optional(),
});

export const CreateTrainingTypeSchema = z.object({
  name: z.string(),
  renewable: z.boolean().optional(),
  frequency: z.number().int().optional().describe("Months between renewals"),
  dueFromHireDate: z.number().int().optional().describe("Days after hire date due"),
  categoryId: z.string().optional(),
});

// ─── Goals ────────────────────────────────────────────────────────────────────

export const ListGoalsSchema = z.object({
  employeeId: z.string(),
});

export const CreateGoalSchema = z.object({
  employeeId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.string().optional().describe("YYYY-MM-DD"),
  percentComplete: z.number().int().min(0).max(100).optional(),
  alignsWithOptionId: z.string().optional(),
  sharedWithEmployeeIds: z.array(z.string()).optional(),
  milestones: z
    .array(
      z.object({
        title: z.string(),
        dueDate: z.string().optional(),
        percentComplete: z.number().optional(),
      })
    )
    .optional(),
});

export const UpdateGoalProgressSchema = z.object({
  goalId: z.string(),
  percentComplete: z.number().int().min(0).max(100),
  note: z.string().optional(),
});

// ─── Webhooks ─────────────────────────────────────────────────────────────────

export const CreateWebhookSchema = z.object({
  name: z.string(),
  monitorFields: z
    .array(z.string())
    .describe("Employee fields to watch (e.g. ['department', 'jobTitle'])"),
  postFields: z
    .record(z.string(), z.string())
    .describe("Map of payload key -> BambooHR field (e.g. { employee_id: 'id' })"),
  url: z.string().url().describe("HTTPS endpoint to receive events"),
  format: z.enum(["json", "form-encoded"]).default("json"),
  privateKey: z.string().optional().describe("HMAC signing secret"),
  includeCompanyDomain: z.boolean().optional(),
});

export const GetWebhookLogsSchema = z.object({
  webhookId: z.string(),
  lastAttemptedDate: z
    .string()
    .optional()
    .describe("Filter logs after this date YYYY-MM-DD"),
});

// ─── Files ────────────────────────────────────────────────────────────────────

export const UploadEmployeeFileSchema = z.object({
  employeeId: z.string(),
  fileName: z.string(),
  fileContent: z.string().describe("Base64-encoded file content"),
  categoryId: z.string().optional(),
  shareWithEmployee: z.boolean().optional(),
});

export const GetEmployeeFilesSchema = EmployeeIdSchema;
