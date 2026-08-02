"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CollegeStatus = "Active" | "Under Review" | "Inactive";

type SubmissionStatus =
  | "Completed"
  | "In Progress"
  | "Not Submitted";

interface College {
  id: number;
  code: string;
  name: string;
  district: string;
  principal: string;
  adminEmail: string;
  students: number;
  faculty: number;
  evaluationProgress: number;
  affiliationStatus: CollegeStatus;
  submissionStatus: SubmissionStatus;
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

const initialColleges: College[] = [
  {
    id: 1,
    code: "TNTEU-C001",
    name: "Chennai College of Education",
    district: "Chennai",
    principal: "Dr. R. Meenakshi",
    adminEmail: "admin@chennai-education.edu",
    students: 1240,
    faculty: 86,
    evaluationProgress: 82,
    affiliationStatus: "Active",
    submissionStatus: "In Progress",
  },
  {
    id: 2,
    code: "TNTEU-C002",
    name: "Sri Venkateswara College of Education",
    district: "Kanchipuram",
    principal: "Dr. S. Kumar",
    adminEmail: "admin@svce.edu",
    students: 980,
    faculty: 64,
    evaluationProgress: 100,
    affiliationStatus: "Active",
    submissionStatus: "Completed",
  },
  {
    id: 3,
    code: "TNTEU-C003",
    name: "Tamil Nadu Institute of Teacher Education",
    district: "Coimbatore",
    principal: "Dr. P. Lakshmi",
    adminEmail: "admin@tnite.edu",
    students: 1460,
    faculty: 102,
    evaluationProgress: 65,
    affiliationStatus: "Active",
    submissionStatus: "In Progress",
  },
  {
    id: 4,
    code: "TNTEU-C004",
    name: "Madurai College of Teacher Education",
    district: "Madurai",
    principal: "Dr. M. Arul",
    adminEmail: "admin@mcte.edu",
    students: 1125,
    faculty: 78,
    evaluationProgress: 91,
    affiliationStatus: "Active",
    submissionStatus: "Completed",
  },
  {
    id: 5,
    code: "TNTEU-C005",
    name: "Salem Institute of Education",
    district: "Salem",
    principal: "Dr. J. Revathi",
    adminEmail: "admin@sie.edu",
    students: 740,
    faculty: 48,
    evaluationProgress: 44,
    affiliationStatus: "Under Review",
    submissionStatus: "In Progress",
  },
  {
    id: 6,
    code: "TNTEU-C006",
    name: "Trichy College of Education",
    district: "Tiruchirappalli",
    principal: "Dr. A. Prakash",
    adminEmail: "admin@trichyeducation.edu",
    students: 860,
    faculty: 55,
    evaluationProgress: 0,
    affiliationStatus: "Inactive",
    submissionStatus: "Not Submitted",
  },
];

function affiliationClass(status: CollegeStatus) {
  if (status === "Active") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Under Review") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-red-100 text-red-700";
}

function submissionClass(status: SubmissionStatus) {
  if (status === "Completed") {
    return "bg-green-100 text-green-700";
  }

  if (status === "In Progress") {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-slate-200 text-slate-700";
}

export default function CollegesPage() {
  const router = useRouter();

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddCollege, setShowAddCollege] = useState(false);

  const [colleges, setColleges] =
    useState<College[]>(initialColleges);

  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [collegeName, setCollegeName] = useState("");
  const [collegeCode, setCollegeCode] = useState("");
  const [district, setDistrict] = useState("");
  const [principal, setPrincipal] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

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

  const districts = useMemo(() => {
    return Array.from(
      new Set(colleges.map((college) => college.district)),
    ).sort();
  }, [colleges]);

  const filteredColleges = useMemo(() => {
    const query = search.trim().toLowerCase();

    return colleges.filter((college) => {
      const matchesSearch =
        college.name.toLowerCase().includes(query) ||
        college.code.toLowerCase().includes(query) ||
        college.district.toLowerCase().includes(query) ||
        college.principal.toLowerCase().includes(query);

      const matchesDistrict =
        districtFilter === "All" ||
        college.district === districtFilter;

      const matchesStatus =
        statusFilter === "All" ||
        college.affiliationStatus === statusFilter;

      return matchesSearch && matchesDistrict && matchesStatus;
    });
  }, [colleges, districtFilter, search, statusFilter]);

  const totalStudents = colleges.reduce(
    (total, college) => total + college.students,
    0,
  );

  const activeColleges = colleges.filter(
    (college) => college.affiliationStatus === "Active",
  ).length;

  const pendingReview = colleges.filter(
    (college) => college.affiliationStatus === "Under Review",
  ).length;

  const incompleteSubmissions = colleges.filter(
    (college) => college.submissionStatus !== "Completed",
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("eduease_logged_in");
    localStorage.removeItem("eduease_user");
    sessionStorage.removeItem("eduease_logged_in");

    router.push("/login");
  };

  const handleAddCollege = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !collegeName.trim() ||
      !collegeCode.trim() ||
      !district.trim() ||
      !principal.trim() ||
      !adminEmail.trim()
    ) {
      alert("Please complete all college details.");
      return;
    }

    const newCollege: College = {
      id: Date.now(),
      code: collegeCode.trim(),
      name: collegeName.trim(),
      district: district.trim(),
      principal: principal.trim(),
      adminEmail: adminEmail.trim(),
      students: 0,
      faculty: 0,
      evaluationProgress: 0,
      affiliationStatus: "Under Review",
      submissionStatus: "Not Submitted",
    };

    setColleges((current) => [newCollege, ...current]);

    setCollegeName("");
    setCollegeCode("");
    setDistrict("");
    setPrincipal("");
    setAdminEmail("");
    setShowAddCollege(false);
  };

  if (isCheckingLogin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading affiliated colleges...
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
                  item.href === "/colleges"
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
                      item.href === "/colleges"
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
                  Affiliated College Management
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
            {/* Heading */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  College Management
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Affiliated Colleges
                </h1>

                <p className="mt-3 max-w-3xl text-slate-600">
                  View and monitor all colleges affiliated with TNTEU,
                  including academic submissions, evaluations and
                  affiliation status.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddCollege(true)}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700"
              >
                Add College
              </button>
            </div>

            {/* Summary cards */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Total Colleges
                </p>
                <p className="mt-3 text-3xl font-bold">
                  {colleges.length}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  {totalStudents.toLocaleString()} total students
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Active Colleges
                </p>
                <p className="mt-3 text-3xl font-bold text-green-700">
                  {activeColleges}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Currently affiliated
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Under Review
                </p>
                <p className="mt-3 text-3xl font-bold text-amber-700">
                  {pendingReview}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Awaiting university approval
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Incomplete Submissions
                </p>
                <p className="mt-3 text-3xl font-bold text-red-700">
                  {incompleteSubmissions}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Requires college action
                </p>
              </article>
            </div>

            {/* Filters */}
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="college-search"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Search college
                  </label>

                  <input
                    id="college-search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search name, code or principal"
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="district-filter"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    District
                  </label>

                  <select
                    id="district-filter"
                    value={districtFilter}
                    onChange={(event) =>
                      setDistrictFilter(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none focus:border-blue-600"
                  >
                    <option value="All">All districts</option>

                    {districts.map((districtName) => (
                      <option
                        key={districtName}
                        value={districtName}
                      >
                        {districtName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="status-filter"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Affiliation status
                  </label>

                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none focus:border-blue-600"
                  >
                    <option value="All">All statuses</option>
                    <option value="Active">Active</option>
                    <option value="Under Review">
                      Under Review
                    </option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </section>

            {/* College table */}
            <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold">
                    College Directory
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Showing {filteredColleges.length} colleges
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Demo Data
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1250px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        College
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Principal
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
                        Affiliation
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Submission
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredColleges.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-6 py-14 text-center"
                        >
                          <p className="font-semibold text-slate-700">
                            No colleges found
                          </p>

                          <p className="mt-2 text-sm text-slate-500">
                            Change the search term or filters.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredColleges.map((college) => (
                        <tr
                          key={college.id}
                          className="transition hover:bg-slate-50"
                        >
                          <td className="px-6 py-5">
                            <p className="font-bold text-slate-900">
                              {college.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {college.code} · {college.district}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {college.adminEmail}
                            </p>
                          </td>

                          <td className="px-6 py-5 text-sm text-slate-700">
                            {college.principal}
                          </td>

                          <td className="px-6 py-5 font-semibold text-slate-700">
                            {college.students.toLocaleString()}
                          </td>

                          <td className="px-6 py-5 font-semibold text-slate-700">
                            {college.faculty}
                          </td>

                          <td className="px-6 py-5">
                            <div className="w-36">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500">
                                  Progress
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
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${affiliationClass(
                                college.affiliationStatus,
                              )}`}
                            >
                              {college.affiliationStatus}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${submissionClass(
                                college.submissionStatus,
                              )}`}
                            >
                              {college.submissionStatus}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <Link
                              href={`/colleges/${college.id}`}
                              className="inline-flex rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                            >
                              Open College
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>
      </div>

      {/* Add college modal */}
      {showAddCollege && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">
                  Add Affiliated College
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Register a new college for university review.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddCollege(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <form
              onSubmit={handleAddCollege}
              className="grid gap-5 p-6 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  College name
                </label>

                <input
                  value={collegeName}
                  onChange={(event) =>
                    setCollegeName(event.target.value)
                  }
                  placeholder="Enter college name"
                  className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  College code
                </label>

                <input
                  value={collegeCode}
                  onChange={(event) =>
                    setCollegeCode(event.target.value)
                  }
                  placeholder="TNTEU-C007"
                  className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  District
                </label>

                <input
                  value={district}
                  onChange={(event) =>
                    setDistrict(event.target.value)
                  }
                  placeholder="Enter district"
                  className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Principal name
                </label>

                <input
                  value={principal}
                  onChange={(event) =>
                    setPrincipal(event.target.value)
                  }
                  placeholder="Enter principal name"
                  className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Administrator email
                </label>

                <input
                  type="email"
                  value={adminEmail}
                  onChange={(event) =>
                    setAdminEmail(event.target.value)
                  }
                  placeholder="admin@college.edu"
                  className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-3 border-t border-slate-200 pt-5 sm:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowAddCollege(false)}
                  className="h-11 flex-1 rounded-xl border border-slate-300 bg-white font-semibold text-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-11 flex-1 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
                >
                  Add College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}