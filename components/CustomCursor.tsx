"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    if (!pointerQuery.matches) {
      return;
    }

    const move = (event: PointerEvent) => {
      layerRef.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
      layerRef.current?.style.setProperty("--cursor-y", `${event.clientY}px`);
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
  }, []);

  return (
    <div
      ref={layerRef}
      className={`cursor-ambient ${visible ? "is-visible" : ""} ${active ? "is-active" : ""}`}
      aria-hidden="true"
    />
  );
}
