---
name: stack-mobile-react-native
description: >-
  Use this skill when developing cross-platform mobile applications in React Native and Expo (SDK 51+).
  Covers Expo Router, React Navigation, NativeWind (Tailwind), Reanimated, and TypeScript.
---

# React Native & Expo Specialized Stack Skill

## 1. Architecture & Conventions
- **Framework**: Expo SDK (prefer Managed Workflow with Config Plugins).
- **Navigation**: Expo Router (File-based routing matching Next.js paradigms) or `@react-navigation/native`.
- **Styling**: `nativewind` (Tailwind CSS for React Native) or `StyleSheet.create`.
- **Animations**: `react-native-reanimated`.
- **State**: TanStack Query + Zustand.

## 2. Code Structure Example
```tsx
// app/(tabs)/index.tsx
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

interface Todo {
  id: string;
  title: string;
}

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', title: 'Setup Agent-Pack' },
    { id: '2', title: 'Test on Mobile Device' }
  ]);

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-gray-900 mb-4">React Native Tasks</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4 bg-gray-100 rounded-lg mb-2 border border-gray-200">
            <Text className="text-base text-gray-800">{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
```
