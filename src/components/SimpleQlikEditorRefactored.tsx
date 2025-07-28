import React, { useState, useMemo } from 'react';
import QlikScriptEditor from './QlikScriptEditor';
import Header from './ui/Header';
import EditorContainer from './ui/EditorContainer';
import { designTokens, componentVariants, a11y } from './ui/design-system';
import { cn } from '../lib/utils';

interface SimpleQlikEditorRefactoredProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  className?: string;
  showStats?: boolean;
  compactMode?: boolean;
}

const SimpleQlikEditorRefactored: React.FC<SimpleQlikEditorRefactoredProps> = ({
  initialScript = '',
  variables = [],
  onScriptChange,
  className = '',
  showStats = false,
  compactMode = false
}) => {
  const [script, setScript] = useState(initialScript);

  const handleScriptChange = (value: string) => {
    setScript(value);
    onScriptChange?.(value);
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
        "flex flex-col h-full w-full",
        designTokens.colors.bg.primary,
        className
      )}
      role="application"
      aria-label="Qlik Script Editor"
    >
      {/* Skip Link for Accessibility */}
      <a
        href="#simple-editor-content"
        className={a11y.skipLink}
        aria-label="Skip to editor content"
      >
        Skip to editor
      </a>

      {/* Compact Header */}
      {!compactMode && (
        <Header
          title="Qlik Script Editor"
          variablesCount={variables.length}
          scriptStats={showStats ? scriptStats : undefined}
          className={cn(
            compactMode ? "py-2" : "py-3"
          )}
        />
      )}

      {/* Main Editor Area - Mobile First */}
      <main 
        id="simple-editor-content"
        className={cn(
          "flex-1 flex flex-col min-h-0",
          compactMode ? "p-2" : "p-4 sm:p-6"
        )}
        role="main"
        aria-label="Script editor"
      >
        <div className="flex-1 flex flex-col min-h-0 w-full">
          {/* Optional Toolbar for Mobile Actions */}
          {!compactMode && (
            <div className={cn(
              "flex-shrink-0 mb-4 sm:mb-6",
              "flex flex-col sm:flex-row sm:justify-between gap-2"
            )}>
              <div className="flex items-center space-x-3">
                <button className={cn(
                  componentVariants.button.primary,
                  "text-sm"
                )}>
                  Run
                </button>
                <button className={cn(
                  componentVariants.button.secondary,
                  "text-sm"
                )}>
                  Format
                </button>
                <button className={cn(
                  componentVariants.button.secondary,
                  "text-sm"
                )}>
                  Save
                </button>
              </div>

              {/* Mobile Stats */}
              {showStats && (
                <div className={cn(
                  "flex items-center space-x-4",
                  "text-sm",
                  designTokens.colors.text.secondary,
                  "sm:hidden"
                )}>
                  <span>Lines: {scriptStats.lines}</span>
                  <span>Chars: {scriptStats.characters}</span>
                </div>
              )}
            </div>
          )}

          {/* Editor Container - Optimized for Mobile */}
          <EditorContainer
            showHeader={!compactMode}
            headerProps={{
              filename: "script.qvs",
              language: "qlik",
              showControls: !compactMode
            }}
            interactive={true}
            fullHeight={true}
            className={cn(
              compactMode && designTokens.radius.sm,
              "touch-manipulation" // Better touch handling on mobile
            )}
          >
            <QlikScriptEditor
              initialScript={initialScript}
              onChange={handleScriptChange}
              variables={variables}
            />
          </EditorContainer>
        </div>
      </main>

      {/* Mobile-friendly Footer with Quick Stats */}
      {!compactMode && showStats && (
        <footer 
          className={cn(
            designTokens.colors.bg.secondary,
            designTokens.colors.border.primary,
            "border-t flex-shrink-0 px-4 py-2",
            "flex justify-center sm:hidden" // Only show on mobile
          )}
          role="contentinfo"
        >
          <div className={cn(
            "text-center",
            designTokens.typography.body.secondary,
            designTokens.colors.text.secondary
          )}>
            <span>Lines: {scriptStats.lines} • Characters: {scriptStats.characters}</span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default SimpleQlikEditorRefactored;