"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("university@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    // Temporary hackathon demo authentication.
    // We will connect this to FastAPI after the main pages are ready.
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (
      email === "university@example.com" &&
      password === "password123"
    ) {
      localStorage.setItem(
        "eduease_user",
        JSON.stringify({
          email,
          name: "University Administrator",
          role: "University Admin",
        }),
      );

      if (rememberMe) {
        localStorage.setItem("eduease_logged_in", "true");
      } else {
        sessionStorage.setItem("eduease_logged_in", "true");
      }

      router.push("/dashboard");
      return;
    }

    setError("Invalid credentials. Use the demo account shown below.");
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left panel */}
        <section className="hidden bg-slate-950 px-12 py-10 text-white lg:flex lg:flex-col">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
              E
            </div>

            <div>
              <h1 className="text-xl font-bold">EduEase</h1>
              <p className="text-xs text-slate-400">
                Academic Management Platform
              </p>
            </div>
          </Link>

          <div className="my-auto max-w-xl">
            <span className="inline-flex rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-cyan-300">
              Unified Academic Operations
            </span>

            <h2 className="mt-7 text-5xl font-bold leading-tight tracking-tight">
              Manage the complete academic lifecycle digitally
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Access students, examinations, evaluations, results and
              grievances through one secure university platform.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Reduce repetitive manual data entry",
                "Track examinations and evaluations in real time",
                "Publish results with fewer delays and errors",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/20 text-blue-300">
                    ✓
                  </div>
                  <p className="font-medium text-slate-200">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-500">
            EduEase — Unified Student Assessment and Academic Management
          </p>
        </section>

        {/* Login panel */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              ← Back to homepage
            </Link>

            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                  E
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-950">EduEase</h1>
                  <p className="text-xs text-slate-500">
                    Academic Management Platform
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Secure access
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Login to your account
              </h2>

              <p className="mt-3 text-slate-600">
                Enter your university administrator credentials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 pr-20 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                />
                Keep me signed in on this device
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isLoading ? "Signing in..." : "Login to EduEase"}
              </button>
            </form>

            <div className="mt-7 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-950">Demo credentials</h3>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Hackathon Demo
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  university@example.com
                </p>

                <p>
                  <span className="font-semibold">Password:</span> password123
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-slate-500">
              This login currently uses demo authentication. The existing
              FastAPI authentication endpoint will be connected after the core
              demo pages are completed.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}