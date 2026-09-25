const { installAgentPack } = require('./installer.js');
const { runDoctor } = require('./doctor.js');
const path = require('path');
const fs = require('fs');

function printHelp() {
  console.log(`
agent-pack: Bộ cài đặt .agent (Full-Stack SDLC AI Agent Kit)

Sử dụng:
  agent-pack init [target-dir]    Cài đặt bộ .agent vào thư mục dự án
  agent-pack doctor               Kiểm tra môi trường lập trình (Node, Git, Docker, Python...)
  agent-pack status [target-dir]  In ra trạng thái tiến độ hiện tại của dự án
  agent-pack help                 Hiển thị hướng dẫn sử dụng

Ví dụ:
  npx agent-pack init
  npx agent-pack init ./my-new-app
  npx agent-pack doctor
`);
}

function printStatus(targetDir = process.cwd()) {
  const resolved = path.resolve(targetDir);
  const statePath = path.join(resolved, '.agent', 'memory', 'project_state.json');

  if (!fs.existsSync(statePath)) {
    console.log(`\n❌ Không tìm thấy bộ .agent tại ${resolved}. Hãy chạy 'agent-pack init' trước.\n`);
    return;
  }

  try {
    const state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
    console.log(`\n📊 --- TIẾN ĐỘ DỰ ÁN: ${state.projectName} ---`);
    console.log(`Tech Stack nhận diện: ${state.detectedStack || 'Universal'}`);
    console.log(`Phase hiện tại       : ${state.currentPhase}`);
    console.log('\nChi tiết các Phase:');
    for (const [phaseKey, phaseInfo] of Object.entries(state.phases || {})) {
      const icon = phaseInfo.status === 'DONE' ? '✅' : phaseInfo.status === 'IN_PROGRESS' ? '🔄' : '⏳';
      console.log(`  ${icon} ${phaseKey.padEnd(25)} : ${phaseInfo.status}`);
    }
    console.log('--------------------------------------------\n');
  } catch (e) {
    console.log(`Lỗi đọc project_state.json: ${e.message}`);
  }
}

async function runCLI(args) {
  const command = args[0] || 'init';
  const targetDir = args[1] || process.cwd();

  switch (command) {
    case 'init':
      await installAgentPack(targetDir);
      break;
    case 'doctor':
      runDoctor();
      break;
    case 'status':
      printStatus(targetDir);
      break;
    case 'help':
    case '--help':
    case '-h':
      printHelp();
      break;
    default:
      console.log(`Lệnh không xác định: "${command}"`);
      printHelp();
      break;
  }
}

module.exports = {
  runCLI,
  printHelp,
  printStatus
};
