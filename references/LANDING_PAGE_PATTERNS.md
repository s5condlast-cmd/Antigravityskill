# 🎨 Elite SaaS & Product Interface Patterns

Production-ready, accessible, high-density React + Tailwind component patterns. Built to the standards of **Linear, Stripe, Apple, Vercel, and Raycast**—with **zero AI slop, zero generic marketing fluff, and zero fake stock testimonials**.

---

## 📑 Pattern Catalog

1. [Spotlight Command Palette (`⌘K`)](#1-spotlight-command-palette-k)
2. [High-Density Deployment & Activity Table](#2-high-density-deployment--activity-table)
3. [Interactive Code Terminal & Diff Preview](#3-interactive-code-terminal--diff-preview)
4. [Craft-Grade Hero with Live Product Preview](#4-craft-grade-hero-with-live-product-preview)
5. [High-Taste Modular Bento Grid](#5-high-taste-modular-bento-grid)
6. [Interactive Pricing Comparison Matrix](#6-interactive-pricing-comparison-matrix)
7. [Subdued Minimalist Footer](#7-subdued-minimalist-footer)

---

## 1. 🔍 Spotlight Command Palette (`⌘K`)

A functional, keyboard-accessible command bar (Raycast / Linear style) with group filtering, recent items, and shortcut hints.

```tsx
import React, { useState, useEffect } from 'react';
import { Search, Terminal, GitBranch, Bug, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  title: string;
  category: 'Commands' | 'Navigation' | 'Actions';
  shortcut?: string;
  icon: React.ReactNode;
}

const COMMANDS: CommandItem[] = [
  { id: '1', title: '/debug: Run 5-Phase Diagnostic Scan', category: 'Commands', shortcut: '⌘D', icon: <Bug className="h-4 w-4 text-emerald-400" /> },
  { id: '2', title: '/design: Ingest Brand Tokens', category: 'Commands', shortcut: '⌘G', icon: <Sparkles className="h-4 w-4 text-sky-400" /> },
  { id: '3', title: '/push: Stage & Atomic Sync', category: 'Commands', shortcut: '⌘P', icon: <GitBranch className="h-4 w-4 text-amber-400" /> },
  { id: '4', title: 'Open Diagnostics Console', category: 'Navigation', shortcut: 'G D', icon: <Terminal className="h-4 w-4 text-zinc-400" /> },
];

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = COMMANDS.filter((cmd) => cmd.title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle logic handled by parent
      }
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filtered.length, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150" />

      <div className="relative w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in zoom-in-95 duration-150 z-10">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 border-b border-zinc-800/80">
          <Search className="h-4 w-4 text-zinc-500 shrink-0" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search actions..."
            className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
            autoFocus
          />
          <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500">No matching commands found.</div>
          ) : (
            filtered.map((item, index) => (
              <div
                key={item.id}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs cursor-pointer transition-colors",
                  selectedIndex === index ? "bg-zinc-800 text-white font-medium" : "text-zinc-300 hover:bg-zinc-900"
                )}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {item.shortcut && (
                  <kbd className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800/60">
                    {item.shortcut}
                  </kbd>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/40 border-t border-zinc-800/60 text-[11px] text-zinc-500">
          <span className="flex items-center gap-1.5">
            <CornerDownLeft className="h-3 w-3" /> Select
          </span>
          <span className="font-mono">v2.4.0-stable</span>
        </div>
      </div>
    </div>
  );
}
```

---

## 2. 📊 High-Density Deployment & Activity Table

A compact, information-dense table with live status badges, commit hashes, latency metrics, and avatar initials (Vercel / GitHub style).

```tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { GitCommit, Clock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface Deployment {
  id: string;
  branch: string;
  commitHash: string;
  commitMsg: string;
  status: 'healthy' | 'building' | 'failed';
  duration: string;
  timestamp: string;
  author: string;
}

const DEPLOYMENTS: Deployment[] = [
  { id: 'dep_994a', branch: 'main', commitHash: '09c803c', commitMsg: 'feat(design): implement bento grid showcase', status: 'healthy', duration: '142ms', timestamp: '2m ago', author: 'JD' },
  { id: 'dep_882b', branch: 'feat/tokens', commitHash: '7822cbc', commitMsg: 'fix(a11y): adjust contrast tokens to 5.2:1', status: 'healthy', duration: '118ms', timestamp: '14m ago', author: 'AL' },
  { id: 'dep_771c', branch: 'main', commitHash: '688542a', commitMsg: 'refactor: isolate boundary parsing in auth', status: 'building', duration: 'Running...', timestamp: 'Just now', author: 'JD' },
];

export function ActivityTable() {
  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl text-left">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100">Production Deployments</h3>
          <p className="text-xs text-zinc-500 mt-0.5 font-mono">Active Environment: prod-us-east-1</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Systems Operational
        </span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-zinc-800/60">
        {DEPLOYMENTS.map((row) => (
          <div key={row.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-zinc-900/40 transition-colors text-xs">
            {/* Commit & Branch */}
            <div className="flex items-center gap-3 min-w-[280px]">
              <span className="h-7 w-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono text-[10px] text-zinc-300 font-semibold">
                {row.author}
              </span>
              <div>
                <p className="font-medium text-zinc-200 tracking-tight">{row.commitMsg}</p>
                <div className="flex items-center gap-2 mt-0.5 font-mono text-[11px] text-zinc-500">
                  <span className="text-zinc-400">{row.branch}</span>
                  <span>•</span>
                  <span className="text-zinc-400 flex items-center gap-0.5"><GitCommit className="h-3 w-3" /> {row.commitHash}</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-1.5 min-w-[100px]">
              {row.status === 'healthy' && (
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium font-mono text-[11px]">
                  <CheckCircle2 className="h-3.5 w-3.5" /> 200 OK
                </span>
              )}
              {row.status === 'building' && (
                <span className="inline-flex items-center gap-1 text-amber-400 font-medium font-mono text-[11px]">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Building
                </span>
              )}
            </div>

            {/* Performance Metrics */}
            <div className="hidden sm:flex items-center gap-6 text-zinc-400 font-mono text-[11px]">
              <span className="tabular-nums">{row.duration}</span>
              <span className="flex items-center gap-1 text-zinc-500"><Clock className="h-3 w-3" /> {row.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 3. 💻 Interactive Code Terminal & Diff Preview

A macOS-styled window frame showing live syntax-highlighted code with copy feedback and tabs.

```tsx
import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export function CodeTerminalPreview() {
  const [copied, setCopied] = useState(false);

  const codeString = `// Zero-defect boundary parsing & discriminated union
export type ApiResponse<T> = 
  | { success: true; data: T; latencyMs: number }
  | { success: false; error: { code: string; message: string } };

export async function fetchMetrics(): Promise<ApiResponse<Metrics>> {
  const res = await client.get('/v1/telemetry');
  return { success: true, data: res.data, latencyMs: 42 };
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl text-left max-w-2xl mx-auto">
      {/* Window Controls Header */}
      <div className="px-4 py-3 bg-zinc-900/60 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 text-xs font-mono text-zinc-400">telemetry.ts</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Body */}
      <pre className="p-5 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
        <code>
          <span className="text-zinc-500">// Zero-defect boundary parsing & discriminated union</span>{'\n'}
          <span className="text-sky-400">export type</span> <span className="text-amber-300">ApiResponse</span>&lt;<span className="text-emerald-300">T</span>&gt; = {'\n'}
          {'  '}| {'{'}{' '}<span className="text-violet-300">success</span>: <span className="text-emerald-400">true</span>; <span className="text-violet-300">data</span>: <span className="text-emerald-300">T</span>; <span className="text-violet-300">latencyMs</span>: <span className="text-orange-300">number</span>{' '}{'}'}{'\n'}
          {'  '}| {'{'}{' '}<span className="text-violet-300">success</span>: <span className="text-rose-400">false</span>; <span className="text-violet-300">error</span>: {'{'}{' '}<span className="text-violet-300">code</span>: <span className="text-orange-300">string</span>; <span className="text-violet-300">message</span>: <span className="text-orange-300">string</span>{' '}{'}'}{' '}{'}'};
        </code>
      </pre>
    </div>
  );
}
```

---

## 4. ⚡ Craft-Grade Hero with Live Product Preview

A typography-led Hero section with real product copy, command trigger pills, and an embedded interactive component.

```tsx
import React from 'react';
import { ActivityTable } from './ActivityTable';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';

export function CraftHeroSection() {
  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white text-center">
      {/* Subtle top edge line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Release Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 mb-8 hover:border-zinc-700 transition-colors">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>v2.4 Engine: /debug, /design & /push</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] mb-6 text-zinc-100">
          Precision engineering for <br className="hidden sm:inline" />
          modern digital products.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed font-normal">
          An opinionated AI pair-programming skill that enforces zero-red-line type safety, mathematical design tokens, and atomic Git delivery.
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-16">
          <a
            href="#quickstart"
            className="w-full sm:w-auto h-11 px-6 rounded-xl font-medium text-xs bg-zinc-100 text-zinc-950 hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <div className="h-11 px-4 rounded-xl font-mono text-xs bg-zinc-900/90 border border-zinc-800 text-zinc-400 flex items-center gap-2 select-all">
            <span className="text-zinc-500">$</span>
            <span>git clone Antigravityskill</span>
          </div>
        </div>

        {/* Embedded Live Product Preview (Not a fake screenshot) */}
        <div className="w-full max-w-3xl">
          <ActivityTable />
        </div>
      </div>
    </section>
  );
}
```

---

## 5. 🍱 High-Taste Modular Bento Grid

High data density layout with real metrics, interactive toggle states, and zero generic marketing blobs.

```tsx
import React, { useState } from 'react';
import { Bug, Sparkles, GitBranch, Cpu, ShieldCheck, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HighTasteBentoGrid() {
  const [toggleActive, setToggleActive] = useState(true);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">System Architecture</h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">Autonomous workflows operating within deterministic boundaries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: 5-Phase Debugger */}
          <div className="md:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3">
                <Bug className="h-4 w-4" />
                <span>/debug Diagnostic Engine</span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">5-Phase Root Cause Isolation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-lg">
                Executes compiler scans (`tsc`, `mypy`, `cargo check`), isolates boundary mismatches, and applies minimal surgical fixes with 0 red lines.
              </p>
            </div>
            <div className="mt-6 p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-400 flex items-center justify-between">
              <span className="text-zinc-500">$ check --strict-null-checks</span>
              <span className="text-emerald-400">0 errors across 48 files</span>
            </div>
          </div>

          {/* Card 2: Adaptive Brand Ingestion */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-3">
                <Sparkles className="h-4 w-4" />
                <span>/design Token Ingest</span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">Brand Adaptation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Extracts existing SVGs, brand colors, and typography to generate accessible dark mode companion tokens.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">WCAG AA Mode</span>
              <button
                onClick={() => setToggleActive(!toggleActive)}
                className={cn("w-10 h-6 rounded-full p-1 transition-colors", toggleActive ? "bg-sky-500" : "bg-zinc-800")}
              >
                <div className={cn("h-4 w-4 rounded-full bg-white transition-transform", toggleActive ? "translate-x-4" : "translate-x-0")} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 6. 💳 Interactive Pricing Comparison Matrix

```tsx
import React, { useState } from 'react';
import { Check } from 'lucide-react';

export function CraftPricingMatrix() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-3">Transparent, Predictable Tiers</h2>
        <p className="text-xs text-zinc-400 font-mono mb-8">No hidden usage surcharges or synthetic token limits</p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium mb-12">
          <button onClick={() => setIsAnnual(false)} className={`px-3 py-1.5 rounded-lg transition-colors ${!isAnnual ? "bg-zinc-800 text-white" : "text-zinc-400"}`}>
            Monthly Billing
          </button>
          <button onClick={() => setIsAnnual(true)} className={`px-3 py-1.5 rounded-lg transition-colors ${isAnnual ? "bg-zinc-800 text-white" : "text-zinc-400"}`}>
            Annual (Save 20%)
          </button>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Free / Community */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Open Source</h3>
              <p className="text-xs text-zinc-400 mb-6">For individual engineers and community developers.</p>
              <div className="text-3xl font-bold font-mono mb-6">$0 <span className="text-xs text-zinc-500 font-normal">/forever</span></div>
              <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                {['Full /debug, /design & /push suites', 'Polyglot TypeScript, Python, Go, Rust', 'MIT License'].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> {f}</li>
                ))}
              </ul>
            </div>
            <button className="w-full h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium transition-colors">
              Clone Repository
            </button>
          </div>

          {/* Pro / Organization */}
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-8 flex flex-col justify-between relative shadow-xl">
            <span className="absolute top-4 right-4 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-950 font-bold uppercase">
              Recommended
            </span>
            <div>
              <h3 className="text-lg font-semibold mb-1">Enterprise Team</h3>
              <p className="text-xs text-zinc-400 mb-6">Custom organization rules and dedicated MCP runners.</p>
              <div className="text-3xl font-bold font-mono mb-6">${isAnnual ? 79 : 99} <span className="text-xs text-zinc-500 font-normal">/seat/mo</span></div>
              <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                {['Custom organization guardrails', 'Dedicated MCP tool connectors', 'Automated CI/CD Quality Gates', '24/7 Priority SLA'].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> {f}</li>
                ))}
              </ul>
            </div>
            <button className="w-full h-10 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors">
              Contact Organization Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 7. ⚓ Subdued Minimalist Footer

```tsx
import React from 'react';
import { Github } from 'lucide-react';

export function MinimalFooter() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-zinc-200 font-sans font-semibold text-sm">
          <span>⚡ Antigravity Skill</span>
        </div>
        <p className="text-zinc-500">© 2026 MIT License. Built for deterministic agentic pair programming.</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/s5condlast-cmd/Antigravityskill" className="hover:text-zinc-200 transition-colors flex items-center gap-1.5">
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
```

---

## 8. ❓ Containerless Clean FAQ (Whitespace & Hairline Dividers)

A clean, borderless FAQ section using hairline `divide-y` dividers and whitespace instead of boxed card containers.

```tsx
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  { q: "How does /design adapt to my existing brand colors?", a: "The /design engine audits your existing CSS variables, Tailwind tokens, and SVG assets, mapping your brand colors to accessible semantic tokens with zero breaking changes." },
  { q: "When does the skill choose containerless layouts over boxes?", a: "The Container Determination Engine reserves boxed surfaces for dense tables, modals, and code blocks, while rendering content blocks, FAQs, and headers containerless to maximize readability and breathing room." },
  { q: "How does the skill prevent horizontal scrolling?", a: "All root containers enforce overflow-x-clip, replace raw w-screen with w-full, and avoid uncontained negative margins." },
];

export function ContainerlessFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto text-left">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">Frequently Answered Details</h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">Core architectural decisions and design standards</p>
        </div>

        {/* Clean divide-y without individual card boxes */}
        <div className="divide-y divide-zinc-800/80 border-y border-zinc-800/80">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.q} className="py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                    {faq.q}
                  </span>
                  <span className="ml-4 text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs text-zinc-400 leading-relaxed max-w-2xl animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```
