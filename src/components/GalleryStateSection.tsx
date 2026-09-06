import ParticleText from "@/components/ui/particle-text";
import ArcFlowCarousel, { type SmoothSliderItem } from "@/components/ui/arc-flow-carousel";

const base = import.meta.env.BASE_URL.endsWith('/') 
  ? import.meta.env.BASE_URL 
  : `${import.meta.env.BASE_URL}/`;

const CAROUSEL_ITEMS: SmoothSliderItem[] = [
  {
    src: `${base}images/carousel/pillars_of_creation.jpg`,
    alt: "Pillars of Creation",
    title: "Pillars of Creation",
    description: "James Webb NIRCam cosmic star-forming pillars in the Eagle Nebula.",
  },
  {
    src: `${base}images/carousel/tarantula_nebula.jpg`,
    alt: "Tarantula Nebula",
    title: "Tarantula Nebula",
    description: "Infrared stellar nursery spanning thousands of light-years across space.",
  },
  {
    src: `${base}images/carousel/quantum_waves.jpg`,
    alt: "Quantum Waves",
    title: "Quantum Waves",
    description: "Pure 3D procedural parametric wave dynamics in deep cobalt blue.",
  },
  {
    src: `${base}images/carousel/deep_field.jpg`,
    alt: "Cosmic Deep Field",
    title: "Cosmic Deep Field",
    description: "Gravitational lensing revealing thousands of ancient celestial galaxies.",
  },
  {
    src: `${base}images/carousel/fluid_horizon.jpg`,
    alt: "Fluid Horizon",
    title: "Fluid Horizon",
    description: "Minimalist dark iridescent chromatic curvature and abstract light flow.",
  },
  {
    src: `${base}images/carousel/jupiter_aurora.jpg`,
    alt: "Jovian Atmosphere",
    title: "Jovian Atmosphere",
    description: "Spectroscopic thermal infrared auroras dancing across planetary poles.",
  },
  {
    src: `${base}images/carousel/andromeda_galaxy.jpg`,
    alt: "Andromeda Spiral",
    title: "Andromeda Spiral",
    description: "Interstellar dust lanes and core galactic luminescence across the local group.",
  },
  {
    src: `${base}images/carousel/starry_milkyway.jpg`,
    alt: "Stellar Expanse",
    title: "Stellar Expanse",
    description: "Deep cosmos observational field capturing millions of distant stars.",
  },
];

const WAVY_BACKGROUND_PALETTE = [
  "#00f5ff", // Ultra Hyper-Cyan (Neon Laser)
  "#06b6d4", // Electric Radiant Turquoise
  "#2563eb", // Vibrant Royal Cobalt
  "#a855f7", // Holographic Bioluminescent Violet
  "#ec4899", // Neon Prism Magenta Highlight
  "#ffffff", // Blazing Pure Starlight Core
];

export function GalleryStateSection() {
  return (
    <section id="gallery-showcase" className="relative w-full py-24 bg-[#020306] overflow-hidden isolate z-0">
      {/* Header Container with Interactive Particle Text */}
      <div className="w-full max-w-7xl mx-auto px-4 -my-8 relative z-10">
        <ParticleText
          text="THE STATE OF THE GALLERY"
          particleSize={2.2}
          density={4}
          colors={WAVY_BACKGROUND_PALETTE}
          highlightColor="#00f5ff"
          scatter={190}
          gatherDuration={1600}
          stagger={420}
          pointerRepel={42}
          repelRadius={120}
          idleDrift={0.8}
          trigger="both"
          fontSize="clamp(2.5rem, 6.5vw, 5.5rem)"
          fontWeight={900}
          fontFamily="'Plus Jakarta Sans', sans-serif"
          glow
          height={360}
          className="mx-auto"
        />
      </div>

      {/* 3D Kinetic Arc Flow Carousel */}
      <div className="relative w-full h-[720px] overflow-hidden">
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
          wheelControl="off"
          autoRotateSpeed={0.08}
          pauseOnHover={false}
          surfaceColor="#020306"
        />
      </div>
    </section>
  );
}

export default GalleryStateSection;
