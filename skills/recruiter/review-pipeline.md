# Skill: Review Hiring Pipeline (Recruiter / TA)

## Trigger
Use when someone says: "Review the pipeline for [role]", "Show me applicants for [job]", "How many candidates do we have for [position]?", "Pipeline summary for [job]"

## What This Skill Does
Summarizes the applicant pipeline for a job opening — counts by stage, highlights stale applications, and surfaces candidates needing action.

## Instructions

1. Call `bamboohr_list_job_summaries` to find the job ID (if not already known)
2. Call `bamboohr_get_applicant_statuses` to get the stage names
3. Call `bamboohr_get_job_applications` for the target job
4. Group applicants by status/stage
5. Flag applications that have been in the same stage for 7+ days (stale)
6. Show total counts per stage

## Output Format

**Pipeline: [Job Title]**

| Stage | Count | Stale (7+ days) |
|-------|-------|-----------------|
| New Application | 12 | 3 |
| Phone Screen | 5 | 1 |
| Interview | 3 | 0 |
| Offer | 1 | 0 |

**Action Needed:**
- List applicants in a stage for 7+ days with their name and days since last update
