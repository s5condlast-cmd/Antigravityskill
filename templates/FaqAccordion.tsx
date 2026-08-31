import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "How does /design adapt to my existing brand colors?",
    a: "The /design engine audits your existing CSS variables, Tailwind tokens, and SVG assets, mapping your brand colors to accessible semantic tokens with zero breaking changes.",
  },
  {
    q: "When does the skill choose containerless layouts over boxes?",
    a: "The Container Determination Engine reserves boxed surfaces for dense tables, modals, and code blocks, while rendering content blocks, FAQs, and headers containerless to maximize readability and breathing room.",
  },
  {
    q: "How does the skill prevent horizontal scrolling?",
    a: "All root containers enforce overflow-x-clip, replace raw w-screen with w-full, and avoid uncontained negative margins.",
  },
];

export function FaqAccordion({
  headline = "Frequently Answered Details",
  subtitle = "Core architectural decisions and design standards",
  faqs = DEFAULT_FAQS,
}: {
  headline?: string;
  subtitle?: string;
  faqs?: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto text-left">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">{headline}</h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">{subtitle}</p>
        </div>

        {/* Clean divide-y without individual card boxes */}
        <div className="divide-y divide-zinc-800/80 border-y border-zinc-800/80">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.q} className="py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left group focus:outline-none"
                >
                  <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                    {faq.q}
                  </span>
                  <span className="ml-4 text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs text-zinc-400 leading-relaxed max-w-2xl animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
