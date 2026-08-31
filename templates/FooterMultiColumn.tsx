import React from 'react';
import { Github } from 'lucide-react';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterMultiColumnProps {
  logo?: React.ReactNode;
  brandName?: string;
  tagline?: string;
  columns?: FooterColumn[];
  githubUrl?: string;
  copyrightText?: string;
  newsletterTitle?: string;
  newsletterSubtitle?: string;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Architecture", href: "#architecture" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "Component Library", href: "#components" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
];

export function FooterMultiColumn({
  logo,
  brandName,
  tagline = "Deterministic applications built with clean architecture, strict types, and mathematical design systems.",
  columns = DEFAULT_COLUMNS,
  githubUrl,
  copyrightText,
  newsletterTitle = "Newsletter",
  newsletterSubtitle = "Get notified when new features or releases land.",
}: FooterMultiColumnProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 py-16 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-zinc-100 font-semibold text-sm">
            {logo}
            {brandName && <span>{brandName}</span>}
          </div>
          {tagline && (
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              {tagline}
            </p>
          )}
        </div>

        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2 space-y-3">
            <h4 className="font-mono text-zinc-200 uppercase tracking-wider text-[11px]">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-zinc-200 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-4 space-y-3">
          <h4 className="font-mono text-zinc-200 uppercase tracking-wider text-[11px]">{newsletterTitle}</h4>
          <p className="text-zinc-500 text-[11px]">{newsletterSubtitle}</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="you@company.com"
              className="h-9 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 flex-grow"
            />
            <button className="h-9 px-3.5 rounded-lg bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-white active:scale-[0.98] transition-all shrink-0">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
        <div>{copyrightText || `© ${currentYear} ${brandName || 'Application'}. All rights reserved.`}</div>
        {githubUrl && (
          <div className="flex items-center gap-4">
            <a href={githubUrl} className="hover:text-zinc-300 transition-colors flex items-center gap-1">
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
