#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const rawCommand = (args[0] || 'init').toLowerCase();

const ROOT_DIR = path.resolve(__dirname, '..');

function printBanner() {
  console.log('\x1b[36m  ⚡ Antigravity Engineering Framework CLI\x1b[0m');
  console.log('  /debug ➔ Root Cause | /push ➔ Safe Git | /install ➔ UI Suite\n');
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((child) => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    const parentDir = path.dirname(dest);
    if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function installSkill(targetDir, isGlobal = false) {
  console.log('\x1b[33m📦 Installing Antigravity Skill into: ' + targetDir + '...\x1b[0m');
  
  try {
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    
    const items = ['SKILL.md', 'README.md', 'GEMINI.md', 'AGENTS.md', 'LICENSE', 'commands', 'project-profile', 'references'];
    items.forEach((item) => {
      const src = path.join(ROOT_DIR, item);
      if (fs.existsSync(src)) copyRecursive(src, path.join(targetDir, item));
    });

    // Also install command shortcuts into workspace commands folder
    if (!isGlobal) {
      const workspaceCommandsDir = path.join(process.cwd(), '.gemini', 'commands');
      const srcCommandsDir = path.join(ROOT_DIR, 'commands');
      if (fs.existsSync(srcCommandsDir)) {
        copyRecursive(srcCommandsDir, workspaceCommandsDir);
      }
    }

    console.log('\x1b[32m✔ Skill successfully installed with 0 errors!\x1b[0m');
    console.log('\x1b[34m💡 You can now use /debug, /push, and /install in your AI coding assistant.\x1b[0m\n');
  } catch (err) {
    console.error('\x1b[31m❌ Installation failed: ' + err.message + '\x1b[0m\n');
    process.exit(1);
  }
}

function runDesign() {
  console.log('\x1b[35m🎨 Installing Dedicated UI / UX Design Suite (/install)...\x1b[0m\n');
  const cmds = [
    { name: 'Impeccable Design Engine', cmd: 'npx -y impeccable install' },
    { name: 'Taste Skill Extension', cmd: 'npx -y skills add Leonxlnx/taste-skill' },
    { name: 'Agentation Component Toolchain', cmd: 'npm install agentation' }
  ];

  cmds.forEach((c) => {
    console.log('▶ Running: ' + c.name + ' (' + c.cmd + ')...');
    try {
      execSync(c.cmd, { stdio: 'inherit', shell: true });
      console.log('\x1b[32m✔ ' + c.name + ' ready.\x1b[0m\n');
    } catch (e) {
      console.warn('\x1b[33m⚠ Notice for ' + c.name + ': ' + e.message + '\x1b[0m\n');
    }
  });
  console.log('\x1b[32m✔ UI/UX Design toolchain ready!\x1b[0m\n');
}

function printHelp() {
  printBanner();
  console.log(`Usage: npx antigravityskill [command]

Commands:
  init, install, add   Install skill into current workspace (.gemini/skills/antigravityskill) [default]
  global, g            Install skill globally (~/.gemini/antigravity/skills/antigravityskill)
  design, ui, setup    Install external UI design suite (impeccable, taste-skill, agentation)
  help, --help, -h     Display this help message
`);
}

switch (rawCommand) {
  case 'init':
  case 'install':
  case 'add':
  case 'i':
    printBanner();
    installSkill(path.join(process.cwd(), '.gemini', 'skills', 'antigravityskill'), false);
    break;
  case 'global':
  case 'g':
    printBanner();
    installSkill(path.join(os.homedir(), '.gemini', 'antigravity', 'skills', 'antigravityskill'), true);
    break;
  case 'design':
  case 'ui':
  case 'setup':
    printBanner();
    runDesign();
    break;
  case 'help':
  case '--help':
  case '-h':
  case '-v':
  case '--version':
  default:
    printHelp();
    break;
}

