<div align="center">
<img width="3100" height="1344" alt="Gemini_Generated_Image_9padc99padc99pad" src="https://github.com/user-attachments/assets/21868157-f222-49a9-b4fa-1e0644f15bc6" />

**Give Claude full access to your BambooHR — employees, time off, hiring, benefits, training, and more.**

[![npm version](https://img.shields.io/npm/v/bamboohr-mcp?color=4CAF50&logo=npm)](https://www.npmjs.com/package/bamboohr-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node >=18](https://img.shields.io/badge/node-%3E%3D18-brightgreen?logo=node.js)](https://nodejs.org)
[![MCP](https://img.shields.io/badge/MCP-compatible-blueviolet)](https://modelcontextprotocol.io)

</div>

---

A [Model Context Protocol](https://modelcontextprotocol.io) server that connects Claude to BambooHR. Install once, then talk to your HR data in plain English — no dashboards, no manual exports.

```
"Who's out next week?"
"Onboard Sarah Chen starting Monday — Engineering, reports to Maria."
"Show training compliance for the Sales team."
"Approve all pending PTO requests for my team."
"What's our average time-to-fill for engineering roles?"
```

---

## What's included

<table>
<tr>
<td valign="top" width="50%">

**🔧 74 MCP Tools**
Full BambooHR API coverage across 11 modules — employees, time off, time tracking, ATS, benefits, training, goals, reports, webhooks, files, and metadata.

**📦 Zero-deploy setup**
Ships as an `npx`-runnable package. Add two lines to your Claude config and you're done.

</td>
<td valign="top" width="50%">

**🎭 30 Role-Based Skills**
Pre-built workflows for HR admins, managers, recruiters, employees, payroll, L&D, and automation admins — organized by who uses them.

**🔌 Works everywhere**
Claude Desktop, Claude Code CLI, or any MCP-compatible client.

</td>
</tr>
</table>

---

## Quickstart

### Step 1 — Get your BambooHR API key

1. Log in to BambooHR
2. Click your profile icon (top right) > **API Keys**
3. Click **Add New Key**, name it, and copy it

Your subdomain is the prefix in your BambooHR URL — e.g. `acme` from `acme.bamboohr.com`.

---

### Step 2 — Add to Claude Desktop

Edit your config file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bamboohr": {
      "command": "npx",
      "args": ["-y", "bamboohr-mcp"],
      "env": {
        "BAMBOOHR_API_KEY": "your-api-key-here",
        "BAMBOOHR_SUBDOMAIN": "your-company-subdomain"
      }
    }
  }
}
```

Restart Claude Desktop.

---

### Step 3 — Or add to Claude Code (CLI)

```bash
claude mcp add bamboohr \
  -e BAMBOOHR_API_KEY=your-api-key-here \
  -e BAMBOOHR_SUBDOMAIN=your-company-subdomain \
  -- npx -y bamboohr-mcp
```

---

### Step 4 — Verify

Open Claude and ask: **"Show me the BambooHR employee directory"**

---

## Module Selection

If you only need a subset of the available modules, you may disable them with `USE_*` environment variables or CLI args.

All modules are **enabled by default**. Set any to `"false"` to disable:

| Env var             | Module              | Tools |
| ------------------- | ------------------- | ----- |
| `USE_EMPLOYEES`     | Employees           | 6     |
| `USE_TIME_OFF`      | Time Off            | 8     |
| `USE_TIME_TRACKING` | Time Tracking       | 6     |
| `USE_ATS`           | Applicant Tracking  | 9     |
| `USE_BENEFITS`      | Benefits            | 7     |
| `USE_REPORTS`       | Reports & Datasets  | 5     |
| `USE_TRAINING`      | Training            | 6     |
| `USE_GOALS`         | Goals & Performance | 7     |
| `USE_WEBHOOKS`      | Webhooks            | 7     |
| `USE_FILES`         | Files               | 6     |
| `USE_ACCOUNT`       | Account & Metadata  | 7     |

**Example — only Employees, Time Off, and Reports:**

```json
{
  "mcpServers": {
    "bamboohr": {
      "command": "npx",
      "args": ["-y", "bamboohr-mcp"],
      "env": {
        "BAMBOOHR_API_KEY": "your-api-key-here",
        "BAMBOOHR_SUBDOMAIN": "your-company-subdomain",
        "USE_TIME_TRACKING": "false",
        "USE_ATS": "false",
        "USE_BENEFITS": "false",
        "USE_TRAINING": "false",
        "USE_GOALS": "false",
        "USE_WEBHOOKS": "false",
        "USE_FILES": "false",
        "USE_ACCOUNT": "false"
      }
    }
  }
}
```

**CLI args** work too and take precedence over env vars:

```bash
npx -y bamboohr-mcp --use-ats=false --use-webhooks=false --use-goals=false
```

### Read-Only Mode

Set `READONLY_MODE=true` to exclude non-read-only tools.

```json
{
  "env": {
    "BAMBOOHR_API_KEY": "your-api-key-here",
    "BAMBOOHR_SUBDOMAIN": "your-company-subdomain",
    "READONLY_MODE": "true"
  }
}
```

Or via CLI: `npx -y bamboohr-mcp --readonly`

Read-only mode composes with module selection — e.g. `USE_ATS=false` + `READONLY_MODE=true` gives only the read-only tools from the remaining 10 modules.

---

## Available Tools

<details>
<summary><strong>👤 Employees</strong> — 6 tools</summary>

| Tool                                | Description                           |
| ----------------------------------- | ------------------------------------- |
| `bamboohr_get_employee`             | Get an employee record by ID          |
| `bamboohr_list_employees`           | List all employees in the directory   |
| `bamboohr_create_employee`          | Create a new employee                 |
| `bamboohr_update_employee`          | Update employee fields                |
| `bamboohr_get_updated_employee_ids` | Get IDs of recently changed employees |
| `bamboohr_get_company_info`         | Get company account details           |

</details>

<details>
<summary><strong>🏖️ Time Off</strong> — 8 tools</summary>

| Tool                                      | Description                                  |
| ----------------------------------------- | -------------------------------------------- |
| `bamboohr_get_time_off_types`             | List all leave types                         |
| `bamboohr_get_time_off_policies`          | List all time-off policies                   |
| `bamboohr_get_time_off_requests`          | Get requests by date range, status, employee |
| `bamboohr_create_time_off_request`        | Submit a time-off request                    |
| `bamboohr_update_time_off_request_status` | Approve, deny, or cancel a request           |
| `bamboohr_get_time_off_balance`           | Get leave balances for an employee           |
| `bamboohr_get_whos_out`                   | See who is out during a date range           |
| `bamboohr_assign_time_off_policies`       | Assign policies to an employee               |

</details>

<details>
<summary><strong>⏱️ Time Tracking</strong> — 5 tools</summary>

| Tool                                        | Description              |
| ------------------------------------------- | ------------------------ |
| `bamboohr_get_timesheet_entries`            | Get clock/hour entries   |
| `bamboohr_clock_in` / `bamboohr_clock_out`  | Record clock events      |
| `bamboohr_create_hour_entries`              | Submit hour entries      |
| `bamboohr_list_break_policies`              | List break policies      |
| `bamboohr_list_employee_break_availability` | Check break availability |

</details>

<details>
<summary><strong>🎯 Applicant Tracking (ATS)</strong> — 9 tools</summary>

| Tool                               | Description                     |
| ---------------------------------- | ------------------------------- |
| `bamboohr_list_job_summaries`      | List all job openings           |
| `bamboohr_create_job_opening`      | Create a new job opening        |
| `bamboohr_create_candidate`        | Create a candidate record       |
| `bamboohr_get_job_applications`    | Get applications for a job      |
| `bamboohr_get_applicant_statuses`  | List pipeline stages            |
| `bamboohr_update_applicant_status` | Move a candidate to a new stage |
| `bamboohr_add_application_comment` | Add a note to an application    |
| `bamboohr_get_hiring_leads`        | List available hiring leads     |
| `bamboohr_get_company_locations`   | List company locations          |

</details>

<details>
<summary><strong>🏥 Benefits</strong> — 7 tools</summary>

| Tool                                   | Description                   |
| -------------------------------------- | ----------------------------- |
| `bamboohr_get_company_benefits`        | List all benefit plans        |
| `bamboohr_get_employee_benefits`       | Get an employee's enrollments |
| `bamboohr_get_benefit_coverages`       | List coverage tiers           |
| `bamboohr_get_benefit_deduction_types` | List deduction types          |
| `bamboohr_get_employee_dependents`     | List an employee's dependents |
| `bamboohr_create_employee_dependent`   | Add a dependent               |
| `bamboohr_get_member_benefit_events`   | Get benefit life events       |

</details>

<details>
<summary><strong>📊 Reports & Datasets</strong> — 5 tools</summary>

| Tool                          | Description                  |
| ----------------------------- | ---------------------------- |
| `bamboohr_list_reports`       | List all saved reports       |
| `bamboohr_run_report`         | Run a report by ID           |
| `bamboohr_list_datasets`      | List available datasets      |
| `bamboohr_get_dataset_fields` | Get fields for a dataset     |
| `bamboohr_query_dataset`      | Query a dataset with filters |

</details>

<details>
<summary><strong>🎓 Training</strong> — 6 tools</summary>

| Tool                               | Description                        |
| ---------------------------------- | ---------------------------------- |
| `bamboohr_get_training_categories` | List training categories           |
| `bamboohr_get_training_types`      | List training types/courses        |
| `bamboohr_create_training_type`    | Create a training type             |
| `bamboohr_get_employee_trainings`  | Get an employee's training records |
| `bamboohr_create_training_record`  | Assign training to an employee     |
| `bamboohr_update_training_record`  | Update a training record           |

</details>

<details>
<summary><strong>🏆 Goals & Performance</strong> — 7 tools</summary>

| Tool                                           | Description               |
| ---------------------------------------------- | ------------------------- |
| `bamboohr_list_goals`                          | Get goals for an employee |
| `bamboohr_get_goals_aggregate`                 | Get goal summary/stats    |
| `bamboohr_create_goal`                         | Create a performance goal |
| `bamboohr_update_goal_progress`                | Update percent complete   |
| `bamboohr_close_goal` / `bamboohr_reopen_goal` | Close or reopen a goal    |
| `bamboohr_get_goal_status_counts`              | Get goal status breakdown |

</details>

<details>
<summary><strong>🔔 Webhooks</strong> — 7 tools</summary>

| Tool                                  | Description             |
| ------------------------------------- | ----------------------- |
| `bamboohr_list_webhooks`              | List all webhooks       |
| `bamboohr_get_webhook`                | Get webhook details     |
| `bamboohr_create_webhook`             | Create a new webhook    |
| `bamboohr_update_webhook`             | Update a webhook        |
| `bamboohr_delete_webhook`             | Delete a webhook        |
| `bamboohr_get_webhook_logs`           | View delivery logs      |
| `bamboohr_get_webhook_monitor_fields` | List monitorable fields |

</details>

<details>
<summary><strong>📁 Files</strong> — 6 tools</summary>

| Tool                                     | Description                  |
| ---------------------------------------- | ---------------------------- |
| `bamboohr_get_employee_files`            | List files for an employee   |
| `bamboohr_get_employee_file`             | Download a specific file     |
| `bamboohr_upload_employee_file`          | Upload a file to an employee |
| `bamboohr_delete_employee_file`          | Delete an employee file      |
| `bamboohr_get_company_files`             | List company-level files     |
| `bamboohr_create_employee_file_category` | Create a file category       |

</details>

<details>
<summary><strong>⚙️ Account & Metadata</strong> — 7 tools</summary>

| Tool                                | Description                   |
| ----------------------------------- | ----------------------------- |
| `bamboohr_get_fields`               | List all employee fields      |
| `bamboohr_get_tabular_fields`       | List tabular fields           |
| `bamboohr_get_users`                | List BambooHR user accounts   |
| `bamboohr_get_countries`            | List countries                |
| `bamboohr_get_states`               | List states for a country     |
| `bamboohr_get_list_field_details`   | Get options for a list field  |
| `bamboohr_update_list_field_values` | Add/update list field options |

</details>

---

## Skills — Role-Based Workflows

Skills are pre-built prompts that handle common HR workflows end-to-end. Copy them to `~/.claude/skills/` to use them in Claude Code.

```bash
# Install all skills at once
cp -r skills/* ~/.claude/skills/
```

---

### 🗂️ HR Admin

_For the people running day-to-day HR operations._

| Skill                 | Try saying...                                           |
| --------------------- | ------------------------------------------------------- |
| `onboard-employee`    | "Onboard Sarah Chen starting Monday in Engineering"     |
| `offboard-employee`   | "Process termination for Bob Lee, last day is Friday"   |
| `bulk-update-records` | "Update all Engineering employees to the Austin office" |
| `manage-documents`    | "Show me Jane Doe's employee files"                     |
| `sync-org-changes`    | "Move Alex to the Platform team reporting to Maria"     |
| `audit-employee-data` | "Find all employees missing a work email"               |

---

### 📈 HR Manager / HRBP

_For strategic HR visibility, analytics, and reporting._

| Skill                  | Try saying...                                   |
| ---------------------- | ----------------------------------------------- |
| `headcount-report`     | "Headcount report by department"                |
| `workforce-snapshot`   | "Give me a workforce snapshot"                  |
| `run-custom-report`    | "Run a report of all employees in California"   |
| `performance-overview` | "Performance overview for the Engineering team" |
| `new-hire-trends`      | "Show new hires for Q1 2025"                    |

---

### 🎯 Recruiter / Talent Acquisition

_For managing job openings, candidates, and hiring pipelines._

| Skill                    | Try saying...                                      |
| ------------------------ | -------------------------------------------------- |
| `post-job-opening`       | "Post a Senior Engineer role in Austin, TX"        |
| `review-pipeline`        | "Review the pipeline for the Product Manager role" |
| `advance-candidate`      | "Move Jane Smith to the Final Interview stage"     |
| `hiring-velocity-report` | "What's our average time-to-fill?"                 |

---

### 👔 Manager / Team Lead

_For team-level visibility and day-to-day approvals._

| Skill                | Try saying...                             |
| -------------------- | ----------------------------------------- |
| `approve-time-off`   | "Review pending PTO requests for my team" |
| `team-availability`  | "Who's out next week?"                    |
| `team-directory`     | "Show me my team roster"                  |
| `review-team-goals`  | "Show team goal progress for Q2"          |
| `approve-timesheets` | "Review timesheets for last week"         |

---

### 🙋 Employee Self-Service

_For employees managing their own HR needs._

| Skill                 | Try saying...                         |
| --------------------- | ------------------------------------- |
| `request-time-off`    | "Request 3 days off starting June 10" |
| `check-leave-balance` | "How many PTO days do I have left?"   |
| `update-profile`      | "Update my home address in BambooHR"  |
| `view-my-trainings`   | "What trainings am I assigned?"       |

---

### 💼 Payroll & Benefits Admin

_For managing benefits enrollment and compensation data._

| Skill                   | Try saying...                                       |
| ----------------------- | --------------------------------------------------- |
| `benefits-status-check` | "Check benefits enrollment for John Doe"            |
| `dependent-enrollment`  | "Add a dependent for Sarah Chen — newborn daughter" |
| `compensation-audit`    | "Run a compensation audit for Engineering"          |

---

### 🎓 Training & L&D

_For tracking learning programs and compliance._

| Skill               | Try saying...                                  |
| ------------------- | ---------------------------------------------- |
| `assign-training`   | "Assign HIPAA training to all new hires in HR" |
| `compliance-report` | "Training compliance report for Q2"            |
| `manage-catalog`    | "Show our full training catalog"               |

---

### ⚡ Automation Admin

_For teams integrating BambooHR with other systems via webhooks._

| Skill                 | Try saying...                                        |
| --------------------- | ---------------------------------------------------- |
| `setup-webhook`       | "Create a webhook that fires when job title changes" |
| `debug-webhook`       | "Show recent webhook logs for my HRIS sync"          |
| `automation-overview` | "What automations are connected to BambooHR?"        |

---

## Development

```bash
git clone https://github.com/acalder-techpm/bamboohr-mcp
cd bamboohr-mcp
npm install
npm run build
```

**Test locally:**

```bash
export BAMBOOHR_API_KEY=your-key
export BAMBOOHR_SUBDOMAIN=your-subdomain
node dist/index.js
```

**Interactive testing with MCP Inspector:**

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

---

## Authentication

BambooHR uses HTTP Basic Auth with your API key as the username. This server handles it automatically — just set `BAMBOOHR_API_KEY`.

> **Tip:** API keys inherit the permissions of the user who created them. Use an Admin user's key for full access, or a limited user's key for read-only integrations.

To create a key: **BambooHR > Profile icon > API Keys > Add New Key**

---

## Examples

Here are three real-world examples showing how Claude uses this MCP server.

### Example 1: Check team availability

**You say:** "Who's out next week on the Engineering team?"

**What happens:** Claude calls `bamboohr_get_whos_out` with next week's date range, then cross-references with `bamboohr_list_employees` filtered to Engineering. It returns a summary like:

> 3 people out next week in Engineering:
>
> - **Sarah Chen** - PTO Mon-Wed
> - **James Park** - Sick leave Monday
> - **Lisa Nguyen** - PTO all week
>
> 12 of 15 team members available.

### Example 2: Onboard a new hire

**You say:** "Onboard Maria Torres starting March 17, Software Engineer in Platform, reports to Alex Kim, Austin office."

**What happens:** Claude calls `bamboohr_create_employee` with the provided details, then calls `bamboohr_assign_time_off_policies` to set up standard PTO. It returns:

> Created employee record for **Maria Torres** (ID: 4521)
>
> - Department: Platform
> - Job Title: Software Engineer
> - Location: Austin, TX
> - Supervisor: Alex Kim
> - Start Date: 2026-03-17
> - PTO policies assigned: Standard PTO, Sick Leave, Company Holidays

### Example 3: Training compliance report

**You say:** "Show me who's overdue on HIPAA training in the HR department."

**What happens:** Claude calls `bamboohr_list_employees` to get HR department members, then `bamboohr_get_employee_trainings` for each to check HIPAA completion status. It returns:

> **HIPAA Training Compliance - HR Department**
>
> 2 of 8 team members overdue:
>
> - **Tom Rivera** - due Feb 15, 2026 (22 days overdue)
> - **Amy Walsh** - due Mar 1, 2026 (9 days overdue)
>
> 6 members current. Next renewal due: Jun 2026 (Dana Lee).

---

## Privacy Policy

This MCP server acts as a local bridge between Claude and your BambooHR account. Here is how data is handled:

- **No data collection.** This server does not collect, store, or transmit any data to third parties. It does not phone home, send analytics, or log to external services.
- **Local execution only.** The server runs on your machine as a local stdio process. All API calls go directly from your machine to BambooHR's API (`api.bamboohr.com`).
- **Credentials stay local.** Your `BAMBOOHR_API_KEY` and `BAMBOOHR_SUBDOMAIN` are read from local environment variables and are never persisted, logged, or transmitted anywhere other than BambooHR's API.
- **BambooHR's privacy policy applies.** Data returned from the BambooHR API is subject to [BambooHR's Privacy Policy](https://www.bamboohr.com/privacy-policy). This server does not cache or persist any API responses.
- **You control access.** The API key's permissions in BambooHR determine what data this server can access. Use a limited-permission key to restrict scope.

---

## Support

- **Issues:** [github.com/acalder-techpm/bamboohr-mcp/issues](https://github.com/acalder-techpm/bamboohr-mcp/issues)
- **Email:** adam.calder@bamboohr.com
- **Discussions:** [github.com/acalder-techpm/bamboohr-mcp/discussions](https://github.com/acalder-techpm/bamboohr-mcp/discussions)

---

## Contributing

PRs welcome. If you add a new tool or skill, follow the existing patterns in `src/tools/` and `skills/` and open a pull request with a brief description of the use case.

---

## License

[MIT](LICENSE) — made with ☕ and Claude.
