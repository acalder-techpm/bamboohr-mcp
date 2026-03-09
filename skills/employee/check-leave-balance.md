# Skill: Check Leave Balance (Employee Self-Service)

## Trigger
Use when someone says: "How much PTO do I have?", "Check my leave balance", "How many vacation days do I have left?", "What's my sick time balance?", "Show my time-off balances"

## What This Skill Does
Retrieves and displays the current time-off balance for all leave types for the employee.

## Instructions

1. Identify the employee ID (from context or ask)
2. Call `bamboohr_get_time_off_balance` with the employee ID
3. Display balances for all available leave types
4. Note any policies with a use-it-or-lose-it end date if available

## Output Format

**Your Time-Off Balances — as of [Today]**

| Leave Type | Balance | Used This Year | Available |
|-----------|---------|----------------|-----------|
| PTO | 15 days | 5 days | 10 days |
| Sick | 5 days | 1 day | 4 days |
| Personal | 3 days | 0 days | 3 days |

Note any upcoming expiration dates if present in the data.
