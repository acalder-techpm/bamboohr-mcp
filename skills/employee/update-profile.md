# Skill: Update My Profile (Employee Self-Service)

## Trigger
Use when someone says: "Update my [phone/address/emergency contact]", "Change my personal info", "Update my home address in BambooHR", "Fix my contact details"

## What This Skill Does
Allows an employee to update their own personal information fields in BambooHR.

## Instructions

1. Identify what they want to update (phone, address, emergency contact, preferred name, etc.)
2. Confirm the employee ID
3. Show the current value if possible (call `bamboohr_get_employee` for those fields first)
4. Confirm the new value with the user
5. Call `bamboohr_update_employee` with the field changes
6. Confirm the update

## Allowed Self-Service Fields
Employees typically have access to update:
- `mobilePhone`
- `homePhone`
- `homeAddress`, `homeCity`, `homeState`, `homeZip`, `homeCountry`
- `emergencyContactName`, `emergencyContactPhone`, `emergencyContactRelationship`
- `preferredName`
- `linkedIn`, `twitter` (if configured)

Do not attempt to update protected fields (compensation, job title, department) — these require HR Admin access.

## Output Format
"Profile updated: [field] changed to [new value]."
