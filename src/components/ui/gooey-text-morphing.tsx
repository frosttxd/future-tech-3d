import * as React from "react";
import { cn } from "@/lib/utils";

export interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  entranceDelay?: number;
  entranceDuration?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1.2,
  cooldownTime = 1.8,
  entranceDelay = 0.8,
  entranceDuration = 1.4,
  className,
  textClassName,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!texts || texts.length === 0) return;

    let textIndex = 0;
    const startTime = performance.now();
    let lastTime = startTime;
    let animationFrameId: number;

    // Phases:
    // 0: Initial clean dark void (0s to entranceDelay)
    // 1: Gooey liquid condensation entrance (entranceDelay to entranceDelay + entranceDuration)
    // 2: Presentation hold on first phrase (to entranceEndTime + initialHold)
    // 3: Infinite seamless morph loop
    const initialHold = 2.0;
    const entranceEndTime = entranceDelay + entranceDuration;
    const loopStartTime = entranceEndTime + initialHold;

    let isLooping = false;
    let morph = 0;
    let cooldown = cooldownTime;

    // Ease-out cubic for organic liquid emergence
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);

    // Initial pristine setup
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[0] ?? "";
      text1Ref.current.style.opacity = "0%";
      text1Ref.current.style.filter = "blur(40px)";
      text1Ref.current.style.transform = "translate3d(0, 16px, 0) scale(0.95)";

      text2Ref.current.textContent = "";
      text2Ref.current.style.opacity = "0%";
      text2Ref.current.style.filter = "";
      text2Ref.current.style.transform = "translate3d(0, 0, 0) scale(1)";
    }

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        // text2 is morphing in
        const blur2 = Math.min(8 / fraction - 8, 100);
        text2Ref.current.style.filter = `blur(${blur2.toFixed(2)}px)`;
        text2Ref.current.style.opacity = `${((fraction ** 0.4) * 100).toFixed(1)}%`;

        // text1 is morphing out
        const invFraction = 1 - fraction;
        const blur1 = Math.min(8 / invFraction - 8, 100);
        text1Ref.current.style.filter = `blur(${blur1.toFixed(2)}px)`;
        text1Ref.current.style.opacity = `${((invFraction ** 0.4) * 100).toFixed(1)}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate(currentTime: number = performance.now()) {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = (currentTime - startTime) / 1000;
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // --- PHASE 0: Clean Void (Waiting for wave emergence) ---
      if (elapsed < entranceDelay) {
        if (text1Ref.current) {
          text1Ref.current.style.opacity = "0%";
          text1Ref.current.style.filter = "blur(40px)";
        }
        return;
      }

      // --- PHASE 1: Liquid Gooey Entrance (Condensing into "The Technology") ---
      if (elapsed < entranceEndTime) {
        const entranceProgress = (elapsed - entranceDelay) / entranceDuration;
        const ease = easeOutCubic(entranceProgress);

        if (text1Ref.current) {
          const blurVal = Math.max(0, (1 - ease) * 36);
          const opacityVal = Math.min(100, Math.max(0, (ease ** 0.4) * 100));
          const translateY = (1 - ease) * 16;
          const scale = 0.95 + 0.05 * ease;

          text1Ref.current.style.filter = blurVal > 0.05 ? `blur(${blurVal.toFixed(2)}px)` : "";
          text1Ref.current.style.opacity = `${opacityVal.toFixed(1)}%`;
          text1Ref.current.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        }
        return;
      }

      // --- PHASE 2: Presentation Hold (Clear, crisp reading time for first phrase) ---
      if (elapsed < loopStartTime) {
        if (text1Ref.current) {
          text1Ref.current.style.filter = "";
          text1Ref.current.style.opacity = "100%";
          text1Ref.current.style.transform = "translate3d(0, 0, 0) scale(1)";
        }
        return;
      }

      // --- PHASE 3: Infinite Seamless Gooey Morph Loop ---
      if (!isLooping) {
        isLooping = true;
        textIndex = 0;
        morph = 0;
        cooldown = 0;
        if (text1Ref.current && text2Ref.current) {
          text1Ref.current.textContent = texts[0] ?? "";
          text2Ref.current.textContent = texts[1 % texts.length] ?? "";
          text1Ref.current.style.transform = "";
          text2Ref.current.style.transform = "";
        }
      }

      const shouldIncrementIndex = cooldown > 0;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length] ?? "";
            text2Ref.current.textContent =
              texts[(textIndex + 1) % texts.length] ?? "";
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [texts, morphTime, cooldownTime, entranceDelay, entranceDuration]);

  return (
    <div className={cn("relative flex items-center justify-center w-full", className)}>
      <svg className="absolute h-0 w-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold" x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center w-full min-h-[160px] md:min-h-[220px]"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center font-black tracking-tight",
            "text-white",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center font-black tracking-tight",
            "text-white",
            textClassName
          )}
        />
      </div>
    </div>
  );
}

export default GooeyText;
