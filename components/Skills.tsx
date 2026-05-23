"use client";

import { useRef, useState } from "react";
import {
  Atom,
  Braces,
  Code2,
  Component,
  Layers3,
  LayoutDashboard,
  Rocket,
  Smartphone,
  Sparkles,
  Terminal
} from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Skill, SkillGroup, skills } from "@/lib/data";

const iconMap = {
  code: Code2,
  layers: Layers3,
  terminal: Terminal,
  atom: Atom,
  rocket: Rocket,
  braces: Braces,
  sparkles: Sparkles,
  layout: LayoutDashboard,
  component: Component,
  smartphone: Smartphone
};

const groupOrder: SkillGroup[] = ["Core", "Frameworks", "Styling", "Progressive"];

function ProgressRing({ level, color }: { level: number; color: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const circumference = 2 * Math.PI * 24;

  return (
    <svg ref={ref} viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
      <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
      <motion.circle
        cx="32"
        cy="32"
        r="24"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="6"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: inView ? circumference - (level / 100) * circumference : circumference }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </svg>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const Icon = iconMap[skill.icon as keyof typeof iconMap];
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const spanClass =
    skill.span === "wide"
      ? "md:col-span-2"
      : skill.span === "tall"
        ? "md:row-span-2"
        : "";

  return (
    <motion.article
      className={`glass-panel group relative min-h-52 overflow-hidden rounded-2xl p-5 ${spanClass}`}
      style={{ transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.035, duration: 0.5, ease: "easeOut" }}
      animate={{
        rotateX: reduceMotion ? 0 : rotation.x,
        rotateY: reduceMotion ? 0 : rotation.y,
        y: hovered ? -8 : 0,
        borderColor: hovered ? `${skill.color}66` : "rgba(255,255,255,0.07)"
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setRotation({ x: y * -8, y: x * 8 });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setRotation({ x: 0, y: 0 });
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: `radial-gradient(circle at 50% 0%, ${skill.color}26, transparent 58%)`
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04]"
            style={{ color: skill.color }}
            animate={
              hovered
                ? { rotate: skill.icon === "atom" ? 180 : 0, scale: [1, 1.08, 1] }
                : { rotate: 0, scale: 1 }
            }
            transition={{ duration: 0.65, ease: "easeInOut" }}
          >
            <Icon size={22} />
          </motion.div>

          <div className="relative grid place-items-center">
            <ProgressRing level={skill.level} color={skill.color} />
            <span className="absolute text-sm font-bold text-[rgb(var(--foreground))]">{skill.level}%</span>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-[rgb(var(--muted))]">{skill.group}</p>
          <h3 className="mt-2 text-2xl font-black text-[rgb(var(--foreground))]">{skill.name}</h3>
          <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted))]">{skill.description}</p>
        </div>
      </div>

      <AnimatePresence>
        {hovered ? (
          <motion.div
            className="pointer-events-none absolute right-4 top-4 z-20 rounded-full border border-white/[0.08] bg-ink-950/85 px-3 py-1.5 text-xs text-slate-200 shadow-glass backdrop-blur"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
          >
            Used in {skill.projects} projects
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <div className="section-inner">
        <motion.div
          className="mb-10 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="font-mono text-sm text-cyan-electric">skills.system</p>
          <h2 className="mt-4 text-4xl font-black text-balance text-[rgb(var(--foreground))] md:text-5xl">
            A practical frontend stack, organized for real delivery.
          </h2>
          <p className="mt-5 text-base leading-8 text-[rgb(var(--muted))]">
            Core web fundamentals, production React patterns, responsive styling systems, and progressive app thinking.
          </p>
        </motion.div>

        <div className="mb-6 flex flex-wrap gap-2">
          {groupOrder.map((group) => (
            <span
              key={group}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 font-mono text-xs text-[rgb(var(--muted))]"
            >
              {group}
            </span>
          ))}
        </div>

        <div className="grid auto-rows-[minmax(13rem,auto)] gap-4 md:grid-cols-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
