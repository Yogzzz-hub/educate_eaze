"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: "DB" },
  { label: "Affiliated Colleges", href: "/colleges", icon: "CL" },
  { label: "Examinations", href: "/examinations", icon: "EX" },
  { label: "Evaluations", href: "/evaluations", icon: "EV" },
  { label: "Results", href: "/results", icon: "RS" },
  { label: "Certificates", href: "/certificates", icon: "CT" },
  { label: "Grievances", href: "/grievances", icon: "GR" },
];

const universityStatistics = [
  {
    title: "Affiliated Colleges",
    value: "24",
    description: "21 active, 3 under review",
    icon: "CL",
  },
  {
    title: "Total Students",
    value: "18,640",
    description: "Across all affiliated colleges",
    icon: "ST",
  },
  {
    title: "Faculty Members",
    value: "1,420",
    description: "Across 68 departments",
    icon: "FA",
  },
  {
    title: "Pending Approvals",
    value: "17",
    description: "Requires university action",
    icon: "AP",
  },
];

const operationStatistics = [
  {
    label: "Active Examinations",
    value: "8",
  },
  {
    label: "Evaluation Completion",
    value: "76%",
  },
  {
    label: "Results Awaiting Approval",
    value: "6",
  },
  {
    label: "Open Grievances",
    value: "39",
  },
];

const affiliatedColleges = [
  {
    id: 1,
    code: "TNTEU-C001",
    name: "Chennai College of Education",
    location: "Chennai",
    students: 1240,
    faculty: 86,
    evaluationProgress: 82,
    resultStatus: "Pending Approval",
    grievances: 8,
    status: "Active",
  },
  {
    id: 2,
    code: "TNTEU-C002",
    name: "Sri Venkateswara College of Education",
    location: "Kanchipuram",
    students: 980,
    faculty: 64,
    evaluationProgress: 100,
    resultStatus: "Published",
    grievances: 3,
    status: "Active",
  },
  {
    id: 3,
    code: "TNTEU-C003",
    name: "Tamil Nadu Institute of Teacher Education",
    location: "Coimbatore",
    students: 1460,
    faculty: 102,
    evaluationProgress: 65,
    resultStatus: "Evaluation Pending",
    grievances: 14,
    status: "Active",
  },
  {
    id: 4,
    code: "TNTEU-C004",
    name: "Madurai College of Teacher Education",
    location: "Madurai",
    students: 1125,
    faculty: 78,
    evaluationProgress: 91,
    resultStatus: "Ready for Approval",
    grievances: 5,
    status: "Active",
  },
];

const universityActivities = [
  {
    college: "Chennai College of Education",
    action: "Internal marks submitted",
    time: "10 minutes ago",
  },
  {
    college: "Sri Venkateswara College of Education",
    action: "Semester results published",
    time: "35 minutes ago",
  },
  {
    college: "Tamil Nadu Institute of Teacher Education",
    action: "Evaluation deadline extension requested",
    time: "1 hour ago",
  },
  {
    college: "Madurai College of Teacher Education",
    action: "Student grievance escalated",
    time: "2 hours ago",
  },
];

function resultStatusClass(status: string) {
  if (status === "Published") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Ready for Approval") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "Pending Approval") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-red-100 text-red-700";
}

export default function DashboardPage() {
  const router = useRouter();

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [userName, setUserName] = useState("University Administrator");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("eduease_logged_in") === "true" ||
      sessionStorage.getItem("eduease_logged_in") === "true";

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const storedUser = localStorage.getItem("eduease_user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser.name) {
          setUserName(parsedUser.name);
        }
      } catch {
        localStorage.removeItem("eduease_user");
      }
    }

    setIsCheckingLogin(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("eduease_logged_in");
    localStorage.removeItem("eduease_user");
    sessionStorage.removeItem("eduease_logged_in");

    router.push("/login");
  };

  if (isCheckingLogin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading university dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="fixed hidden h-screen w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              E
            </div>

            <div>
              <h1 className="font-bold">EduEase</h1>
              <p className="text-xs text-slate-500">
                TNTEU University Portal
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.href === "/dashboard"
                    ? "flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700"
                    : "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                }
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-bold shadow-sm">
                  {item.icon}
                </span>

                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-100 p-4">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close mobile navigation"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/50"
            />

            <aside className="relative z-10 flex h-full w-72 flex-col bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                    E
                  </div>

                  <div>
                    <strong>EduEase</strong>
                    <p className="text-xs text-slate-500">
                      TNTEU Portal
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  Close
                </button>
              </div>

              <nav className="flex-1 space-y-2 overflow-y-auto p-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={
                      item.href === "/dashboard"
                        ? "flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-semibold text-blue-700"
                        : "flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-600 hover:bg-slate-100"
                    }
                  >
                    <span className="text-xs font-bold">
                      {item.icon}
                    </span>

                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-slate-200 p-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-700"
                >
                  Logout
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main area */}
        <div className="w-full lg:ml-64">
          <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold lg:hidden"
              >
                Menu
              </button>

              <div>
                <h2 className="font-bold text-slate-950">
                  TNTEU Unified Academic Management
                </h2>

                <p className="hidden text-sm text-slate-500 sm:block">
                  Welcome back, {userName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 sm:inline-flex">
                University Level
              </span>

              <button
                type="button"
                className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 sm:block"
              >
                Notifications
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                UA
              </div>
            </div>
          </header>

          <section className="p-5 sm:p-8">
            {/* Page heading */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    University Overview
                  </p>

                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                    Demo Data
                  </span>
                </div>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  TNTEU Administration Dashboard
                </h1>

                <p className="mt-3 max-w-3xl text-slate-600">
                  Monitor affiliated colleges, assessments, evaluations,
                  results, certificates and grievances through one unified
                  platform.
                </p>
              </div>

              <Link
                href="/colleges"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700"
              >
                View Affiliated Colleges
              </Link>
            </div>

            {/* Main statistics */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {universityStatistics.map((stat) => (
                <article
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        {stat.title}
                      </p>

                      <p className="mt-3 text-3xl font-bold">
                        {stat.value}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-700">
                      {stat.icon}
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-500">
                    {stat.description}
                  </p>
                </article>
              ))}
            </div>

            {/* Operational summary */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {operationStatistics.map((item) => (
                <article
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white"
                >
                  <p className="text-sm text-slate-400">
                    {item.label}
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {item.value}
                  </p>
                </article>
              ))}
            </div>

            {/* College-wise monitoring */}
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    College-Wise Academic Monitoring
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Track submissions, evaluations, results and grievances
                    from affiliated colleges.
                  </p>
                </div>

                <Link
                  href="/colleges"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Manage all colleges →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        College
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Students
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Faculty
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Evaluation
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Result Status
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Grievances
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {affiliatedColleges.map((college) => (
                      <tr
                        key={college.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-bold text-slate-900">
                              {college.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {college.code} · {college.location}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                          {college.students.toLocaleString()}
                        </td>

                        <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                          {college.faculty}
                        </td>

                        <td className="px-6 py-5">
                          <div className="w-36">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500">
                                Completed
                              </span>

                              <strong>
                                {college.evaluationProgress}%
                              </strong>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-blue-600"
                                style={{
                                  width: `${college.evaluationProgress}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${resultStatusClass(
                              college.resultStatus,
                            )}`}
                          >
                            {college.resultStatus}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={
                              college.grievances > 10
                                ? "font-bold text-red-600"
                                : "font-semibold text-slate-700"
                            }
                          >
                            {college.grievances}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <Link
                            href="/colleges"
                            className="font-semibold text-blue-600 hover:text-blue-700"
                          >
                            Open College
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Bottom dashboard */}
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                  <h2 className="text-xl font-bold">
                    University Approval Workflow
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Current progress across the academic lifecycle
                  </p>
                </div>

                <div className="mt-7 space-y-6">
                  {[
                    {
                      name: "College Data Submission",
                      progress: 92,
                      status: "22 of 24 colleges submitted",
                    },
                    {
                      name: "Internal Assessment Verification",
                      progress: 84,
                      status: "20 colleges verified",
                    },
                    {
                      name: "Evaluation Completion",
                      progress: 76,
                      status: "18 colleges completed",
                    },
                    {
                      name: "Result Approval",
                      progress: 58,
                      status: "14 colleges approved",
                    },
                  ].map((workflow) => (
                    <div key={workflow.name}>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {workflow.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {workflow.status}
                          </p>
                        </div>

                        <span className="font-bold text-blue-700">
                          {workflow.progress}%
                        </span>
                      </div>

                      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{
                            width: `${workflow.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold">
                  Recent College Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest submissions and updates
                </p>

                <div className="mt-6 space-y-5">
                  {universityActivities.map((activity) => (
                    <article
                      key={`${activity.college}-${activity.action}`}
                      className="flex gap-4"
                    >
                      <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-blue-600" />

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {activity.college}
                        </h3>

                        <p className="mt-1 text-sm text-slate-600">
                          {activity.action}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {activity.time}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            {/* Quick actions */}
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                University Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Continue important university-level operations
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    title: "Review Colleges",
                    description: "Check affiliated college submissions",
                    href: "/colleges",
                  },
                  {
                    title: "Monitor Evaluations",
                    description: "Track college-wise completion",
                    href: "/evaluations",
                  },
                  {
                    title: "Approve Results",
                    description: "Review results waiting for approval",
                    href: "/results",
                  },
                  {
                    title: "Review Grievances",
                    description: "Track unresolved student grievances",
                    href: "/grievances",
                  },
                ].map((action) => (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <p className="font-bold text-slate-900">
                      {action.title}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {action.description}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-blue-600">
                      Continue →
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}