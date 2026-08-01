import { useQuery } from '@tanstack/react-query';
import { getSubmissions } from '../services/api';

export function SubmissionsPage() {
  const { data, isLoading, error } = useQuery({ queryKey: ['submissions'], queryFn: getSubmissions });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Submissions</p>
        <h2 className="text-2xl font-semibold">Review and resolve pending submissions</h2>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
        {isLoading ? <div className="h-24 animate-pulse rounded-2xl bg-slate-700" /> : null}
        {error ? <div className="text-rose-400">Unable to load submissions.</div> : null}
        {!isLoading && data ? (
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.id} className="flex flex-col justify-between rounded-2xl border border-slate-700 bg-slate-900/70 p-4 md:flex-row md:items-center">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.owner} • {item.college}</p>
                </div>
                <div className="mt-3 flex items-center gap-3 md:mt-0">
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">{item.status}</span>
                  <span className="text-sm text-slate-400">{item.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
