"use client";

import { useEffect, useState } from "react";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[9999]">
      {/* ✅ Top = fully transparent (no tint, no blur) */}
      {/* ✅ Scroll = solid glass background */}
      <div
        className={[
          "transition-all duration-300",
          scrolled
            ? "bg-black/60 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,.45)]"
            : "bg-transparent backdrop-blur-0 shadow-none",
        ].join(" ")}
      >
        <TopHeader />
        <MainHeader />
      </div>

      {/* Divider only after scroll */}
      <div
        className={[
          "h-px w-full transition-opacity duration-300",
          scrolled ? "opacity-100 bg-white/10" : "opacity-0",
        ].join(" ")}
      />
    </div>
  );
}
