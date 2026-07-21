"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { ServiceVideo } from "@/lib/serviceVideos";

type Props = {
  video: ServiceVideo | null;
  onClose: () => void;
};

export default function VideoModal({ video, onClose }: Props) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video ? (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            aria-label="Close video"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
              <h3 className="font-display text-sm font-semibold tracking-wide text-white sm:text-base">
                {video.title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-accent hover:text-accent"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="aspect-video bg-black">
              <video
                key={video.src}
                src={video.src}
                controls
                autoPlay
                playsInline
                className="h-full w-full"
              >
                Your browser does not support this video.
              </video>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
