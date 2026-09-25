---
name: stack-backend-node-nest
description: >-
  Use this skill when developing enterprise Node.js and TypeScript backends using NestJS.
  Covers Modularity, Dependency Injection, Prisma/Drizzle ORM, Zod validation pipes, and JWT Guards.
---

# NestJS Enterprise Backend Specialized Stack Skill

## Architecture & Conventions
- **Modular Architecture**: Feature modules (`UsersModule`, `AuthModule`, `OrdersModule`).
- **Layers**:
  - `Controller`: Handles HTTP routing, Swagger decorators, DTO binding.
  - `Service`: Core business logic, transactional flows.
  - `Repository / Data Layer`: Direct database queries via Prisma Client or Drizzle.
- **Validation**: Schema validation via Zod pipes or `class-validator` with `ValidationPipe({ whitelist: true })`.
- **Security**: Passport-JWT Strategy, custom `@CurrentUser()` decorator, `@Roles()` guard.

## Code Structure Example
```typescript
// users.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile() {
    return this.usersService.getCurrentUserProfile();
  }
}
```
