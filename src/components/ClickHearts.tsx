"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Heart = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  drift: number;
  rise: number;
  rotate: number;
};

const COLORS = ["#ff4d6d", "#ff6b81", "#ff8fa3", "#ef4444", "#ff3366", "#ff99ac"];

let nextId = 0;

export default function ClickHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) {
        return;
      }

      const burst = Array.from({ length: 3 }, (_, i) => {
        nextId += 1;
        return {
          id: nextId,
          x: e.clientX + (Math.random() - 0.5) * 36,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: 14 + Math.random() * 16 + (i === 0 ? 6 : 0),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          drift: (Math.random() - 0.5) * 80,
          rise: 110 + Math.random() * 40,
          rotate: (Math.random() - 0.5) * 50,
        };
      });

      setHearts((prev) => [...prev, ...burst].slice(-40));

      window.setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !burst.some((b) => b.id === h.id)));
      }, 1200);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            initial={{ opacity: 0.95, scale: 0.4, y: 0, x: 0 }}
            animate={{
              opacity: 0,
              scale: 1.25,
              y: -heart.rise,
              x: heart.drift,
              rotate: heart.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.05, ease: "easeOut" }}
            className="absolute select-none"
            style={{
              left: heart.x,
              top: heart.y,
              fontSize: heart.size,
              color: heart.color,
              textShadow: `0 0 10px ${heart.color}88`,
              transform: "translate(-50%, -50%)",
            }}
          >
            ♥
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
