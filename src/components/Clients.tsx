"use client";

import SectionHeading from "./SectionHeading";

const industries = [
  "Healthcare",
  "Higher Education",
  "Corporate Learning",
  "Enterprise",
  "Public Sector",
  "EdTech",
  "Manufacturing",
  "Non-Profit",
];

export default function Clients() {
  const loop = [...industries, ...industries];

  return (
    <section id="clients" className="section-pad relative overflow-hidden bg-bg-soft/40 py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Industries"
          title="Sectors we deliver for"
          description="Immersive and digital solutions for organizations across healthcare, education, enterprise, and the public sector."
        />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg to-transparent" />
        <div className="overflow-hidden">
          <div className="marquee gap-6 hover:[animation-play-state:paused]">
            {loop.map((item, i) => (
              <div
                key={`${item}-${i}`}
                className="mx-3 flex h-20 min-w-[200px] items-center justify-center rounded-2xl border border-border bg-bg-elevated/60 px-8"
              >
                <span className="font-display text-lg font-semibold tracking-wide text-muted">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
