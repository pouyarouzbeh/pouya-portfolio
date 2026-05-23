"use client";

import { ArrowRight, Github, Linkedin, MapPin, MessageCircle, MonitorSmartphone, PanelsTopLeft } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

const contactCards = [
  {
    title: "Product UI",
    text: "Dashboards, SaaS flows, and polished landing pages.",
    icon: PanelsTopLeft
  },
  {
    title: "Frontend Build",
    text: "React, Next.js, Tailwind, and maintainable components.",
    icon: MonitorSmartphone
  },
  {
    title: "Project Brief",
    text: "Share goals, timeline, and references in one message.",
    icon: MessageCircle
  }
];

export default function Contact() {
  return (
    <section id="contact" className="section-shell pb-16">
      <div className="section-inner">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SectionHeading
            kicker="contact.channel"
            title="Start a Conversation"
            description="Direct, simple, and useful."
          />
        </motion.div>

        <motion.div
          className="glass-panel relative overflow-hidden rounded-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-electric/70 to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-electric/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-deep/10 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-sm font-bold text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(var(--success),0.65)]" />
                Available for selected frontend work
              </div>

              <h3 className="gradient-text mt-6 select-text text-3xl font-black leading-tight sm:text-4xl">
                Have a project that needs a sharp frontend?
              </h3>
              <p className="mx-auto mt-4 max-w-xl select-text text-base leading-8 text-[rgb(var(--muted))] lg:mx-0">
                Send the brief on LinkedIn. I can review scope, frontend direction, and next steps there.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <motion.a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-electric px-5 py-3 text-sm font-black text-ink-950 shadow-cyan"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Linkedin size={18} />
                  Message on LinkedIn
                  <motion.span
                    className="inline-flex"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </motion.a>

                <motion.a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-black text-[rgb(var(--foreground))] transition-colors hover:border-cyan-electric/40 hover:text-cyan-electric"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github size={18} />
                  View GitHub
                </motion.a>
              </div>

              <p className="mt-5 inline-flex items-center justify-center gap-2 text-sm text-[rgb(var(--muted))] lg:justify-start">
                <MapPin size={15} className="text-cyan-electric" />
                {profile.location}
              </p>
            </div>

            <div className="grid gap-3">
              {contactCards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <motion.div
                    key={card.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
                    whileHover={{ x: 4, borderColor: "rgba(var(--primary), 0.28)" }}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_0%_0%,rgba(var(--primary),0.14),transparent_50%)]" />
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-cyan-electric">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="select-text text-base font-black text-[rgb(var(--foreground))]">{card.title}</h4>
                        <p className="mt-1 select-text text-sm leading-6 text-[rgb(var(--muted))]">{card.text}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
