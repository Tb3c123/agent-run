---
name: core-integrations-env
description: >-
  Use this skill to configure environment variables in .agent/.env.agent and orchestrate bi-directional
  task synchronization between local tasks.md and external tracking systems (Jira Cloud, GitHub Issues).
---

# Integrations & Environment Manager Skill

## Purpose
Bridge local development state with enterprise issue trackers (Jira) and code hosting platforms (GitHub) without blocking the core AI development loop.

## Procedure

### Step 1: Manage Credentials & Environment
- Check `.agent/.env.agent`.
- Guide the user on obtaining necessary tokens using [integrations guide](../../integrations/README.md).
- Ensure `.agent/.env.agent` is never checked into Git.

### Step 2: Task Synchronization Workflow
- Read [sync-jira-github.md](./sync-jira-github.md) for synchronization options.
- Run `node .agent/scripts/sync-tickets.js --pull` to pull assigned issues from Jira into `.agent/memory/tasks.md`.
- Run `node .agent/scripts/sync-tickets.js --push` to push local completed tasks to Jira and update statuses.
- Use `node .agent/scripts/sync-tickets.js --pr` to generate a rich markdown pull request description from local task accomplishments.
