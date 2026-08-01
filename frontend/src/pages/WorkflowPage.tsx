import { useQuery } from '@tanstack/react-query';
import { getWorkflow } from '../services/api';

export function WorkflowPage() {
  const { data, isLoading, error } = useQuery({ queryKey: ['workflow'], queryFn: getWorkflow });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Workflow tracking</p>
        <h2 className="text-2xl font-semibold">Operational milestones and owners</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? <div className="h-24 animate-pulse rounded-2xl bg-slate-800" /> : null}
        {error ? <div className="text-rose-400">Unable to load workflow.</div> : null}
        {!isLoading && data?.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{item.step}</h3>
              <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">{item.state}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">Owner: {item.owner}</p>
            <p className="mt-2 text-sm">ETA: {item.eta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
