import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CtaCenteredProps {
  headline?: string;
  subtitle?: string;
  command?: string;
}

export function CtaCentered({
  headline = "Ready to start building?",
  subtitle = "Integrate our modular component architecture and design tokens into your codebase in seconds.",
  command = "npm install @your-org/core",
}: CtaCenteredProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="relative overflow-x-clip py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white text-center">
      <div className="max-w-4xl mx-auto rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-12 relative shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          {headline}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>

        <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-full overflow-x-auto">
          <span className="font-mono text-xs text-zinc-300 px-3 truncate">{command}</span>
          <button
            onClick={handleCopy}
            className="h-8 px-3 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white active:scale-[0.98] transition-all flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
