"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserRegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
    skills: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError("");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    if (!name) {
      setError("Please enter your full name");
      return;
    }
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email like name@gmail.com");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and confirm password must be the same");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: form.phone.trim(),
          location: form.location.trim(),
          password,
          confirmPassword,
          skills: form.skills.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed. Try again.");
        setLoading(false);
        return;
      }
      router.push("/users/dashboard");
      router.refresh();
    } catch {
      setError("Network/server error. If this is the live site, database is not connected yet.");
      setLoading(false);
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5 text-[#0F172A] outline-none transition focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20";

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
          <p className="mt-2 text-sm text-[#475569]">
            Fill all required fields, then click Create Account.
          </p>

          <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2" autoComplete="on">
            <label className="block text-sm">
              <span className="mb-1 block text-[#475569]">Full Name *</span>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your full name"
                className={fieldClass}
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[#475569]">Email *</span>
              <input
                name="email"
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="name@gmail.com"
                className={fieldClass}
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[#475569]">Phone</span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="Phone number"
                className={fieldClass}
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[#475569]">Location</span>
              <input
                name="location"
                type="text"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="City"
                className={fieldClass}
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[#475569]">Password *</span>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="Min 6 characters"
                className={fieldClass}
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[#475569]">Confirm Password *</span>
              <input
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                placeholder="Type password again"
                className={fieldClass}
              />
            </label>

            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block text-[#475569]">Skills</span>
              <input
                name="skills"
                type="text"
                value={form.skills}
                onChange={(e) => update("skills", e.target.value)}
                placeholder="Java, Selenium, React..."
                className={fieldClass}
              />
            </label>

            {error ? (
              <p className="rounded-xl bg-[#FEF2F2] px-3 py-2 text-sm text-[#EF4444] sm:col-span-2">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#EF4444] px-4 py-2.5 font-semibold text-white sm:col-span-2 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-[#475569]">
            Already registered?{" "}
            <Link href="/users/login" className="text-[#EF4444]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
