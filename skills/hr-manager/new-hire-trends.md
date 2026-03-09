# Skill: New Hire Trends (HR Manager / HRBP)

## Trigger
Use when someone says: "Show new hires for [period]", "Who joined recently?", "New hire report for Q[N]", "Hiring activity for [month/quarter]"

## What This Skill Does
Lists all new hires within a specified time period with relevant onboarding details.

## Instructions

1. Ask for the date range if not specified (default to current quarter)
2. Call `bamboohr_list_employees` with `fields=id,firstName,lastName,department,jobTitle,location,hireDate,supervisor,employmentType`
3. Filter to employees whose `hireDate` falls within the requested period
4. Sort by hire date (most recent first)
5. Group by department and month

## Output Format

**New Hires: [Start] to [End]**

Total: [N] new employees

| Name | Title | Department | Location | Start Date | Manager |
|------|-------|-----------|----------|-----------|---------|
| ...

By month:
- January: N hires
- February: N hires

Highlight which departments are growing fastest.
