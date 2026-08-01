import { useQuery } from '@tanstack/react-query';
import { getIntelligence } from '../services/api';

export function IntelligencePage() {
  const { data, isLoading, error } = useQuery({ queryKey: ['intelligence'], queryFn: getIntelligence });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Process intelligence</p>
        <h2 className="text-2xl font-semibold">Operational analytics and bottlenecks</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {isLoading ? <div className="h-24 animate-pulse rounded-2xl bg-slate-800" /> : null}
        {error ? <div className="text-rose-400">Unable to load intelligence metrics.</div> : null}
        {!isLoading && data?.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold">{item.value}</p>
            <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
