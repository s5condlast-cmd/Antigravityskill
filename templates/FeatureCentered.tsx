import React from 'react';
import { Terminal, Shield, Sparkles } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  { icon: <Terminal className="h-5 w-5 text-sky-400" />, title: "5-Phase Root-Cause Diagnostics", desc: "Isolates type discrepancies and runtime faults before applying surgical, minimal code edits." },
  { icon: <Sparkles className="h-5 w-5 text-emerald-400" />, title: "Mathematical Design Tokens", desc: "Inverse tracking, inverse leading, 80/15/5 color restraint, and containerless whitespace." },
  { icon: <Shield className="h-5 w-5 text-amber-400" />, title: "Pre-Flight Security Gates", desc: "Automated .env secret auditing and conventional commit structuring for safe atomic syncs." },
];

export function FeatureCentered({
  tagline = "Craftsmanship Standards",
  headline = "Built to eliminate amateur AI artifacts.",
  features = DEFAULT_FEATURES,
}: {
  tagline?: string;
  headline?: string;
  features?: FeatureItem[];
}) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white text-center">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">{tagline}</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mt-2">
            {headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {features.map((feat) => (
            <div key={feat.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{feat.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
