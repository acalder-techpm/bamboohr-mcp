# Skill: Run Custom HR Report (HR Manager / HRBP)

## Trigger
Use when someone says: "Run a report on...", "Pull a report showing...", "I need a report of all employees with [field]", "Export [data] from BambooHR"

## What This Skill Does
Translates a natural language report request into a BambooHR report query and returns formatted results.

## Instructions

1. If the user has a specific report in mind, call `bamboohr_list_reports` to find it by name
2. If a matching saved report exists, call `bamboohr_run_report` with that ID
3. If no saved report matches, use `bamboohr_list_employees` with the relevant fields to build the data set manually
4. Format the result as a clean markdown table
5. Offer to filter or sort the results

## Example Mappings
- "Show all employees in Engineering" → list_employees filtered by department
- "Show employees hired this year" → list_employees filtered by hireDate
- "Compensation report" → run_report with salary/compensation report ID
- "Training completion" → get_employee_trainings across the org

## Output Format
Return a markdown table with the requested columns. Include a row count at the top.
For large datasets (>50 rows), summarize and offer to show a specific subset.
