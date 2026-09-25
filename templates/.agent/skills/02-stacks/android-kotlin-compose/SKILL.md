---
name: stack-android-kotlin-compose
description: >-
  Use this skill when developing native Android applications with Kotlin and Jetpack Compose.
  Covers Declarative UI (Compose), StateFlow, ViewModel, Coroutines, Room DB, Hilt Dependency Injection, and Clean Architecture.
---

# Android Native Kotlin & Jetpack Compose Specialized Stack Skill

## 1. Architecture & Conventions
- **Clean Architecture + MVI/MVVM**:
  - `data/`: Room Database, Retrofit/Ktor network client, Repository implementations.
  - `domain/`: Business models, UseCases, Repository interfaces.
  - `presentation/`: Jetpack Compose Screens, ViewModels, UI State (`StateFlow`).
- **Dependency Injection**: Hilt (`@HiltViewModel`, `@AndroidEntryPoint`, `@Inject`).
- **Asynchronous**: Kotlin Coroutines with structured concurrency and `StateFlow` / `SharedFlow`.
- **UI State Modeling**: Sealed interfaces for UI states (`Loading`, `Success(val data)`, `Error(val message)`).

## 2. Code Structure Example
```kotlin
// presentation/todo/TodoViewModel.kt
@HiltViewModel
class TodoViewModel @Inject constructor(
    private val getTodosUseCase: GetTodosUseCase,
    private val addTodoUseCase: AddTodoUseCase
) : ViewModel() {

    private val _uiState = MutableStateFlow<TodoUiState>(TodoUiState.Loading)
    val uiState: StateFlow<TodoUiState> = _uiState.asStateFlow()

    init {
        loadTodos()
    }

    private fun loadTodos() {
        viewModelScope.launch {
            getTodosUseCase()
                .catch { e -> _uiState.value = TodoUiState.Error(e.message ?: "Unknown error") }
                .collect { todos -> _uiState.value = TodoUiState.Success(todos) }
        }
    }
}

// presentation/todo/TodoScreen.kt
@Composable
fun TodoScreen(viewModel: TodoViewModel = hiltViewModel()) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()

    Scaffold(topBar = { TopAppBar(title = { Text("Kotlin Android Tasks") }) }) { padding ->
        Box(modifier = Modifier.padding(padding).fillMaxSize()) {
            when (val s = state) {
                is TodoUiState.Loading -> CircularProgressIndicator(Modifier.align(Alignment.Center))
                is TodoUiState.Success -> LazyColumn {
                    items(s.todos) { todo ->
                        Text(todo.title, modifier = Modifier.padding(16.dp))
                    }
                }
                is TodoUiState.Error -> Text("Error: ${s.message}", color = MaterialTheme.colorScheme.error)
            }
        }
    }
}
```
