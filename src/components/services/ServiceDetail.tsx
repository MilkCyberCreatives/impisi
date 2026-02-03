"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useState } from "react";
import type { ServiceItem } from "@/data/services";

const BRAND = "#031f3e";

export default function ServiceDetail({ service }: { service: ServiceItem }) {
  const [hover, setHover] = useState(false);

  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 320, damping: 34, mass: 0.55 });
  const csy = useSpring(cy, { stiffness: 320, damping: 34, mass: 0.55 });

  const water = useMotionTemplate`
    radial-gradient(820px 560px at ${csx}% ${csy}%,
      rgba(255,255,255,0.16),
      rgba(255,255,255,0.05) 45%,
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
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={onMove}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
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
          className="relative grid gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
              SERVICE DETAIL
            </div>

            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {service.title}
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              {service.summary}
            </p>

            <div className="mt-8 h-px w-full bg-white/10" />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.highlights.map((h) => (
                <div
                  key={h}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                >
                  <div className="text-sm font-semibold text-white/85">{h}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
              <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
                DELIVERY FOCUS
              </div>

              <div className="mt-5 space-y-4">
                {service.sections.map((sec) => (
                  <div key={sec.heading}>
                    <div className="text-sm font-semibold text-white">
                      {sec.heading}
                    </div>
                    <div className="mt-3 space-y-2">
                      {sec.bullets.map((b) => (
                        <div key={b} className="flex items-start gap-3">
                          <span className="mt-[7px] h-2 w-2 rounded-full bg-white/60" />
                          <span className="text-sm leading-relaxed text-white/75">
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 h-px w-full bg-white/10" />
                  </div>
                ))}
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-18 blur-3xl"
                style={{ background: BRAND }}
              />
            </div>
          </div>
        </motion.div>

        <div className="mt-14 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
