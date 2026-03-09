# Skill: Team Availability / Who's Out (Manager / Team Lead)

## Trigger
Use when someone says: "Who's out this week?", "Team availability for next week", "Is anyone out on [date]?", "Show me coverage for [period]"

## What This Skill Does
Retrieves who is scheduled out during a time period and presents it as a clear coverage view.

## Instructions

1. Determine the date range (default: current week, Mon-Fri)
2. Call `bamboohr_get_whos_out` with the date range
3. Filter to relevant team members if the user specifies a team
4. Format results as a day-by-day coverage view
5. Highlight days where multiple people are out (potential coverage gaps)

## Output Format

**Team Availability: [Mon] to [Fri]**

| Date | Out | Type |
|------|-----|------|
| Mon Jun 3 | Jane Doe | PTO |
| Tue Jun 4 | Jane Doe, Bob Lee | PTO, Sick |
| Wed Jun 5 | (everyone in) | |

**Coverage alert:** Multiple people out on Tuesday — consider flagging if coverage is needed.
