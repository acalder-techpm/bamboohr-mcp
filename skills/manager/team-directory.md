# Skill: Team Directory (Manager / Team Lead)

## Trigger
Use when someone says: "Show me my team", "Who are my direct reports?", "Find [person]", "What's [name]'s email/title/start date?", "Team roster"

## What This Skill Does
Retrieves and displays team member information from BambooHR.

## Instructions

For team roster:
1. Call `bamboohr_list_employees` with `fields=id,firstName,lastName,jobTitle,workEmail,mobilePhone,department,location,hireDate,supervisor`
2. Filter by supervisor to find direct reports (if the manager's employee ID is known)
3. Display a clean roster with key contact info

For individual lookup:
1. Call `bamboohr_list_employees` to search by name
2. Call `bamboohr_get_employee` with the found ID and relevant fields
3. Display full profile info

## Output Format

**Team Roster**

| Name | Title | Email | Phone | Location | Start Date |
|------|-------|-------|-------|----------|-----------|
| ...

For individual lookup, show a vertical profile card with all available fields.
