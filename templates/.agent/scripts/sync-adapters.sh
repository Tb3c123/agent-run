#!/usr/bin/env bash

# sync-adapters.sh: Ensure GEMINI.md, CLAUDE.md, and .cursorrules point to .agent/rules/AGENTS.md

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "Synchronizing IDE rules adapters in: $ROOT_DIR"

cat << 'EOF' > "$ROOT_DIR/GEMINI.md"
# Project AI Instructions & Protocols (Antigravity)
This repository uses the Agent-Pack SDLC system.
Master behavioral rules and project gates are defined at:
@[AGENTS.md](.agent/rules/AGENTS.md)
EOF

cat << 'EOF' > "$ROOT_DIR/CLAUDE.md"
# Project AI Guidelines (Claude Code)
Please read and strictly follow the SDLC rules and phase gates defined in:
.agent/rules/AGENTS.md
EOF

cat << 'EOF' > "$ROOT_DIR/.cursorrules"
# Cursor Rules
Always consult and follow the SDLC protocols defined in:
.agent/rules/AGENTS.md
EOF

echo "✅ Successfully synced GEMINI.md, CLAUDE.md, and .cursorrules"
