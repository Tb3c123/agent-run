---
name: core-prd-requirements
description: >-
  Use this skill during Phase 1 to interview the user, clarify project requirements,
  define target personas, establish MVP scope, and author a comprehensive Product Requirements Document (PRD).
---

# Product Requirements & Discovery Skill

## Purpose
Prevent premature implementation and architectural debt by thoroughly exploring the problem space, user personas, MVP boundary, and acceptance criteria before writing code.

## Procedure

### Step 1: Conduct Discovery Interview
Engage the user with targeted questions covering:
1. **Core Problem**: What exact pain point does this software solve?
2. **Target Audience**: Who are the primary personas using this application?
3. **Key Features & MVP Scope**: What features are strictly required for the Minimum Viable Product (MVP)? What can be deferred to v2?
4. **Non-Functional Requirements**: Expected concurrency/load, performance benchmarks, compliance/security constraints, offline capabilities.
5. **Success Metrics**: How will success be measured?

### Step 2: Author PRD
Compile findings into `.agent/memory/PRD.md` using the template provided at [template-prd.md](./template-prd.md).

### Step 3: Quality Gate 1 (Sign-Off)
Present the PRD to the user and request explicit confirmation:
*"I have documented the complete PRD in `.agent/memory/PRD.md`. Please review and confirm so we can proceed to Phase 2 (Architecture & System Design)."*
Once approved, update `currentPhase` in `.agent/memory/project_state.json` to `PHASE_2_ARCHITECTURE`.
