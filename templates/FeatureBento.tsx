import React from 'react';
import { Cpu, ShieldCheck, GitCommit } from 'lucide-react';

interface FeatureBentoProps {
  tagline?: string;
  headline?: string;
}

export function FeatureBento({
  tagline = "Core Architecture",
  headline = "Engineered for deterministic speed and visual restraint.",
}: FeatureBentoProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">{tagline}</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mt-2 leading-tight">
            {headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: 7 cols */}
          <div className="md:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 flex flex-col justify-between hover:border-zinc-700 transition-all">
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
          <div className="md:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 flex flex-col justify-between hover:border-zinc-700 transition-all">
            <div>
              <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">WCAG 2.1 AA Compliance</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Automated contrast ratios ≥ 4.5:1, visible focus rings, and screen-reader accessibility semantics baked into every component.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-zinc-800/80 font-mono text-[11px] text-zinc-500 flex items-center justify-between">
              <span>Accessibility Rating</span>
              <span className="text-emerald-400 font-semibold">100 / 100</span>
            </div>
          </div>

          {/* Card 3: 12 cols */}
          <div className="md:col-span-12 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                <GitCommit className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-100">Atomic Conventional Git Delivery</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Pre-flight secret scanning prevents .env leaks before remote push.</p>
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
