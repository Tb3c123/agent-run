---
name: stack-web-vue-nuxt
description: >-
  Use this skill when developing Vue 3 and Nuxt 3 web applications.
  Covers Composition API with script setup, Pinia state management, Nitro server engine, and Tailwind CSS.
---

# Vue 3 & Nuxt 3 Specialized Stack Skill

## Architecture & Conventions
- **Framework**: Nuxt 3 with Nitro server engine.
- **Components**: Single File Components (SFC) with `<script setup lang="ts">`.
- **State Management**: Pinia stores with Composition API syntax (`defineStore`).
- **Server Routes**: Place API endpoints in `server/api/`.
- **Auto-Imports**: Leverage Nuxt 3 auto-imports for composables, components, and utilities cleanly.

## Code Structure Example
```vue
<script setup lang="ts">
interface TodoItem {
  id: string
  title: string
  completed: boolean
}

const { data: todos, refresh } = await useFetch<TodoItem[]>('/api/todos')
const newTitle = ref('')

async function addTodo() {
  if (!newTitle.value.trim()) return
  await $fetch('/api/todos', {
    method: 'POST',
    body: { title: newTitle.value }
  })
  newTitle.value = ''
  await refresh()
}
</script>

<template>
  <main class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Nuxt 3 Tasks</h1>
    <form @submit.prevent="addTodo" class="flex gap-2 mb-6">
      <input v-model="newTitle" placeholder="What needs doing?" class="border p-2 rounded flex-1" />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
    </form>
    <ul class="space-y-2">
      <li v-for="todo in todos" :key="todo.id" class="p-3 bg-gray-50 rounded border">
        {{ todo.title }}
      </li>
    </ul>
  </main>
</template>
```
