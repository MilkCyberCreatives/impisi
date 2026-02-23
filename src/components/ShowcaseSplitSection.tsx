"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { Sparkles, ShieldCheck, TrendingUp } from "lucide-react";

const BRAND = "#031f3e";

/** Reliable scroll trigger */
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

const marqueeItems = [
  "Mining Operations",
  "Exploration",
  "Beneficiation",
  "Commodity Trading",
  "Project Development",
  "Governance",
  "Quality Control",
  "Offtake & Delivery",
];

export default function ShowcaseSplitSection() {
  const { ref, shown } = useReveal();

  // Premium interactive “water glow” + micro parallax on image side
  const [hover, setHover] = useState(false);

  const cx = useMotionValue(50);
  const cy = useMotionValue(50);

  const csx = useSpring(cx, { stiffness: 280, damping: 32, mass: 0.6 });
  const csy = useSpring(cy, { stiffness: 280, damping: 32, mass: 0.6 });

  // Water glow background
  const water = useMotionTemplate`
    radial-gradient(520px 360px at ${csx}% ${csy}%,
      rgba(255,255,255,0.22),
      rgba(255,255,255,0.08) 38%,
      rgba(255,255,255,0.00) 72%
    )
  `;

  // Micro-parallax values (caption + floating card)
  const px = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const py = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;

    cx.set(Math.max(0, Math.min(100, xPct)));
    cy.set(Math.max(0, Math.min(100, yPct)));

    // -10..10 translate range (micro, premium)
    const dx = (xPct - 50) / 5;
    const dy = (yPct - 50) / 6;
    (px as any).set(dx);
    (py as any).set(dy);
  };

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-black">
      {/* Full-width background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(1100px 560px at 15% 0%, rgba(255,255,255,0.06), transparent 60%),
            radial-gradient(1000px 520px at 90% 15%, rgba(255,255,255,0.05), transparent 62%),
            linear-gradient(180deg, rgba(3,31,62,0.18) 0%, rgba(0,0,0,1) 75%)
          `,
        }}
      />

      {/* FULL-WIDTH SPLIT */}
      <div className="relative grid w-full items-stretch lg:grid-cols-12">
        {/* LEFT: image panel */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={
            shown
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 18, filter: "blur(10px)" }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[520px] overflow-hidden lg:col-span-7 lg:min-h-[560px] xl:min-h-[640px]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onMouseMove={onMove}
        >
          {/* Image */}
          <Image
            src="/deliver.jpg"
            alt="Impisi Resources - delivery and execution"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
            priority={false}
          />

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${BRAND} 0%, rgba(3,31,62,0.78) 30%, rgba(3,31,62,0.18) 62%, rgba(3,31,62,0) 86%)`,
            }}
          />

          {/* Interactive water glow */}
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
          
          {/* Bottom caption block (micro-parallax) */}
          <motion.div
            className="absolute bottom-10 left-8 right-8 sm:left-12 sm:right-12"
            style={{ x: px, y: py }}
          >
            <div className="text-xs font-semibold tracking-[0.28em] text-white/75">
              DELIVERY YOU CAN TRUST
            </div>
            <h3 className="mt-3 max-w-xl text-balance text-2xl font-semibold text-white sm:text-3xl">
              Project planning aligned to operational performance.
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
              A disciplined execution model designed to improve control, consistency, and delivery outcomes.
            </p>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-white/22 via-white/10 to-transparent" />
          </motion.div>

          {/* Subtle edge separator */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/10" />
        </motion.div>

        {/* RIGHT: text panel */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={
            shown
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 18, filter: "blur(10px)" }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="relative flex min-h-[520px] items-center lg:col-span-5 lg:min-h-[560px] xl:min-h-[640px]"
        >
          <div className="relative w-full px-8 py-16 sm:px-12 lg:px-14">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/70">
              WHAT WE DELIVER
            </div>

            <h3 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              We provide the best
              <br className="hidden sm:block" />
              integrated solutions.
            </h3>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Impisi Resources connects mining operations, beneficiation, and commodity trading into one coordinated
              system — ensuring quality consistency, disciplined governance, and dependable delivery.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Integrated mine-to-market coordination",
                "Specification and quality assurance focus",
                "Disciplined project delivery and governance",
              ].map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <span className="mt-[7px] h-2 w-2 rounded-full bg-white/75" />
                  <div className="text-sm text-white/80">{b}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 h-px w-full bg-white/12" />

            <div className="mt-6">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
              >
                Contact us <span className="opacity-80">→</span>
              </Link>
              <div className="mt-2 h-[2px] w-20 bg-white/70" />
            </div>
          </div>

          {/* Brand bar */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-full w-3 opacity-95"
            style={{
              background: `linear-gradient(180deg, ${BRAND} 0%, rgba(3,31,62,0.65) 50%, rgba(3,31,62,0.95) 100%)`,
            }}
          />
        </motion.div>
      </div>

      {/* Marquee row (full-width) */}
      <div className="relative border-t border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="overflow-hidden py-5">
          <motion.div
            className="flex w-max items-center gap-10 px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {/* duplicate list for seamless loop */}
            {[...marqueeItems, ...marqueeItems].map((t, i) => (
              <div key={`${t}-${i}`} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white/60" />
                <span className="text-xs font-semibold tracking-[0.24em] text-white/70">
                  {t.toUpperCase()}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="relative h-px w-full bg-white/10" />
    </section>
  );
}
