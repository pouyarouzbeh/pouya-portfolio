"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navSections, profile } from "@/lib/data";

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [active, setActive] = useState(navSections[0].id);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observers = navSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean)
      .map((element) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActive(element!.id);
            }
          },
          { rootMargin: "-42% 0px -48% 0px", threshold: 0.01 }
        );
        observer.observe(element!);
        return observer;
      });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 18);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navButtonClass =
    "focus-ring group relative overflow-hidden rounded-full px-3.5 py-2 text-sm font-semibold text-slate-300 transition-colors duration-300 hover:text-[rgb(var(--foreground))] xl:px-4";

  return (
    <motion.header
      className="fixed left-0 right-0 top-3 z-50 px-4"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.55, ease: "easeOut" }}
    >
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-44 border-b border-white/[0.045] backdrop-blur-[36px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(var(--background), 1) 0%, rgba(var(--background), 0.99) 38%, rgba(var(--background), 0.92) 58%, rgba(var(--background), 0.48) 82%, rgba(var(--background), 0) 100%)"
        }}
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0.9 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 backdrop-blur-[24px]"
        style={{
          maskImage: "linear-gradient(180deg, black 0%, black 62%, transparent 100%)",
          background: "rgba(var(--background), 0.72)"
        }}
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0.74 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        aria-hidden="true"
      />
      <nav
        className={`relative z-50 mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.08] px-3 shadow-[0_22px_70px_rgba(var(--shadow-color),0.34)] backdrop-blur-[28px] transition-all duration-300 sm:px-4 lg:grid-cols-[1fr_auto_1fr] ${
          scrolled
            ? "border-cyan-electric/25 bg-[rgb(var(--background))] shadow-cyan"
            : "bg-[rgba(var(--background),0.94)]"
        }`}
        aria-label="Primary navigation"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-electric/[0.035] via-white/[0.025] to-purple-deep/[0.04]"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="focus-ring group relative z-10 flex min-w-0 items-center gap-3 rounded-xl px-2 py-2"
          aria-label={`Go to ${profile.name} hero section`}
        >
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-electric/20 bg-cyan-electric/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-electric shadow-cyan" aria-hidden="true" />
          </span>
          <span className="min-w-0 text-left">
            <span className="block max-w-[10rem] truncate text-sm font-semibold text-[rgb(var(--foreground))] sm:max-w-none">
              {profile.name}
            </span>
            <span className="block text-xs text-[rgb(var(--muted))]">Front-End Developer</span>
          </span>
        </button>

        <div className="relative z-10 hidden items-center gap-1 rounded-full border border-white/[0.08] bg-[rgba(var(--panel),0.96)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_44px_rgba(0,0,0,0.28)] lg:flex">
          {navSections.map((section) => (
            <motion.button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              onFocus={() => setHoveredSection(section.id)}
              onBlur={() => setHoveredSection(null)}
              className={navButtonClass}
              aria-current={active === section.id ? "page" : undefined}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {hoveredSection === section.id ? (
                <motion.span
                  layoutId="nav-hover-glow"
                  className="absolute inset-0 rounded-full border border-white/[0.1] bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_28px_rgba(0,0,0,0.18)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              {active === section.id ? (
                <motion.span
                  layoutId="active-section-pill"
                  className="absolute inset-0 rounded-full border border-cyan-electric/30 bg-cyan-electric/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_24px_rgba(0,212,255,0.16)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <motion.span
                className="absolute inset-y-1 left-0 w-8 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={false}
                animate={{
                  opacity: hoveredSection === section.id ? 1 : 0,
                  x: hoveredSection === section.id ? 74 : -34
                }}
                transition={{ duration: 0.48, ease: "easeOut" }}
              />
              <span className="relative z-10 inline-flex items-center gap-2">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-cyan-electric shadow-cyan"
                  initial={false}
                  animate={{
                    opacity: active === section.id || hoveredSection === section.id ? 1 : 0,
                    scale: active === section.id || hoveredSection === section.id ? 1 : 0.45
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
                {section.label}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-end gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs font-semibold text-[rgb(var(--muted))] lg:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.55)]" aria-hidden="true" />
            Available
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="focus-ring grid h-11 w-11 place-items-center rounded-xl border border-white/[0.1] bg-white/[0.045] text-[rgb(var(--foreground))] transition-colors hover:border-cyan-electric/40 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 top-0 z-40 bg-ink-950/80 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="glass-panel absolute right-4 top-24 w-[min(22rem,calc(100vw-2rem))] rounded-2xl p-3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              {navSections.map((section, index) => (
                <motion.button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    scrollToSection(section.id);
                    setOpen(false);
                  }}
                  className="focus-ring flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-[rgb(var(--foreground))] hover:bg-white/[0.06]"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.045 }}
                  whileHover={{
                    x: 4,
                    backgroundColor: "rgba(0, 212, 255, 0.1)"
                  }}
                >
                  {section.label}
                  {active === section.id ? (
                    <span className="h-2 w-2 rounded-full bg-cyan-electric shadow-cyan" aria-hidden="true" />
                  ) : null}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
