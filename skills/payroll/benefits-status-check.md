# Skill: Benefits Status Check (Payroll & Benefits Admin)

## Trigger
Use when someone says: "Check benefits enrollment for [employee]", "What benefits does [name] have?", "Is [employee] enrolled in [plan]?", "Benefits verification for [name]"

## What This Skill Does
Verifies an employee's current benefit enrollments, coverage tiers, and dependent status.

## Instructions

1. Identify the employee (name or ID)
2. Call `bamboohr_get_employee_benefits` with the employee ID
3. Call `bamboohr_get_employee_dependents` to list enrolled dependents
4. Cross-reference with `bamboohr_get_company_benefits` to show plan names and descriptions
5. Present a clean summary of active plans, coverage tiers, and dependents

## Output Format

**Benefits Summary: [Employee Name]**

| Benefit | Plan | Coverage Tier | Effective Date |
|---------|------|--------------|----------------|
| Medical | Blue Shield PPO | Employee + Spouse | Jan 1, 2025 |
| Dental | Delta Dental | Employee + Family | Jan 1, 2025 |
| 401k | Fidelity | 5% match | Enrolled |

**Dependents:**
| Name | Relationship | DOB |
|------|-------------|-----|
| Jane Doe | Spouse | 1985-03-12 |

**Open Items:** Flag any plans where enrollment appears incomplete.
