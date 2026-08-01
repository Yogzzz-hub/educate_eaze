import { useQuery } from '@tanstack/react-query';
import { getReports } from '../services/api';

export function ReportsPage() {
  const { data, isLoading, error } = useQuery({ queryKey: ['reports'], queryFn: getReports });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Reports</p>
        <h2 className="text-2xl font-semibold">Export-ready summaries and reports</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {isLoading ? <div className="h-24 animate-pulse rounded-2xl bg-slate-800" /> : null}
        {error ? <div className="text-rose-400">Unable to load reports.</div> : null}
        {!isLoading && data?.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
            <h3 className="font-medium">{item.name}</h3>
            <p className="mt-2 text-sm text-slate-400">Owner: {item.owner}</p>
            <p className="mt-2 text-sm">Updated {item.updatedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
