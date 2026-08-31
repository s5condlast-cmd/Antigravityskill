import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function TerminalPreview({
  filename = "types/domain.ts",
  codeSnippet = `export type Result<T, E = Error> =
  | { readonly success: true; readonly data: T; readonly latencyMs: number }
  | { readonly success: false; readonly error: E; readonly code: string };`,
}: {
  filename?: string;
  codeSnippet?: string;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl text-left font-mono">
      <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-zinc-700" />
          <div className="h-3 w-3 rounded-full bg-zinc-700" />
          <div className="h-3 w-3 rounded-full bg-zinc-700" />
          <span className="ml-2 text-xs text-zinc-400">{filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 px-2 py-1 rounded bg-zinc-800/60 border border-zinc-700/60 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <pre className="p-5 text-xs text-zinc-300 overflow-x-auto leading-relaxed">
        <code>
          <span className="text-zinc-500">// Zero-defect boundary parsing & discriminated union</span>{'\n'}
          <span className="text-sky-400">export type</span> <span className="text-amber-300">Result</span>&lt;<span className="text-emerald-300">T</span>, <span className="text-emerald-300">E</span> = <span className="text-violet-300">Error</span>&gt; = {'\n'}
          {'  '}| {'{'}{' '}<span className="text-violet-300">readonly success</span>: <span className="text-emerald-400">true</span>; <span className="text-violet-300">readonly data</span>: <span className="text-emerald-300">T</span>; <span className="text-violet-300">readonly latencyMs</span>: <span className="text-orange-300">number</span>{' '}{'}'}{'\n'}
          {'  '}| {'{'}{' '}<span className="text-violet-300">readonly success</span>: <span className="text-rose-400">false</span>; <span className="text-violet-300">readonly error</span>: <span className="text-emerald-300">E</span>; <span className="text-violet-300">readonly code</span>: <span className="text-orange-300">string</span>{' '}{'}'};
        </code>
      </pre>
    </div>
  );
}
