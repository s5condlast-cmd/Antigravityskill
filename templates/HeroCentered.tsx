import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface HeroCenteredProps {
  badgeText?: string;
  titleLead?: string;
  titleAccent?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  commandSnippet?: string;
  previewSlot?: React.ReactNode;
}

export function HeroCentered({
  badgeText = "v1.0 Release: Ready for Production",
  titleLead = "Precision engineering with",
  titleAccent = "deterministic quality.",
  subtitle = "High-performance application architecture with strict types, mathematical design systems, and fluid animations.",
  primaryCtaText = "Get Started",
  primaryCtaHref = "#get-started",
  commandSnippet = "npm install your-package",
  previewSlot,
}: HeroCenteredProps) {
  return (
    <section className="relative overflow-x-clip py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white text-center">
      {/* Top Ambient Radial Light Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Status Badge */}
        {badgeText && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{badgeText}</span>
          </div>
        )}

        {/* Primary Headline with Inverse Tracking & Leading */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.035em] leading-[1.08] mb-6 text-zinc-100">
          {titleLead}{' '}
          {titleAccent && (
            <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              {titleAccent}
            </span>
          )}
        </h1>

        {/* Subtitle with 45-75 char measure */}
        {subtitle && (
          <p className="text-base sm:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed font-normal">
            {subtitle}
          </p>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-16">
          <a
            href={primaryCtaHref}
            className="w-full sm:w-auto h-11 px-6 rounded-xl font-medium text-xs bg-zinc-100 text-zinc-950 hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          {commandSnippet && (
            <div className="h-11 px-4 rounded-xl font-mono text-xs bg-zinc-900/90 border border-zinc-800 text-zinc-400 flex items-center gap-2 select-all">
              <span className="text-zinc-500">$</span>
              <span>{commandSnippet}</span>
            </div>
          )}
        </div>

        {/* Optional Embedded Live Preview Slot */}
        {previewSlot && (
          <div className="w-full max-w-2xl">
            {previewSlot}
          </div>
        )}
      </div>
    </section>
  );
}
