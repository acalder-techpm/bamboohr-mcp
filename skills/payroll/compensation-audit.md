# Skill: Compensation Audit (Payroll & Benefits Admin)

## Trigger
Use when someone says: "Run a compensation audit", "Show salary data for [dept]", "Compare pay across [team/level]", "Compensation equity report", "Who hasn't had a salary change in 2 years?"

## What This Skill Does
Exports compensation-related fields across the employee base and surfaces potential anomalies or outliers.

## Instructions

1. Call `bamboohr_list_employees` with `fields=id,firstName,lastName,department,jobTitle,location,hireDate,payRate,payType,payChangeReason,lastChangedDate` (use field IDs as appropriate — call `bamboohr_get_tabular_fields` to find compensation table fields)
2. Filter to active employees
3. Analyze:
   - Distribution of pay rates by department and title
   - Employees who haven't had a comp change in 24+ months
   - Any anomalies (e.g. same title, large pay gap)
4. Surface findings without surfacing raw salary figures broadly — present ranges and stats

## Note on Data Sensitivity
Compensation data is sensitive. Confirm the user has appropriate access before running this report. Recommend restricting the output to authorized HR/Payroll personnel only.

## Output Format

**Compensation Audit — [Date]**

| Dept | Avg Pay | Median Pay | Min | Max | # Employees |
|------|---------|-----------|-----|-----|------------|
| Engineering | $X | $Y | $Z | $W | N |

**Flag — No comp change in 24+ months:**
| Employee | Title | Hire Date | Last Change |
|---------|-------|-----------|------------|
