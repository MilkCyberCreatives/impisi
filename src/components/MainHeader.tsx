"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const nav = [
  { label: "About", href: "/about" },
  { label: "Mining", href: "/mining" },
  { label: "Exploration", href: "/exploration" },
  { label: "Beneficiation", href: "/beneficiation" },
  { label: "Commodity Trading", href: "/trading" },
  { label: "Project Development", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function MainHeader() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="relative z-50 w-full"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo only */}
        <Link href="/" className="flex items-center">
          <Image
            src="/icon.svg"
            alt="Impisi Resources"
            width={120}
            height={120}
            priority
            className="h-[78px] w-[78px] sm:h-[92px] sm:w-[92px] lg:h-[104px] lg:w-[104px]"
            style={{ filter: "brightness(0) saturate(100%) invert(1) brightness(1.7)" }}
          />
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "relative rounded-full px-4 py-2 text-sm font-medium transition",
                  active ? "text-white" : "text-white/85 hover:text-white",
                ].join(" ")}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  className={[
                    "absolute inset-0 -z-0 rounded-full transition duration-200",
                    active ? "bg-white/14" : "bg-white/10 opacity-0 hover:opacity-100",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white/95 backdrop-blur-md transition hover:bg-white/16 sm:inline-flex"
        >
          Connect
        </Link>
      </div>

      {/* subtle divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-white/10" />
      </div>
    </motion.header>
  );
}
