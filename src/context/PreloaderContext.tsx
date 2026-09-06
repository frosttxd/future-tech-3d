import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface PreloaderContextType {
  isPreloader: boolean;
  setIsPreloader: (value: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isPreloader: true,
  setIsPreloader: () => null,
});

export const PreloaderProvider = ({ children }: { children: ReactNode }) => {

  const [isPreloader, setIsPreloader] = useState(true);

  useEffect(() => {
    // Lock scroll during preloader
    if (isPreloader) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPreloader]);

  return (
    <PreloaderContext.Provider value={{ isPreloader, setIsPreloader }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);
