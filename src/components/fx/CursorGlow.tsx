"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A soft violet spotlight that trails the pointer across the whole site.
 * Disabled on touch devices.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const target = { x: innerWidth / 2, y: innerHeight / 3 };
    const pos = { ...target };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.09;
      pos.y += (target.y - pos.y) * 0.09;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.x - 400}px, ${
          pos.y - 400
        }px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[2] h-[800px] w-[800px] mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(139,92,246,0.09) 0%, rgba(139,92,246,0.035) 35%, transparent 65%)",
      }}
    />
  );
}
