"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

type Node3D = {
  x: number;
  y: number;
  z: number;
  size: number;
};

const FOV = 320;
const LINK_DIST = 0.42;

export default function ParticleBackground({ forceDark = false }: { forceDark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(forceDark ? "dark" : theme);
  themeRef.current = forceDark ? "dark" : theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let nodes: Node3D[] = [];
    let t = 0;
    let running = true;

    const nodeCount = () => (width < 768 ? 48 : 78);

    const spawn = (): Node3D => ({
      x: (Math.random() - 0.5) * 2.4,
      y: (Math.random() - 0.5) * 1.8,
      z: Math.random() * 2.8 + 0.35,
      size: Math.random() * 1.6 + 0.5,
    });

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: nodeCount() }, spawn);
    };

    const project = (n: Node3D) => {
      const scale = FOV / (FOV * 0.35 + n.z * 180);
      return {
        sx: width * 0.5 + n.x * scale * width * 0.42,
        sy: height * 0.48 + n.y * scale * height * 0.42,
        scale,
        r: n.size * scale * 2.8,
      };
    };

    const drawGrid = (isLight: boolean) => {
      const cx = width * 0.5;
      const cy = height * 0.52;
      ctx.save();
      ctx.strokeStyle = isLight
        ? "rgba(11, 40, 80, 0.08)"
        : "rgba(80, 170, 255, 0.07)";
      ctx.lineWidth = 1;

      // perspective floor/horizon lines
      for (let i = 1; i <= 10; i++) {
        const y = cy + i * i * 3.2;
        if (y > height) break;
        const spread = (i / 10) * width * 0.55;
        ctx.beginPath();
        ctx.moveTo(cx - spread, y);
        ctx.lineTo(cx + spread, y);
        ctx.stroke();
      }

      for (let i = -8; i <= 8; i++) {
        const xOff = i * (width * 0.06);
        ctx.beginPath();
        ctx.moveTo(cx + xOff * 0.15, cy);
        ctx.lineTo(cx + xOff, height);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawStreaks = (isLight: boolean) => {
      const cx = width * 0.5;
      const cy = height * 0.48;
      for (let i = 0; i < 18; i++) {
        const ang = (i / 18) * Math.PI * 2 + t * 0.015;
        const len = 80 + ((i * 37) % 90);
        const dist = 40 + ((i * 53) % 120) + Math.sin(t * 0.02 + i) * 20;
        const x1 = cx + Math.cos(ang) * dist;
        const y1 = cy + Math.sin(ang) * dist * 0.7;
        const x2 = cx + Math.cos(ang) * (dist + len);
        const y2 = cy + Math.sin(ang) * (dist + len) * 0.7;
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        const a = isLight ? 0.12 : 0.22;
        grad.addColorStop(0, `rgba(0, 200, 255, ${a})`);
        grad.addColorStop(1, "rgba(0, 200, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 + (i % 3) * 0.6;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    };

    const draw = () => {
      if (!running) return;
      t += 1;
      ctx.clearRect(0, 0, width, height);
      const isLight = themeRef.current === "light";

      // deep space wash
      const wash = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.7,
      );
      if (isLight) {
        wash.addColorStop(0, "rgba(180, 220, 255, 0.35)");
        wash.addColorStop(0.55, "rgba(210, 230, 250, 0.12)");
        wash.addColorStop(1, "rgba(230, 240, 250, 0)");
      } else {
        wash.addColorStop(0, "rgba(0, 90, 180, 0.22)");
        wash.addColorStop(0.4, "rgba(0, 40, 90, 0.18)");
        wash.addColorStop(1, "rgba(0, 10, 30, 0)");
      }
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      drawGrid(isLight);
      drawStreaks(isLight);

      // advance nodes toward camera
      for (const n of nodes) {
        n.z -= 0.0065;
        n.x += Math.sin(t * 0.01 + n.y * 3) * 0.00035;
        n.y += Math.cos(t * 0.008 + n.x * 3) * 0.0003;
        if (n.z < 0.12) {
          Object.assign(n, spawn());
          n.z = 2.6 + Math.random() * 0.5;
        }
      }

      const projected = nodes
        .map((n) => ({ n, p: project(n) }))
        .sort((a, b) => b.n.z - a.n.z);

      // connections (3D distance)
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i].n;
          const b = projected[j].n;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const dist = Math.hypot(dx, dy, dz);
          if (dist > LINK_DIST) continue;

          const pa = projected[i].p;
          const pb = projected[j].p;
          const depthFade = Math.min(pa.scale, pb.scale);
          const alpha =
            (1 - dist / LINK_DIST) * depthFade * (isLight ? 0.55 : 0.75);

          ctx.strokeStyle = isLight
            ? `rgba(20, 90, 160, ${alpha * 0.55})`
            : `rgba(100, 210, 255, ${alpha})`;
          ctx.lineWidth = Math.max(0.4, depthFade * 1.4);
          ctx.beginPath();
          ctx.moveTo(pa.sx, pa.sy);
          ctx.lineTo(pb.sx, pb.sy);
          ctx.stroke();
        }
      }

      // nodes with bloom
      for (const { p } of projected) {
        const r = Math.max(0.8, p.r);
        const glow = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 4);
        if (isLight) {
          glow.addColorStop(0, `rgba(40, 130, 220, ${0.55 * p.scale})`);
          glow.addColorStop(0.4, `rgba(60, 150, 230, ${0.18 * p.scale})`);
          glow.addColorStop(1, "rgba(80, 160, 240, 0)");
        } else {
          glow.addColorStop(0, `rgba(180, 240, 255, ${0.95 * p.scale})`);
          glow.addColorStop(0.25, `rgba(0, 200, 255, ${0.45 * p.scale})`);
          glow.addColorStop(1, "rgba(0, 140, 255, 0)");
        }
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(20, 70, 140, ${0.75 * p.scale})`
          : `rgba(220, 250, 255, ${0.9 * p.scale})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
