# Skill: Training Compliance Report (Training & L&D)

## Trigger
Use when someone says: "Training compliance for [dept]", "Who hasn't completed [training]?", "Compliance report", "Show overdue trainings", "Training completion status for [team]"

## What This Skill Does
Generates a compliance report showing training completion status across employees or departments.

## Instructions

1. Identify the scope (all employees, specific department, specific training type)
2. Call `bamboohr_list_employees` to get the relevant employees
3. For each employee, call `bamboohr_get_employee_trainings`
4. Categorize by status:
   - Overdue: due date passed, not completed
   - Completed: has a completedDate
   - Due soon: due within 30 days
   - Not assigned: missing entirely
5. Compute compliance rate: (completed / total assigned) * 100

## Output Format

**Training Compliance: [Training Name or All] — [Dept or All] — [Date]**

**Overall Compliance Rate: [X]%**

| Status | Count | % |
|--------|-------|---|
| Completed | 45 | 75% |
| Overdue | 10 | 17% |
| Due soon | 5 | 8% |

**Overdue — Action Required:**
| Employee | Training | Due Date | Days Overdue | Manager |
|---------|---------|----------|-------------|---------|

**Recommendations:** Suggest scheduling a bulk reminder for overdue employees.
