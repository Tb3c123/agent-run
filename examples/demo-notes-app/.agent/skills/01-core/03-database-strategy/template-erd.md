# Database Schema & ERD Specification

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    USERS {
        uuid id PK
        string email UK
        string password_hash
        string role
        timestamp created_at
    }
    ORDERS ||--|{ ORDER_ITEMS : contains
    ORDERS {
        uuid id PK
        uuid user_id FK
        string status
        decimal total_amount
        timestamp created_at
    }
    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal unit_price
    }
    PRODUCTS ||--o{ ORDER_ITEMS : ordered_in
    PRODUCTS {
        uuid id PK
        string name
        decimal price
        int stock
    }
```

## 2. Table Specifications & Indexes

### Table: `users`
- `id`: UUID (Primary Key, default `gen_random_uuid()`)
- `email`: VARCHAR(255) UNIQUE NOT NULL
- `password_hash`: VARCHAR(255) NOT NULL
- `created_at`: TIMESTAMPTZ DEFAULT NOW()
- *Indexes*:
  - `idx_users_email` (UNIQUE B-Tree)

### Table: `orders`
- `id`: UUID (Primary Key)
- `user_id`: UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
- `status`: VARCHAR(50) DEFAULT 'PENDING'
- `total_amount`: NUMERIC(12, 2) NOT NULL
- *Indexes*:
  - `idx_orders_user_id` (B-Tree)
  - `idx_orders_created_at` (B-Tree)

## 3. Migration Plan
- Migration tool: [Prisma / Alembic / Goose / Drift]
- Seed strategy: Initial admin user, test datasets.
