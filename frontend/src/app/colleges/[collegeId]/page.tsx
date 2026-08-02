"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type TabName =
  | "overview"
  | "departments"
  | "students"
  | "faculty"
  | "assessments"
  | "submissions";

interface College {
  id: string;
  code: string;
  name: string;
  district: string;
  principal: string;
  adminEmail: string;
  affiliationStatus: string;
  students: number;
  faculty: number;
  departments: number;
  evaluationProgress: number;
  resultStatus: string;
  grievances: number;
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

const colleges: College[] = [
  {
    id: "1",
    code: "TNTEU-C001",
    name: "Chennai College of Education",
    district: "Chennai",
    principal: "Dr. R. Meenakshi",
    adminEmail: "admin@chennai-education.edu",
    affiliationStatus: "Active",
    students: 1240,
    faculty: 86,
    departments: 8,
    evaluationProgress: 82,
    resultStatus: "Pending Approval",
    grievances: 8,
  },
  {
    id: "2",
    code: "TNTEU-C002",
    name: "Sri Venkateswara College of Education",
    district: "Kanchipuram",
    principal: "Dr. S. Kumar",
    adminEmail: "admin@svce.edu",
    affiliationStatus: "Active",
    students: 980,
    faculty: 64,
    departments: 6,
    evaluationProgress: 100,
    resultStatus: "Published",
    grievances: 3,
  },
  {
    id: "3",
    code: "TNTEU-C003",
    name: "Tamil Nadu Institute of Teacher Education",
    district: "Coimbatore",
    principal: "Dr. P. Lakshmi",
    adminEmail: "admin@tnite.edu",
    affiliationStatus: "Active",
    students: 1460,
    faculty: 102,
    departments: 10,
    evaluationProgress: 65,
    resultStatus: "Evaluation Pending",
    grievances: 14,
  },
  {
    id: "4",
    code: "TNTEU-C004",
    name: "Madurai College of Teacher Education",
    district: "Madurai",
    principal: "Dr. M. Arul",
    adminEmail: "admin@mcte.edu",
    affiliationStatus: "Active",
    students: 1125,
    faculty: 78,
    departments: 7,
    evaluationProgress: 91,
    resultStatus: "Ready for Approval",
    grievances: 5,
  },
  {
    id: "5",
    code: "TNTEU-C005",
    name: "Salem Institute of Education",
    district: "Salem",
    principal: "Dr. J. Revathi",
    adminEmail: "admin@sie.edu",
    affiliationStatus: "Under Review",
    students: 740,
    faculty: 48,
    departments: 5,
    evaluationProgress: 44,
    resultStatus: "Evaluation Pending",
    grievances: 9,
  },
  {
    id: "6",
    code: "TNTEU-C006",
    name: "Trichy College of Education",
    district: "Tiruchirappalli",
    principal: "Dr. A. Prakash",
    adminEmail: "admin@trichyeducation.edu",
    affiliationStatus: "Inactive",
    students: 860,
    faculty: 55,
    departments: 6,
    evaluationProgress: 0,
    resultStatus: "Not Started",
    grievances: 0,
  },
];

const departments = [
  {
    name: "Education",
    programme: "B.Ed",
    students: 320,
    faculty: 18,
    status: "Active",
  },
  {
    name: "Tamil Education",
    programme: "B.Ed Tamil",
    students: 180,
    faculty: 12,
    status: "Active",
  },
  {
    name: "English Education",
    programme: "B.Ed English",
    students: 210,
    faculty: 14,
    status: "Active",
  },
  {
    name: "Mathematics Education",
    programme: "B.Ed Mathematics",
    students: 175,
    faculty: 11,
    status: "Active",
  },
  {
    name: "Physical Science Education",
    programme: "B.Ed Physical Science",
    students: 165,
    faculty: 10,
    status: "Active",
  },
];

const students = [
  {
    registerNumber: "TNTEU240001",
    name: "Ananya Raj",
    department: "Education",
    programme: "B.Ed",
    semester: "3",
    status: "Active",
  },
  {
    registerNumber: "TNTEU240002",
    name: "Arjun Kumar",
    department: "Mathematics Education",
    programme: "B.Ed Mathematics",
    semester: "3",
    status: "Active",
  },
  {
    registerNumber: "TNTEU240003",
    name: "Meera S",
    department: "English Education",
    programme: "B.Ed English",
    semester: "3",
    status: "Active",
  },
  {
    registerNumber: "TNTEU240004",
    name: "Rahul K",
    department: "Physical Science Education",
    programme: "B.Ed Physical Science",
    semester: "3",
    status: "Active",
  },
  {
    registerNumber: "TNTEU240005",
    name: "Divya P",
    department: "Tamil Education",
    programme: "B.Ed Tamil",
    semester: "3",
    status: "Inactive",
  },
];

const faculty = [
  {
    employeeId: "FAC001",
    name: "Dr. Priya Raman",
    department: "Education",
    subject: "Educational Psychology",
    workload: 48,
    status: "Active",
  },
  {
    employeeId: "FAC002",
    name: "Dr. Karthik S",
    department: "Mathematics Education",
    subject: "Pedagogy of Mathematics",
    workload: 36,
    status: "Active",
  },
  {
    employeeId: "FAC003",
    name: "Dr. Nandhini R",
    department: "English Education",
    subject: "Language Teaching",
    workload: 42,
    status: "Active",
  },
  {
    employeeId: "FAC004",
    name: "Dr. Senthil Kumar",
    department: "Physical Science Education",
    subject: "Science Pedagogy",
    workload: 39,
    status: "Active",
  },
];

const assessments = [
  {
    subject: "Educational Psychology",
    type: "Internal Assessment",
    totalStudents: 180,
    marksSubmitted: 180,
    verification: "Verified",
  },
  {
    subject: "Pedagogy of Mathematics",
    type: "Internal Assessment",
    totalStudents: 175,
    marksSubmitted: 160,
    verification: "In Progress",
  },
  {
    subject: "Language Teaching",
    type: "Practical Assessment",
    totalStudents: 210,
    marksSubmitted: 194,
    verification: "In Progress",
  },
  {
    subject: "Science Pedagogy",
    type: "External Assessment",
    totalStudents: 165,
    marksSubmitted: 120,
    verification: "Pending",
  },
];

const submissions = [
  {
    type: "Student Registration Data",
    submittedDate: "01 Aug 2026",
    collegeStatus: "Submitted",
    universityStatus: "Approved",
  },
  {
    type: "Internal Assessment Marks",
    submittedDate: "02 Aug 2026",
    collegeStatus: "Submitted",
    universityStatus: "Under Review",
  },
  {
    type: "Faculty Assignment Details",
    submittedDate: "30 Jul 2026",
    collegeStatus: "Submitted",
    universityStatus: "Approved",
  },
  {
    type: "External Evaluation Marks",
    submittedDate: "Not submitted",
    collegeStatus: "Pending",
    universityStatus: "Waiting",
  },
];

const activities = [
  {
    title: "Internal marks submitted",
    description: "Educational Psychology marks were submitted.",
    time: "20 minutes ago",
  },
  {
    title: "Student records updated",
    description: "24 student records were verified by the college.",
    time: "1 hour ago",
  },
  {
    title: "Evaluation assigned",
    description: "External evaluators were assigned to four subjects.",
    time: "3 hours ago",
  },
  {
    title: "Grievance response added",
    description: "The college responded to grievance GRV-1082.",
    time: "Yesterday",
  },
];

function statusClass(status: string) {
  if (
    status === "Active" ||
    status === "Verified" ||
    status === "Approved" ||
    status === "Submitted" ||
    status === "Published"
  ) {
    return "bg-green-100 text-green-700";
  }

  if (
    status === "In Progress" ||
    status === "Under Review" ||
    status === "Ready for Approval"
  ) {
    return "bg-blue-100 text-blue-700";
  }

  if (
    status === "Pending" ||
    status === "Waiting" ||
    status === "Evaluation Pending" ||
    status === "Pending Approval"
  ) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-red-100 text-red-700";
}

export default function CollegeDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const collegeId = String(params.collegeId ?? "1");

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>("overview");
  const [studentSearch, setStudentSearch] = useState("");

  const college = useMemo(() => {
    return colleges.find((item) => item.id === collegeId) ?? colleges[0];
  }, [collegeId]);

  const filteredStudents = useMemo(() => {
    const query = studentSearch.toLowerCase().trim();

    return students.filter((student) => {
      return (
        student.name.toLowerCase().includes(query) ||
        student.registerNumber.toLowerCase().includes(query) ||
        student.department.toLowerCase().includes(query)
      );
    });
  }, [studentSearch]);

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
            Loading college details...
          </p>
        </div>
      </main>
    );
  }

  const tabs: Array<{ label: string; value: TabName }> = [
    { label: "Overview", value: "overview" },
    { label: "Departments", value: "departments" },
    { label: "Students", value: "students" },
    { label: "Faculty", value: "faculty" },
    { label: "Assessments", value: "assessments" },
    { label: "Submissions", value: "submissions" },
  ];

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
                  Affiliated College Details
                </h2>

                <p className="hidden text-sm text-slate-500 sm:block">
                  University-level college monitoring
                </p>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              UA
            </div>
          </header>

          <section className="p-5 sm:p-8">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Back to Affiliated Colleges
            </Link>

            {/* College header */}
            <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {college.code}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                        college.affiliationStatus,
                      )}`}
                    >
                      {college.affiliationStatus}
                    </span>
                  </div>

                  <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    {college.name}
                  </h1>

                  <p className="mt-3 text-slate-600">
                    {college.district} · Principal: {college.principal}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    College Administrator: {college.adminEmail}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      alert("College notification sent successfully.")
                    }
                    className="h-11 rounded-xl border border-slate-300 bg-white px-5 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Send Notification
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      alert("College report generated in demo mode.")
                    }
                    className="h-11 rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </section>

            {/* Statistics */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Students
                </p>
                <p className="mt-3 text-3xl font-bold">
                  {college.students.toLocaleString()}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Registered in this college
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Faculty
                </p>
                <p className="mt-3 text-3xl font-bold">
                  {college.faculty}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Active faculty members
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Departments
                </p>
                <p className="mt-3 text-3xl font-bold">
                  {college.departments}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Academic departments
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Open Grievances
                </p>
                <p className="mt-3 text-3xl font-bold text-red-700">
                  {college.grievances}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Awaiting resolution
                </p>
              </article>
            </div>

            {/* Tabs */}
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <div className="flex min-w-max gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveTab(tab.value)}
                    className={
                      activeTab === tab.value
                        ? "rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
                        : "rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview */}
            {activeTab === "overview" && (
              <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold">
                    Academic Progress
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Current academic lifecycle status
                  </p>

                  <div className="mt-7 space-y-6">
                    {[
                      {
                        label: "Student Data Verification",
                        progress: 96,
                      },
                      {
                        label: "Internal Assessment Submission",
                        progress: 88,
                      },
                      {
                        label: "External Evaluation",
                        progress: college.evaluationProgress,
                      },
                      {
                        label: "Result Preparation",
                        progress:
                          college.evaluationProgress > 90 ? 85 : 48,
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-800">
                            {item.label}
                          </p>

                          <strong className="text-blue-700">
                            {item.progress}%
                          </strong>
                        </div>

                        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold">
                    College Status
                  </h2>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">
                        Evaluation Progress
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {college.evaluationProgress}%
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">
                        Result Status
                      </p>

                      <span
                        className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                          college.resultStatus,
                        )}`}
                      >
                        {college.resultStatus}
                      </span>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">
                        Affiliation Status
                      </p>

                      <span
                        className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                          college.affiliationStatus,
                        )}`}
                      >
                        {college.affiliationStatus}
                      </span>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
                  <h2 className="text-xl font-bold">
                    Recent College Activity
                  </h2>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {activities.map((activity) => (
                      <article
                        key={activity.title}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="flex gap-3">
                          <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-blue-600" />

                          <div>
                            <h3 className="font-semibold">
                              {activity.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              {activity.description}
                            </p>

                            <p className="mt-2 text-xs text-slate-400">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Departments */}
            {activeTab === "departments" && (
              <DataTableSection
                title="Departments"
                description="Departments and programmes managed by this college"
                headers={[
                  "Department",
                  "Programme",
                  "Students",
                  "Faculty",
                  "Status",
                ]}
              >
                {departments.map((department) => (
                  <tr
                    key={department.name}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5 font-semibold">
                      {department.name}
                    </td>
                    <td className="px-6 py-5">
                      {department.programme}
                    </td>
                    <td className="px-6 py-5">
                      {department.students}
                    </td>
                    <td className="px-6 py-5">
                      {department.faculty}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                          department.status,
                        )}`}
                      >
                        {department.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </DataTableSection>
            )}

            {/* Students */}
            {activeTab === "students" && (
              <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Students</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Student records submitted by this college
                    </p>
                  </div>

                  <input
                    value={studentSearch}
                    onChange={(event) =>
                      setStudentSearch(event.target.value)
                    }
                    placeholder="Search students"
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600 sm:max-w-xs"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead className="bg-slate-50 text-left">
                      <tr>
                        {[
                          "Register Number",
                          "Student",
                          "Department",
                          "Programme",
                          "Semester",
                          "Status",
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

                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr
                          key={student.registerNumber}
                          className="border-t border-slate-100"
                        >
                          <td className="px-6 py-5 font-semibold">
                            {student.registerNumber}
                          </td>
                          <td className="px-6 py-5">
                            {student.name}
                          </td>
                          <td className="px-6 py-5">
                            {student.department}
                          </td>
                          <td className="px-6 py-5">
                            {student.programme}
                          </td>
                          <td className="px-6 py-5">
                            Semester {student.semester}
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                                student.status,
                              )}`}
                            >
                              {student.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Faculty */}
            {activeTab === "faculty" && (
              <DataTableSection
                title="Faculty Members"
                description="Faculty and current evaluation workload"
                headers={[
                  "Employee ID",
                  "Faculty",
                  "Department",
                  "Assigned Subject",
                  "Workload",
                  "Status",
                ]}
              >
                {faculty.map((member) => (
                  <tr
                    key={member.employeeId}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5 font-semibold">
                      {member.employeeId}
                    </td>
                    <td className="px-6 py-5">
                      {member.name}
                    </td>
                    <td className="px-6 py-5">
                      {member.department}
                    </td>
                    <td className="px-6 py-5">
                      {member.subject}
                    </td>
                    <td className="px-6 py-5">
                      {member.workload} papers
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                          member.status,
                        )}`}
                      >
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </DataTableSection>
            )}

            {/* Assessments */}
            {activeTab === "assessments" && (
              <DataTableSection
                title="Assessments"
                description="Subject-wise assessment and marks submission"
                headers={[
                  "Subject",
                  "Assessment Type",
                  "Students",
                  "Marks Submitted",
                  "Progress",
                  "Verification",
                ]}
              >
                {assessments.map((assessment) => {
                  const progress = Math.round(
                    (assessment.marksSubmitted /
                      assessment.totalStudents) *
                      100,
                  );

                  return (
                    <tr
                      key={assessment.subject}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-5 font-semibold">
                        {assessment.subject}
                      </td>
                      <td className="px-6 py-5">
                        {assessment.type}
                      </td>
                      <td className="px-6 py-5">
                        {assessment.totalStudents}
                      </td>
                      <td className="px-6 py-5">
                        {assessment.marksSubmitted}
                      </td>
                      <td className="px-6 py-5">
                        <div className="w-32">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <strong>{progress}%</strong>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-blue-600"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                            assessment.verification,
                          )}`}
                        >
                          {assessment.verification}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </DataTableSection>
            )}

            {/* Submissions */}
            {activeTab === "submissions" && (
              <DataTableSection
                title="College Submissions"
                description="Documents and academic data submitted to TNTEU"
                headers={[
                  "Submission Type",
                  "Submitted Date",
                  "College Status",
                  "University Status",
                  "Action",
                ]}
              >
                {submissions.map((submission) => (
                  <tr
                    key={submission.type}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5 font-semibold">
                      {submission.type}
                    </td>
                    <td className="px-6 py-5">
                      {submission.submittedDate}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                          submission.collegeStatus,
                        )}`}
                      >
                        {submission.collegeStatus}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                          submission.universityStatus,
                        )}`}
                      >
                        {submission.universityStatus}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            `${submission.type} opened in demo mode.`,
                          )
                        }
                        className="font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </DataTableSection>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

interface DataTableSectionProps {
  title: string;
  description: string;
  headers: string[];
  children: React.ReactNode;
}

function DataTableSection({
  title,
  description,
  headers,
  children,
}: DataTableSectionProps) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-slate-50 text-left">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </div>
    </section>
  );
}