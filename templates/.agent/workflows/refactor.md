# Workflow: Safe Code Refactoring

Follow this workflow when improving code structure without changing external behavior:

1. **Pre-flight Test Run**:
   - Run the full test suite. Every existing test MUST be green before refactoring starts.
2. **Identify Refactor Goal**:
   - E.g., Extract duplicate logic into helper, decouple repository from controller, improve typing.
3. **Incremental Changes**:
   - Refactor in small, verifiable steps.
   - Run test suite after each atomic change.
4. **Post-Refactor Quality Audit**:
   - Check linting: `npm run lint`, `flake8`, `dart analyze`, or `golangci-lint`.
   - Ensure 100% test pass.
