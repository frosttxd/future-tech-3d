import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { usePreloader } from '../context/PreloaderContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isPreloader, setIsPreloader } = usePreloader();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const variants: { companies: Variants; navbar: Variants } = {
    companies: {
      hidden: {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
      },
      visible: {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        transition: { delay: 5, duration: 0.6, ease: 'easeInOut' },
      },
      scroll: {
        opacity: isScrolled ? 0 : 1,
        transition: { duration: 0.2 },
      },
    },
    navbar: {
      hidden: { y: '-200%' },
      visible: {
        y: '0%',
        transition: { delay: 4, duration: 0.5, ease: 'circOut' },
      },
      scroll: {
        y: isScrolled ? '-10%' : '0%',
        transition: { ease: 'circOut', duration: 0.2 },
      },
    },
  };

  return (
    <header
      className={`${
        isPreloader ? 'pointer-events-none' : 'pointer-events-auto'
      } bg-transparent w-full max-w-6xl pb-0 p-5 flex flex-col fixed top-0 z-50 transition-colors duration-200 lg:gap-4 left-1/2 -translate-x-1/2`}
    >
      {/* Top partner ticker / subbar with mask reveal */}
      <motion.div
        className="w-fit overflow-hidden max-sm:hidden"
        style={{
          maskImage: 'linear-gradient(to right, black, black)',
          WebkitMaskImage: 'linear-gradient(to right, black, black)',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
        variants={variants.companies}
        initial={isPreloader ? 'hidden' : 'visible'}
        animate={isPreloader ? 'visible' : 'scroll'}
        onAnimationComplete={() => setIsPreloader(false)}
      >
        <div className="flex items-center gap-6 text-xs text-[#FDFCF4]/60 font-mono tracking-tight">
          <span className="hover:text-[#FDFCF4] transition-opacity cursor-pointer">STUDIO</span>
          <div className="w-px h-4 bg-white/20"></div>
          <span className="hover:text-[#FDFCF4] transition-opacity cursor-pointer">PLATFORMS</span>
          <div className="w-px h-4 bg-white/20"></div>
          <span className="hover:text-[#FDFCF4] transition-opacity cursor-pointer">CREATORS</span>
        </div>
      </motion.div>

      {/* Main Navbar sliding down at t=4s */}
      <motion.div
        variants={variants.navbar}
        initial={isPreloader ? 'hidden' : 'visible'}
        animate={isPreloader ? 'visible' : 'scroll'}
        className="w-full"
      >
        <nav className="w-full mx-auto rounded-xl flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-7 h-7 rounded-md bg-[#FDFCF4] text-black font-mono font-bold text-xs flex items-center justify-center">
              M
            </div>
            <span className="font-sans font-bold tracking-tight text-base text-[#FDFCF4]">
              MOONSWORTH
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-mono text-sm text-[#FDFCF4]/70">
            <span className="hover:text-[#FDFCF4] transition-colors cursor-pointer">Home</span>
            <span className="hover:text-[#FDFCF4] transition-colors cursor-pointer">About</span>
            <span className="hover:text-[#FDFCF4] transition-colors cursor-pointer">Projects</span>
          </div>

          <button className="bg-[#FDFCF4] text-black font-mono text-xs px-6 py-2.5 rounded-lg font-medium hover:bg-white/90 transition-all cursor-pointer">
            Contact
          </button>
        </nav>
      </motion.div>
    </header>
  );
};
