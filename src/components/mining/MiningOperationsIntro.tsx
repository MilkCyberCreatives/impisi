"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BRAND = "#031f3e";

export default function MiningOperationsIntro() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020814] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-12 lg:items-center"
        >
          {/* Text */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
              MINING OPERATIONS
            </div>

            <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
              Mining Operations
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              Impisi Resources is actively involved in the development, management, and optimisation of
              mining operations, primarily within open-pit and near-surface environments suited to bulk
              commodity extraction.
            </p>

            <div className="mt-8 h-px w-full bg-white/10" />
          </div>

          {/* Image (premium + animated + fade overlay + caption) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <motion.div
                className="relative aspect-[16/11] w-full"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
              >
                <Image
                  src="/hero/service-mining.jpg"
                  alt="Open-pit & near-surface environments"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />

                {/* ✅ premium fade overlays (like exploration screenshot) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/75" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${BRAND} 0%, rgba(3,31,62,0.78) 30%, rgba(3,31,62,0.18) 62%, rgba(3,31,62,0) 86%)`,
                  }}
                />

                <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_20%,rgba(255,255,255,0.10),transparent_60%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Caption back on image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[11px] font-semibold tracking-[0.28em] text-white/70">
                    OPERATIONAL EXECUTION
                  </div>
                  <div className="mt-2 text-lg font-semibold leading-snug text-white sm:text-xl">
                    Open-pit &amp; near-surface environments
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
