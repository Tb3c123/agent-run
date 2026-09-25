---
name: stack-flutter-core
description: >-
  Use this skill for shared Flutter architectural patterns across all platforms (Mobile, TV, Web).
  Covers Clean Architecture (Data/Domain/Presentation), BLoC / Riverpod state management, Dio HTTP Client, and Hive local cache.
---

# Flutter Core Architecture Specialized Stack Skill

## Architecture & Conventions
- **Clean Architecture Pattern**:
  - `lib/core/`: Network clients, error handlers, theme, constants.
  - `lib/features/<feature>/`:
    - `data/`: Models, remote/local datasources, repository implementations.
    - `domain/`: Entities, usecases, repository interfaces.
    - `presentation/`: BLoCs/Controllers, Pages, Widgets.
- **State Management**: BLoC (`flutter_bloc`) or Riverpod (`flutter_riverpod`).
- **Networking**: `dio` with custom interceptors for Auth JWT refresh tokens and logging.
- **Local Storage**: `hive_flutter` or `isar` for fast offline-first caching.

## Code Structure Example
```dart
// domain/repositories/user_repository.dart
abstract class UserRepository {
  Future<Either<Failure, UserEntity>> getUserProfile();
}

// presentation/bloc/user_bloc.dart
class UserBloc extends Bloc<UserEvent, UserState> {
  final GetUserProfileUseCase getUserProfile;

  UserBloc({required this.getUserProfile}) : super(UserInitial()) {
    on<FetchUserProfileEvent>((event, emit) async {
      emit(UserLoading());
      final result = await getUserProfile();
      result.fold(
        (failure) => emit(UserError(failure.message)),
        (user) => emit(UserLoaded(user)),
      );
    });
  }
}
```
