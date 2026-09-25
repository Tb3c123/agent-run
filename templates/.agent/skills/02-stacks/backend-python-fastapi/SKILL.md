---
name: stack-backend-python-fastapi
description: >-
  Use this skill when developing high-performance Python backends, microservices, and AI APIs using FastAPI.
  Covers async def, Pydantic v2 schemas, SQLAlchemy 2.0 Async Session, Alembic, and Celery/Redis background tasks.
---

# FastAPI & Python Specialized Stack Skill

## Architecture & Conventions
- **Framework**: FastAPI with Uvicorn ASGI server.
- **Validation**: Pydantic v2 models for Request DTO, Response DTO, and Settings.
- **Database**: SQLAlchemy 2.0 with `asyncpg` driver and `AsyncSession` dependency injection.
- **Migrations**: Alembic with auto-generating revision scripts.
- **Background Tasks**: Celery with Redis broker, or FastAPI `BackgroundTasks` for lightweight jobs.

## Code Structure Example
```python
# app/routers/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db_session
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    payload: UserCreate,
    db: AsyncSession = Depends(get_db_session)
):
    service = UserService(db)
    user = await service.create_user(payload)
    if not user:
        raise HTTPException(status_code=400, detail="User could not be created")
    return user
```
