"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function MouseGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 180);
      y.set(e.clientY - 180);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-30 hidden h-[360px] w-[360px] rounded-full md:block"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(225,6,0,0.16) 0%, rgba(225,6,0,0) 70%)",
      }}
    />
  );
}
