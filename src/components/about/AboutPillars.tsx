"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BRAND = "#031f3e";

export default function AboutPillars() {
  const slides = useMemo(
    () => [
      {
        title: "Mining Operations",
        desc: "Operational execution aligned to beneficiation requirements and consistent output.",
        img: "/hero/service-mining.jpg",
      },
      {
        title: "Exploration & Resource Development",
        desc: "Commercially focused exploration supporting reserve sustainability and growth.",
        img: "/hero/service-logistics.jpg",
      },
      {
        title: "Mineral Processing & Beneficiation",
        desc: "Recovery focus, sizing, blending and quality control structured for consistency.",
        img: "/hero/service-beneficiation.jpg",
      },
      {
        title: "Commodity Trading & Offtake",
        desc: "Market delivery coordination, specification management, and offtake alignment.",
        img: "/hero/service-trading.jpg",
      },
      {
        title: "Logistics / Project Delivery",
        desc: "Integrated delivery execution supporting predictable outcomes and disciplined rollout.",
        img: "/deliver.jpg",
      },
    ],
    []
  );

  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);

  // noticeable water effect
  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 320, damping: 34, mass: 0.55 });
  const csy = useSpring(cy, { stiffness: 320, damping: 34, mass: 0.55 });

  const water = useMotionTemplate`
    radial-gradient(760px 520px at ${csx}% ${csy}%,
      rgba(255,255,255,0.28),
      rgba(255,255,255,0.10) 40%,
      rgba(255,255,255,0.00) 75%
    )
  `;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cx.set(Math.max(0, Math.min(100, x)));
    cy.set(Math.max(0, Math.min(100, y)));
  };

  const prev = () => setI((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setI((p) => (p + 1) % slides.length);

  // auto-advance (pauses on hover)
  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => next(), 5200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover]);

  return (
    <section className="relative w-full overflow-hidden bg-[#020814] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
            CORE BUSINESS PILLARS
          </div>
          <h3 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
            A platform built across the value chain
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            From execution to delivery — structured for operational control, quality consistency and disciplined rollout.
          </p>
          <div className="mt-8 h-px w-full bg-white/10" />
        </motion.div>

        {/* slider */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="mt-10"
        >
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseMove={onMove}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
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

            <div className="relative grid lg:grid-cols-12">
              {/* image */}
              <div className="relative h-[280px] sm:h-[360px] lg:col-span-7 lg:h-[440px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slides[i].img}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={slides[i].img} alt={slides[i].title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${BRAND} 0%, rgba(3,31,62,0.78) 30%, rgba(3,31,62,0.18) 62%, rgba(3,31,62,0) 86%)`,
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* arrows */}
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-3 text-white/90 backdrop-blur-xl transition hover:bg-white/16"
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-3 text-white/90 backdrop-blur-xl transition hover:bg-white/16"
                  aria-label="Next"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* text */}
              <div className="relative p-7 sm:p-9 lg:col-span-5">
                <div className="text-xs font-semibold tracking-[0.28em] text-white/60">
                  {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </div>

                <div className="mt-4 text-2xl font-semibold text-white">
                  {slides[i].title}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  {slides[i].desc}
                </p>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent" />

                {/* dots */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setI(idx)}
                      className="h-2.5 w-2.5 rounded-full transition"
                      style={{
                        background:
                          idx === i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.28)",
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                      type="button"
                    />
                  ))}
                </div>

                {/* corner aura */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-18 blur-3xl"
                  style={{ background: BRAND }}
                />
              </div>
            </div>
          </div>

          <div className="mt-14 h-px w-full bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
