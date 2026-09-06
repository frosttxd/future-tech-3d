import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const TracingBeam = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [svgWidth, setSvgWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const [navCoords, setNavCoords] = useState<{
    left: number;
    right: number;
    bottom: number;
  } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setSvgWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamically measure the exact position of #main-navbar to nest the cradle perfectly
  useEffect(() => {
    const updateCoords = () => {
      const el = document.getElementById("main-navbar");
      if (el) {
        const r = el.getBoundingClientRect();
        setNavCoords({
          left: r.left,
          right: r.right,
          bottom: r.bottom,
        });
      }
    };

    updateCoords();
    const t = setTimeout(updateCoords, 60);
    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords, { passive: true });

    let ro: ResizeObserver | null = null;
    const el = document.getElementById("main-navbar");
    if (el) {
      ro = new ResizeObserver(updateCoords);
      ro.observe(el);
    }

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords);
      if (ro) ro.disconnect();
    };
  }, []);

  // Global window scroll progress
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 450,
    damping: 45,
    restDelta: 0.001,
  });

  // Calculate geometric notch coordinates hugging the navbar
  const center = svgWidth / 2;
  const navLeft = navCoords ? navCoords.left : center - 165;
  const navRight = navCoords ? navCoords.right : center + 165;
  const navBottom = navCoords ? navCoords.bottom : 48;

  // Rail heights: top rail at 10px, cradle bottom rail at 6px below navbar
  const yTop = 10;
  const yBottom = Math.round(navBottom + 6);
  const dy = Math.max(20, yBottom - yTop);
  const dx = Math.round(dy * 0.85); // 40° diagonal wing slope

  const x2 = Math.round(navLeft - 10);
  const x1 = Math.max(0, x2 - dx);
  const x3 = Math.round(navRight + 10);
  const x4 = Math.min(svgWidth, x3 + dx);

  const pathD = `M 0 ${yTop} H ${x1} L ${x2} ${yBottom} H ${x3} L ${x4} ${yTop} H ${svgWidth}`;
  const leftPathD = `M 0 ${yTop} H ${x1} L ${x2} ${yBottom} H ${center}`;
  const rightPathD = `M ${svgWidth} ${yTop} H ${x4} L ${x3} ${yBottom} H ${center}`;

  const svgHeight = yBottom + 16;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Symmetrical Bilateral Notched Tracing Beam framing the navbar */}
      <div className="fixed top-0 inset-x-0 z-[100] pointer-events-none w-full overflow-visible">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          width={svgWidth}
          height={svgHeight}
          className="w-full block"
          aria-hidden="true"
        >
          <defs>
            {/* Left to center gradient */}
            <linearGradient id="head-tracing-gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="60%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Right to center gradient */}
            <linearGradient id="head-tracing-gradient-right" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="60%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            <filter id="head-beam-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background track notched guide line */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.5"
          />

          {/* Left glowing fill coming in from the left towards center */}
          <motion.path
            d={leftPathD}
            fill="none"
            stroke="url(#head-tracing-gradient-left)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pathLength }}
            filter="url(#head-beam-glow)"
          />

          {/* Right glowing fill coming in from the right towards center */}
          <motion.path
            d={rightPathD}
            fill="none"
            stroke="url(#head-tracing-gradient-right)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pathLength }}
            filter="url(#head-beam-glow)"
          />
        </svg>
      </div>

      {/* Page Content */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default TracingBeam;
