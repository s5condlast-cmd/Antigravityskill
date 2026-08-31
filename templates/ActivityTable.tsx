import React from 'react';

export interface Deployment {
  id: string;
  commit: string;
  branch: string;
  author: { initials: string };
  status: 'ready' | 'building';
  timeAgo: string;
  latencyMs: number;
}

const DEFAULT_DEPLOYMENTS: Deployment[] = [
  { id: 'dep_994a', commit: '09c803c feat: implement /push secrets audit', branch: 'main', author: { initials: 'AR' }, status: 'ready', timeAgo: '4m ago', latencyMs: 142 },
  { id: 'dep_881b', commit: '7822cbc feat: adaptive brand ingestion', branch: 'main', author: { initials: 'EV' }, status: 'ready', timeAgo: '2h ago', latencyMs: 168 },
  { id: 'dep_770c', commit: '4194e80 fix: strict type narrowing', branch: 'feature/tokens', author: { initials: 'MK' }, status: 'building', timeAgo: 'just now', latencyMs: 0 },
];

export function ActivityTable({
  title = "Active Deployments",
  deployments = DEFAULT_DEPLOYMENTS,
}: {
  title?: string;
  deployments?: Deployment[];
}) {
  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-2xl">
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-zinc-300">{title}</h3>
        </div>
        <span className="text-[11px] font-mono text-zinc-500 tabular-nums">{deployments.length} Environments</span>
      </div>

      <div className="divide-y divide-zinc-800/60 overflow-x-auto">
        {deployments.map((d) => (
          <div key={d.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-zinc-800/40 transition-colors text-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-7 w-7 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-mono font-semibold flex items-center justify-center text-zinc-300 shrink-0">
                {d.author.initials}
              </div>
              <div className="truncate">
                <div className="font-mono text-zinc-200 truncate">{d.commit}</div>
                <div className="text-[11px] text-zinc-500 flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-zinc-400">{d.branch}</span>
                  <span>•</span>
                  <span>{d.timeAgo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 pl-4">
              {d.status === 'ready' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Ready ({d.latencyMs}ms)
                </span>
              )}
              {d.status === 'building' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                  Building
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
