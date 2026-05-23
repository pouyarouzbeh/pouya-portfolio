"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.15,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest))
    });

    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="section-shell">
      <div className="section-inner">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SectionHeading
            kicker="impact.snapshot"
            title="Impact Snapshot"
            description="A quick view of recent frontend work."
          />
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {stats.map((stat) => (
            <motion.article
              key={stat.label}
              className="glass-panel rounded-2xl p-6"
              variants={{
                hidden: { opacity: 0, y: 26 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              whileHover={{ y: -6, borderColor: "rgba(var(--primary), 0.24)" }}
            >
              <p className="font-mono text-sm text-cyan-electric">{stat.label}</p>
              <p className="mt-3 text-4xl font-black text-[rgb(var(--foreground))]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 min-h-12 text-sm leading-6 text-[rgb(var(--muted))]">{stat.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
