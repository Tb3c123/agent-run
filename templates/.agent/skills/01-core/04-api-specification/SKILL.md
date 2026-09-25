---
name: core-api-specification
description: >-
  Use this skill during Phase 2 to produce contract-first API specifications (OpenAPI 3.0 / REST / GraphQL / gRPC),
  defining status codes, request/response payloads, pagination, and auth headers before coding.
---

# API Specification & Contract-First Design Skill

## Purpose
Prevent frontend and backend integration mismatch by defining, validating, and locking the API contract before writing implementation code.

## Procedure

### Step 1: Design RESTful Resource URIs
- Use plural nouns for resources: `/api/v1/users`, `/api/v1/orders`.
- Use nested URIs for child resources: `/api/v1/orders/{orderId}/items`.
- Use standard HTTP methods:
  - `GET`: Read (idempotent, safe).
  - `POST`: Create.
  - `PUT`: Complete replace.
  - `PATCH`: Partial update.
  - `DELETE`: Remove.

### Step 2: Standardize Response Envelope
All API endpoints must conform to a predictable envelope:
```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Step 3: Author OpenAPI 3.0 Spec
Draft the specification in `.agent/memory/openapi.yaml` using [template-openapi.yaml](./template-openapi.yaml).
Ensure all error statuses (400, 401, 403, 404, 422, 500) are explicitly typed.
