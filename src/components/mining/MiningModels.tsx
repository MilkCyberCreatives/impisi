"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useState } from "react";
import { HandCoins, Users2, Factory } from "lucide-react";

const BRAND = "#031f3e";

export default function MiningModels() {
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

  const cards = [
    {
      title: "Owner-Operated Mining",
      icon: Factory,
      lines: ["Direct operational control where Impisi holds exclusive mining or mining-linked rights."],
    },
    {
      title: "Contract Mining & Joint Ventures",
      icon: Users2,
      lines: [
        "Strategic partnerships with mining right holders and producers.",
        "Shared risk, shared upside structures aligned to production and offtake.",
      ],
    },
    {
      title: "Pre-Funded Mining Structures",
      icon: HandCoins,
      lines: [
        "Mining supported by prepayments, offtake advances, or structured funding.",
        "Enables rapid production ramp-up with reduced upfront capital exposure.",
      ],
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#020814] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
            MINING MODELS
          </div>

          <h3 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
            Mining Models
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            The company is structured to operate under multiple mining and commercial models, including:
          </p>

          <div className="mt-8 h-px w-full bg-white/10" />
        </motion.div>

        <motion.div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onMouseMove={onMove}
          className="relative mt-10"
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

          <div className="relative grid gap-6 lg:grid-cols-3">
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
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

                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-lg font-semibold text-white">{c.title}</div>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/6">
                        <Icon size={20} className="text-white/85" />
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      {c.lines.map((t) => (
                        <div key={t} className="flex items-start gap-3">
                          <span className="mt-[7px] h-2 w-2 rounded-full bg-white/60" />
                          <div className="text-sm leading-relaxed text-white/75">{t}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 h-px w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent" />
                  </div>

                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-18 blur-3xl"
                    style={{ background: BRAND }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-14 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
