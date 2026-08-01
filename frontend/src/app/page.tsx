import Link from 'next/link';

const highlights = [
  'Supabase-backed auth and storage',
  'University and student workflow views',
  'Docker-ready local development stack',
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-2xl">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">EduEase</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">A modern academic operations platform for universities and colleges.</h1>
          <p className="max-w-3xl text-lg text-slate-300">
            Manage students, faculty, subjects, exams, and institutional data from one polished experience powered by Next.js, Tailwind, shadcn-inspired UI, and Supabase.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-800 bg-slate-800/70 p-5">
              <h2 className="font-medium">{item}</h2>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/api/health" className="rounded-full bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400">
            View API health
          </Link>
          <a href="http://localhost:8000/docs" className="rounded-full border border-slate-700 px-4 py-2 font-medium text-slate-200 transition hover:bg-slate-800">
            Open backend docs
          </a>
        </div>
      </div>
    </main>
  );
}
