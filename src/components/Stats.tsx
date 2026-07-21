"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { companyStats } from "@/lib/company";

const stats = companyStats.map((s) => ({
  value: s.value,
  suffix: s.suffix,
  label: s.label,
}));

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 48;
    const tick = () => {
      frame += 1;
      const progress = Math.min(frame / total, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-5xl font-bold text-foreground md:text-6xl">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="why-us" className="section-pad relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Results that speak for themselves"
          description="A delivery-focused studio trusted by organizations that need polished immersive experiences."
        />

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-3xl px-6 py-10 text-center"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-sm tracking-wide text-muted uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
