"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Project, projects } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

function ProjectMockup({ project }: { project: Project }) {
  const rows = project.visual === "commerce" ? 5 : project.visual === "university" ? 4 : 3;
  const labels =
    project.visual === "commerce"
      ? ["Revenue", "Orders", "Catalog"]
      : project.visual === "consulting"
        ? ["Services", "Projects", "Contact"]
        : project.visual === "university"
          ? ["Students", "Faculty", "Review"]
          : ["Lessons", "Labs", "Mentors"];

  return (
    <div className="relative h-full min-h-60 overflow-hidden rounded-xl border border-white/[0.08] bg-ink-950/80 p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-auto rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[10px] text-slate-400">
          {project.category}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-3">
          {labels.map((label, index) => (
            <motion.div
              key={label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-3"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
            >
              <p className="font-mono text-[10px] text-slate-500">{label}</p>
              <div className="mt-2 h-2 rounded-full bg-white/[0.08]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: project.accent }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${56 + index * 11}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.16 + index * 0.08, duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.035] p-4">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] text-slate-500">module</p>
              <p className="mt-1 text-lg font-black text-white">{project.metrics[0]}</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ backgroundColor: `${project.accent}22` }}>
              <span className="h-5 w-5 rounded-md" style={{ backgroundColor: project.accent }} />
            </div>
          </div>
          <div className="space-y-2">
            {Array.from({ length: rows }).map((_, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-[1fr_3rem] gap-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.28 }}
              >
                <span className="h-3 rounded-full bg-white/[0.08]" />
                <span className="h-3 rounded-full" style={{ backgroundColor: `${project.accent}55` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="perspective-card min-h-[31rem] transform-gpu"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        default: { delay: index * 0.08, duration: 0.55, ease: "easeOut" },
        x: { type: "spring", stiffness: 120, damping: 26, mass: 0.7 },
        y: { type: "spring", stiffness: 120, damping: 26, mass: 0.7 }
      }}
      animate={{ x: reduceMotion ? 0 : offset.x, y: reduceMotion ? 0 : offset.y }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setOffset({
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 5,
          y: ((event.clientY - rect.top) / rect.height - 0.5) * 5
        });
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => {
        setFlipped(false);
        setOffset({ x: 0, y: 0 });
      }}
      onFocus={() => setFlipped(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFlipped(false);
        }
      }}
      tabIndex={0}
    >
      <motion.div
        className="preserve-3d relative h-full min-h-[31rem] rounded-2xl transform-gpu"
        animate={{ rotateY: flipped ? 180 : 0, scale: flipped && !reduceMotion ? 1.012 : 1 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="backface-hidden glass-panel absolute inset-0 flex transform-gpu flex-col rounded-2xl p-4 [transform:translateZ(1px)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-cyan-electric">{project.period}</p>
              <h3 className="mt-2 text-2xl font-black text-[rgb(var(--foreground))]">{project.title}</h3>
            </div>
            {project.live ? (
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <motion.span
                  className="h-2 w-2 rounded-full bg-emerald-300"
                  animate={{ scale: [1, 1.55, 1], opacity: [1, 0.45, 1] }}
                  transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                />
                Live
              </span>
            ) : null}
          </div>
          <div className="flex-1">
            <ProjectMockup project={project} />
          </div>
        </div>

        <div className="backface-hidden rotate-y-180 glass-panel absolute inset-0 flex transform-gpu flex-col rounded-2xl p-6 [transform:rotateY(180deg)_translateZ(1px)]">
          <p className="font-mono text-sm" style={{ color: project.accent }}>
            {project.category}
          </p>
          <h3 className="mt-4 text-3xl font-black text-[rgb(var(--foreground))]">{project.title}</h3>
          <p className="mt-5 text-sm leading-7 text-[rgb(var(--muted))]">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-xs text-[rgb(var(--muted))]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto grid gap-3 pt-6">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring group inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-sm font-bold text-[rgb(var(--foreground))] transition-colors hover:border-cyan-electric/40 hover:text-cyan-electric"
              >
                {link.label}
                <motion.span
                  className="inline-flex"
                  animate={{ x: flipped ? [0, 4, 0] : 0 }}
                  transition={{ duration: 1, repeat: flipped ? Infinity : 0, ease: "easeInOut" }}
                >
                  {link.label === "Open" ? <ArrowRight size={17} /> : <ExternalLink size={17} />}
                </motion.span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <div className="section-inner">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SectionHeading
            kicker="projects.caseStudies"
            title="Selected Work"
            description="Product surfaces built with real constraints."
          />
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
