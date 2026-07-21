"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";
import { companyStats } from "@/lib/company";

const highlights = [
  {
    icon: BarChart3,
    value: `${companyStats[0].value}${companyStats[0].suffix}`,
    label: companyStats[0].label,
  },
  {
    icon: Users,
    value: `${companyStats[1].value}${companyStats[1].suffix}`,
    label: companyStats[1].label,
  },
  {
    icon: ShieldCheck,
    value: "Expert",
    label: "Delivery Team",
  },
  {
    icon: Rocket,
    value: "Modern",
    label: "Tech Stack",
  },
];

export default function About() {
  return (
    <section id="about" className="about-section section-pad relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-28 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-site relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left graphic card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="about-visual relative aspect-square overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0f1c] shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:aspect-[5/4] lg:aspect-square">
            {/* concentric HUD rings */}
            <div className="about-rings" aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </div>

            {/* floating particles */}
            <div className="about-particles" aria-hidden>
              {Array.from({ length: 18 }).map((_, i) => (
                <i key={i} />
              ))}
            </div>

            {/* animated energy wave */}
            <div className="about-wave" aria-hidden>
              <svg viewBox="0 0 600 180" preserveAspectRatio="none">
                <path
                  className="about-wave-path about-wave-path-a"
                  d="M0 110 Q75 40 150 110 T300 110 T450 110 T600 110 V180 H0 Z"
                />
                <path
                  className="about-wave-path about-wave-path-b"
                  d="M0 130 Q75 70 150 130 T300 130 T450 130 T600 130 V180 H0 Z"
                />
                <path
                  className="about-wave-line"
                  d="M0 100 Q75 30 150 100 T300 100 T450 100 T600 100"
                  fill="none"
                />
              </svg>
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-accent font-display text-2xl font-bold text-white shadow-[0_0_40px_rgba(225,6,0,0.65)]">
                DX
              </div>
              <p className="font-display text-2xl font-bold tracking-wide text-white md:text-3xl">
                DEVOTRIC<span className="text-accent">X</span>
              </p>
              <p className="mt-3 max-w-xs text-xs tracking-wide text-white/65 sm:text-sm">
                Animation • Immersive Tech • Web • e-Learning
              </p>
            </div>

            <div className="absolute bottom-5 left-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 text-xs font-medium text-white/85 backdrop-blur-md">
              <Calendar size={13} className="text-accent" />
              Est. Digital Studio
            </div>
          </div>
        </motion.div>

        {/* Right content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mb-8 max-w-xl"
          >
            <p className="mb-3 text-sm font-semibold tracking-[0.22em] text-accent uppercase">
              Who We Are
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl lg:leading-[1.1]">
              Crafting immersive digital{" "}
              <span className="about-gradient-word">experiences</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              DevotricX Technologies specializes in delivering high-quality digital
              experiences through cutting-edge animation, immersive technologies,
              custom web development, and eLearning solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="about-stat-card group flex items-center gap-3.5 rounded-2xl border border-border bg-bg-elevated px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent transition group-hover:bg-accent group-hover:text-white">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-foreground">
                      {item.value}
                    </p>
                    <p className="text-sm text-muted">{item.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
