# Skill: Approve Timesheets (Manager / Team Lead)

## Trigger
Use when someone says: "Review timesheets for [period]", "Approve timesheets", "Who hasn't submitted their hours?", "Timesheet summary for [week/month]"

## What This Skill Does
Summarizes timesheet entries for a team during a period and flags exceptions (missing submissions, overtime, gaps).

## Instructions

1. Determine the date range (default: current or most recent pay period)
2. Call `bamboohr_list_employees` to get direct reports
3. For each employee, call `bamboohr_get_timesheet_entries` for the period
4. Compute:
   - Total hours per employee
   - Days with no entries (gaps)
   - Any days with unusually high hours (>12 hours)
5. Present summary and flag exceptions

## Output Format

**Timesheet Summary: [Pay Period]**

| Employee | Total Hours | Days Worked | Gaps | Notes |
|----------|-------------|-------------|------|-------|
| Jane Doe | 40h | 5 | 0 | Normal |
| Bob Lee | 36h | 4 | 1 | Missing Wed |

**Exceptions:**
List employees with gaps or anomalies and what needs to be resolved.
