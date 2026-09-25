#!/usr/bin/env node

/**
 * agent-pack CLI Entrypoint
 * Full-Stack SDLC AI Agent Kit Installer
 */

const { runCLI } = require('../src/index.js');

runCLI(process.argv.slice(2));
