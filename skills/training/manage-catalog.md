# Skill: Manage Training Catalog (Training & L&D)

## Trigger
Use when someone says: "Add a training type", "Create a new course in BambooHR", "Update [training] renewal frequency", "Show our training catalog", "Add [certification] to the training library"

## What This Skill Does
Manages the training type catalog — creating new types, updating renewal settings, and organizing categories.

## Instructions

For viewing the catalog:
1. Call `bamboohr_get_training_types` and `bamboohr_get_training_categories`
2. Display all types organized by category

For creating a new training type:
1. Collect: name, category, whether it's renewable, renewal frequency (months), and days-from-hire-date due (if applicable)
2. Confirm the details
3. Call `bamboohr_create_training_type`
4. Confirm creation

For updating:
1. Call `bamboohr_get_training_types` to find the existing type
2. Use `bamboohr_update_training_type` (if available via API) with the changed fields
3. Confirm the update

## Output Format
For catalog view:
**Training Catalog**
Grouped by category with: Name | Renewable | Frequency | # Assigned

For create/update: confirm with "Training type [Name] created/updated successfully."
