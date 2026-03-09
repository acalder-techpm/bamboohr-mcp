# bamboohr-mcp

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that gives Claude full access to [BambooHR](https://www.bamboohr.com) — employees, time off, time tracking, ATS, benefits, training, goals, reports, files, and webhooks.

## Features

- **50+ MCP tools** covering the full BambooHR API surface
- **30 role-based skills** for HR admins, managers, recruiters, employees, payroll, training, and automation teams
- Ships as an `npx`-runnable npm package — no server to deploy
- Works in Claude Desktop, Claude.ai, and any MCP-compatible client

## Quickstart

### 1. Get your BambooHR API key

1. Log in to BambooHR
2. Go to your profile icon (top right) > **API Keys**
3. Click **Add New Key**, give it a name, and copy the key

Your subdomain is the part before `.bamboohr.com` in your URL (e.g. `acme` from `acme.bamboohr.com`).

### 2. Configure Claude Desktop

Add the following to your `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

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

Then restart Claude Desktop.

### 3. Configure Claude Code (CLI)

```bash
claude mcp add bamboohr \
  -e BAMBOOHR_API_KEY=your-api-key-here \
  -e BAMBOOHR_SUBDOMAIN=your-company-subdomain \
  -- npx -y bamboohr-mcp
```

### 4. Verify it works

Open Claude and ask: **"Show me the BambooHR employee directory"**

---

## Available Tools

### Employees
| Tool | Description |
|------|-------------|
| `bamboohr_get_employee` | Get an employee record by ID |
| `bamboohr_list_employees` | List all employees in the directory |
| `bamboohr_create_employee` | Create a new employee |
| `bamboohr_update_employee` | Update employee fields |
| `bamboohr_get_updated_employee_ids` | Get IDs of recently changed employees |
| `bamboohr_get_company_info` | Get company account details |

### Time Off
| Tool | Description |
|------|-------------|
| `bamboohr_get_time_off_types` | List all leave types |
| `bamboohr_get_time_off_policies` | List all time-off policies |
| `bamboohr_get_time_off_requests` | Get requests by date range, status, employee |
| `bamboohr_create_time_off_request` | Submit a time-off request |
| `bamboohr_update_time_off_request_status` | Approve, deny, or cancel a request |
| `bamboohr_get_time_off_balance` | Get leave balances for an employee |
| `bamboohr_get_whos_out` | See who is out during a date range |
| `bamboohr_assign_time_off_policies` | Assign policies to an employee |

### Time Tracking
| Tool | Description |
|------|-------------|
| `bamboohr_get_timesheet_entries` | Get clock/hour entries |
| `bamboohr_clock_in` / `bamboohr_clock_out` | Record clock events |
| `bamboohr_create_hour_entries` | Submit hour entries |
| `bamboohr_list_break_policies` | List break policies |
| `bamboohr_list_employee_break_availability` | Check break availability |

### Applicant Tracking (ATS)
| Tool | Description |
|------|-------------|
| `bamboohr_list_job_summaries` | List all job openings |
| `bamboohr_create_job_opening` | Create a new job opening |
| `bamboohr_create_candidate` | Create a candidate record |
| `bamboohr_get_job_applications` | Get applications for a job |
| `bamboohr_get_applicant_statuses` | List pipeline stages |
| `bamboohr_update_applicant_status` | Move a candidate to a new stage |
| `bamboohr_add_application_comment` | Add a note to an application |
| `bamboohr_get_hiring_leads` | List available hiring leads |
| `bamboohr_get_company_locations` | List company locations |

### Benefits
| Tool | Description |
|------|-------------|
| `bamboohr_get_company_benefits` | List all benefit plans |
| `bamboohr_get_employee_benefits` | Get an employee's enrollments |
| `bamboohr_get_benefit_coverages` | List coverage tiers |
| `bamboohr_get_benefit_deduction_types` | List deduction types |
| `bamboohr_get_employee_dependents` | List an employee's dependents |
| `bamboohr_create_employee_dependent` | Add a dependent |
| `bamboohr_get_member_benefit_events` | Get benefit life events |

### Reports
| Tool | Description |
|------|-------------|
| `bamboohr_list_reports` | List all saved reports |
| `bamboohr_run_report` | Run a report by ID |
| `bamboohr_list_datasets` | List available datasets |
| `bamboohr_get_dataset_fields` | Get fields for a dataset |
| `bamboohr_query_dataset` | Query a dataset with filters |

### Training
| Tool | Description |
|------|-------------|
| `bamboohr_get_training_categories` | List training categories |
| `bamboohr_get_training_types` | List training types/courses |
| `bamboohr_create_training_type` | Create a training type |
| `bamboohr_get_employee_trainings` | Get an employee's training records |
| `bamboohr_create_training_record` | Assign training to an employee |
| `bamboohr_update_training_record` | Update a training record |

### Goals
| Tool | Description |
|------|-------------|
| `bamboohr_list_goals` | Get goals for an employee |
| `bamboohr_get_goals_aggregate` | Get goal summary/stats |
| `bamboohr_create_goal` | Create a performance goal |
| `bamboohr_update_goal_progress` | Update percent complete |
| `bamboohr_close_goal` / `bamboohr_reopen_goal` | Close or reopen a goal |
| `bamboohr_get_goal_status_counts` | Get goal status breakdown |

### Webhooks
| Tool | Description |
|------|-------------|
| `bamboohr_list_webhooks` | List all webhooks |
| `bamboohr_get_webhook` | Get webhook details |
| `bamboohr_create_webhook` | Create a new webhook |
| `bamboohr_update_webhook` | Update a webhook |
| `bamboohr_delete_webhook` | Delete a webhook |
| `bamboohr_get_webhook_logs` | View delivery logs |
| `bamboohr_get_webhook_monitor_fields` | List monitorable fields |

### Files
| Tool | Description |
|------|-------------|
| `bamboohr_get_employee_files` | List files for an employee |
| `bamboohr_get_employee_file` | Download a specific file |
| `bamboohr_upload_employee_file` | Upload a file to an employee |
| `bamboohr_delete_employee_file` | Delete an employee file |
| `bamboohr_get_company_files` | List company-level files |
| `bamboohr_create_employee_file_category` | Create a file category |

### Account & Metadata
| Tool | Description |
|------|-------------|
| `bamboohr_get_fields` | List all employee fields |
| `bamboohr_get_tabular_fields` | List tabular fields |
| `bamboohr_get_users` | List BambooHR user accounts |
| `bamboohr_get_countries` | List countries |
| `bamboohr_get_states` | List states for a country |
| `bamboohr_get_list_field_details` | Get options for a list field |
| `bamboohr_update_list_field_values` | Add/update list field options |

---

## Skills (Role-Based Prompts)

Copy the skills from the `skills/` directory to `~/.claude/skills/` to use them in Claude Code.

```bash
# Install all skills
cp -r skills/hr-admin ~/.claude/skills/
cp -r skills/hr-manager ~/.claude/skills/
cp -r skills/recruiter ~/.claude/skills/
cp -r skills/manager ~/.claude/skills/
cp -r skills/employee ~/.claude/skills/
cp -r skills/payroll ~/.claude/skills/
cp -r skills/training ~/.claude/skills/
cp -r skills/automation ~/.claude/skills/
```

### HR Admin (6 skills)
| Skill | Trigger Example |
|-------|----------------|
| `onboard-employee` | "Onboard Sarah Chen starting Monday" |
| `offboard-employee` | "Process termination for Bob Lee, last day Friday" |
| `bulk-update-records` | "Update all Engineering employees to the new location" |
| `manage-documents` | "Show me Jane Doe's files" |
| `sync-org-changes` | "Move Alex to the Platform team reporting to Maria" |
| `audit-employee-data` | "Audit all employee records for missing emails" |

### HR Manager / HRBP (5 skills)
| Skill | Trigger Example |
|-------|----------------|
| `headcount-report` | "Headcount report by department" |
| `workforce-snapshot` | "Give me a workforce snapshot" |
| `run-custom-report` | "Run a report of all employees in California" |
| `performance-overview` | "Performance overview for the Engineering team" |
| `new-hire-trends` | "Show new hires for Q1 2025" |

### Recruiter / TA (4 skills)
| Skill | Trigger Example |
|-------|----------------|
| `post-job-opening` | "Post a Senior Engineer role in Austin" |
| `review-pipeline` | "Review the pipeline for the Product Manager role" |
| `advance-candidate` | "Move Jane Smith to the Final Interview stage" |
| `hiring-velocity-report` | "What's our average time-to-fill?" |

### Manager / Team Lead (5 skills)
| Skill | Trigger Example |
|-------|----------------|
| `approve-time-off` | "Review pending PTO for my team" |
| `team-availability` | "Who's out next week?" |
| `team-directory` | "Show me my team roster" |
| `review-team-goals` | "Show team goal progress" |
| `approve-timesheets` | "Review timesheets for last week" |

### Employee Self-Service (4 skills)
| Skill | Trigger Example |
|-------|----------------|
| `request-time-off` | "Request 3 days off starting June 10" |
| `check-leave-balance` | "How many PTO days do I have left?" |
| `update-profile` | "Update my home address in BambooHR" |
| `view-my-trainings` | "What trainings am I assigned?" |

### Payroll & Benefits Admin (3 skills)
| Skill | Trigger Example |
|-------|----------------|
| `benefits-status-check` | "Check benefits enrollment for John Doe" |
| `dependent-enrollment` | "Add a dependent for Sarah Chen — newborn daughter" |
| `compensation-audit` | "Run a compensation audit for Engineering" |

### Training & L&D (3 skills)
| Skill | Trigger Example |
|-------|----------------|
| `assign-training` | "Assign HIPAA training to all new hires in HR" |
| `compliance-report` | "Training compliance report for Q2" |
| `manage-catalog` | "Show our training catalog" |

### Automation Admin (3 skills)
| Skill | Trigger Example |
|-------|----------------|
| `setup-webhook` | "Create a webhook that fires when job title changes" |
| `debug-webhook` | "Show recent webhook logs for my HRIS sync" |
| `automation-overview` | "What automations are connected to BambooHR?" |

---

## Development

```bash
git clone https://github.com/bamboohr/bamboohr-mcp
cd bamboohr-mcp
npm install
npm run build
```

Test locally:

```bash
export BAMBOOHR_API_KEY=your-key
export BAMBOOHR_SUBDOMAIN=your-subdomain
node dist/index.js
```

Use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector) for interactive testing:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

---

## Authentication

BambooHR uses HTTP Basic Auth with your API key as the username and any string as the password. This MCP server handles auth automatically using the `BAMBOOHR_API_KEY` environment variable.

To generate an API key: BambooHR > Profile icon > **API Keys** > Add New Key.

Note: API keys have the same permissions as the user who created them. For full access, use an Admin user's API key. For read-only integrations, use a limited-access user.

---

## License

MIT
