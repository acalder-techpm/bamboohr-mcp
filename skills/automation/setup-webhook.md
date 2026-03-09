# Skill: Setup Webhook (Webhook & Automation Admin)

## Trigger
Use when someone says: "Create a webhook for [event]", "Set up a BambooHR webhook", "Notify [system] when [field] changes", "Integrate BambooHR with [system] via webhook"

## What This Skill Does
Configures a BambooHR webhook that fires when specified employee fields change, and sends a payload to an external endpoint.

## Instructions

1. Call `bamboohr_get_webhook_monitor_fields` to show what fields can be monitored
2. Collect from the user:
   - Webhook name (descriptive)
   - Which fields to monitor (e.g. `department`, `jobTitle`, `employmentStatus`)
   - Target endpoint URL (must be HTTPS)
   - What data to include in the payload (`postFields` map)
   - HMAC signing secret (strongly recommended for security)
   - Payload format (JSON or form-encoded)
3. Confirm the configuration before creating
4. Call `bamboohr_create_webhook`
5. Return the webhook ID and recommend testing the endpoint

## Security Note
Always recommend a `privateKey` for HMAC-SHA256 payload signing. Instruct the user to verify the `X-BambooHR-Signature` header on the receiving end.

## Output Format
"Webhook created:
- ID: [id]
- Name: [name]
- Monitors: [field1, field2]
- Endpoint: [url]
- Format: JSON
- Signing: [enabled/disabled]

Test it by making a change to a monitored field in BambooHR."
