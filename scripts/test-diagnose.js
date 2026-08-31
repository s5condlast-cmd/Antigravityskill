#!/usr/bin/env node

/**
 * 🧪 Test Harness for Polyglot Diagnostic Scanner (Node.js & Python)
 * Zero external npm dependencies (uses node:fs, node:path, node:os, node:child_process, node:assert).
 *
 * 6 Comprehensive Test Suites:
 *   Suite 1: CLI Flags & Help Screen Validation
 *   Suite 2: JSON Output Schema & Exit Codes Validation
 *   Suite 3: Zero False Positives on Project Root
 *   Suite 4: Git Branch & Safety Audit Validation
 *   Suite 5: Isolated Synthetic Fixture Matrix (Negative & Positive Sandboxes)
 *   Suite 6: Cross-Scanner Parity (JS vs Python)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const assert = require('assert');
const { execSync } = require('child_process');

const ANSI = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIAGNOSE_JS = path.join(__dirname, 'diagnose.js');
const DIAGNOSE_PY = path.join(__dirname, 'diagnose.py');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function runTest(suiteName, testName, fn) {
  totalTests++;
  const fullName = `[${suiteName}] ${testName}`;
  process.stdout.write(`  ▶ ${fullName}... `);
  try {
    fn();
    passedTests++;
    console.log(`${ANSI.green}✔ PASS${ANSI.reset}`);
  } catch (err) {
    failedTests++;
    console.log(`${ANSI.red}✖ FAIL${ANSI.reset}`);
    console.log(`    ${ANSI.red}${err.message}${ANSI.reset}`);
    failures.push({ name: fullName, error: err });
  }
}

// Helper: Detect available Python binary on the host
function getPythonBin() {
  const binaries = ['python', 'python3', 'py'];
  for (const bin of binaries) {
    try {
      const res = execSync(`"${bin}" --version`, {
        stdio: 'pipe',
        encoding: 'utf-8',
        timeout: 5000,
        shell: process.platform === 'win32',
      });
      const out = ((res || '') + '').toLowerCase();
      if (!out.includes('not found') && !out.includes('not recognized') && !out.includes('microsoft store')) {
        return bin;
      }
    } catch (_) {}
  }
  return null;
}
const PYTHON_BIN = getPythonBin();

// Helper: Run command safely returning stdout, stderr, code
function execScanner(scriptPath, args = [], cwd = PROJECT_ROOT) {
  const isPy = scriptPath.endsWith('.py');
  const isWin = process.platform === 'win32';
  const bin = isPy ? (PYTHON_BIN || 'python') : 'node';
  const cmd = `"${bin}" "${scriptPath}" ${args.map((a) => (a.includes(' ') ? `"${a}"` : a)).join(' ')}`;

  try {
    const stdout = execSync(cmd, {
      cwd,
      stdio: 'pipe',
      encoding: 'utf-8',
      timeout: 25000,
      shell: isWin ? true : undefined,
    });
    return { code: 0, stdout: stdout || '', stderr: '' };
  } catch (err) {
    return {
      code: typeof err.status === 'number' ? err.status : 1,
      stdout: err.stdout ? err.stdout.toString() : '',
      stderr: err.stderr ? err.stderr.toString() : (err.message || ''),
    };
  }
}

// Helper: Create temporary sandbox directory with cleanup
function withTempSandbox(fn) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'diagnose-test-'));
  try {
    fn(tempDir);
  } finally {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (_) {}
  }
}

console.log(`\n${ANSI.bold}${ANSI.cyan}🧪 Universal Diagnostic Scanner Test Runner (Node.js)${ANSI.reset}\n`);

// ==========================================
// SUITE 1: CLI Flags & Help Screen
// ==========================================
console.log(`${ANSI.bold}Suite 1: CLI Flags & Help Screen Validation${ANSI.reset}`);

runTest('Suite 1', 'diagnose.js --help returns exit code 0 and displays flags', () => {
  const res = execScanner(DIAGNOSE_JS, ['--help']);
  assert.strictEqual(res.code, 0, `Expected exit code 0, got ${res.code}`);
  assert.ok(res.stdout.includes('--strict'), 'Help output should include --strict');
  assert.ok(res.stdout.includes('--json'), 'Help output should include --json');
  assert.ok(res.stdout.includes('--check-git'), 'Help output should include --check-git');
});

runTest('Suite 1', 'diagnose.js -h alias works identically to --help', () => {
  const res = execScanner(DIAGNOSE_JS, ['-h']);
  assert.strictEqual(res.code, 0, `Expected exit code 0, got ${res.code}`);
  assert.ok(res.stdout.includes('Universal Polyglot Diagnostic Health Scanner'), 'Should contain scanner title');
});

runTest('Suite 1', 'diagnose.js unknown flag returns exit code 2', () => {
  const res = execScanner(DIAGNOSE_JS, ['--invalid-flag-123']);
  assert.strictEqual(res.code, 2, `Expected exit code 2 on invalid flag, got ${res.code}`);
  assert.ok(res.stderr.includes('Unrecognized CLI argument') || res.stdout.includes('Unrecognized CLI argument'), 'Output should explain invalid flag');
});

// ==========================================
// SUITE 2: JSON Output Schema & Exit Codes
// ==========================================
console.log(`\n${ANSI.bold}Suite 2: JSON Output Schema & Exit Codes Validation${ANSI.reset}`);

runTest('Suite 2', 'diagnose.js --json outputs valid JSON matching standard schema', () => {
  const res = execScanner(DIAGNOSE_JS, ['--json']);
  assert.strictEqual(res.code, 0, `Expected exit code 0 on clean workspace, got ${res.code}`);
  let json;
  try {
    json = JSON.parse(res.stdout);
  } catch (e) {
    assert.fail(`Failed to parse JSON output: ${e.message}\nRaw output: ${res.stdout}`);
  }

  // Schema assertions
  assert.strictEqual(json.scanner, 'Universal Polyglot Diagnostic Scanner');
  assert.strictEqual(typeof json.version, 'string');
  assert.strictEqual(typeof json.timestamp, 'string');
  assert.ok(!isNaN(Date.parse(json.timestamp)), 'timestamp must be a valid ISO date');
  assert.strictEqual(typeof json.workingDirectory, 'string');
  assert.ok(Array.isArray(json.detectedStacks), 'detectedStacks must be an Array');
  assert.strictEqual(typeof json.flags, 'object');
  assert.strictEqual(json.flags.json, true);

  // Summary assertions
  assert.strictEqual(typeof json.summary, 'object');
  assert.strictEqual(typeof json.summary.totalChecks, 'number');
  assert.strictEqual(typeof json.summary.passed, 'number');
  assert.strictEqual(typeof json.summary.failed, 'number');
  assert.strictEqual(typeof json.summary.warnings, 'number');
  assert.strictEqual(typeof json.summary.skipped, 'number');
  assert.strictEqual(typeof json.summary.healthy, 'boolean');
  assert.strictEqual(json.summary.healthy, true);
  assert.strictEqual(json.exitCode, 0);

  // Checks assertions
  assert.ok(Array.isArray(json.checks), 'checks must be an Array');
  for (const check of json.checks) {
    assert.strictEqual(typeof check.id, 'string');
    assert.strictEqual(typeof check.name, 'string');
    assert.strictEqual(typeof check.stack, 'string');
    assert.ok(['PASS', 'FAIL', 'WARN', 'SKIP'].includes(check.status), `Invalid check status: ${check.status}`);
    assert.strictEqual(typeof check.message, 'string');
    assert.strictEqual(typeof check.durationMs, 'number');
  }
});

// ==========================================
// SUITE 3: Zero False Positives on Root Workspace
// ==========================================
console.log(`\n${ANSI.bold}Suite 3: Zero False Positives on Root Workspace${ANSI.reset}`);

runTest('Suite 3', 'diagnose.js passes cleanly on project root with zero errors', () => {
  const res = execScanner(DIAGNOSE_JS, []);
  assert.strictEqual(res.code, 0, `Expected exit code 0 on clean repository, got ${res.code}\nOutput: ${res.stdout}\nStderr: ${res.stderr}`);
  assert.ok(res.stdout.includes('HEALTHY') || res.stdout.includes('100% HEALTHY'), 'Summary should report healthy status');
});

// ==========================================
// SUITE 4: Git Branch & Safety Audit
// ==========================================
console.log(`\n${ANSI.bold}Suite 4: Git Branch & Safety Audit Validation${ANSI.reset}`);

runTest('Suite 4', 'diagnose.js --check-git executes branch and secrets audit without error', () => {
  const res = execScanner(DIAGNOSE_JS, ['--check-git', '--json']);
  let json;
  try {
    json = JSON.parse(res.stdout);
  } catch (e) {
    assert.fail(`Failed to parse JSON output: ${e.message}\nRaw: ${res.stdout}`);
  }
  const checkIds = json.checks.map((c) => c.id);
  assert.ok(checkIds.includes('git-branch-safety'), 'Must include git-branch-safety check');
  assert.ok(checkIds.includes('git-secrets'), 'Must include git-secrets check');
});

// ==========================================
// SUITE 5: Isolated Synthetic Fixture Matrix
// ==========================================
console.log(`\n${ANSI.bold}Suite 5: Isolated Synthetic Fixture Matrix (Sandbox Testing)${ANSI.reset}`);

runTest('Suite 5.1', 'Broken TypeScript fixture triggers FAIL and exit code 1', () => {
  withTempSandbox((sandboxDir) => {
    fs.writeFileSync(
      path.join(sandboxDir, 'tsconfig.json'),
      JSON.stringify({ compilerOptions: { noEmit: true, strict: true } }, null, 2)
    );
    fs.writeFileSync(
      path.join(sandboxDir, 'index.ts'),
      'const num: number = "this is definitely not a number";\nconsole.log(num);\n'
    );

    const res = execScanner(DIAGNOSE_JS, ['--json', '--dir', sandboxDir]);
    assert.strictEqual(res.code, 1, `Expected exit code 1 for broken TS, got ${res.code}`);
    const json = JSON.parse(res.stdout);
    assert.strictEqual(json.summary.healthy, false);
    const tsCheck = json.checks.find((c) => c.id === 'typescript-typecheck');
    assert.ok(tsCheck, 'typescript-typecheck check should exist');
    assert.strictEqual(tsCheck.status, 'FAIL');
  });
});

runTest('Suite 5.2', 'Broken Python syntax fixture triggers FAIL and exit code 1', () => {
  withTempSandbox((sandboxDir) => {
    fs.writeFileSync(
      path.join(sandboxDir, 'broken.py'),
      'def invalid_syntax(\n  return "missing parenthesis"\n'
    );

    const res = execScanner(DIAGNOSE_JS, ['--strict', '--json', '--dir', sandboxDir]);
    assert.strictEqual(res.code, 1, `Expected exit code 1 for broken Python in strict mode, got ${res.code}`);
    const json = JSON.parse(res.stdout);
    assert.strictEqual(json.summary.healthy, false);
    const pyCheck = json.checks.find((c) => c.id === 'python-syntax');
    assert.ok(pyCheck, 'python-syntax check should exist');
    assert.strictEqual(pyCheck.status, 'FAIL');
  });
});

runTest('Suite 5.3', 'Missing .env fixture triggers FAIL and exit code 1', () => {
  withTempSandbox((sandboxDir) => {
    fs.writeFileSync(
      path.join(sandboxDir, '.env.example'),
      'DATABASE_URL=postgres://localhost:5432/test\nPORT=3000\n'
    );

    const res = execScanner(DIAGNOSE_JS, ['--json', '--dir', sandboxDir]);
    assert.strictEqual(res.code, 1, `Expected exit code 1 for missing .env, got ${res.code}`);
    const json = JSON.parse(res.stdout);
    assert.strictEqual(json.summary.healthy, false);
    const envCheck = json.checks.find((c) => c.id === 'env-variables');
    assert.ok(envCheck, 'env-variables check should exist');
    assert.strictEqual(envCheck.status, 'FAIL');
  });
});

runTest('Suite 5.4', 'Mismatched .env keys fixture triggers FAIL and exit code 1', () => {
  withTempSandbox((sandboxDir) => {
    fs.writeFileSync(
      path.join(sandboxDir, '.env.example'),
      'PORT=3000\nAPI_KEY=secret_key_123\n'
    );
    fs.writeFileSync(
      path.join(sandboxDir, '.env'),
      'PORT=3000\n'
    );

    const res = execScanner(DIAGNOSE_JS, ['--json', '--dir', sandboxDir]);
    assert.strictEqual(res.code, 1, `Expected exit code 1 for mismatched .env, got ${res.code}`);
    const json = JSON.parse(res.stdout);
    assert.strictEqual(json.summary.healthy, false);
    const envCheck = json.checks.find((c) => c.id === 'env-variables');
    assert.ok(envCheck, 'env-variables check should exist');
    assert.strictEqual(envCheck.status, 'FAIL');
    assert.ok(envCheck.message.includes('API_KEY'), 'Should name missing API_KEY in message');
  });
});

runTest('Suite 5.5', 'Protected branch violation in Git sandbox triggers FAIL in strict mode', () => {
  withTempSandbox((sandboxDir) => {
    try {
      execSync('git init', { cwd: sandboxDir, stdio: 'ignore' });
      execSync('git config user.email "test@example.com"', { cwd: sandboxDir, stdio: 'ignore' });
      execSync('git config user.name "Tester"', { cwd: sandboxDir, stdio: 'ignore' });
      execSync('git checkout -b main', { cwd: sandboxDir, stdio: 'ignore' });
      fs.writeFileSync(path.join(sandboxDir, 'README.md'), '# Test Sandbox\n');
      execSync('git add . && git commit -m "init"', { cwd: sandboxDir, stdio: 'ignore' });
    } catch (_) {
      // If git command fails in environment, pass gracefully
      return;
    }

    const res = execScanner(DIAGNOSE_JS, ['--strict', '--check-git', '--json', '--dir', sandboxDir]);
    assert.strictEqual(res.code, 1, `Expected exit code 1 on protected main branch in strict mode, got ${res.code}`);
    const json = JSON.parse(res.stdout);
    assert.strictEqual(json.summary.healthy, false);
    const branchCheck = json.checks.find((c) => c.id === 'git-branch-safety');
    assert.ok(branchCheck, 'git-branch-safety check should exist');
    assert.strictEqual(branchCheck.status, 'FAIL');
  });
});

runTest('Suite 5.6', 'Multi-stack clean sandbox passes with exit code 0', () => {
  withTempSandbox((sandboxDir) => {
    fs.writeFileSync(
      path.join(sandboxDir, 'valid.js'),
      'function computeAnswer() {\n  return 42;\n}\n'
    );
    fs.writeFileSync(
      path.join(sandboxDir, '.env.example'),
      'PORT=8080\n'
    );
    fs.writeFileSync(
      path.join(sandboxDir, '.env'),
      'PORT=8080\n'
    );
    fs.writeFileSync(
      path.join(sandboxDir, '.gitignore'),
      '.env\nnode_modules\n'
    );

    const res = execScanner(DIAGNOSE_JS, ['--json', '--dir', sandboxDir]);
    assert.strictEqual(res.code, 0, `Expected exit code 0 on clean sandbox, got ${res.code}\nStdout: ${res.stdout}\nStderr: ${res.stderr}`);
    const json = JSON.parse(res.stdout);
    assert.strictEqual(json.summary.healthy, true);
    assert.strictEqual(json.summary.failed, 0);
  });
});

// ==========================================
// SUITE 6: Cross-Scanner Parity (JS vs Python)
// ==========================================
console.log(`\n${ANSI.bold}Suite 6: Cross-Scanner Parity (JS vs Python)${ANSI.reset}`);

if (PYTHON_BIN) {
  runTest('Suite 6.1', 'Both JS and Python scanners return exit code 0 on --help', () => {
    const jsRes = execScanner(DIAGNOSE_JS, ['--help']);
    const pyRes = execScanner(DIAGNOSE_PY, ['--help']);
    assert.strictEqual(jsRes.code, 0, `JS --help should exit 0, got ${jsRes.code}`);
    assert.strictEqual(pyRes.code, 0, `Py --help should exit 0, got ${pyRes.code}`);
  });

  runTest('Suite 6.2', 'Both JS and Python scanners return exit code 2 on invalid flag', () => {
    const jsRes = execScanner(DIAGNOSE_JS, ['--unknown-arg']);
    const pyRes = execScanner(DIAGNOSE_PY, ['--unknown-arg']);
    assert.strictEqual(jsRes.code, 2, `JS unknown flag should exit 2, got ${jsRes.code}`);
    assert.strictEqual(pyRes.code, 2, `Py unknown flag should exit 2, got ${pyRes.code}`);
  });

  runTest('Suite 6.3', 'Both JS and Python scanners produce identical JSON schema keys on clean sandbox', () => {
    withTempSandbox((sandboxDir) => {
      fs.writeFileSync(path.join(sandboxDir, 'main.py'), 'def test(): pass\n');
      fs.writeFileSync(path.join(sandboxDir, '.env.example'), 'APP_ENV=test\n');
      fs.writeFileSync(path.join(sandboxDir, '.env'), 'APP_ENV=test\n');
      fs.writeFileSync(path.join(sandboxDir, '.gitignore'), '.env\n');

      const jsRes = execScanner(DIAGNOSE_JS, ['--json', '--dir', sandboxDir]);
      const pyRes = execScanner(DIAGNOSE_PY, ['--json', '--dir', sandboxDir]);

      assert.strictEqual(jsRes.code, 0, `JS exit code should be 0, got ${jsRes.code}`);
      assert.strictEqual(pyRes.code, 0, `Py exit code should be 0, got ${pyRes.code}`);

      const jsJson = JSON.parse(jsRes.stdout);
      const pyJson = JSON.parse(pyRes.stdout);

      assert.strictEqual(jsJson.scanner, pyJson.scanner);
      assert.strictEqual(jsJson.version, pyJson.version);
      assert.strictEqual(jsJson.exitCode, pyJson.exitCode);
      assert.strictEqual(jsJson.summary.healthy, pyJson.summary.healthy);

      const jsCheckIds = jsJson.checks.map((c) => c.id).sort();
      const pyCheckIds = pyJson.checks.map((c) => c.id).sort();
      assert.deepStrictEqual(jsCheckIds, pyCheckIds, 'Check IDs must match across JS and Py scanners');
    });
  });

  runTest('Suite 6.4', 'Both JS and Python scanners catch Python syntax errors with exit code 1', () => {
    withTempSandbox((sandboxDir) => {
      fs.writeFileSync(path.join(sandboxDir, 'bad.py'), 'def foo(:\n    pass\n');

      const jsRes = execScanner(DIAGNOSE_JS, ['--json', '--dir', sandboxDir]);
      const pyRes = execScanner(DIAGNOSE_PY, ['--json', '--dir', sandboxDir]);

      assert.strictEqual(jsRes.code, 1, `JS exit code should be 1, got ${jsRes.code}`);
      assert.strictEqual(pyRes.code, 1, `Py exit code should be 1, got ${pyRes.code}`);

      const jsJson = JSON.parse(jsRes.stdout);
      const pyJson = JSON.parse(pyRes.stdout);

      const jsPyCheck = jsJson.checks.find((c) => c.id === 'python-syntax');
      const pyPyCheck = pyJson.checks.find((c) => c.id === 'python-syntax');

      assert.ok(jsPyCheck && jsPyCheck.status === 'FAIL', 'JS should fail python-syntax');
      assert.ok(pyPyCheck && pyPyCheck.status === 'FAIL', 'Py should fail python-syntax');
    });
  });
} else {
  console.log(`  ${ANSI.yellow}ℹ Skipping Suite 6 on local workstation: Python binary not installed in PATH.${ANSI.reset}`);
  console.log(`  ${ANSI.cyan}ℹ (Full cross-scanner parity will automatically execute in CI Ubuntu runner).${ANSI.reset}`);
}

// ==========================================
// SUMMARY
// ==========================================
console.log(`\n${ANSI.bold}=========================================${ANSI.reset}`);
console.log(`${ANSI.bold}🏁 Test Results:${ANSI.reset} Total: ${totalTests} | ${ANSI.green}Passed: ${passedTests}${ANSI.reset} | ${failedTests > 0 ? ANSI.red : ANSI.green}Failed: ${failedTests}${ANSI.reset}`);

if (failedTests > 0) {
  console.log(`\n${ANSI.red}${ANSI.bold}Failed Assertions:${ANSI.reset}`);
  for (const f of failures) {
    console.log(`  - ${f.name}: ${f.error.message}`);
  }
  process.exit(1);
} else {
  console.log(`\n${ANSI.green}${ANSI.bold}🎉 100% of diagnostic scanner assertions passed!${ANSI.reset}\n`);
  process.exit(0);
}
