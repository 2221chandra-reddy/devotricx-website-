"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

export default function CTA() {
  return (
    <section className="section-pad relative py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container-site relative overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white px-8 py-16 text-center shadow-[0_10px_30px_rgba(15,23,42,0.06)] md:px-16"
      >
        <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <p className="relative mb-3 text-sm font-semibold tracking-[0.24em] text-accent uppercase">
          Ready when you are
        </p>
        <h2 className="font-display relative text-3xl font-bold text-foreground md:text-5xl">
          Let&apos;s build your next immersive experience
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-base text-muted md:text-lg">
          Tell us about your goals—we’ll map the right mix of animation, VR/AR, web, and
          e-learning.
        </p>
        <a href="#contact" className="btn-primary relative mt-8 inline-flex">
          <CalendarDays size={18} />
          Schedule a Meeting
        </a>
      </motion.div>
    </section>
  );
}
