import React, { useEffect, useMemo, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { cn } from "@/lib/utils";

export interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

function parseHex(hex: string): RgbColor {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((ch) => ch + ch).join("");
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

const DEFAULT_WAVE_COLORS = [
  "#00f5ff", // Ultra Hyper-Cyan
  "#2563eb", // Royal Cobalt
  "#a855f7", // Bioluminescent Violet
  "#06b6d4", // Electric Turquoise
  "#ec4899", // Neon Magenta
  "#ffffff", // Starlight White
];

const getSpeedMultiplier = (speed: "slow" | "fast") => {
  switch (speed) {
    case "slow":
      return 0.08;
    case "fast":
      return 0.14;
    default:
      return 0.10;
  }
};

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 65,
  backgroundFill = "#020306",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.72,
  ...props
}: WavyBackgroundProps) => {
  const noise = useMemo(() => createNoise3D(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rgbColors = useMemo(
    () => (colors ?? DEFAULT_WAVE_COLORS).map(parseHex),
    [colors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const startTime = performance.now();
    let animationId: number;

    // Choreography Timings (in seconds):
    const SILENCE_TIME = 0.6; // Dark clean void on load (no waves yet)
    const TRAVEL_TIME = 2.6;  // Inward glide from edges to center
    const BLEND_TIME = 0.8;   // Smooth mathematical crossfade into full wave

    const speedMult = getSpeedMultiplier(speed);
    const numWaves = rgbColors.length;

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Clear canvas to transparent - leaves solid uniform CSS #020306 background intact
      ctx.clearRect(0, 0, w, h);

      // PHASE 0: Clean dark void before waves arrive
      if (elapsed < SILENCE_TIME) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const activeTime = elapsed - SILENCE_TIME;
      const centerY = h * 0.52;
      const nt = elapsed * speedMult;

      // Constant physical rotation angle (never jumps or flips)
      const twistAngle = activeTime * 1.6;

      // Perfectly smooth C^inf twist amplitude (zero discontinuity at TRAVEL_TIME)
      let twistAmp = 0;
      if (activeTime < TRAVEL_TIME) {
        const p = activeTime / TRAVEL_TIME;
        twistAmp = 32 * Math.sin(p * Math.PI * 0.5);
      } else {
        const postTravel = activeTime - TRAVEL_TIME;
        twistAmp = 32 * Math.exp(-postTravel * 1.5);
      }

      // Globally continuous wave position equation for ANY ribbon i at coordinate x
      const computeY = (x: number, waveIdx: number) => {
        const organic = noise(x / 580, 0.22 * waveIdx, nt) * 95;
        const ribbonPhase = (waveIdx * Math.PI * 2) / numWaves;
        const helix = Math.sin(twistAngle + (x / 460) * Math.PI * 2 + ribbonPhase) * twistAmp;
        const layerOffset = (waveIdx - numWaves / 2) * 12;
        return centerY + organic + helix + layerOffset;
      };

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const step = 8;

      // PHASE 1: Streams glide inward from sides
      if (activeTime < TRAVEL_TIME + BLEND_TIME) {
        const travelProgress = Math.min(1, activeTime / TRAVEL_TIME);
        const ease = 0.5 - 0.5 * Math.cos(travelProgress * Math.PI);

        // Heads travel from edges past center with generous overlap
        const maxOverlap = 160;
        const leftHead = Math.min(w, ease * (w / 2 + maxOverlap));
        const rightHead = Math.max(0, w - ease * (w / 2 + maxOverlap));

        const baseAlpha = Math.min(travelProgress * 2.2, 1) * waveOpacity;

        // Crossfade factor between branch strokes and full stroke
        let branchWeight = 1.0;
        let fullWeight = 0.0;
        if (activeTime >= TRAVEL_TIME) {
          const blendProgress = Math.min(1, (activeTime - TRAVEL_TIME) / BLEND_TIME);
          branchWeight = 1.0 - blendProgress;
          fullWeight = blendProgress;
        }

        for (let i = 0; i < numWaves; i++) {
          const { r, g, b } = rgbColors[i];

          // 1. Draw dual branches if branchWeight > 0
          if (branchWeight > 0.001) {
            const streamAlpha = baseAlpha * branchWeight;

            // --- LEFT BRANCH (0 -> leftHead) ---
            const taperL = Math.min(200, Math.max(30, leftHead * 0.75));
            const gradL = ctx.createLinearGradient(0, 0, leftHead, 0);
            gradL.addColorStop(0, `rgba(${r},${g},${b},${(streamAlpha * 0.75).toFixed(3)})`);
            const stopL = Math.max(0, (leftHead - taperL) / Math.max(1, leftHead));
            gradL.addColorStop(stopL, `rgba(${r},${g},${b},${streamAlpha.toFixed(3)})`);
            gradL.addColorStop(1, `rgba(${r},${g},${b},0)`);

            ctx.beginPath();
            ctx.lineWidth = waveWidth;
            ctx.strokeStyle = gradL;
            for (let x = 0; x <= leftHead; x += step) {
              const y = computeY(x, i);
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.lineTo(leftHead, computeY(leftHead, i));
            ctx.stroke();

            // --- RIGHT BRANCH (w -> rightHead) ---
            const taperR = Math.min(200, Math.max(30, (w - rightHead) * 0.75));
            const gradR = ctx.createLinearGradient(w, 0, rightHead, 0);
            gradR.addColorStop(0, `rgba(${r},${g},${b},${(streamAlpha * 0.75).toFixed(3)})`);
            const stopR = Math.max(0, (w - (rightHead + taperR)) / Math.max(1, w - rightHead));
            gradR.addColorStop(Math.min(1, stopR), `rgba(${r},${g},${b},${streamAlpha.toFixed(3)})`);
            gradR.addColorStop(1, `rgba(${r},${g},${b},0)`);

            ctx.beginPath();
            ctx.lineWidth = waveWidth;
            ctx.strokeStyle = gradR;
            for (let x = w; x >= rightHead; x -= step) {
              const y = computeY(x, i);
              if (x === w) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.lineTo(rightHead, computeY(rightHead, i));
            ctx.stroke();
          }

          // 2. Draw seamless full stroke if fullWeight > 0
          if (fullWeight > 0.001) {
            const currentFullAlpha = waveOpacity * fullWeight;
            ctx.beginPath();
            ctx.lineWidth = waveWidth;
            ctx.strokeStyle = `rgba(${r},${g},${b},${currentFullAlpha.toFixed(3)})`;
            for (let x = 0; x <= w; x += step) {
              const y = computeY(x, i);
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
        }
      }
      // PHASE 2: Steady state full-screen wave (twistAmp decays into calm waves)
      else {
        for (let i = 0; i < numWaves; i++) {
          const { r, g, b } = rgbColors[i];
          ctx.beginPath();
          ctx.lineWidth = waveWidth;
          ctx.strokeStyle = `rgba(${r},${g},${b},${waveOpacity.toFixed(3)})`;
          for (let x = 0; x <= w; x += step) {
            const y = computeY(x, i);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [blur, speed, waveWidth, backgroundFill, waveOpacity, rgbColors, noise]);

  return (
    <div
      className={cn(
        "relative h-screen min-h-[650px] w-full flex flex-col items-center justify-center overflow-hidden bg-[#020306] select-none",
        containerClassName
      )}
    >
      {/* 
        Hardware-accelerated CSS blur filter on the canvas element.
        Eliminates expensive 2D CPU blur rasterization and guarantees 60-120 FPS.
      */}
      <canvas
        className="absolute inset-0 z-0 pointer-events-none w-full h-full will-change-transform"
        style={{
          filter: `blur(${blur}px)`,
          transform: "translate3d(0, 0, 0)",
        }}
        ref={canvasRef}
      />
      <div className={cn("relative z-10 w-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

export default WavyBackground;
