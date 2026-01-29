"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useState } from "react";

const DEFAULT_BREADCRUMB_IMAGE = "/images/breadcrumbs/master.jpg";

export default function BreadcrumbHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  const [hover, setHover] = useState(false);

  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 320, damping: 34, mass: 0.55 });
  const csy = useSpring(cy, { stiffness: 320, damping: 34, mass: 0.55 });

  // Water effect (noticeable but neutral, no blue tint)
  const water = useMotionTemplate`
    radial-gradient(760px 520px at ${csx}% ${csy}%,
      rgba(255,255,255,0.16),
      rgba(255,255,255,0.06) 45%,
      rgba(255,255,255,0.00) 78%
    )
  `;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cx.set(Math.max(0, Math.min(100, x)));
    cy.set(Math.max(0, Math.min(100, y)));
  };

  const safeCrumbs =
    crumbs && crumbs.length
      ? crumbs
      : [
          { label: "Home", href: "/" },
          { label: title },
        ];

  return (
    // ✅ Pull breadcrumb hero up behind the fixed header to remove the top gap
    <section className="relative -mt-[116px] sm:-mt-[124px] w-full overflow-hidden bg-black">
      <div
        className="relative w-full min-h-[34vh] sm:min-h-[38vh] lg:min-h-[40vh]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={onMove}
      >
        <Image
          src={DEFAULT_BREADCRUMB_IMAGE}
          alt={title}
          fill
          priority
          className="object-cover object-[50%_35%]"
        />

        {/* ✅ Overlay NOT too dark (clean + premium) */}
        <div className="absolute inset-0 bg-black/45" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.62) 100%)",
          }}
        />

        {/* Water effect */}
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

        {/* ✅ Content padded down to clear fixed header (so text never hides) */}
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-[160px] sm:px-6 sm:pb-14 sm:pt-[170px] lg:px-8 lg:pb-16 lg:pt-[180px]">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm text-white/80"
          >
            <ol className="flex flex-wrap items-center gap-2">
              {safeCrumbs.map((c, idx) => (
                <li key={`${c.label}-${idx}`} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white transition">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/90">{c.label}</span>
                  )}
                  {idx !== safeCrumbs.length - 1 && (
                    <span className="text-white/45">/</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05,
            }}
            className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.12,
              }}
              className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base"
            >
              {subtitle}
            </motion.p>
          )}

          <div className="mt-8 h-px w-full bg-white/10" />
        </div>
      </div>
    </section>
  );
}
