import { Link, useLocation } from 'react-router-dom';

const labels: Record<string, string> = {
  dashboard: 'Dashboard',
  colleges: 'Colleges',
  students: 'Students',
  submissions: 'Submissions',
  workflow: 'Workflow',
  intelligence: 'Process Intelligence',
  insights: 'AI Insights',
  grievances: 'Grievances',
  certificates: 'Certificates',
  notifications: 'Notifications',
  reports: 'Reports',
  login: 'Login',
};

export function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
      <Link className="hover:text-cyan-300" to="/dashboard">
        Home
      </Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        const label = labels[segment] ?? segment.replace(/-/g, ' ');
        const isLast = index === segments.length - 1;

        return (
          <span key={path} className="flex items-center gap-2">
            <span>/</span>
            {isLast ? <span className="text-slate-200">{label}</span> : <Link className="hover:text-cyan-300" to={path}>{label}</Link>}
          </span>
        );
      })}
    </nav>
  );
}
