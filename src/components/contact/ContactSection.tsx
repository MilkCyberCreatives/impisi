"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const BRAND = "#031f3e";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const [hover, setHover] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
    phone: "",
    website: "", // honeypot (keep empty)
  });

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

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Could not send. Please try again.");
        return;
      }

      setStatus("sent");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        company: "",
        phone: "",
        website: "",
      });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

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
          className="relative grid gap-10 lg:grid-cols-12"
        >
          {/* Left: contact info */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
              CONTACT
            </div>

            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let’s connect.
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              Reach out for discussions on mining operations, exploration, beneficiation,
              commodity trading, and project development.
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

          {/* Right: form (no container, no shadows) */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/65">
              SEND A MESSAGE
            </div>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* honeypot */}
              <input
                value={form.website}
                onChange={update("website")}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <input
                value={form.name}
                onChange={update("name")}
                required
                className="rounded-2xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                placeholder="Full name *"
              />
              <input
                value={form.email}
                onChange={update("email")}
                required
                type="email"
                className="rounded-2xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                placeholder="Email address *"
              />
              <input
                value={form.company}
                onChange={update("company")}
                className="rounded-2xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                placeholder="Company (optional)"
              />
              <input
                value={form.phone}
                onChange={update("phone")}
                className="rounded-2xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                placeholder="Phone (optional)"
              />
              <input
                value={form.subject}
                onChange={update("subject")}
                required
                className="sm:col-span-2 rounded-2xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                placeholder="Subject *"
              />
              <textarea
                value={form.message}
                onChange={update("message")}
                required
                className="sm:col-span-2 min-h-[160px] rounded-2xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                placeholder="Message *"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="sm:col-span-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#031f3e] transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>

              {/* status text */}
              {status === "sent" && (
                <div className="sm:col-span-2 text-sm text-white/80">
                  ✅ Message sent successfully.
                </div>
              )}
              {status === "error" && (
                <div className="sm:col-span-2 text-sm text-red-300">
                  {errorMsg || "Something went wrong."}
                </div>
              )}
            </form>

            <div className="mt-10 h-px w-full bg-white/10" />

            <div className="mt-5 text-xs text-white/60">
              We aim to respond with clarity and professionalism.
            </div>
          </div>
        </motion.div>

        <div className="mt-14 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
