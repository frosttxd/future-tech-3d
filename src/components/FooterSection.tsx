import StrokeText from "@/components/ui/stroke-text";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function FooterSection() {
  return (
    <footer id="footer" className="relative w-full bg-[#020306] py-20 sm:py-28 md:py-36 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[450px] bg-gradient-to-t from-cyan-950/25 via-blue-950/15 to-transparent blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-center items-center">
        {/* Massive Aceternity Hover Border Gradient Frame Centerpiece */}
        <HoverBorderGradient
          as="div"
          containerClassName="w-full max-w-5xl xl:max-w-6xl rounded-3xl sm:rounded-[36px] md:rounded-[44px] p-[2px] border border-white/10 shadow-[0_0_60px_-15px_rgba(0,245,255,0.18)] hover:shadow-[0_0_90px_-10px_rgba(0,245,255,0.4)] transition-all duration-700"
          className="w-full py-16 sm:py-24 md:py-28 px-6 sm:px-12 md:px-16 bg-[#020306]/90 backdrop-blur-3xl rounded-3xl sm:rounded-[36px] md:rounded-[44px] flex items-center justify-center relative overflow-hidden group cursor-pointer"
          duration={1.4}
          glowColor="#00f5ff"
        >
          {/* Subtle inner radial depth light */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,245,255,0.06),transparent)] pointer-events-none" />

          {/* Centerpiece Text */}
          <div className="w-full text-center select-none py-2 relative z-10">
            <StrokeText
              text="THE TECHNOLOGY OF THE FUTURE"
              strokeColor="rgba(255, 255, 255, 0.3)"
              strokeWidth={1.4}
              fillColor="transparent"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-center transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(0,245,255,0.4)]"
            />
          </div>
        </HoverBorderGradient>
      </div>
    </footer>
  );
}

export default FooterSection;
