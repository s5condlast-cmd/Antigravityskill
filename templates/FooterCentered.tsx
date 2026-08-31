import React from 'react';
import { Github } from 'lucide-react';

export function FooterCentered({
  brandName = "⚡ Antigravity Skill",
  githubUrl = "https://github.com/s5condlast-cmd/Antigravityskill",
}: {
  brandName?: string;
  githubUrl?: string;
}) {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-500 py-12 px-4 sm:px-6 lg:px-8 text-xs text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 font-mono text-[11px]">
        <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
          <span>{brandName}</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-zinc-400">
          <a href="#protocols" className="hover:text-zinc-200 transition-colors">Protocols</a>
          <a href="#components" className="hover:text-zinc-200 transition-colors">Components</a>
          <a href="#pricing" className="hover:text-zinc-200 transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-zinc-200 transition-colors">Docs</a>
        </nav>
        <div className="pt-4 border-t border-zinc-800/60 w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-500">
          <span>© 2026 {brandName}. MIT License.</span>
          <a href={githubUrl} className="hover:text-zinc-300 transition-colors flex items-center gap-1">
            <Github className="h-3.5 w-3.5" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
