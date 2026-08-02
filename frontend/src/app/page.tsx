import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Student Management",
    description:
      "Maintain student profiles, registration details, departments and academic records in one place.",
  },
  {
    number: "02",
    title: "Examination Management",
    description:
      "Schedule examinations, assign subjects and manage the complete examination lifecycle.",
  },
  {
    number: "03",
    title: "Digital Evaluation",
    description:
      "Enter internal and external marks with automatic total, grade and result calculation.",
  },
  {
    number: "04",
    title: "Result Publication",
    description:
      "Review, approve and publish results faster with reduced manual errors and delays.",
  },
];

const stats = [
  { value: "24", label: "Affiliated Colleges" },
  { value: "3,240", label: "Students" },
  { value: "186", label: "Faculty Members" },
  { value: "12", label: "Active Examinations" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              E
            </div>

            <div>
              <h1 className="text-xl font-bold">EduEase</h1>
              <p className="text-xs text-slate-500">
                Academic Management Platform
              </p>
            </div>
          </div>

          <Link
            href="/login"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-600 hover:text-blue-600"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Unified Digital Academic Platform
          </span>

          <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            One platform for complete academic management
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            EduEase helps universities and affiliated colleges manage
            students, examinations, evaluations, results and grievances
            through one connected digital system.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Login to Platform
            </Link>

            <Link
              href="/dashboard"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-blue-600 hover:text-blue-600"
            >
              View Demo Dashboard
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600">
            <span>✓ Reduced manual work</span>
            <span>✓ Faster processing</span>
            <span>✓ Fewer data-entry errors</span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70">
          <div className="flex items-start justify-between border-b border-slate-100 pb-5">
            <div>
              <p className="text-sm text-slate-500">Academic Overview</p>
              <h3 className="mt-1 text-xl font-bold">
                University Dashboard
              </h3>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              System Active
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
              >
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  Evaluation Progress
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Semester examination evaluation
                </p>
              </div>

              <span className="font-bold text-blue-700">78%</span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-100">
              <div className="h-full w-[78%] rounded-full bg-blue-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem and solution */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Existing problem
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              Manual processes create delays and repeated work
            </h3>

            <p className="mt-5 leading-7 text-slate-600">
              Universities and colleges often maintain student data,
              examination schedules, marks, results and grievances across
              separate files and manual processes.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-700">
              EduEase solution
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              One connected workflow from admission to results
            </h3>

            <p className="mt-5 leading-7 text-slate-600">
              EduEase centralises academic information, automates repetitive
              steps and gives administrators, faculty and students a
              transparent platform.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Core modules
          </p>

          <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
            Complete academic workflow in one system
          </h3>

          <p className="mt-4 text-slate-600">
            Manage the most important university and college operations
            without switching between disconnected systems.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                {feature.number}
              </div>

              <h4 className="mt-5 text-lg font-bold">{feature.title}</h4>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              Automated workflow
            </p>

            <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
              From student records to published results
            </h3>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              "Student Data",
              "Exam Schedule",
              "Marks Entry",
              "Evaluation",
              "Result Approval",
              "Publication",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-slate-700 bg-slate-800 p-5"
              >
                <span className="text-sm font-bold text-cyan-400">
                  Step {index + 1}
                </span>

                <p className="mt-3 font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl bg-blue-600 px-8 py-14 text-center text-white sm:px-14">
          <h3 className="text-3xl font-bold">
            Digitise your academic operations with EduEase
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Reduce administrative workload, improve transparency and complete
            academic processes faster.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Access the Platform
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-slate-800">
            EduEase Academic Management Platform
          </p>

          <p>
            Unified student assessment and academic management
          </p>
        </div>
      </footer>
    </main>
  );
}