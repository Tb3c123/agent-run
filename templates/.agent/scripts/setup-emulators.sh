#!/usr/bin/env bash

# setup-emulators.sh: Android Mobile & Android TV Emulator Helper & D-Pad Controller

set -e

echo "=================================================="
echo "   ANDROID & ANDROID TV EMULATOR ASSISTANT       "
echo "=================================================="

# Check for Android SDK
if [ -z "$ANDROID_HOME" ] && [ -z "$ANDROID_SDK_ROOT" ]; then
  if [ -d "$HOME/Library/Android/sdk" ]; then
    export ANDROID_HOME="$HOME/Library/Android/sdk"
  elif [ -d "$HOME/Android/Sdk" ]; then
    export ANDROID_HOME="$HOME/Android/Sdk"
  fi
fi

if [ -n "$ANDROID_HOME" ]; then
  echo "✅ Android SDK found at: $ANDROID_HOME"
  export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$PATH"
else
  echo "⚠️  Cảnh báo: Không tìm thấy ANDROID_HOME. Hãy cài đặt Android Command-Line Tools hoặc Android Studio."
fi

# Detect architecture (ARM vs x86_64)
ARCH=$(uname -m)
SYS_ARCH="arm64-v8a"
if [ "$ARCH" = "x86_64" ]; then
  SYS_ARCH="x86_64"
fi

COMMAND="${1:-menu}"

case "$COMMAND" in
  "tv-create")
    echo "📺 Đang tạo Android TV AVD (1080p)..."
    echo "y" | sdkmanager "system-images;android-34;google_atv;$SYS_ARCH" || true
    avdmanager create avd -n "Android_TV_1080p" -k "system-images;android-34;google_atv;$SYS_ARCH" --device "tv_1080p" --force
    echo "✅ Tạo thành công Android TV AVD: Android_TV_1080p"
    ;;

  "tv-start")
    echo "📺 Đang khởi chạy Android TV Emulator..."
    emulator -avd "Android_TV_1080p" -no-boot-anim &
    ;;

  "mobile-create")
    echo "📱 Đang tạo Android Mobile AVD (Pixel 7)..."
    echo "y" | sdkmanager "system-images;android-34;google_apis;$SYS_ARCH" || true
    avdmanager create avd -n "Pixel_7_API_34" -k "system-images;android-34;google_apis;$SYS_ARCH" --device "pixel_7" --force
    echo "✅ Tạo thành công Android Mobile AVD: Pixel_7_API_34"
    ;;

  "mobile-start")
    echo "📱 Đang khởi chạy Android Mobile Emulator..."
    emulator -avd "Pixel_7_API_34" &
    ;;

  "dpad")
    KEY="$2"
    case "$KEY" in
      "up") adb shell input keyevent 19 ;;
      "down") adb shell input keyevent 20 ;;
      "left") adb shell input keyevent 21 ;;
      "right") adb shell input keyevent 22 ;;
      "center"|"ok"|"select") adb shell input keyevent 23 ;;
      "back") adb shell input keyevent 4 ;;
      "home") adb shell input keyevent 3 ;;
      *) echo "Sử dụng: $0 dpad [up|down|left|right|ok|back|home]" ;;
    esac
    ;;

  *)
    echo "Lựa chọn thao tác:"
    echo "  1) bash setup-emulators.sh tv-create     : Tải system image & tạo AVD Android TV 1080p"
    echo "  2) bash setup-emulators.sh tv-start      : Khởi chạy giả lập Android TV"
    echo "  3) bash setup-emulators.sh mobile-create : Tải system image & tạo AVD Mobile Pixel 7"
    echo "  4) bash setup-emulators.sh mobile-start  : Khởi chạy giả lập Mobile"
    echo "  5) bash setup-emulators.sh dpad <key>    : Gửi phím remote TV qua ADB (up/down/left/right/ok/back/home)"
    echo "=================================================="
    ;;
esac
