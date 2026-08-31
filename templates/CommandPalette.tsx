import React, { useState, useEffect } from 'react';
import { Search, Terminal, GitBranch, Bug, Sparkles, CornerDownLeft } from 'lucide-react';

export interface CommandItem {
  id: string;
  title: string;
  category: 'Commands' | 'Navigation' | 'Actions';
  shortcut?: string;
  icon: React.ReactNode;
}

const DEFAULT_COMMANDS: CommandItem[] = [
  { id: '1', title: '/debug: Run 5-Phase Diagnostic Scan', category: 'Commands', shortcut: '⌘D', icon: <Bug className="h-4 w-4 text-emerald-400" /> },
  { id: '2', title: '/design: Ingest Brand Tokens', category: 'Commands', shortcut: '⌘G', icon: <Sparkles className="h-4 w-4 text-sky-400" /> },
  { id: '3', title: '/push: Stage & Atomic Sync', category: 'Commands', shortcut: '⌘P', icon: <GitBranch className="h-4 w-4 text-amber-400" /> },
  { id: '4', title: 'Open Diagnostics Console', category: 'Navigation', shortcut: 'G D', icon: <Terminal className="h-4 w-4 text-zinc-400" /> },
];

export function CommandPalette({
  isOpen,
  onClose,
  commands = DEFAULT_COMMANDS,
}: {
  isOpen: boolean;
  onClose: () => void;
  commands?: CommandItem[];
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = commands.filter((cmd) => cmd.title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      }
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered.length, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/90 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-zinc-800">
          <Search className="h-4 w-4 text-zinc-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Type a command or search actions..."
            className="w-full h-12 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800 rounded border border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500 font-mono">No matching commands found.</div>
          ) : (
            filtered.map((cmd, idx) => (
              <button
                key={cmd.id}
                onClick={() => onClose()}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors ${
                  idx === selectedIndex ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {cmd.icon}
                  <span className="font-medium">{cmd.title}</span>
                </div>
                {cmd.shortcut && (
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-950/40 rounded border border-zinc-800">
                    {cmd.shortcut}
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-zinc-800/60 bg-zinc-950/40 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Navigate <kbd className="text-zinc-300">↑</kbd> <kbd className="text-zinc-300">↓</kbd></span>
          <span className="flex items-center gap-1">Select <CornerDownLeft className="h-3 w-3 text-zinc-400" /></span>
        </div>
      </div>
    </div>
  );
}
