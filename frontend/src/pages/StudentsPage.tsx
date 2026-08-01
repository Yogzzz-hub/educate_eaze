import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStudent, getStudents } from '../services/api';

const schema = z.object({
  name: z.string().min(2),
  college: z.string().min(2),
  email: z.string().email(),
  status: z.enum(['Enrolled', 'Pending', 'Flagged']),
  progress: z.coerce.number().min(0).max(100),
});

type FormValues = z.infer<typeof schema>;

export function StudentsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const { data, isLoading, error } = useQuery({ queryKey: ['students'], queryFn: () => getStudents() });
  const mutation = useMutation({ mutationFn: createStudent, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }) });
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    await mutation.mutateAsync(values);
    reset();
  }

  const filteredStudents = useMemo(() => {
    if (!data?.items) return [];
    return data.items.filter((student) => {
      const matchesSearch = `${student.name} ${student.college}`.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'All' || student.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [data?.items, search, status]);

  const pagedStudents = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, page]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Student management</p>
        <h2 className="text-2xl font-semibold">Enrollment and progress tracking</h2>
      </div>
      <form className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-800/70 p-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-2 block text-sm">Name</label>
          <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" {...register('name')} />
          {errors.name ? <p className="mt-1 text-xs text-rose-400">{errors.name.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm">College</label>
          <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" {...register('college')} />
          {errors.college ? <p className="mt-1 text-xs text-rose-400">{errors.college.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm">Email</label>
          <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" {...register('email')} />
          {errors.email ? <p className="mt-1 text-xs text-rose-400">{errors.email.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm">Status</label>
          <select className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" {...register('status')}>
            <option value="Enrolled">Enrolled</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
          </select>
          {errors.status ? <p className="mt-1 text-xs text-rose-400">{errors.status.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm">Progress (%)</label>
          <input type="number" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" {...register('progress')} />
          {errors.progress ? <p className="mt-1 text-xs text-rose-400">{errors.progress.message}</p> : null}
        </div>
        <div className="flex items-end">
          <button className="w-full rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950" disabled={isSubmitting}>Add student</button>
        </div>
      </form>
      <div className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" placeholder="Search students" />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
            <option value="All">All status</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? <div className="h-24 animate-pulse rounded-2xl bg-slate-800" /> : null}
          {error ? <div className="text-rose-400">Unable to load students.</div> : null}
          {!isLoading && pagedStudents.map((student) => (
          <div key={student.id} className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{student.name}</h3>
              <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">{student.status}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{student.college}</p>
            <p className="mt-2 text-sm">{student.email}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">
              <div className="h-full rounded-full bg-cyan-400" style={{ width: `${student.progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-400">{student.progress}% complete</p>
          </div>
          ))}
        </div>
        {!isLoading && filteredStudents.length > 0 ? (
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
