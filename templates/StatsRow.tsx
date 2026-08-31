import React from 'react';

interface MetricItem {
  label: string;
  value: string;
  delta: string;
}

const DEFAULT_METRICS: MetricItem[] = [
  { label: "Diagnostic Scans", value: "248.5K", delta: "+18.2%" },
  { label: "Compilation Red Lines", value: "0", delta: "Defect-Free" },
  { label: "Contrast Ratio Standard", value: "≥ 4.5:1", delta: "WCAG AA" },
  { label: "Pre-Flight Secret Leaks", value: "0", delta: "100% Guarded" },
];

export function StatsRow({
  metrics = DEFAULT_METRICS,
}: {
  metrics?: MetricItem[];
}) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 text-left hover:border-zinc-700 transition-all">
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
