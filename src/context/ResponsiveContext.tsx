import React, { createContext, useContext, useEffect, useState } from 'react';

// Export breakpoints for use in styled-components
export const breakpoints = {
  mobile: 768,
  ipad: 1024,
  desktop: 1366,
  large: 1680,
  xlarge: 1920,
  ultrawide: 2560
};

interface ResponsiveContextType {
  isMobile: boolean;
  isIpad: boolean;
  isIpadPortrait: boolean;
  isIpadLandscape: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isXLargeDesktop: boolean;
  isUltrawide: boolean;
  isWideScreen: boolean; // 16:9 or wider aspect ratio
  isTallScreen: boolean; // taller than 16:9 aspect ratio
  isSupported: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextType>({
  isMobile: false,
  isIpad: false,
  isIpadPortrait: false,
  isIpadLandscape: false,
  isDesktop: true,
  isLargeDesktop: false,
  isXLargeDesktop: false,
  isUltrawide: false,
  isWideScreen: false,
  isTallScreen: false,
  isSupported: true
});

export const useResponsive = () => useContext(ResponsiveContext);

export const ResponsiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoints.mobile);
  const [isIpad, setIsIpad] = useState(
    window.innerWidth >= breakpoints.mobile && 
    window.innerWidth < breakpoints.ipad
  );
  const [isIpadPortrait, setIsIpadPortrait] = useState(
    window.innerWidth >= breakpoints.mobile && 
    window.innerWidth < breakpoints.ipad && 
    window.innerHeight > window.innerWidth
  );
  const [isIpadLandscape, setIsIpadLandscape] = useState(
    window.innerWidth >= breakpoints.mobile && 
    window.innerWidth < breakpoints.ipad && 
    window.innerHeight <= window.innerWidth
  );
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= breakpoints.ipad && 
    window.innerWidth < breakpoints.desktop
  );
  const [isLargeDesktop, setIsLargeDesktop] = useState(
    window.innerWidth >= breakpoints.desktop && 
    window.innerWidth < breakpoints.large
  );
  const [isXLargeDesktop, setIsXLargeDesktop] = useState(
    window.innerWidth >= breakpoints.large && 
    window.innerWidth < breakpoints.xlarge
  );
  const [isUltrawide, setIsUltrawide] = useState(
    window.innerWidth >= breakpoints.xlarge
  );
  const [isWideScreen, setIsWideScreen] = useState(
    window.innerWidth / window.innerHeight >= 16/9
  );
  const [isTallScreen, setIsTallScreen] = useState(
    window.innerWidth / window.innerHeight < 16/9
  );
  // Device is supported if it's an iPad or larger screen
  const [isSupported, setIsSupported] = useState(window.innerWidth >= breakpoints.mobile);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;
      
      // Mobile detection
      setIsMobile(width < breakpoints.mobile);
      
      // iPad detection
      const isIpadSize = width >= breakpoints.mobile && width < breakpoints.ipad;
      setIsIpad(isIpadSize);
      setIsIpadPortrait(isIpadSize && height > width);
      setIsIpadLandscape(isIpadSize && height <= width);
      
      // Desktop and larger screen detections
      setIsDesktop(width >= breakpoints.ipad && width < breakpoints.desktop);
      setIsLargeDesktop(width >= breakpoints.desktop && width < breakpoints.large);
      setIsXLargeDesktop(width >= breakpoints.large && width < breakpoints.xlarge);
      setIsUltrawide(width >= breakpoints.xlarge);
      
      // Aspect ratio detection
      setIsWideScreen(aspectRatio >= 16/9);
      setIsTallScreen(aspectRatio < 16/9);
      
      // Support detection
      setIsSupported(width >= breakpoints.mobile); // iPad and larger are supported
    };

    // Initialize on first load
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={{ 
      isMobile, 
      isIpad, 
      isIpadPortrait, 
      isIpadLandscape, 
      isDesktop, 
      isLargeDesktop,
      isXLargeDesktop,
      isUltrawide,
      isWideScreen,
      isTallScreen,
      isSupported 
    }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

// HOC to restrict access on unsupported devices
export const withResponsiveSupport = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { isSupported } = useResponsive();
    
    if (!isSupported) {
      return (
        <div className="unsupported-device">
          <h1>Device Not Supported</h1>
          <p>This application is designed for tablets and larger screens.</p>
          <p>Please access this application on a supported device.</p>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}; 