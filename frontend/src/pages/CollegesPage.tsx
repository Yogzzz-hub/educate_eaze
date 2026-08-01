import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCollege, getColleges } from '../services/api';

const schema = z.object({
  name: z.string().min(2),
  city: z.string().min(2),
  status: z.enum(['Active', 'Review', 'Pending']),
});

type FormValues = z.infer<typeof schema>;

export function CollegesPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const { data, isLoading, error } = useQuery({ queryKey: ['colleges'], queryFn: () => getColleges() });
  const mutation = useMutation({ mutationFn: createCollege, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['colleges'] }) });
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    await mutation.mutateAsync(values);
    reset();
  }

  const filteredColleges = useMemo(() => {
    if (!data?.items) return [];
    return data.items.filter((college) => {
      const matchesSearch = `${college.name} ${college.city}`.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'All' || college.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [data?.items, search, status]);

  const pagedColleges = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredColleges.slice(start, start + pageSize);
  }, [filteredColleges, page]);

  const totalPages = Math.max(1, Math.ceil(filteredColleges.length / pageSize));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">College management</p>
        <h2 className="text-2xl font-semibold">Institutions and onboarding</h2>
      </div>
      <form className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-800/70 p-4 md:grid-cols-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-2 block text-sm">Name</label>
          <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" {...register('name')} />
          {errors.name ? <p className="mt-1 text-xs text-rose-400">{errors.name.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm">City</label>
          <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" {...register('city')} />
          {errors.city ? <p className="mt-1 text-xs text-rose-400">{errors.city.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm">Status</label>
          <select className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" {...register('status')}>
            <option value="Active">Active</option>
            <option value="Review">Review</option>
            <option value="Pending">Pending</option>
          </select>
          {errors.status ? <p className="mt-1 text-xs text-rose-400">{errors.status.message}</p> : null}
        </div>
        <div className="md:col-span-3">
          <button className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950" disabled={isSubmitting}>Add college</button>
        </div>
      </form>
      <div className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" placeholder="Search colleges" />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
            <option value="All">All status</option>
            <option value="Active">Active</option>
            <option value="Review">Review</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        {isLoading ? <div className="h-28 animate-pulse rounded-2xl bg-slate-700" /> : null}
        {error ? <div className="text-rose-400">Unable to load colleges.</div> : null}
        {!isLoading && data ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pagedColleges.map((college) => (
              <div key={college.id} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{college.name}</h3>
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">{college.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{college.city}</p>
                <p className="mt-4 text-sm">{college.submissions} submissions in queue</p>
              </div>
            ))}
          </div>
        ) : null}
        {!isLoading && filteredColleges.length > 0 ? (
          <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
            <span>Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button className="rounded-xl border border-slate-700 px-3 py-2 disabled:opacity-50" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
                Previous
              </button>
              <button className="rounded-xl border border-slate-700 px-3 py-2 disabled:opacity-50" disabled={page === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
