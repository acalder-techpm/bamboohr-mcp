# Skill: Approve / Review Time Off (Manager / Team Lead)

## Trigger
Use when someone says: "Review pending PTO for my team", "Approve time off for [employee]", "Deny [name]'s request", "Who has PTO pending approval?", "Review vacation requests"

## What This Skill Does
Shows pending time-off requests for a team and allows the manager to approve or deny them.

## Instructions

1. Determine the date range (default: today through 90 days from now)
2. Call `bamboohr_get_time_off_requests` with `status=requested` and the manager's employee ID or a team filter if available
3. Display all pending requests grouped by employee
4. For each request, show: employee name, type, dates, number of days, and current balance
5. Ask the manager which to approve or deny (they can handle one or all at once)
6. For each decision, call `bamboohr_update_time_off_request_status` with the appropriate status and optional note
7. Confirm results

## Safety
Never auto-approve without explicit manager confirmation. Show the request details before acting.

## Output Format

**Pending Time-Off Requests**

| Employee | Type | Dates | Days | Balance Remaining |
|----------|------|-------|------|------------------|
| Jane Doe | PTO | Jun 3-5 | 3 | 12 days |
| Bob Lee | Sick | Jun 4 | 1 | 5 days |

Ask: "Which would you like to approve, deny, or skip?"
