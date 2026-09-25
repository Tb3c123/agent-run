# CODING STANDARDS & BEST PRACTICES

## 1. Clean Code & Modularity
- **Single Responsibility Principle (SRP)**: Each function, class, or component must have one well-defined responsibility.
- **Max File Size**: Keep files under 300 lines. Break large components into sub-components or service helpers.
- **Explicit Types**: In TypeScript/Python/Go/Dart, strictly define return types, parameter types, and avoid `any` or untyped dictionaries.
- **Fail Early**: Validate inputs at the boundary using schema validators (Zod, Pydantic, class-validator).

## 2. Error Handling & Logging
- **Structured Errors**: Never swallow errors silently or return empty arrays on failures.
- **Custom App Errors**: Create domain-specific error classes with HTTP status codes and human-readable messages.
- **Logging**: Use structured JSON logging with context (`correlation_id`, `user_id`, `timestamp`). Do NOT use `console.log` in production code.

## 3. Security Fundamentals
- Parameterize all database queries (prevent SQL Injection).
- Sanitize user HTML inputs (prevent XSS).
- Use timing-safe comparisons for sensitive token evaluations.
- Set appropriate HTTP security headers (Helmet, CORS policies).
