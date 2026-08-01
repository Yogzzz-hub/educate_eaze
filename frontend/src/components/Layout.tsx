import { NavLink, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import type { AuthUser } from '../types';

type LayoutProps = {
  children: React.ReactNode;
  user: AuthUser;
  roleTitle: string;
  onLogout: () => void;
};

const links = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Colleges', to: '/colleges' },
  { label: 'Students', to: '/students' },
  { label: 'Submissions', to: '/submissions' },
  { label: 'Workflow', to: '/workflow' },
  { label: 'Intelligence', to: '/intelligence' },
  { label: 'Insights', to: '/insights' },
  { label: 'Grievances', to: '/grievances' },
  { label: 'Certificates', to: '/certificates' },
  { label: 'Notifications', to: '/notifications' },
  { label: 'Reports', to: '/reports' },
];

export function Layout({ children, user, roleTitle, onLogout }: LayoutProps) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
        <aside className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl lg:w-72">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">EduPulse</p>
            <h1 className="mt-2 text-xl font-semibold">Academic Operations</h1>
            <p className="mt-2 text-sm text-slate-400">{roleTitle}</p>
          </div>
          <nav className="space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block rounded-2xl px-3 py-2 text-sm transition ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-slate-800'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
            <button className="mt-3 rounded-xl border border-slate-700 px-3 py-2 text-sm hover:bg-slate-700" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>
        <main className="flex-1 rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl sm:p-6">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
