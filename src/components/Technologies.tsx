"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const technologies = [
  "React",
  "Next.js",
  "Python",
  "Django",
  "Unity",
  "Unreal Engine",
  "Three.js",
  "Articulate Storyline",
  "Rise 360",
  "Blender",
  "After Effects",
  "Photoshop",
  "Illustrator",
];

export default function Technologies() {
  const loop = [...technologies, ...technologies];

  return (
    <section id="technologies" className="section-pad relative overflow-hidden bg-bg-soft/40 py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Technologies"
          title="Built with industry-leading tools"
          description="From real-time engines to modern web stacks and authoring platforms."
        />
      </div>

      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
        <div className="overflow-hidden">
          <div className="marquee gap-4">
            {loop.map((tech, i) => (
              <motion.div
                key={`${tech}-${i}`}
                whileHover={{ y: -4 }}
                className="glass mx-2 flex h-16 min-w-[180px] items-center justify-center rounded-2xl px-6"
              >
                <span className="font-display text-sm font-semibold tracking-wide text-foreground">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
