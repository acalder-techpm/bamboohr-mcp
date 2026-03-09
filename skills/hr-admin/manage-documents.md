# Skill: Manage Employee Documents (HR Admin)

## Trigger
Use when someone says: "Upload [file] for [employee]", "Find [employee]'s offer letter", "Add a document to [name]'s file", "Show me [employee]'s files"

## What This Skill Does
Handles employee file management in BambooHR:
- List all files and categories for an employee
- Upload a new file to an employee's record
- Find a specific file by name or category
- Create new file categories

## Instructions

For listing files:
1. Call `bamboohr_get_employee` to resolve the employee ID if only a name is given
2. Call `bamboohr_get_employee_files` with the employee ID
3. Display files grouped by category

For uploading:
1. Confirm the employee, file name, category, and whether the employee can see it
2. If file content is provided as text, encode it as base64 or note that the user must provide base64-encoded content
3. Call `bamboohr_upload_employee_file`
4. Confirm upload success

## Output Format
When listing: Display a grouped file tree by category.
When uploading: Confirm with the file name, category, and employee it was attached to.
