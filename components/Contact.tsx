"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Github, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { profile, socialLinks } from "@/lib/data";

const iconMap = {
  github: Github,
  linkedin: Linkedin
};

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("LinkedIn is opening for the conversation.");
    window.open(profile.linkedin, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="section-shell pb-16">
      <div className="section-inner">
        <motion.div
          className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <p className="font-mono text-sm text-cyan-electric">contact.channel</p>
            <h2 className="mt-4 text-4xl font-black text-balance text-[rgb(var(--foreground))] md:text-5xl">
              Let&apos;s build a focused frontend experience.
            </h2>
            <p className="mt-5 text-base leading-8 text-[rgb(var(--muted))]">
              Available for React and Next.js interfaces, portfolio-quality product pages, dashboards, and teaching collaborations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-bold text-[rgb(var(--foreground))] transition-colors hover:border-cyan-electric/40 hover:text-cyan-electric"
                  >
                    <Icon size={18} />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[rgb(var(--foreground))]">Name</span>
                <input
                  required
                  name="name"
                  className="focus-ring min-h-12 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted))]"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[rgb(var(--foreground))]">Project type</span>
                <select
                  name="type"
                  className="focus-ring min-h-12 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-[rgb(var(--foreground))]"
                  defaultValue="Next.js website"
                >
                  <option>Next.js website</option>
                  <option>React dashboard</option>
                  <option>Frontend teaching</option>
                  <option>UI improvement</option>
                </select>
              </label>
            </div>

            <label className="mt-4 grid gap-2">
              <span className="text-sm font-semibold text-[rgb(var(--foreground))]">Message</span>
              <textarea
                required
                name="message"
                rows={6}
                className="focus-ring resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted))]"
                placeholder="A short project brief"
              />
            </label>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <motion.button
                type="submit"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-electric px-5 py-3 text-sm font-bold text-ink-950 shadow-cyan"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={17} />
                Continue on LinkedIn
                <motion.span
                  className="inline-flex"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={17} />
                </motion.span>
              </motion.button>
              <p className="min-h-6 text-sm text-[rgb(var(--muted))]" role="status" aria-live="polite">
                {status}
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
