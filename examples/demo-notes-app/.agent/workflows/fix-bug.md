# Workflow: Bug Investigation & Fixing

Follow this workflow whenever diagnosing or resolving a bug:

1. **Reproduce with a Test**:
   - Write a unit or integration test that reproduces the bug (it MUST fail first).
   - Never attempt to patch code without an automated reproduction test.
2. **Root Cause Analysis (RCA)**:
   - Identify the exact line or logic failure. Inspect stack traces, logs, or error codes.
3. **Apply Minimal Fix**:
   - Apply the targeted fix without introducing breaking changes to other components.
4. **Regression Verification**:
   - Run the reproduction test: verify it now passes.
   - Run the entire test suite: verify zero regressions across the codebase.
5. **Log & Commit**:
   - Commit with format `fix(<scope>): <description>`.
