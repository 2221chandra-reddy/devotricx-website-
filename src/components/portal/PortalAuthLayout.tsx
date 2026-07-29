import Image from "next/image";
import Link from "next/link";
import AuthForm from "@/components/portal/AuthForm";

type Props = {
  mode: "user" | "admin";
};

export default function PortalAuthLayout({ mode }: Props) {
  const isAdmin = mode === "admin";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-[#0F172A] md:text-2xl">
            DEVOTRIC<span className="text-[#EF4444]">X</span>
          </Link>
          <Link
            href={isAdmin ? "/careers" : "/users/register"}
            className="rounded-full border border-[#E2E8F0] px-4 py-2 text-sm"
          >
            {isAdmin ? "Careers" : "Register"}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.25fr_0.85fr]">
          <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-[#1a1a1a] shadow-sm">
            <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-10 md:min-h-[420px] md:px-10">
              <Image
                src="/videos/image.png"
                alt="DevotricX"
                width={640}
                height={220}
                className="h-auto w-full max-w-lg object-contain"
                priority
              />
              <p className="mt-8 max-w-md text-center font-display text-xl font-semibold tracking-wide text-white md:text-2xl">
                Join our company.
                <br />
                <span className="text-[#EF4444]">Grow your future.</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <AuthForm mode={mode} showLogo={false} embedded />
          </div>
        </div>
      </div>
    </div>
  );
}
