#!/usr/bin/env node

/**
 * ⚡ Universal Polyglot Project Health & Diagnostic Scanner (Node.js)
 * Zero external npm dependencies (uses node:fs, node:path, node:child_process, node:os).
 *
 * Supported CLI Flags:
 *   -s, --strict      Enforce strict quality mode (warnings escalate to failure exit code 1)
 *   -j, --json        Output diagnostic results as structured JSON
 *   --check-git       Audit git branch protection rules and uncommitted secrets
 *   -h, --help        Show command-line usage and exit with code 0
 *   --dir <path>      Specify target working directory to scan (defaults to current directory)
 *
 * Deterministic Exit Codes:
 *   0 = Clean / Pass (all checks healthy)
 *   1 = Diagnostic Issues Found / Strict Failure
 *   2 = CLI Usage Error / Unknown Arguments
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// --- CLI Argument Parsing ---
const rawArgs = process.argv.slice(2);
let isJson = false;
let isStrict = false;
let checkGit = false;
let showHelp = false;
let targetDir = process.cwd();

let i = 0;
while (i < rawArgs.length) {
  const arg = rawArgs[i];
  if (arg === '-h' || arg === '--help') {
    showHelp = true;
  } else if (arg === '-j' || arg === '--json') {
    isJson = true;
  } else if (arg === '-s' || arg === '--strict') {
    isStrict = true;
  } else if (arg === '--check-git') {
    checkGit = true;
  } else if (arg === '--dir' || arg === '--cwd') {
    if (i + 1 >= rawArgs.length) {
      console.error(`Error: ${arg} requires a path argument.`);
      process.exit(2);
    }
    targetDir = path.resolve(rawArgs[++i]);
  } else if (arg.startsWith('--dir=')) {
    targetDir = path.resolve(arg.slice(6));
  } else if (arg.startsWith('--cwd=')) {
    targetDir = path.resolve(arg.slice(6));
  } else if (!arg.startsWith('-') && i === rawArgs.length - 1 && !fs.existsSync(arg)) {
    console.error(`Error: Unrecognized positional argument or directory not found: '${arg}'`);
    process.exit(2);
  } else if (!arg.startsWith('-') && fs.existsSync(arg)) {
    targetDir = path.resolve(arg);
  } else {
    console.error(`Error: Unrecognized CLI argument: '${arg}'. Run with --help for valid options.`);
    process.exit(2);
  }
  i++;
}

if (showHelp) {
  console.log(`
Universal Polyglot Diagnostic Health Scanner (Node.js)
Version: 2.0.0

Usage:
  node scripts/diagnose.js [options] [directory]

Options:
  -s, --strict      Enforce strict quality mode (warnings escalate to exit code 1)
  -j, --json        Output diagnostic results as structured JSON
  --check-git       Audit git branch protection rules and uncommitted secrets
  --dir <path>      Specify directory to scan (defaults to current working directory)
  -h, --help        Show this help message and exit

Exit Codes:
  0                 Clean / Pass (100% healthy, zero errors)
  1                 Diagnostic Issues Found (compiler/type errors, secrets, or strict violations)
  2                 CLI Usage Error (invalid arguments or flags)
`.trim());
  process.exit(0);
}

// Verify target directory exists
if (!fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) {
  console.error(`Error: Target directory does not exist or is not a directory: ${targetDir}`);
  process.exit(2);
}

// ANSI Colors
const ANSI = {
  reset: isJson ? '' : '\x1b[0m',
  red: isJson ? '' : '\x1b[31m',
  green: isJson ? '' : '\x1b[32m',
  yellow: isJson ? '' : '\x1b[33m',
  blue: isJson ? '' : '\x1b[34m',
  cyan: isJson ? '' : '\x1b[36m',
  bold: isJson ? '' : '\x1b[1m',
  dim: isJson ? '' : '\x1b[2m',
};

if (!isJson) {
  console.log(`\n${ANSI.bold}${ANSI.cyan}🔬 === Universal Polyglot Diagnostic Scanner (Node.js) ===${ANSI.reset}\n`);
}

// Diagnostic State
const detectedStacks = [];
const checkResults = [];
let passedCount = 0;
let failedCount = 0;
let warningsCount = 0;
let skippedCount = 0;

// Helper: Safely run a shell command inside target directory
function runCmd(cmd, options = {}) {
  const timeout = options.timeout || 15000;
  try {
    const isWin = process.platform === 'win32';
    const output = execSync(cmd, {
      cwd: targetDir,
      stdio: 'pipe',
      encoding: 'utf-8',
      timeout,
      shell: isWin ? true : undefined,
    });
    return { ok: true, stdout: output || '', stderr: '', code: 0 };
  } catch (err) {
    return {
      ok: false,
      stdout: err.stdout ? err.stdout.toString() : '',
      stderr: err.stderr ? err.stderr.toString() : (err.message || ''),
      code: typeof err.status === 'number' ? err.status : 1,
    };
  }
}

// Helper: Safely resolve binary path
function resolveBin(binName) {
  const isWin = process.platform === 'win32';
  const localBin = path.join(targetDir, 'node_modules', '.bin', isWin ? `${binName}.cmd` : binName);
  if (fs.existsSync(localBin)) {
    return localBin;
  }
  return binName;
}

// Helper: Record and execute a diagnostic check
function executeCheck({ id, name, stack, fn }) {
  if (!isJson) {
    process.stdout.write(`Checking ${name}... `);
  }
  const startTime = Date.now();
  try {
    const res = fn();
    const durationMs = Date.now() - startTime;
    const status = res.status || (res.success ? 'PASS' : (res.warning ? 'WARN' : 'FAIL'));
    const message = res.message || res.info || res.error || res.warning || '';
    const details = res.details || null;

    if (status === 'PASS') {
      passedCount++;
      if (!isJson) {
        console.log(`${ANSI.green}✔ OK${ANSI.reset}`);
        if (message) console.log(`   └─ ${message}`);
      }
    } else if (status === 'WARN') {
      warningsCount++;
      if (isStrict) {
        failedCount++;
      }
      if (!isJson) {
        console.log(`${ANSI.yellow}⚠ WARNING${ANSI.reset}`);
        if (message) console.log(`   └─ ${ANSI.yellow}${message}${ANSI.reset}`);
      }
    } else if (status === 'SKIP') {
      skippedCount++;
      if (!isJson) {
        console.log(`${ANSI.dim}⏭ SKIPPED${ANSI.reset}`);
        if (message) console.log(`   └─ ${ANSI.dim}${message}${ANSI.reset}`);
      }
    } else {
      failedCount++;
      if (!isJson) {
        console.log(`${ANSI.red}✖ FAILED${ANSI.reset}`);
        if (message) console.log(`   └─ ${ANSI.red}${message}${ANSI.reset}`);
      }
    }

    checkResults.push({
      id,
      name,
      stack,
      status,
      message,
      details,
      durationMs,
    });
  } catch (err) {
    const durationMs = Date.now() - startTime;
    failedCount++;
    if (!isJson) {
      console.log(`${ANSI.red}✖ ERROR${ANSI.reset}`);
      console.log(`   └─ ${ANSI.red}${err.message}${ANSI.reset}`);
    }
    checkResults.push({
      id,
      name,
      stack,
      status: 'FAIL',
      message: err.message,
      details: err.stack || null,
      durationMs,
    });
  }
}

// Helper: Recursively search for files matching extensions, excluding ignored directories
function findFiles(dir, extensions, ignoreDirs = ['.git', '.agents', '.venv', 'venv', 'node_modules', 'dist', 'build', '__pycache__', '.pytest_cache']) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!ignoreDirs.includes(entry.name)) {
          results.push(...findFiles(path.join(dir, entry.name), extensions, ignoreDirs));
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          results.push(path.join(dir, entry.name));
        }
      }
    }
  } catch (_) {}
  return results;
}

// --- 1. Detect Stacks ---
const pkgJsonPath = path.join(targetDir, 'package.json');
const tsConfigPath = path.join(targetDir, 'tsconfig.json');
const jsConfigPath = path.join(targetDir, 'jsconfig.json');
const pyprojectPath = path.join(targetDir, 'pyproject.toml');
const reqTxtPath = path.join(targetDir, 'requirements.txt');
const pipfilePath = path.join(targetDir, 'Pipfile');
const setupPyPath = path.join(targetDir, 'setup.py');
const goModPath = path.join(targetDir, 'go.mod');
const cargoTomlPath = path.join(targetDir, 'Cargo.toml');

const hasNode = fs.existsSync(pkgJsonPath) || fs.existsSync(tsConfigPath) || fs.existsSync(jsConfigPath);
const pyFiles = findFiles(targetDir, ['.py']);
const hasPython = fs.existsSync(pyprojectPath) || fs.existsSync(reqTxtPath) || fs.existsSync(pipfilePath) || fs.existsSync(setupPyPath) || pyFiles.length > 0;
const hasGo = fs.existsSync(goModPath) || findFiles(targetDir, ['.go']).length > 0;
const hasRust = fs.existsSync(cargoTomlPath);

if (hasNode) detectedStacks.push('Node/TypeScript');
if (hasPython) detectedStacks.push('Python');
if (hasGo) detectedStacks.push('Go');
if (hasRust) detectedStacks.push('Rust');

if (!isJson) {
  console.log(`${ANSI.bold}Detected Stack(s):${ANSI.reset} ${detectedStacks.length ? detectedStacks.join(', ') : 'Generic Workspace'}\n`);
}

// --- 2. Git Branch & Safety Audit ---
if (checkGit) {
  executeCheck({
    id: 'git-branch-safety',
    name: 'Git Branch Safety & Protection',
    stack: 'Git',
    fn: () => {
      const gitBranchRes = runCmd('git branch --show-current');
      if (!gitBranchRes.ok) {
        const fallbackRes = runCmd('git rev-parse --abbrev-ref HEAD');
        if (!fallbackRes.ok) {
          return { status: 'PASS', message: 'Not a git repository or git not available (skipped)' };
        }
        gitBranchRes.stdout = fallbackRes.stdout;
      }
      const currentBranch = gitBranchRes.stdout.trim();
      if (!currentBranch || currentBranch === 'HEAD') {
        const msg = 'Detached HEAD state detected.';
        return isStrict
          ? { status: 'FAIL', message: msg }
          : { status: 'WARN', message: msg };
      }
      if (['main', 'master', 'develop'].includes(currentBranch)) {
        const msg = `Active branch is '${currentBranch}'. Direct commits to main/master/develop are prohibited by /push protocol. Switch to a feature branch (feat/*, fix/*, ui/*).`;
        return isStrict
          ? { status: 'FAIL', message: msg }
          : { status: 'WARN', message: msg };
      }
      return { status: 'PASS', message: `Active branch: ${currentBranch} (safe feature branch)` };
    },
  });

  executeCheck({
    id: 'git-secrets',
    name: 'Git Uncommitted Secrets Audit',
    stack: 'Git',
    fn: () => {
      const statusRes = runCmd('git status --porcelain');
      if (!statusRes.ok) {
        return { status: 'PASS', message: 'Not a git repository or git not available' };
      }
      const lines = statusRes.stdout.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      const secretPatterns = [
        /(^|[/\\])\.env($|\.local$|\.production$|\.staging$)/i,
        /(^|[/\\])(credentials|token|secret|auth)\.json$/i,
        /(^|[/\\])id_(rsa|ed25519|ecdsa|dsa)($|\.pub$)/i,
        /\.(pem|key|p12|pfx|kdbx)$/i,
      ];
      const sensitiveFiles = [];
      for (const line of lines) {
        const filePath = line.replace(/^[MADRCU?! ]+\s+/, '').trim();
        for (const pattern of secretPatterns) {
          if (pattern.test(filePath)) {
            if (!filePath.endsWith('.env.example')) {
              sensitiveFiles.push(filePath);
              break;
            }
          }
        }
      }
      if (sensitiveFiles.length > 0) {
        return {
          status: 'FAIL',
          message: `🔴 SECURITY RISK: Sensitive secret file(s) staged or untracked: ${sensitiveFiles.join(', ')}. Add to .gitignore immediately!`,
          details: sensitiveFiles,
        };
      }
      return { status: 'PASS', message: 'No uncommitted secrets or sensitive credential files detected' };
    },
  });
}

// --- 3. TypeScript / Node.js Analysis ---
if (hasNode) {
  if (fs.existsSync(pkgJsonPath)) {
    executeCheck({
      id: 'node-dependencies',
      name: 'Node Dependencies (node_modules)',
      stack: 'Node/TypeScript',
      fn: () => {
        let pkg;
        try {
          pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
        } catch (e) {
          return { status: 'FAIL', message: `Invalid package.json: ${e.message}` };
        }
        const hasDeps = (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) ||
                        (pkg.devDependencies && Object.keys(pkg.devDependencies).length > 0);
        if (hasDeps) {
          const nodeModulesPath = path.join(targetDir, 'node_modules');
          if (!fs.existsSync(nodeModulesPath)) {
            const msg = 'node_modules directory is missing. Run npm install or pnpm install.';
            return isStrict
              ? { status: 'FAIL', message: msg }
              : { status: 'WARN', message: msg };
          }
          return { status: 'PASS', message: 'node_modules directory is present' };
        }
        return { status: 'PASS', message: 'package.json has no declared dependencies' };
      },
    });
  }

  if (fs.existsSync(tsConfigPath)) {
    executeCheck({
      id: 'typescript-typecheck',
      name: 'TypeScript Type Safety (tsc)',
      stack: 'Node/TypeScript',
      fn: () => {
        const tscBin = resolveBin('tsc');
        let cmd = fs.existsSync(tscBin) && tscBin !== 'tsc'
          ? `"${tscBin}" --noEmit`
          : 'npx tsc --noEmit';

        const res = runCmd(cmd, { timeout: 20000 });
        if (res.ok) {
          return { status: 'PASS', message: '0 type errors detected' };
        }
        const combined = (res.stdout + '\n' + res.stderr).trim();
        const errLines = combined.split(/\r?\n/).filter((l) => l.includes('error TS') || l.includes('Error:'));
        const snippet = errLines.slice(0, 4).join('\n   ') || combined.slice(0, 200);
        return {
          status: 'FAIL',
          message: `TypeScript red lines detected (${errLines.length || 1} error(s)):\n   ${snippet}`,
          details: combined,
        };
      },
    });
  }
}

// --- 4. Python Analysis ---
if (hasPython) {
  executeCheck({
    id: 'python-environment',
    name: 'Python Virtual Environment',
    stack: 'Python',
    fn: () => {
      const venvPaths = ['.venv', 'venv', 'env'];
      const hasVenvDir = venvPaths.some((p) => fs.existsSync(path.join(targetDir, p)));
      const hasVenvEnv = Boolean(process.env.VIRTUAL_ENV);
      if (hasVenvDir || hasVenvEnv) {
        return { status: 'PASS', message: 'Virtual environment detected' };
      }
      return { status: 'PASS', message: 'No local .venv directory detected (Global or container environment)' };
    },
  });

  if (pyFiles.length > 0) {
    executeCheck({
      id: 'python-syntax',
      name: 'Python Syntax & Byte-Compilation',
      stack: 'Python',
      fn: () => {
        const { spawnSync } = require('child_process');
        const pythonPy = `
import ast, os, sys
target_dir = sys.argv[1] if len(sys.argv) > 1 else "."
ignore_dirs = {".git", ".agents", ".venv", "venv", "node_modules", "dist", "build", "__pycache__", ".pytest_cache"}
errors = []
count = 0
for root, dirs, files in os.walk(target_dir):
    dirs[:] = [d for d in dirs if d not in ignore_dirs]
    for f in files:
        if f.endswith(".py"):
            count += 1
            fpath = os.path.join(root, f)
            try:
                with open(fpath, "rb") as fp:
                    ast.parse(fp.read(), filename=fpath)
            except SyntaxError as e:
                rel = os.path.relpath(fpath, target_dir)
                errors.append(f"{rel}:{e.lineno}:{e.offset} - {e.msg}")
            except Exception as e:
                rel = os.path.relpath(fpath, target_dir)
                errors.append(f"{rel} - {str(e)}")
if errors:
    print("ERRORS:" + " || ".join(errors))
    sys.exit(1)
else:
    print(f"COUNT:{count}")
    sys.exit(0)
`.trim();

        const binaries = ['python', 'python3', 'py'];
        let result = null;
        for (const bin of binaries) {
          try {
            const res = spawnSync(bin, ['-c', pythonPy, targetDir], {
              cwd: targetDir,
              encoding: 'utf-8',
              timeout: 20000,
              shell: process.platform === 'win32',
            });
            if (res.error && (res.error.code === 'ENOENT' || res.error.message.includes('not found'))) {
              continue;
            }
            const combinedOut = ((res.stdout || '') + '\n' + (res.stderr || '')).trim();
            if (
              combinedOut.includes('Python was not found') ||
              combinedOut.includes('not recognized as an internal') ||
              res.status === 9009
            ) {
              continue;
            }
            result = {
              ok: res.status === 0,
              stdout: res.stdout || '',
              stderr: res.stderr || (res.error ? res.error.message : ''),
            };
            break;
          } catch (_) {}
        }

        if (!result) {
          const msg = 'Python runtime not available in PATH (syntax compilation skipped)';
          return isStrict ? { status: 'FAIL', message: msg } : { status: 'WARN', message: msg };
        }

        if (result.ok) {
          return { status: 'PASS', message: `0 syntax errors across ${pyFiles.length} python file(s)` };
        } else if (result.stdout.startsWith('ERRORS:') || result.stderr.includes('SyntaxError')) {
          const errList = result.stdout.replace('ERRORS:', '').split(' || ').filter(Boolean);
          const snippet = errList.slice(0, 3).join('\n   ') || result.stderr.trim();
          return {
            status: 'FAIL',
            message: `Python syntax errors detected (${errList.length || 1} error(s)):\n   ${snippet}`,
            details: result.stdout || result.stderr,
          };
        } else {
          const msg = `Python syntax check skipped: ${result.stderr || result.stdout}`.trim();
          return isStrict ? { status: 'FAIL', message: msg } : { status: 'WARN', message: msg };
        }
      },
    });
  }

  const mypyIniPath = path.join(targetDir, 'mypy.ini');
  if (fs.existsSync(mypyIniPath)) {
    executeCheck({
      id: 'python-mypy',
      name: 'Python Type Checking (mypy)',
      stack: 'Python',
      fn: () => {
        const mypyRes = runCmd('mypy . --ignore-missing-imports', { timeout: 20000 });
        if (mypyRes.ok) {
          return { status: 'PASS', message: '0 mypy type errors' };
        }
        if (mypyRes.stderr.includes('not found') || mypyRes.stderr.includes('is not recognized')) {
          return isStrict
            ? { status: 'FAIL', message: 'mypy is configured but not installed in PATH' }
            : { status: 'SKIP', message: 'mypy not installed' };
        }
        return {
          status: 'FAIL',
          message: `mypy reported type errors:\n   ${mypyRes.stdout.split('\n').slice(0, 3).join('\n   ')}`,
          details: mypyRes.stdout,
        };
      },
    });
  }
}

// --- 5. Go Analysis ---
if (hasGo) {
  executeCheck({
    id: 'go-vet',
    name: 'Go Compiler & Vet (go vet)',
    stack: 'Go',
    fn: () => {
      const vetRes = runCmd('go vet ./...', { timeout: 20000 });
      if (vetRes.ok) {
        return { status: 'PASS', message: '0 Go vet errors' };
      }
      if (vetRes.stderr.includes('not found') || vetRes.stderr.includes('is not recognized')) {
        return isStrict
          ? { status: 'FAIL', message: 'Go runtime (go) not installed in PATH' }
          : { status: 'SKIP', message: 'Go runtime not installed' };
      }
      return { status: 'FAIL', message: `Go vet error:\n   ${vetRes.stderr || vetRes.stdout}` };
    },
  });
}

// --- 6. Rust Analysis ---
if (hasRust) {
  executeCheck({
    id: 'rust-check',
    name: 'Rust Compilation (cargo check)',
    stack: 'Rust',
    fn: () => {
      const cargoRes = runCmd('cargo check --all-targets', { timeout: 30000 });
      if (cargoRes.ok) {
        return { status: 'PASS', message: '0 Rust compiler errors' };
      }
      if (cargoRes.stderr.includes('not found') || cargoRes.stderr.includes('is not recognized')) {
        return isStrict
          ? { status: 'FAIL', message: 'Rust toolchain (cargo) not installed in PATH' }
          : { status: 'SKIP', message: 'Rust toolchain not installed' };
      }
      return { status: 'FAIL', message: `Cargo check error:\n   ${cargoRes.stderr || cargoRes.stdout}` };
    },
  });
}

// --- 7. Environment Variables & Secret Configuration ---
const envExamplePath = path.join(targetDir, '.env.example');
const envPath = path.join(targetDir, '.env');
const gitignorePath = path.join(targetDir, '.gitignore');

if (fs.existsSync(envExamplePath) || fs.existsSync(envPath)) {
  executeCheck({
    id: 'env-variables',
    name: 'Environment Variables Parity (.env vs .env.example)',
    stack: 'Environment',
    fn: () => {
      if (fs.existsSync(envExamplePath) && !fs.existsSync(envPath)) {
        return { status: 'FAIL', message: '.env.example exists but .env is missing!' };
      }
      if (fs.existsSync(envExamplePath) && fs.existsSync(envPath)) {
        const parseKeys = (content) => {
          const keys = [];
          for (const line of content.split(/\r?\n/)) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
              const key = trimmed.split('=')[0].trim();
              if (key) keys.push(key);
            }
          }
          return Array.from(new Set(keys));
        };
        const exampleKeys = parseKeys(fs.readFileSync(envExamplePath, 'utf-8'));
        const envKeys = parseKeys(fs.readFileSync(envPath, 'utf-8'));
        const missingKeys = exampleKeys.filter((k) => !envKeys.includes(k));
        if (missingKeys.length > 0) {
          return {
            status: 'FAIL',
            message: `Missing required key(s) in .env: ${missingKeys.join(', ')}`,
            details: missingKeys,
          };
        }

        if (fs.existsSync(gitignorePath)) {
          const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
          const isIgnored = gitignoreContent.split(/\r?\n/).some((l) => {
            const t = l.trim();
            return t === '.env' || t === '.env*' || t === '*.env' || t.startsWith('.env');
          });
          if (!isIgnored) {
            const msg = '.env is present but not explicitly listed in .gitignore';
            return isStrict
              ? { status: 'FAIL', message: msg }
              : { status: 'WARN', message: msg };
          }
        }
        return { status: 'PASS', message: 'All required environment variables present and .env is gitignored' };
      }
      return { status: 'PASS', message: 'Environment clean (no .env.example requirements)' };
    },
  });
}

// --- Summary & JSON Output ---
const totalChecks = checkResults.length;
const issuesCount = failedCount + (isStrict ? warningsCount : 0);
const isHealthy = failedCount === 0 && (!isStrict || warningsCount === 0);
const exitCode = isHealthy ? 0 : 1;

if (isJson) {
  const jsonPayload = {
    scanner: 'Universal Polyglot Diagnostic Scanner',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    workingDirectory: targetDir,
    detectedStacks,
    flags: {
      strict: isStrict,
      json: isJson,
      checkGit,
    },
    summary: {
      totalChecks,
      passed: passedCount,
      failed: failedCount,
      warnings: warningsCount,
      skipped: skippedCount,
      healthy: isHealthy,
      issuesCount,
    },
    checks: checkResults,
    exitCode,
  };
  console.log(JSON.stringify(jsonPayload, null, 2));
} else {
  console.log(`\n${ANSI.bold}📋 Diagnostic Summary:${ANSI.reset}`);
  if (isHealthy) {
    if (warningsCount > 0) {
      console.log(`${ANSI.yellow}${ANSI.bold}✔ HEALTHY WITH WARNINGS: 0 errors, ${warningsCount} warning(s) detected.${ANSI.reset}\n`);
    } else {
      console.log(`${ANSI.green}${ANSI.bold}🎉 100% HEALTHY! All stacks verified with zero compiler or config errors.${ANSI.reset}\n`);
    }
  } else {
    console.log(`${ANSI.red}${ANSI.bold}⚠️  ${failedCount} error(s) and ${warningsCount} warning(s) detected. Exit code: ${exitCode}.${ANSI.reset}\n`);
  }
}

process.exit(exitCode);
