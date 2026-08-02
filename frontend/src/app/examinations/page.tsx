"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ExamStatus =
  | "Draft"
  | "Scheduled"
  | "Ongoing"
  | "Completed";

interface Examination {
  id: number;
  name: string;
  academicYear: string;
  semester: string;
  startDate: string;
  endDate: string;
  colleges: number;
  students: number;
  subjects: number;
  status: ExamStatus;
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

const initialExaminations: Examination[] = [
  {
    id: 1,
    name: "B.Ed Semester Examination – August 2026",
    academicYear: "2025–2026",
    semester: "Semester 2",
    startDate: "2026-08-10",
    endDate: "2026-08-22",
    colleges: 24,
    students: 8640,
    subjects: 12,
    status: "Scheduled",
  },
  {
    id: 2,
    name: "M.Ed Semester Examination – August 2026",
    academicYear: "2025–2026",
    semester: "Semester 4",
    startDate: "2026-08-12",
    endDate: "2026-08-20",
    colleges: 18,
    students: 2140,
    subjects: 8,
    status: "Scheduled",
  },
  {
    id: 3,
    name: "B.Ed Arrear Examination – July 2026",
    academicYear: "2025–2026",
    semester: "All Semesters",
    startDate: "2026-07-15",
    endDate: "2026-07-26",
    colleges: 21,
    students: 1280,
    subjects: 16,
    status: "Completed",
  },
  {
    id: 4,
    name: "Special Practical Examination – August 2026",
    academicYear: "2025–2026",
    semester: "Semester 2",
    startDate: "2026-08-05",
    endDate: "2026-08-09",
    colleges: 14,
    students: 1640,
    subjects: 5,
    status: "Ongoing",
  },
  {
    id: 5,
    name: "M.Ed Internal Assessment Review",
    academicYear: "2025–2026",
    semester: "Semester 2",
    startDate: "2026-09-02",
    endDate: "2026-09-05",
    colleges: 18,
    students: 2060,
    subjects: 6,
    status: "Draft",
  },
];

const upcomingSchedule = [
  {
    date: "05 Aug 2026",
    time: "10:00 AM",
    subject: "Childhood and Growing Up",
    programme: "B.Ed",
    semester: "Semester 2",
    colleges: 24,
  },
  {
    date: "07 Aug 2026",
    time: "10:00 AM",
    subject: "Contemporary India and Education",
    programme: "B.Ed",
    semester: "Semester 2",
    colleges: 24,
  },
  {
    date: "10 Aug 2026",
    time: "02:00 PM",
    subject: "Learning and Teaching",
    programme: "B.Ed",
    semester: "Semester 2",
    colleges: 24,
  },
];

function statusClass(status: ExamStatus) {
  if (status === "Completed") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Ongoing") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "Scheduled") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-200 text-slate-700";
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ExaminationsPage() {
  const router = useRouter();

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [examinations, setExaminations] =
    useState<Examination[]>(initialExaminations);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [examName, setExamName] = useState("");
  const [academicYear, setAcademicYear] =
    useState("2025–2026");
  const [semester, setSemester] = useState("Semester 2");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const filteredExaminations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return examinations.filter((exam) => {
      const matchesSearch =
        exam.name.toLowerCase().includes(query) ||
        exam.academicYear.toLowerCase().includes(query) ||
        exam.semester.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || exam.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [examinations, search, statusFilter]);

  const scheduledCount = examinations.filter(
    (exam) => exam.status === "Scheduled",
  ).length;

  const ongoingCount = examinations.filter(
    (exam) => exam.status === "Ongoing",
  ).length;

  const completedCount = examinations.filter(
    (exam) => exam.status === "Completed",
  ).length;

  const totalStudents = examinations.reduce(
    (total, exam) => total + exam.students,
    0,
  );

  const handleLogout = () => {
    localStorage.removeItem("eduease_logged_in");
    localStorage.removeItem("eduease_user");
    sessionStorage.removeItem("eduease_logged_in");

    router.push("/login");
  };

  const handleCreateExam = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !examName.trim() ||
      !academicYear ||
      !semester ||
      !startDate ||
      !endDate
    ) {
      alert("Please complete all examination details.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date must be after the start date.");
      return;
    }

    const newExam: Examination = {
      id: Date.now(),
      name: examName.trim(),
      academicYear,
      semester,
      startDate,
      endDate,
      colleges: 24,
      students: 0,
      subjects: 0,
      status: "Draft",
    };

    setExaminations((current) => [newExam, ...current]);

    setExamName("");
    setAcademicYear("2025–2026");
    setSemester("Semester 2");
    setStartDate("");
    setEndDate("");
    setShowCreateExam(false);

    setSuccessMessage(
      "Examination created as a draft successfully.",
    );
  };

  const publishSchedule = (examId: number) => {
    setExaminations((current) =>
      current.map((exam) =>
        exam.id === examId
          ? { ...exam, status: "Scheduled" }
          : exam,
      ),
    );

    setSuccessMessage(
      "Examination schedule published to affiliated colleges.",
    );
  };

  if (isCheckingLogin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading examinations...
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
                  item.href === "/examinations"
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
                      item.href === "/examinations"
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
                  University Examination Management
                </h2>

                <p className="hidden text-sm text-slate-500 sm:block">
                  TNTEU University Administration
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 sm:inline-flex">
                University Level
              </span>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                UA
              </div>
            </div>
          </header>

          <section className="p-5 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Examination Lifecycle
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Examinations
                </h1>

                <p className="mt-3 max-w-3xl text-slate-600">
                  Create university examinations, publish schedules and
                  monitor participation across affiliated colleges.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateExam(true)}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700"
              >
                Create Examination
              </button>
            </div>

            {successMessage && (
              <div className="mt-6 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
                <span>{successMessage}</span>

                <button
                  type="button"
                  onClick={() => setSuccessMessage("")}
                  className="text-green-800"
                >
                  Close
                </button>
              </div>
            )}

            {/* Summary cards */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Scheduled Examinations
                </p>
                <p className="mt-3 text-3xl font-bold">
                  {scheduledCount}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Ready for affiliated colleges
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Ongoing Examinations
                </p>
                <p className="mt-3 text-3xl font-bold text-blue-700">
                  {ongoingCount}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Currently in progress
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Completed Examinations
                </p>
                <p className="mt-3 text-3xl font-bold text-green-700">
                  {completedCount}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Ready for evaluation
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Student Registrations
                </p>
                <p className="mt-3 text-3xl font-bold">
                  {totalStudents.toLocaleString()}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Across all examinations
                </p>
              </article>
            </div>

            {/* Filters */}
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Search examination
                  </label>

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search examination, year or semester"
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Examination status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none focus:border-blue-600"
                  >
                    <option value="All">All statuses</option>
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Examination table */}
            <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold">
                    University Examinations
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Showing {filteredExaminations.length} examinations
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Demo Data
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      {[
                        "Examination",
                        "Academic Year",
                        "Schedule",
                        "Colleges",
                        "Students",
                        "Subjects",
                        "Status",
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
                    {filteredExaminations.map((exam) => (
                      <tr
                        key={exam.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5">
                          <p className="font-bold text-slate-900">
                            {exam.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {exam.semester}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-700">
                          {exam.academicYear}
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm font-semibold text-slate-700">
                            {formatDate(exam.startDate)}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            to {formatDate(exam.endDate)}
                          </p>
                        </td>

                        <td className="px-6 py-5 font-semibold">
                          {exam.colleges}
                        </td>

                        <td className="px-6 py-5 font-semibold">
                          {exam.students.toLocaleString()}
                        </td>

                        <td className="px-6 py-5 font-semibold">
                          {exam.subjects}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                              exam.status,
                            )}`}
                          >
                            {exam.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                alert(
                                  `${exam.name} opened in demo mode.`,
                                )
                              }
                              className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                              View
                            </button>

                            {exam.status === "Draft" && (
                              <button
                                type="button"
                                onClick={() =>
                                  publishSchedule(exam.id)
                                }
                                className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                              >
                                Publish
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Upcoming schedule */}
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-xl font-bold">
                  Upcoming Subject Schedule
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Common examination schedule sent to affiliated colleges
                </p>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {upcomingSchedule.map((item) => (
                  <article
                    key={`${item.date}-${item.subject}`}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {item.date}
                      </span>

                      <span className="text-xs font-semibold text-slate-500">
                        {item.time}
                      </span>
                    </div>

                    <h3 className="mt-4 font-bold text-slate-900">
                      {item.subject}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {item.programme} · {item.semester}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-slate-700">
                      {item.colleges} colleges notified
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </div>
      </div>

      {/* Create examination modal */}
      {showCreateExam && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">
                  Create University Examination
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create an examination before publishing it to colleges.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateExam(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <form
              onSubmit={handleCreateExam}
              className="grid gap-5 p-6 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Examination name
                </label>

                <input
                  value={examName}
                  onChange={(event) =>
                    setExamName(event.target.value)
                  }
                  placeholder="Example: B.Ed Semester Examination"
                  className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Academic year
                </label>

                <select
                  value={academicYear}
                  onChange={(event) =>
                    setAcademicYear(event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                >
                  <option>2025–2026</option>
                  <option>2026–2027</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Semester
                </label>

                <select
                  value={semester}
                  onChange={(event) =>
                    setSemester(event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                >
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                  <option>Semester 3</option>
                  <option>Semester 4</option>
                  <option>All Semesters</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Start date
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(event) =>
                    setStartDate(event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 px-4"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  End date
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(event) =>
                    setEndDate(event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 px-4"
                />
              </div>

              <div className="flex gap-3 border-t border-slate-200 pt-5 sm:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowCreateExam(false)}
                  className="h-11 flex-1 rounded-xl border border-slate-300 bg-white font-semibold text-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-11 flex-1 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
                >
                  Save as Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}