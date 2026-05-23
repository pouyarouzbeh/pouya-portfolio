"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
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
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");

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

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  const navButtonClass =
    "focus-ring group relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-white dark:text-slate-300 dark:hover:text-white light:text-slate-700 light:hover:text-slate-950";

  return (
    <motion.header
      className="fixed left-0 right-0 top-4 z-50 px-4"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.55, ease: "easeOut" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 -top-4 h-28 border-b border-white/[0.04] backdrop-blur-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(var(--background), 0.94), rgba(var(--background), 0.68) 58%, transparent)"
        }}
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        aria-hidden="true"
      />
      <nav
        className={`glass-panel relative z-50 mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-2xl px-3 transition-all duration-300 sm:px-4 ${
          scrolled
            ? "border-cyan-electric/20 bg-[rgba(var(--panel),0.82)] shadow-cyan backdrop-blur-[26px]"
            : "backdrop-blur-[18px]"
        }`}
        aria-label="Primary navigation"
      >
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="focus-ring group flex items-center gap-3 rounded-xl px-2 py-2"
          aria-label={`Go to ${profile.name} hero section`}
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-cyan-electric/10 font-mono text-sm font-bold text-cyan-electric shadow-cyan">
            {profile.initials}
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-semibold text-[rgb(var(--foreground))]">{profile.name}</span>
            <span className="block text-xs text-[rgb(var(--muted))]">React / Next.js</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
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
                  className="absolute inset-0 rounded-full border border-cyan-electric/30 bg-[linear-gradient(135deg,rgba(0,212,255,0.16),rgba(124,58,237,0.16))] shadow-[0_0_28px_rgba(0,212,255,0.18)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              {active === section.id ? (
                <motion.span
                  layoutId="active-section-pill"
                  className="absolute inset-0 rounded-full border border-cyan-electric/25 bg-cyan-electric/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <motion.span
                className="absolute bottom-1.5 left-1/2 h-px w-7 -translate-x-1/2 rounded-full bg-cyan-electric"
                initial={false}
                animate={{
                  opacity: hoveredSection === section.id || active === section.id ? 1 : 0,
                  scaleX: hoveredSection === section.id || active === section.id ? 1 : 0.28
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
              <span className="relative z-10">{section.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="focus-ring grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[rgb(var(--foreground))] transition-colors hover:border-cyan-electric/40 hover:text-cyan-electric"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -60, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 60, scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="focus-ring grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[rgb(var(--foreground))] transition-colors hover:border-cyan-electric/40 lg:hidden"
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
