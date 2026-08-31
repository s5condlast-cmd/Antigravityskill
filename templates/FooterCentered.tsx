import React from 'react';
import { Github } from 'lucide-react';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface FooterCenteredProps {
  logo?: React.ReactNode;
  brandName?: string;
  links?: NavLinkItem[];
  githubUrl?: string;
  copyrightText?: string;
}

const DEFAULT_LINKS: NavLinkItem[] = [
  { label: 'Protocols', href: '#protocols' },
  { label: 'Components', href: '#components' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
];

export function FooterCentered({
  logo,
  brandName,
  links = DEFAULT_LINKS,
  githubUrl,
  copyrightText,
}: FooterCenteredProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-500 py-12 px-4 sm:px-6 lg:px-8 text-xs text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 font-mono text-[11px]">
        <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
          {logo}
          {brandName && <span>{brandName}</span>}
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-zinc-400">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-zinc-200 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="pt-4 border-t border-zinc-800/60 w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-500">
          <span>{copyrightText || `© ${currentYear} ${brandName || 'Application'}. All rights reserved.`}</span>
          {githubUrl && (
            <a href={githubUrl} className="hover:text-zinc-300 transition-colors flex items-center gap-1">
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
