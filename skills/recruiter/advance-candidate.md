# Skill: Advance Candidate (Recruiter / TA)

## Trigger
Use when someone says: "Move [candidate] to [stage]", "Advance [name] to the next round", "Reject [candidate]", "Mark [candidate] as hired", "Update [name]'s application status"

## What This Skill Does
Moves an applicant to a new stage in the hiring pipeline and optionally adds a note.

## Instructions

1. If the application ID is not known, call `bamboohr_list_job_summaries` then `bamboohr_get_job_applications` to find the candidate
2. Call `bamboohr_get_applicant_statuses` to show valid stages if the target stage is unclear
3. Confirm the candidate name, current stage, and target stage with the user
4. Call `bamboohr_update_applicant_status` with the application ID and new status ID
5. If a note is provided, call `bamboohr_add_application_comment` with the note
6. Confirm the update

## Safety
Always confirm the candidate's name and current status before making changes. A rejection cannot be auto-undone via API.

## Output Format
"[Candidate Name] moved from [Stage A] to [Stage B]."
If rejected: include a reminder to send a candidate notification if applicable.
