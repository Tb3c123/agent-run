# Jira & GitHub Synchronization Protocols

## 1. Single Source of Truth
During active coding sprints, **`.agent/memory/tasks.md` is the local single source of truth**.
This guarantees 0ms latency, zero API rate limiting, and 100% offline capability.

## 2. Synchronization Triggers
1. **Sprint Kickoff**: Pull tasks from Jira project/sprint to seed `tasks.md`.
2. **Task Completion**: When a user story is verified green, trigger sync script to update Jira ticket state to `Done` or `In Review`.
3. **PR Creation**: Aggregate completed tasks into the PR description automatically.

## 3. Mapping Schema
| Local Task Field | Jira Field | GitHub Field |
| :--- | :--- | :--- |
| `[x] Task Title` | Summary | Issue Title |
| Detailed description | Description | Issue Body |
| Subtasks | Checklist / Subtasks | Markdown checklist `[x]` |
| Status (`[ ]` / `[x]`) | Status (`To Do` / `Done`) | State (`open` / `closed`) |
