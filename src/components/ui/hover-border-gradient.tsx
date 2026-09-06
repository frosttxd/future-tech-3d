import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";
const DIRECTIONS: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1.2,
  clockwise = true,
  glowColor = "#00f5ff",
  highlight,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
    glowColor?: string;
    highlight?: string;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const movingMap: Record<Direction, string> = {
    TOP: `radial-gradient(28% 60% at 50% 0%, ${glowColor} 0%, rgba(255, 255, 255, 0.4) 40%, rgba(0, 245, 255, 0) 100%)`,
    LEFT: `radial-gradient(22% 50% at 0% 50%, ${glowColor} 0%, rgba(255, 255, 255, 0.4) 40%, rgba(0, 245, 255, 0) 100%)`,
    BOTTOM: `radial-gradient(28% 60% at 50% 100%, ${glowColor} 0%, rgba(255, 255, 255, 0.4) 40%, rgba(0, 245, 255, 0) 100%)`,
    RIGHT: `radial-gradient(22% 50% at 100% 50%, ${glowColor} 0%, rgba(255, 255, 255, 0.4) 40%, rgba(0, 245, 255, 0) 100%)`,
  };

  const defaultHighlight =
    "radial-gradient(75% 181.16% at 50% 50%, rgba(0, 245, 255, 0.65) 0%, rgba(37, 99, 235, 0.3) 45%, rgba(2, 3, 6, 0) 100%)";

  const effectiveHighlight = highlight || defaultHighlight;

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prev) => {
          const index = DIRECTIONS.indexOf(prev);
          const nextIndex = clockwise
            ? (index - 1 + DIRECTIONS.length) % DIRECTIONS.length
            : (index + 1) % DIRECTIONS.length;
          return DIRECTIONS[nextIndex];
        });
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-white/10 content-center bg-[#020306]/40 hover:bg-[#020306]/20 transition duration-500 items-center justify-center overflow-visible p-[1.5px] decoration-clone w-fit cursor-pointer",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-[#020306] px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(3px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], effectiveHighlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="bg-[#020306] absolute z-[1] flex-none inset-[1.5px] rounded-[inherit]" />
    </Tag>
  );
}
