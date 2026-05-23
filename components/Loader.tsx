"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setProgress(100);
      const timeout = window.setTimeout(() => setVisible(false), 200);
      return () => window.clearTimeout(timeout);
    }

    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + Math.random() * 12 + 5, 100);
        if (next >= 100) {
          window.clearInterval(interval);
          window.setTimeout(() => setVisible(false), 420);
        }
        return next;
      });
    }, 120);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950 px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          role="status"
          aria-live="polite"
        >
          <div className="w-full max-w-sm">
            <motion.div
              className="mx-auto mb-7 grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] font-mono text-2xl font-bold text-cyan-electric shadow-cyan"
              initial={{ scale: 0.86, opacity: 0, rotateX: -18 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
            >
              {profile.initials}
            </motion.div>
            <motion.p
              className="mb-4 text-center font-mono text-sm text-slate-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              compiling portfolio experience
            </motion.p>
            <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-cyan-electric shadow-cyan"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              />
            </div>
            <motion.p
              className="mt-3 text-center font-mono text-xs text-slate-500"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {Math.round(progress).toString().padStart(3, "0")}%
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
