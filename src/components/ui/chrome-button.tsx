import type { ReactNode } from "react";
import LiquidChrome from "@/components/ui/liquid-chrome";

export interface ChromeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ChromeButton({ children, className = "", ...props }: ChromeButtonProps) {
  return (
    <button
      className={`relative py-4 px-8 rounded-full border border-white/20 hover:border-cyan-400/40 bg-neutral-950 overflow-hidden group text-white active:scale-95 transition-all duration-200 shadow-[0_0_25px_rgba(0,245,255,0.15)] hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] cursor-pointer ${className}`}
      {...props}
    >
      <div className="absolute inset-0 z-0 opacity-85 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <LiquidChrome
          baseColor={[
            0.0392156862745098, 0.0392156862745098, 0.0392156862745098,
          ]}
          speed={2}
          amplitude={0.1}
          interactive={false}
          useDnaPalette={true}
        />
      </div>
      <span className="relative z-10 mix-blend-difference font-bold tracking-wide flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

export default ChromeButton;
