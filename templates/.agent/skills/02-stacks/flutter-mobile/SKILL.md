---
name: stack-flutter-mobile
description: >-
  Use this skill when targeting Android and iOS smartphones and tablets in Flutter.
  Covers Gradle tuning, Android permissions, ProGuard, CocoaPods/SPM, Podfile, Info.plist privacy permissions, and Cupertino widgets.
---

# Flutter Mobile (iOS & Android) Specialized Stack Skill

## 1. Android Mobile Specifics
- **Gradle & SDK Target**: Ensure `compileSdkVersion` and `targetSdkVersion` match current Google Play standards (SDK 34+).
- **Runtime Permissions**:
  - Declare permissions in `android/app/src/main/AndroidManifest.xml` (e.g., `CAMERA`, `ACCESS_FINE_LOCATION`).
  - Request permissions dynamically in Dart using `permission_handler`.
- **ProGuard / R8 Obfuscation**: Configure `android/app/proguard-rules.pro` to preserve model classes used in JSON serialization (`-keepclassmembers class * { ... }`).
- **Splash Screen**: Use `flutter_native_splash` to prevent blank white screens during app cold start.

## 2. iOS Mobile Specifics
- **CocoaPods & Podfile**:
  - Ensure `platform :ios, '14.0'` (or higher) is configured in `ios/Podfile`.
- **Privacy Strings in `Info.plist`**:
  - Always provide meaningful user-facing explanations for permissions:
    - `NSCameraUsageDescription`: *"We require camera access to scan QR codes."*
    - `NSPhotoLibraryUsageDescription`: *"We require photo access to upload profile pictures."*
- **Adaptive UI**:
  - Use `Adaptive` constructors (e.g., `Switch.adaptive()`, `CircularProgressIndicator.adaptive()`).
  - Follow Apple Human Interface Guidelines for iOS navigation bars and gesture swipes.
