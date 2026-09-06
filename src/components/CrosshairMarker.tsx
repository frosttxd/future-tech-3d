import { motion, type Variants } from 'framer-motion';
import { usePreloader } from '../context/PreloaderContext';

export const CrosshairMarker = () => {

  const { isPreloader } = usePreloader();

  const variants: Variants = {
    hidden: { y: '0%', opacity: 0 },
    visible: (customIndex: number) => ({
      y: customIndex ? '500%' : '-500%',
      opacity: 1,
      transition: {
        duration: 5,
        opacity: { duration: 1, delay: 2 },
        y: { ease: 'circOut', duration: 1, delay: 3 },
      },
    }),
  };

  return (
    <>
      {[0, 1].map((sideIndex) => (
        <div
          key={sideIndex}
          className={`w-[30px] h-[30px] absolute ${
            sideIndex ? 'left-0' : 'right-0'
          } flex items-center justify-center pointer-events-none z-10`}
        >
          {[0, 1].map((itemIndex) => (
            <motion.svg
              key={itemIndex}
              custom={itemIndex}
              variants={variants}
              initial={isPreloader ? 'hidden' : 'visible'}
              animate="visible"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0"
            >
              <path d="M14.5 0H15.5V30H14.5V0Z" fill="#FDFCF4" />
              <path d="M30 14.5V15.5L0 15.5L4.37103e-08 14.5L30 14.5Z" fill="#FDFCF4" />
            </motion.svg>
          ))}
        </div>
      ))}
    </>
  );
};
