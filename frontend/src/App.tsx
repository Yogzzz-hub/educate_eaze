import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { CollegesPage } from './pages/CollegesPage';
import { StudentsPage } from './pages/StudentsPage';
import { SubmissionsPage } from './pages/SubmissionsPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { IntelligencePage } from './pages/IntelligencePage';
import { InsightsPage } from './pages/InsightsPage';
import { GrievancesPage } from './pages/GrievancesPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ReportsPage } from './pages/ReportsPage';
import type { AuthUser, Role } from './types';

const queryClient = new QueryClient();

const roleLabels: Record<Role, string> = {
  super_admin: 'Super Admin',
  university_admin: 'University Admin',
  college_staff: 'College Staff',
  student: 'Student',
};

function App() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('academic-user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('academic-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('academic-user');
    }
  }, [user]);

  const role = user?.role as Role | undefined;
  const roleTitle = role ? roleLabels[role] : 'Guest';

  const routes = useMemo(() => {
    if (!user) {
      return (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      );
    }

    return (
      <Layout user={user} roleTitle={roleTitle} onLogout={() => setUser(null)}>
        <Routes>
          <Route path="/" element={<DashboardPage role={role!} />} />
          <Route path="/dashboard" element={<DashboardPage role={role!} />} />
          <Route path="/colleges" element={<CollegesPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
          <Route path="/workflow" element={<WorkflowPage />} />
          <Route path="/intelligence" element={<IntelligencePage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/grievances" element={<GrievancesPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    );
  }, [role, roleTitle, user]);

  return <QueryClientProvider client={queryClient}>{<BrowserRouter>{routes}</BrowserRouter>}</QueryClientProvider>;
}

export default App;
