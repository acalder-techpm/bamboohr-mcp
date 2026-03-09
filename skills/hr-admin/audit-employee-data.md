# Skill: Audit Employee Data (HR Admin)

## Trigger
Use when someone says: "Audit employee records", "Find employees with missing [field]", "Who is missing a work email?", "Data quality check", "Which employees have incomplete profiles?"

## What This Skill Does
Scans employee records to identify missing or blank required fields and produces a gap report.

## Instructions

1. Ask which fields to audit (or default to a standard set: firstName, lastName, workEmail, department, jobTitle, hireDate, location, supervisor)
2. Call `bamboohr_list_employees` with the relevant fields
3. Identify records where any of the target fields are null, empty, or "N/A"
4. Group results by field and by department
5. Produce a prioritized gap report

## Output Format

**Data Quality Report — [Date]**

| Field | # Missing | Employees |
|-------|-----------|-----------|
| workEmail | 3 | John Doe, Jane Smith, Bob Lee |
| jobTitle | 7 | ... |

**By Department:**
List the departments with the most missing data.

**Recommendations:**
Suggest which gaps are highest priority (e.g. missing emails block system access).
