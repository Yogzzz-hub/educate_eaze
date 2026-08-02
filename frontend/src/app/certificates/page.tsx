"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CertificateType =
  | "Mark Statement"
  | "Provisional Certificate"
  | "Degree Certificate"
  | "Course Completion Certificate";

type CertificateStatus =
  | "Pending Generation"
  | "Awaiting Verification"
  | "Verified"
  | "Issued";

interface Certificate {
  id: number;
  certificateId: string;
  studentName: string;
  registerNumber: string;
  collegeName: string;
  certificateType: CertificateType;
  academicYear: string;
  generatedDate: string;
  issueDate: string;
  verificationId: string;
  status: CertificateStatus;
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

const studentOptions = [
  {
    name: "Ananya Raj",
    registerNumber: "TNTEU240001",
    college: "Chennai College of Education",
  },
  {
    name: "Arjun Kumar",
    registerNumber: "TNTEU240002",
    college: "Sri Venkateswara College of Education",
  },
  {
    name: "Meera S",
    registerNumber: "TNTEU240003",
    college: "Tamil Nadu Institute of Teacher Education",
  },
  {
    name: "Rahul K",
    registerNumber: "TNTEU240004",
    college: "Madurai College of Teacher Education",
  },
  {
    name: "Divya P",
    registerNumber: "TNTEU240005",
    college: "Salem Institute of Education",
  },
];

const initialCertificates: Certificate[] = [
  {
    id: 1,
    certificateId: "TNTEU-CERT-2026-001",
    studentName: "Ananya Raj",
    registerNumber: "TNTEU240001",
    collegeName: "Chennai College of Education",
    certificateType: "Mark Statement",
    academicYear: "2025–2026",
    generatedDate: "02 Aug 2026",
    issueDate: "03 Aug 2026",
    verificationId: "VER-TNTEU-8A1201",
    status: "Issued",
  },
  {
    id: 2,
    certificateId: "TNTEU-CERT-2026-002",
    studentName: "Arjun Kumar",
    registerNumber: "TNTEU240002",
    collegeName: "Sri Venkateswara College of Education",
    certificateType: "Provisional Certificate",
    academicYear: "2025–2026",
    generatedDate: "02 Aug 2026",
    issueDate: "Not issued",
    verificationId: "VER-TNTEU-8A1202",
    status: "Verified",
  },
  {
    id: 3,
    certificateId: "TNTEU-CERT-2026-003",
    studentName: "Meera S",
    registerNumber: "TNTEU240003",
    collegeName: "Tamil Nadu Institute of Teacher Education",
    certificateType: "Course Completion Certificate",
    academicYear: "2025–2026",
    generatedDate: "01 Aug 2026",
    issueDate: "Not issued",
    verificationId: "VER-TNTEU-8A1203",
    status: "Awaiting Verification",
  },
  {
    id: 4,
    certificateId: "TNTEU-CERT-2026-004",
    studentName: "Rahul K",
    registerNumber: "TNTEU240004",
    collegeName: "Madurai College of Teacher Education",
    certificateType: "Mark Statement",
    academicYear: "2025–2026",
    generatedDate: "31 Jul 2026",
    issueDate: "01 Aug 2026",
    verificationId: "VER-TNTEU-8A1204",
    status: "Issued",
  },
  {
    id: 5,
    certificateId: "TNTEU-CERT-2026-005",
    studentName: "Divya P",
    registerNumber: "TNTEU240005",
    collegeName: "Salem Institute of Education",
    certificateType: "Degree Certificate",
    academicYear: "2025–2026",
    generatedDate: "Not generated",
    issueDate: "Not issued",
    verificationId: "Pending",
    status: "Pending Generation",
  },
];

function statusClass(status: CertificateStatus) {
  if (status === "Issued") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Verified") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "Awaiting Verification") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-200 text-slate-700";
}

function todayDate() {
  return new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CertificatesPage() {
  const router = useRouter();

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [certificates, setCertificates] =
    useState<Certificate[]>(initialCertificates);

  const [search, setSearch] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const [selectedCollege, setSelectedCollege] = useState(
    collegeOptions[0],
  );

  const [selectedStudentRegister, setSelectedStudentRegister] =
    useState(studentOptions[0].registerNumber);

  const [selectedCertificateType, setSelectedCertificateType] =
    useState<CertificateType>("Mark Statement");

  const [academicYear, setAcademicYear] =
    useState("2025–2026");

  const [issueDate, setIssueDate] = useState("2026-08-02");
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

  const availableStudents = useMemo(() => {
    return studentOptions.filter(
      (student) => student.college === selectedCollege,
    );
  }, [selectedCollege]);

  useEffect(() => {
    if (availableStudents.length > 0) {
      setSelectedStudentRegister(
        availableStudents[0].registerNumber,
      );
    }
  }, [availableStudents]);

  const filteredCertificates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return certificates.filter((certificate) => {
      const matchesSearch =
        certificate.studentName.toLowerCase().includes(query) ||
        certificate.registerNumber.toLowerCase().includes(query) ||
        certificate.certificateId.toLowerCase().includes(query) ||
        certificate.verificationId.toLowerCase().includes(query);

      const matchesCollege =
        collegeFilter === "All" ||
        certificate.collegeName === collegeFilter;

      const matchesType =
        typeFilter === "All" ||
        certificate.certificateType === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        certificate.status === statusFilter;

      return (
        matchesSearch &&
        matchesCollege &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    certificates,
    collegeFilter,
    search,
    statusFilter,
    typeFilter,
  ]);

  const generatedCount = certificates.filter(
    (certificate) =>
      certificate.status !== "Pending Generation",
  ).length;

  const pendingGenerationCount = certificates.filter(
    (certificate) =>
      certificate.status === "Pending Generation",
  ).length;

  const awaitingVerificationCount = certificates.filter(
    (certificate) =>
      certificate.status === "Awaiting Verification",
  ).length;

  const issuedCount = certificates.filter(
    (certificate) => certificate.status === "Issued",
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("eduease_logged_in");
    localStorage.removeItem("eduease_user");
    sessionStorage.removeItem("eduease_logged_in");

    router.push("/login");
  };

  const handleGenerateCertificate = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const student = studentOptions.find(
      (item) =>
        item.registerNumber === selectedStudentRegister,
    );

    if (!student) {
      alert("Please select a student.");
      return;
    }

    const uniqueNumber = Date.now();
    const certificateId = `TNTEU-CERT-2026-${String(
      certificates.length + 1,
    ).padStart(3, "0")}`;

    const verificationId = `VER-TNTEU-${String(
      uniqueNumber,
    ).slice(-6)}`;

    const newCertificate: Certificate = {
      id: uniqueNumber,
      certificateId,
      studentName: student.name,
      registerNumber: student.registerNumber,
      collegeName: student.college,
      certificateType: selectedCertificateType,
      academicYear,
      generatedDate: todayDate(),
      issueDate: "Not issued",
      verificationId,
      status: "Awaiting Verification",
    };

    setCertificates((current) => [
      newCertificate,
      ...current,
    ]);

    setShowGenerateModal(false);

    setSuccessMessage(
      `${selectedCertificateType} generated for ${student.name}.`,
    );
  };

  const verifyCertificate = (certificateId: number) => {
    setCertificates((current) =>
      current.map((certificate) =>
        certificate.id === certificateId
          ? {
              ...certificate,
              status: "Verified",
            }
          : certificate,
      ),
    );

    setSelectedCertificate((current) =>
      current
        ? {
            ...current,
            status: "Verified",
          }
        : null,
    );

    setSuccessMessage(
      "Certificate verified successfully by TNTEU.",
    );
  };

  const issueCertificate = (certificateId: number) => {
    setCertificates((current) =>
      current.map((certificate) =>
        certificate.id === certificateId
          ? {
              ...certificate,
              status: "Issued",
              issueDate: todayDate(),
            }
          : certificate,
      ),
    );

    setSelectedCertificate((current) =>
      current
        ? {
            ...current,
            status: "Issued",
            issueDate: todayDate(),
          }
        : null,
    );

    setSuccessMessage(
      "Certificate issued successfully to the student.",
    );
  };

  const downloadCertificate = (certificate: Certificate) => {
    const certificateContent = `
TAMIL NADU TEACHERS EDUCATION UNIVERSITY

${certificate.certificateType}

Certificate ID: ${certificate.certificateId}
Verification ID: ${certificate.verificationId}

This is to certify that ${certificate.studentName}
Register Number: ${certificate.registerNumber}

from ${certificate.collegeName}

has successfully completed the academic requirements
for the academic year ${certificate.academicYear}.

Generated Date: ${certificate.generatedDate}
Issue Date: ${certificate.issueDate}
Status: ${certificate.status}

This is a demo certificate generated by EduEase.
`;

    const blob = new Blob([certificateContent], {
      type: "text/plain",
    });

    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = downloadUrl;
    anchor.download = `${certificate.certificateId}.txt`;
    anchor.click();

    URL.revokeObjectURL(downloadUrl);

    setSuccessMessage(
      `${certificate.certificateType} downloaded successfully.`,
    );
  };

  if (isCheckingLogin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading certificate management...
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
                  item.href === "/certificates"
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

        {/* Mobile sidebar */}
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
                      item.href === "/certificates"
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

        {/* Main section */}
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
                  University Certificate Management
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
            {/* Heading */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Digital Certificate Lifecycle
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Certificates
                </h1>

                <p className="mt-3 max-w-3xl text-slate-600">
                  Generate, verify, issue and track student
                  certificates across affiliated colleges.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowGenerateModal(true)}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700"
              >
                Generate Certificate
              </button>
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
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Certificates Generated
                </p>

                <p className="mt-3 text-3xl font-bold">
                  {generatedCount}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Across all colleges
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Pending Generation
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-700">
                  {pendingGenerationCount}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Waiting for result approval
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Awaiting Verification
                </p>

                <p className="mt-3 text-3xl font-bold text-amber-700">
                  {awaitingVerificationCount}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Requires university review
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Certificates Issued
                </p>

                <p className="mt-3 text-3xl font-bold text-green-700">
                  {issuedCount}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Available to students
                </p>
              </article>
            </div>

            {/* Filters */}
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Search certificate
                  </label>

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Student, register or certificate ID"
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
                    Certificate type
                  </label>

                  <select
                    value={typeFilter}
                    onChange={(event) =>
                      setTypeFilter(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                  >
                    <option value="All">All types</option>
                    <option value="Mark Statement">
                      Mark Statement
                    </option>
                    <option value="Provisional Certificate">
                      Provisional Certificate
                    </option>
                    <option value="Degree Certificate">
                      Degree Certificate
                    </option>
                    <option value="Course Completion Certificate">
                      Course Completion Certificate
                    </option>
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
                    <option value="Pending Generation">
                      Pending Generation
                    </option>
                    <option value="Awaiting Verification">
                      Awaiting Verification
                    </option>
                    <option value="Verified">Verified</option>
                    <option value="Issued">Issued</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Certificate table */}
            <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold">
                    Student Certificates
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Showing {filteredCertificates.length} certificates
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  University View
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1500px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      {[
                        "Certificate ID",
                        "Student",
                        "Register Number",
                        "College",
                        "Certificate Type",
                        "Generated",
                        "Verification ID",
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
                    {filteredCertificates.map((certificate) => (
                      <tr
                        key={certificate.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5 font-semibold text-blue-700">
                          {certificate.certificateId}
                        </td>

                        <td className="px-6 py-5 font-bold">
                          {certificate.studentName}
                        </td>

                        <td className="px-6 py-5">
                          {certificate.registerNumber}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-700">
                          {certificate.collegeName}
                        </td>

                        <td className="px-6 py-5">
                          {certificate.certificateType}
                        </td>

                        <td className="px-6 py-5">
                          {certificate.generatedDate}
                        </td>

                        <td className="px-6 py-5 font-mono text-xs">
                          {certificate.verificationId}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                              certificate.status,
                            )}`}
                          >
                            {certificate.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedCertificate(certificate)
                            }
                            disabled={
                              certificate.status ===
                              "Pending Generation"
                            }
                            className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                          >
                            Preview
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

      {/* Generate certificate modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">
                  Generate Certificate
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a digital certificate for a student.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowGenerateModal(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <form
              onSubmit={handleGenerateCertificate}
              className="grid gap-5 p-6 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  College
                </label>

                <select
                  value={selectedCollege}
                  onChange={(event) =>
                    setSelectedCollege(event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                >
                  {collegeOptions.map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Student
                </label>

                <select
                  value={selectedStudentRegister}
                  onChange={(event) =>
                    setSelectedStudentRegister(event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                >
                  {availableStudents.map((student) => (
                    <option
                      key={student.registerNumber}
                      value={student.registerNumber}
                    >
                      {student.name} — {student.registerNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Certificate type
                </label>

                <select
                  value={selectedCertificateType}
                  onChange={(event) =>
                    setSelectedCertificateType(
                      event.target.value as CertificateType,
                    )
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                >
                  <option>Mark Statement</option>
                  <option>Provisional Certificate</option>
                  <option>Degree Certificate</option>
                  <option>Course Completion Certificate</option>
                </select>
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

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Proposed issue date
                </label>

                <input
                  type="date"
                  value={issueDate}
                  onChange={(event) =>
                    setIssueDate(event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 px-4"
                />
              </div>

              <div className="flex gap-3 border-t border-slate-200 pt-5 sm:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="h-11 flex-1 rounded-xl border border-slate-300 font-semibold text-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-11 flex-1 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
                >
                  Generate Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate preview */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4">
          <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">
                  Certificate Preview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedCertificate.certificateId}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <div className="p-6">
              <section className="mx-auto max-w-4xl border-[10px] border-double border-slate-800 bg-white px-8 py-12 text-center shadow-lg sm:px-14">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-700">
                  Government of Tamil Nadu
                </p>

                <h1 className="mt-4 text-3xl font-bold uppercase tracking-wide text-slate-950 sm:text-4xl">
                  Tamil Nadu Teachers Education University
                </h1>

                <p className="mt-3 text-sm text-slate-500">
                  Chennai, Tamil Nadu
                </p>

                <div className="mx-auto mt-8 h-px max-w-xl bg-slate-300" />

                <h2 className="mt-8 text-2xl font-bold uppercase text-blue-700">
                  {selectedCertificate.certificateType}
                </h2>

                <p className="mt-10 text-lg leading-9 text-slate-700">
                  This is to certify that
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-950">
                  {selectedCertificate.studentName}
                </p>

                <p className="mt-3 text-slate-600">
                  Register Number:{" "}
                  <strong>
                    {selectedCertificate.registerNumber}
                  </strong>
                </p>

                <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-slate-700">
                  from{" "}
                  <strong>
                    {selectedCertificate.collegeName}
                  </strong>{" "}
                  has successfully completed the required academic
                  programme for the academic year{" "}
                  <strong>
                    {selectedCertificate.academicYear}
                  </strong>
                  .
                </p>

                <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:items-end">
                  <div className="text-left">
                    <p className="text-xs text-slate-500">
                      Certificate ID
                    </p>

                    <p className="mt-2 text-sm font-bold">
                      {selectedCertificate.certificateId}
                    </p>

                    <p className="mt-4 text-xs text-slate-500">
                      Verification ID
                    </p>

                    <p className="mt-2 font-mono text-sm font-bold">
                      {selectedCertificate.verificationId}
                    </p>
                  </div>

                  <div className="mx-auto">
                    <div className="grid h-28 w-28 grid-cols-5 gap-1 border-4 border-slate-900 bg-white p-2">
                      {Array.from({ length: 25 }).map(
                        (_, index) => (
                          <div
                            key={index}
                            className={
                              index % 3 === 0 ||
                              index % 7 === 0
                                ? "bg-slate-900"
                                : "bg-white"
                            }
                          />
                        ),
                      )}
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      Verification QR
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto h-px w-40 bg-slate-500" />

                    <p className="mt-2 font-semibold">
                      Controller of Examinations
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      TNTEU
                    </p>
                  </div>
                </div>
              </section>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    downloadCertificate(selectedCertificate)
                  }
                  className="h-11 rounded-xl border border-slate-300 px-5 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Download
                </button>

                {selectedCertificate.status ===
                  "Awaiting Verification" && (
                  <button
                    type="button"
                    onClick={() =>
                      verifyCertificate(selectedCertificate.id)
                    }
                    className="h-11 rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700"
                  >
                    Verify Certificate
                  </button>
                )}

                {selectedCertificate.status === "Verified" && (
                  <button
                    type="button"
                    onClick={() =>
                      issueCertificate(selectedCertificate.id)
                    }
                    className="h-11 rounded-xl bg-green-600 px-5 font-semibold text-white hover:bg-green-700"
                  >
                    Issue Certificate
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