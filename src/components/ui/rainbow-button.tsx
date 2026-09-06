import * as React from "react";
import { cn } from "@/lib/utils";

export interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  colors?: string[];
  duration?: number;
  borderWidth?: number;
  animated?: boolean;
}

export const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  (
    {
      children,
      colors = [
        "#f43f5e",
        "#8b5cf6",
        "#3b82f6",
        "#00f5ff",
        "#22c55e",
        "#f59e0b",
        "#f43f5e",
      ],
      duration = 3,
      borderWidth = 3,
      animated = true,
      className,
      onClick,
      disabled,
      type = "button",
      style,
      ...props
    },
    ref,
  ) => {
    const gradientColors = colors.join(", ");

    return (
      <div className="relative inline-flex items-center justify-center group">
        {/* Ambient atmospheric glow behind the button */}
        {animated && (
          <div
            className="absolute -inset-1.5 rounded-2xl opacity-50 blur-xl transition-all duration-500 group-hover:opacity-85 -z-10 animate-rainbow pointer-events-none"
            style={
              {
                background: `linear-gradient(var(--gradient-angle, 0deg), ${gradientColors})`,
                "--rainbow-duration": `${duration}s`,
              } as React.CSSProperties
            }
          />
        )}

        <button
          ref={ref}
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "relative inline-flex items-center justify-center overflow-hidden rounded-2xl font-semibold transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
            className,
          )}
          style={{
            padding: borderWidth,
            ...style,
          }}
          {...props}
        >
          {/* Animated gradient border */}
          <div
            className={cn(
              "absolute inset-0",
              animated && "animate-rainbow"
            )}
            style={
              {
                background: `linear-gradient(var(--gradient-angle, 0deg), ${gradientColors})`,
                "--rainbow-duration": `${duration}s`,
              } as React.CSSProperties
            }
          />

          {/* Button content container */}
          <span
            className="relative z-10 flex items-center justify-center gap-3 bg-[#020306] text-white transition-colors duration-300 group-hover:bg-[#070913] w-full h-full"
            style={{
              borderRadius: `calc(1rem - ${borderWidth}px)`,
            }}
          >
            {children}
          </span>
        </button>
      </div>
    );
  },
);

RainbowButton.displayName = "RainbowButton";

export default RainbowButton;
