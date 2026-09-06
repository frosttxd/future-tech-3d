import React from 'react';
import { WavyBackground } from './ui/wavy-background';
import { GooeyText } from './ui/gooey-text-morphing';
import { ChromeButton } from './ui/chrome-button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface HeroSectionProps {
  onExplore?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  const handleButtonClick = () => {
    if (onExplore) {
      onExplore();
    } else {
      const target = document.querySelector('#gallery-showcase');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div id="hero" className="relative w-full">
      <WavyBackground
        className="max-w-6xl mx-auto flex flex-col items-center justify-center px-4"
        containerClassName="bg-[#020306]"
        colors={[
          "#00f5ff", // Ultra Hyper-Cyan (Neon Laser)
          "#2563eb", // Vibrant Royal Cobalt
          "#a855f7", // Holographic Bioluminescent Violet
          "#06b6d4", // Electric Radiant Turquoise
          "#ec4899", // Neon Prism Magenta Highlight
          "#ffffff", // Blazing Pure Starlight Core
        ]}
        waveWidth={42}
        blur={10}
        speed="fast"
        waveOpacity={0.72}
      >
        <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center select-none pointer-events-none">
          <GooeyText
            texts={[
              "The Technology",
              "of the Future",
              "The Technology of the Future",
            ]}
            morphTime={1.1}
            cooldownTime={1.8}
            entranceDelay={0.8}
            entranceDuration={1.4}
            className="w-full"
            textClassName="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase text-center"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.0, ease: "easeOut" }}
          className="mt-8 sm:mt-12 md:mt-16 flex items-center justify-center relative z-30"
        >
          <ChromeButton
            onClick={handleButtonClick}
            className="px-8 sm:px-12 md:px-14 py-4 sm:py-5 text-base sm:text-lg md:text-xl"
          >
            <span className="flex items-center gap-3">
              Get Started
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
          </ChromeButton>
        </motion.div>
        </div>
      </WavyBackground>
    </div>
  );
};

export default HeroSection;



