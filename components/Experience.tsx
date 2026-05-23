"use client";

import { useRef, useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Experience as ExperienceItem, experiences } from "@/lib/data";

function TimelineCard({ item, index }: { item: ExperienceItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div className="relative grid gap-4 md:grid-cols-[1fr_4rem_1fr] md:gap-6">
      <div className={isLeft ? "md:col-start-1" : "md:col-start-3"}>
        <motion.article
          className="glass-panel rounded-2xl p-5"
          initial={{ opacity: 0, x: isLeft ? -44 : 44 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.58, ease: "easeOut" }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          onFocus={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
          whileHover={{ y: -6, borderColor: item.current ? "rgba(52, 211, 153, 0.34)" : "rgba(0, 212, 255, 0.24)" }}
          tabIndex={0}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-xs text-cyan-electric">
              {item.period}
            </span>
            {item.current ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                <motion.span
                  className="h-2 w-2 rounded-full bg-emerald-300"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.45, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
                Current
              </span>
            ) : null}
          </div>

          <h3 className="mt-5 text-2xl font-black text-[rgb(var(--foreground))]">{item.company}</h3>
          <p className="mt-2 text-base font-semibold text-[rgb(var(--foreground))]">{item.role}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-[rgb(var(--muted))]">
            <MapPin size={15} className="text-cyan-electric" />
            {item.location}
          </p>

          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <p className="mt-5 text-sm leading-7 text-[rgb(var(--muted))]">{item.summary}</p>
            {item.stack ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-xs text-[rgb(var(--muted))]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}
            {item.website ? (
              <a
                href={item.website}
                target="_blank"
                rel="noreferrer"
                className="focus-ring mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan-electric/20 bg-cyan-electric/10 px-4 py-2 text-sm font-bold text-cyan-electric"
              >
                Visit site
                <ExternalLink size={15} />
              </a>
            ) : null}
          </motion.div>

          <p className="mt-5 text-sm leading-7 text-[rgb(var(--muted))] md:hidden">{item.summary}</p>
        </motion.article>
      </div>

      <div className="absolute left-0 top-5 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-white/10 bg-[rgb(var(--background))] md:left-1/2 md:block">
        <motion.span
          className="absolute inset-1 rounded-full"
          style={{ backgroundColor: item.current ? "#34d399" : "#00d4ff" }}
          animate={
            item.current
              ? { scale: [1, 1.65, 1], opacity: [1, 0.45, 1] }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 1.25, repeat: item.current ? Infinity : 0, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 55%"]
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section-shell">
      <div className="section-inner">
        <motion.div
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="font-mono text-sm text-cyan-electric">experience.timeline</p>
          <h2 className="mt-4 text-4xl font-black text-balance text-[rgb(var(--foreground))] md:text-5xl">
            Frontend work across products, education, and international delivery.
          </h2>
        </motion.div>

        <div ref={ref} className="relative space-y-6 md:space-y-10">
          <div className="absolute left-0 top-0 hidden h-full w-px -translate-x-1/2 bg-white/[0.08] md:left-1/2 md:block" />
          <motion.div
            className="absolute left-0 top-0 hidden h-full w-px -translate-x-1/2 origin-top bg-cyan-electric shadow-cyan md:left-1/2 md:block"
            style={{ scaleY }}
          />
          {experiences.map((experience, index) => (
            <TimelineCard key={`${experience.company}-${experience.period}`} item={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
