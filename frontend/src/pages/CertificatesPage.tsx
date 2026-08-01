import { useQuery } from '@tanstack/react-query';
import { getCertificates } from '../services/api';

export function CertificatesPage() {
  const { data, isLoading, error } = useQuery({ queryKey: ['certificates'], queryFn: getCertificates });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Certificates</p>
        <h2 className="text-2xl font-semibold">Credential issuance and status</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {isLoading ? <div className="h-24 animate-pulse rounded-2xl bg-slate-800" /> : null}
        {error ? <div className="text-rose-400">Unable to load certificates.</div> : null}
        {!isLoading && data?.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{item.student}</h3>
              <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">{item.status}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">{item.program}</p>
            <p className="mt-2 text-sm">Issued: {item.issuedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
