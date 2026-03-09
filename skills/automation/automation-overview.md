# Skill: Automation Overview (Webhook & Automation Admin)

## Trigger
Use when someone says: "What automations are active?", "Show me our BambooHR integrations", "List all webhooks", "What's connected to BambooHR?"

## What This Skill Does
Provides a summary of all active webhooks and their health status to give visibility into what's connected and working.

## Instructions

1. Call `bamboohr_list_webhooks` to get all webhooks
2. For each webhook, call `bamboohr_get_webhook_logs` to get recent delivery status
3. Compute health per webhook: what % of recent deliveries succeeded
4. Summarize in a dashboard-style view

## Output Format

**BambooHR Automations Overview — [Date]**

| Webhook | Monitors | Endpoint | Last Delivery | Health |
|---------|----------|----------|--------------|--------|
| HRIS Sync | department, jobTitle | https://... | 2 mins ago | Healthy (100%) |
| Slack Notifier | hireDate | https://... | 1 hour ago | Degraded (60%) |

**Webhooks needing attention:** List any with health below 80% and suggest debugging with the "debug-webhook" skill.

**Total active automations:** N
