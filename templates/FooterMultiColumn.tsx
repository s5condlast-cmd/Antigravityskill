import React from 'react';
import { Github } from 'lucide-react';

export function FooterMultiColumn({
  brandName = "⚡ Antigravity Skill",
  tagline = "Deterministic AI pair-programming skill for clean architectures, strict types, mathematical design systems, and atomic Git pushes.",
  githubUrl = "https://github.com/s5condlast-cmd/Antigravityskill",
}: {
  brandName?: string;
  tagline?: string;
  githubUrl?: string;
}) {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 py-16 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-zinc-100 font-semibold text-sm">
            <span>{brandName}</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
            {tagline}
          </p>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h4 className="font-mono text-zinc-200 uppercase tracking-wider text-[11px]">Protocols</h4>
          <ul className="space-y-2">
            <li><a href="#debug" className="hover:text-zinc-200 transition-colors">/debug Diagnostics</a></li>
            <li><a href="#design" className="hover:text-zinc-200 transition-colors">/design Systems</a></li>
            <li><a href="#push" className="hover:text-zinc-200 transition-colors">/push Protocol</a></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h4 className="font-mono text-zinc-200 uppercase tracking-wider text-[11px]">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#components" className="hover:text-zinc-200 transition-colors">Component Library</a></li>
            <li><a href="#wcag" className="hover:text-zinc-200 transition-colors">WCAG AA Guide</a></li>
            <li><a href="#heuristics" className="hover:text-zinc-200 transition-colors">UX Heuristics</a></li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-3">
          <h4 className="font-mono text-zinc-200 uppercase tracking-wider text-[11px]">Newsletter</h4>
          <p className="text-zinc-500 text-[11px]">Get notified when new UI components or diagnostic modules land.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="you@company.com"
              className="h-9 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 flex-grow"
            />
            <button className="h-9 px-3.5 rounded-lg bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-white active:scale-[0.98] transition-all shrink-0">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
        <div>© 2026 Antigravity Skill. MIT License.</div>
        <div className="flex items-center gap-4">
          <a href={githubUrl} className="hover:text-zinc-300 transition-colors flex items-center gap-1">
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
