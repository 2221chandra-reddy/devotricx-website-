"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import { heroServiceButtons, serviceVideos, type ServiceVideo } from "@/lib/serviceVideos";
import ParticleBackground from "./ParticleBackground";
import VideoModal from "./VideoModal";

export default function Hero() {
  const [activeVideo, setActiveVideo] = useState<ServiceVideo | null>(null);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(225,6,0,0.22),_transparent_55%),linear-gradient(180deg,#05070f_0%,#0b1020_55%,var(--bg-soft)_100%)]" />
      <ParticleBackground />

      <div className="pointer-events-none absolute top-[15%] left-[10%] h-56 w-56 rounded-full bg-accent/20 blur-3xl pulse-glow" />
      <div className="pointer-events-none absolute right-[8%] bottom-[18%] h-64 w-64 rounded-full bg-accent/12 blur-3xl float-slow" />

      <div className="section-pad container-site relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-[11px] font-semibold tracking-[0.32em] text-muted uppercase sm:text-xs"
        >
          DEVOTRICX TECHNOLOGIES{" "}
          <span className="text-accent">PRIVATE LIMITED</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="brand-lockup"
        >
          <div className="brand-hud" aria-hidden>
            <span className="brand-hud-corner brand-hud-tl" />
            <span className="brand-hud-corner brand-hud-tr" />
            <span className="brand-hud-corner brand-hud-bl" />
            <span className="brand-hud-corner brand-hud-br" />
            <span className="brand-hud-line brand-hud-line-top" />
            <span className="brand-hud-line brand-hud-line-bottom" />
          </div>

          <h1 className="brand-title">
            <span className="brand-metal">DEVOTRIC</span>
            <span className="brand-x-wrap">
              <span className="brand-x">X</span>
              <span className="brand-x-streaks" aria-hidden>
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-8 max-w-2xl text-xl leading-relaxed text-muted md:text-2xl"
        >
          Transforming Ideas into{" "}
          <span className="font-medium text-foreground">
            Immersive Digital Experiences
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {heroServiceButtons.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveVideo(serviceVideos[item.videoKey])}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/40 px-4 py-2 text-sm text-muted backdrop-blur-sm transition hover:border-accent hover:bg-accent/10 hover:text-foreground"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Play size={12} className="text-accent opacity-70 transition group-hover:opacity-100" />
              {item.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.46 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#contact" className="btn-primary">
            Get Started
            <ArrowRight size={18} />
          </a>
          <a href="#portfolio" className="btn-secondary">
            <Play size={16} />
            View Portfolio
          </a>
        </motion.div>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
