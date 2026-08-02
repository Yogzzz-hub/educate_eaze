"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type GrievancePriority = "Low" | "Medium" | "High" | "Urgent";

type GrievanceStatus =
  | "Submitted"
  | "Under Review"
  | "Assigned"
  | "In Progress"
  | "Resolved"
  | "Rejected";

interface TimelineItem {
  title: string;
  description: string;
  date: string;
}

interface Grievance {
  id: number;
  grievanceId: string;
  studentName: string;
  registerNumber: string;
  collegeName: string;
  collegeCode: string;
  category: string;
  priority: GrievancePriority;
  submittedDate: string;
  assignedOfficer: string;
  status: GrievanceStatus;
  description: string;
  collegeResponse: string;
  resolutionNotes: string;
  timeline: TimelineItem[];
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

const collegeOptions = [
  "Chennai College of Education",
  "Sri Venkateswara College of Education",
  "Tamil Nadu Institute of Teacher Education",
  "Madurai College of Teacher Education",
  "Salem Institute of Education",
  "Trichy College of Education",
];

const categoryOptions = [
  "Assessment Issue",
  "Mark Discrepancy",
  "Result Correction",
  "Certificate Delay",
  "Examination Issue",
  "General Academic Issue",
];

const officerOptions = [
  "Not Assigned",
  "Dr. S. Kavitha",
  "Mr. R. Arun",
  "Dr. P. Nandhini",
  "Mrs. K. Revathi",
];

const initialGrievances: Grievance[] = [
  {
    id: 1,
    grievanceId: "GRV-2026-1001",
    studentName: "Ananya Raj",
    registerNumber: "TNTEU240001",
    collegeName: "Chennai College of Education",
    collegeCode: "TNTEU-C001",
    category: "Mark Discrepancy",
    priority: "High",
    submittedDate: "02 Aug 2026",
    assignedOfficer: "Dr. S. Kavitha",
    status: "In Progress",
    description:
      "The internal assessment mark shown in the portal is different from the mark communicated by the college.",
    collegeResponse:
      "The college examination cell is verifying the submitted internal marks.",
    resolutionNotes: "Awaiting corrected marks from the college.",
    timeline: [
      {
        title: "Grievance submitted",
        description: "Student submitted a mark discrepancy request.",
        date: "02 Aug 2026 · 09:30 AM",
      },
      {
        title: "Assigned to officer",
        description: "The case was assigned to Dr. S. Kavitha.",
        date: "02 Aug 2026 · 10:10 AM",
      },
      {
        title: "College response requested",
        description: "The affiliated college was asked to verify marks.",
        date: "02 Aug 2026 · 11:20 AM",
      },
    ],
  },
  {
    id: 2,
    grievanceId: "GRV-2026-1002",
    studentName: "Arjun Kumar",
    registerNumber: "TNTEU240002",
    collegeName: "Sri Venkateswara College of Education",
    collegeCode: "TNTEU-C002",
    category: "Certificate Delay",
    priority: "Medium",
    submittedDate: "01 Aug 2026",
    assignedOfficer: "Mr. R. Arun",
    status: "Assigned",
    description:
      "The provisional certificate has not been issued even though the result was published.",
    collegeResponse:
      "Student eligibility and fee clearance details were submitted to TNTEU.",
    resolutionNotes: "Certificate verification is pending.",
    timeline: [
      {
        title: "Grievance submitted",
        description: "Student reported a provisional certificate delay.",
        date: "01 Aug 2026 · 02:20 PM",
      },
      {
        title: "College response received",
        description: "College confirmed student eligibility.",
        date: "01 Aug 2026 · 05:10 PM",
      },
      {
        title: "Assigned to officer",
        description: "The case was assigned to Mr. R. Arun.",
        date: "02 Aug 2026 · 09:00 AM",
      },
    ],
  },
  {
    id: 3,
    grievanceId: "GRV-2026-1003",
    studentName: "Meera S",
    registerNumber: "TNTEU240003",
    collegeName: "Tamil Nadu Institute of Teacher Education",
    collegeCode: "TNTEU-C003",
    category: "Result Correction",
    priority: "Urgent",
    submittedDate: "30 Jul 2026",
    assignedOfficer: "Dr. P. Nandhini",
    status: "Under Review",
    description:
      "One subject result is displayed as absent even though the student attended the examination.",
    collegeResponse:
      "Attendance register and hall ticket copy have been submitted.",
    resolutionNotes: "University attendance record verification is pending.",
    timeline: [
      {
        title: "Grievance submitted",
        description: "Student reported an incorrect absent status.",
        date: "30 Jul 2026 · 03:15 PM",
      },
      {
        title: "Evidence uploaded",
        description: "College uploaded the attendance register.",
        date: "31 Jul 2026 · 11:45 AM",
      },
      {
        title: "University review started",
        description: "The examination record is being verified.",
        date: "01 Aug 2026 · 10:30 AM",
      },
    ],
  },
  {
    id: 4,
    grievanceId: "GRV-2026-1004",
    studentName: "Rahul K",
    registerNumber: "TNTEU240004",
    collegeName: "Madurai College of Teacher Education",
    collegeCode: "TNTEU-C004",
    category: "Examination Issue",
    priority: "Low",
    submittedDate: "29 Jul 2026",
    assignedOfficer: "Mrs. K. Revathi",
    status: "Resolved",
    description:
      "The examination centre information was not displayed in the student portal.",
    collegeResponse:
      "The centre information was updated and communicated to the student.",
    resolutionNotes:
      "The centre details were corrected and the student was notified.",
    timeline: [
      {
        title: "Grievance submitted",
        description: "Student reported missing examination centre details.",
        date: "29 Jul 2026 · 09:20 AM",
      },
      {
        title: "College response received",
        description: "The college corrected the examination centre.",
        date: "29 Jul 2026 · 12:40 PM",
      },
      {
        title: "Grievance resolved",
        description: "Student was notified about the updated centre.",
        date: "29 Jul 2026 · 02:10 PM",
      },
    ],
  },
  {
    id: 5,
    grievanceId: "GRV-2026-1005",
    studentName: "Divya P",
    registerNumber: "TNTEU240005",
    collegeName: "Salem Institute of Education",
    collegeCode: "TNTEU-C005",
    category: "Assessment Issue",
    priority: "High",
    submittedDate: "28 Jul 2026",
    assignedOfficer: "Not Assigned",
    status: "Submitted",
    description:
      "The practical assessment mark has not been uploaded by the college.",
    collegeResponse: "No response received from the college.",
    resolutionNotes: "The grievance requires officer assignment.",
    timeline: [
      {
        title: "Grievance submitted",
        description: "Student reported missing practical assessment marks.",
        date: "28 Jul 2026 · 04:30 PM",
      },
    ],
  },
  {
    id: 6,
    grievanceId: "GRV-2026-1006",
    studentName: "Naveen R",
    registerNumber: "TNTEU240006",
    collegeName: "Trichy College of Education",
    collegeCode: "TNTEU-C006",
    category: "General Academic Issue",
    priority: "Medium",
    submittedDate: "27 Jul 2026",
    assignedOfficer: "Mr. R. Arun",
    status: "Rejected",
    description:
      "The student requested a programme transfer after the permitted deadline.",
    collegeResponse:
      "The transfer request was submitted after the university deadline.",
    resolutionNotes:
      "The request was rejected because the deadline had passed.",
    timeline: [
      {
        title: "Grievance submitted",
        description: "Student requested a programme transfer.",
        date: "27 Jul 2026 · 10:00 AM",
      },
      {
        title: "College response received",
        description: "The college confirmed that the deadline had passed.",
        date: "27 Jul 2026 · 02:15 PM",
      },
      {
        title: "Grievance rejected",
        description: "The request did not satisfy university rules.",
        date: "28 Jul 2026 · 11:30 AM",
      },
    ],
  },
];

function statusClass(status: GrievanceStatus) {
  if (status === "Resolved") {
    return "bg-green-100 text-green-700";
  }

  if (status === "In Progress") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "Assigned" || status === "Under Review") {
    return "bg-cyan-100 text-cyan-700";
  }

  if (status === "Rejected") {
    return "bg-red-100 text-red-700";
  }

  return "bg-amber-100 text-amber-700";
}

function priorityClass(priority: GrievancePriority) {
  if (priority === "Urgent") {
    return "bg-red-100 text-red-700";
  }

  if (priority === "High") {
    return "bg-orange-100 text-orange-700";
  }

  if (priority === "Medium") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-200 text-slate-700";
}

function currentDateTime() {
  return new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function GrievancesPage() {
  const router = useRouter();

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [grievances, setGrievances] =
    useState<Grievance[]>(initialGrievances);

  const [search, setSearch] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedGrievance, setSelectedGrievance] =
    useState<Grievance | null>(null);

  const [selectedOfficer, setSelectedOfficer] =
    useState("Dr. S. Kavitha");

  const [resolutionNote, setResolutionNote] = useState("");
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

  const filteredGrievances = useMemo(() => {
    const query = search.trim().toLowerCase();

    return grievances.filter((grievance) => {
      const matchesSearch =
        grievance.grievanceId.toLowerCase().includes(query) ||
        grievance.studentName.toLowerCase().includes(query) ||
        grievance.registerNumber.toLowerCase().includes(query) ||
        grievance.collegeName.toLowerCase().includes(query);

      const matchesCollege =
        collegeFilter === "All" ||
        grievance.collegeName === collegeFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        grievance.category === categoryFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        grievance.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All" ||
        grievance.status === statusFilter;

      return (
        matchesSearch &&
        matchesCollege &&
        matchesCategory &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [
    grievances,
    search,
    collegeFilter,
    categoryFilter,
    priorityFilter,
    statusFilter,
  ]);

  const totalGrievances = grievances.length;

  const openGrievances = grievances.filter(
    (grievance) =>
      grievance.status !== "Resolved" &&
      grievance.status !== "Rejected",
  ).length;

  const inProgressGrievances = grievances.filter(
    (grievance) => grievance.status === "In Progress",
  ).length;

  const resolvedGrievances = grievances.filter(
    (grievance) => grievance.status === "Resolved",
  ).length;

  const highPriorityGrievances = grievances.filter(
    (grievance) =>
      grievance.priority === "High" ||
      grievance.priority === "Urgent",
  ).length;

  const unassignedGrievances = grievances.filter(
    (grievance) => grievance.assignedOfficer === "Not Assigned",
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("eduease_logged_in");
    localStorage.removeItem("eduease_user");
    sessionStorage.removeItem("eduease_logged_in");

    router.push("/login");
  };

  const updateGrievance = (
    id: number,
    updates: Partial<Grievance>,
  ) => {
    setGrievances((current) =>
      current.map((grievance) =>
        grievance.id === id
          ? {
              ...grievance,
              ...updates,
            }
          : grievance,
      ),
    );

    setSelectedGrievance((current) =>
      current && current.id === id
        ? {
            ...current,
            ...updates,
          }
        : current,
    );
  };

  const assignOfficer = () => {
    if (!selectedGrievance) {
      return;
    }

    const newTimeline: TimelineItem[] = [
      ...selectedGrievance.timeline,
      {
        title: "Officer assigned",
        description: `The grievance was assigned to ${selectedOfficer}.`,
        date: currentDateTime(),
      },
    ];

    updateGrievance(selectedGrievance.id, {
      assignedOfficer: selectedOfficer,
      status: "Assigned",
      timeline: newTimeline,
    });

    setSuccessMessage(
      `Grievance assigned to ${selectedOfficer}.`,
    );
  };

  const requestCollegeResponse = () => {
    if (!selectedGrievance) {
      return;
    }

    const newTimeline: TimelineItem[] = [
      ...selectedGrievance.timeline,
      {
        title: "College response requested",
        description:
          "TNTEU requested supporting documents and a formal response from the college.",
        date: currentDateTime(),
      },
    ];

    updateGrievance(selectedGrievance.id, {
      status: "Under Review",
      timeline: newTimeline,
    });

    setSuccessMessage(
      `Response requested from ${selectedGrievance.collegeName}.`,
    );
  };

  const moveToProgress = () => {
    if (!selectedGrievance) {
      return;
    }

    const newTimeline: TimelineItem[] = [
      ...selectedGrievance.timeline,
      {
        title: "Investigation started",
        description:
          "The university officer started reviewing the grievance.",
        date: currentDateTime(),
      },
    ];

    updateGrievance(selectedGrievance.id, {
      status: "In Progress",
      timeline: newTimeline,
    });

    setSuccessMessage("Grievance moved to In Progress.");
  };

  const resolveGrievance = () => {
    if (!selectedGrievance) {
      return;
    }

    if (!resolutionNote.trim()) {
      alert("Enter resolution notes before resolving.");
      return;
    }

    const confirmed = window.confirm(
      `Resolve ${selectedGrievance.grievanceId}?`,
    );

    if (!confirmed) {
      return;
    }

    const newTimeline: TimelineItem[] = [
      ...selectedGrievance.timeline,
      {
        title: "Grievance resolved",
        description: resolutionNote.trim(),
        date: currentDateTime(),
      },
    ];

    updateGrievance(selectedGrievance.id, {
      status: "Resolved",
      resolutionNotes: resolutionNote.trim(),
      timeline: newTimeline,
    });

    setResolutionNote("");
    setSuccessMessage("Grievance resolved successfully.");
  };

  if (isCheckingLogin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading grievances...
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
                  item.href === "/grievances"
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
                      item.href === "/grievances"
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
                  University Grievance Management
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
                Transparent Resolution Workflow
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Grievances
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Monitor student grievances from affiliated colleges,
                assign responsible officers and track each case until
                resolution.
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
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
              {[
                {
                  title: "Total",
                  value: totalGrievances,
                  description: "All grievances",
                  textClass: "text-slate-950",
                },
                {
                  title: "Open",
                  value: openGrievances,
                  description: "Awaiting closure",
                  textClass: "text-amber-700",
                },
                {
                  title: "In Progress",
                  value: inProgressGrievances,
                  description: "Under investigation",
                  textClass: "text-blue-700",
                },
                {
                  title: "Resolved",
                  value: resolvedGrievances,
                  description: "Successfully closed",
                  textClass: "text-green-700",
                },
                {
                  title: "High Priority",
                  value: highPriorityGrievances,
                  description: "High or urgent",
                  textClass: "text-red-700",
                },
                {
                  title: "Unassigned",
                  value: unassignedGrievances,
                  description: "Officer required",
                  textClass: "text-orange-700",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-500">
                    {item.title}
                  </p>

                  <p
                    className={`mt-3 text-3xl font-bold ${item.textClass}`}
                  >
                    {item.value}
                  </p>

                  <p className="mt-3 text-xs text-slate-500">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            {/* Filters */}
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Search grievance
                  </label>

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="ID, student or register number"
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    College
                  </label>

                  <select
                    value={collegeFilter}
                    onChange={(event) =>
                      setCollegeFilter(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                  >
                    <option value="All">All colleges</option>

                    {collegeOptions.map((college) => (
                      <option key={college} value={college}>
                        {college}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category
                  </label>

                  <select
                    value={categoryFilter}
                    onChange={(event) =>
                      setCategoryFilter(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                  >
                    <option value="All">All categories</option>

                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Priority
                  </label>

                  <select
                    value={priorityFilter}
                    onChange={(event) =>
                      setPriorityFilter(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                  >
                    <option value="All">All priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                  >
                    <option value="All">All statuses</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">
                      Under Review
                    </option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">
                      In Progress
                    </option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Grievance table */}
            <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold">
                    Student Grievances
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Showing {filteredGrievances.length} grievances
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  University View
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1600px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      {[
                        "Grievance ID",
                        "Student",
                        "College",
                        "Category",
                        "Priority",
                        "Submitted",
                        "Assigned Officer",
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
                    {filteredGrievances.map((grievance) => (
                      <tr
                        key={grievance.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5 font-bold text-blue-700">
                          {grievance.grievanceId}
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-bold">
                            {grievance.studentName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {grievance.registerNumber}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm font-semibold">
                            {grievance.collegeName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {grievance.collegeCode}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm">
                          {grievance.category}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityClass(
                              grievance.priority,
                            )}`}
                          >
                            {grievance.priority}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm">
                          {grievance.submittedDate}
                        </td>

                        <td className="px-6 py-5 text-sm font-semibold">
                          {grievance.assignedOfficer}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                              grievance.status,
                            )}`}
                          >
                            {grievance.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedGrievance(grievance);

                              setSelectedOfficer(
                                grievance.assignedOfficer ===
                                  "Not Assigned"
                                  ? "Dr. S. Kavitha"
                                  : grievance.assignedOfficer,
                              );

                              setResolutionNote(
                                grievance.resolutionNotes,
                              );
                            }}
                            className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                          >
                            View Case
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

      {/* Grievance details modal */}
      {selectedGrievance && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4">
          <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-bold text-blue-700">
                    {selectedGrievance.grievanceId}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityClass(
                      selectedGrievance.priority,
                    )}`}
                  >
                    {selectedGrievance.priority}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                      selectedGrievance.status,
                    )}`}
                  >
                    {selectedGrievance.status}
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-bold">
                  {selectedGrievance.category}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedGrievance(null)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <div className="grid gap-6 p-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <section className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-bold">
                    Student and College Information
                  </h3>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">
                        Student
                      </p>

                      <p className="mt-2 font-bold">
                        {selectedGrievance.studentName}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {selectedGrievance.registerNumber}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">
                        College
                      </p>

                      <p className="mt-2 font-bold">
                        {selectedGrievance.collegeName}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {selectedGrievance.collegeCode}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-bold">
                    Grievance Description
                  </h3>

                  <p className="mt-4 leading-7 text-slate-700">
                    {selectedGrievance.description}
                  </p>

                  <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                    <p className="font-semibold text-slate-700">
                      Uploaded Evidence
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Supporting document placeholder.pdf
                    </p>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-bold">
                    College Response
                  </h3>

                  <p className="mt-4 leading-7 text-slate-700">
                    {selectedGrievance.collegeResponse}
                  </p>
                </section>

                <section className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-bold">
                    University Resolution Notes
                  </h3>

                  <textarea
                    value={resolutionNote}
                    onChange={(event) =>
                      setResolutionNote(event.target.value)
                    }
                    rows={4}
                    placeholder="Enter resolution details..."
                    className="mt-4 w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-bold">
                    Case Assignment
                  </h3>

                  <label className="mt-5 block text-sm font-semibold text-slate-700">
                    Assigned officer
                  </label>

                  <select
                    value={selectedOfficer}
                    onChange={(event) =>
                      setSelectedOfficer(event.target.value)
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                  >
                    {officerOptions
                      .filter(
                        (officer) => officer !== "Not Assigned",
                      )
                      .map((officer) => (
                        <option key={officer} value={officer}>
                          {officer}
                        </option>
                      ))}
                  </select>

                  <button
                    type="button"
                    onClick={assignOfficer}
                    className="mt-4 h-11 w-full rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
                  >
                    Assign Officer
                  </button>
                </section>

                <section className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-bold">
                    Status Timeline
                  </h3>

                  <div className="mt-6 space-y-5">
                    {selectedGrievance.timeline.map(
                      (timelineItem, index) => (
                        <article
                          key={`${timelineItem.title}-${index}`}
                          className="flex gap-4"
                        >
                          <div className="flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full bg-blue-600" />

                            {index <
                              selectedGrievance.timeline.length -
                                1 && (
                              <div className="mt-2 h-full min-h-12 w-px bg-slate-200" />
                            )}
                          </div>

                          <div className="pb-2">
                            <p className="font-semibold">
                              {timelineItem.title}
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-600">
                              {timelineItem.description}
                            </p>

                            <p className="mt-2 text-xs text-slate-400">
                              {timelineItem.date}
                            </p>
                          </div>
                        </article>
                      ),
                    )}
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-bold">
                    Case Actions
                  </h3>

                  <div className="mt-5 space-y-3">
                    <button
                      type="button"
                      onClick={requestCollegeResponse}
                      disabled={
                        selectedGrievance.status === "Resolved" ||
                        selectedGrievance.status === "Rejected"
                      }
                      className="h-11 w-full rounded-xl border border-blue-200 bg-blue-50 font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Request College Response
                    </button>

                    <button
                      type="button"
                      onClick={moveToProgress}
                      disabled={
                        selectedGrievance.status === "Resolved" ||
                        selectedGrievance.status === "Rejected"
                      }
                      className="h-11 w-full rounded-xl border border-cyan-200 bg-cyan-50 font-semibold text-cyan-700 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Move to In Progress
                    </button>

                    <button
                      type="button"
                      onClick={resolveGrievance}
                      disabled={
                        selectedGrievance.status === "Resolved" ||
                        selectedGrievance.status === "Rejected"
                      }
                      className="h-11 w-full rounded-xl bg-green-600 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Resolve Grievance
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}