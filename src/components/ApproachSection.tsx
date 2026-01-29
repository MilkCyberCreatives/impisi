"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ClipboardCheck, Settings2, Truck } from "lucide-react";

const BRAND = "#031f3e";

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShown(true), 90);
          obs.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -18% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, shown };
}

export default function ApproachSection() {
  const { ref, shown } = useReveal();

  // Water effect (motion values = smooth, no rerenders)
  const [hoverZone, setHoverZone] = useState(false);
  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 280, damping: 32, mass: 0.6 });
  const csy = useSpring(cy, { stiffness: 280, damping: 32, mass: 0.6 });

  const waterBg = useMotionTemplate`
    radial-gradient(520px 360px at ${csx}% ${csy}%,
      rgba(255,255,255,0.18),
      rgba(255,255,255,0.07) 38%,
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

  const steps = useMemo(
    () => [
      {
        n: "01",
        title: "Assess & Plan",
        icon: ClipboardCheck,
        points: [
          "Clarify objectives, scope and delivery requirements",
          "Align execution plan with quality and delivery targets",
          "Define measurable outputs and reporting cadence",
        ],
      },
      {
        n: "02",
        title: "Execute & Control",
        icon: Settings2,
        points: [
          "Coordinate execution for stability and consistency",
          "Maintain specification focus through quality control",
          "Manage risk through disciplined governance actions",
        ],
      },
      {
        n: "03",
        title: "Deliver & Improve",
        icon: Truck,
        points: [
          "Align dispatch and delivery with readiness requirements",
          "Review performance and optimise for improvement cycles",
          "Strengthen partner confidence with transparent reporting",
        ],
      },
    ],
    []
  );

  return (
    <section id="approach" className="relative w-full overflow-hidden bg-black">
      {/* background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(1100px 560px at 15% 0%, rgba(255,255,255,0.05), transparent 60%),
            radial-gradient(1000px 520px at 90% 15%, rgba(255,255,255,0.04), transparent 62%),
            linear-gradient(180deg, rgba(3,31,62,0.16) 0%, rgba(0,0,0,1) 80%)
          `,
        }}
      />

      <div
        ref={ref}
        onMouseEnter={() => setHoverZone(true)}
        onMouseLeave={() => setHoverZone(false)}
        onMouseMove={onMove}
        className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        {/* water overlay */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: hoverZone ? 1 : 0,
            background: waterBg,
            mixBlendMode: "overlay",
            transition: "opacity 180ms ease",
          }}
        />

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={shown ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl"
        >
          <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
            OUR APPROACH
          </div>

          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A disciplined delivery model — built for performance.
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
            A structured approach that keeps execution measurable, quality consistent,
            and delivery aligned to requirements — without unnecessary complexity.
          </p>

          <div className="mt-8 h-px w-full bg-white/10" />
        </motion.div>

        {/* steps */}
        <motion.div
          initial="hidden"
          animate={shown ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.16 } },
          }}
          className="relative mt-10 grid gap-6 lg:grid-cols-3"
        >
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                variants={{
                  hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
              >
                {/* hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(900px 520px at 50% 15%, rgba(255,255,255,0.10), transparent 60%)",
                  }}
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs font-semibold tracking-[0.28em] text-white/60">
                      {s.n}
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/6">
                      <Icon size={20} className="text-white/85" />
                    </div>
                  </div>

                  <div className="mt-5 text-xl font-semibold text-white">
                    {s.title}
                  </div>

                  <div className="mt-5 space-y-3">
                    {s.points.map((p) => (
                      <div key={p} className="flex items-start gap-3">
                        <span className="mt-[7px] h-2 w-2 rounded-full bg-white/60" />
                        <div className="text-sm leading-relaxed text-white/75">
                          {p}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 h-px w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent" />
                </div>

                {/* brand aura */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
                  style={{ background: BRAND }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="relative mt-14 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
