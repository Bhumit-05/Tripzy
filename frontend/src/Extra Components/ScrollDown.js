import React, { useState, useEffect } from 'react';

const ScrollDown = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (Math.abs(currentScrollY - lastScrollY) > 5) {
      setShowIndicator(currentScrollY < 100);
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    
    let ticking = false;
    
    const throttledScrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler);
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [lastScrollY]);

  return (
    <div className="relative w-full">
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className={`flex flex-col items-center space-y-2 transition-opacity duration-300 ${
          isMounted && showIndicator ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="animate-bounce md:w-20 md:h-20 w-12 h-12 mb-16 flex items-center justify-center border border-black rounded-full">
            <svg
              className="md:w-12 md:h-12 w-7 h-7 text-gray-600 animate-pulse"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollDown;