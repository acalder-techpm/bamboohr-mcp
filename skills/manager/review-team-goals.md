# Skill: Review Team Goals (Manager / Team Lead)

## Trigger
Use when someone says: "Show team goals", "How is my team tracking?", "Goal progress for [team]", "Who has goals at risk?", "Performance check for my team"

## What This Skill Does
Pulls goal data for each team member and presents a consolidated progress view.

## Instructions

1. Call `bamboohr_list_employees` to get direct reports (filtered by supervisor)
2. For each team member, call `bamboohr_list_goals` and/or `bamboohr_get_goals_aggregate`
3. Consolidate:
   - Goals on track vs. at-risk vs. overdue per person
   - Average percent complete across the team
   - People with no active goals
4. Highlight anyone needing a check-in

## Output Format

**Team Goal Progress — [Date]**

| Employee | Goals | On Track | At Risk | Avg Complete |
|----------|-------|----------|---------|-------------|
| Jane Doe | 3 | 2 | 1 | 65% |
| Bob Lee | 2 | 2 | 0 | 80% |

**Needs Attention:** [Name] has a goal that is 14 days past due.
