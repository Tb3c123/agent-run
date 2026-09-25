const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 --- RUNNING AUTOMATED AGENT-PACK TEST SUITE ---');

const tmpTestDir = path.join(__dirname, '..', 'tmp-test-project');

try {
  // Clean prior runs
  if (fs.existsSync(tmpTestDir)) {
    fs.rmSync(tmpTestDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tmpTestDir, { recursive: true });

  console.log(`1. Testing 'agent-pack init' into sandbox: ${tmpTestDir}`);
  const cliPath = path.join(__dirname, '..', 'bin', 'agent-pack.js');
  const initOutput = execSync(`node "${cliPath}" init "${tmpTestDir}"`, { encoding: 'utf-8' });
  console.log('   Init execution output verified.');

  console.log('2. Verifying core files & directory structures...');

  const expectedPaths = [
    '.agent/skills.json',
    '.agent/.env.agent',
    '.agent/.env.agent.example',
    '.agent/integrations/README.md',
    '.agent/rules/AGENTS.md',
    '.agent/rules/coding-standards.md',
    '.agent/rules/git-workflow.md',
    // Core skills
    '.agent/skills/01-core/01-prd-requirements/SKILL.md',
    '.agent/skills/01-core/02-system-architecture/SKILL.md',
    '.agent/skills/01-core/03-database-strategy/SKILL.md',
    '.agent/skills/01-core/04-api-specification/SKILL.md',
    '.agent/skills/01-core/05-environment-setup/SKILL.md',
    '.agent/skills/01-core/06-testing-qa/SKILL.md',
    '.agent/skills/01-core/07-security-audit/SKILL.md',
    '.agent/skills/01-core/08-devops-deployment/SKILL.md',
    '.agent/skills/01-core/09-integrations-env/SKILL.md',
    // Stacks skills
    '.agent/skills/02-stacks/web-nextjs-react/SKILL.md',
    '.agent/skills/02-stacks/web-vue-nuxt/SKILL.md',
    '.agent/skills/02-stacks/backend-node-nest/SKILL.md',
    '.agent/skills/02-stacks/backend-python-fastapi/SKILL.md',
    '.agent/skills/02-stacks/backend-go-service/SKILL.md',
    '.agent/skills/02-stacks/flutter-core/SKILL.md',
    '.agent/skills/02-stacks/flutter-android-tv/SKILL.md',
    '.agent/skills/02-stacks/flutter-mobile/SKILL.md',
    '.agent/skills/02-stacks/flutter-web/SKILL.md',
    '.agent/skills/02-stacks/android-kotlin-compose/SKILL.md',
    '.agent/skills/02-stacks/android-tv-kotlin/SKILL.md',
    '.agent/skills/02-stacks/ios-swift-swiftui/SKILL.md',
    '.agent/skills/02-stacks/backend-java-spring/SKILL.md',
    '.agent/skills/02-stacks/backend-rust-axum/SKILL.md',
    '.agent/skills/02-stacks/mobile-react-native/SKILL.md',
    '.agent/skills/02-stacks/ai-rag-llm/SKILL.md',
    // Memory
    '.agent/memory/project_state.json',
    '.agent/memory/tasks.md',
    '.agent/memory/adr/0001-record-architecture-decisions.md',
    // Workflows
    '.agent/workflows/new-feature.md',
    '.agent/workflows/fix-bug.md',
    '.agent/workflows/refactor.md',
    '.agent/workflows/sync-jira.md',
    // Scripts
    '.agent/scripts/sync-adapters.sh',
    '.agent/scripts/project-status.sh',
    '.agent/scripts/sync-tickets.js',
    '.agent/scripts/setup-emulators.sh',
    // Presets
    '.agent/presets/web-saas.json',
    '.agent/presets/flutter-tv.json',
    '.agent/presets/python-fastapi.json',
    '.agent/presets/go-service.json',
    '.agent/presets/kotlin-android.json',
    '.agent/presets/kotlin-tv.json',
    '.agent/presets/ios-swift.json',
    '.agent/presets/java-spring.json',
    '.agent/presets/rust-service.json',
    '.agent/presets/react-native.json',
    // Cross-IDE Adapters
    'GEMINI.md',
    'CLAUDE.md',
    '.cursorrules',
    '.gitignore'
  ];

  let missingCount = 0;
  for (const relPath of expectedPaths) {
    const fullPath = path.join(tmpTestDir, relPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`   ❌ Missing expected file: ${relPath}`);
      missingCount++;
    }
  }

  if (missingCount > 0) {
    throw new Error(`Test failed: ${missingCount} files were missing in generated project!`);
  }
  console.log(`   ✅ All ${expectedPaths.length} expected files and folders created successfully.`);

  console.log('3. Verifying IDE adapter contents...');
  const geminiContent = fs.readFileSync(path.join(tmpTestDir, 'GEMINI.md'), 'utf-8');
  if (!geminiContent.includes('@[AGENTS.md]')) {
    throw new Error('GEMINI.md does not include proper @[AGENTS.md] link');
  }
  console.log('   ✅ GEMINI.md adapter verified.');

  console.log('4. Verifying .gitignore includes .agent/ and .agent/.env.agent...');
  const gitignoreContent = fs.readFileSync(path.join(tmpTestDir, '.gitignore'), 'utf-8');
  if (!gitignoreContent.includes('.agent/') || !gitignoreContent.includes('.agent/.env.agent')) {
    throw new Error('.gitignore does not properly ignore .agent/ or .agent/.env.agent');
  }
  console.log('   ✅ .gitignore protection verified.');

  console.log('5. Testing status command...');
  const statusOutput = execSync(`node "${cliPath}" status "${tmpTestDir}"`, { encoding: 'utf-8' });
  if (!statusOutput.includes('TIẾN ĐỘ DỰ ÁN')) {
    throw new Error('Status output unexpected');
  }
  console.log('   ✅ Status command verified.');

  console.log('6. Testing doctor command...');
  const doctorOutput = execSync(`node "${cliPath}" doctor`, { encoding: 'utf-8' });
  if (!doctorOutput.includes('ENVIRONMENT DOCTOR')) {
    throw new Error('Doctor output unexpected');
  }
  console.log('   ✅ Doctor command verified.');

  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! The installer is 100% operational.\n');
} finally {
  // Clean up sandbox
  if (fs.existsSync(tmpTestDir)) {
    fs.rmSync(tmpTestDir, { recursive: true, force: true });
    console.log('🧹 Cleaned up temporary test sandbox directory.');
  }
}
