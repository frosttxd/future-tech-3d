import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Clock,
  Calendar,
  FileText,
  Code2,
  ArrowLeft,
  X,
  Zap,
} from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export interface TimelineNode {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  angle: number; // in degrees
  status: "Completed" | "In Progress" | "Review & QA" | "Scheduled";
  energy: number;
  phase: string;
  description: string;
}

// 5 nodes matching the exact layout of the user's reference image
// Distributed in 100% mathematical bilateral & radial symmetry (exact 72.0° intervals):
// - Release: 90° (Bottom Center Axis)
// - Planning: 162° (Bottom-Left)
// - Design: 234° (Top-Left)
// - Development: 306° (Top-Right)
// - Testing: 18° (Bottom-Right)
const DEFAULT_NODES: TimelineNode[] = [
  {
    id: "design",
    title: "Design",
    icon: FileText,
    angle: 234, // Top-Left
    status: "Completed",
    energy: 98,
    phase: "Phase 02",
    description:
      "Design systems, interactive orbital layouts, fluid physics, and visual aesthetics.",
  },
  {
    id: "development",
    title: "Development",
    icon: Code2,
    angle: 306, // Top-Right
    status: "In Progress",
    energy: 85,
    phase: "Phase 03",
    description:
      "Full-stack reactive component implementation, shader pipelines, and performance audits.",
  },
  {
    id: "testing",
    title: "Testing",
    icon: User,
    angle: 18, // Middle-Right
    status: "Review & QA",
    energy: 94,
    phase: "Phase 04",
    description:
      "Automated unit coverage, regression pipelines, and simulated stress benchmarks.",
  },
  {
    id: "release",
    title: "Release",
    icon: Clock,
    angle: 90, // Bottom Center
    status: "Scheduled",
    energy: 88,
    phase: "Phase 05",
    description:
      "Zero-downtime canary deployment, multi-region edge synchronization, and health monitoring.",
  },
  {
    id: "planning",
    title: "Planning",
    icon: Calendar,
    angle: 162, // Bottom-Left
    status: "Completed",
    energy: 100,
    phase: "Phase 01",
    description:
      "Core scope definition, technical milestone sequencing, and architecture roadmap.",
  },
];

interface RadialOrbitalTimelineProps {
  onBack?: () => void;
  nodes?: TimelineNode[];
}

export const RadialOrbitalTimeline: React.FC<RadialOrbitalTimelineProps> = ({
  onBack,
  nodes = DEFAULT_NODES,
}) => {
  const [rotation, setRotation] = useState(0);
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TimelineNode | null>(null);
  const isPlaying = true;
  const speed = 0.25; // degrees per frame
  const animationFrameRef = useRef<number | null>(null);

  // Smooth continuous rotation loop
  useEffect(() => {
    let lastTimestamp = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTimestamp) / 16.666; // normalize to 60fps
      lastTimestamp = now;

      if (isPlaying) {
        setRotation((prev) => (prev + speed * delta) % 360);
      }
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, speed]);

  const getStatusColor = (status: TimelineNode["status"]) => {
    switch (status) {
      case "Completed":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "In Progress":
        return "text-[#00f5ff] bg-[#00f5ff]/10 border-[#00f5ff]/30";
      case "Review & QA":
        return "text-purple-400 bg-purple-500/10 border-purple-500/30";
      case "Scheduled":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      default:
        return "text-neutral-400 bg-neutral-500/10 border-neutral-500/30";
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#020306] text-[#FDFCF4] relative flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <header className="w-full max-w-6xl flex items-center justify-between z-30 pt-3 pb-4">
        {onBack ? (
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            onClick={onBack}
            className="bg-[#020306] text-white flex items-center space-x-2 px-6 py-2.5 cursor-pointer font-sans group"
          >
            <ArrowLeft className="w-4 h-4 text-white transition-transform duration-200 group-hover:-translate-x-1 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
            <span className="font-medium tracking-wide text-sm">Back to Home</span>
          </HoverBorderGradient>
        ) : (
          <div />
        )}
      </header>

      {/* Main Orbital Stage */}
      <main className="relative flex-1 w-full max-w-5xl flex items-center justify-center py-6 sm:py-8">
        {/* Orbital Canvas Wrapper */}
        <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px] lg:w-[580px] lg:h-[580px] flex items-center justify-center">
          {/* Main Orbital Track Ring */}
          <div className="absolute inset-0 rounded-full border border-white/[0.08] pointer-events-none" />

          {/* ============================================================ */}
          {/* CENTRAL COSMIC ORB (Identical to reference image)           */}
          {/* ============================================================ */}
          <div className="absolute z-10 flex items-center justify-center pointer-events-none">
            {/* Dark Concentric Inner Horizon Disc */}
            <div className="w-[180px] h-[180px] sm:w-[230px] sm:h-[230px] rounded-full border border-white/[0.03] bg-[#010204]/90 shadow-[0_0_40px_rgba(0,0,0,0.9)] flex items-center justify-center relative">
              {/* Soft Ambient Radiance Aura */}
              <div className="absolute w-28 h-28 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
              <div className="absolute w-24 h-24 rounded-full bg-purple-600/25 blur-lg" />

              {/* Glowing Multi-layer Gradient Orb */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#00f5ff] via-[#6366f1] to-[#a855f7] shadow-[0_0_30px_rgba(99,102,241,0.55)] flex items-center justify-center overflow-hidden">
                {/* Core Radial Sphere */}
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#3b82f6] via-[#60a5fa] to-[#93c5fd] flex items-center justify-center shadow-inner">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#bfdbfe]/90 shadow-[0_0_15px_rgba(191,219,254,0.9)]" />
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* ROTATING NODES SYSTEM - Perfect 72° Bilateral Symmetry        */}
          {/* ============================================================ */}
          <div
            className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isPlaying ? "none" : "transform 0.5s ease-out",
            }}
          >
            {nodes.map((node) => {
              // Convert angle to radians
              const rad = (node.angle * Math.PI) / 180;
              // Radius: exact 50% outer track perimeter
              const radiusPercent = 50;
              const x = Math.cos(rad) * radiusPercent;
              const y = Math.sin(rad) * radiusPercent;

              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode?.id === node.id;
              const IconComponent = node.icon;

              return (
                <div
                  key={node.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `calc(50% + ${x}%)`,
                    top: `calc(50% + ${y}%)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() =>
                    setSelectedNode((prev) => (prev?.id === node.id ? null : node))
                  }
                >
                  {/* Counter-rotate each node so content and labels remain upright */}
                  <div
                    className="flex flex-col items-center justify-center cursor-pointer group"
                    style={{
                      transform: `rotate(${-rotation}deg)`,
                      transition: isPlaying ? "none" : "transform 0.5s ease-out",
                    }}
                  >
                    {/* Node Circle Container */}
                    <div className="relative flex items-center justify-center">
                      {/* Ethereal Optical Glow - Expanding animated soft aura */}
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isSelected ? 1.5 : isHovered ? 1.6 : 0.5,
                          opacity: isSelected ? 1 : isHovered ? 0.95 : 0,
                        }}
                        transition={{
                          duration: isHovered ? 0.75 : 0.6,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 pointer-events-none rounded-full"
                        style={{
                          background: isSelected
                            ? "radial-gradient(circle at center, rgba(0,245,255,0.45) 0%, rgba(0,245,255,0.25) 25%, rgba(0,245,255,0.10) 45%, rgba(0,245,255,0.03) 70%, transparent 100%)"
                            : "radial-gradient(circle at center, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.24) 20%, rgba(255,255,255,0.11) 40%, rgba(255,255,255,0.04) 65%, rgba(255,255,255,0.01) 85%, transparent 100%)",
                          filter: "blur(20px)",
                          willChange: "transform, opacity",
                        }}
                      />

                      {/* Disc Body matching exact reference */}
                      <div
                        className={`w-13 h-13 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-[#05070e] border transition-all duration-300 shadow-xl z-10 ${
                          isSelected
                            ? "border-[#00f5ff] shadow-[0_0_25px_rgba(0,245,255,0.7)] scale-110"
                            : isHovered
                            ? "border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                            : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${
                            isSelected
                              ? "text-[#00f5ff]"
                              : isHovered
                              ? "text-white"
                              : "text-neutral-300"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Node Label underneath (Pristine clean typography matching reference) */}
                    <span
                      className={`text-xs sm:text-sm font-medium tracking-wide mt-2 text-center whitespace-nowrap transition-colors duration-200 select-none ${
                        isSelected
                          ? "text-[#00f5ff] font-semibold drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]"
                          : isHovered
                          ? "text-white"
                          : "text-neutral-400 group-hover:text-neutral-200"
                      }`}
                    >
                      {node.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Optional Clean Inspection Card on click (dismissible) */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute z-40 max-w-xs sm:max-w-sm w-full mx-4 p-5 rounded-2xl bg-[#070a14]/95 border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.85)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#00f5ff]">
                    <selectedNode.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">
                      {selectedNode.title}
                    </h3>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {selectedNode.phase}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <p className="text-neutral-300 leading-relaxed text-xs">
                  {selectedNode.description}
                </p>

                <div className="pt-2 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-medium">
                      Status
                    </span>
                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${getStatusColor(
                        selectedNode.status
                      )}`}
                    >
                      {selectedNode.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" />
                        Energy Level
                      </span>
                      <span className="font-mono text-white font-semibold">
                        {selectedNode.energy}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedNode.energy}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-[0_0_8px_rgba(0,245,255,0.7)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default RadialOrbitalTimeline;
