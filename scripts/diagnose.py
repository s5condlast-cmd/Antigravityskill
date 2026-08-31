#!/usr/bin/env python3
"""
⚡ Universal Polyglot Project Health & Diagnostic Scanner (Python)
Zero external dependencies (uses standard library: sys, os, subprocess, pathlib, json, re, shutil, ast, time, datetime).

Supported CLI Flags:
  -s, --strict      Enforce strict quality mode (warnings escalate to failure exit code 1)
  -j, --json        Output diagnostic results as structured JSON
  --check-git       Audit git branch protection rules and uncommitted secrets
  -h, --help        Show command-line usage and exit with code 0
  --dir <path>      Specify target working directory to scan (defaults to current directory)

Deterministic Exit Codes:
  0 = Clean / Pass (all checks healthy)
  1 = Diagnostic Issues Found / Strict Failure
  2 = CLI Usage Error / Unknown Arguments
"""

import os
import sys
import json
import re
import time
import shutil
import ast
import subprocess
from datetime import datetime, timezone
from pathlib import Path

# --- CLI Argument Parsing ---
raw_args = sys.argv[1:]
is_json = False
is_strict = False
check_git = False
show_help = False
target_dir = Path.cwd().resolve()

i = 0
while i < len(raw_args):
    arg = raw_args[i]
    if arg in ("-h", "--help"):
        show_help = True
    elif arg in ("-j", "--json"):
        is_json = True
    elif arg in ("-s", "--strict"):
        is_strict = True
    elif arg == "--check-git":
        check_git = True
    elif arg in ("--dir", "--cwd"):
        if i + 1 >= len(raw_args):
            sys.stderr.write(f"Error: {arg} requires a path argument.\n")
            sys.exit(2)
        i += 1
        target_dir = Path(raw_args[i]).resolve()
    elif arg.startswith("--dir="):
        target_dir = Path(arg[6:]).resolve()
    elif arg.startswith("--cwd="):
        target_dir = Path(arg[6:]).resolve()
    elif not arg.startswith("-") and i == len(raw_args) - 1 and not Path(arg).exists():
        sys.stderr.write(f"Error: Unrecognized positional argument or directory not found: '{arg}'\n")
        sys.exit(2)
    elif not arg.startswith("-") and Path(arg).exists():
        target_dir = Path(arg).resolve()
    else:
        sys.stderr.write(f"Error: Unrecognized CLI argument: '{arg}'. Run with --help for valid options.\n")
        sys.exit(2)
    i += 1

if show_help:
    help_text = """
Universal Polyglot Diagnostic Health Scanner (Python)
Version: 2.0.0

Usage:
  python scripts/diagnose.py [options] [directory]

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
"""
    print(help_text.strip())
    sys.exit(0)

# Verify target directory exists
if not target_dir.exists() or not target_dir.is_dir():
    sys.stderr.write(f"Error: Target directory does not exist or is not a directory: {target_dir}\n")
    sys.exit(2)

# ANSI Colors
RESET = "" if is_json else "\033[0m"
RED = "" if is_json else "\033[31m"
GREEN = "" if is_json else "\033[32m"
YELLOW = "" if is_json else "\033[33m"
CYAN = "" if is_json else "\033[36m"
BOLD = "" if is_json else "\033[1m"
DIM = "" if is_json else "\033[2m"

if not is_json:
    print(f"\n{BOLD}{CYAN}🔬 === Universal Polyglot Diagnostic Scanner (Python) ==={RESET}\n")

# Diagnostic State
detected_stacks = []
check_results = []
passed_count = 0
failed_count = 0
warnings_count = 0
skipped_count = 0

# Helper: Run shell command safely
def run_cmd(cmd, cwd=None, timeout=15):
    work_dir = cwd or str(target_dir)
    is_win = sys.platform == "win32"
    try:
        if isinstance(cmd, list) and is_win:
            resolved = shutil.which(cmd[0])
            if resolved:
                cmd[0] = resolved
        res = subprocess.run(
            cmd,
            cwd=work_dir,
            capture_output=True,
            text=True,
            timeout=timeout,
            shell=is_win if isinstance(cmd, str) else False,
        )
        return res.returncode == 0, res.stdout or "", res.stderr or ""
    except subprocess.TimeoutExpired:
        return False, "", "Command timed out"
    except FileNotFoundError:
        cmd_name = cmd[0] if isinstance(cmd, list) else cmd.split()[0]
        return False, "", f"Command not found: {cmd_name}"
    except Exception as e:
        return False, "", str(e)

# Helper: Execute and record a check
def execute_check(check_id, name, stack, fn):
    global passed_count, failed_count, warnings_count, skipped_count
    if not is_json:
        sys.stdout.write(f"Checking {name}... ")
        sys.stdout.flush()
    start_time = time.time()
    try:
        res = fn()
        duration_ms = int((time.time() - start_time) * 1000)
        status = res.get("status") or ("PASS" if res.get("success") else ("WARN" if res.get("warning") else "FAIL"))
        message = res.get("message") or res.get("info") or res.get("error") or res.get("warning") or ""
        details = res.get("details")

        if status == "PASS":
            passed_count += 1
            if not is_json:
                print(f"{GREEN}✔ OK{RESET}")
                if message:
                    print(f"   └─ {message}")
        elif status == "WARN":
            warnings_count += 1
            if is_strict:
                failed_count += 1
            if not is_json:
                print(f"{YELLOW}⚠ WARNING{RESET}")
                if message:
                    print(f"   └─ {YELLOW}{message}{RESET}")
        elif status == "SKIP":
            skipped_count += 1
            if not is_json:
                print(f"{DIM}⏭ SKIPPED{RESET}")
                if message:
                    print(f"   └─ {DIM}{message}{RESET}")
        else:
            failed_count += 1
            if not is_json:
                print(f"{RED}✖ FAILED{RESET}")
                if message:
                    print(f"   └─ {RED}{message}{RESET}")

        check_results.append({
            "id": check_id,
            "name": name,
            "stack": stack,
            "status": status,
            "message": message,
            "details": details,
            "durationMs": duration_ms,
        })
    except Exception as err:
        duration_ms = int((time.time() - start_time) * 1000)
        failed_count += 1
        if not is_json:
            print(f"{RED}✖ ERROR{RESET}")
            print(f"   └─ {RED}{str(err)}{RESET}")
        check_results.append({
            "id": check_id,
            "name": name,
            "stack": stack,
            "status": "FAIL",
            "message": str(err),
            "details": None,
            "durationMs": duration_ms,
        })

# Helper: Find files excluding ignored directories
def find_files(dir_path, extensions, ignore_dirs=None):
    if ignore_dirs is None:
        ignore_dirs = {".git", ".agents", ".venv", "venv", "node_modules", "dist", "build", "__pycache__", ".pytest_cache"}
    results = []
    try:
        for root, dirs, files in os.walk(dir_path):
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            for f in files:
                if any(f.endswith(ext) for ext in extensions):
                    results.append(Path(root) / f)
    except Exception:
        pass
    return results

# --- 1. Detect Stacks ---
pkg_json_path = target_dir / "package.json"
tsconfig_path = target_dir / "tsconfig.json"
jsconfig_path = target_dir / "jsconfig.json"
pyproject_path = target_dir / "pyproject.toml"
req_txt_path = target_dir / "requirements.txt"
pipfile_path = target_dir / "Pipfile"
setup_py_path = target_dir / "setup.py"
go_mod_path = target_dir / "go.mod"
cargo_toml_path = target_dir / "Cargo.toml"

has_node = pkg_json_path.exists() or tsconfig_path.exists() or jsconfig_path.exists()
py_files = find_files(target_dir, [".py"])
has_python = pyproject_path.exists() or req_txt_path.exists() or pipfile_path.exists() or setup_py_path.exists() or len(py_files) > 0
has_go = go_mod_path.exists() or len(find_files(target_dir, [".go"])) > 0
has_rust = cargo_toml_path.exists()

if has_node:
    detected_stacks.append("Node/TypeScript")
if has_python:
    detected_stacks.append("Python")
if has_go:
    detected_stacks.append("Go")
if has_rust:
    detected_stacks.append("Rust")

if not is_json:
    stack_str = ", ".join(detected_stacks) if detected_stacks else "Generic Workspace"
    print(f"{BOLD}Detected Stack(s):{RESET} {stack_str}\n")

# --- 2. Git Branch & Safety Audit ---
if check_git:
    def check_git_branch():
        ok, out, err = run_cmd("git branch --show-current")
        if not ok:
            ok, out, err = run_cmd("git rev-parse --abbrev-ref HEAD")
            if not ok:
                return {"status": "PASS", "message": "Not a git repository or git not available (skipped)"}
        current_branch = out.strip()
        if not current_branch or current_branch == "HEAD":
            msg = "Detached HEAD state detected."
            return {"status": "FAIL" if is_strict else "WARN", "message": msg}
        if current_branch in ("main", "master", "develop"):
            msg = f"Active branch is '{current_branch}'. Direct commits to main/master/develop are prohibited by /push protocol. Switch to a feature branch (feat/*, fix/*, ui/*)."
            return {"status": "FAIL" if is_strict else "WARN", "message": msg}
        return {"status": "PASS", "message": f"Active branch: {current_branch} (safe feature branch)"}

    execute_check("git-branch-safety", "Git Branch Safety & Protection", "Git", check_git_branch)

    def check_git_secrets():
        ok, out, err = run_cmd("git status --porcelain")
        if not ok:
            return {"status": "PASS", "message": "Not a git repository or git not available"}
        lines = [l.strip() for l in out.splitlines() if l.strip()]
        secret_patterns = [
            re.compile(r"(^|[/\\])\.env($|\.local$|\.production$|\.staging$)", re.I),
            re.compile(r"(^|[/\\])(credentials|token|secret|auth)\.json$", re.I),
            re.compile(r"(^|[/\\])id_(rsa|ed25519|ecdsa|dsa)($|\.pub$)", re.I),
            re.compile(r"\.(pem|key|p12|pfx|kdbx)$", re.I),
        ]
        sensitive_files = []
        for line in lines:
            file_path = re.sub(r"^[MADRCU?! ]+\s+", "", line).strip()
            for pattern in secret_patterns:
                if pattern.search(file_path):
                    if not file_path.endswith(".env.example"):
                        sensitive_files.append(file_path)
                        break
        if sensitive_files:
            return {
                "status": "FAIL",
                "message": f"🔴 SECURITY RISK: Sensitive secret file(s) staged or untracked: {', '.join(sensitive_files)}. Add to .gitignore immediately!",
                "details": sensitive_files,
            }
        return {"status": "PASS", "message": "No uncommitted secrets or sensitive credential files detected"}

    execute_check("git-secrets", "Git Uncommitted Secrets Audit", "Git", check_git_secrets)

# --- 3. TypeScript / Node.js Analysis ---
if has_node:
    if pkg_json_path.exists():
        def check_node_deps():
            try:
                pkg = json.loads(pkg_json_path.read_text(encoding="utf-8"))
            except Exception as e:
                return {"status": "FAIL", "message": f"Invalid package.json: {str(e)}"}
            has_deps = bool(pkg.get("dependencies")) or bool(pkg.get("devDependencies"))
            if has_deps:
                node_modules_path = target_dir / "node_modules"
                if not node_modules_path.exists():
                    msg = "node_modules directory is missing. Run npm install or pnpm install."
                    return {"status": "FAIL" if is_strict else "WARN", "message": msg}
                return {"status": "PASS", "message": "node_modules directory is present"}
            return {"status": "PASS", "message": "package.json has no declared dependencies"}

        execute_check("node-dependencies", "Node Dependencies (node_modules)", "Node/TypeScript", check_node_deps)

    if tsconfig_path.exists():
        def check_ts_types():
            is_win = sys.platform == "win32"
            local_bin = target_dir / "node_modules" / ".bin" / ("tsc.cmd" if is_win else "tsc")
            if local_bin.exists():
                cmd = f'"{local_bin}" --noEmit'
            else:
                cmd = "npx tsc --noEmit"
            ok, out, err = run_cmd(cmd, timeout=20)
            if ok:
                return {"status": "PASS", "message": "0 type errors detected"}
            combined = (out + "\n" + err).strip()
            err_lines = [l for l in combined.splitlines() if "error TS" in l or "Error:" in l]
            snippet = "\n   ".join(err_lines[:4]) if err_lines else combined[:200]
            return {
                "status": "FAIL",
                "message": f"TypeScript red lines detected ({len(err_lines) or 1} error(s)):\n   {snippet}",
                "details": combined,
            }

        execute_check("typescript-typecheck", "TypeScript Type Safety (tsc)", "Node/TypeScript", check_ts_types)

# --- 4. Python Analysis ---
if has_python:
    def check_py_env():
        venv_paths = [".venv", "venv", "env"]
        has_venv_dir = any((target_dir / p).exists() for p in venv_paths)
        has_venv_env = bool(os.environ.get("VIRTUAL_ENV"))
        if has_venv_dir or has_venv_env:
            return {"status": "PASS", "message": "Virtual environment detected"}
        return {"status": "PASS", "message": "No local .venv directory detected (Global or container environment)"}

    execute_check("python-environment", "Python Virtual Environment", "Python", check_py_env)

    if py_files:
        def check_py_syntax():
            errors = []
            for py_file in py_files:
                try:
                    with open(py_file, "rb") as f:
                        code_bytes = f.read()
                    ast.parse(code_bytes, filename=str(py_file))
                except SyntaxError as e:
                    rel = os.path.relpath(str(py_file), str(target_dir))
                    errors.append(f"{rel}:{e.lineno}:{e.offset} - {e.msg}")
                except Exception as e:
                    rel = os.path.relpath(str(py_file), str(target_dir))
                    errors.append(f"{rel} - {str(e)}")

            if errors:
                snippet = "\n   ".join(errors[:3])
                return {
                    "status": "FAIL",
                    "message": f"Python syntax errors detected ({len(errors)} error(s)):\n   {snippet}",
                    "details": errors,
                }
            return {"status": "PASS", "message": f"0 syntax errors across {len(py_files)} python file(s)"}

        execute_check("python-syntax", "Python Syntax & Byte-Compilation", "Python", check_py_syntax)

    mypy_ini = target_dir / "mypy.ini"
    if mypy_ini.exists():
        def check_mypy():
            ok, out, err = run_cmd("mypy . --ignore-missing-imports", timeout=20)
            if ok:
                return {"status": "PASS", "message": "0 mypy type errors"}
            if "not found" in err or "is not recognized" in err:
                return {
                    "status": "FAIL" if is_strict else "SKIP",
                    "message": "mypy is configured but not installed in PATH" if is_strict else "mypy not installed"
                }
            return {
                "status": "FAIL",
                "message": f"mypy reported type errors:\n   {out.splitlines()[:3]}",
                "details": out,
            }

        execute_check("python-mypy", "Python Type Checking (mypy)", "Python", check_mypy)

# --- 5. Go Analysis ---
if has_go:
    def check_go():
        ok, out, err = run_cmd("go vet ./...", timeout=20)
        if ok:
            return {"status": "PASS", "message": "0 Go vet errors"}
        if "not found" in err or "is not recognized" in err:
            return {
                "status": "FAIL" if is_strict else "SKIP",
                "message": "Go runtime (go) not installed in PATH" if is_strict else "Go runtime not installed"
            }
        return {"status": "FAIL", "message": f"Go vet error:\n   {err or out}"}

    execute_check("go-vet", "Go Compiler & Vet (go vet)", "Go", check_go)

# --- 6. Rust Analysis ---
if has_rust:
    def check_rust():
        ok, out, err = run_cmd("cargo check --all-targets", timeout=30)
        if ok:
            return {"status": "PASS", "message": "0 Rust compiler errors"}
        if "not found" in err or "is not recognized" in err:
            return {
                "status": "FAIL" if is_strict else "SKIP",
                "message": "Rust toolchain (cargo) not installed in PATH" if is_strict else "Rust toolchain not installed"
            }
        return {"status": "FAIL", "message": f"Cargo check error:\n   {err or out}"}

    execute_check("rust-check", "Rust Compilation (cargo check)", "Rust", check_rust)

# --- 7. Environment Variables Parity ---
env_example_path = target_dir / ".env.example"
env_path = target_dir / ".env"
gitignore_path = target_dir / ".gitignore"

if env_example_path.exists() or env_path.exists():
    def check_env_vars():
        if env_example_path.exists() and not env_path.exists():
            return {"status": "FAIL", "message": ".env.example exists but .env is missing!"}
        if env_example_path.exists() and env_path.exists():
            def parse_keys(p):
                keys = []
                for line in p.read_text(encoding="utf-8").splitlines():
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k = line.split("=", 1)[0].strip()
                        if k:
                            keys.append(k)
                return set(keys)

            example_keys = parse_keys(env_example_path)
            env_keys = parse_keys(env_path)
            missing = example_keys - env_keys
            if missing:
                return {
                    "status": "FAIL",
                    "message": f"Missing required key(s) in .env: {', '.join(sorted(missing))}",
                    "details": sorted(list(missing)),
                }
            if gitignore_path.exists():
                gi_content = gitignore_path.read_text(encoding="utf-8")
                is_ignored = any(
                    line.strip() in (".env", ".env*", "*.env") or line.strip().startswith(".env")
                    for line in gi_content.splitlines()
                )
                if not is_ignored:
                    msg = ".env is present but not explicitly listed in .gitignore"
                    return {"status": "FAIL" if is_strict else "WARN", "message": msg}
            return {"status": "PASS", "message": "All required environment variables present and .env is gitignored"}
        return {"status": "PASS", "message": "Environment clean (no .env.example requirements)"}

    execute_check("env-variables", "Environment Variables Parity (.env vs .env.example)", "Environment", check_env_vars)

# --- Summary & JSON Output ---
total_checks = len(check_results)
issues_count = failed_count + (warnings_count if is_strict else 0)
is_healthy = failed_count == 0 and (warnings_count == 0 if is_strict else True)
exit_code = 0 if is_healthy else 1

if is_json:
    json_payload = {
        "scanner": "Universal Polyglot Diagnostic Scanner",
        "version": "2.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "workingDirectory": str(target_dir),
        "detectedStacks": detected_stacks,
        "flags": {
            "strict": is_strict,
            "json": is_json,
            "checkGit": check_git,
        },
        "summary": {
            "totalChecks": total_checks,
            "passed": passed_count,
            "failed": failed_count,
            "warnings": warnings_count,
            "skipped": skipped_count,
            "healthy": is_healthy,
            "issuesCount": issues_count,
        },
        "checks": check_results,
        "exitCode": exit_code,
    }
    print(json.dumps(json_payload, indent=2))
else:
    print(f"\n{BOLD}📋 Diagnostic Summary:{RESET}")
    if is_healthy:
        if warnings_count > 0:
            print(f"{YELLOW}{BOLD}✔ HEALTHY WITH WARNINGS: 0 errors, {warnings_count} warning(s) detected.{RESET}\n")
        else:
            print(f"{GREEN}{BOLD}🎉 100% HEALTHY! All stacks verified with zero compiler or config errors.{RESET}\n")
    else:
        print(f"{RED}{BOLD}⚠️  {failed_count} error(s) and {warnings_count} warning(s) detected. Exit code: {exit_code}.{RESET}\n")

sys.exit(exit_code)
