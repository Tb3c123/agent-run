---
name: stack-flutter-web
description: >-
  Use this skill when building Flutter web applications and Progressive Web Apps (PWAs).
  Covers Responsive LayoutBuilder, GoRouter path URL strategy (no # symbol), CanvasKit/Wasm rendering, and SEO meta tags.
---

# Flutter Web & PWA Specialized Stack Skill

## 1. Web Architecture & URL Routing
- **Clean URLs without Hash (`#`)**:
  - Always call `usePathUrlStrategy()` from `flutter_web_plugins/url_strategy.dart` in `main.go`.
- **Declarative Navigation**:
  - Use `go_router` for deep linking, browser back/forward history management, and parameterized URLs (`/users/:id`).

## 2. Responsive UI Design
- Use `LayoutBuilder` and `MediaQuery` to define breakpoints:
  - Mobile: `< 600px` (Single column, bottom navigation).
  - Tablet: `600px - 1024px` (Navigation rail, 2-column grid).
  - Desktop: `> 1024px` (Sidebar drawer, multi-column dashboard).

## 3. Web Compilation & Performance
- **CanvasKit vs Wasm**:
  - Build command: `flutter build web --wasm` for modern browsers.
- **PWA Manifest**:
  - Update `web/manifest.json` with app name, theme color, icons.
- **SEO & Meta Tags**:
  - Update `web/index.html` with title, OpenGraph tags, and favicon.
