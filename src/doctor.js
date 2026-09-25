const { execSync } = require('child_process');

function checkCommand(command, name, versionFlag = '--version') {
  try {
    const output = execSync(`${command} ${versionFlag}`, {
      stdio: ['pipe', 'pipe', 'ignore'],
      encoding: 'utf-8',
      timeout: 3000
    }).trim().split('\n')[0];
    return { name, command, available: true, version: output };
  } catch (err) {
    return { name, command, available: false, version: null };
  }
}

function runDoctor() {
  console.log('\n🔍 --- AGENT-PACK ENVIRONMENT DOCTOR ---');
  console.log('Đang kiểm tra các công cụ lập trình sẵn có trên hệ thống...\n');

  const tools = [
    checkCommand('node', 'Node.js', '-v'),
    checkCommand('npm', 'NPM Package Manager', '-v'),
    checkCommand('git', 'Git Version Control', '--version'),
    checkCommand('python3', 'Python 3 Runtime', '--version'),
    checkCommand('docker', 'Docker Engine', '--version'),
    checkCommand('flutter', 'Flutter SDK', '--version'),
    checkCommand('go', 'Go Programming Language', 'version'),
    checkCommand('adb', 'Android Debug Bridge (ADB)', 'version'),
    checkCommand('emulator', 'Android Emulator CLI', '-version'),
  ];

  let missingCount = 0;

  tools.forEach(tool => {
    if (tool.available) {
      console.log(`  ✅ ${tool.name.padEnd(25)} : ${tool.version}`);
    } else {
      console.log(`  ⚠️  ${tool.name.padEnd(25)} : Chưa cài đặt (Tuỳ chọn theo loại dự án)`);
      missingCount++;
    }
  });

  console.log('\n----------------------------------------');
  if (tools[0].available && tools[1].available && tools[2].available) {
    console.log('🎉 Môi trường cốt lõi (Node, NPM, Git) ĐÃ SẴN SÀNG để chạy Agent-Pack!');
  } else {
    console.log('❌ Cảnh báo: Vui lòng đảm bảo Git và Node.js đã được cài đặt.');
  }
  console.log('----------------------------------------\n');

  return tools;
}

module.exports = {
  checkCommand,
  runDoctor
};
