# Workflow: Synchronizing Tasks with Jira Cloud

Follow this workflow to synchronize task state between `.agent/memory/tasks.md` and Jira Cloud:

1. **Verify Credentials**:
   - Check that `JIRA_HOST`, `JIRA_EMAIL`, `JIRA_API_TOKEN`, and `JIRA_PROJECT_KEY` are present in `.agent/.env.agent`.
2. **Pull Mode (Jira -> Local)**:
   - When beginning a new sprint:
     ```bash
     node .agent/scripts/sync-tickets.js --pull
     ```
   - This appends uncompleted Jira issues into `.agent/memory/tasks.md`.
3. **Push Mode (Local -> Jira)**:
   - When marking tasks complete in `tasks.md`:
     ```bash
     node .agent/scripts/sync-tickets.js --push
     ```
   - This updates the corresponding Jira issue state to `Done` and posts a commit summary comment.
