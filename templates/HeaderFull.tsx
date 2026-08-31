import React from 'react';
import { Search } from 'lucide-react';

interface HeaderFullProps {
  brandName?: string;
  onOpenCommand?: () => void;
  ctaText?: string;
  ctaHref?: string;
}

export function HeaderFull({
  brandName = "⚡ Antigravity",
  onOpenCommand,
  ctaText = "Get Started",
  ctaHref = "#get-started",
}: HeaderFullProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Nav */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2 text-sm font-bold text-zinc-100 tracking-tight">
            <span>{brandName}</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-400 font-medium">
            <a href="#features" className="hover:text-zinc-200 transition-colors">Features</a>
            <a href="#architecture" className="hover:text-zinc-200 transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-zinc-200 transition-colors">Pricing</a>
            <a href="#changelog" className="hover:text-zinc-200 transition-colors">Changelog</a>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          {onOpenCommand && (
            <button
              onClick={onOpenCommand}
              className="h-8 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors flex items-center gap-2"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-950 rounded border border-zinc-800">⌘K</kbd>
            </button>
          )}
          <a
            href={ctaHref}
            className="h-8 px-3.5 rounded-lg bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white active:scale-[0.98] transition-all flex items-center"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </header>
  );
}
