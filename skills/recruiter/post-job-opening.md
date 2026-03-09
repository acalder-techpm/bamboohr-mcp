# Skill: Post Job Opening (Recruiter / TA)

## Trigger
Use when someone says: "Post a job for [role]", "Create a job opening for [title]", "Open a req for [position]", "We're hiring a [title] in [dept/location]"

## What This Skill Does
Creates a new job opening in BambooHR ATS with all required details.

## Instructions

Gather any missing details before posting:
- Job title (required)
- Department
- Location (call `bamboohr_get_company_locations` if unsure of valid options)
- Employment type (Full-Time, Part-Time, Contract, Temp)
- Hiring lead (call `bamboohr_get_hiring_leads` to show options if needed)
- Job description

Then:
1. Call `bamboohr_create_job_opening` with the collected details
2. Confirm the job opening was created and share its ID
3. Remind the recruiter to publish the role in BambooHR (this API creates a draft — publishing is done in the BambooHR UI)

## Output Format
Confirm: "Job opening created: [Title] in [Department] | ID: [job_id]"
Include a direct link hint: "View in BambooHR: https://[subdomain].bamboohr.com/jobs/[job_id]"
