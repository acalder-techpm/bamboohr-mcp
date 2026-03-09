# Skill: View My Trainings (Employee Self-Service)

## Trigger
Use when someone says: "What trainings am I assigned?", "Show my training records", "What's overdue for me?", "Training requirements for my role", "Show my certifications"

## What This Skill Does
Shows an employee's assigned training records including completion status, due dates, and any overdue items.

## Instructions

1. Identify the employee ID
2. Call `bamboohr_get_employee_trainings` for that employee
3. Categorize records:
   - Overdue (due date passed, not completed)
   - Due soon (due within 30 days)
   - Completed
   - Scheduled (future due date, not yet complete)
4. Surface any overdue items prominently

## Output Format

**Your Training Records**

**Overdue (action required):**
| Training | Due Date | Days Overdue |
|---------|----------|-------------|
| Safety Certification | Jan 15 | 45 days |

**Due Soon:**
| Training | Due Date | Days Until Due |
|---------|----------|---------------|

**Completed:**
| Training | Completed Date | Hours |
|---------|---------------|-------|

**Scheduled:**
(upcoming trainings not yet due)
