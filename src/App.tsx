import { GooeyNav } from "@/components/ui/gooey-nav";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { HeroSection } from "@/components/HeroSection";
import { GalleryStateSection } from "@/components/GalleryStateSection";
import { FooterSection } from "@/components/FooterSection";

export function App() {
  const scrollToGallery = () => {
    const target = document.querySelector("#gallery-showcase");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#020306] text-[#FDFCF4] relative font-sans selection:bg-[#00f5ff]/20 selection:text-[#00f5ff] overflow-x-hidden">
      {/* Floating Interactive Gooey Glass Navigation (Items 6 & 23) - Nestled in Head Tracing Beam */}
      <GooeyNav />

      {/* Notched progress tracing beam at the head of the page */}
      <TracingBeam className="w-full">
        {/* Hero Section with Wavy Background, Morphing Typography & DNA Chrome Button */}
        <HeroSection onExplore={scrollToGallery} />

        {/* Centerpiece: The State of the Gallery (Item 8) with Interactive Particle Text & Arc Flow Carousel */}
        <GalleryStateSection />

        {/* Technical Architectural Footer (Items 21 & 22) */}
        <FooterSection />
      </TracingBeam>
    </div>
  );
}

export default App;
