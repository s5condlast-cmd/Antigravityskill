import React from 'react';
import { Check, Minus } from 'lucide-react';

interface FeatureRow {
  name: string;
  free: boolean;
  pro: boolean;
  enterprise: boolean;
}

const COMPARISON: FeatureRow[] = [
  { name: "5-Phase Diagnostic Diagnostics (/debug)", free: true, pro: true, enterprise: true },
  { name: "Pristine UI Design System (/design)", free: true, pro: true, enterprise: true },
  { name: "Pre-Flight Secret Auditing (/push)", free: true, pro: true, enterprise: true },
  { name: "Custom Organization Rules & Policy Engine", free: false, pro: true, enterprise: true },
  { name: "Dedicated Remote MCP Runners & Sidecars", free: false, pro: true, enterprise: true },
  { name: "24/7 Dedicated Staff SLA & Enterprise SSO", free: false, false: false, enterprise: true },
];

export function PricingTable() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">Feature Breakdown</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">Transparent comparison across all capability tiers.</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/90 text-zinc-300 font-mono text-[11px]">
                  <th className="p-4 sm:p-6 font-semibold">Capabilities</th>
                  <th className="p-4 sm:p-6 text-center font-semibold">Community</th>
                  <th className="p-4 sm:p-6 text-center font-semibold text-zinc-100">Pro Team</th>
                  <th className="p-4 sm:p-6 text-center font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {COMPARISON.map((row) => (
                  <tr key={row.name} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 sm:p-6 font-medium text-zinc-200">{row.name}</td>
                    <td className="p-4 sm:p-6 text-center">
                      {row.free ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <Minus className="h-4 w-4 text-zinc-600 mx-auto" />}
                    </td>
                    <td className="p-4 sm:p-6 text-center">
                      {row.pro ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <Minus className="h-4 w-4 text-zinc-600 mx-auto" />}
                    </td>
                    <td className="p-4 sm:p-6 text-center">
                      {row.enterprise ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <Minus className="h-4 w-4 text-zinc-600 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
