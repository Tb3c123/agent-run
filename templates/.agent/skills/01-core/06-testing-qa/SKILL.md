---
name: core-testing-qa
description: >-
  Use this skill during Phase 5 to guide Test-Driven Development (TDD), author unit, integration,
  and E2E tests, and enforce 100% pass rates on automated test suites before committing code.
---

# Testing Strategy & TDD Workflow Skill

## Purpose
Ensure zero-regression code delivery by applying disciplined Test-Driven Development (TDD) loops and automated verification.

## Procedure

### The TDD Cycle (Red - Green - Refactor)
For every feature or bugfix:
1. **Red**: Write a failing unit or integration test describing the expected behavior.
   - Run the test suite: verify it fails specifically for the expected reason.
2. **Green**: Write the simplest, cleanest production code to make the test pass.
   - Run the test suite: verify all tests pass.
3. **Refactor**: Clean up the code, eliminate duplication, improve naming, ensure proper typing.
   - Run the test suite again: verify everything remains green.

### Quality Gate 3 (100% Test Pass)
- NEVER mark a task complete in `.agent/memory/tasks.md` if any automated test is failing.
- Run the full test command:
  - Node: `npm test`
  - Python: `pytest -v`
  - Flutter: `flutter test`
  - Go: `go test -v ./...`
