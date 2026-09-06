import StrokeText from "@/components/ui/stroke-text";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { CardContainer, CardBody, CardItem } from "@/components/ui/three-d-card";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { Shield, Sparkles, Cpu } from "lucide-react";

export function BentoSection() {
  return (
    <section id="bento-section" className="relative w-full py-28 bg-[#020306] overflow-hidden border-t border-white/10">
      {/* Background radial highlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-purple-950/60 border border-purple-500/30 text-purple-300">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              02 // ARCHITECTURE & TELEMETRY
            </span>
            <span className="text-white/40 font-mono text-xs">|</span>
            <span className="text-white/50 font-mono text-xs tracking-wider">ACETERNITY + REACT BITS</span>
          </div>

          <StrokeText
            text="CORE TELEMETRY"
            strokeColor="rgba(255, 255, 255, 0.4)"
            strokeWidth={1.5}
            fillColor="transparent"
            className="text-3xl sm:text-5xl md:text-6xl font-black mb-4"
          />

          <p className="max-w-2xl text-white/70 text-base sm:text-lg leading-relaxed font-light">
            Interactive cryptographic matrix, multi-layer depth perspective, and canvas shader computation.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Evervault Card (Item 18) */}
          <div className="rounded-3xl border border-white/10 bg-[#03050a]/90 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">01 // CIPHER MATRIX</span>
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="w-full flex-1 flex items-center justify-center my-4 min-h-[260px]">
              <EvervaultCard text="QUANTUM" />
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-1">Cryptographic Mask</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Hover to dynamically reveal mathematical string matrices under a radial coordinate mask.
              </p>
            </div>
          </div>

          {/* Card 2: 3D Card Effect (Item 17) */}
          <div className="rounded-3xl border border-white/10 bg-[#03050a]/90 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono tracking-widest uppercase text-purple-400">02 // 3D PERSPECTIVE</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>

            <CardContainer className="w-full flex-1" containerClassName="py-2">
              <CardBody className="w-full h-auto flex flex-col justify-between">
                <CardItem translateZ="50" className="text-lg font-bold text-white">
                  Infrared Deep Field
                </CardItem>
                <CardItem translateZ="60" as="p" className="text-white/60 text-xs mt-1 mb-4">
                  Multi-band NIRCam spectroscopic capture with 3D coordinate tilt.
                </CardItem>
                <CardItem translateZ="90" className="w-full">
                  <img
                    src="/images/carousel/pillars_of_creation.jpg"
                    alt="Pillars of Creation"
                    className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl border border-white/10"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>

            <div className="mt-4 pt-4 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-1">Spatial Projection</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Interactive real-time card rotation calculated from cursor distance to center.
              </p>
            </div>
          </div>

          {/* Card 3: Canvas Reveal Effect (Item 11) */}
          <div className="rounded-3xl border border-white/10 bg-[#03050a]/90 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono tracking-widest uppercase text-emerald-400">03 // DOT MATRIX</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="w-full flex-1 relative rounded-2xl overflow-hidden min-h-[260px] border border-white/5 bg-black">
              <CanvasRevealEffect
                animationSpeed={0.5}
                colors={[[0, 245, 255], [168, 85, 247]]}
                dotSize={2.5}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-20">
                <div className="w-12 h-12 rounded-full border border-white/20 bg-black/60 flex items-center justify-center mb-3 backdrop-blur-md">
                  <Cpu className="w-6 h-6 text-[#00f5ff]" />
                </div>
                <span className="text-white font-mono text-sm font-semibold tracking-wider">PROCEDURAL FIELD</span>
                <span className="text-white/50 font-mono text-xs mt-1">2.4M Particle Cycles/s</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-1">Canvas Reveal</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Dynamic sinusoidal particle field simulating harmonic wave interference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BentoSection;
