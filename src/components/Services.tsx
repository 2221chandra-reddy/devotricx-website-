"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Box,
  Clapperboard,
  Glasses,
  GraduationCap,
  MonitorSmartphone,
  Play,
  User,
} from "lucide-react";
import { useState } from "react";
import {
  serviceVideos,
  type ServiceVideo,
  type ServiceVideoKey,
} from "@/lib/serviceVideos";
import SectionHeading from "./SectionHeading";
import VideoModal from "./VideoModal";
import LazyVideo from "./LazyVideo";

const services = [
  {
    icon: Clapperboard,
    title: "2D & 3D Animation",
    theme: "red" as const,
    videoKey: "2d-3d-animation" as ServiceVideoKey,
    preview: "/videos/3d-animation.mp4",
    items: [
      "Character Animation",
      "Product Animation",
      "Motion Graphics",
      "Architectural Walkthrough",
    ],
  },
  {
    icon: Glasses,
    title: "VR & AR",
    theme: "purple" as const,
    videoKey: "vr-ar" as ServiceVideoKey,
    preview: "/videos/vr-ar.mp4",
    items: [
      "Virtual Reality",
      "Augmented Reality",
      "Interactive Simulations",
      "Training Modules",
    ],
  },
  {
    icon: MonitorSmartphone,
    title: "Web Solutions",
    theme: "blue" as const,
    videoKey: "web-solutions" as ServiceVideoKey,
    preview: "/videos/web-solutions.mp4",
    items: [
      "Corporate Websites",
      "ERP & CRM",
      "React Applications",
      "Python Development",
    ],
  },
  {
    icon: GraduationCap,
    title: "e-Learning",
    theme: "green" as const,
    videoKey: "e-learning" as ServiceVideoKey,
    preview: "/videos/e-learning.mp4",
    items: ["Storyline 360", "Rise 360", "SCORM & xAPI", "LMS Development"],
  },
];

function CardVisual({
  theme,
  preview,
}: {
  theme: (typeof services)[number]["theme"];
  preview: string;
}) {
  return (
    <div className={`svc-visual svc-visual-${theme}`} aria-hidden>
      <div className="svc-visual-glow" />
      <div className="svc-visual-mesh" />

      {theme === "red" ? (
        <div className="svc-art svc-art-film">
          <span />
          <span />
          <span />
        </div>
      ) : null}

      {theme === "purple" ? (
        <div className="svc-art svc-art-vr">
          <div className="svc-vr-ring" />
          <div className="svc-vr-headset">
            <i />
            <i />
          </div>
        </div>
      ) : null}

      {theme === "blue" ? (
        <div className="svc-art svc-art-devices">
          <div className="svc-laptop">
            <div className="svc-laptop-screen" />
            <div className="svc-laptop-base" />
          </div>
          <div className="svc-phone" />
        </div>
      ) : null}

      {theme === "green" ? (
        <div className="svc-art svc-art-learn">
          <div className="svc-tablet">
            <BookOpen size={28} />
          </div>
          <span className="svc-float-icon svc-float-play">
            <Play size={12} fill="currentColor" />
          </span>
          <span className="svc-float-icon svc-float-user">
            <User size={12} />
          </span>
          <span className="svc-float-icon svc-float-chart">
            <BarChart3 size={12} />
          </span>
        </div>
      ) : null}

      <LazyVideo className="svc-preview-video" src={preview} />
    </div>
  );
}

export default function Services() {
  const [activeVideo, setActiveVideo] = useState<ServiceVideo | null>(null);

  return (
    <section id="services" className="section-pad relative bg-bg-soft/50 py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Services"
          title="Premium digital capabilities"
          description="Four focused service lines built to turn ideas into production-ready immersive experiences."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className={`svc-card svc-card-${service.theme} group relative overflow-hidden rounded-[1.6rem] p-6 md:p-7`}
              >
                <div className="svc-card-shine" aria-hidden />

                <div className="relative z-10 flex items-center gap-3.5">
                  <div className="svc-card-icon flex h-12 w-12 items-center justify-center rounded-xl text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                    {service.title}
                  </h3>
                </div>

                <div className="svc-card-rule relative z-10 mt-4 mb-5" />

                <div className="relative z-10 grid grid-cols-1 items-end gap-4 min-[480px]:grid-cols-[1.05fr_1fr]">
                  <ul className="space-y-3 pb-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-muted sm:text-[0.95rem]"
                      >
                        <Box size={13} className="svc-card-bullet shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <CardVisual theme={service.theme} preview={service.preview} />
                </div>

                <button
                  type="button"
                  onClick={() => setActiveVideo(serviceVideos[service.videoKey])}
                  className="svc-card-cta absolute right-5 bottom-5 z-20 flex h-11 w-11 items-center justify-center rounded-full text-white transition group-hover:scale-110"
                  aria-label={`Watch ${service.title} video`}
                >
                  <ArrowRight size={18} />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
