import { ArrowLeft } from "lucide-react";
import ArcFlowCarousel, { type SmoothSliderItem } from "@/components/ui/arc-flow-carousel";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface CarouselSectionProps {
  onBack?: () => void;
}

const CAROUSEL_ITEMS: SmoothSliderItem[] = [
  {
    src: "/images/carousel/pillars_of_creation.jpg",
    alt: "Pillars of Creation",
    title: "Pillars of Creation",
    description: "James Webb NIRCam cosmic star-forming pillars in the Eagle Nebula.",
  },
  {
    src: "/images/carousel/tarantula_nebula.jpg",
    alt: "Tarantula Nebula",
    title: "Tarantula Nebula",
    description: "Infrared stellar nursery spanning thousands of light-years across space.",
  },
  {
    src: "/images/carousel/quantum_waves.jpg",
    alt: "Quantum Waves",
    title: "Quantum Waves",
    description: "Pure 3D procedural parametric wave dynamics in deep cobalt blue.",
  },
  {
    src: "/images/carousel/deep_field.jpg",
    alt: "Cosmic Deep Field",
    title: "Cosmic Deep Field",
    description: "Gravitational lensing revealing thousands of ancient celestial galaxies.",
  },
  {
    src: "/images/carousel/fluid_horizon.jpg",
    alt: "Fluid Horizon",
    title: "Fluid Horizon",
    description: "Minimalist dark iridescent chromatic curvature and abstract light flow.",
  },
  {
    src: "/images/carousel/jupiter_aurora.jpg",
    alt: "Jovian Atmosphere",
    title: "Jovian Atmosphere",
    description: "Spectroscopic thermal infrared auroras dancing across planetary poles.",
  },
  {
    src: "/images/carousel/andromeda_galaxy.jpg",
    alt: "Andromeda Spiral",
    title: "Andromeda Spiral",
    description: "Interstellar dust lanes and core galactic luminescence across the local group.",
  },
  {
    src: "/images/carousel/starry_milkyway.jpg",
    alt: "Stellar Expanse",
    title: "Stellar Expanse",
    description: "Deep cosmos observational field capturing millions of distant stars.",
  },
];

export function CarouselSection({ onBack }: CarouselSectionProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020306]">
      {/* Top Left Navigation Header */}
      {onBack && (
        <header className="absolute top-6 left-6 z-50">
          <HoverBorderGradient
            containerClassName="rounded-full shadow-[0_0_25px_rgba(0,0,0,0.8)]"
            as="button"
            onClick={onBack}
            className="bg-[#020306] text-white flex items-center space-x-2 px-6 py-2.5 cursor-pointer font-sans group"
          >
            <ArrowLeft className="w-4 h-4 text-white transition-transform duration-200 group-hover:-translate-x-1 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
            <span className="font-medium tracking-wide text-sm">Back to Home</span>
          </HoverBorderGradient>
        </header>
      )}

      {/* Arc Flow 3D GSAP Carousel */}
      <ArcFlowCarousel
        items={CAROUSEL_ITEMS}
        radiusRatio={0.85}
        cardRatio={0.21}
        maxCardWidth={320}
        cardAspect={0.62}
        overlap={-0.04}
        arcOffset={0.5}
        smoothing={5.5}
        dragSensitivity={1.2}
        momentum={1}
        snap={false}
        wheelControl="horizontal"
        autoRotateSpeed={0.08}
        pauseOnHover={false}
        surfaceColor="#020306"
      />
    </div>
  );
}

export default CarouselSection;
