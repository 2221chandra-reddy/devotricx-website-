"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  mode: "user" | "admin";
  showLogo?: boolean;
  embedded?: boolean;
};

export default function AuthForm({ mode, showLogo = true, embedded = false }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isAdmin = mode === "admin";

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
    if (isAdmin && data.user.role !== "ADMIN") {
      setError("Admin account required");
      return;
    }
    if (!isAdmin && data.user.role !== "STUDENT") {
      setError("User account required");
      return;
    }
    router.push(isAdmin ? "/admin" : "/users/dashboard");
    router.refresh();
  }

  return (
    <div
      className={
        embedded
          ? "w-full overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
          : "mx-auto mt-10 max-w-md overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
      }
    >
      {showLogo ? (
        <div className="bg-[#1a1a1a] px-6 py-5">
          <Image
            src="/videos/image.png"
            alt="DevotricX"
            width={420}
            height={140}
            className="mx-auto h-auto w-full max-w-[280px] object-contain"
            priority
          />
        </div>
      ) : null}
      <div className={embedded ? "p-6 md:p-7" : "p-8"}>
        <h1 className="font-display text-2xl font-bold text-[#0F172A]">
          {isAdmin ? "Admin Login" : "Login"}
        </h1>
        <p className="mt-2 text-sm text-[#475569]">
          {isAdmin
            ? "Manage users, jobs and applications."
            : "Sign in to apply for jobs and track applications."}
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block text-[#475569]">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              placeholder={isAdmin ? "Admin email" : "Your email"}
              className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2 outline-none focus:border-[#EF4444]"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-[#475569]">Password</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2 outline-none focus:border-[#EF4444]"
            />
          </label>
          {error ? <p className="text-sm text-[#EF4444]">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#EF4444] px-4 py-2.5 font-semibold text-white hover:bg-[#DC2626] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        {!isAdmin ? (
          <p className="mt-4 text-center text-sm text-[#475569]">
            New user?{" "}
            <Link href="/users/register" className="font-medium text-[#EF4444]">
              Register
            </Link>
          </p>
        ) : null}
        {!embedded ? (
          <p className="mt-3 text-center text-xs text-[#475569]">
            <Link href="/">Back to website</Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
