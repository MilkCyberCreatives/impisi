"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type Dot = {
  id: string;
  size: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  opacity: number;
};

export default function Particles({
  active,
  count = 28,
}: {
  active: boolean;
  count?: number;
}) {
  const dots = useMemo<Dot[]>(() => {
    const arr: Dot[] = [];
    for (let i = 0; i < count; i++) {
      const size = 2 + Math.random() * 3.5;
      arr.push({
        id: `dot-${i}`,
        size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3.8 + Math.random() * 3.6,
        delay: Math.random() * 1.4,
        opacity: 0.15 + Math.random() * 0.25,
      });
    }
    return arr;
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{
            width: d.size,
            height: d.size,
            left: d.left,
            top: d.top,
            opacity: d.opacity,
            filter: "blur(0.2px)",
          }}
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={
            active
              ? {
                  y: [0, -18, 0],
                  x: [0, 10, 0],
                  opacity: [0, d.opacity, 0],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* soft particle haze */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.25 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            "radial-gradient(900px 420px at 50% 20%, rgba(255,255,255,.10), transparent 60%)",
        }}
      />
    </div>
  );
}
