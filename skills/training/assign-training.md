# Skill: Assign Training (Training & L&D)

## Trigger
Use when someone says: "Assign [training] to [employee/team]", "Create a training record for [name]", "All new hires need to complete [training]", "Schedule [certification] for [dept]"

## What This Skill Does
Creates training records for one or more employees, linking them to a training type with a due date.

## Instructions

1. Identify the training type (call `bamboohr_get_training_types` to show available options)
2. Identify the target employees (one person, a department, or a list)
   - For a department or group: call `bamboohr_list_employees` with department filter
3. Collect:
   - Due date
   - Status (default: "due")
   - Notes (optional)
4. Confirm the list of employees and training before assigning
5. For each employee, call `bamboohr_create_training_record`
6. Report how many were assigned successfully

## Safety
For bulk assignments (5+ employees), show a confirmation preview before executing.

## Output Format
"Training assigned:
- Training: [Type Name]
- Due: [Date]
- Assigned to: [N] employees

[List of names if fewer than 10, otherwise show count by department]"
