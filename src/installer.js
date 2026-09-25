const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * Copy directory recursively
 */
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Auto-detect project tech stack based on marker files
 */
function detectTechStack(targetDir) {
  const detected = {
    type: 'universal',
    name: 'Universal Fullstack',
    recommendations: []
  };

  const hasFile = (f) => fs.existsSync(path.join(targetDir, f));

  if (hasFile('pubspec.yaml')) {
    detected.type = 'flutter';
    detected.name = 'Flutter (Mobile / TV / Web)';
    detected.recommendations = ['flutter-core', 'flutter-android-tv', 'flutter-mobile', 'flutter-web'];
  } else if (hasFile('Cargo.toml')) {
    detected.type = 'rust';
    detected.name = 'Rust High-Performance Service';
    detected.recommendations = ['backend-rust-axum'];
  } else if (hasFile('pom.xml')) {
    detected.type = 'java';
    detected.name = 'Java Spring Boot 3 Enterprise';
    detected.recommendations = ['backend-java-spring'];
  } else if (hasFile('Package.swift')) {
    detected.type = 'swift';
    detected.name = 'iOS Native Swift (SwiftUI)';
    detected.recommendations = ['ios-swift-swiftui'];
  } else if (hasFile('build.gradle.kts') || (hasFile('app/build.gradle') && !hasFile('.metadata'))) {
    detected.type = 'kotlin';
    detected.name = 'Android Native Kotlin & Compose';
    detected.recommendations = ['android-kotlin-compose', 'android-tv-kotlin'];
  } else if (hasFile('go.mod')) {
    detected.type = 'go';
    detected.name = 'Go Backend Service';
    detected.recommendations = ['backend-go-service'];
  } else if (hasFile('requirements.txt') || hasFile('Pipfile') || hasFile('pyproject.toml')) {
    detected.type = 'python';
    detected.name = 'Python (FastAPI / Data API / AI)';
    detected.recommendations = ['backend-python-fastapi', 'ai-rag-llm'];
  } else if (hasFile('package.json')) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(targetDir, 'package.json'), 'utf-8'));
      const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      if (allDeps['react-native'] || allDeps['expo']) {
        detected.type = 'react-native';
        detected.name = 'React Native & Expo Mobile';
        detected.recommendations = ['mobile-react-native'];
      } else if (allDeps['next']) {
        detected.type = 'nextjs';
        detected.name = 'Next.js React Web SaaS';
        detected.recommendations = ['web-nextjs-react', 'backend-node-nest'];
      } else if (allDeps['nuxt'] || allDeps['vue']) {
        detected.type = 'nuxt';
        detected.name = 'Vue / Nuxt 3 Web App';
        detected.recommendations = ['web-vue-nuxt'];
      } else if (allDeps['@nestjs/core']) {
        detected.type = 'nest';
        detected.name = 'NestJS Enterprise Backend';
        detected.recommendations = ['backend-node-nest'];
      } else {
        detected.type = 'node';
        detected.name = 'Node.js Fullstack';
        detected.recommendations = ['web-nextjs-react', 'backend-node-nest'];
      }
    } catch (e) {
      detected.type = 'node';
      detected.name = 'Node.js Fullstack';
    }
  }

  return detected;
}

/**
 * Create IDE Adapter files so that Antigravity, Cursor, Claude Code, and Windsurf read .agent/
 */
function createAdapters(targetDir) {
  const agentPath = '.agent/rules/AGENTS.md';

  // 1. GEMINI.md (Google Antigravity project-level rules)
  const geminiContent = `# Project AI Instructions & Protocols (Antigravity)
This repository uses the Agent-Pack SDLC system.
Master behavioral rules and project gates are defined at:
@[AGENTS.md](${agentPath})
`;
  fs.writeFileSync(path.join(targetDir, 'GEMINI.md'), geminiContent, 'utf-8');

  // 2. CLAUDE.md (Claude Code project-level rules)
  const claudeContent = `# Project AI Guidelines (Claude Code)
Please read and strictly follow the SDLC rules and phase gates defined in:
${agentPath}
`;
  fs.writeFileSync(path.join(targetDir, 'CLAUDE.md'), claudeContent, 'utf-8');

  // 3. .cursorrules (Cursor IDE)
  const cursorContent = `# Cursor Rules
Always consult and follow the SDLC protocols defined in:
${agentPath}
`;
  fs.writeFileSync(path.join(targetDir, '.cursorrules'), cursorContent, 'utf-8');
}

/**
 * Ensure .agent/.env.agent is ignored in target .gitignore
 */
function updateGitignore(targetDir) {
  const gitignorePath = path.join(targetDir, '.gitignore');
  const ignoreEntry = '\n# Agent-Pack credentials\n.agent/.env.agent\n';

  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, 'utf-8');
    if (!content.includes('.agent/.env.agent')) {
      fs.appendFileSync(gitignorePath, ignoreEntry, 'utf-8');
    }
  } else {
    fs.writeFileSync(gitignorePath, ignoreEntry, 'utf-8');
  }
}

/**
 * Main Install Function
 */
async function installAgentPack(targetDir = process.cwd(), options = {}) {
  const resolvedTarget = path.resolve(targetDir);
  const templateDir = path.join(__dirname, '..', 'templates', '.agent');
  const destAgentDir = path.join(resolvedTarget, '.agent');

  console.log(`\n📦 Khởi tạo Agent-Pack tại: ${resolvedTarget}`);

  if (!fs.existsSync(resolvedTarget)) {
    fs.mkdirSync(resolvedTarget, { recursive: true });
  }

  // 1. Detect Stack
  const detected = detectTechStack(resolvedTarget);
  console.log(`🎯 Nhận diện công nghệ: ${detected.name}`);

  // 2. Copy .agent template
  console.log('📂 Đang sao chép bộ kỹ năng & quy chuẩn vào .agent/ ...');
  copyDirRecursive(templateDir, destAgentDir);

  // 3. Initialize .env.agent from example if not exists
  const envExample = path.join(destAgentDir, '.env.agent.example');
  const envReal = path.join(destAgentDir, '.env.agent');
  if (fs.existsSync(envExample) && !fs.existsSync(envReal)) {
    fs.copyFileSync(envExample, envReal);
  }

  // 4. Update project_state.json with project info
  const statePath = path.join(destAgentDir, 'memory', 'project_state.json');
  if (fs.existsSync(statePath)) {
    try {
      const state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
      state.projectName = path.basename(resolvedTarget);
      state.detectedStack = detected.name;
      state.activeSkills = detected.recommendations;
      fs.writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf-8');
    } catch (e) {
      // ignore
    }
  }

  // 5. Create cross-IDE adapters
  console.log('🔗 Đang thiết lập bộ tương thích IDE (GEMINI.md, CLAUDE.md, .cursorrules)...');
  createAdapters(resolvedTarget);

  // 6. Update .gitignore
  updateGitignore(resolvedTarget);

  console.log('\n✅ CÀI ĐẶT THÀNH CÔNG BỘ .AGENT CHO DỰ ÁN!');
  console.log('==================================================');
  console.log('📌 Thư mục đã cài đặt:');
  console.log('   - .agent/skills/01-core/   : 9 Kỹ năng quy trình cốt lõi');
  console.log('   - .agent/skills/02-stacks/ : Kỹ năng chuyên sâu theo Stack');
  console.log('   - .agent/rules/AGENTS.md   : Luật điều phối AI bất biến');
  console.log('   - .agent/memory/           : Quản lý trạng thái & task dự án');
  console.log('   - .agent/.env.agent        : Cấu hình GitHub, Jira, Figma...');
  console.log('==================================================');
  console.log('🚀 BƯỚC TIẾP THEO:');
  console.log('1. Mở IDE (Antigravity, Cursor, hoặc Claude Code) tại dự án này.');
  console.log('2. Nhập lệnh chat đầu tiên với AI:');
  console.log('   👉 "Bắt đầu dự án: Hãy đọc hiểu các kĩ năng trong .agent và phỏng vấn tôi để lập bản PRD (Phase 1)"');
  console.log('==================================================\n');
}

module.exports = {
  copyDirRecursive,
  detectTechStack,
  createAdapters,
  updateGitignore,
  installAgentPack
};
