// Clean, minimal design tokens
export const designTokens = {
  colors: {
    bg: {
      primary: "bg-background",
      secondary: "bg-card/50",
      tertiary: "bg-muted/30",
      editor: "bg-background",
      glass: "bg-background/80 backdrop-blur-md",
    },
    text: {
      primary: "text-foreground",
      secondary: "text-muted-foreground",
      muted: "text-muted-foreground/70",
    },
    border: {
      primary: "border-border/50",
      subtle: "border-border/20",
    },
    accent: {
      blue: "text-blue-500",
      green: "text-emerald-500",
      red: "text-red-500",
      yellow: "text-amber-500",
      orange: "text-orange-500",
    },
  },
  typography: {
    heading: {
      primary: "text-xl font-semibold tracking-tight",
      secondary: "text-lg font-medium",
      tertiary: "text-base font-medium",
    },
    body: {
      primary: "text-sm",
      secondary: "text-xs",
      large: "text-base",
    },
  },
  spacing: {
    xs: "1",
    sm: "2",
    md: "4",
    lg: "6",
    xl: "8",
  },
  radius: {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  },
  shadows: {
    subtle: "shadow-sm",
    soft: "shadow-md",
    elevated: "shadow-lg",
  },
  transitions: {
    fast: "transition-all duration-150 ease-out",
    normal: "transition-all duration-200 ease-out",
    slow: "transition-all duration-300 ease-out",
  },
} as const

// Clean component variants
export const componentVariants = {
  button: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  },
  panel: {
    glass: "bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-sm",
    clean: "bg-card border border-border/30 rounded-lg",
    minimal: "bg-background border-0 rounded-lg",
  },
} as const

// Accessibility
export const a11y = {
  focusRing: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
  srOnly: "sr-only",
}

// Smooth animations
export const animations = {
  fadeIn: "animate-in fade-in-0 duration-200",
  slideIn: "animate-in slide-in-from-bottom-2 duration-300",
  scaleIn: "animate-in zoom-in-95 duration-200",
}
