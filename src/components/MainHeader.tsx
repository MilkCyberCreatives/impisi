"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const nav = [
  { label: "About", href: "#about" },
  { label: "Mining", href: "#mining" },
  { label: "Exploration", href: "#exploration" },
  { label: "Beneficiation", href: "#beneficiation" },
  { label: "Commodity Trading", href: "#trading" },
  { label: "Project Development", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function MainHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="relative z-50 w-full"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo only (forced pure white) */}
        <Link href="/" className="flex items-center">
          <Image
            src="/icon.svg"
            alt="Impisi Resources"
            width={130}
            height={130}
            priority
            className="h-[80px] w-[80px] sm:h-[96px] sm:w-[96px] lg:h-[110px] lg:w-[110px]"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(1) brightness(1.8)",
            }}
          />
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-white/95 transition hover:text-white"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 -z-0 rounded-full bg-white/10 opacity-0 transition duration-200 hover:opacity-100" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="#contact"
          className="hidden rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white/95 backdrop-blur-md transition hover:bg-white/18 sm:inline-flex"
        >
          Connect
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-white/12" />
      </div>
    </motion.header>
  );
}
