# GIT WORKFLOW & CONVENTIONAL COMMITS

## 1. Branching Strategy
- `main` / `master`: Production-ready code only.
- `develop`: Staging & integration branch.
- Feature branches: `feat/<feature-name>` or `feat/<ticket-id>-<short-description>`.
- Bugfix branches: `fix/<bug-name>` or `fix/<ticket-id>-<short-description>`.
- Refactor branches: `refactor/<scope>`.

## 2. Conventional Commit Format
Every commit message must follow the Conventional Commits specification:
```text
<type>(<scope>): <short description in present tense>

[optional body explaining rationale]

[optional footer, e.g., Closes #123, Refs JIRA-456]
```

### Types:
- `feat`: A new user-facing feature.
- `fix`: A bug fix.
- `docs`: Documentation changes only.
- `style`: Formatting, missing semi-colons, no code logic changes.
- `refactor`: Refactoring production code without changing behavior.
- `test`: Adding or correcting tests.
- `chore`: Updating dependencies, build scripts, configs.
