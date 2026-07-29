"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";

type Job = {
  id: string;
  jobTitle: string;
  companyName: string;
  status: string;
  location: string;
  workMode: string;
  _count?: { applications: number };
};

export default function AdminJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const me = await fetch("/api/auth/me");
    if (!me.ok) {
      router.push("/admin/login");
      return;
    }
    const user = await me.json();
    if (user.user?.role !== "ADMIN") {
      router.push("/admin/login");
      return;
    }
    const res = await fetch("/api/admin/jobs");
    const data = await res.json();
    setJobs(data.jobs || []);
  }

  useEffect(() => {
    load();
  }, [router]);

  async function createJob(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/admin/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || "Failed");
      return;
    }
    e.currentTarget.reset();
    setMsg("Job created");
    load();
  }

  async function setStatus(id: string, status: string) {
    await fetch(`/api/admin/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function removeJob(id: string) {
    if (!confirm("Delete this job?")) return;
    await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <PortalShell
      title="Admin Dashboard"
      role="ADMIN"
      links={[
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/jobs", label: "Jobs" },
        { href: "/admin/applications", label: "Applications" },
      ]}
    >
      <h1 className="font-display text-3xl font-bold">Job Management</h1>

      <form onSubmit={createJob} className="mt-6 grid gap-3 rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:grid-cols-2">
        <input name="jobTitle" required placeholder="Job Title" className="rounded-xl border border-[#E2E8F0] px-3 py-2" />
        <input name="companyName" defaultValue="DevotricX Technologies" className="rounded-xl border border-[#E2E8F0] px-3 py-2" />
        <input name="skills" required placeholder="Required Skills" className="rounded-xl border border-[#E2E8F0] px-3 py-2" />
        <input name="experience" required placeholder="Experience" className="rounded-xl border border-[#E2E8F0] px-3 py-2" />
        <input name="location" required placeholder="Location" className="rounded-xl border border-[#E2E8F0] px-3 py-2" />
        <select name="workMode" className="rounded-xl border border-[#E2E8F0] px-3 py-2">
          <option value="REMOTE">Remote</option>
          <option value="HYBRID">Hybrid</option>
          <option value="OFFICE">Office</option>
        </select>
        <input name="salary" placeholder="Salary / CTC" className="rounded-xl border border-[#E2E8F0] px-3 py-2" />
        <input name="lastDate" type="date" className="rounded-xl border border-[#E2E8F0] px-3 py-2" />
        <textarea name="description" required placeholder="Job Description" className="rounded-xl border border-[#E2E8F0] px-3 py-2 sm:col-span-2" rows={3} />
        <button type="submit" className="rounded-full bg-[#EF4444] px-4 py-2 font-semibold text-white sm:col-span-2">
          Add New Job
        </button>
        {msg ? <p className="text-sm text-green-600 sm:col-span-2">{msg}</p> : null}
      </form>

      <div className="mt-8 space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-bold">{job.jobTitle}</h2>
                <p className="text-sm text-[#475569]">
                  {job.companyName} · {job.location} · {job.workMode} · {job._count?.applications || 0} apps
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setStatus(job.id, "PUBLISHED")} className="rounded-full border px-3 py-1 text-xs">
                  Publish
                </button>
                <button type="button" onClick={() => setStatus(job.id, "DRAFT")} className="rounded-full border px-3 py-1 text-xs">
                  Unpublish
                </button>
                <button type="button" onClick={() => setStatus(job.id, "CLOSED")} className="rounded-full border px-3 py-1 text-xs">
                  Close
                </button>
                <button type="button" onClick={() => removeJob(job.id)} className="rounded-full border border-[#EF4444] px-3 py-1 text-xs text-[#EF4444]">
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase text-[#475569]">Status: {job.status}</p>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
