#!/usr/bin/env bash

# check-env.sh: Verify local runtime environment and dependencies

echo "=== Verifying Local Runtime Environment ==="

if command -v node >/dev/null 2>&1; then
  echo "✅ Node.js: $(node -v)"
fi

if command -v python3 >/dev/null 2>&1; then
  echo "✅ Python 3: $(python3 --version)"
fi

if command -v git >/dev/null 2>&1; then
  echo "✅ Git: $(git --version)"
fi

if command -v docker >/dev/null 2>&1; then
  echo "✅ Docker: $(docker --version)"
fi

if command -v flutter >/dev/null 2>&1; then
  echo "✅ Flutter: $(flutter --version | head -n 1)"
fi

if command -v go >/dev/null 2>&1; then
  echo "✅ Go: $(go version)"
fi

echo "==========================================="
