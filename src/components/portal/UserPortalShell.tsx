"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import {
  Bell,
  Briefcase,
  CircleHelp,
  FileText,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

type Props = {
  userName: string;
  photoUrl?: string | null;
  children: ReactNode;
  notificationCount?: number;
};

const navItems = [
  { href: "/users/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users/profile", label: "Profile", icon: UserRound },
  { href: "/careers", label: "Careers", icon: Briefcase },
  { href: "/users/applications", label: "My Applications", icon: FileText },
  { href: "/users/saved", label: "Saved Jobs", icon: Heart },
  { href: "/users/notifications", label: "Notifications", icon: Bell },
  { href: "/users/settings", label: "Settings", icon: Settings },
  { href: "/users/help", label: "Help & Support", icon: CircleHelp },
];

const topLinks = [
  { href: "/users/dashboard", label: "Dashboard" },
  { href: "/users/profile", label: "Profile" },
  { href: "/careers", label: "Careers" },
  { href: "/users/applications", label: "My Applications" },
];

export default function UserPortalShell({
  userName,
  photoUrl,
  children,
  notificationCount = 0,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const initial = userName.charAt(0).toUpperCase();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/users/login");
    router.refresh();
  }

  function isActive(href: string) {
    if (href === "/careers") return pathname.startsWith("/careers");
    return pathname === href;
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#0F172A]">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-[260px] border-r border-[#E8ECF1] bg-white transition-transform lg:static lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col px-4 py-5">
            <div className="mb-6 flex items-center justify-between px-2">
              <Link href="/users/dashboard" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E11D2E] text-sm font-bold text-white">
                  DX
                </span>
                <div>
                  <p className="font-display text-sm font-bold leading-tight">
                    DEVOTRIC<span className="text-[#E11D2E]">X</span>
                  </p>
                  <p className="text-[10px] tracking-wide text-[#94A3B8] uppercase">User Portal</p>
                </div>
              </Link>
              <button type="button" className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-[#FEF2F2] text-[#E11D2E]"
                        : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 rounded-2xl bg-[#1A1A1A] p-4 text-white">
              <p className="text-sm font-semibold leading-snug">Build your future with DevotricX</p>
              <Link
                href="/careers"
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-[#E11D2E] px-3 py-2 text-xs font-semibold"
              >
                Browse Careers
              </Link>
            </div>
          </div>
        </aside>

        {open ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            aria-label="Close sidebar overlay"
            onClick={() => setOpen(false)}
          />
        ) : null}

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[#E8ECF1] bg-white/95 backdrop-blur">
            <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-[#E2E8F0] p-2 text-[#64748B] lg:hidden"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu size={18} />
                </button>
                <nav className="hidden items-center gap-1 md:flex">
                  {topLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${
                        isActive(l.href)
                          ? "bg-[#E11D2E] text-white"
                          : "text-[#64748B] hover:bg-[#F1F5F9]"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/users/notifications"
                  className="relative rounded-full border border-[#E2E8F0] p-2 text-[#64748B] hover:bg-[#F8FAFC]"
                  aria-label="Notifications"
                >
                  <Bell size={16} />
                  {notificationCount > 0 ? (
                    <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E11D2E] px-1 text-[10px] font-bold text-white">
                      {notificationCount}
                    </span>
                  ) : null}
                </Link>
                <div className="flex items-center gap-2 rounded-full border border-[#E2E8F0] py-1 pr-3 pl-1">
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-[#FEE2E2]">
                    {photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photoUrl} alt={userName} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold text-[#E11D2E]">
                        {initial}
                      </div>
                    )}
                  </div>
                  <span className="hidden max-w-[140px] truncate text-sm font-medium sm:inline">
                    {userName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="hidden items-center gap-1 rounded-full border border-[#E2E8F0] px-3 py-1.5 text-xs font-semibold text-[#64748B] hover:border-[#E11D2E] hover:text-[#E11D2E] sm:inline-flex"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-6 md:py-8">{children}</main>

          <footer className="border-t border-[#E8ECF1] bg-white px-4 py-4 md:px-6">
            <div className="flex flex-col gap-3 text-xs text-[#94A3B8] md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-2">
                <ShieldCheck size={14} className="mt-0.5 text-[#E11D2E]" />
                <p>
                  Your privacy and security are our top priority.
                  <br />
                  © {new Date().getFullYear()} DevotricX Technologies Private Limited.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/#contact" className="hover:text-[#E11D2E]">
                  Contact Us
                </Link>
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
