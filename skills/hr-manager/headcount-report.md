# Skill: Headcount Report (HR Manager / HRBP)

## Trigger
Use when someone says: "Headcount report", "How many employees do we have in [dept/location]?", "Show me headcount by department", "Total employee count"

## What This Skill Does
Generates a headcount breakdown across the org or filtered by department, location, or employment type.

## Instructions

1. Call `bamboohr_list_employees` with `fields=id,firstName,lastName,department,location,employmentStatus,employmentType,hireDate`
2. Filter to active employees only (exclude terminated)
3. Group and count by:
   - Department
   - Location
   - Employment type (Full-Time, Part-Time, Contract)
4. Calculate totals and percentages
5. Optionally highlight new hires in the last 90 days

## Output Format

**Headcount Report — [Date]**

**Total Active Employees: [N]**

By Department:
| Department | Count | % of Total |
|-----------|-------|-----------|
| Engineering | 42 | 28% |
| ...

By Location | By Employment Type (similar tables)

New hires last 90 days: [N]
