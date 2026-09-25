---
name: stack-backend-go-service
description: >-
  Use this skill when developing high-concurrency, low-latency microservices, CLI tools, and APIs in Go (Golang).
  Covers Idiomatic Go, Gin/Fiber, pgx connection pooling, Goroutines/Channels concurrency, and Clean Architecture.
---

# Go (Golang) Microservice Specialized Stack Skill

## Architecture & Conventions
- **Standard Project Layout**:
  - `cmd/<app>/main.go`: Entrypoint, dependency wiring.
  - `internal/`: Private application code.
    - `domain/`: Business entities and interfaces.
    - `service/` or `usecase/`: Application business logic.
    - `repository/`: Database interactions via `pgx` or `gORM`.
    - `handler/`: HTTP (Gin / Fiber) or gRPC handlers.
  - `pkg/`: Reusable public utility packages.
- **Concurrency**: Always manage goroutines lifecycle with `context.Context` and `sync.WaitGroup`.
- **Error Handling**: Wrap errors with context (`fmt.Errorf("failed to fetch user: %w", err)`). Never discard errors.

## Code Structure Example
```go
package handler

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"myproject/internal/domain"
)

type UserHandler struct {
	service domain.UserService
}

func NewUserHandler(s domain.UserService) *UserHandler {
	return &UserHandler{service: s}
}

func (h *UserHandler) CreateUser(c *gin.Context) {
	var req domain.CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.service.Create(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, user)
}
```
