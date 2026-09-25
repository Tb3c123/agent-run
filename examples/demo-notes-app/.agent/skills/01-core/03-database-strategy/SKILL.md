---
name: core-database-strategy
description: >-
  Use this skill during Phase 2 to model database schemas, draw Entity Relationship Diagrams (ERD) in Mermaid,
  design primary/foreign keys, configure indexes, and outline database migration strategies.
---

# Database Strategy & Data Modeling Skill

## Purpose
Design high-performance, normalized, consistent database schemas with proper index strategies and seamless migration tooling.

## Procedure

### Step 1: Conceptual & Logical Data Modeling
- Identify entities, attributes, relationships (1:1, 1:N, N:M).
- Normalize to 3NF where appropriate; selectively denormalize only for proven read-heavy latency constraints.
- Define primary keys (UUIDv7 or BigSerial/ULID) and foreign key cascade rules.

### Step 2: Indexing & Performance Strategy
- Add B-Tree indexes for all foreign keys and frequently queried filter columns (`WHERE status = 'ACTIVE'`).
- Add Composite indexes following the leftmost-prefix rule for multi-column queries (`tenant_id`, `created_at`).
- Add Unique constraints for deduplication (`UNIQUE(org_id, slug)`).

### Step 3: Migration & ORM Selection
- Choose the migration engine based on stack:
  - TypeScript/Node: Prisma or Drizzle ORM.
  - Python: Alembic + SQLAlchemy.
  - Go: Goose, Golang-Migrate, or GORM AutoMigrate.
  - Flutter: Hive / Isar / Drift for SQLite.

### Step 4: Documentation
Output the complete ERD and schema specification to `.agent/memory/DATABASE_SCHEMA.md` using [template-erd.md](./template-erd.md).
