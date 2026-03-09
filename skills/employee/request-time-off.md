# Skill: Request Time Off (Employee Self-Service)

## Trigger
Use when someone says: "Request time off", "I want to take [N] days off starting [date]", "Book PTO for [dates]", "Submit a vacation request", "I need [sick/personal] leave on [date]"

## What This Skill Does
Helps an employee submit a time-off request through BambooHR.

## Instructions

1. Collect required details:
   - Start date and end date (or single day)
   - Type of leave (PTO, sick, personal, etc.) — call `bamboohr_get_time_off_types` to show options
   - Optional note for the manager
2. Check the current balance: call `bamboohr_get_time_off_balance` for the employee to confirm sufficient days remain
3. Warn if the balance is insufficient before submitting
4. Call `bamboohr_create_time_off_request` with the collected details
5. Confirm the request was submitted and note that manager approval is required

## Output Format
"Time-off request submitted:
- Type: [PTO/Sick/etc.]
- Dates: [Start] to [End] ([N] days)
- Current balance after this request: [N] days remaining
- Status: Pending manager approval"
