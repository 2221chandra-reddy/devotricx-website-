"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Code2,
  FlaskConical,
  Headphones,
  LayoutTemplate,
  PackageCheck,
  PenTool,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  { title: "Requirement", icon: ClipboardList },
  { title: "Planning", icon: PenTool },
  { title: "UI/UX", icon: LayoutTemplate },
  { title: "Development", icon: Code2 },
  { title: "Testing", icon: FlaskConical },
  { title: "Delivery", icon: PackageCheck },
  { title: "Support", icon: Headphones },
];

export default function Process() {
  return (
    <section id="process" className="section-pad relative bg-bg-soft/40 py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Process"
          title="From brief to launch"
          description="A clear, collaborative workflow designed for predictable timelines and premium outcomes."
        />

        <div className="relative">
          <div className="absolute top-10 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent xl:block" />
          <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 xl:grid-cols-7 xl:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  className="relative flex min-w-[140px] flex-col items-center text-center sm:min-w-0"
                >
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-bg-elevated text-accent shadow-[0_0_30px_rgba(239,68,68,0.12)]">
                    <Icon size={26} />
                  </div>
                  <p className="mb-1 text-xs font-semibold tracking-widest text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
