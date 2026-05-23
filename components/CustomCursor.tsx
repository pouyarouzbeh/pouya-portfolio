"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const springX = useSpring(pointerX, { stiffness: 520, damping: 38, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 520, damping: 38, mass: 0.4 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    if (!pointerQuery.matches) {
      return;
    }

    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
    };

    const leave = () => setVisible(false);

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, input, textarea, select, [role='button']")));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    document.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      document.removeEventListener("mouseover", over);
    };
  }, [pointerX, pointerY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden mix-blend-screen md:block" aria-hidden="true">
      <motion.div
        className="fixed left-0 top-0 h-3 w-3 rounded-full bg-cyan-electric"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 0.75 : 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        className="fixed left-0 top-0 rounded-full border border-cyan-electric/70 shadow-cyan"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 0.9 : 0,
          width: active ? 58 : 34,
          height: active ? 58 : 34,
          borderColor: active ? "rgba(124, 58, 237, 0.95)" : "rgba(0, 212, 255, 0.7)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      />
    </div>
  );
}
