"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const BRAND = "#031f3e";

export default function ContactSection() {
  const [hover, setHover] = useState(false);

  const cx = useMotionValue(50);
  const cy = useMotionValue(50);
  const csx = useSpring(cx, { stiffness: 320, damping: 34, mass: 0.55 });
  const csy = useSpring(cy, { stiffness: 320, damping: 34, mass: 0.55 });

  const water = useMotionTemplate`
    radial-gradient(820px 560px at ${csx}% ${csy}%,
      rgba(255,255,255,0.16),
      rgba(255,255,255,0.05) 45%,
      rgba(255,255,255,0.00) 78%
    )
  `;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cx.set(Math.max(0, Math.min(100, x)));
    cy.set(Math.max(0, Math.min(100, y)));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#020814] py-16 sm:py-20">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={onMove}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
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

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
              CONTACT
            </div>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let’s connect.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              Reach out for discussions on mining operations, exploration, beneficiation, commodity trading, and project development.
            </p>

            <div className="mt-8 space-y-4 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-[2px] text-white/85" />
                <div>+27 11 082 9828</div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-[2px] text-white/85" />
                <div>info@impisiresources.co.za</div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-[2px] text-white/85" />
                <div>South Africa</div>
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-18 blur-3xl"
              style={{ background: BRAND }}
            />
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl sm:p-8">
              <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
                SEND A MESSAGE
              </div>

              <form className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                  placeholder="Full name"
                />
                <input
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                  placeholder="Email address"
                />
                <input
                  className="sm:col-span-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                  placeholder="Subject"
                />
                <textarea
                  className="sm:col-span-2 min-h-[140px] rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                  placeholder="Message"
                />

                <button
                  type="button"
                  className="sm:col-span-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#031f3e] shadow-[0_18px_60px_rgba(0,0,0,.45)] transition hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send message
                </button>
              </form>

              <div className="mt-10 h-px w-full bg-white/10" />
              <div className="mt-5 text-xs text-white/60">
                We aim to respond with clarity and professionalism.
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
