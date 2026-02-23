"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useState } from "react";

const BRAND = "#031f3e";

export default function ProjectsOverview() {
  const [hover, setHover] = useState(false);

  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 320, damping: 34, mass: 0.55 });
  const csy = useSpring(cy, { stiffness: 320, damping: 34, mass: 0.55 });

  const water = useMotionTemplate`
    radial-gradient(760px 520px at ${csx}% ${csy}%,
      rgba(255,255,255,0.18),
      rgba(255,255,255,0.06) 45%,
      rgba(255,255,255,0.00) 78%
    )
  `;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cx.set(Math.max(0, Math.min(100, x)));
    cy.set(Math.max(0, Math.min(100, y)));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#020814] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
              PROJECT DEVELOPMENT
            </div>

            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              A scalable platform focused on disciplined growth.
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              Impisi Resources is building a scalable mining and beneficiation platform focused on expanding ROM supply
              security, increasing beneficiation capacity, extending reserve life through exploration, and developing
              additional processing assets.
            </p>

            <div className="mt-8 h-px w-full bg-white/10" />
            <div className="mt-6 text-sm text-white/75">
              Growth targets are aligned with market demand and infrastructure availability.
            </div>
          </div>

          <motion.div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseMove={onMove}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl lg:col-span-5"
          >
            <div className="relative h-[320px] w-full sm:h-[360px]">
              <Image
                src="/deliver.jpg"
                alt="Project development"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${BRAND} 0%, rgba(3,31,62,0.78) 30%, rgba(3,31,62,0.18) 62%, rgba(3,31,62,0) 86%)`,
                }}
              />
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
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs font-semibold tracking-[0.28em] text-white/70">
                  SCALABLE PLATFORM
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  Disciplined execution and rollout
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-14 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
