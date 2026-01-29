"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useState } from "react";
import { Leaf, Users, Droplet, Recycle } from "lucide-react";

const BRAND = "#031f3e";

const points = [
  {
    title: "Progressive rehabilitation",
    icon: Recycle,
    desc: "Progressive rehabilitation of disturbed areas.",
  },
  {
    title: "Responsible water management",
    icon: Droplet,
    desc: "Responsible water management and recycling.",
  },
  {
    title: "Environmental controls",
    icon: Leaf,
    desc: "Dust, noise, and environmental controls.",
  },
  {
    title: "Community upliftment",
    icon: Users,
    desc: "Local employment, skills development, and community upliftment.",
  },
];

export default function AboutSustainability() {
  const [hover, setHover] = useState(false);

  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 280, damping: 32, mass: 0.6 });
  const csy = useSpring(cy, { stiffness: 280, damping: 32, mass: 0.6 });

  const water = useMotionTemplate`
    radial-gradient(520px 360px at ${csx}% ${csy}%,
      rgba(255,255,255,0.14),
      rgba(255,255,255,0.05) 38%,
      rgba(255,255,255,0.00) 72%
    )
  `;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cx.set(Math.max(0, Math.min(100, x)));
    cy.set(Math.max(0, Math.min(100, y)));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#020814] py-16 sm:py-20">
      <div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={onMove}
      >
        {/* water overlay */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: hover ? 1 : 0,
            background: water,
            mixBlendMode: "overlay",
            transition: "opacity 180ms ease",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
            SUSTAINABILITY & COMMUNITY IMPACT
          </div>

          <h3 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
            Responsible mining supports long-term success.
          </h3>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {points.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/18 hover:bg-white/7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/6">
                    <Icon size={20} className="text-white/85" />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-white">
                    {p.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">
                    {p.desc}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 h-px w-full bg-white/10" />
          <div className="mt-6 text-xs text-white/60">
            Integrity • Responsibility • Long-term partnerships
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-18 blur-3xl"
            style={{ background: BRAND }}
          />
        </motion.div>

        <div className="mt-14 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
