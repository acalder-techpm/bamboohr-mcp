# Skill: Onboard Employee (HR Admin)

## Trigger
Use when someone says things like: "Onboard [name]", "Set up a new employee", "Create a record for [name] who starts [date]", "Add a new hire named..."

## What This Skill Does
End-to-end new employee setup in BambooHR:
1. Create the employee record with all provided details
2. Assign appropriate time-off policies based on employment type and location
3. Confirm the record was created and summarize what was set up
4. Remind the user of any manual steps (BambooHR access invite, benefits enrollment window, equipment provisioning)

## Instructions

Ask for any missing required information before proceeding:
- First and last name (required)
- Work email (required)
- Start date / hire date (required)
- Job title and department
- Manager / supervisor
- Employment type (Full-Time, Part-Time, Contract)
- Location / office

Then:
1. Call `bamboohr_create_employee` with the collected details
2. Use the returned employee ID to call `bamboohr_assign_time_off_policies` with appropriate policies (fetch available ones first via `bamboohr_get_time_off_policies` if needed)
3. Summarize the completed actions in a clear checklist
4. List any remaining manual steps the HR admin should complete (invite to BambooHR, benefits enrollment, IT setup)

## Output Format
Return a markdown checklist:
- [x] Employee record created (ID: ...)
- [x] Time-off policies assigned
- [ ] Send BambooHR onboarding invite (manual)
- [ ] Open benefits enrollment window (manual)
- [ ] Notify IT for equipment setup (manual)
