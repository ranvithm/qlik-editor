import React, { useState, useMemo } from 'react';
import QlikScriptEditor from './QlikScriptEditor';
import { designTokens, componentVariants, a11y, responsiveSpacing } from './ui/design-system';
import { cn } from '../lib/utils';

interface QlikScriptEditorWrapperRefactoredProps {
  initialScript?: string;
  variables?: string[];
  className?: string;
  fullScreen?: boolean;
}

const QlikScriptEditorWrapperRefactored: React.FC<QlikScriptEditorWrapperRefactoredProps> = ({
  initialScript = '',
  variables = [],
  className = '',
  fullScreen = false
}) => {
  const [script, setScript] = useState(initialScript);

  const handleScriptChange = (value: string) => {
    setScript(value);
  };

  // Memoized script statistics for performance
  const scriptStats = useMemo(() => {
    const lines = script.split('\n');
    return {
      lines: lines.length,
      characters: script.length
    };
  }, [script]);

  return (
    <div 
      className={cn(
        "w-full h-full flex flex-col",
        designTokens.colors.bg.primary,
        fullScreen ? "min-h-screen" : "min-h-96",
        className
      )}
      role="application"
      aria-label="Qlik Script Editor Application"
    >
      {/* Skip Navigation for Accessibility */}
      <a
        href="#main-editor"
        className={a11y.skipLink}
      >
        Skip to main editor
      </a>

      {/* Header Section */}
      <header 
        className={cn(
          designTokens.colors.bg.secondary,
          designTokens.colors.border.primary,
          "border-b flex-shrink-0",
          responsiveSpacing('md', 'lg', 'xl')
        )}
        role="banner"
      >
        <div className={cn(
          designTokens.layout.container,
          designTokens.layout.maxWidth
        )}>
          <h1 className={cn(
            designTokens.typography.heading.primary,
            designTokens.colors.text.primary
          )}>
            Qlik Script Editor
          </h1>
          <p className={cn(
            designTokens.colors.text.secondary,
            designTokens.typography.body.primary,
            "mt-1 hidden sm:block"
          )}>
            Edit your Qlik Sense data load script with syntax highlighting and auto-completion
          </p>
        </div>
      </header>

      {/* Main Editor Area */}
      <main 
        id="main-editor"
        className={cn(
          "flex-1 flex flex-col min-h-0",
          responsiveSpacing('xs', 'md', 'lg')
        )}
        role="main"
      >
        <div className={cn(
          designTokens.layout.container,
          designTokens.layout.maxWidth,
          "flex-1 flex flex-col min-h-0"
        )}>
          {/* Editor Toolbar */}
          <div className={cn(
            designTokens.colors.bg.secondary,
            designTokens.colors.border.primary,
            componentVariants.panel.primary,
            "flex-shrink-0 p-2 sm:p-3 rounded-t-lg"
          )}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className={cn(
                  designTokens.colors.text.secondary,
                  designTokens.typography.body.primary,
                  "font-medium"
                )}>
                  Script Editor
                </span>
                {variables.length > 0 && (
                  <span className={cn(
                    componentVariants.badge.default,
                    "text-xs"
                  )}>
                    {variables.length} variables available
                  </span>
                )}
              </div>
              
              {/* Stats Section - Responsive */}
              <div className={cn(
                "flex items-center space-x-2",
                designTokens.typography.body.secondary,
                designTokens.colors.text.muted
              )}>
                <span className="hidden sm:inline">
                  Lines: {scriptStats.lines}
                </span>
                <span className="hidden sm:inline" aria-hidden="true">|</span>
                <span>Characters: {scriptStats.characters}</span>
              </div>
            </div>
          </div>

          {/* Editor Container with Design System Styling */}
          <div className={cn(
            "flex-1 grid overflow-hidden",
            designTokens.colors.bg.editor,
            designTokens.colors.border.primary,
            "border-x border-b rounded-b-lg",
            designTokens.shadows.interactive,
            designTokens.transitions.normal,
            "hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500/20"
          )}>
            <QlikScriptEditor
              initialScript={initialScript}
              onChange={handleScriptChange}
              variables={variables}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className={cn(
          designTokens.colors.bg.secondary,
          designTokens.colors.border.primary,
          "border-t flex-shrink-0",
          responsiveSpacing('md', 'lg', 'xl')
        )}
        role="contentinfo"
      >
        <div className={cn(
          designTokens.layout.container,
          designTokens.layout.maxWidth,
          "text-center"
        )}>
          <p className={cn(
            designTokens.colors.text.muted,
            designTokens.typography.body.secondary,
            "sm:text-sm"
          )}>
            Use{' '}
            <kbd className={cn(
              componentVariants.badge.default,
              "font-mono px-1"
            )}>
              Ctrl+Space
            </kbd>
            {' '}for auto-completion •{' '}
            <kbd className={cn(
              componentVariants.badge.default,
              "font-mono px-1"
            )}>
              Ctrl+/
            </kbd>
            {' '}for comments •{' '}
            <kbd className={cn(
              componentVariants.badge.default,
              "font-mono px-1"
            )}>
              Ctrl+F
            </kbd>
            {' '}for search
          </p>
        </div>
      </footer>
    </div>
  );
};

export default QlikScriptEditorWrapperRefactored;