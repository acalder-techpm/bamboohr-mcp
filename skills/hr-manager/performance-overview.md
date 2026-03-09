# Skill: Performance Overview (HR Manager / HRBP)

## Trigger
Use when someone says: "Performance overview for [team/period]", "How is [team] tracking on goals?", "Show me goal completion rates", "Who has open goals past due?"

## What This Skill Does
Aggregates goal status across a team or department and highlights at-risk and overdue items.

## Instructions

1. Call `bamboohr_list_employees` to get the relevant team or department members
2. For each employee, call `bamboohr_get_goals_aggregate` to get their goal counts by status
3. Aggregate across the group:
   - Total goals open / completed / at-risk / overdue
   - Employees with no active goals
   - Employees with goals past due date
4. Highlight employees who may need follow-up

## Output Format

**Performance Overview — [Team/Period]**

| Metric | Value |
|--------|-------|
| Employees with active goals | N |
| Goals on track | N |
| Goals at risk / overdue | N |
| Employees with no goals | N |

**Needs Attention:**
List employees with overdue or at-risk goals with their manager's name.
