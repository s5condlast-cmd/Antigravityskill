import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  desc: string;
  monthlyPrice: number;
  annualPrice: number;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  ctaHref?: string;
}

const DEFAULT_TIERS: PricingTier[] = [
  {
    name: "Open Source Core",
    desc: "Complete pair programming protocols for local developer workspaces.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: ["Full /debug, /design & /push suites", "Polyglot TypeScript, Python, Go, Rust", "MIT License"],
    ctaText: "Clone Repository",
    ctaHref: "#quickstart",
  },
  {
    name: "Enterprise Team",
    desc: "Custom organization rules, security boundaries, and dedicated MCP runners.",
    monthlyPrice: 99,
    annualPrice: 79,
    isPopular: true,
    features: ["Custom organization guardrails", "Dedicated MCP tool connectors", "Automated CI/CD Quality Gates", "24/7 Priority SLA"],
    ctaText: "Contact Sales",
    ctaHref: "#contact",
  },
];

export function PricingCards({
  headline = "Deterministic Pair Programming",
  subtitle = "Free and open-source under MIT for individuals and teams.",
  tiers = DEFAULT_TIERS,
}: {
  headline?: string;
  subtitle?: string;
  tiers?: PricingTier[];
}) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-zinc-100">{headline}</h2>
        <p className="text-xs sm:text-sm text-zinc-400 mb-8">{subtitle}</p>

        {/* Annual / Monthly Toggle */}
        <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-zinc-900 border border-zinc-800 mb-12">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !isAnnual ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isAnnual ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Annual (Save 20%)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {tiers.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 flex flex-col justify-between relative shadow-xl transition-all ${
                  tier.isPopular
                    ? 'border border-zinc-700 bg-zinc-900/80'
                    : 'border border-zinc-800 bg-zinc-900/40'
                }`}
              >
                {tier.isPopular && (
                  <span className="absolute top-4 right-4 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-950 font-bold uppercase">
                    Recommended
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-1">{tier.name}</h3>
                  <p className="text-xs text-zinc-400 mb-6">{tier.desc}</p>
                  <div className="text-3xl font-bold font-mono text-zinc-100 mb-6 tabular-nums">
                    ${price}{' '}
                    <span className="text-xs text-zinc-500 font-normal">
                      {price === 0 ? '/forever' : '/seat/mo'}
                    </span>
                  </div>
                  <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tier.ctaHref || "#"}
                  className={`w-full h-10 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                    tier.isPopular
                      ? 'bg-zinc-100 hover:bg-white text-zinc-950 active:scale-[0.98]'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  }`}
                >
                  {tier.ctaText}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
