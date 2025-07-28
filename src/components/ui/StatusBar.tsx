import React from 'react';
import { designTokens } from './design-system';
import { cn } from '../../lib/utils';

interface StatusBarProps {
  scriptStats?: {
    lines: number;
    characters: number;
    currentLine?: number;
    currentColumn?: number;
  };
  encoding?: string;
  language?: string;
  isRunning?: boolean;
  shortcuts?: string[];
  className?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({
  scriptStats,
  encoding = "UTF-8",
  language = "Qlik Script",
  isRunning = false,
  shortcuts = [
    "Ctrl+Space for suggestions",
    "Ctrl+/ for comments"
  ],
  className
}) => {
  return (
    <footer 
      className={cn(
        designTokens.colors.bg.secondary,
        designTokens.colors.border.primary,
        "border-t flex-shrink-0 px-4 py-2 sm:px-6",
        className
      )}
      role="contentinfo"
      aria-label="Editor status bar"
    >
      <div className={cn(
        "flex items-center justify-between",
        designTokens.typography.body.secondary,
        designTokens.colors.text.secondary
      )}>
        {/* Left Section - Cursor & File Info */}
        <div className="flex items-center space-x-4">
          {scriptStats && (
            <>
              <span aria-label={`Line ${scriptStats.currentLine || scriptStats.lines}, Column ${scriptStats.currentColumn || 1}`}>
                Ln {scriptStats.currentLine || scriptStats.lines}, Col {scriptStats.currentColumn || 1}
              </span>
              <span aria-label={`File encoding: ${encoding}`}>
                {encoding}
              </span>
              <span aria-label={`Language: ${language}`}>
                {language}
              </span>
            </>
          )}
        </div>
        
        {/* Right Section - Shortcuts & Status */}
        <div className="flex items-center space-x-4">
          {/* Keyboard Shortcuts */}
          <div className="hidden sm:flex items-center space-x-2">
            {shortcuts.map((shortcut, index) => (
              <React.Fragment key={shortcut}>
                {index > 0 && (
                  <span className={designTokens.colors.text.muted} aria-hidden="true">
                    •
                  </span>
                )}
                <span className="hidden md:inline">
                  {shortcut}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Running Status */}
          <div 
            className={cn(
              "flex items-center space-x-1",
              isRunning ? "text-green-600" : ""
            )}
            role="status"
            aria-live="polite"
          >
            <div 
              className={cn(
                "w-2 h-2 rounded-full",
                isRunning ? "bg-green-500 animate-pulse" : "bg-gray-400"
              )}
              aria-hidden="true"
            />
            <span aria-label={`Editor status: ${isRunning ? 'Running script' : 'Ready'}`}>
              {isRunning ? 'Running' : 'Ready'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;