export type Role = 'super_admin' | 'university_admin' | 'college_staff' | 'student';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface DashboardData {
  role: Role;
  summary: DashboardMetric[];
  trend: Array<{ month: string; value: number }>;
  queue: Array<{ label: string; value: number }>;
}

export interface College {
  id: number;
  name: string;
  city: string;
  status: 'Active' | 'Review' | 'Pending';
  submissions: number;
}

export interface Student {
  id: number;
  name: string;
  college: string;
  email: string;
  status: 'Enrolled' | 'Pending' | 'Flagged';
  progress: number;
}

export interface Submission {
  id: number;
  title: string;
  owner: string;
  college: string;
  status: 'Approved' | 'In Review' | 'Needs Action';
  updatedAt: string;
}

export interface WorkflowItem {
  id: number;
  step: string;
  owner: string;
  state: 'On Track' | 'At Risk' | 'Completed';
  eta: string;
}

export interface IntelligenceItem {
  id: number;
  label: string;
  value: string;
  detail: string;
}

export interface InsightItem {
  id: number;
  title: string;
  impact: string;
  details: string;
}

export interface Grievance {
  id: number;
  student: string;
  category: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Escalated' | 'Resolved';
}

export interface Certificate {
  id: number;
  student: string;
  program: string;
  issuedAt: string;
  status: 'Issued' | 'Pending';
}

export interface NotificationItem {
  id: number;
  title: string;
  body: string;
  createdAt: string;
}

export interface ReportItem {
  id: number;
  name: string;
  owner: string;
  updatedAt: string;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
}
