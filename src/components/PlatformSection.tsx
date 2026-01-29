"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

const BRAND = "#031f3e";

type Item = {
  label: string;
  title: string;
  desc: string;
  img: string;
  anchor: string;
};

export default function PlatformSection() {
  const items: Item[] = useMemo(
    () => [
      {
        label: "Operational Control",
        title: "Planning, coordination and execution you can measure",
        desc: "We focus on disciplined coordination between teams, schedules and outputs — so delivery is consistent, decisions are fast, and performance remains stable under changing conditions.",
        img: "/platform.jpg",
        anchor: "#mining",
      },
      {
        label: "Quality & Beneficiation",
        title: "Specification-led processing and quality assurance",
        desc: "Our approach prioritises recovery focus, product consistency and quality control — ensuring beneficiation supports market requirements and reduces avoidable variation across deliveries.",
        img: "/platform.jpg",
        anchor: "#beneficiation",
      },
      {
        label: "Delivery & Growth",
        title: "Market readiness, offtake alignment and project development",
        desc: "We align product readiness with logistics and delivery planning, enabling smoother offtake execution and supporting scalable project development through disciplined rollout and governance.",
        img: "/platform.jpg",
        anchor: "#projects",
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Left image effects
  const [hoverLeft, setHoverLeft] = useState(false);
  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 280, damping: 32, mass: 0.6 });
  const csy = useSpring(cy, { stiffness: 280, damping: 32, mass: 0.6 });

  const water = useMotionTemplate`
    radial-gradient(520px 360px at ${csx}% ${csy}%,
      rgba(255,255,255,0.18),
      rgba(255,255,255,0.07) 38%,
      rgba(255,255,255,0.00) 72%
    )
  `;

  const onLeftMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cx.set(Math.max(0, Math.min(100, x)));
    cy.set(Math.max(0, Math.min(100, y)));
  };

  // Active observer
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.index || 0);
        setActive(idx);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-25% 0px -55% 0px",
      }
    );

    rowRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={(n) => {
        // @ts-expect-error
        sectionRef.current = n;
      }}
      className="relative w-full overflow-hidden bg-black"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(1100px 560px at 15% 0%, rgba(255,255,255,0.05), transparent 60%),
            radial-gradient(1000px 520px at 90% 15%, rgba(255,255,255,0.04), transparent 62%),
            linear-gradient(180deg, rgba(3,31,62,0.18) 0%, rgba(0,0,0,1) 78%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-12">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
                  OUR PLATFORM
                </div>

                <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Built for control.
                  <br />
                  Designed for delivery.
                </h2>

                <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
                  A high-discipline operating platform that connects execution,
                  quality, and delivery — giving stakeholders confidence in
                  outcomes.
                </p>

                <div className="mt-8 h-px w-full bg-white/10" />
              </motion.div>

              <div className="mt-8">
                <div className="text-xs font-semibold tracking-[0.28em] text-white/60">
                  CURRENT HIGHLIGHT
                </div>

                <div className="mt-3 text-xl font-semibold text-white">
                  {items[active]?.label}
                </div>

                <div className="mt-3 text-sm leading-relaxed text-white/75">
                  {items[active]?.title}
                </div>

                <div className="mt-5 h-px w-24 bg-white/40" />
              </div>

              {/* ✅ Reduced spacing + reduced height to match your white line */}
              <div
                onMouseEnter={() => setHoverLeft(true)}
                onMouseLeave={() => setHoverLeft(false)}
                onMouseMove={onLeftMove}
                className="mt-6 overflow-hidden rounded-3xl border border-white/12 bg-white/5 backdrop-blur-xl"
              >
                {/* CHANGED HEIGHTS (smaller) */}
                <div className="relative h-[360px] w-full sm:h-[400px] lg:h-[440px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${items[active]?.img}-${active}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={items[active]?.img}
                        alt="Impisi Resources platform"
                        fill
                        className="object-cover transition duration-700"
                      />

                      {/* Water glow */}
                      <motion.div
                        aria-hidden
                        className="absolute inset-0"
                        animate={hoverLeft ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background: water,
                          mixBlendMode: "overlay",
                        }}
                      />

                      {/* Light sweep */}
                      <motion.div
                        aria-hidden
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={
                          hoverLeft
                            ? { opacity: 1, x: ["-20%", "20%"] }
                            : { opacity: 0 }
                        }
                        transition={{
                          duration: 2.6,
                          repeat: hoverLeft ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                        style={{
                          background:
                            "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.08) 42%, transparent 65%)",
                          mixBlendMode: "overlay",
                        }}
                      />

                      {/* Cinematic overlays */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/70" />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, ${BRAND} 0%, rgba(3,31,62,0.78) 30%, rgba(3,31,62,0.18) 62%, rgba(3,31,62,0) 86%)`,
                        }}
                      />

                      {/* Caption */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="text-xs font-semibold tracking-[0.28em] text-white/70">
                          PLATFORM IMAGE
                        </div>
                        <div className="mt-2 text-lg font-semibold text-white">
                          {items[active]?.label}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {items.map((it, idx) => (
                <motion.div
                  key={it.label}
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  data-index={idx}
                  initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                    delay: idx * 0.06,
                  }}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl sm:p-8"
                >
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-xs font-semibold tracking-[0.28em] text-white/60">
                        {String(idx + 1).padStart(2, "0")}
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            background:
                              idx === active
                                ? "rgba(255,255,255,0.85)"
                                : "rgba(255,255,255,0.25)",
                          }}
                        />
                        <span className="text-xs text-white/60">
                          {idx === active ? "Active" : " "}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-2xl font-semibold text-white">
                      {it.label}
                    </div>

                    <div className="mt-3 text-sm leading-relaxed text-white/75">
                      {it.desc}
                    </div>

                    <div className="mt-7 h-px w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent" />

                    <a
                      href={it.anchor}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white"
                    >
                      View section <span className="opacity-80">→</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 h-px w-full bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
