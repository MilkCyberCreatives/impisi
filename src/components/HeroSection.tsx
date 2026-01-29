"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";

const BRAND = "#031f3e";

type Service = {
  title: string;
  subtitle: string;
  desc: string;
  img: string;
  href: string;
};

const SERVICES: Service[] = [
  {
    title: "Mining",
    subtitle: "Development, management & optimisation",
    desc: "Hands-on mining execution aligned to beneficiation, blending, and consistent feed quality.",
    img: "/hero/service-mining.jpg",
    href: "#mining",
  },
  {
    title: "Exploration",
    subtitle: "Resource growth & sustainability",
    desc: "Commercially focused exploration designed to fast-track viable resources into production.",
    img: "/hero/service-logistics.jpg",
    href: "#exploration",
  },
  {
    title: "Beneficiation",
    subtitle: "Wolfmountain wash plant capability",
    desc: "Chrome ore washing and processing designed for recovery, quality control, and operational flexibility.",
    img: "/hero/service-beneficiation.jpg",
    href: "#beneficiation",
  },
  {
    title: "Commodity Trading",
    subtitle: "Mine-to-market sales & off-take",
    desc: "Offtake solutions and market delivery with quality assurance and logistics coordination.",
    img: "/hero/service-trading.jpg",
    href: "#trading",
  },
];

export default function HeroSection() {
  const [explode, setExplode] = useState(false);
  const [revealServices, setRevealServices] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [inServiceZone, setInServiceZone] = useState(false);

  const containerRef = useRef<HTMLElement | null>(null);

  // Parallax (subtle)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.9 });

  // Cursor motion values (NO re-render on move)
  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 220, damping: 30, mass: 0.6 });
  const csy = useSpring(cy, { stiffness: 220, damping: 30, mass: 0.6 });

  // Water glow background
  const waterBg = useMotionTemplate`
    radial-gradient(360px 240px at ${csx}% ${csy}%,
      rgba(255,255,255,0.22),
      rgba(255,255,255,0.10) 35%,
      rgba(255,255,255,0.00) 70%
    ),
    radial-gradient(700px 520px at ${csx}% ${csy}%,
      rgba(255,255,255,0.10),
      rgba(255,255,255,0.00) 72%
    )
  `;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      mx.set((px - 0.5) * 10);
      my.set((py - 0.5) * 8);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const tiles = useMemo(() => {
    const rows = 4;
    const cols = 7;
    const items: { id: string; r: number; c: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) items.push({ id: `${r}-${c}`, r, c });
    }
    return { rows, cols, items };
  }, []);

  // Faster + smoother timing
  useEffect(() => {
    const t0 = setTimeout(() => setExplode(true), 520);
    const t1 = setTimeout(() => setRevealServices(true), 720);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, []);

  const onServiceMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cx.set(Math.max(0, Math.min(100, x)));
    cy.set(Math.max(0, Math.min(100, y)));
  };

  return (
    <section
      ref={(node) => {
        if (node) containerRef.current = node;
      }}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Top blend overlay so header and hero feel like one */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-40 h-44"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Main hero image */}
      <motion.div
        className="absolute inset-0 -z-40"
        style={{ x: sx, y: sy }}
        animate={{
          scale: explode ? 1.03 : 1.015,
          opacity: revealServices ? 0.05 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/hero/hero-main.jpg"
          alt="Impisi Resources hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/62" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${BRAND} 0%, rgba(3,31,62,0.92) 32%, rgba(3,31,62,0.30) 70%, rgba(3,31,62,0) 90%)`,
          }}
        />
      </motion.div>

      {/* Crack tiles */}
      <div className="pointer-events-none absolute inset-0 -z-30">
        <AnimatePresence>
          {!revealServices && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14 }}
              className="absolute inset-0"
            >
              <div
                className="grid h-full w-full"
                style={{
                  gridTemplateColumns: `repeat(${tiles.cols}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${tiles.rows}, minmax(0, 1fr))`,
                }}
              >
                {tiles.items.map((t) => {
                  const x = (t.c / (tiles.cols - 1)) * 2 - 1;
                  const y = (t.r / (tiles.rows - 1)) * 2 - 1;
                  const dist = Math.sqrt(x * x + y * y);

                  return (
                    <motion.div
                      key={t.id}
                      className="relative"
                      style={{
                        backgroundImage: `url(/hero/hero-main.jpg)`,
                        backgroundSize: `${tiles.cols * 100}% ${
                          tiles.rows * 100
                        }%`,
                        backgroundPosition: `${
                          (t.c / (tiles.cols - 1)) * 100
                        }% ${(t.r / (tiles.rows - 1)) * 100}%`,
                        willChange: "transform, opacity, filter",
                      }}
                      initial={{ opacity: 1, filter: "blur(0px)" }}
                      animate={
                        explode
                          ? {
                              opacity: 0,
                              filter: "blur(8px)",
                              x: x * (95 + dist * 85),
                              y: y * (85 + dist * 78),
                              rotate: x * 6,
                              scale: 0.94,
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                        delay: dist * 0.008,
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Services layer */}
      <motion.div
        className="absolute inset-0 z-30"
        initial={{ opacity: 0, y: 18, scale: 1.01 }}
        animate={
          revealServices
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 18, scale: 1.01 }
        }
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative h-screen w-full"
          onMouseEnter={() => setInServiceZone(true)}
          onMouseLeave={() => {
            setInServiceZone(false);
            setActive(null);
          }}
          onMouseMove={onServiceMove}
        >
          {/* Water effect */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: inServiceZone ? 1 : 0,
              background: waterBg,
              mixBlendMode: "overlay",
              transition: "opacity 180ms ease",
            }}
          />

          <div className="grid h-screen w-full grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, idx) => {
              const isActive = active === idx;
              const dim = active !== null && !isActive;

              return (
                <Link
                  key={s.title}
                  href={s.href}
                  className="relative h-screen w-full overflow-hidden"
                  onMouseEnter={() => setActive(idx)}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: isActive ? 1.05 : 1.02,
                      opacity: dim ? 0.55 : 1,
                      filter: dim
                        ? "saturate(0.85) contrast(0.95)"
                        : "saturate(1.10) contrast(1.05)",
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <Image src={s.img} alt={s.title} fill className="object-cover" />
                  </motion.div>

                  <div className="absolute inset-0 bg-black/26" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${BRAND} 0%, rgba(3,31,62,0.92) 32%, rgba(3,31,62,0.30) 70%, rgba(3,31,62,0) 90%)`,
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 w-px bg-white/10" />

                  <div className="absolute bottom-8 left-6 right-6 z-20">
                    <div className="text-[18px] font-semibold tracking-tight text-white sm:text-[20px] lg:text-[22px]">
                      {s.title}
                    </div>
                    <div className="mt-1 text-xs text-white/80">{s.subtitle}</div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute bottom-24 left-6 right-6 z-30"
                      >
                        <div className="text-xs leading-relaxed text-white/92">
                          {s.desc}
                        </div>
                        <div className="mt-4 h-px w-24 bg-white/70" />
                        <div className="mt-3 text-xs font-semibold text-white">
                          Open section →
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Headers */}
      <div className="absolute inset-x-0 top-0 z-50">
        <TopHeader />
        <MainHeader />
      </div>

      {/* Hero copy */}
      <div className="pointer-events-none relative z-40 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-10 pt-36 text-center sm:px-6 lg:px-8 lg:pt-40">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-5xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Traditional values with innovative commodity solutions.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="mx-auto mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-white/80 sm:text-base"
        >
          A vertically integrated mining, mineral processing, and commodities group focused on development,
          operation, and optimisation of mining assets.
        </motion.p>

        <div className="pointer-events-auto mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#031f3e] transition hover:scale-[1.02] active:scale-[0.98] shadow-[0_18px_60px_rgba(0,0,0,.45)]"
          >
            Connect
          </Link>

          <Link
            href="#about"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-white/30 hover:bg-white/18"
          >
            Explore profile
          </Link>
        </div>
      </div>
    </section>
  );
}
