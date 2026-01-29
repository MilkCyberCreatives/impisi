"use client";

import { motion } from "framer-motion";
import {
  Pickaxe,
  Factory,
  Truck,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-react";

const icons = [
  { Icon: Pickaxe, x: "8%", y: "20%", s: 1.0, d: 7.4 },
  { Icon: Factory, x: "88%", y: "24%", s: 1.0, d: 8.6 },
  { Icon: Truck, x: "90%", y: "72%", s: 0.95, d: 9.2 },
  { Icon: ShieldCheck, x: "10%", y: "74%", s: 0.9, d: 8.8 },
  { Icon: Sparkles, x: "52%", y: "12%", s: 0.9, d: 7.8 },
  { Icon: Layers, x: "52%", y: "86%", s: 0.95, d: 9.6 },
];

export default function FloatingIcons({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {icons.map(({ Icon, x, y, s, d }, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            active
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/14 bg-white/10 backdrop-blur"
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: d, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: `scale(${s})` }}
          >
            <Icon className="text-white/85" size={20} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
