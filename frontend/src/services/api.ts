import axios from 'axios';
import type {
  AuthUser,
  Certificate,
  College,
  DashboardData,
  Grievance,
  InsightItem,
  IntelligenceItem,
  ListResponse,
  NotificationItem,
  ReportItem,
  Student,
  Submission,
  WorkflowItem,
} from '../types';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
});

export async function loginUser(email: string, password: string) {
  const response = await client.post<AuthUser>('/api/auth/login', { email, password });
  return response.data;
}

export async function getDashboardData(role: string) {
  const response = await client.get<DashboardData>(`/api/dashboard/${role}`);
  return response.data;
}

export async function getColleges(page = 1, size = 6) {
  const response = await client.get<ListResponse<College>>('/api/colleges', { params: { page, size } });
  return response.data;
}

export async function createCollege(payload: Omit<College, 'id' | 'submissions'>) {
  const response = await client.post<College>('/api/colleges', payload);
  return response.data;
}

export async function getStudents(page = 1, size = 6) {
  const response = await client.get<ListResponse<Student>>('/api/students', { params: { page, size } });
  return response.data;
}

export async function createStudent(payload: Omit<Student, 'id'>) {
  const response = await client.post<Student>('/api/students', payload);
  return response.data;
}

export async function getSubmissions() {
  const response = await client.get<Submission[]>('/api/submissions');
  return response.data;
}

export async function getWorkflow() {
  const response = await client.get<WorkflowItem[]>('/api/workflow');
  return response.data;
}

export async function getIntelligence() {
  const response = await client.get<IntelligenceItem[]>('/api/intelligence');
  return response.data;
}

export async function getInsights() {
  const response = await client.get<InsightItem[]>('/api/insights');
  return response.data;
}

export async function getGrievances() {
  const response = await client.get<Grievance[]>('/api/grievances');
  return response.data;
}

export async function getCertificates() {
  const response = await client.get<Certificate[]>('/api/certificates');
  return response.data;
}

export async function getNotifications() {
  const response = await client.get<NotificationItem[]>('/api/notifications');
  return response.data;
}

export async function getReports() {
  const response = await client.get<ReportItem[]>('/api/reports');
  return response.data;
}
