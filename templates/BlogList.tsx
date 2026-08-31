import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PostItem {
  date: string;
  title: string;
  category: string;
  href?: string;
}

const DEFAULT_POSTS: PostItem[] = [
  { date: "Oct 12, 2026", title: "Automated Secret Auditing in Pre-Flight Git Staging", category: "DevOps & Security" },
  { date: "Sep 28, 2026", title: "Container Determination: When Whitespace Outperforms Card Boxes", category: "UX Architecture" },
  { date: "Sep 14, 2026", title: "Zero-Horizontal-Overflow: Viewport Containment Strategies", category: "Frontend" },
];

export function BlogList({
  headline = "Changelog & Technical Releases",
  subtitle = "Continuous product enhancements and engineering updates.",
  posts = DEFAULT_POSTS,
}: {
  headline?: string;
  subtitle?: string;
  posts?: PostItem[];
}) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">{headline}</h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">{subtitle}</p>
        </div>

        {/* Clean Containerless divide-y */}
        <div className="divide-y divide-zinc-800/80 border-y border-zinc-800/80">
          {posts.map((post) => (
            <a key={post.title} href={post.href || "#"} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group block">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="text-xs font-mono text-zinc-500 shrink-0">{post.date}</span>
                <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{post.title}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 shrink-0">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px]">{post.category}</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
