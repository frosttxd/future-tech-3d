import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SpecularButton } from "./specular-button";

export interface NavItem {
  label: string;
  href: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "#hero" },
  { label: "State of Gallery", href: "#gallery-showcase" },
  { label: "Archive", href: "#footer" },
];

export interface GooeyNavProps {
  items?: NavItem[];
  initialActiveIndex?: number;
}

export const GooeyNav: React.FC<GooeyNavProps> = ({
  items = DEFAULT_NAV_ITEMS,
  initialActiveIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number, href: string) => {
    e.preventDefault();
    if (activeIndex === index) return;
    setActiveIndex(index);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-2.5 inset-x-0 z-[110] flex justify-center px-4 pointer-events-none">
      <SpecularButton
        id="main-navbar"
        as="nav"
        radius={18}
        tint="#020306"
        tintOpacity={scrolled ? 0.95 : 0.85}
        blur={16}
        lineColor="#ffffff"
        baseColor="#3a3a44"
        intensity={1.4}
        shineSize={16}
        shineFade={40}
        thickness={1.1}
        speed={0.4}
        followMouse={true}
        proximity={300}
        autoAnimate={true}
        className="pointer-events-auto h-9 px-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      >
        <div
          className="relative flex items-center justify-center h-full select-none font-sans"
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
        >
          <ul className="flex items-center gap-1 list-none p-0 m-0 h-full">
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <li
                  key={index}
                  className="relative flex items-center justify-center h-[28px] rounded-full"
                >
                  {/* Smooth active pill using Framer Motion layoutId for pixel-perfect framing */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.14] border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-sm"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, index, item.href)}
                    className={`relative z-10 flex items-center justify-center h-full px-3.5 text-[12px] font-medium tracking-[0.01em] transition-colors duration-200 rounded-full select-none cursor-pointer ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </SpecularButton>
    </header>
  );
};

export default GooeyNav;
