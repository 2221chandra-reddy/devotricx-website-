"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  className?: string;
};

export default function LazyVideo({ src, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.2;
        if (visible) setLoaded(true);
        if (reduced) {
          el.pause();
          return;
        }
        if (visible) {
          void el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: [0, 0.2, 0.4], rootMargin: "100px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !loaded) return;
    void el.play().catch(() => undefined);
  }, [loaded]);

  return (
    <video
      ref={ref}
      className={className}
      src={loaded ? src : undefined}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
