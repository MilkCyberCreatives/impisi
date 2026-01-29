"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ShieldCheck, FileCheck2, Users, Leaf } from "lucide-react";

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

export default function GovernanceSection() {
  const { ref, shown } = useReveal();

  // Water effect
  const [hoverZone, setHoverZone] = useState(false);
  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 280, damping: 32, mass: 0.6 });
  const csy = useSpring(cy, { stiffness: 280, damping: 32, mass: 0.6 });

  const waterBg = useMotionTemplate`
    radial-gradient(520px 360px at ${csx}% ${csy}%,
      rgba(255,255,255,0.16),
      rgba(255,255,255,0.06) 38%,
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

  const pillars = useMemo(
    () => [
      {
        title: "Compliance-first operations",
        icon: ShieldCheck,
        desc: "A disciplined operating philosophy built around governance, transparency, and responsible execution.",
      },
      {
        title: "Regulatory navigation & reporting",
        icon: FileCheck2,
        desc: "Structured engagement and reporting aligned to regulatory expectations and operational discipline.",
      },
      {
        title: "Stakeholder engagement",
        icon: Users,
        desc: "Partnership-driven interaction with stakeholders, communities, and delivery partners.",
      },
      {
        title: "Sustainability focus",
        icon: Leaf,
        desc: "Responsible operating practices supporting long-term sustainability and improved outcomes.",
      },
    ],
    []
  );

  return (
    <section id="governance" className="relative w-full overflow-hidden bg-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(1100px 560px at 15% 0%, rgba(255,255,255,0.05), transparent 60%),
            radial-gradient(900px 520px at 90% 15%, rgba(255,255,255,0.04), transparent 62%),
            linear-gradient(180deg, rgba(3,31,62,0.14) 0%, rgba(0,0,0,1) 82%)
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

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={shown ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl"
        >
          <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
            GOVERNANCE
          </div>

          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Built on compliance, integrity, and disciplined delivery.
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
            Our governance focus supports predictable execution, stronger stakeholder confidence,
            and long-term sustainability.
          </p>

          <div className="mt-8 h-px w-full bg-white/10" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={shown ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.16 } },
          }}
          className="relative mt-10 grid gap-6 sm:grid-cols-2"
        >
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
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
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(900px 520px at 50% 15%, rgba(255,255,255,0.10), transparent 60%)",
                  }}
                />

                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/6">
                    <Icon size={20} className="text-white/85" />
                  </div>

                  <div>
                    <div className="text-lg font-semibold text-white">
                      {p.title}
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-white/75">
                      {p.desc}
                    </div>

                    <div className="mt-6 h-px w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent" />
                  </div>
                </div>

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
