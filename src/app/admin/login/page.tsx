"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError("Please enter admin email");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      if (data.user?.role !== "ADMIN") {
        setError("Admin account required");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Server error. On live site, database must be connected (Neon).");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#EEF2F6]">
      <header className="bg-white">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4">
          <Link href="/" className="font-display text-[22px] font-bold tracking-tight text-[#0F172A]">
            DEVOTRIC<span className="text-[#E11D2E]">X</span>
          </Link>
          <Link
            href="/careers"
            className="rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#334155]"
          >
            Careers
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-5 py-8 md:py-10">
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_25px_60px_rgba(15,23,42,0.12)] ring-1 ring-black/5 lg:grid lg:min-h-[560px] lg:grid-cols-2">
          <section className="relative overflow-hidden bg-[#1A1A1A] px-8 py-10 text-white md:px-11 md:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 88% 8%, rgba(225,29,46,0.55), transparent 60%), radial-gradient(ellipse 50% 40% at 8% 92%, rgba(225,29,46,0.28), transparent 55%)",
              }}
            />
            <div className="relative z-10 flex h-full min-h-[420px] flex-col">
              <Image
                src="/videos/image.png"
                alt="DevotricX"
                width={480}
                height={150}
                className="h-auto w-full max-w-[300px] object-contain"
                priority
              />
              <h1 className="mt-9 font-display text-[34px] leading-[1.15] font-bold tracking-tight md:text-[40px]">
                Admin Portal
                <br />
                <span className="text-[#E11D2E]">Manage hiring.</span>
              </h1>
              <div className="mt-3 h-[3px] w-12 rounded-full bg-[#E11D2E]" />
              <p className="mt-5 max-w-[360px] text-[15px] leading-relaxed text-white/70">
                Post jobs, review applications, and manage users from one place.
              </p>
              <div className="mt-auto grid grid-cols-3 gap-4 pt-14">
                {[
                  { icon: Briefcase, label: "Jobs" },
                  { icon: Users, label: "Users" },
                  { icon: ShieldCheck, label: "Secure" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-[#E11D2E]">
                      <Icon size={18} />
                    </div>
                    <p className="text-[12px] font-medium text-white/90">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative flex flex-col justify-center bg-white px-7 py-10 md:px-12 md:py-12">
            <div className="absolute top-7 right-7 text-[#E11D2E]">
              <ShieldCheck size={24} />
            </div>

            <h2 className="font-display text-[30px] font-bold tracking-tight text-[#0F172A]">
              Admin Login
            </h2>
            <p className="mt-1.5 text-[14px] text-[#64748B]">
              Sign in with your admin email and password.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4" autoComplete="on">
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-[#334155]">
                  Email Address
                </span>
                <div className="relative">
                  <Mail
                    size={17}
                    className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="username"
                    spellCheck={false}
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="MNR@devotricx.com"
                    className="w-full rounded-xl border border-[#D8DEE8] bg-white py-3.5 pr-3.5 pl-11 text-[14px] text-[#0F172A] outline-none transition focus:border-[#E11D2E] focus:ring-4 focus:ring-[#E11D2E]/15"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-[#334155]">Password</span>
                <div className="relative">
                  <Lock
                    size={17}
                    className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-[#D8DEE8] bg-white py-3.5 pr-11 pl-11 text-[14px] text-[#0F172A] outline-none transition focus:border-[#E11D2E] focus:ring-4 focus:ring-[#E11D2E]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </label>

              {error ? (
                <p className="rounded-xl bg-[#FEF2F2] px-3 py-2 text-sm text-[#E11D2E]">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E11D2E] py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(225,29,46,0.28)] transition hover:bg-[#C41626] disabled:opacity-60"
              >
                <LogIn size={18} />
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-[13px] text-[#64748B]">
              <Link href="/" className="font-semibold text-[#E11D2E] hover:underline">
                Back to website
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
