#!/usr/bin/env python3
"""
🧪 Test Harness for Polyglot Diagnostic Scanner (Python & Node.js)
Zero external dependencies (uses standard library: unittest, subprocess, tempfile, pathlib, json, shutil, sys, os).

6 Comprehensive Test Suites:
  Suite 1: CLI Flags & Help Screen Validation
  Suite 2: JSON Output Schema & Exit Codes Validation
  Suite 3: Zero False Positives on Project Root
  Suite 4: Git Branch & Safety Audit Validation
  Suite 5: Isolated Synthetic Fixture Matrix (Negative & Positive Sandboxes)
  Suite 6: Cross-Scanner Parity (Python vs JS)
"""

import os
import sys
import json
import shutil
import tempfile
import unittest
import subprocess
from pathlib import Path

# Paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent
DIAGNOSE_JS = PROJECT_ROOT / "scripts" / "diagnose.js"
DIAGNOSE_PY = PROJECT_ROOT / "scripts" / "diagnose.py"

# ANSI Colors
RESET = "\033[0m"
RED = "\033[31m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
CYAN = "\033[36m"
BOLD = "\033[1m"


def exec_scanner(script_path, args=None, cwd=None):
    if args is None:
        args = []
    work_dir = cwd or str(PROJECT_ROOT)
    is_win = sys.platform == "win32"
    is_py = str(script_path).endswith(".py")
    bin_name = "python" if is_py else "node"

    cmd = [bin_name, str(script_path)] + args
    try:
        res = subprocess.run(
            cmd,
            cwd=work_dir,
            capture_output=True,
            text=True,
            timeout=25,
            shell=is_win,
        )
        return res.returncode, res.stdout, res.stderr
    except subprocess.TimeoutExpired:
        return 1, "", "Execution timed out"
    except Exception as e:
        return 1, "", str(e)


class TestSuite1CliFlags(unittest.TestCase):
    """Suite 1: CLI Flags & Help Screen Validation"""

    def test_help_flag_returns_zero(self):
        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, ["--help"])
        self.assertEqual(code, 0, f"Expected code 0, got {code}")
        self.assertIn("--strict", stdout)
        self.assertIn("--json", stdout)
        self.assertIn("--check-git", stdout)

    def test_h_alias_returns_zero(self):
        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, ["-h"])
        self.assertEqual(code, 0, f"Expected code 0, got {code}")
        self.assertIn("Universal Polyglot Diagnostic Health Scanner", stdout)

    def test_unknown_flag_returns_exit_two(self):
        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, ["--invalid-flag-xyz"])
        self.assertEqual(code, 2, f"Expected exit code 2 on unknown flag, got {code}")
        self.assertTrue("Unrecognized CLI argument" in stderr or "Unrecognized CLI argument" in stdout)


class TestSuite2JsonSchema(unittest.TestCase):
    """Suite 2: JSON Output Schema & Exit Codes Validation"""

    def test_json_output_structure_and_types(self):
        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, ["--json"])
        self.assertEqual(code, 0, f"Expected code 0 on clean workspace, got {code}\nErr: {stderr}")

        try:
            data = json.loads(stdout)
        except json.JSONDecodeError as e:
            self.fail(f"Failed to parse JSON: {e}\nRaw output:\n{stdout}")

        # Top-level keys
        self.assertEqual(data.get("scanner"), "Universal Polyglot Diagnostic Scanner")
        self.assertIsInstance(data.get("version"), str)
        self.assertIsInstance(data.get("timestamp"), str)
        self.assertIsInstance(data.get("workingDirectory"), str)
        self.assertIsInstance(data.get("detectedStacks"), list)
        self.assertIsInstance(data.get("flags"), dict)
        self.assertTrue(data.get("flags", {}).get("json"))

        # Summary structure
        summary = data.get("summary", {})
        self.assertIsInstance(summary.get("totalChecks"), int)
        self.assertIsInstance(summary.get("passed"), int)
        self.assertIsInstance(summary.get("failed"), int)
        self.assertIsInstance(summary.get("warnings"), int)
        self.assertIsInstance(summary.get("skipped"), int)
        self.assertIsInstance(summary.get("healthy"), bool)
        self.assertTrue(summary.get("healthy"))
        self.assertEqual(data.get("exitCode"), 0)

        # Checks array
        checks = data.get("checks", [])
        self.assertIsInstance(checks, list)
        for check in checks:
            self.assertIsInstance(check.get("id"), str)
            self.assertIsInstance(check.get("name"), str)
            self.assertIsInstance(check.get("stack"), str)
            self.assertIn(check.get("status"), ["PASS", "FAIL", "WARN", "SKIP"])
            self.assertIsInstance(check.get("message"), str)
            self.assertIsInstance(check.get("durationMs"), (int, float))


class TestSuite3ZeroFalsePositives(unittest.TestCase):
    """Suite 3: Zero False Positives on Root Workspace"""

    def test_diagnose_passes_clean_repository(self):
        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, [])
        self.assertEqual(code, 0, f"Expected exit code 0 on clean repository, got {code}\nStdout: {stdout}\nStderr: {stderr}")
        self.assertTrue("HEALTHY" in stdout or "100% HEALTHY" in stdout)


class TestSuite4GitAudit(unittest.TestCase):
    """Suite 4: Git Branch & Safety Audit Validation"""

    def test_check_git_flag_executes_safely(self):
        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, ["--check-git", "--json"])
        data = json.loads(stdout)
        check_ids = [c["id"] for c in data.get("checks", [])]
        self.assertIn("git-branch-safety", check_ids)
        self.assertIn("git-secrets", check_ids)


class TestSuite5SyntheticFixtures(unittest.TestCase):
    """Suite 5: Isolated Synthetic Fixture Matrix (Sandbox Testing)"""

    def setUp(self):
        self.temp_dir = tempfile.mkdtemp(prefix="diagnose_fixture_")

    def tearDown(self):
        shutil.rmtree(self.temp_dir, ignore_errors=True)

    def test_fixture_broken_typescript(self):
        ts_config = Path(self.temp_dir) / "tsconfig.json"
        ts_config.write_text(json.dumps({"compilerOptions": {"noEmit": True, "strict": True}}), encoding="utf-8")
        bad_ts = Path(self.temp_dir) / "index.ts"
        bad_ts.write_text('const num: number = "broken type";\n', encoding="utf-8")

        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, ["--json", "--dir", self.temp_dir])
        self.assertEqual(code, 1, f"Expected exit code 1 for broken TS, got {code}")
        data = json.loads(stdout)
        self.assertFalse(data["summary"]["healthy"])
        ts_check = next((c for c in data["checks"] if c["id"] == "typescript-typecheck"), None)
        self.assertIsNotNone(ts_check)
        self.assertEqual(ts_check["status"], "FAIL")

    def test_fixture_broken_python_syntax(self):
        bad_py = Path(self.temp_dir) / "broken.py"
        bad_py.write_text("def invalid_func(:\n    pass\n", encoding="utf-8")

        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, ["--json", "--dir", self.temp_dir])
        self.assertEqual(code, 1, f"Expected exit code 1 for bad Python syntax, got {code}")
        data = json.loads(stdout)
        self.assertFalse(data["summary"]["healthy"])
        py_check = next((c for c in data["checks"] if c["id"] == "python-syntax"), None)
        self.assertIsNotNone(py_check)
        self.assertEqual(py_check["status"], "FAIL")

    def test_fixture_missing_env(self):
        env_example = Path(self.temp_dir) / ".env.example"
        env_example.write_text("DATABASE_URL=postgres://...\n", encoding="utf-8")

        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, ["--json", "--dir", self.temp_dir])
        self.assertEqual(code, 1, f"Expected exit code 1 for missing .env, got {code}")
        data = json.loads(stdout)
        self.assertFalse(data["summary"]["healthy"])
        env_check = next((c for c in data["checks"] if c["id"] == "env-variables"), None)
        self.assertIsNotNone(env_check)
        self.assertEqual(env_check["status"], "FAIL")

    def test_fixture_mismatched_env(self):
        env_example = Path(self.temp_dir) / ".env.example"
        env_example.write_text("PORT=8000\nSECRET_KEY=12345\n", encoding="utf-8")
        env_actual = Path(self.temp_dir) / ".env"
        env_actual.write_text("PORT=8000\n", encoding="utf-8")

        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, ["--json", "--dir", self.temp_dir])
        self.assertEqual(code, 1, f"Expected exit code 1 for mismatched .env, got {code}")
        data = json.loads(stdout)
        self.assertFalse(data["summary"]["healthy"])
        env_check = next((c for c in data["checks"] if c["id"] == "env-variables"), None)
        self.assertIsNotNone(env_check)
        self.assertEqual(env_check["status"], "FAIL")
        self.assertIn("SECRET_KEY", env_check["message"])

    def test_fixture_protected_branch_violation(self):
        try:
            subprocess.run(["git", "init"], cwd=self.temp_dir, capture_output=True, check=True)
            subprocess.run(["git", "config", "user.email", "test@test.com"], cwd=self.temp_dir, capture_output=True)
            subprocess.run(["git", "config", "user.name", "Test"], cwd=self.temp_dir, capture_output=True)
            subprocess.run(["git", "checkout", "-b", "main"], cwd=self.temp_dir, capture_output=True)
            (Path(self.temp_dir) / "README.md").write_text("# Sandbox\n", encoding="utf-8")
            subprocess.run(["git", "add", "."], cwd=self.temp_dir, capture_output=True)
            subprocess.run(["git", "commit", "-m", "init"], cwd=self.temp_dir, capture_output=True)
        except Exception:
            return  # Skip gracefully if git not available

        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, ["--strict", "--check-git", "--json", "--dir", self.temp_dir])
        self.assertEqual(code, 1, f"Expected exit code 1 on main branch in strict mode, got {code}")
        data = json.loads(stdout)
        self.assertFalse(data["summary"]["healthy"])
        branch_check = next((c for c in data["checks"] if c["id"] == "git-branch-safety"), None)
        self.assertIsNotNone(branch_check)
        self.assertEqual(branch_check["status"], "FAIL")

    def test_fixture_multi_stack_clean_sandbox(self):
        (Path(self.temp_dir) / "valid.py").write_text("def add(a, b):\n    return a + b\n", encoding="utf-8")
        (Path(self.temp_dir) / ".env.example").write_text("API_PORT=3000\n", encoding="utf-8")
        (Path(self.temp_dir) / ".env").write_text("API_PORT=3000\n", encoding="utf-8")
        (Path(self.temp_dir) / ".gitignore").write_text(".env\n", encoding="utf-8")

        code, stdout, stderr = exec_scanner(DIAGNOSE_PY, ["--json", "--dir", self.temp_dir])
        self.assertEqual(code, 0, f"Expected exit code 0 on clean sandbox, got {code}\nStdout: {stdout}\nStderr: {stderr}")
        data = json.loads(stdout)
        self.assertTrue(data["summary"]["healthy"])
        self.assertEqual(data["summary"]["failed"], 0)


class TestSuite6CrossScannerParity(unittest.TestCase):
    """Suite 6: Cross-Scanner Parity (Python vs JS)"""

    def test_both_scanners_help_code(self):
        py_code, _, _ = exec_scanner(DIAGNOSE_PY, ["--help"])
        js_code, _, _ = exec_scanner(DIAGNOSE_JS, ["--help"])
        self.assertEqual(py_code, 0)
        self.assertEqual(js_code, 0)

    def test_both_scanners_invalid_flag_code(self):
        py_code, _, _ = exec_scanner(DIAGNOSE_PY, ["--unsupported-flag"])
        js_code, _, _ = exec_scanner(DIAGNOSE_JS, ["--unsupported-flag"])
        self.assertEqual(py_code, 2)
        self.assertEqual(js_code, 2)

    def test_both_scanners_clean_sandbox_schema_parity(self):
        temp_dir = tempfile.mkdtemp(prefix="diagnose_parity_")
        try:
            (Path(temp_dir) / "service.py").write_text("def ping(): return 'pong'\n", encoding="utf-8")
            (Path(temp_dir) / ".env.example").write_text("NODE_ENV=production\n", encoding="utf-8")
            (Path(temp_dir) / ".env").write_text("NODE_ENV=production\n", encoding="utf-8")
            (Path(temp_dir) / ".gitignore").write_text(".env\n", encoding="utf-8")

            py_code, py_out, _ = exec_scanner(DIAGNOSE_PY, ["--json", "--dir", temp_dir])
            js_code, js_out, _ = exec_scanner(DIAGNOSE_JS, ["--json", "--dir", temp_dir])

            self.assertEqual(py_code, 0)
            self.assertEqual(js_code, 0)

            py_data = json.loads(py_out)
            js_data = json.loads(js_out)

            self.assertEqual(py_data["scanner"], js_data["scanner"])
            self.assertEqual(py_data["version"], js_data["version"])
            self.assertEqual(py_data["summary"]["healthy"], js_data["summary"]["healthy"])
            self.assertEqual(py_data["exitCode"], js_data["exitCode"])

            py_ids = sorted([c["id"] for c in py_data["checks"]])
            js_ids = sorted([c["id"] for c in js_data["checks"]])
            self.assertEqual(py_ids, js_ids, "Check IDs must match across scanners")
        finally:
            shutil.rmtree(temp_dir, ignore_errors=True)


def main():
    print(f"\n{BOLD}{CYAN}🧪 Universal Diagnostic Scanner Test Runner (Python unittest){RESET}\n")
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    suite.addTests(loader.loadTestsFromTestCase(TestSuite1CliFlags))
    suite.addTests(loader.loadTestsFromTestCase(TestSuite2JsonSchema))
    suite.addTests(loader.loadTestsFromTestCase(TestSuite3ZeroFalsePositives))
    suite.addTests(loader.loadTestsFromTestCase(TestSuite4GitAudit))
    suite.addTests(loader.loadTestsFromTestCase(TestSuite5SyntheticFixtures))
    suite.addTests(loader.loadTestsFromTestCase(TestSuite6CrossScannerParity))

    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    if result.wasSuccessful():
        print(f"\n{GREEN}{BOLD}🎉 100% of diagnostic scanner assertions passed! (Python runner){RESET}\n")
        sys.exit(0)
    else:
        print(f"\n{RED}{BOLD}✖ Test suite failures detected: {len(result.failures)} failure(s), {len(result.errors)} error(s){RESET}\n")
        sys.exit(1)


if __name__ == "__main__":
    main()
