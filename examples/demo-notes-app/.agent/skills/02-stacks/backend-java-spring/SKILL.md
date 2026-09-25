---
name: stack-backend-java-spring
description: >-
  Use this skill when developing enterprise backends and microservices in Java 21+ and Spring Boot 3.
  Covers Spring Data JPA, Hibernate, Spring Security 6, REST Controllers, and Layered Architecture.
---

# Java & Spring Boot 3 Specialized Stack Skill

## 1. Architecture & Conventions
- **Layered Architecture**:
  - `controller`: `@RestController`, `@RequestMapping`, validation with `@Valid`.
  - `service`: `@Service`, `@Transactional` business logic.
  - `repository`: Spring Data JPA interfaces extending `JpaRepository`.
  - `model` / `entity`: JPA `@Entity`, `@Table`, `@Id`.
  - `dto`: Records or POJOs for request/response encapsulation.
- **Security**: Spring Security 6 with stateless JWT Bearer token authentication filter.
- **Build Tool**: Gradle (`build.gradle.kts`) or Maven (`pom.xml`).

## 2. Code Structure Example
```java
// UserController.java
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody CreateUserRequestDto request) {
        UserResponseDto created = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}
```
