import React from 'react';

interface HeaderCenteredProps {
  brandName?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function HeaderCentered({
  brandName = "⚡ Antigravity",
  ctaText = "Get Started",
  ctaHref = "#get-started",
}: HeaderCenteredProps) {
  return (
    <header className="w-full border-b border-zinc-800/80 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-400 font-medium w-1/3">
          <a href="#protocols" className="hover:text-zinc-200 transition-colors">Protocols</a>
          <a href="#architecture" className="hover:text-zinc-200 transition-colors">Architecture</a>
          <a href="#benchmarks" className="hover:text-zinc-200 transition-colors">Benchmarks</a>
        </nav>

        {/* Center Brand */}
        <div className="w-1/3 flex justify-center">
          <a href="#" className="font-bold text-sm tracking-tight text-zinc-100 flex items-center gap-2">
            <span>{brandName}</span>
          </a>
        </div>

        {/* Right Actions */}
        <div className="w-1/3 flex justify-end items-center gap-3">
          <a href="#login" className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block">
            Sign In
          </a>
          <a
            href={ctaHref}
            className="h-9 px-4 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white active:scale-[0.98] transition-all flex items-center"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </header>
  );
}
