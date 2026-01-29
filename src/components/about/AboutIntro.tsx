"use client";

import { motion } from "framer-motion";

const BRAND = "#031f3e";

export default function AboutIntro() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020814] py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(900px 520px at 15% 0%, rgba(3,31,62,0.28), transparent 60%),
            radial-gradient(900px 520px at 90% 10%, rgba(255,255,255,0.04), transparent 60%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
              OVERVIEW
            </div>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              A vertically integrated mining, mineral processing and commodities group.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              Impisi Resources is a South African-based, vertically integrated mining,
              mineral processing, and commodities group focused on the development,
              operation, and optimisation of mining assets across the bulk and industrial minerals sector.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              We operate across the full value chain — from exploration and ore access through
              to processing, logistics, and market delivery — enabling operational control,
              margin optimisation, and long-term sustainability.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
              <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
                VISION
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                To become a leading African mining and beneficiation group, recognised for operational
                excellence, disciplined growth, and responsible resource development.
              </p>

              <div className="mt-7 h-px w-full bg-white/10" />

              <div className="mt-6 text-xs font-semibold tracking-[0.28em] text-white/65">
                MISSION
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "Develop and operate mining and beneficiation assets with integrity and efficiency.",
                  "Deliver high-quality mineral products aligned with global market demand.",
                  "Build sustainable, long-term partnerships with stakeholders and communities.",
                  "Retain value through beneficiation and infrastructure-led growth.",
                ].map((m) => (
                  <div key={m} className="flex items-start gap-3">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-white/60" />
                    <span className="text-sm leading-relaxed text-white/75">{m}</span>
                  </div>
                ))}
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
                style={{ background: BRAND }}
              />
            </div>
          </div>
        </motion.div>

        <div className="mt-12 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
