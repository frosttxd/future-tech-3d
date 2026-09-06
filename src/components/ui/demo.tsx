"use client";

import ArcFlowCarousel from "@/components/ui/arc-flow-carousel";

export default function ArcFlowCarouselDemo() {
  return (
    <div className="w-full">
      <ArcFlowCarousel
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
        autoRotateSpeed={0.12}
        pauseOnHover
        surfaceColor="#000000"
      />
    </div>
  );
}
