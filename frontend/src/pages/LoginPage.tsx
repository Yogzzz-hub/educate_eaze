import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginUser } from '../services/api';
import type { AuthUser } from '../types';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof schema>;

type LoginPageProps = {
  onLogin: (user: AuthUser) => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    const user = await loginUser(values.email, values.password);
    onLogin(user);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Secure access</p>
        <h1 className="mt-3 text-3xl font-semibold">University workflow portal</h1>
        <p className="mt-3 max-w-xl text-slate-300">Sign in to access the role-based academic operations suite for your institution.</p>
        <form className="mt-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block text-sm">Email</label>
            <input className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-3 py-3 text-sm" placeholder="you@university.edu" {...register('email')} />
            {errors.email ? <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-sm">Password</label>
            <input type="password" className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-3 py-3 text-sm" placeholder="Enter password" {...register('password')} />
            {errors.password ? <p className="mt-2 text-sm text-rose-400">{errors.password.message}</p> : null}
          </div>
          <button className="rounded-2xl bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
