# Skill: Workforce Snapshot (HR Manager / HRBP)

## Trigger
Use when someone says: "Workforce snapshot", "Show me org analytics", "What does our workforce look like?", "Tenure and turnover summary"

## What This Skill Does
Generates a high-level workforce analytics summary including tenure distribution, recent attrition context, and team composition.

## Instructions

1. Call `bamboohr_list_employees` with `fields=id,firstName,lastName,department,location,hireDate,employmentType,employmentStatus`
2. Compute:
   - **Tenure bands**: < 1 year, 1-2 years, 2-5 years, 5-10 years, 10+ years
   - **Average tenure** across all active employees
   - **Longest-tenured employees** (top 5)
   - **Newest hires** in last 30/60/90 days
   - **Headcount by department** and location
3. Present results as a readable summary with tables

## Output Format

**Workforce Snapshot — [Date]**

| Metric | Value |
|--------|-------|
| Total Active | N |
| Avg Tenure | X years |
| New Hires (90 days) | N |

**Tenure Distribution:**
| Band | Count | % |
|...

**Spotlight:** List top 3 longest-tenured employees.
