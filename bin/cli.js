#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const command = args[0] || 'init';

const ROOT_DIR = path.resolve(__dirname, '..');

function printBanner() {
  console.log('\x1b[36m  ⚡ Antigravity Engineering Framework CLI\x1b[0m');
  console.log('  /debug ➔ Root Cause | /push ➔ Safe Git | /design ➔ UI Suite\n');
}

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  if (stats && stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((child) => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else if (exists) {
    fs.copyFileSync(src, dest);
  }
}

function installSkill(targetDir) {
  console.log('\x1b[33m📦 Installing Antigravity Skill into: ' + targetDir + '...\x1b[0m');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  const items = ['SKILL.md', 'README.md', 'GEMINI.md', 'AGENTS.md', 'LICENSE', 'commands', 'project-profile', 'references'];
  items.forEach((item) => {
    const src = path.join(ROOT_DIR, item);
    if (fs.existsSync(src)) copyRecursive(src, path.join(targetDir, item));
  });
  console.log('\x1b[32m✔ Skill successfully installed!\x1b[0m\n');
  console.log('\x1b[34m💡 You can now use /debug, /push, and /design in your AI coding assistant.\x1b[0m\n');
}

function runDesign() {
  console.log('\x1b[35m🎨 Installing Dedicated UI / UX Design Suite...\x1b[0m\n');
  const cmds = [
    'npx -y impeccable install',
    'npx -y skills add Leonxlnx/taste-skill',
    'npm install agentation'
  ];
  cmds.forEach((cmd) => {
    console.log('▶ Running: ' + cmd);
    try {
      execSync(cmd, { stdio: 'inherit', shell: true });
    } catch (e) {
      console.warn('⚠ Notice: ' + e.message);
    }
  });
  console.log('\x1b[32m✔ UI/UX Design toolchain ready for /design component prompts!\x1b[0m\n');
}

function printHelp() {
  printBanner();
  console.log('Usage: npx antigravityskill [command]\n\nCommands:\n  init          Install skill into current project (.gemini/skills/antigravityskill) [default]\n  global        Install skill globally (~/.gemini/antigravity/skills/antigravityskill)\n  design        Install external UI design suite (impeccable, taste-skill, agentation)\n  help, --help  Display this help message\n');
}

switch (command) {
  case 'init':
    printBanner();
    installSkill(path.join(process.cwd(), '.gemini', 'skills', 'antigravityskill'));
    break;
  case 'global':
    printBanner();
    installSkill(path.join(os.homedir(), '.gemini', 'antigravity', 'skills', 'antigravityskill'));
    break;
  case 'design':
    printBanner();
    runDesign();
    break;
  case 'help':
  case '--help':
  case '-h':
  default:
    printHelp();
    break;
}
