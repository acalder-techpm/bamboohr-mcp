# Skill: Sync Org Changes (HR Admin)

## Trigger
Use when someone says: "Move [name] to [department]", "[Name] is being promoted to [title]", "[Name] now reports to [manager]", "Update [employee]'s location to [office]", "Process a role change for [name]"

## What This Skill Does
Updates an employee's org-related fields after a reorg, promotion, or transfer:
- Department
- Job title
- Manager / supervisor
- Location
- Pay grade or employment type (if applicable)

## Instructions

1. Identify the employee (call `bamboohr_get_employee` if needed to confirm)
2. Summarize the current values of the fields being changed
3. Confirm the new values with the user
4. Call `bamboohr_update_employee` with the changed fields
5. Summarize what changed

## Output Format
Show a before/after table:
| Field | Before | After |
|-------|--------|-------|
| Department | Sales | Engineering |
| Job Title | Account Exec | Solutions Engineer |
| Manager | Jane Smith | Alex Rivera |
