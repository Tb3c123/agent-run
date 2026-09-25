---
name: core-devops-deployment
description: >-
  Use this skill during Phase 7 to construct multi-stage Dockerfiles, configure docker-compose for local development,
  and write robust GitHub Actions CI/CD workflows.
---

# DevOps, Docker & CI/CD Deployment Skill

## Purpose
Package applications into lightweight, secure container images and automate verification via Continuous Integration.

## Procedure

### Step 1: Multi-Stage Dockerfile Best Practices
1. **Builder Stage**: Include SDKs and compilation tools to compile binaries or bundle assets.
2. **Runner Stage**: Use minimal distroless or alpine base images (`node:20-alpine`, `python:3.11-slim`, `gcr.io/distroless/static`).
3. **Non-Root User**: Never run the container process as `root`. Create and switch to a non-privileged `appuser`.
4. **Health Check**: Include a `HEALTHCHECK` directive hitting `/health`.

### Step 2: Local Docker Compose Environment
Use [template-docker-compose.yml](./template-docker-compose.yml) to define services:
- Application service.
- PostgreSQL / Database service with persistent volume.
- Redis cache service.

### Step 3: GitHub Actions CI Workflow
Create `.github/workflows/ci.yml` to automatically:
1. Check out repository.
2. Setup runtime (Node/Python/Go/Flutter).
3. Install dependencies.
4. Run linters & static analysis.
5. Run test suite.
6. Verify Docker build succeeds.
