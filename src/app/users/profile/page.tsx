"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserPortalShell from "@/components/portal/UserPortalShell";

type UserData = {
  name: string;
  email: string;
  phone?: string | null;
  profile?: {
    college?: string | null;
    course?: string | null;
    graduationYear?: number | null;
    skills?: string | null;
    location?: string | null;
    resumeUrl?: string | null;
    photoUrl?: string | null;
  } | null;
};

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (r) => {
        if (!r.ok) {
          router.push("/users/login");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d?.user?.role !== "STUDENT") {
          router.push("/users/login");
          return;
        }
        setUser(d.user);
        setPreview(d.user.profile?.photoUrl || null);
      });
  }, [router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/student/profile", { method: "PUT", body: form });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Update failed");
      return;
    }
    setUser(data.user);
    setPreview(data.user.profile?.photoUrl || null);
    setMsg("Profile saved successfully");
  }

  if (!user) {
    return <div className="p-10 text-center text-[#475569]">Loading profile...</div>;
  }

  return (
    <UserPortalShell userName={user.name} photoUrl={preview}>
      <h1 className="font-display text-3xl font-bold">My Profile</h1>

      <div className="mt-6 flex flex-wrap items-center gap-5 rounded-3xl border border-[#E2E8F0] bg-white p-5">
        <div className="h-28 w-28 overflow-hidden rounded-full border border-[#E2E8F0] bg-[#F1F5F9]">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#94A3B8]">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p className="font-display text-xl font-bold text-[#0F172A]">{user.name}</p>
          <p className="text-sm text-[#475569]">{user.email}</p>
          <p className="mt-1 text-xs text-[#94A3B8]">
            {preview ? "Your profile photo" : "No photo uploaded yet"}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block text-[#475569]">Name</span>
          <input name="name" defaultValue={user.name} className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-[#475569]">Email</span>
          <input value={user.email} disabled className="w-full rounded-xl border border-[#E2E8F0] bg-[#F1F5F9] px-3 py-2" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-[#475569]">Phone</span>
          <input name="phone" defaultValue={user.phone || ""} className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-[#475569]">Location</span>
          <input name="location" defaultValue={user.profile?.location || ""} className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2" />
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="mb-1 block text-[#475569]">Skills</span>
          <input name="skills" defaultValue={user.profile?.skills || ""} className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-[#475569]">Resume (PDF, max 5MB)</span>
          <input name="resume" type="file" accept=".pdf,.doc,.docx" className="w-full text-sm" />
          {user.profile?.resumeUrl ? (
            <a href={user.profile.resumeUrl} target="_blank" className="mt-1 inline-block text-xs text-[#EF4444]">
              Current resume
            </a>
          ) : null}
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-[#475569]">Profile Photo (max 2MB)</span>
          <input
            name="photo"
            type="file"
            accept="image/*"
            className="w-full text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = URL.createObjectURL(file);
              setPreview(url);
            }}
          />
        </label>
        {msg ? <p className="text-sm text-green-600 sm:col-span-2">{msg}</p> : null}
        {error ? <p className="text-sm text-[#EF4444] sm:col-span-2">{error}</p> : null}
        <button type="submit" className="rounded-full bg-[#EF4444] px-5 py-2.5 font-semibold text-white sm:col-span-2">
          Save Profile
        </button>
      </form>
    </UserPortalShell>
  );
}
