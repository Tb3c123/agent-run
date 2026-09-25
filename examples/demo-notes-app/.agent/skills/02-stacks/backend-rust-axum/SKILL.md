---
name: stack-backend-rust-axum
description: >-
  Use this skill when developing ultra-high-performance, memory-safe backend services in Rust.
  Covers Axum web framework, Tokio async runtime, SQLx compile-time checked queries, and Serde.
---

# Rust & Axum Specialized Stack Skill

## 1. Architecture & Conventions
- **Framework**: Axum with Tokio runtime.
- **Data Access**: `sqlx` with compile-time verified queries (`sqlx::query_as!`).
- **Serialization**: `serde` with `#[derive(Serialize, Deserialize)]`.
- **Error Handling**: Custom error enum implementing `IntoResponse` with appropriate HTTP status codes.

## 2. Code Structure Example
```rust
use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

#[derive(Serialize, sqlx::FromRow)]
pub struct User {
    pub id: Uuid,
    pub email: String,
}

#[derive(Deserialize)]
pub struct CreateUserPayload {
    pub email: String,
}

pub async fn create_user(
    State(pool): State<Arc<PgPool>>,
    Json(payload): Json<CreateUserPayload>,
) -> Result<(StatusCode, Json<User>), StatusCode> {
    let user = sqlx::query_as!(
        User,
        "INSERT INTO users (id, email) VALUES ($1, $2) RETURNING id, email",
        Uuid::new_v4(),
        payload.email
    )
    .fetch_one(&*pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok((StatusCode::CREATED, Json(user)))
}
```
