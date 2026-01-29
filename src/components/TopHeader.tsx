"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, Facebook, Instagram, MessageCircle } from "lucide-react";

export default function TopHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 w-full"
    >
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-[14px] sm:text-[15px] text-white/90">
          {/* Left */}
          <div className="hidden items-center gap-5 md:flex">
            <span className="inline-flex items-center gap-2">
              <Phone size={14} className="text-white/80" />
              <span>+27 11 082 9828</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={14} className="text-white/80" />
              <span>info@impisiresources.co.za</span>
            </span>
          </div>

          {/* Right */}
          <div className="ml-auto flex items-center gap-2">
            {[
              { href: "#", icon: Facebook, label: "Facebook" },
              { href: "#", icon: Instagram, label: "Instagram" },
              { href: "#", icon: MessageCircle, label: "WhatsApp" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="group inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-md transition hover:bg-white/16"
                >
                  <Icon size={16} className="transition group-hover:scale-110" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-2 h-px w-full bg-white/10" />
      </div>
    </motion.div>
  );
}
