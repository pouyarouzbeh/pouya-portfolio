"use client";

import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Braces,
  Code2,
  Component,
  Layers3,
  LayoutDashboard,
  Rocket,
  Smartphone,
  Terminal,
  Wind
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/lib/data";
import type { Skill, SkillGroup } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

const iconMap: Record<Skill["icon"], LucideIcon> = {
  atom: Atom,
  braces: Braces,
  code: Code2,
  component: Component,
  layers: Layers3,
  layout: LayoutDashboard,
  rocket: Rocket,
  smartphone: Smartphone,
  terminal: Terminal,
  wind: Wind
};

const groupOrder: SkillGroup[] = ["Core", "Frameworks", "Styling", "Progressive"];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const Icon = iconMap[skill.icon];
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group relative min-h-[13.5rem] overflow-hidden rounded-2xl border border-white/[0.075] bg-[rgba(var(--panel),0.54)] p-5 shadow-[0_18px_60px_rgba(var(--shadow-color),0.22)] backdrop-blur-[18px] transition-colors duration-300 hover:border-white/[0.14]"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.035, duration: 0.5, ease: "easeOut" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--skill-x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--skill-y", `${event.clientY - rect.top}px`);
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(18rem circle at var(--skill-x, 50%) var(--skill-y, 0%), ${skill.color}24, transparent 58%)`
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
        style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -left-16 top-0 h-full w-14 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
        animate={reduceMotion ? undefined : { x: ["0%", "560%"], opacity: [0, 0.85, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.045]"
              style={{ color: skill.color }}
              whileHover={{ scale: 1.06, rotate: skill.icon === "atom" ? 90 : 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <Icon size={21} />
            </motion.div>
            <div>
              <h3 className="text-xl font-black leading-tight text-[rgb(var(--foreground))]">{skill.name}</h3>
              <p className="mt-1 text-xs font-semibold text-[rgb(var(--muted))]">{skill.projects} shipped projects</p>
            </div>
          </div>
        </div>

        <p className="mt-5 min-h-12 text-sm leading-6 text-[rgb(var(--muted))]">{skill.description}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {skill.focus.slice(0, 2).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-[rgb(var(--muted))] transition-colors group-hover:text-[rgb(var(--foreground))]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Skills() {
  const groupedSkills = groupOrder.map((group) => ({
    group,
    items: skills.filter((skill) => skill.group === group)
  }));

  return (
    <section id="skills" className="section-shell">
      <div className="section-inner">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SectionHeading
            kicker="frontend.stack"
            title="Frontend Stack"
            description="Tools for clean, fast interfaces."
          />
        </motion.div>

        <div className="space-y-8">
          {groupedSkills.map(({ group, items }, groupIndex) => (
            <motion.div
              key={group}
              className="grid gap-4 border-t border-white/[0.08] pt-6 lg:grid-cols-[11rem_1fr] lg:gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.06, ease: "easeOut" }}
            >
              <div className="lg:pt-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-electric">{group}</p>
                <div className="mt-3 h-px w-16 bg-gradient-to-r from-cyan-electric to-transparent" />
              </div>

              <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
