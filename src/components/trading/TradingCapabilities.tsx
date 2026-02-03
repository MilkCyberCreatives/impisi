"use client";

import { motion } from "framer-motion";
import { FileSignature, Wallet, BarChart3, BadgeCheck, Ship } from "lucide-react";

const items = [
  { title: "Long-term and spot offtake agreements", icon: FileSignature },
  { title: "Prepayment and structured offtake solutions", icon: Wallet },
  { title: "Pricing and market optimisation", icon: BarChart3 },
  { title: "Quality assurance and specification management", icon: BadgeCheck },
  { title: "Logistics coordination and export facilitation", icon: Ship },
];

export default function TradingCapabilities() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020814] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
            COMMERCIAL CAPABILITIES
          </div>

          <h3 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
            Commercial Capabilities
          </h3>

          <div className="mt-8 h-px w-full bg-white/10" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/18 hover:bg-white/7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/6">
                    <Icon size={20} className="text-white/85" />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-white/85 transition group-hover:text-white">
                    {c.title}
                  </div>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent" />
                </motion.div>
              );
            })}
          </div>

          <p className="mt-10 max-w-4xl text-sm leading-relaxed text-white/75 sm:text-base">
            Trading capability enhances project bankability and supports predictable revenue streams.
          </p>

          <div className="mt-14 h-px w-full bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
