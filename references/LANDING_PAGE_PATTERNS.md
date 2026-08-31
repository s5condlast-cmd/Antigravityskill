# 🎨 Master Landing Page & Product Interface Patterns

Production-ready, accessible, high-density React + Tailwind component patterns. Built to the standards of **Linear, Stripe, Apple, Vercel, and Raycast**—with **100% unified lighting, consistent zinc surface hierarchy, curated Unsplash CDN photography, Lucide icon restraint, and containerless whitespace structure**.

---

## 🌟 The Unified Lighting & Surface Hierarchy Standard

All components across all 13 categories adhere strictly to this mathematical surface ladder:

```text
┌──────────────────────────────┬──────────────────────────────┬──────────────────────────────┐
│ SURFACE LAYER                │ TAILWIND CLASS               │ VISUAL PURPOSE               │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ 1. Canvas Base               │ bg-zinc-950 text-white       │ 80% background canvas        │
│ 2. Ambient Light Aura        │ radial-gradient top-center   │ Subtle < 15% top glow bleed  │
│ 3. Contained Card / Surface  │ bg-zinc-900/60 border-zinc-800│ High-density cards & tables │
│ 4. Hairline Dividers         │ divide-zinc-800/80           │ Clean containerless splits   │
│ 5. Primary Typography        │ text-zinc-100 tracking-tight │ Crisp H1/H2 titles           │
│ 6. Secondary Typography      │ text-zinc-400 leading-relaxed│ Readable body paragraphs     │
│ 7. Monospace Metadata        │ text-zinc-500 font-mono      │ Tabular numbers, IDs, badges │
│ 8. Primary CTA Button        │ bg-zinc-100 text-zinc-950    │ High-contrast active action  │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
```

---

## 📑 Master Pattern Index

1. [Spotlight Command Palette (`⌘K`)](#1-spotlight-command-palette-k)
2. [Navigation Headers & Navbars](#2-navigation-headers--navbars)
3. [Craft-Grade Heroes](#3-craft-grade-heroes)
4. [High-Density Deployment & Activity Table](#4-high-density-deployment--activity-table)
5. [Interactive Code Terminal & Diff Preview](#5-interactive-code-terminal--diff-preview)
6. [Editorial Blogs & Article Showcases](#6-editorial-blogs--article-showcases)
7. [Content & Architectural Sections](#7-content--architectural-sections)
8. [Modular Bento & Feature Grids](#8-modular-bento--feature-grids)
9. [E-Commerce & Product Showcases](#9-e-commerce--product-showcases)
10. [Contact & Feedback Forms](#10-contact--feedback-forms)
11. [Call to Action (CTA) Sections](#11-call-to-action-cta-sections)
12. [Curated Gallery & Media Showcases](#12-curated-gallery--media-showcases)
13. [Statistics & KPI Telemetry Counters](#13-statistics--kpi-telemetry-counters)
14. [Interactive Pricing Matrices](#14-interactive-pricing-matrices)
15. [Containerless Clean FAQ](#15-containerless-clean-faq)
16. [Subdued Footers](#16-subdued-footers)

---

## 1. 🔍 Spotlight Command Palette (`⌘K`)

A functional, keyboard-accessible command bar (Raycast / Linear style) with fuzzy filtering and shortcut badges.

```tsx
import React, { useState, useEffect } from 'react';
import { Search, Terminal, GitBranch, Bug, Sparkles, CornerDownLeft } from 'lucide-react';

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
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered.length, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/90 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-zinc-800">
          <Search className="h-4 w-4 text-zinc-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Type a command or search actions..."
            className="w-full h-12 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800 rounded border border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500 font-mono">No matching commands found.</div>
          ) : (
            filtered.map((cmd, idx) => (
              <button
                key={cmd.id}
                onClick={() => onClose()}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors ${
                  idx === selectedIndex ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {cmd.icon}
                  <span className="font-medium">{cmd.title}</span>
                </div>
                {cmd.shortcut && (
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-950/40 rounded border border-zinc-800">
                    {cmd.shortcut}
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-zinc-800/60 bg-zinc-950/40 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Navigate <kbd className="text-zinc-300">↑</kbd> <kbd className="text-zinc-300">↓</kbd></span>
          <span className="flex items-center gap-1">Select <CornerDownLeft className="h-3 w-3 text-zinc-400" /></span>
        </div>
      </div>
    </div>
  );
}
```

---

## 2. 🧭 Navigation Headers & Navbars

### 2.1 Glassmorphic Sticky Header with Command Trigger
```tsx
import React from 'react';
import { Search } from 'lucide-react';

export function GlassNavbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 text-sm font-semibold text-zinc-100 tracking-tight">
            <span>⚡ Antigravity</span>
          </a>
          <nav className="hidden md:flex items-center gap-5 text-xs text-zinc-400">
            <a href="#features" className="hover:text-zinc-200 transition-colors">Features</a>
            <a href="#benchmarks" className="hover:text-zinc-200 transition-colors">Benchmarks</a>
            <a href="#pricing" className="hover:text-zinc-200 transition-colors">Pricing</a>
            <a href="#docs" className="hover:text-zinc-200 transition-colors">Documentation</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCommand}
            className="h-8 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors flex items-center gap-2"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search commands...</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-950 rounded border border-zinc-800">⌘K</kbd>
          </button>
          <a
            href="https://github.com/s5condlast-cmd/Antigravityskill"
            className="h-8 px-3.5 rounded-lg bg-zinc-100 text-zinc-950 text-xs font-medium hover:bg-white transition-colors flex items-center"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
```

### 2.2 Centered Brand Split Navigation Header
```tsx
import React from 'react';

export function CenteredBrandHeader() {
  return (
    <header className="w-full border-b border-zinc-800/80 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-400 w-1/3">
          <a href="#protocols" className="hover:text-zinc-200 transition-colors">Protocols</a>
          <a href="#architecture" className="hover:text-zinc-200 transition-colors">Architecture</a>
          <a href="#benchmarks" className="hover:text-zinc-200 transition-colors">Benchmarks</a>
        </nav>

        <div className="w-1/3 flex justify-center">
          <a href="#" className="font-bold text-sm tracking-tight text-zinc-100 flex items-center gap-2">
            <span>⚡ Antigravity</span>
          </a>
        </div>

        <div className="w-1/3 flex justify-end items-center gap-3">
          <a href="#login" className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block">
            Sign In
          </a>
          <button className="h-9 px-4 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-medium hover:bg-white transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
```

---

## 3. ⚡ Craft-Grade Heroes

### 3.1 Typography Hero with Ambient Radial Light Aura & Live Product Preview
```tsx
import React from 'react';
import { ActivityTable } from './ActivityTable';
import { ArrowRight } from 'lucide-react';

export function CraftHeroSection() {
  return (
    <section className="relative overflow-x-clip py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white text-center">
      {/* Spot 4: Ambient Canvas Light Bleed */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Status Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>v2.4 Engine: /debug, /design & /push</span>
        </div>

        {/* Primary Headline with Spot 3 Focal Gradient */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.035em] leading-[1.08] mb-6 text-zinc-100">
          Precision engineering with{' '}
          <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            deterministic quality.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed font-normal">
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

        {/* Live Activity Table Preview */}
        <div className="w-full max-w-2xl">
          <ActivityTable />
        </div>
      </div>
    </section>
  );
}
```

### 3.2 Split Product Hero with Quick Email Form & Workspace Image
```tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

export function SplitProductHero() {
  return (
    <section className="relative overflow-x-clip py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">Universal Pair-Programming Engine</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100 leading-[1.12]">
            Elevate your frontend to <span className="text-zinc-400">pure craftsmanship.</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg">
            Stop generating AI slop. Build high-density SaaS applications with mathematical typography scales and WCAG 2.1 AA compliance.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              placeholder="Enter your work email"
              className="h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 flex-grow"
            />
            <button className="h-11 px-6 rounded-xl bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-white transition-colors flex items-center justify-center gap-2 shrink-0">
              <span>Request Access</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[16/10] w-full rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
              alt="System Terminal Environment"
              className="h-full w-full object-cover opacity-85 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 4. 📊 High-Density Deployment & Activity Table

```tsx
import React from 'react';

interface Deployment {
  id: string;
  commit: string;
  branch: string;
  author: { initials: string };
  status: 'ready' | 'building';
  timeAgo: string;
  latencyMs: number;
}

const DEPLOYMENTS: Deployment[] = [
  { id: 'dep_994a', commit: '09c803c feat: implement /push secrets audit', branch: 'main', author: { initials: 'AR' }, status: 'ready', timeAgo: '4m ago', latencyMs: 142 },
  { id: 'dep_881b', commit: '7822cbc feat: adaptive brand ingestion', branch: 'main', author: { initials: 'EV' }, status: 'ready', timeAgo: '2h ago', latencyMs: 168 },
  { id: 'dep_770c', commit: '4194e80 fix: strict type narrowing', branch: 'feature/tokens', author: { initials: 'MK' }, status: 'building', timeAgo: 'just now', latencyMs: 0 },
];

export function ActivityTable() {
  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-2xl">
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-zinc-300">Active Deployments</h3>
        </div>
        <span className="text-[11px] font-mono text-zinc-500 tabular-nums">3 Environments</span>
      </div>

      <div className="divide-y divide-zinc-800/60 overflow-x-auto">
        {DEPLOYMENTS.map((d) => (
          <div key={d.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-zinc-800/40 transition-colors text-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-7 w-7 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-mono font-semibold flex items-center justify-center text-zinc-300 shrink-0">
                {d.author.initials}
              </div>
              <div className="truncate">
                <div className="font-mono text-zinc-200 truncate">{d.commit}</div>
                <div className="text-[11px] text-zinc-500 flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-zinc-400">{d.branch}</span>
                  <span>•</span>
                  <span>{d.timeAgo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 pl-4">
              {d.status === 'ready' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Ready ({d.latencyMs}ms)
                </span>
              )}
              {d.status === 'building' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                  Building
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 5. 💻 Interactive Code Terminal & Diff Preview

```tsx
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CodeTerminalPreview() {
  const [copied, setCopied] = useState(false);
  const code = `export type Result<T, E = Error> =
  | { readonly success: true; readonly data: T; readonly latencyMs: number }
  | { readonly success: false; readonly error: E; readonly code: string };`;

  function copyCode() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl text-left font-mono">
      <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-zinc-700" />
          <div className="h-3 w-3 rounded-full bg-zinc-700" />
          <div className="h-3 w-3 rounded-full bg-zinc-700" />
          <span className="ml-2 text-xs text-zinc-400">types/domain.ts</span>
        </div>
        <button
          onClick={copyCode}
          className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 px-2 py-1 rounded bg-zinc-800/60 border border-zinc-700/60 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <pre className="p-5 text-xs text-zinc-300 overflow-x-auto leading-relaxed">
        <code>
          <span className="text-zinc-500">// Zero-defect boundary parsing & discriminated union</span>{'\n'}
          <span className="text-sky-400">export type</span> <span className="text-amber-300">Result</span>&lt;<span className="text-emerald-300">T</span>, <span className="text-emerald-300">E</span> = <span className="text-violet-300">Error</span>&gt; = {'\n'}
          {'  '}| {'{'}{' '}<span className="text-violet-300">readonly success</span>: <span className="text-emerald-400">true</span>; <span className="text-violet-300">readonly data</span>: <span className="text-emerald-300">T</span>; <span className="text-violet-300">readonly latencyMs</span>: <span className="text-orange-300">number</span>{' '}{'}'}{'\n'}
          {'  '}| {'{'}{' '}<span className="text-violet-300">readonly success</span>: <span className="text-rose-400">false</span>; <span className="text-violet-300">readonly error</span>: <span className="text-emerald-300">E</span>; <span className="text-violet-300">readonly code</span>: <span className="text-orange-300">string</span>{' '}{'}'};
        </code>
      </pre>
    </div>
  );
}
```

---

## 6. 📝 Editorial Blogs & Article Showcases

### 6.1 3-Column Curated Post Cards
```tsx
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ARTICLES = [
  { title: "Eradicating AI Slop in Modern Web Applications", category: "Design Architecture", readTime: "4 min read", excerpt: "Why generic neon gradients fail user trust, and how Linear-style craftsmanship wins.", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" },
  { title: "The 80/15/5 Color Rule for Minimalist Interfaces", category: "Color Theory", readTime: "6 min read", excerpt: "Confining vibrant brand tokens to 4 intentional spots to eliminate eye fatigue.", imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" },
  { title: "Boundary Hardening with Discriminated Unions", category: "TypeScript Safety", readTime: "5 min read", excerpt: "Eliminating compiler red lines and undefined states with zero-defect domain models.", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
];

export function BlogCardGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">Engineering Journal</span>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mt-2">Latest Insights & Dispatches</h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 mt-2 sm:mt-0">Updated weekly</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art) => (
            <article key={art.title} className="group flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 hover:border-zinc-700 transition-all">
              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-zinc-950">
                <img src={art.imageUrl} alt={art.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                <span>{art.category}</span>
                <span>{art.readTime}</span>
              </div>
              <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white mb-2 leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-grow">
                {art.excerpt}
              </p>
              <a href="#" className="inline-flex items-center gap-1 text-xs font-medium text-zinc-200 group-hover:text-white mt-auto">
                <span>Read Article</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 6.2 Containerless Date-Stamped Article List
```tsx
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const POSTS = [
  { date: "Oct 12, 2026", title: "Automated Secret Auditing in Pre-Flight Git Staging", category: "DevOps & Security" },
  { date: "Sep 28, 2026", title: "Container Determination: When Whitespace Outperforms Card Boxes", category: "UX Architecture" },
  { date: "Sep 14, 2026", title: "Zero-Horizontal-Overflow: Viewport Containment Strategies", category: "Frontend" },
];

export function ContainerlessArticleList() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">Changelog & Technical Releases</h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">Continuous product enhancements</p>
        </div>

        <div className="divide-y divide-zinc-800/80 border-y border-zinc-800/80">
          {POSTS.map((post) => (
            <a key={post.title} href="#" className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group block">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="text-xs font-mono text-zinc-500 shrink-0">{post.date}</span>
                <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{post.title}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 shrink-0">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px]">{post.category}</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 7. 📑 Content & Architectural Sections

### 7.1 4-Column Architectural Blocks with Monospace Indexing
```tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const BLOCKS = [
  { index: "01", title: "Diagnostic Ingestion", desc: "Scans project AST and dependencies to prove root cause before touching code." },
  { index: "02", title: "Boundary Hardening", desc: "Parses unvalidated inputs directly into validated domain types." },
  { index: "03", title: "Mathematical Spatial Math", desc: "Strict 8-point spatial ladders with WCAG 2.1 AA contrast compliance." },
  { index: "04", title: "Atomic Remote Sync", desc: "Pre-flight secret scan and conventional commit generation." },
];

export function ArchitecturalContentGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">System Primitives</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mt-2">
            The 4 Foundations of Reliable Engineering
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BLOCKS.map((b) => (
            <div key={b.index} className="border-l border-zinc-800 pl-6 space-y-3">
              <span className="text-xs font-mono text-zinc-500">{b.index}</span>
              <h3 className="text-base font-semibold text-zinc-200">{b.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 8. 🧩 Modular Bento & Feature Grids

```tsx
import React from 'react';
import { ShieldCheck, Cpu, GitCommit } from 'lucide-react';

export function ModernBentoGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">Core Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mt-2">
            Engineered for deterministic speed and visual restraint.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: 7 cols */}
          <div className="md:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6">
                <Cpu className="h-5 w-5 text-sky-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">5-Phase Diagnostic Engine</h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
                Isolates root causes before applying surgical code fixes. Eliminates placeholder stubs, dummy delays, and empty error suppression.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-zinc-800/80 font-mono text-[11px] text-zinc-500 flex items-center justify-between">
              <span>Diagnostic Pass Rate</span>
              <span className="text-emerald-400 font-semibold tabular-nums">99.98%</span>
            </div>
          </div>

          {/* Card 2: 5 cols */}
          <div className="md:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">WCAG 2.1 AA Compliance</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Automated contrast ratios $\ge 4.5:1$, visible focus rings, and screen-reader accessibility semantics baked into every component.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-zinc-800/80 font-mono text-[11px] text-zinc-500 flex items-center justify-between">
              <span>Accessibility Rating</span>
              <span className="text-emerald-400 font-semibold">100 / 100</span>
            </div>
          </div>

          {/* Card 3: 12 cols */}
          <div className="md:col-span-12 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                <GitCommit className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-100">Atomic Conventional Git Delivery</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Pre-flight secret scanning prevents `.env` leaks before remote push.</p>
              </div>
            </div>
            <div className="font-mono text-xs px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 shrink-0">
              git push origin main
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 9. 🛍️ E-Commerce & Product Showcases

```tsx
import React from 'react';

const PRODUCTS = [
  { name: "Monochrome Mechanical Keyboard", category: "Hardware", price: "$149.00", imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80" },
  { name: "Precision CNC Aluminum Stand", category: "Accessories", price: "$68.00", imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80" },
  { name: "Matte Black Studio Headphones", category: "Audio", price: "$299.00", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
  { name: "Minimalist Desk Pad XL", category: "Workspace", price: "$34.00", imageUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=600&q=80" },
];

export function MinimalProductCatalog() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">Selected Hardware</span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mt-2">Engineered Tools & Peripherals</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((prod) => (
            <div key={prod.name} className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3 hover:border-zinc-700 transition-all">
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-zinc-950 mb-4">
                <img src={prod.imageUrl} alt={prod.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="px-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{prod.category}</span>
                <h3 className="text-xs font-semibold text-zinc-200 mt-1 truncate">{prod.name}</h3>
                <div className="mt-2 text-xs font-mono text-zinc-100 font-medium tabular-nums">{prod.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 10. 📬 Contact & Feedback Forms

```tsx
import React, { useState } from 'react';

export function MinimalContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">Direct Inquiries</span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Get in touch with the engineering team.</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Have a custom architecture question or need dedicated enterprise pairing? Send us a message and we'll reply within 24 hours.
          </p>
          <div className="pt-6 font-mono text-xs text-zinc-400 space-y-2">
            <div>Email: <span className="text-zinc-200">team@antigravity.dev</span></div>
            <div>Location: <span className="text-zinc-200">San Francisco, CA</span></div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-2">
                <div className="text-emerald-400 font-mono text-sm font-semibold">✔ Message Dispatched</div>
                <p className="text-xs text-zinc-400">Thank you for reaching out. We will review your request shortly.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-zinc-400">Full Name</label>
                    <input required type="text" placeholder="Jane Doe" className="w-full h-10 px-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-zinc-400">Work Email</label>
                    <input required type="email" placeholder="jane@company.com" className="w-full h-10 px-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-zinc-400">Project Context / Message</label>
                  <textarea required rows={4} placeholder="Describe your technical requirements..." className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 resize-none" />
                </div>
                <button type="submit" className="w-full h-10 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-colors">
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
```

---

## 11. 🚀 Call to Action (CTA) Sections

```tsx
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function AmbientGlowCta() {
  const [copied, setCopied] = useState(false);
  const cmd = "git clone https://github.com/s5condlast-cmd/Antigravityskill.git";

  return (
    <section className="relative overflow-x-clip py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white text-center">
      <div className="max-w-4xl mx-auto rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-12 relative shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          Ready to build with zero-defect pair programming?
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Clone the repository to unlock the full 3-pillar protocol (/debug, /design, /push) in your workspace.
        </p>

        <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-full overflow-x-auto">
          <span className="font-mono text-xs text-zinc-300 px-3 truncate">{cmd}</span>
          <button
            onClick={() => { navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="h-8 px-3 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-colors flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
```

---

## 12. 🖼️ Curated Gallery & Media Showcases

```tsx
import React from 'react';

const IMAGES = [
  { url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80", title: "Terminal Environment", caption: "Syntax-highlighted diffs" },
  { url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80", title: "Hardware Peripherals", caption: "Low-profile tactile keys" },
  { url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", title: "Telemetry Telemetry", caption: "Real-time metrics" },
];

export function CuratedMediaGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-left">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">Interface Gallery</span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mt-2">Crafted Visual Standards</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IMAGES.map((img) => (
            <div key={img.title} className="group relative rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900 aspect-[4/3]">
              <img src={img.url} alt={img.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="text-sm font-semibold text-zinc-100">{img.title}</h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 13. 📈 Statistics & KPI Telemetry Counters

```tsx
import React from 'react';

const METRICS = [
  { label: "Diagnostic Scans", value: "248.5K", delta: "+18.2%" },
  { label: "Compilation Red Lines", value: "0", delta: "Defect-Free" },
  { label: "Contrast Ratio Standard", value: "≥ 4.5:1", delta: "WCAG AA" },
  { label: "Pre-Flight Secret Leaks", value: "0", delta: "100% Guarded" },
];

export function KpiTelemetryRow() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((m) => (
          <div key={m.label} className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 text-left">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-zinc-100 tabular-nums">
              {m.value}
            </div>
            <div className="text-xs text-zinc-400 mt-1">{m.label}</div>
            <div className="mt-3 inline-flex text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/60 text-emerald-400 border border-zinc-700/50">
              {m.delta}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 14. 💳 Interactive Pricing Matrices

```tsx
import React, { useState } from 'react';
import { Check } from 'lucide-react';

export function PricingMatrix() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Deterministic Pair Programming</h2>
        <p className="text-xs sm:text-sm text-zinc-400 mb-8">Free and open-source under MIT for individuals and teams.</p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-zinc-900 border border-zinc-800 mb-12">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${!isAnnual ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${isAnnual ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Annual (Save 20%)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Free Tier */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Open Source Core</h3>
              <p className="text-xs text-zinc-400 mb-6">Complete pair programming protocols for local developer workspaces.</p>
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

## 15. ❓ Containerless Clean FAQ

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

---

## 16. ⚓ Subdued Footers

```tsx
import React from 'react';
import { Github } from 'lucide-react';

export function ModernFooter() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 py-16 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-zinc-100 font-semibold text-sm">
            <span>⚡ Antigravity Skill</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
            Deterministic AI pair-programming skill for clean architectures, strict types, mathematical design systems, and atomic Git pushes.
          </p>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h4 className="font-mono text-zinc-200 uppercase tracking-wider text-[11px]">Protocols</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-zinc-200 transition-colors">/debug Diagnostics</a></li>
            <li><a href="#" className="hover:text-zinc-200 transition-colors">/design Systems</a></li>
            <li><a href="#" className="hover:text-zinc-200 transition-colors">/push Protocol</a></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h4 className="font-mono text-zinc-200 uppercase tracking-wider text-[11px]">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-zinc-200 transition-colors">Component Library</a></li>
            <li><a href="#" className="hover:text-zinc-200 transition-colors">WCAG AA Guide</a></li>
            <li><a href="#" className="hover:text-zinc-200 transition-colors">UX Heuristics</a></li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-3">
          <h4 className="font-mono text-zinc-200 uppercase tracking-wider text-[11px]">Newsletter</h4>
          <p className="text-zinc-500 text-[11px]">Get notified when new UI components or diagnostic modules land.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="you@company.com" className="h-9 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none flex-grow" />
            <button className="h-9 px-3.5 rounded-lg bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-white transition-colors shrink-0">Join</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
        <div>© 2026 Antigravity Skill. MIT License.</div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/s5condlast-cmd/Antigravityskill" className="hover:text-zinc-300 transition-colors flex items-center gap-1">
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
```
