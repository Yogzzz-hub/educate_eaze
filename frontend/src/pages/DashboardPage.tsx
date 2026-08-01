import { useQuery } from '@tanstack/react-query';
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { getDashboardData } from '../services/api';
import type { Role } from '../types';

type DashboardPageProps = {
  role: Role;
};

const roleTitleMap: Record<Role, string> = {
  super_admin: 'Super Admin',
  university_admin: 'University Admin',
  college_staff: 'College Staff',
  student: 'Student',
};

export function DashboardPage({ role }: DashboardPageProps) {
  const { data, isLoading, error } = useQuery({ queryKey: ['dashboard', role], queryFn: () => getDashboardData(role) });

  if (isLoading) {
    return <div className="space-y-4"><div className="h-24 animate-pulse rounded-2xl bg-slate-800" /><div className="h-64 animate-pulse rounded-2xl bg-slate-800" /></div>;
  }

  if (error || !data) {
    return <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-300">Unable to load dashboard.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Overview</p>
        <h2 className="text-2xl font-semibold">{roleTitleMap[role]} dashboard</h2>
        <p className="text-sm text-slate-400">Monitor approvals, student outcomes, and operational signals across your institution.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {data.summary.map((metric) => (
          <div key={metric.title} className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
            <p className="text-sm text-slate-400">{metric.title}</p>
            <p className="mt-3 text-2xl font-semibold">{metric.value}</p>
            <p className="mt-2 text-sm text-cyan-300">{metric.change}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr,0.8fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
          <h3 className="font-medium">Throughput trend</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
          <h3 className="font-medium">Workflow queue</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.queue}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="value" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
