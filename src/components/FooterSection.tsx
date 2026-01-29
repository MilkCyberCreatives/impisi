"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ArrowUp, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const BRAND = "#031f3e";

export default function FooterSection() {
  const [showTop, setShowTop] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Water effect (footer hover)
  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 280, damping: 32, mass: 0.6 });
  const csy = useSpring(cy, { stiffness: 280, damping: 32, mass: 0.6 });

  const water = useMotionTemplate`
    radial-gradient(520px 360px at ${csx}% ${csy}%,
      rgba(255,255,255,0.16),
      rgba(255,255,255,0.06) 38%,
      rgba(255,255,255,0.00) 72%
    )
  `;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cx.set(Math.max(0, Math.min(100, x)));
    cy.set(Math.max(0, Math.min(100, y)));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
      className="relative w-full overflow-hidden bg-black"
    >
      {/* Background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(1100px 560px at 15% 0%, rgba(255,255,255,0.05), transparent 60%),
            radial-gradient(900px 520px at 90% 25%, rgba(255,255,255,0.04), transparent 62%),
            linear-gradient(180deg, rgba(3,31,62,0.18) 0%, rgba(0,0,0,1) 78%)
          `,
        }}
      />

      {/* Water overlay */}
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

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand (LOGO ONLY, BIGGER) */}
          <div className="lg:col-span-5">
            <div className="flex items-center">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                <Image
                  src="/icon.svg"
                  alt="Impisi Resources"
                  fill
                  className="object-contain"
                  style={{
                    filter: "brightness(0) saturate(100%) invert(1) brightness(1.7)",
                  }}
                />
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/75">
              A disciplined platform focused on measurable execution, quality consistency and dependable delivery
              outcomes across the mining value chain.
            </p>

            <div className="mt-6 h-px w-full bg-white/10" />
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
              QUICK LINKS
            </div>

            <div className="mt-5 space-y-3 text-sm">
              {[
                { label: "About", href: "#about" },
                { label: "Our Platform", href: "#platform" },
                { label: "Approach", href: "#approach" },
                { label: "Governance", href: "#governance" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="block text-white/75 transition hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
              CONTACT
            </div>

            <div className="mt-5 space-y-4 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-[2px] text-white/80" />
                <div>+27 11 082 9828</div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-[2px] text-white/80" />
                <div>info@impisiresources.co.za</div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-[2px] text-white/80" />
                <div>South Africa</div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white/90 backdrop-blur transition hover:bg-white/14"
                >
                  <Linkedin size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-10 h-px w-full bg-white/10" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-white/55">
            © {new Date().getFullYear()} Impisi Resources. All rights reserved.
          </div>

          <div className="text-xs text-white/55">
            designed and developed by{" "}
            <a
              href="https://milkcybercreatives.co.za/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white/70 transition hover:text-white"
            >
              Milk Cyber Creatives
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={
          showTop ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.95 }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 right-6 z-[9999] inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,.45)] transition hover:bg-white/16"
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
        Top
      </motion.button>

      {/* tiny brand bar */}
      <div
        aria-hidden
        className="pointer-events-none h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${BRAND} 0%, rgba(255,255,255,0.12) 50%, ${BRAND} 100%)`,
        }}
      />
    </footer>
  );
}
