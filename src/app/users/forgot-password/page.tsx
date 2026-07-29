"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import { company } from "@/lib/company";

export default function ForgotPasswordPage() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [needsSetup, setNeedsSetup] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");
    setNeedsSetup(false);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      const err = data.error || "Could not send reset link";
      setError(err);
      if (res.status === 503 || String(err).toLowerCase().includes("smtp")) {
        setNeedsSetup(true);
      }
      return;
    }
    setMessage(data.message || "Password reset link has been sent to your registered email.");
  }

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
        <div className="rounded-3xl bg-white p-8 shadow-[0_25px_60px_rgba(15,23,42,0.1)] ring-1 ring-black/5">
          <div className="mb-2 text-[#E11D2E]">
            <ShieldCheck size={24} />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#0F172A]">Forgot Password</h1>
          <p className="mt-2 text-sm text-[#64748B]">
            Enter your registered email. We will email a password reset link if this account exists.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#334155]">
                Registered Email
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
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-[#D8DEE8] bg-[#F3F6FA] py-3.5 pr-3.5 pl-11 text-sm outline-none focus:border-[#E11D2E] focus:bg-white focus:ring-4 focus:ring-[#E11D2E]/15"
                />
              </div>
            </label>

            {error ? <p className="text-sm text-[#E11D2E]">{error}</p> : null}
            {message ? <p className="text-sm text-green-600">{message}</p> : null}

            {needsSetup ? (
              <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-sm text-[#92400E]">
                <p className="font-semibold">Email sending is not connected yet</p>
                <p className="mt-2 text-[13px] leading-relaxed">
                  Open <code className="rounded bg-white px-1">.env</code> and set your real Gmail values
                  (remove the <code className="rounded bg-white px-1">#</code> at the start of each line):
                </p>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-white p-3 text-[11px] text-[#334155]">
{`SMTP_USER="yourgmail@gmail.com"
SMTP_PASS="xxxx xxxx xxxx xxxx"
MAIL_FROM="DevotricX <yourgmail@gmail.com>"`}
                </pre>
                <ol className="mt-3 list-decimal space-y-1 pl-4 text-[13px]">
                  <li>
                    Create App Password:{" "}
                    <a
                      href="https://myaccount.google.com/apppasswords"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold underline"
                    >
                      Google App Passwords
                    </a>
                  </li>
                  <li>Paste into SMTP_USER / SMTP_PASS in .env</li>
                  <li>Restart the server (npm run dev)</li>
                </ol>
                <p className="mt-3 text-[13px]">
                  Need help now? WhatsApp{" "}
                  <a href={company.whatsapp} className="font-semibold underline" target="_blank" rel="noreferrer">
                    {company.phone}
                  </a>
                </p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#E11D2E] py-3.5 text-sm font-semibold text-white hover:bg-[#C41626] disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
