# Skill: Bulk Update Employee Records (HR Admin)

## Trigger
Use when someone says: "Update all employees in [department/location] to...", "Change the [field] for everyone on [team]", "Batch update [field] across [group]"

## What This Skill Does
Performs bulk field updates across a filtered set of employees:
1. Fetch the employee directory to identify who matches the criteria
2. Confirm the list with the user before making changes
3. Apply the field update to each matching employee
4. Report success/failure per employee

## Instructions

1. Call `bamboohr_list_employees` with relevant fields (e.g. `fields=id,firstName,lastName,department,location`)
2. Filter the results to the target group based on the user's criteria
3. Show the user the list of affected employees and the planned change — confirm before proceeding
4. Loop through each employee and call `bamboohr_update_employee` with the specified field changes
5. Report results: how many succeeded, any that failed

## Safety
Always confirm the target list before executing. Never bulk-update more than 50 employees without an explicit second confirmation from the user.

## Output Format
Pre-update: Show a preview table of employees to be updated and the change being applied.
Post-update: Show a results table with employee name, ID, and status (Updated / Failed).
