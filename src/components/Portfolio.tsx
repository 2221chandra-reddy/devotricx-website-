"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import VideoModal from "./VideoModal";
import LazyVideo from "./LazyVideo";
import type { ServiceVideo } from "@/lib/serviceVideos";

const solutions = [
  {
    category: "Animation",
    title: "Product Launch Animation",
    desc: "Cinematic 3D product reveals with motion graphics that captivate audiences.",
    theme: "red" as const,
    video: "/videos/animation.mp4",
  },
  {
    category: "VR",
    title: "Immersive Training VR",
    desc: "Interactive VR modules for industrial safety and skill onboarding.",
    theme: "blue" as const,
    video: "/videos/vr-ar.mp4",
  },
  {
    category: "Web",
    title: "Enterprise Web Platform",
    desc: "High-performance React platforms built for scale, speed, and conversion.",
    theme: "purple" as const,
    video: "/videos/web-solutions.mp4",
  },
  {
    category: "E-Learning",
    title: "SCORM Learning Suite",
    desc: "Storyline-powered courses with gamification and LMS integration.",
    theme: "green" as const,
    video: "/videos/e-learning.mp4",
  },
  {
    category: "Animation",
    title: "Architectural Walkthrough",
    desc: "Photoreal 3D walkthroughs for real-estate and spatial storytelling.",
    theme: "orange" as const,
    video: "/videos/2d-animation.mp4",
  },
  {
    category: "VR / AR",
    title: "AR Product Demo",
    desc: "Mobile AR experiences for interactive product exploration.",
    theme: "pink" as const,
    video: "/videos/vr-ar.mp4",
  },
];

export default function Portfolio() {
  const [activeVideo, setActiveVideo] = useState<ServiceVideo | null>(null);

  return (
    <section id="portfolio" className="solutions-section section-pad relative overflow-hidden py-24 md:py-32">
      <div className="solutions-aurora" aria-hidden />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="solutions-eyebrow mb-4 inline-flex items-center gap-3">
            <span className="solutions-eyebrow-line" />
            <span className="text-sm font-semibold tracking-[0.28em] text-accent uppercase">
              Featured Work
            </span>
            <span className="solutions-eyebrow-line" />
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Solutions That Drive{" "}
            <span className="text-accent">Digital</span>{" "}
            <span className="solutions-gradient-word">Excellence</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Selected animation, immersive, web, and learning work crafted for modern brands.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {solutions.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className={`sol-card sol-card-${item.theme} group relative overflow-hidden rounded-[1.35rem]`}
            >
              <div className="sol-media relative aspect-[16/11] overflow-hidden">
                <div className="sol-media-glow" aria-hidden />
                <LazyVideo
                  className="relative z-[1] h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  src={item.video}
                />
                <div className="sol-media-fade" aria-hidden />
              </div>

              <div className="relative z-10 px-5 pt-4 pb-5">
                <p className="sol-cat mb-2 text-[11px] font-bold tracking-[0.2em] uppercase">
                  {item.category}
                </p>
                <h3 className="font-display pr-12 text-lg font-bold text-foreground md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[95%] text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setActiveVideo({
                      key: "3d-animation",
                      title: item.title,
                      src: item.video,
                    })
                  }
                  className="sol-cta absolute right-5 bottom-5 flex h-10 w-10 items-center justify-center rounded-full text-white transition group-hover:scale-110"
                  aria-label={`Watch ${item.title}`}
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
