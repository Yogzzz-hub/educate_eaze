type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">{eyebrow}</p>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      </div>
      {children}
    </div>
  );
}
