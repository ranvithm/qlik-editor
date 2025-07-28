import React from 'react';
import { Minimize2, Maximize2 } from 'lucide-react';
import { designTokens, componentVariants, a11y, combineClasses } from './design-system';
import { cn } from '../../lib/utils';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  variablesCount?: number;
  scriptStats?: {
    lines: number;
    characters: number;
  };
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "Qlik Script Editor",
  subtitle,
  variablesCount = 0,
  scriptStats,
  isFullscreen = false,
  onToggleFullscreen,
  className
}) => {
  return (
    <header 
      className={cn(
        designTokens.colors.bg.secondary,
        designTokens.colors.border.primary,
        "border-b flex-shrink-0 px-4 py-3 sm:px-6",
        className
      )}
      role="banner"
    >
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div className="flex items-center space-x-3">
          <h1 className={cn(
            designTokens.typography.heading.secondary,
            designTokens.colors.text.primary
          )}>
            {title}
          </h1>
          
          {subtitle && (
            <p className={cn(
              designTokens.colors.text.secondary,
              designTokens.typography.body.primary,
              "hidden sm:block"
            )}>
              {subtitle}
            </p>
          )}
          
          {variablesCount > 0 && (
            <span 
              className={componentVariants.badge.accent}
              aria-label={`${variablesCount} variables available`}
            >
              {variablesCount} variables
            </span>
          )}
        </div>

        {/* Controls Section */}
        <div className="flex items-center space-x-2">
          {/* Script Statistics */}
          {scriptStats && (
            <div 
              className={cn(
                "hidden sm:flex items-center space-x-4",
                designTokens.typography.body.primary,
                designTokens.colors.text.secondary
              )}
              aria-label="Script statistics"
            >
              <span>Lines: {scriptStats.lines}</span>
              <span className={designTokens.colors.text.muted} aria-hidden="true">|</span>
              <span>Chars: {scriptStats.characters}</span>
            </div>
          )}

          {/* Fullscreen Toggle */}
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className={cn(
                componentVariants.button.ghost,
                "p-2",
                a11y.focusRing
              )}
              title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Enter Fullscreen (F11)'}
              aria-label={isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;