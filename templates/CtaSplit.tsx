import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function CtaSplit({
  headline = "Start building deterministic software today.",
  description = "Join thousands of engineers deploying production code with zero red lines and pristine design systems.",
  buttonText = "Request Early Access",
}: {
  headline?: string;
  description?: string;
  buttonText?: string;
}) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">{headline}</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">{description}</p>
        </div>

        <div className="w-full lg:w-auto">
          {submitted ? (
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <Check className="h-4 w-4" />
              <span>We'll be in touch with {email}</span>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                className="h-11 px-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 sm:w-72"
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <span>{buttonText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
