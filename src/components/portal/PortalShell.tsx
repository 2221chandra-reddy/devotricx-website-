"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  title: string;
  role: "STUDENT" | "ADMIN";
  links: { href: string; label: string }[];
  children: ReactNode;
};

export default function PortalShell({ title, role, links, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(role === "ADMIN" ? "/admin/login" : "/users/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <Link href="/" className="font-display text-lg font-bold">
              DEVOTRIC<span className="text-[#EF4444]">X</span>
            </Link>
            <p className="text-xs tracking-wide text-[#475569] uppercase">{title}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-1.5 ${
                  pathname === l.href
                    ? "bg-[#EF4444] text-white"
                    : "text-[#475569] hover:bg-[#F1F5F9]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-[#E2E8F0] px-3 py-1.5 text-[#475569] hover:border-[#EF4444] hover:text-[#EF4444]"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
