const colleges = [
  'Demo College A',
  'Demo College B',
  'Demo College C',
];

function App() {
  return (
    <div className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">University Academic Platform</p>
        <h1 className="text-4xl font-semibold">Workflow & Process Intelligence</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Coordinate academic operations, automate approvals, and surface institutional insights across a network of colleges.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {colleges.map((college) => (
            <div key={college} className="rounded-xl border border-slate-800 bg-slate-800/70 p-4">
              <h2 className="font-medium">{college}</h2>
              <p className="mt-2 text-sm text-slate-400">Ready for workflow onboarding</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
