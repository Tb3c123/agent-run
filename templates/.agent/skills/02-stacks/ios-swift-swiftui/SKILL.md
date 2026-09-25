---
name: stack-ios-swift-swiftui
description: >-
  Use this skill when developing native iOS applications with Swift and SwiftUI.
  Covers SwiftUI declarative layouts, SwiftData / CoreData, Swift Concurrency (async/await, Actor), Combine, and MVVM.
---

# iOS Native Swift & SwiftUI Specialized Stack Skill

## 1. Architecture & Conventions
- **Pattern**: MVVM with `@Observable` (iOS 17+) or `ObservableObject`.
- **Concurrency**: Modern Swift Concurrency (`async/await`, `TaskGroup`, `actor` for thread-safe state).
- **Data Persistence**: SwiftData (`@Model`) or CoreData.
- **Networking**: `URLSession` with `Codable` models.

## 2. Code Structure Example
```swift
import SwiftUI
import SwiftData

@Model
final class TaskItem {
    var title: String
    var isDone: Bool
    var createdAt: Date

    init(title: String, isDone: Bool = false) {
        self.title = title
        self.isDone = isDone
        self.createdAt = Date()
    }
}

struct TaskListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \TaskItem.createdAt, order: .reverse) private var tasks: [TaskItem]
    @State private var newTitle = ""

    var body: some View {
        NavigationStack {
            List {
                Section {
                    HStack {
                        TextField("New Task", text: $newTitle)
                        Button("Add") {
                            guard !newTitle.isEmpty else { return }
                            modelContext.insert(TaskItem(title: newTitle))
                            newTitle = ""
                        }
                    }
                }
                Section("All Tasks") {
                    ForEach(tasks) { task in
                        HStack {
                            Text(task.title)
                            Spacer()
                            if task.isDone {
                                Image(systemName: "checkmark.circle.fill").foregroundColor(.green)
                            }
                        }
                    }
                }
            }
            .navigationTitle("SwiftUI Tasks")
        }
    }
}
```
