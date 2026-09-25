---
name: core-environment-setup
description: >-
  Use this skill during Phase 3 to configure developer runtimes, prompt the user before creating virtual environments
  (e.g., Python .venv or Node isolation), install project package dependencies, and run smoke tests on the test runner.
---

# Environment & Dependency Setup Skill

## Purpose
Ensure a clean, isolated, reproducible execution environment with all required dependencies installed and the test runner verified before writing business code.

## Procedure

### Step 1: Prompt the User for Virtual Environment Creation
Before executing any environment initialization commands, **YOU MUST ASK THE USER**:
> *"Before we install packages and write code, should I create an isolated virtual environment (e.g., `python3 -m venv .venv` for Python, or local `node_modules` for Node.js, or check Flutter SDK)?"*

- If Python:
  - If approved, run: `python3 -m venv .venv && source .venv/bin/activate`
  - Upgrade pip: `pip install --upgrade pip`
- If Node.js:
  - Verify Node version: `node -v`
  - Initialize `package.json` if absent: `npm init -y`
- If Flutter / Android Native:
  - Run: `flutter doctor -v` or check Android SDK (`$ANDROID_HOME`).
  - **Ask user about Emulators**: *"Do you need to set up or launch an Android Mobile or Android TV emulator for testing?"*
  - If approved, use helper script: `bash .agent/scripts/setup-emulators.sh`
- If Go:
  - Run: `go mod init <module-name>` if `go.mod` is missing.

### Step 2: Android & Android TV Emulator Setup & Testing
When mobile or TV targets are involved, prepare and verify the virtual testing device:

#### 1. Android TV Emulator Setup Commands:
```bash
# Check available system images for TV
sdkmanager --list | grep "android-tv\|google_atv"

# Download Android TV system image (API 34)
sdkmanager "system-images;android-34;google_atv;arm64-v8a" # (Use x86_64 on Intel/AMD)

# Create Android TV AVD with 1080p TV skin
avdmanager create avd -n "Android_TV_1080p" \
  -k "system-images;android-34;google_atv;arm64-v8a" \
  --device "tv_1080p" --force

# Launch Android TV Emulator
emulator -avd "Android_TV_1080p" -no-boot-anim -gpu host &
```

#### 2. Android Mobile Emulator Setup Commands:
```bash
# Download Android Phone image
sdkmanager "system-images;android-34;google_apis;arm64-v8a"

# Create Mobile AVD (Pixel 7 profile)
avdmanager create avd -n "Pixel_7_API_34" \
  -k "system-images;android-34;google_apis;arm64-v8a" \
  --device "pixel_7" --force

# Launch Mobile Emulator
emulator -avd "Pixel_7_API_34" &
```

#### 3. ADB Remote & D-Pad Control Reference (For Testing TV UI):
| Action | ADB Command | KeyCode |
| :--- | :--- | :--- |
| **D-Pad UP** | `adb shell input keyevent 19` | `KEYCODE_DPAD_UP` |
| **D-Pad DOWN** | `adb shell input keyevent 20` | `KEYCODE_DPAD_DOWN` |
| **D-Pad LEFT** | `adb shell input keyevent 21` | `KEYCODE_DPAD_LEFT` |
| **D-Pad RIGHT** | `adb shell input keyevent 22` | `KEYCODE_DPAD_RIGHT` |
| **D-Pad SELECT / OK** | `adb shell input keyevent 23` | `KEYCODE_DPAD_CENTER` |
| **BACK Button** | `adb shell input keyevent 4` | `KEYCODE_BACK` |
| **HOME Button** | `adb shell input keyevent 3` | `KEYCODE_HOME` |

---

### Step 3: Install Package Dependencies
Install core packages according to the chosen tech stack:
- Node.js: `npm install` (or `pnpm install` / `yarn`)
- Python: `pip install -r requirements.txt` (or `poetry install` / `pipenv install`)
- Flutter: `flutter pub get`
- Go: `go mod tidy`

### Step 4: Smoke Test the Test Runner
Verify that the automated test runner is functioning properly before moving to Phase 4:
- Run empty smoke test:
  - Python: `pytest --version`
  - Node: `npm test -- --version` (or `vitest --version` / `jest --version`)
  - Flutter: `flutter test`
  - Android (Kotlin): `./gradlew test`
  - Go: `go test ./...`
- Confirm exit code 0. If missing, configure the test runner configuration file.
