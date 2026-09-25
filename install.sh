#!/usr/bin/env bash

# install.sh: One-line installer for Agent-Pack

set -e

echo "=================================================="
echo "          AGENT-PACK INSTALLER SCRIPT             "
echo "=================================================="

# Check for node
if ! command -v node >/dev/null 2>&1; then
  echo "❌ Lỗi: Node.js chưa được cài đặt trên máy của bạn."
  echo "Vui lòng cài đặt Node.js (>= 16.x) trước khi tiếp tục: https://nodejs.org"
  exit 1
fi

TARGET_DIR="${1:-.}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "📦 Đang cài đặt bộ .agent vào thư mục: $TARGET_DIR"

node "$SCRIPT_DIR/bin/agent-pack.js" init "$TARGET_DIR"

echo "=================================================="
