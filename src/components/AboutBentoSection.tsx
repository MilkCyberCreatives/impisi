"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Pickaxe, Map, Factory, Ship, Building2, ShieldCheck } from "lucide-react";

const BRAND = "#031f3e";

/**
 * Scroll reveal that always feels noticeable:
 * - rootMargin delays trigger until section is more "in"
 * - small delay ensures the user sees the animation even on fast scroll
 */
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // small delay so it feels intentional, not instant
          setTimeout(() => setShown(true), 120);
          obs.disconnect();
        }
      },
      {
        threshold: 0.2,
        root: null,
        // Trigger when the section is a bit deeper in view (prevents instant above-fold triggers)
        rootMargin: "0px 0px -20% 0px",
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, shown };
}

const items = [
  {
    title: "Mining Operations",
    icon: Pickaxe,
    desc: "Production execution and operational alignment.",
  },
  {
    title: "Exploration",
    icon: Map,
    desc: "Resource development and reserve sustainability.",
  },
  {
    title: "Beneficiation",
    icon: Factory,
    desc: "Processing, recovery focus and quality control.",
  },
  {
    title: "Commodity Trading",
    icon: Ship,
    desc: "Offtake capability and market delivery coordination.",
  },
  {
    title: "Project Development",
    icon: Building2,
    desc: "Planning, scalability and disciplined growth.",
  },
  {
    title: "Governance",
    icon: ShieldCheck,
    desc: "Compliance-first operations and stakeholder engagement.",
  },
];

export default function AboutBentoSection() {
  const { ref, shown } = useReveal();
  const zoneRef = useRef<HTMLDivElement | null>(null);

  // Cursor dot + water effect (motion values = smooth, no rerenders)
  const [cursorOn, setCursorOn] = useState(false);

  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 320, damping: 35, mass: 0.55 });
  const csy = useSpring(cy, { stiffness: 320, damping: 35, mass: 0.55 });

  const waterBg = useMotionTemplate`
    radial-gradient(380px 260px at ${csx}% ${csy}%,
      rgba(255,255,255,0.22),
      rgba(255,255,255,0.10) 35%,
      rgba(255,255,255,0.00) 70%
    ),
    radial-gradient(760px 520px at ${csx}% ${csy}%,
      rgba(255,255,255,0.10),
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

  // subtle “sheen” sweep across background for premium feel
  const sheen = useMemo(
    () =>
      `linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.05) 42%, transparent 65%)`,
    []
  );

  return (
    <section id="about" className="relative w-full overflow-hidden bg-black py-20 sm:py-24">
      {/* premium background (matches hero) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(1000px 520px at 20% 0%, rgba(255,255,255,0.06), transparent 60%),
            radial-gradient(900px 520px at 90% 10%, rgba(255,255,255,0.05), transparent 60%),
            linear-gradient(180deg, rgba(3,31,62,0.22) 0%, rgba(0,0,0,1) 70%)
          `,
        }}
      />

      {/* subtle moving sheen (only visible after reveal) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0"
        animate={shown ? { opacity: 1, x: ["-15%", "15%"] } : { opacity: 0 }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: sheen, mixBlendMode: "overlay" }}
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cursor zone */}
        <div
          ref={zoneRef}
          onMouseEnter={() => setCursorOn(true)}
          onMouseLeave={() => setCursorOn(false)}
          onMouseMove={onMove}
          className="relative"
        >
          {/* Water glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: cursorOn ? 1 : 0,
              background: waterBg,
              mixBlendMode: "overlay",
              transition: "opacity 180ms ease",
            }}
          />

          {/* Cursor dot */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: cursorOn ? 1 : 0,
              transition: "opacity 160ms ease",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                left: useMotionTemplate`${csx}%`,
                top: useMotionTemplate`${csy}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_26px_rgba(255,255,255,0.55)]" />
                <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/5 backdrop-blur" />
              </div>
            </motion.div>
          </motion.div>

          {/* Centered intro */}
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
            animate={
              shown
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 18, filter: "blur(12px)" }
            }
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
              CORPORATE OVERVIEW
            </div>

            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Corporate Overview
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-pretty text-sm leading-relaxed text-white/75 sm:text-base">
              Impisi Resources is a South African-based, vertically integrated mining, mineral processing, and
              commodities group, focused on the development, operation, and optimisation of mining assets across
              the bulk and industrial minerals sector.
            </p>

            <p className="mx-auto mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-white/75 sm:text-base">
              The company has established itself as a hands-on operator with strong technical, commercial, and
              regulatory capability, specialising in the extraction, beneficiation, and trading of chrome ore,
              with expansion into additional commodities where processing synergies and market fundamentals support
              value creation.
            </p>

            <p className="mx-auto mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-white/75 sm:text-base">
              Impisi Resources operates across the full mining value chain — from exploration and ore access
              through to processing, logistics, and market delivery — enabling tight operational control, margin
              optimisation, and long-term sustainability.
            </p>

            <div className="mx-auto mt-10 h-px w-44 bg-white/12" />
          </motion.div>

          {/* Icon grid (staggered reveal + smooth hover) */}
          <motion.div
            initial="hidden"
            animate={shown ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.085, delayChildren: 0.25 } },
            }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <motion.div
                  key={it.title}
                  variants={{
                    hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-white/18 hover:bg-white/7"
                >
                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(700px 420px at 50% 20%, rgba(255,255,255,.12), transparent 60%)",
                    }}
                  />

                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8">
                      <Icon className="text-white/85" size={22} />
                    </div>

                    <div className="min-w-0">
                      <div className="text-base font-semibold text-white">{it.title}</div>
                      <div className="mt-2 text-sm leading-relaxed text-white/70">{it.desc}</div>

                      <div className="mt-5 h-px w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent" />
                    </div>
                  </div>

                  {/* Brand aura */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
                    style={{ background: BRAND }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
