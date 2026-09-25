---
name: stack-web-nextjs-react
description: >-
  Use this skill when developing Next.js (App Router) and React fullstack applications.
  Covers React Server Components (RSC), Server Actions, Tailwind CSS, Shadcn/UI, TanStack Query, and Zustand.
---

# Next.js & React Specialized Stack Skill

## Architecture & Conventions
- **App Router Directory**: Use `src/app/` with route groups `(marketing)`, `(dashboard)`, `(auth)`.
- **Server Components by Default**: Only add `'use client'` at the leaf nodes where interactive state (`useState`, `useEffect`, browser events) is required.
- **Data Fetching**: Fetch data directly in Server Components using async/await with native fetch cache tags (`revalidateTag`).
- **Data Mutations**: Use Server Actions (`'use server'`) validated with Zod schemas.
- **Client State**:
  - Server state: TanStack Query (React Query).
  - Global UI state: Zustand.
- **Styling**: Tailwind CSS + Shadcn/UI (Radix UI primitives).

## Code Structure Example
```typescript
// src/app/(dashboard)/todos/page.tsx (Server Component)
import { Suspense } from 'react';
import { TodoList } from './_components/todo-list';
import { CreateTodoForm } from './_components/create-todo-form';

export default async function TodosPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <CreateTodoForm />
      <Suspense fallback={<p>Loading tasks...</p>}>
        <TodoList />
      </Suspense>
    </div>
  );
}
```
