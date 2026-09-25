# Workflow: Implementing a New Feature

Follow this workflow whenever the user requests a new feature after the initial project setup:

1. **Requirement Check**:
   - Check if the feature is covered in `.agent/memory/PRD.md`. If not, clarify acceptance criteria and update PRD.
2. **Schema & Contract Check**:
   - If database changes are needed, update `.agent/memory/DATABASE_SCHEMA.md` and write a migration.
   - If API changes are needed, update `.agent/memory/openapi.yaml`.
3. **Task Tracking**:
   - Add new subtasks into `.agent/memory/tasks.md`.
4. **TDD Loop**:
   - Write failing unit/integration tests for the new feature.
   - Implement the feature code according to the stack skill.
   - Run test suite and verify 100% pass rate.
5. **Update State**:
   - Mark task complete in `tasks.md`.
   - If Jira is configured, update ticket status to Done.
