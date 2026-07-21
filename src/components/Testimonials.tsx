"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";

const testimonials = [
  {
    quote: "Excellent work. The animations elevated our product launch beyond expectations.",
    name: "Priya Sharma",
    role: "Marketing Director",
  },
  {
    quote: "Professional team with deep expertise in VR training modules and delivery.",
    name: "Rahul Mehta",
    role: "L&D Head",
  },
  {
    quote: "Delivered on time with polished UI and seamless backend integrations.",
    name: "Ananya Iyer",
    role: "Product Manager",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="section-pad relative py-24 md:py-32">
      <div className="container-site max-w-4xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by ambitious teams"
          description="What partners say about collaborating with DevotricX."
        />

        <div className="glass relative overflow-hidden rounded-[2rem] px-8 py-12 md:px-14 md:py-16">
          <div className="mb-6 flex gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>

          <div className="relative min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-display text-2xl leading-relaxed font-medium text-foreground md:text-3xl">
                  “{current.quote}”
                </p>
                <div className="mt-8">
                  <p className="font-semibold text-foreground">{current.name}</p>
                  <p className="text-sm text-muted">{current.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() =>
                setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:border-accent"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:border-accent"
            >
              <ChevronRight size={18} />
            </button>
            <div className="ml-3 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
