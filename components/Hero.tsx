"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Github, Linkedin, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { heroCodeLines, profile } from "@/lib/data";

function tokenize(line: string) {
  const pattern =
    /(import|from|export|default|function|return|const)|('[^']*')|(<\/?[A-Za-z][\w.]*|\/?>)|([A-Za-z]+(?==))|([{}()[\],.=;])|(\s+)/g;
  const parts: { value: string; className: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ value: line.slice(lastIndex, match.index), className: "text-slate-300" });
    }

    const [value, keyword, stringValue, tag, attribute, punctuation, space] = match;
    let className = "text-slate-300";
    if (keyword) className = "text-purple-300";
    if (stringValue) className = "text-emerald-300";
    if (tag) className = "text-cyan-electric";
    if (attribute) className = "text-sky-300";
    if (punctuation) className = "text-slate-500";
    if (space) className = "text-transparent";
    parts.push({ value, className });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push({ value: line.slice(lastIndex), className: "text-slate-300" });
  }

  return parts;
}

function CodeLine({
  line,
  active,
  number
}: {
  line: string;
  active: boolean;
  number: number;
}) {
  return (
    <div className="grid min-h-6 grid-cols-[2rem_1fr] gap-4 font-mono text-[13px] leading-6 text-slate-300 sm:text-sm">
      <span className="select-none text-right text-slate-600">{number.toString().padStart(2, "0")}</span>
      <span className="whitespace-pre-wrap break-words">
        {tokenize(line).map((part, index) => (
          <span key={`${part.value}-${index}`} className={part.className}>
            {part.value}
          </span>
        ))}
        {active ? (
          <motion.span
            className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyan-electric"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
        ) : null}
      </span>
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        x: `${(index * 37) % 100}%`,
        y: `${(index * 61) % 100}%`,
        size: 2 + (index % 4),
        delay: index * 0.12,
        duration: 4 + (index % 5)
      })),
    []
  );

  useEffect(() => {
    if (reduceMotion) {
      setTypedLines(heroCodeLines);
      setComplete(true);
      return;
    }

    if (lineIndex >= heroCodeLines.length) {
      const timeout = window.setTimeout(() => setComplete(true), 420);
      return () => window.clearTimeout(timeout);
    }

    const currentLine = heroCodeLines[lineIndex];
    const lineIsDone = charIndex > currentLine.length;
    const timeout = window.setTimeout(
      () => {
        if (lineIsDone) {
          setLineIndex((current) => current + 1);
          setCharIndex(0);
          return;
        }

        setTypedLines((current) => {
          const next = [...current];
          next[lineIndex] = currentLine.slice(0, charIndex);
          return next;
        });
        setCharIndex((current) => current + 1);
      },
      lineIsDone ? 115 : 18 + ((charIndex * 17 + lineIndex * 23) % 42)
    );

    return () => window.clearTimeout(timeout);
  }, [charIndex, lineIndex, reduceMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:pt-24"
    >
      <div className="absolute inset-0 -z-10 bg-radial-grid bg-[length:260px_260px] opacity-[0.22]" />
      <motion.div
        className="absolute left-[-18%] top-[8%] -z-10 h-[28rem] w-[52rem] rounded-[40%] bg-cyan-electric/10 blur-3xl"
        animate={{ x: [0, 34, -12, 0], y: [0, 22, 10, 0], opacity: [0.22, 0.34, 0.24, 0.22] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[-18%] right-[-18%] -z-10 h-[30rem] w-[58rem] rounded-[42%] bg-purple-deep/12 blur-3xl"
        animate={{ x: [0, -28, 14, 0], y: [0, -18, -30, 0], opacity: [0.2, 0.32, 0.22, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-cyan-electric/60 shadow-cyan"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size
            }}
            animate={{
              y: [0, -24, 0],
              opacity: [0.12, 0.72, 0.12],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="section-inner grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr]">
        <motion.div
          className="glass-panel overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.04] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="hidden rounded-full border border-white/[0.07] px-4 py-1 font-mono text-xs text-slate-400 sm:block">
              app/portfolio.tsx
            </div>
            <Sparkles size={16} className="text-cyan-electric" />
          </div>

          <div className="border-b border-white/[0.07] bg-ink-900/70 px-4 py-2">
            <div className="inline-flex rounded-t-xl border border-b-0 border-white/[0.07] bg-ink-950 px-4 py-2 font-mono text-xs text-cyan-electric">
              portfolio.tsx
            </div>
          </div>

          <div className="relative min-h-[27rem] overflow-hidden bg-[#071019]/88 p-4 sm:p-6">
            <div className="absolute inset-y-0 left-0 w-12 border-r border-white/[0.04] bg-white/[0.02]" />
            <div className="relative z-10 space-y-1">
              {Array.from({ length: Math.max(heroCodeLines.length, typedLines.length) }).map((_, index) => (
                <CodeLine
                  key={index}
                  line={typedLines[index] ?? ""}
                  active={!complete && index === lineIndex}
                  number={index + 1}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {complete ? (
            <motion.div
              className="glass-panel rounded-2xl p-6 sm:p-8"
              initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-cyan-electric/30 bg-white/[0.04] shadow-cyan">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-sm text-cyan-electric">available for selected frontend work</p>
                  <h1 className="mt-2 text-4xl font-black text-balance text-[rgb(var(--foreground))] sm:text-5xl">
                    {profile.name}
                  </h1>
                </div>
              </div>

              <p className="text-lg font-semibold text-[rgb(var(--foreground))] sm:text-xl">{profile.role}</p>
              <p className="mt-4 max-w-xl text-base leading-8 text-[rgb(var(--muted))]">{profile.tagline}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="focus-ring group inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-electric px-5 py-3 text-sm font-bold text-ink-950 shadow-cyan"
                >
                  View projects
                  <motion.span
                    className="inline-flex"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-bold text-[rgb(var(--foreground))] transition-colors hover:border-cyan-electric/40 hover:text-cyan-electric"
                >
                  <Github size={18} />
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-bold text-[rgb(var(--foreground))] transition-colors hover:border-purple-deep/50 hover:text-purple-300"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <motion.a
        href="#stats"
        className="focus-ring absolute bottom-6 left-1/2 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-cyan-electric backdrop-blur"
        aria-label="Scroll to stats"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
