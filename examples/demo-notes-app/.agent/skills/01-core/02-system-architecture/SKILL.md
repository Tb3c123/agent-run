---
name: core-system-architecture
description: >-
  Use this skill during Phase 2 to evaluate architectural tradeoffs, select tech stacks,
  design high-level system diagrams (Mermaid), and record Architecture Decision Records (ADR).
---

# System Architecture & Tech Lead Skill

## Purpose
Establish an extensible, decoupled, and maintainable software architecture tailored to the verified PRD requirements.

## Procedure

### Step 1: Architectural Evaluation & Tech Stack Selection
Analyze constraints and recommend:
- **Architectural Pattern**:
  - *Clean Architecture / Ports & Adapters*: For enterprise backends with complex domain logic.
  - *Modular Monolith*: Recommended default for rapid development and clean domain boundaries.
  - *Microservices*: Only if team size or independent scaling requirements strictly mandate.
- **Frontend / Client Stack**: Evaluate responsiveness, rendering mode (SSR vs SPA), platform targets.
- **Backend Stack**: Evaluate concurrency requirements (Go/Node/FastAPI), async tasks, IO-bound vs CPU-bound workloads.
- **Data Layer**: Relational (PostgreSQL) vs Document (MongoDB) vs In-memory (Redis).

### Step 2: High-Level Architecture Documentation
Generate `.agent/memory/ARCHITECTURE.md` using [template-architecture.md](./template-architecture.md). Include Mermaid diagrams representing:
- Component/Container architecture.
- Request/Response data flow.
- Authentication & authorization lifecycle.

### Step 3: Record ADRs (Architecture Decision Records)
For every major decision (e.g., Choosing PostgreSQL over MySQL, adopting Next.js App Router, selecting BLoC for Flutter), write an ADR in `.agent/memory/adr/000X-<title>.md`.
