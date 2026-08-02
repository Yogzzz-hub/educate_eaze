"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ResultStatus =
  | "Evaluation Pending"
  | "Ready for Review"
  | "Approved"
  | "Published"
  | "Sent Back for Correction";

interface CollegeResult {
  id: number;
  collegeCode: string;
  collegeName: string;
  examination: string;
  semester: string;
  studentsAppeared: number;
  studentsPassed: number;
  passPercentage: number;
  evaluationStatus: string;
  resultStatus: ResultStatus;
  submittedDate: string;
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

const initialResults: CollegeResult[] = [
  {
    id: 1,
    collegeCode: "TNTEU-C001",
    collegeName: "Chennai College of Education",
    examination: "B.Ed Semester Examination",
    semester: "Semester 2",
    studentsAppeared: 1210,
    studentsPassed: 1104,
    passPercentage: 91.2,
    evaluationStatus: "Verified",
    resultStatus: "Ready for Review",
    submittedDate: "02 Aug 2026",
  },
  {
    id: 2,
    collegeCode: "TNTEU-C002",
    collegeName: "Sri Venkateswara College of Education",
    examination: "B.Ed Semester Examination",
    semester: "Semester 2",
    studentsAppeared: 960,
    studentsPassed: 912,
    passPercentage: 95,
    evaluationStatus: "Verified",
    resultStatus: "Published",
    submittedDate: "01 Aug 2026",
  },
  {
    id: 3,
    collegeCode: "TNTEU-C003",
    collegeName: "Tamil Nadu Institute of Teacher Education",
    examination: "B.Ed Semester Examination",
    semester: "Semester 2",
    studentsAppeared: 1430,
    studentsPassed: 1186,
    passPercentage: 82.9,
    evaluationStatus: "In Progress",
    resultStatus: "Evaluation Pending",
    submittedDate: "Not submitted",
  },
  {
    id: 4,
    collegeCode: "TNTEU-C004",
    collegeName: "Madurai College of Teacher Education",
    examination: "M.Ed Semester Examination",
    semester: "Semester 4",
    studentsAppeared: 1092,
    studentsPassed: 1004,
    passPercentage: 91.9,
    evaluationStatus: "Verified",
    resultStatus: "Approved",
    submittedDate: "31 Jul 2026",
  },
  {
    id: 5,
    collegeCode: "TNTEU-C005",
    collegeName: "Salem Institute of Education",
    examination: "B.Ed Semester Examination",
    semester: "Semester 2",
    studentsAppeared: 712,
    studentsPassed: 521,
    passPercentage: 73.2,
    evaluationStatus: "Verified with Warnings",
    resultStatus: "Sent Back for Correction",
    submittedDate: "30 Jul 2026",
  },
  {
    id: 6,
    collegeCode: "TNTEU-C006",
    collegeName: "Trichy College of Education",
    examination: "M.Ed Semester Examination",
    semester: "Semester 2",
    studentsAppeared: 842,
    studentsPassed: 764,
    passPercentage: 90.7,
    evaluationStatus: "Verified",
    resultStatus: "Ready for Review",
    submittedDate: "02 Aug 2026",
  },
];

const subjectSummary = [
  {
    subject: "Childhood and Growing Up",
    appeared: 240,
    passed: 224,
    passPercentage: 93.3,
    highestMark: 96,
    averageMark: 76,
    failed: 16,
    absent: 4,
  },
  {
    subject: "Contemporary India and Education",
    appeared: 238,
    passed: 218,
    passPercentage: 91.6,
    highestMark: 94,
    averageMark: 74,
    failed: 20,
    absent: 6,
  },
  {
    subject: "Learning and Teaching",
    appeared: 236,
    passed: 209,
    passPercentage: 88.6,
    highestMark: 92,
    averageMark: 71,
    failed: 27,
    absent: 8,
  },
  {
    subject: "Pedagogy of School Subject",
    appeared: 239,
    passed: 226,
    passPercentage: 94.6,
    highestMark: 97,
    averageMark: 78,
    failed: 13,
    absent: 5,
  },
];

function statusClass(status: ResultStatus) {
  if (status === "Published") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Approved") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "Ready for Review") {
    return "bg-cyan-100 text-cyan-700";
  }

  if (status === "Sent Back for Correction") {
    return "bg-red-100 text-red-700";
  }

  return "bg-amber-100 text-amber-700";
}

export default function ResultsPage() {
  const router = useRouter();

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [results, setResults] =
    useState<CollegeResult[]>(initialResults);

  const [search, setSearch] = useState("");
  const [examFilter, setExamFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedResult, setSelectedResult] =
    useState<CollegeResult | null>(null);

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

  const filteredResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    return results.filter((result) => {
      const matchesSearch =
        result.collegeName.toLowerCase().includes(query) ||
        result.collegeCode.toLowerCase().includes(query);

      const matchesExam =
        examFilter === "All" ||
        result.examination === examFilter;

      const matchesStatus =
        statusFilter === "All" ||
        result.resultStatus === statusFilter;

      return matchesSearch && matchesExam && matchesStatus;
    });
  }, [results, search, examFilter, statusFilter]);

  const collegesSubmitted = results.filter(
    (result) => result.submittedDate !== "Not submitted",
  ).length;

  const pendingColleges = results.filter(
    (result) => result.resultStatus === "Evaluation Pending",
  ).length;

  const awaitingApproval = results.filter(
    (result) => result.resultStatus === "Ready for Review",
  ).length;

  const publishedResults = results.filter(
    (result) => result.resultStatus === "Published",
  ).length;

  const totalAppeared = results.reduce(
    (total, result) => total + result.studentsAppeared,
    0,
  );

  const totalPassed = results.reduce(
    (total, result) => total + result.studentsPassed,
    0,
  );

  const overallPassPercentage =
    totalAppeared === 0
      ? 0
      : ((totalPassed / totalAppeared) * 100).toFixed(1);

  const handleLogout = () => {
    localStorage.removeItem("eduease_logged_in");
    localStorage.removeItem("eduease_user");
    sessionStorage.removeItem("eduease_logged_in");

    router.push("/login");
  };

  const updateResultStatus = (
    id: number,
    newStatus: ResultStatus,
    message: string,
  ) => {
    setResults((current) =>
      current.map((result) =>
        result.id === id
          ? {
              ...result,
              resultStatus: newStatus,
            }
          : result,
      ),
    );

    setSelectedResult(null);
    setSuccessMessage(message);
  };

  const approveResult = (result: CollegeResult) => {
    const confirmed = window.confirm(
      `Approve the results submitted by ${result.collegeName}?`,
    );

    if (!confirmed) {
      return;
    }

    updateResultStatus(
      result.id,
      "Approved",
      `${result.collegeName} results approved successfully.`,
    );
  };

  const publishResult = (result: CollegeResult) => {
    const confirmed = window.confirm(
      `Publish the approved results for ${result.collegeName}?`,
    );

    if (!confirmed) {
      return;
    }

    updateResultStatus(
      result.id,
      "Published",
      `${result.collegeName} results published successfully.`,
    );
  };

  const returnForCorrection = (result: CollegeResult) => {
    const confirmed = window.confirm(
      `Return ${result.collegeName} results for correction?`,
    );

    if (!confirmed) {
      return;
    }

    updateResultStatus(
      result.id,
      "Sent Back for Correction",
      `Results returned to ${result.collegeName} for correction.`,
    );
  };

  if (isCheckingLogin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading university results...
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
                  item.href === "/results"
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

        {/* Mobile navigation */}
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
                      item.href === "/results"
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
                  University Result Management
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
                Result Approval Workflow
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Results
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Review college-wise results, verify academic data,
                approve submissions and publish final results.
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
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Colleges Submitted
                </p>

                <p className="mt-3 text-3xl font-bold">
                  {collegesSubmitted}
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  Result data received
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Colleges Pending
                </p>

                <p className="mt-3 text-3xl font-bold text-amber-700">
                  {pendingColleges}
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  Evaluation incomplete
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Awaiting Approval
                </p>

                <p className="mt-3 text-3xl font-bold text-cyan-700">
                  {awaitingApproval}
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  Ready for university review
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Results Published
                </p>

                <p className="mt-3 text-3xl font-bold text-green-700">
                  {publishedResults}
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  Available to students
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Overall Pass Rate
                </p>

                <p className="mt-3 text-3xl font-bold text-blue-700">
                  {overallPassPercentage}%
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  Across all colleges
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
                    Result status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none focus:border-blue-600"
                  >
                    <option value="All">All statuses</option>
                    <option value="Evaluation Pending">
                      Evaluation Pending
                    </option>
                    <option value="Ready for Review">
                      Ready for Review
                    </option>
                    <option value="Approved">Approved</option>
                    <option value="Published">Published</option>
                    <option value="Sent Back for Correction">
                      Sent Back for Correction
                    </option>
                  </select>
                </div>
              </div>
            </section>

            {/* Results table */}
            <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold">
                    College Result Submissions
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Showing {filteredResults.length} colleges
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  University Review
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1500px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      {[
                        "College",
                        "Examination",
                        "Semester",
                        "Appeared",
                        "Passed",
                        "Pass Rate",
                        "Evaluation",
                        "Result Status",
                        "Submitted",
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
                    {filteredResults.map((result) => (
                      <tr
                        key={result.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5">
                          <p className="font-bold text-slate-900">
                            {result.collegeName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {result.collegeCode}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-700">
                          {result.examination}
                        </td>

                        <td className="px-6 py-5 text-sm font-semibold">
                          {result.semester}
                        </td>

                        <td className="px-6 py-5 font-semibold">
                          {result.studentsAppeared.toLocaleString()}
                        </td>

                        <td className="px-6 py-5 font-semibold">
                          {result.studentsPassed.toLocaleString()}
                        </td>

                        <td className="px-6 py-5">
                          <strong
                            className={
                              result.passPercentage >= 90
                                ? "text-green-700"
                                : result.passPercentage >= 75
                                  ? "text-blue-700"
                                  : "text-amber-700"
                            }
                          >
                            {result.passPercentage}%
                          </strong>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-700">
                          {result.evaluationStatus}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                              result.resultStatus,
                            )}`}
                          >
                            {result.resultStatus}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-700">
                          {result.submittedDate}
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() => setSelectedResult(result)}
                            className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                          >
                            Review
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

      {/* Result review modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  {selectedResult.collegeCode}
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {selectedResult.collegeName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedResult.examination} ·{" "}
                  {selectedResult.semester}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Students Appeared
                </p>

                <p className="mt-2 text-xl font-bold">
                  {selectedResult.studentsAppeared}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Students Passed
                </p>

                <p className="mt-2 text-xl font-bold text-green-700">
                  {selectedResult.studentsPassed}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Students Failed
                </p>

                <p className="mt-2 text-xl font-bold text-red-700">
                  {selectedResult.studentsAppeared -
                    selectedResult.studentsPassed}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Pass Percentage
                </p>

                <p className="mt-2 text-xl font-bold text-blue-700">
                  {selectedResult.passPercentage}%
                </p>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <h3 className="font-bold text-amber-800">
                  Validation Summary
                </h3>

                <p className="mt-2 text-sm text-amber-700">
                  Two absent student records and three mark entries require
                  manual verification before final publication.
                </p>
              </div>

              <h3 className="mt-6 text-lg font-bold">
                Subject-Wise Result Summary
              </h3>

              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[950px]">
                  <thead className="bg-slate-50 text-left">
                    <tr>
                      {[
                        "Subject",
                        "Appeared",
                        "Passed",
                        "Pass Rate",
                        "Highest",
                        "Average",
                        "Failed",
                        "Absent",
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
                    {subjectSummary.map((subject) => (
                      <tr
                        key={subject.subject}
                        className="border-t border-slate-100"
                      >
                        <td className="px-5 py-4 font-semibold">
                          {subject.subject}
                        </td>

                        <td className="px-5 py-4">
                          {subject.appeared}
                        </td>

                        <td className="px-5 py-4">
                          {subject.passed}
                        </td>

                        <td className="px-5 py-4 font-semibold text-green-700">
                          {subject.passPercentage}%
                        </td>

                        <td className="px-5 py-4">
                          {subject.highestMark}
                        </td>

                        <td className="px-5 py-4">
                          {subject.averageMark}
                        </td>

                        <td className="px-5 py-4 text-red-700">
                          {subject.failed}
                        </td>

                        <td className="px-5 py-4 text-amber-700">
                          {subject.absent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedResult(null)}
                  className="h-11 rounded-xl border border-slate-300 px-5 font-semibold text-slate-700"
                >
                  Close
                </button>

                {selectedResult.resultStatus !== "Published" && (
                  <button
                    type="button"
                    onClick={() =>
                      returnForCorrection(selectedResult)
                    }
                    className="h-11 rounded-xl border border-red-200 bg-red-50 px-5 font-semibold text-red-700 hover:bg-red-100"
                  >
                    Return for Correction
                  </button>
                )}

                {selectedResult.resultStatus ===
                  "Ready for Review" && (
                  <button
                    type="button"
                    onClick={() => approveResult(selectedResult)}
                    className="h-11 rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700"
                  >
                    Approve Results
                  </button>
                )}

                {selectedResult.resultStatus === "Approved" && (
                  <button
                    type="button"
                    onClick={() => publishResult(selectedResult)}
                    className="h-11 rounded-xl bg-green-600 px-5 font-semibold text-white hover:bg-green-700"
                  >
                    Publish Results
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