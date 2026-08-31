import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface HeroSplitProps {
  tagline?: string;
  headlineLead?: string;
  headlineAccent?: string;
  description?: string;
  imageUrl?: string;
  onSubmitEmail?: (email: string) => void;
}

export function HeroSplit({
  tagline = "Universal Pair-Programming Engine",
  headlineLead = "Elevate your frontend to",
  headlineAccent = "pure craftsmanship.",
  description = "Stop generating AI slop. Build high-density SaaS applications with mathematical typography scales and WCAG 2.1 AA compliance.",
  imageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  onSubmitEmail,
}: HeroSplitProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    if (onSubmitEmail) onSubmitEmail(email);
    setSubmitted(true);
  }

  return (
    <section className="relative overflow-x-clip py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">{tagline}</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100 leading-[1.12]">
            {headlineLead}{' '}
            <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              {headlineAccent}
            </span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg">
            {description}
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <Check className="h-4 w-4" />
              <span>Access invite dispatched to {email}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 flex-grow"
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <span>Request Access</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column Preview */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[16/10] w-full rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl">
            <img
              src={imageUrl}
              alt="System Architecture Interface"
              className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
