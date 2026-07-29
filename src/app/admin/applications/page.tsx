"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";

type Application = {
  id: string;
  status: string;
  appliedAt: string;
  resumeUrl?: string | null;
  student: {
    name: string;
    email: string;
    phone?: string | null;
    profile?: { resumeUrl?: string | null } | null;
  };
  job: { id: string; jobTitle: string; companyName: string };
};

const statuses = [
  "APPLIED",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "INTERVIEW_SCHEDULED",
  "SELECTED",
  "REJECTED",
];

export default function AdminApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [status, setStatus] = useState("");

  async function load(filter = status) {
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
    const qs = filter ? `?status=${filter}` : "";
    const res = await fetch(`/api/admin/applications${qs}`);
    const data = await res.json();
    setApplications(data.applications || []);
  }

  useEffect(() => {
    load();
  }, [router]);

  async function updateStatus(id: string, next: string) {
    await fetch(`/api/admin/applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    load();
  }

  function exportCsv() {
    const rows = [
      ["Application ID", "User", "Email", "Phone", "Job", "Company", "Status", "Applied At"],
      ...applications.map((a) => [
        a.id,
        a.student.name,
        a.student.email,
        a.student.phone || "",
        a.job.jobTitle,
        a.job.companyName,
        a.status,
        new Date(a.appliedAt).toISOString(),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "applications.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const countLabel = useMemo(() => `${applications.length} applications`, [applications.length]);

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Application Management</h1>
          <p className="mt-1 text-sm text-[#475569]">{countLabel}</p>
        </div>
        <div className="flex gap-2">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              load(e.target.value);
            }}
            className="rounded-full border border-[#E2E8F0] bg-white px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.replaceAll("_", " ")}
              </option>
            ))}
          </select>
          <button type="button" onClick={exportCsv} className="rounded-full bg-[#EF4444] px-4 py-2 text-sm font-semibold text-white">
            Export Excel/CSV
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {applications.map((app) => {
          const resume = app.resumeUrl || app.student.profile?.resumeUrl;
          return (
            <div key={app.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-bold">{app.job.jobTitle}</h2>
                  <p className="text-sm text-[#475569]">
                    {app.student.name} · {app.student.email} · {app.student.phone || "No phone"}
                  </p>
                  <p className="mt-1 text-xs text-[#475569]">
                    Applied {new Date(app.appliedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className="rounded-full border border-[#E2E8F0] px-3 py-1.5 text-xs"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                  {resume ? (
                    <a href={resume} target="_blank" className="rounded-full border px-3 py-1.5 text-xs text-[#EF4444]">
                      Download Resume
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
        {applications.length === 0 ? <p className="text-[#475569]">No applications found.</p> : null}
      </div>
    </PortalShell>
  );
}
