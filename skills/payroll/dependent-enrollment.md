# Skill: Dependent Enrollment (Payroll & Benefits Admin)

## Trigger
Use when someone says: "Add a dependent for [employee]", "[Employee] is adding their [spouse/child]", "Update dependent info for [name]", "Benefits life event — [employee] had a baby"

## What This Skill Does
Adds or updates a dependent record for an employee in BambooHR for benefits coverage purposes.

## Instructions

1. Identify the employee
2. Call `bamboohr_get_employee_dependents` to show existing dependents (avoid duplicates)
3. Collect dependent details:
   - First and last name (required)
   - Relationship (Spouse, Child, Domestic Partner, etc.)
   - Date of birth (for coverage eligibility)
   - Gender
4. Confirm all details before creating
5. Call `bamboohr_create_employee_dependent`
6. Remind the admin that dependent enrollment may need to be updated separately in the benefits portal if using a third-party carrier integration

## Output Format
"Dependent added for [Employee Name]:
- Name: [First Last]
- Relationship: [Spouse/Child/etc.]
- DOB: [date]

Next step: Update benefits enrollment in the carrier portal if applicable."
