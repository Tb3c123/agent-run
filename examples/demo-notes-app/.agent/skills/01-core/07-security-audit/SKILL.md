---
name: core-security-audit
description: >-
  Use this skill during Phase 6 to scan code for OWASP Top 10 vulnerabilities, detect hardcoded secrets,
  audit authentication/authorization flows, and verify sanitization of all inputs.
---

# Security & Code Audit Skill

## Purpose
Identify and eliminate security vulnerabilities before code reaches staging or production environments.

## Procedure

### Step 1: Secrets Scanning
- Verify no private keys, passwords, API tokens, or connection strings exist in git-tracked files.
- Ensure `.agent/.env.agent` and `.env` are listed in `.gitignore`.

### Step 2: OWASP Top 10 Verification
1. **Injection (SQL/Command/NoSQL)**: Verify all database calls use parameter binding or typed ORM models.
2. **Broken Authentication**: Verify JWT expiration, secure cookie flags (`HttpOnly`, `Secure`, `SameSite=Strict`), and password hashing algorithms (Argon2id or bcrypt with cost >= 12).
3. **Cross-Site Scripting (XSS)**: Verify template rendering escapes untrusted inputs.
4. **Broken Access Control**: Verify endpoint handlers validate current user ownership or required RBAC roles.
5. **Security Misconfiguration**: Verify CORS origins are not wildcard `*` with credentials enabled.

### Step 3: Run Automated Linters & Audits
- Node.js: `npm audit`
- Python: `pip-audit` or `safety check`
- Go: `govulncheck ./...`
