#!/usr/bin/env bash

# project-status.sh: Displays the current project phase and state machine status

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STATE_FILE="$SCRIPT_DIR/../memory/project_state.json"

if [ ! -f "$STATE_FILE" ]; then
  echo "Error: project_state.json not found!"
  exit 1
fi

echo "=========================================="
echo "          PROJECT STATUS REPORT           "
echo "=========================================="

if command -v node >/dev/null 2>&1; then
  node -e "
    const fs = require('fs');
    const s = JSON.parse(fs.readFileSync('$STATE_FILE', 'utf-8'));
    console.log('Project Name   : ' + s.projectName);
    console.log('Detected Stack : ' + (s.detectedStack || 'Universal'));
    console.log('Current Phase  : ' + s.currentPhase);
    console.log('\nPhases Breakdown:');
    for (const [k, v] of Object.entries(s.phases || {})) {
      const icon = v.status === 'DONE' ? '✅' : v.status === 'IN_PROGRESS' ? '🔄' : '⏳';
      console.log('  ' + icon + ' ' + k.padEnd(25) + ': ' + v.status);
    }
  "
else
  cat "$STATE_FILE"
fi

echo "=========================================="
