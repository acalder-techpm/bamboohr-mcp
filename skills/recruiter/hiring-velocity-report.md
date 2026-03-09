# Skill: Hiring Velocity Report (Recruiter / TA)

## Trigger
Use when someone says: "Show hiring velocity", "What's our time-to-fill?", "How long does it take to fill a role?", "Hiring analytics report"

## What This Skill Does
Analyzes pipeline data to surface time-based hiring metrics including time-to-fill and pipeline conversion rates.

## Instructions

1. Call `bamboohr_list_job_summaries` to get all open and recently closed roles
2. Call `bamboohr_get_job_applications` for each relevant role
3. Compute:
   - **Time-to-fill**: days from job posted to offer accepted (for closed roles)
   - **Pipeline conversion rate**: applicants per stage (stage-to-stage drop-off)
   - **Roles open 30/60/90+ days**: flag aging requisitions
4. Summarize with averages and highlight outliers

## Output Format

**Hiring Velocity Report — [Date]**

| Metric | Value |
|--------|-------|
| Avg time-to-fill | X days |
| Roles open 30+ days | N |
| Roles open 60+ days | N |
| Total active reqs | N |

**Pipeline Conversion (avg across all roles):**
New Apps → Phone Screen: X%
Phone Screen → Interview: X%
Interview → Offer: X%

**Aging Reqs Needing Attention:** List roles open 60+ days.
