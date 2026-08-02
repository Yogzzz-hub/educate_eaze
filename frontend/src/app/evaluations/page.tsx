"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type EvaluationStatus =
  | "Not Started"
  | "In Progress"
  | "Submitted"
  | "Verified"
  | "Overdue";

interface CollegeEvaluation {
  id: number;
  collegeCode: string;
  collegeName: string;
  examination: string;
  studentsRegistered: number;
  studentsEvaluated: number;
  internalSubmission: number;
  externalSubmission: number;
  progress: number;
  verificationStatus: EvaluationStatus;
  deadline: string;
}

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: "DB" },
  { label: "Affiliated Colleges", href: "/colleges", icon: "CL" },
  { label: "Examinations", href: "/examinations", icon: "EX" },
  { label: "Evaluations", href: "/evaluations", icon: "EV" },
  { label: "Results", href: "/results", icon: "RS" },
  { label: "Certificates", href: "/certificates", icon: "CT" },
  { label: "Grievances", href: "/grievances", icon: "GR" },
];

const initialEvaluations: CollegeEvaluation[] = [
  {
    id: 1,
    collegeCode: "TNTEU-C001",
    collegeName: "Chennai College of Education",
    examination: "B.Ed Semester Examination",
    studentsRegistered: 1240,
    studentsEvaluated: 1016,
    internalSubmission: 100,
    externalSubmission: 82,
    progress: 82,
    verificationStatus: "In Progress",
    deadline: "10 Aug 2026",
  },
  {
    id: 2,
    collegeCode: "TNTEU-C002",
    collegeName: "Sri Venkateswara College of Education",
    examination: "B.Ed Semester Examination",
    studentsRegistered: 980,
    studentsEvaluated: 980,
    internalSubmission: 100,
    externalSubmission: 100,
    progress: 100,
    verificationStatus: "Submitted",
    deadline: "10 Aug 2026",
  },
  {
    id: 3,
    collegeCode: "TNTEU-C003",
    collegeName: "Tamil Nadu Institute of Teacher Education",
    examination: "B.Ed Semester Examination",
    studentsRegistered: 1460,
    studentsEvaluated: 949,
    internalSubmission: 90,
    externalSubmission: 65,
    progress: 65,
    verificationStatus: "In Progress",
    deadline: "10 Aug 2026",
  },
  {
    id: 4,
    collegeCode: "TNTEU-C004",
    collegeName: "Madurai College of Teacher Education",
    examination: "M.Ed Semester Examination",
    studentsRegistered: 1125,
    studentsEvaluated: 1024,
    internalSubmission: 100,
    externalSubmission: 91,
    progress: 91,
    verificationStatus: "Submitted",
    deadline: "08 Aug 2026",
  },
  {
    id: 5,
    collegeCode: "TNTEU-C005",
    collegeName: "Salem Institute of Education",
    examination: "B.Ed Semester Examination",
    studentsRegistered: 740,
    studentsEvaluated: 326,
    internalSubmission: 72,
    externalSubmission: 44,
    progress: 44,
    verificationStatus: "Overdue",
    deadline: "01 Aug 2026",
  },
  {
    id: 6,
    collegeCode: "TNTEU-C006",
    collegeName: "Trichy College of Education",
    examination: "M.Ed Semester Examination",
    studentsRegistered: 860,
    studentsEvaluated: 0,
    internalSubmission: 0,
    externalSubmission: 0,
    progress: 0,
    verificationStatus: "Not Started",
    deadline: "12 Aug 2026",
  },
];

const subjectDetails = [
  {
    subject: "Childhood and Growing Up",
    registered: 240,
    evaluated: 240,
    invalidEntries: 0,
    progress: 100,
  },
  {
    subject: "Contemporary India and Education",
    registered: 240,
    evaluated: 216,
    invalidEntries: 3,
    progress: 90,
  },
  {
    subject: "Learning and Teaching",
    registered: 240,
    evaluated: 190,
    invalidEntries: 2,
    progress: 79,
  },
  {
    subject: "Pedagogy of School Subject",
    registered: 240,
    evaluated: 168,
    invalidEntries: 5,
    progress: 70,
  },
];

function statusClass(status: EvaluationStatus) {
  if (status === "Verified") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Submitted") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "In Progress") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "Overdue") {
    return "bg-red-100 text-red-700";
  }

  return "bg-slate-200 text-slate-700";
}

export default function EvaluationsPage() {
  const router = useRouter();

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [evaluations, setEvaluations] =
    useState<CollegeEvaluation[]>(initialEvaluations);

  const [search, setSearch] = useState("");
  const [examFilter, setExamFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedEvaluation, setSelectedEvaluation] =
    useState<CollegeEvaluation | null>(null);

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("eduease_logged_in") === "true" ||
      sessionStorage.getItem("eduease_logged_in") === "true";

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    setIsCheckingLogin(false);
  }, [router]);

  const filteredEvaluations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return evaluations.filter((evaluation) => {
      const matchesSearch =
        evaluation.collegeName.toLowerCase().includes(query) ||
        evaluation.collegeCode.toLowerCase().includes(query);

      const matchesExam =
        examFilter === "All" ||
        evaluation.examination === examFilter;

      const matchesStatus =
        statusFilter === "All" ||
        evaluation.verificationStatus === statusFilter;

      return matchesSearch && matchesExam && matchesStatus;
    });
  }, [evaluations, search, examFilter, statusFilter]);

  const totalStudents = evaluations.reduce(
    (total, item) => total + item.studentsRegistered,
    0,
  );

  const evaluatedStudents = evaluations.reduce(
    (total, item) => total + item.studentsEvaluated,
    0,
  );

  const completedColleges = evaluations.filter(
    (item) =>
      item.verificationStatus === "Submitted" ||
      item.verificationStatus === "Verified",
  ).length;

  const pendingColleges = evaluations.filter(
    (item) =>
      item.verificationStatus === "In Progress" ||
      item.verificationStatus === "Not Started",
  ).length;

  const overdueColleges = evaluations.filter(
    (item) => item.verificationStatus === "Overdue",
  ).length;

  const pendingVerification = evaluations.filter(
    (item) => item.verificationStatus === "Submitted",
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("eduease_logged_in");
    localStorage.removeItem("eduease_user");
    sessionStorage.removeItem("eduease_logged_in");

    router.push("/login");
  };

  const approveEvaluation = (id: number) => {
    setEvaluations((current) =>
      current.map((evaluation) =>
        evaluation.id === id
          ? {
              ...evaluation,
              verificationStatus: "Verified",
              progress: 100,
              internalSubmission: 100,
              externalSubmission: 100,
              studentsEvaluated: evaluation.studentsRegistered,
            }
          : evaluation,
      ),
    );

    setSelectedEvaluation(null);
    setSuccessMessage(
      "College evaluation verified successfully.",
    );
  };

  if (isCheckingLogin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading evaluation monitoring...
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
                  item.href === "/evaluations"
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
              className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
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
              aria-label="Close navigation"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/50"
            />

            <aside className="relative z-10 flex h-full w-72 flex-col bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
                <div>
                  <strong>EduEase</strong>
                  <p className="text-xs text-slate-500">
                    TNTEU Portal
                  </p>
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
                      item.href === "/evaluations"
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

        {/* Main content */}
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
                  Assessment and Evaluation Monitoring
                </h2>

                <p className="hidden text-sm text-slate-500 sm:block">
                  TNTEU University Administration
                </p>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              UA
            </div>
          </header>

          <section className="p-5 sm:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                College-Wise Monitoring
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Assessments and Evaluations
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Monitor internal marks, external evaluations,
                verification progress and pending work across affiliated
                colleges.
              </p>
            </div>

            {successMessage && (
              <div className="mt-6 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
                <span>{successMessage}</span>

                <button
                  type="button"
                  onClick={() => setSuccessMessage("")}
                >
                  Close
                </button>
              </div>
            )}

            {/* Summary cards */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Total Students
                </p>

                <p className="mt-3 text-3xl font-bold">
                  {totalStudents.toLocaleString()}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Registered for evaluation
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Students Evaluated
                </p>

                <p className="mt-3 text-3xl font-bold text-blue-700">
                  {evaluatedStudents.toLocaleString()}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Across all colleges
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Colleges Completed
                </p>

                <p className="mt-3 text-3xl font-bold text-green-700">
                  {completedColleges}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Submitted or verified
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Colleges Pending
                </p>

                <p className="mt-3 text-3xl font-bold text-amber-700">
                  {pendingColleges}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Evaluation incomplete
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Awaiting Verification
                </p>

                <p className="mt-3 text-3xl font-bold text-blue-700">
                  {pendingVerification}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Requires university review
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Overdue Colleges
                </p>

                <p className="mt-3 text-3xl font-bold text-red-700">
                  {overdueColleges}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Deadline exceeded
                </p>
              </article>
            </div>

            {/* Filters */}
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 lg:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Search college
                  </label>

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search college name or code"
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Examination
                  </label>

                  <select
                    value={examFilter}
                    onChange={(event) =>
                      setExamFilter(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none focus:border-blue-600"
                  >
                    <option value="All">All examinations</option>
                    <option value="B.Ed Semester Examination">
                      B.Ed Semester Examination
                    </option>
                    <option value="M.Ed Semester Examination">
                      M.Ed Semester Examination
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Evaluation status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none focus:border-blue-600"
                  >
                    <option value="All">All statuses</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Verified">Verified</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Evaluation table */}
            <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold">
                    College Evaluation Progress
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Showing {filteredEvaluations.length} colleges
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  University View
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1450px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      {[
                        "College",
                        "Examination",
                        "Registered",
                        "Evaluated",
                        "Internal",
                        "External",
                        "Overall Progress",
                        "Status",
                        "Deadline",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredEvaluations.map((evaluation) => (
                      <tr
                        key={evaluation.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5">
                          <p className="font-bold text-slate-900">
                            {evaluation.collegeName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {evaluation.collegeCode}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-700">
                          {evaluation.examination}
                        </td>

                        <td className="px-6 py-5 font-semibold">
                          {evaluation.studentsRegistered.toLocaleString()}
                        </td>

                        <td className="px-6 py-5 font-semibold">
                          {evaluation.studentsEvaluated.toLocaleString()}
                        </td>

                        <td className="px-6 py-5">
                          <strong>
                            {evaluation.internalSubmission}%
                          </strong>
                        </td>

                        <td className="px-6 py-5">
                          <strong>
                            {evaluation.externalSubmission}%
                          </strong>
                        </td>

                        <td className="px-6 py-5">
                          <div className="w-40">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500">
                                Completed
                              </span>

                              <strong>{evaluation.progress}%</strong>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={
                                  evaluation.progress === 100
                                    ? "h-full rounded-full bg-green-600"
                                    : evaluation.verificationStatus ===
                                        "Overdue"
                                      ? "h-full rounded-full bg-red-600"
                                      : "h-full rounded-full bg-blue-600"
                                }
                                style={{
                                  width: `${evaluation.progress}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                              evaluation.verificationStatus,
                            )}`}
                          >
                            {evaluation.verificationStatus}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                          {evaluation.deadline}
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedEvaluation(evaluation)
                            }
                            className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>
      </div>

      {/* Details modal */}
      {selectedEvaluation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  {selectedEvaluation.collegeCode}
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {selectedEvaluation.collegeName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedEvaluation.examination}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEvaluation(null)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Registered
                </p>
                <p className="mt-2 text-xl font-bold">
                  {selectedEvaluation.studentsRegistered}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Evaluated
                </p>
                <p className="mt-2 text-xl font-bold">
                  {selectedEvaluation.studentsEvaluated}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Marks Pending
                </p>
                <p className="mt-2 text-xl font-bold text-amber-700">
                  {selectedEvaluation.studentsRegistered -
                    selectedEvaluation.studentsEvaluated}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Overall Progress
                </p>
                <p className="mt-2 text-xl font-bold text-blue-700">
                  {selectedEvaluation.progress}%
                </p>
              </div>
            </div>

            <div className="px-6 pb-6">
              <h3 className="text-lg font-bold">
                Subject-Wise Evaluation
              </h3>

              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-slate-50 text-left">
                    <tr>
                      {[
                        "Subject",
                        "Registered",
                        "Evaluated",
                        "Invalid Entries",
                        "Progress",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {subjectDetails.map((subject) => (
                      <tr
                        key={subject.subject}
                        className="border-t border-slate-100"
                      >
                        <td className="px-5 py-4 font-semibold">
                          {subject.subject}
                        </td>
                        <td className="px-5 py-4">
                          {subject.registered}
                        </td>
                        <td className="px-5 py-4">
                          {subject.evaluated}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={
                              subject.invalidEntries > 0
                                ? "font-bold text-red-600"
                                : "font-semibold text-green-700"
                            }
                          >
                            {subject.invalidEntries}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <strong>{subject.progress}%</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedEvaluation(null)}
                  className="h-11 rounded-xl border border-slate-300 px-5 font-semibold text-slate-700"
                >
                  Close
                </button>

                {selectedEvaluation.verificationStatus ===
                  "Submitted" && (
                  <button
                    type="button"
                    onClick={() =>
                      approveEvaluation(selectedEvaluation.id)
                    }
                    className="h-11 rounded-xl bg-green-600 px-5 font-semibold text-white hover:bg-green-700"
                  >
                    Verify Evaluation
                  </button>
                )}

                {selectedEvaluation.verificationStatus !==
                  "Submitted" &&
                  selectedEvaluation.verificationStatus !==
                    "Verified" && (
                    <button
                      type="button"
                      onClick={() => {
                        setSuccessMessage(
                          `Reminder sent to ${selectedEvaluation.collegeName}.`,
                        );
                        setSelectedEvaluation(null);
                      }}
                      className="h-11 rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700"
                    >
                      Send Reminder
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}