"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { Suspense } from "react";

function ResetPasswordForm() {
  const router = useRouter();
  const search = useSearchParams();
  const token = useMemo(() => search.get("token") || "", [search]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setError("Password and confirm password must be the same");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password, confirmPassword }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Could not update password");
      return;
    }
    setMessage(data.message || "Password updated successfully.");
    window.setTimeout(() => {
      router.push("/users/login");
      router.refresh();
    }, 1200);
  }

  if (!token) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
        <p className="text-sm text-[#E11D2E]">Reset link is missing or invalid.</p>
        <Link href="/users/forgot-password" className="mt-4 inline-block text-sm font-semibold text-[#E11D2E]">
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-[0_25px_60px_rgba(15,23,42,0.1)] ring-1 ring-black/5">
      <div className="mb-2 text-[#E11D2E]">
        <ShieldCheck size={24} />
      </div>
      <h1 className="font-display text-2xl font-bold text-[#0F172A]">Change Password</h1>
      <p className="mt-2 text-sm text-[#64748B]">
        Enter a new password and confirm it. Both must match. Your account password will update
        automatically.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-[#334155]">New Password</span>
          <div className="relative">
            <Lock
              size={17}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              placeholder="New password"
              className="w-full rounded-xl border border-[#D8DEE8] bg-[#F3F6FA] py-3.5 pr-11 pl-11 text-sm outline-none focus:border-[#E11D2E] focus:bg-white focus:ring-4 focus:ring-[#E11D2E]/15"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#94A3B8]"
              aria-label="Toggle password"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-[#334155]">
            Confirm Password
          </span>
          <div className="relative">
            <Lock
              size={17}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              required
              minLength={6}
              placeholder="Confirm password"
              className="w-full rounded-xl border border-[#D8DEE8] bg-[#F3F6FA] py-3.5 pr-11 pl-11 text-sm outline-none focus:border-[#E11D2E] focus:bg-white focus:ring-4 focus:ring-[#E11D2E]/15"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#94A3B8]"
              aria-label="Toggle confirm password"
            >
              {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </label>

        {error ? <p className="text-sm text-[#E11D2E]">{error}</p> : null}
        {message ? <p className="text-sm text-green-600">{message}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#E11D2E] py-3.5 text-sm font-semibold text-white hover:bg-[#C41626] disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#EEF2F6]">
      <header className="bg-white">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4">
          <Link href="/" className="font-display text-[22px] font-bold tracking-tight text-[#0F172A]">
            DEVOTRIC<span className="text-[#E11D2E]">X</span>
          </Link>
          <Link href="/users/login" className="text-sm font-semibold text-[#E11D2E]">
            Back to Login
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-md px-5 py-12">
        <Suspense fallback={<p className="text-center text-sm text-[#64748B]">Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </main>
    </div>
  );
}
