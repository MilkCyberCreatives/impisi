"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useState } from "react";
import type { ServiceItem } from "@/data/services";

const BRAND = "#031f3e";

export default function ServicesGrid({ items }: { items: ServiceItem[] }) {
  const [hover, setHover] = useState(false);

  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 320, damping: 34, mass: 0.55 });
  const csy = useSpring(cy, { stiffness: 320, damping: 34, mass: 0.55 });

  const water = useMotionTemplate`
    radial-gradient(820px 560px at ${csx}% ${csy}%,
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
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={onMove}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
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

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
            SERVICES
          </div>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Integrated services across the value chain.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
            Explore our capabilities and open each service to view detailed scope and delivery focus.
          </p>

          <div className="mt-8 h-px w-full bg-white/10" />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s, idx) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.04 }}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:border-white/18 hover:bg-white/7"
                >
                  <div className="relative h-44 w-full">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${BRAND} 0%, rgba(3,31,62,0.65) 30%, rgba(3,31,62,0.12) 65%, rgba(3,31,62,0) 86%)`,
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <div className="text-lg font-semibold text-white">{s.title}</div>
                    <div className="mt-1 text-sm text-white/75">{s.subtitle}</div>

                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      {s.summary}
                    </p>

                    <div className="mt-6 h-px w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent" />
                    <div className="mt-3 text-sm font-semibold text-white/85 transition group-hover:text-white">
                      View service →
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(900px 520px at 50% 15%, rgba(255,255,255,0.10), transparent 60%)",
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 h-px w-full bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
