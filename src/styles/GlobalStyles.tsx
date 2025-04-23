import { createGlobalStyle } from 'styled-components';
import { breakpoints } from '../context/ResponsiveContext';

// Extend breakpoints for larger screens
const extendedBreakpoints = {
  ...breakpoints,
  desktop: 1366,
  large: 1680,
  xlarge: 1920,
  ultrawide: 2560
};

// Global styles for the application using styled-components
const GlobalStyles = createGlobalStyle`
  /* Import the CSS files */
  @import url('./global.css');
  @import url('./responsive.css');

  /* Define additional responsive styles that rely on the context */
  :root {
    --sidebar-width-mobile: 50px;
    --sidebar-width-ipad-portrait: 60px;
    --sidebar-width-ipad: 70px;
    --sidebar-width-desktop: 80px;
    --sidebar-width-large: 90px;
    --font-size-small: 0.85rem;
    --font-size-medium: 0.9rem;
    --font-size-large: 1rem;
    --font-size-xlarge: 1.1rem;
  }

  /* Mobile styles */
  @media (max-width: ${breakpoints.mobile}px) {
    body {
      font-size: var(--font-size-small);
    }

    button, input, select, textarea {
      font-size: var(--font-size-small);
    }

    .mobile-only {
      display: block;
    }

    .desktop-only, .ipad-only, .large-only, .xlarge-only {
      display: none;
    }
  }

  /* iPad styles */
  @media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.ipad}px) {
    body {
      font-size: var(--font-size-medium);
    }

    button, input, select, textarea {
      font-size: var(--font-size-medium);
    }

    .ipad-only {
      display: block;
    }

    .desktop-only, .mobile-only, .large-only, .xlarge-only {
      display: none;
    }
  }

  /* Desktop styles (1024px - 1366px) */
  @media (min-width: ${breakpoints.ipad}px) and (max-width: ${extendedBreakpoints.desktop}px) {
    body {
      font-size: var(--font-size-large);
    }

    button, input, select, textarea {
      font-size: var(--font-size-large);
    }

    .desktop-only {
      display: block;
    }

    .ipad-only, .mobile-only, .large-only, .xlarge-only {
      display: none;
    }
  }

  /* Large desktop styles (1366px - 1680px) */
  @media (min-width: ${extendedBreakpoints.desktop}px) and (max-width: ${extendedBreakpoints.large}px) {
    body {
      font-size: var(--font-size-large);
    }

    .large-only {
      display: block;
    }

    .desktop-only, .ipad-only, .mobile-only, .xlarge-only {
      display: none;
    }
  }

  /* Extra large desktop styles (1680px - 1920px) */
  @media (min-width: ${extendedBreakpoints.large}px) and (max-width: ${extendedBreakpoints.xlarge}px) {
    body {
      font-size: var(--font-size-xlarge);
    }

    .xlarge-only {
      display: block;
    }

    .desktop-only, .ipad-only, .mobile-only, .large-only {
      display: none;
    }
  }

  /* Ultra wide screens (1920px+) */
  @media (min-width: ${extendedBreakpoints.xlarge}px) {
    body {
      font-size: var(--font-size-xlarge);
    }

    .ultrawide-only {
      display: block;
    }

    .desktop-only, .ipad-only, .mobile-only, .large-only, .xlarge-only {
      display: none;
    }
    
    /* Ensure content doesn't stretch too wide on ultrawide screens */
    .content-container {
      max-width: 1800px;
      margin: 0 auto;
    }
  }

  /* iPad portrait specific styles */
  @media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.ipad}px) and (orientation: portrait) {
    .portrait-only {
      display: block;
    }

    .landscape-only {
      display: none;
    }

    .flex-container {
      flex-direction: column;
    }
  }

  /* iPad landscape specific styles */
  @media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.ipad}px) and (orientation: landscape) {
    .landscape-only {
      display: block;
    }

    .portrait-only {
      display: none;
    }

    .flex-container {
      flex-direction: row;
    }
  }

  /* Aspect ratio based styles for wider screens */
  @media (min-aspect-ratio: 16/9) {
    .wide-aspect-only {
      display: block;
    }
    
    /* For ultra-wide screens, consider using a centered layout */
    body.wide-layout .content-wrap {
      max-width: 1600px;
      margin: 0 auto;
    }
  }

  /* Aspect ratio based styles for taller screens */
  @media (max-aspect-ratio: 3/2) {
    .tall-aspect-only {
      display: block;
    }
    
    .wide-aspect-only {
      display: none;
    }
  }

  /* Multi-column layout for extra large screens */
  @media (min-width: ${extendedBreakpoints.large}px) {
    .multi-column-large {
      column-count: 2;
      column-gap: 40px;
    }
  }

  @media (min-width: ${extendedBreakpoints.xlarge}px) {
    .multi-column-xlarge {
      column-count: 3;
      column-gap: 48px;
    }
  }

  /* Utility classes for responsive layouts */
  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .align-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .space-between {
    justify-content: space-between;
  }

  .full-width {
    width: 100%;
  }

  .text-center {
    text-align: center;
  }

  /* Grid layouts for different screen sizes */
  .responsive-grid-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    
    @media (min-width: ${breakpoints.mobile}px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    
    @media (min-width: ${breakpoints.ipad}px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    
    @media (min-width: ${extendedBreakpoints.desktop}px) {
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
    }
    
    @media (min-width: ${extendedBreakpoints.large}px) {
      grid-template-columns: repeat(5, 1fr);
      gap: 36px;
    }
    
    @media (min-width: ${extendedBreakpoints.xlarge}px) {
      grid-template-columns: repeat(6, 1fr);
      gap: 40px;
    }
  }

  /* Adaptive padding based on device */
  .padding-responsive {
    padding: 24px;

    @media (max-width: ${breakpoints.ipad}px) {
      padding: 20px;
    }

    @media (max-width: ${breakpoints.mobile}px) {
      padding: 16px;
    }

    @media (min-width: ${extendedBreakpoints.desktop}px) {
      padding: 30px;
    }

    @media (min-width: ${extendedBreakpoints.xlarge}px) {
      padding: 36px;
    }
  }

  /* Adaptive margins based on device */
  .margin-responsive {
    margin: 24px;

    @media (max-width: ${breakpoints.ipad}px) {
      margin: 20px;
    }

    @media (max-width: ${breakpoints.mobile}px) {
      margin: 16px;
    }

    @media (min-width: ${extendedBreakpoints.desktop}px) {
      margin: 32px;
    }

    @media (min-width: ${extendedBreakpoints.xlarge}px) {
      margin: 40px;
    }
  }

  /* Hide scrollbars but keep functionality */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }

  /* Responsive card grid with adjustments for various screen sizes */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;

    @media (max-width: ${breakpoints.ipad}px) {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 20px;
    }

    @media (max-width: ${breakpoints.mobile}px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }

    @media (min-width: ${extendedBreakpoints.desktop}px) {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 32px;
    }

    @media (min-width: ${extendedBreakpoints.large}px) {
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 36px;
    }

    @media (min-width: ${extendedBreakpoints.xlarge}px) {
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 40px;
    }
  }
  
  /* Fixed width containers for different screen sizes */
  .container {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    margin-left: auto;
    margin-right: auto;
    
    @media (min-width: ${breakpoints.mobile}px) {
      max-width: 720px;
    }
    
    @media (min-width: ${breakpoints.ipad}px) {
      max-width: 960px;
      padding-left: 24px;
      padding-right: 24px;
    }
    
    @media (min-width: ${extendedBreakpoints.desktop}px) {
      max-width: 1200px;
    }
    
    @media (min-width: ${extendedBreakpoints.large}px) {
      max-width: 1400px;
    }
    
    @media (min-width: ${extendedBreakpoints.xlarge}px) {
      max-width: 1600px;
    }
    
    @media (min-width: ${extendedBreakpoints.ultrawide}px) {
      max-width: 1800px;
    }
  }
`;

export default GlobalStyles; 