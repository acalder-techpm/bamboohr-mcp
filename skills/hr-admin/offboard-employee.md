# Skill: Offboard Employee (HR Admin)

## Trigger
Use when someone says: "Offboard [name]", "Process a termination for [name]", "[Name] is leaving on [date]", "Terminate [employee]"

## What This Skill Does
Guides through the offboarding steps in BambooHR:
1. Look up the employee to confirm their current status and details
2. Update their employment status to terminated with the last working date
3. Confirm any final timesheet entries are accounted for
4. List the manual steps HR must complete outside BambooHR

## Instructions

Before making changes, confirm with the user:
- Employee name or ID
- Last day of work
- Reason for separation (voluntary/involuntary/layoff)
- Whether the employee should retain access through their last day

Then:
1. Call `bamboohr_get_employee` to confirm identity and current fields
2. Call `bamboohr_update_employee` to set:
   - `employmentStatus` to the appropriate terminated status
   - `terminationDate` to the last working day
   - `terminationReason` if the field exists
3. Call `bamboohr_get_timesheet_entries` to check for any unsubmitted time in the final period
4. Summarize what was updated

## Output Format
Return a summary of changes made, followed by a manual checklist:
- [x] Employment status updated to Terminated
- [x] Termination date set to [date]
- [ ] Revoke BambooHR user access (manual — Settings > Users)
- [ ] Process final payroll
- [ ] Collect equipment and access badges
- [ ] Send COBRA/benefits continuation notice (if applicable)
