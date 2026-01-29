"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useState } from "react";

const BRAND = "#031f3e";

export default function MiningOverview() {
  const [hover, setHover] = useState(false);

  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 320, damping: 34, mass: 0.55 });
  const csy = useSpring(cy, { stiffness: 320, damping: 34, mass: 0.55 });

  // Noticeable water effect
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
          {/* Text */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
              MINING OPERATIONS
            </div>

            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Development, management, and optimisation of mining operations.
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              Impisi Resources is actively involved in the development, management, and optimisation
              of mining operations, primarily within open-pit and near-surface environments suited to
              bulk commodity extraction.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              Mining plans are designed to align directly with beneficiation requirements, ensuring
              consistent feed quality, yield optimisation, and operational stability.
            </p>

            <div className="mt-8 h-px w-full bg-white/10" />
          </div>

          {/* Image card */}
          <div className="lg:col-span-5">
            <motion.div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onMouseMove={onMove}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <div className="relative h-[320px] w-full sm:h-[360px]">
                <Image
                  src="/hero/service-mining.jpg"
                  alt="Mining operations"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${BRAND} 0%, rgba(3,31,62,0.78) 30%, rgba(3,31,62,0.18) 62%, rgba(3,31,62,0) 86%)`,
                  }}
                />

                {/* Water overlay */}
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
                  <div className="text-xs (font-semibold) tracking-[0.28em] text-white/70">
                    OPERATIONAL EXECUTION
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    Open-pit & near-surface environments
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-14 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
