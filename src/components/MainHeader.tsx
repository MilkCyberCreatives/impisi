"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const nav = [
  { label: "Mining", href: "/mining" },
  { label: "Exploration", href: "/exploration" },
  { label: "Beneficiation", href: "/beneficiation" },
  { label: "Commodity Trading", href: "/trading" },
  { label: "Project Development", href: "/projects" },
];

export default function MainHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="relative z-50 w-full"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo only (bigger) */}
        <Link href="/" className="flex items-center">
          <Image
            src="/icon.svg"
            alt="Impisi Resources"
            width={160}
            height={160}
            priority
            className="h-[92px] w-[92px] sm:h-[110px] sm:w-[110px] lg:h-[130px] lg:w-[130px]"
            style={{ filter: "brightness(0) saturate(100%) invert(1) brightness(1.7)" }}
          />
        </Link>

        {/* Desktop Nav (bigger text) */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "relative rounded-full px-5 py-2.5 text-[15px] font-semibold tracking-wide transition",
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

        {/* Right side: CTA (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-[15px] font-semibold text-white/95 backdrop-blur-md transition hover:bg-white/16 lg:inline-flex"
          >
            Connect
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-3 text-white/95 backdrop-blur-md transition hover:bg-white/16 lg:hidden"
          >
            {/* Simple animated icon */}
            <span className="relative block h-5 w-6">
              <span
                className={[
                  "absolute left-0 top-0 block h-[2px] w-full rounded bg-current transition-transform duration-200",
                  open ? "translate-y-[9px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[9px] block h-[2px] w-full rounded bg-current transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[18px] block h-[2px] w-full rounded bg-current transition-transform duration-200",
                  open ? "-translate-y-[9px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
              <div className="rounded-2xl border border-white/15 bg-black/25 p-3 backdrop-blur-xl">
                <nav className="flex flex-col">
                  {nav.map((item) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={[
                          "rounded-xl px-4 py-3 text-[16px] font-semibold tracking-wide transition",
                          active ? "bg-white/12 text-white" : "text-white/90 hover:bg-white/10",
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                    );
                  })}

                  <Link
                    href="/contact"
                    className="mt-2 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[16px] font-semibold text-white/95 transition hover:bg-white/16"
                  >
                    Connect
                  </Link>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* subtle divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-white/10" />
      </div>
    </motion.header>
  );
}
