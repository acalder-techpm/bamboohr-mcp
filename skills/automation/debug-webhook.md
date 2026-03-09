# Skill: Debug Webhook (Webhook & Automation Admin)

## Trigger
Use when someone says: "Show webhook logs", "Why isn't my webhook firing?", "Check webhook delivery for [name]", "Debug my BambooHR integration", "Show recent webhook failures"

## What This Skill Does
Fetches webhook delivery logs to diagnose failures and help debug integrations.

## Instructions

1. If the webhook ID is not known, call `bamboohr_list_webhooks` to show all webhooks and let the user identify which one
2. Call `bamboohr_get_webhook_logs` for the relevant webhook
3. Analyze the logs:
   - Group by HTTP status code (200 = success, 4xx/5xx = failure)
   - Show the most recent 10 delivery attempts
   - Highlight failures with their response codes and timestamps
4. Suggest remediation for common issues:
   - 404: endpoint URL changed or incorrect
   - 401/403: authentication on the receiving endpoint
   - 500: issue with the receiving server
   - Timeouts: endpoint too slow (BambooHR expects a fast 2xx response)

## Output Format

**Webhook: [Name] | ID: [id]**

Recent Deliveries (last 10):
| Timestamp | Status | HTTP Code | Notes |
|-----------|--------|-----------|-------|
| 2025-06-01 10:00 | Failed | 503 | Server unavailable |

**Failure rate:** X of last 10 attempts failed.

**Suggested fix:** Based on the error patterns, provide a specific recommendation.
