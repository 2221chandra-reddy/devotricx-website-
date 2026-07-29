"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Briefcase,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

type Props = {
  showHeader?: boolean;
};

export default function UserLoginExperience({ showHeader = true }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    };
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }
    if (data.user.role !== "STUDENT") {
      setError("User account required");
      return;
    }
    router.push("/users/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#EEF2F6]">
      {showHeader ? (
        <header className="bg-white">
          <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4">
            <Link href="/" className="font-display text-[22px] font-bold tracking-tight text-[#0F172A]">
              DEVOTRIC<span className="text-[#E11D2E]">X</span>
            </Link>
            <Link
              href="/users/register"
              className="inline-flex items-center gap-2 rounded-lg bg-[#E11D2E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#C41626]"
            >
              <UserRound size={16} />
              Register
            </Link>
          </div>
        </header>
      ) : null}

      <main className="mx-auto max-w-[1100px] px-5 py-8 md:py-10">
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_25px_60px_rgba(15,23,42,0.12)] ring-1 ring-black/5 lg:grid lg:min-h-[560px] lg:grid-cols-2">
          {/* LEFT */}
          <section className="relative overflow-hidden bg-[#1A1A1A] px-8 py-10 text-white md:px-11 md:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 88% 8%, rgba(225,29,46,0.55), transparent 60%), radial-gradient(ellipse 50% 40% at 8% 92%, rgba(225,29,46,0.28), transparent 55%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-6 right-4 h-36 w-36 opacity-40"
              style={{
                backgroundImage: "radial-gradient(#E11D2E 1.4px, transparent 1.5px)",
                backgroundSize: "9px 9px",
                maskImage: "radial-gradient(circle, black 30%, transparent 72%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-24 left-2 h-28 w-28 opacity-30"
              style={{
                backgroundImage: "radial-gradient(#E11D2E 1.4px, transparent 1.5px)",
                backgroundSize: "9px 9px",
                maskImage: "radial-gradient(circle, black 25%, transparent 70%)",
              }}
            />
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full opacity-50"
              viewBox="0 0 600 120"
              preserveAspectRatio="none"
            >
              <path
                fill="#0d0d0d"
                d="M0 120V70h18V40h22v30h14V55h20v25h16V35h28v45h12V50h24v30h18V28h30v52h16V45h22v35h14V60h20v28h18V38h26v42h14V55h22v35h16V48h24v40h20V62h28v58H0z"
              />
              <path
                fill="#111"
                opacity="0.85"
                d="M40 120V78h12V58h16v20h10V68h14v20h12V50h20v38h10V70h16v28h12V62h18v36h14V72h16v28h20V55h22v45h14V80h18v40H40z"
              />
            </svg>

            <div className="relative z-10 flex h-full min-h-[480px] flex-col">
              <Image
                src="/videos/image.png"
                alt="DevotricX Technologies Private Limited"
                width={480}
                height={150}
                className="h-auto w-full max-w-[300px] object-contain"
                priority
              />

              <h1 className="mt-9 font-display text-[34px] leading-[1.15] font-bold tracking-tight md:text-[40px]">
                Join our company.
                <br />
                <span className="text-[#E11D2E]">Grow your future.</span>
              </h1>
              <div className="mt-3 h-[3px] w-12 rounded-full bg-[#E11D2E]" />
              <p className="mt-5 max-w-[360px] text-[15px] leading-relaxed text-white/70">
                Explore exciting career opportunities, apply for jobs and track your applications — all
                in one place.
              </p>

              <div className="mt-auto grid grid-cols-3 gap-4 pt-14 pb-2">
                {[
                  { icon: Briefcase, label: "Exciting Jobs" },
                  { icon: BarChart3, label: "Career Growth" },
                  { icon: Users, label: "Better Tomorrow" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-[#E11D2E] shadow-[0_8px_20px_rgba(225,29,46,0.35)]">
                      <Icon size={18} strokeWidth={2.2} />
                    </div>
                    <p className="text-[12px] font-medium text-white/90">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <section className="relative flex flex-col justify-center bg-white px-7 py-10 md:px-12 md:py-12">
            <div className="absolute top-7 right-7 text-[#E11D2E]">
              <ShieldCheck size={24} strokeWidth={2.2} />
            </div>

            <h2 className="font-display text-[30px] font-bold tracking-tight text-[#0F172A]">
              Welcome
            </h2>
            <p className="mt-1.5 text-[14px] text-[#64748B]">
              Sign in to apply for jobs and track applications.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
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
                    name="email"
                    type="email"
                    required
                    autoComplete="username"
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-[#D8DEE8] bg-[#F3F6FA] py-3.5 pr-3.5 pl-11 text-[14px] text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#E11D2E] focus:bg-white focus:ring-4 focus:ring-[#E11D2E]/15"
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#D8DEE8] bg-[#F3F6FA] py-3.5 pr-11 pl-11 text-[14px] text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#E11D2E] focus:bg-white focus:ring-4 focus:ring-[#E11D2E]/15"
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

              <div className="flex items-center justify-between gap-3 pt-0.5 text-[13px]">
                <label className="inline-flex cursor-pointer items-center gap-2 font-medium text-[#475569]">
                  <input
                    type="checkbox"
                    name="remember"
                    defaultChecked
                    className="h-4 w-4 rounded border-[#CBD5E1] accent-[#E11D2E]"
                  />
                  Remember me
                </label>
                <Link
                  href="/users/forgot-password"
                  className="font-semibold text-[#E11D2E] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {error ? <p className="text-sm text-[#E11D2E]">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E11D2E] py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(225,29,46,0.28)] transition hover:bg-[#C41626] disabled:opacity-60"
              >
                <LogIn size={18} />
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E2E8F0]" />
              <span className="text-[12px] font-medium text-[#94A3B8]">Or continue with</span>
              <div className="h-px flex-1 bg-[#E2E8F0]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled
                title="Coming soon"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white py-2.5 text-[13px] font-semibold text-[#334155] opacity-80"
              >
                <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
                  <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.4 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                  <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l.1.1 6.2 5.2C39.2 36.3 44 31.3 44 24c0-1.3-.1-2.6-.4-3.9z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                disabled
                title="Coming soon"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white py-2.5 text-[13px] font-semibold text-[#334155] opacity-80"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden>
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
                </svg>
                LinkedIn
              </button>
            </div>

            <p className="mt-7 text-center text-[14px] text-[#64748B]">
              New user?{" "}
              <Link href="/users/register" className="font-semibold text-[#E11D2E] hover:underline">
                Register
              </Link>
            </p>
          </section>
        </div>

        <p className="mt-7 flex items-center justify-center gap-2 text-center text-[12px] text-[#64748B]">
          <ShieldCheck size={14} className="text-[#E11D2E]" />
          Your information is protected with enterprise-grade security.
        </p>
      </main>
    </div>
  );
}
