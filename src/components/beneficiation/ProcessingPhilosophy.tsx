"use client";

import { motion } from "framer-motion";
import { Blocks, Route, Gauge, Puzzle } from "lucide-react";

const items = [
  { title: "Modular and scalable plant design", icon: Blocks },
  { title: "Integrated mine-to-plant planning", icon: Route },
  { title: "High uptime and yield optimisation focus", icon: Gauge },
  { title: "Designed for ROM, fines, oversize, and tailings material", icon: Puzzle },
];

export default function ProcessingPhilosophy() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020814] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
            PROCESSING PHILOSOPHY
          </div>
          <h3 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
            Designed to maximise recovery and improve concentrate quality.
          </h3>

          <div className="mt-8 h-px w-full bg-white/10" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((c) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/18 hover:bg-white/7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/6">
                    <Icon size={20} className="text-white/85" />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-white/85 group-hover:text-white transition">
                    {c.title}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 h-px w-full bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
