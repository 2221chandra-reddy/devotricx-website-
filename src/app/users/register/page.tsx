"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserRegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");
    if (password !== confirmPassword) {
      setLoading(false);
      setError("Password and confirm password must be the same");
      return;
    }
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Registration failed");
      return;
    }
    router.push("/users/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-10">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
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
        <div className="p-8">
        <h1 className="font-display text-2xl font-bold">Create Account</h1>
        <p className="mt-2 text-sm text-[#475569]">Register to browse jobs and submit applications.</p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["name", "Full Name", "text", true],
            ["email", "Email", "email", true],
            ["phone", "Phone", "tel", false],
            ["location", "Location", "text", false],
            ["password", "Password", "password", true],
            ["confirmPassword", "Confirm Password", "password", true],
          ].map(([name, label, type, required]) => (
            <label key={name as string} className="block text-sm">
              <span className="mb-1 block text-[#475569]">{label}</span>
              <input
                name={name as string}
                type={type as string}
                required={Boolean(required)}
                className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2 outline-none focus:border-[#EF4444]"
              />
            </label>
          ))}
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block text-[#475569]">Skills</span>
            <input
              name="skills"
              placeholder="Java, Selenium, React..."
              className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2 outline-none focus:border-[#EF4444]"
            />
          </label>
          {error ? <p className="text-sm text-[#EF4444] sm:col-span-2">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[#EF4444] px-4 py-2.5 font-semibold text-white sm:col-span-2"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#475569]">
          Already registered? <Link href="/users/login" className="text-[#EF4444]">Login</Link>
        </p>
        </div>
      </div>
    </div>
  );
}
