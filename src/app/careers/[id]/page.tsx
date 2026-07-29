"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Job = {
  id: string;
  companyName: string;
  jobTitle: string;
  description: string;
  skills: string;
  experience: string;
  location: string;
  workMode: string;
  salary?: string | null;
  lastDate?: string | null;
};

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((r) => r.json())
      .then((d) => setJob(d.job || null))
      .catch(() => setJob(null));
  }, [id]);

  async function apply() {
    setLoading(true);
    setMsg("");
    setError("");
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: id }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.status === 401) {
      router.push("/users/login");
      return;
    }
    if (!res.ok) {
      setError(data.error || "Could not apply");
      return;
    }
    setMsg("Application submitted successfully");
  }

  if (!job) return <div className="p-10 text-center text-[#475569]">Loading job...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/careers" className="text-sm text-[#EF4444]">
          ← Back to careers
        </Link>
        <article className="mt-4 rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-[#EF4444] uppercase">{job.companyName}</p>
          <h1 className="mt-2 font-display text-3xl font-bold">{job.jobTitle}</h1>
          <p className="mt-4 text-[#475569]">{job.description}</p>
          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div><dt className="text-[#475569]">Required Skills</dt><dd className="font-medium">{job.skills}</dd></div>
            <div><dt className="text-[#475569]">Experience</dt><dd className="font-medium">{job.experience}</dd></div>
            <div><dt className="text-[#475569]">Location</dt><dd className="font-medium">{job.location}</dd></div>
            <div><dt className="text-[#475569]">Work Mode</dt><dd className="font-medium">{job.workMode}</dd></div>
            <div><dt className="text-[#475569]">Salary / CTC</dt><dd className="font-medium">{job.salary || "Not disclosed"}</dd></div>
            <div>
              <dt className="text-[#475569]">Last Date</dt>
              <dd className="font-medium">
                {job.lastDate ? new Date(job.lastDate).toLocaleDateString() : "Open"}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={apply}
            disabled={loading}
            className="mt-8 rounded-full bg-[#EF4444] px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Apply Now"}
          </button>
          {msg ? <p className="mt-3 text-sm text-green-600">{msg}</p> : null}
          {error ? <p className="mt-3 text-sm text-[#EF4444]">{error}</p> : null}
          <p className="mt-3 text-xs text-[#475569]">
            Tip: upload your resume in Profile before applying.
          </p>
        </article>
      </div>
    </div>
  );
}
