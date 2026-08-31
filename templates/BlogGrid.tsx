import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ArticleItem {
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  imageUrl: string;
  href?: string;
}

const DEFAULT_ARTICLES: ArticleItem[] = [
  { title: "Eradicating AI Slop in Modern Web Applications", category: "Design Architecture", readTime: "4 min read", excerpt: "Why generic neon gradients fail user trust, and how Linear-style craftsmanship wins.", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" },
  { title: "The 80/15/5 Color Rule for Minimalist Interfaces", category: "Color Theory", readTime: "6 min read", excerpt: "Confining vibrant brand tokens to 4 intentional spots to eliminate eye fatigue.", imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" },
  { title: "Boundary Hardening with Discriminated Unions", category: "TypeScript Safety", readTime: "5 min read", excerpt: "Eliminating compiler red lines and undefined states with zero-defect domain models.", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
];

export function BlogGrid({
  tagline = "Engineering Journal",
  headline = "Latest Insights & Dispatches",
  articles = DEFAULT_ARTICLES,
}: {
  tagline?: string;
  headline?: string;
  articles?: ArticleItem[];
}) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">{tagline}</span>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mt-2">{headline}</h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 mt-2 sm:mt-0">Updated weekly</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article key={art.title} className="group flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 hover:border-zinc-700 transition-all">
              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-zinc-950">
                <img src={art.imageUrl} alt={art.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                <span>{art.category}</span>
                <span>{art.readTime}</span>
              </div>
              <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white mb-2 leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-grow">
                {art.excerpt}
              </p>
              <a href={art.href || "#"} className="inline-flex items-center gap-1 text-xs font-medium text-zinc-200 group-hover:text-white mt-auto">
                <span>Read Article</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
