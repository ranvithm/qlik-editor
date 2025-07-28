/**
 * Design System for Qlik Script Editor
 * 
 * Centralized design tokens and utility classes
 */

// ============================
// DESIGN TOKENS
// ============================

export const designTokens = {
  // Color Palette - Qlik-inspired dark theme
  colors: {
    // Background colors
    bg: {
      primary: 'bg-gray-900',        // Main background
      secondary: 'bg-gray-800',      // Secondary panels
      tertiary: 'bg-gray-700',       // Elevated elements
      surface: 'bg-white dark:bg-gray-800', // Card surfaces
      editor: 'bg-gray-900',         // Editor background
    },
    
    // Text colors
    text: {
      primary: 'text-white',         // Primary text
      secondary: 'text-gray-300',    // Secondary text
      muted: 'text-gray-400',        // Muted text
      inverse: 'text-gray-900 dark:text-white', // Adaptive text
    },
    
    // Border colors
    border: {
      primary: 'border-gray-700',    // Main borders
      secondary: 'border-gray-600',  // Secondary borders
      accent: 'border-blue-500',     // Accent borders
      adaptive: 'border-gray-200 dark:border-gray-700', // Adaptive borders
    },
    
    // Interactive colors
    interactive: {
      primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600',
      danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    }
  },
  
  // Spacing Scale
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
  },
  
  // Layout
  layout: {
    maxWidth: 'max-w-7xl',
    container: 'mx-auto px-4 sm:px-6 lg:px-8',
    section: 'py-4 sm:py-6',
  },
  
  // Typography
  typography: {
    heading: {
      primary: 'text-xl font-semibold sm:text-2xl',
      secondary: 'text-lg font-medium sm:text-xl',
      tertiary: 'text-base font-medium',
    },
    body: {
      primary: 'text-sm',
      secondary: 'text-xs',
      code: 'font-mono text-sm',
    }
  },
  
  // Transitions
  transitions: {
    fast: 'transition-all duration-150 ease-in-out',
    normal: 'transition-all duration-200 ease-in-out',
    slow: 'transition-all duration-300 ease-in-out',
  },
  
  // Shadows
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    interactive: 'shadow-sm hover:shadow-md',
  },
  
  // Border Radius
  radius: {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  }
} as const;

// ============================
// COMPONENT VARIANTS
// ============================

export const componentVariants = {
  // Button variants
  button: {
    primary: `
      inline-flex items-center justify-center
      px-4 py-2 
      ${designTokens.colors.interactive.primary}
      ${designTokens.colors.text.primary}
      ${designTokens.radius.md}
      ${designTokens.typography.body.primary} font-medium
      ${designTokens.transitions.normal}
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-95
    `,
    
    secondary: `
      inline-flex items-center justify-center
      px-4 py-2 
      ${designTokens.colors.interactive.secondary}
      ${designTokens.colors.text.inverse}
      ${designTokens.colors.border.adaptive} border
      ${designTokens.radius.md}
      ${designTokens.typography.body.primary} font-medium
      ${designTokens.transitions.normal}
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-95
    `,
    
    ghost: `
      inline-flex items-center justify-center
      px-3 py-2 
      ${designTokens.colors.text.secondary}
      hover:bg-gray-100 dark:hover:bg-gray-800
      ${designTokens.radius.md}
      ${designTokens.typography.body.primary} font-medium
      ${designTokens.transitions.normal}
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    `,
  },
  
  // Panel variants
  panel: {
    primary: `
      ${designTokens.colors.bg.secondary}
      ${designTokens.colors.border.primary} border
      ${designTokens.radius.lg}
      ${designTokens.shadows.sm}
    `,
    
    elevated: `
      ${designTokens.colors.bg.surface}
      ${designTokens.colors.border.adaptive} border
      ${designTokens.radius.lg}
      ${designTokens.shadows.interactive}
      ${designTokens.transitions.normal}
    `,
    
    editor: `
      ${designTokens.colors.bg.editor}
      ${designTokens.colors.border.primary} border
      ${designTokens.radius.lg}
      overflow-hidden
      ${designTokens.shadows.md}
      hover:border-blue-500/50
      ${designTokens.transitions.normal}
    `,
  },
  
  // Badge variants
  badge: {
    default: `
      inline-flex items-center
      px-2.5 py-0.5
      ${designTokens.radius.full}
      ${designTokens.typography.body.secondary} font-medium
      bg-gray-100 text-gray-800
      dark:bg-gray-800 dark:text-gray-200
    `,
    
    accent: `
      inline-flex items-center
      px-2.5 py-0.5
      ${designTokens.radius.full}
      ${designTokens.typography.body.secondary} font-medium
      bg-blue-100 text-blue-800
      dark:bg-blue-900 dark:text-blue-200
    `,
  }
};

// ============================
// RESPONSIVE BREAKPOINTS
// ============================

export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================
// ACCESSIBILITY HELPERS
// ============================

export const a11y = {
  // Screen reader only text
  srOnly: 'sr-only',
  
  // Focus styles
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
  
  // Skip link
  skipLink: `
    absolute -top-10 left-4 z-50
    px-4 py-2 
    bg-blue-600 text-white
    rounded-md
    focus:top-4
    transition-all duration-150
  `,
  
  // High contrast mode support
  highContrast: 'contrast-more:border-black contrast-more:text-black',
} as const;

// ============================
// UTILITY FUNCTIONS
// ============================

/**
 * Combines design system classes with custom classes
 */
export function combineClasses(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Gets responsive spacing classes
 */
export function responsiveSpacing(base: keyof typeof designTokens.spacing, sm?: keyof typeof designTokens.spacing, lg?: keyof typeof designTokens.spacing) {
  let classes = `p-${base}`;
  if (sm) classes += ` sm:p-${sm}`;  
  if (lg) classes += ` lg:p-${lg}`;
  return classes;
}

/**
 * Gets responsive text classes
 */
export function responsiveText(base: string, sm?: string, lg?: string) {
  let classes = base;
  if (sm) classes += ` sm:${sm}`;
  if (lg) classes += ` lg:${lg}`;
  return classes;
}