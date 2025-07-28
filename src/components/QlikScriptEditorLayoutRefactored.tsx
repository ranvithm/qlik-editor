import React, { useState, useMemo } from 'react';
import QlikScriptEditor from './QlikScriptEditor';
import Header from './ui/Header';
import Toolbar, { type ToolbarButton } from './ui/Toolbar';
import EditorContainer from './ui/EditorContainer';
import StatusBar from './ui/StatusBar';
import { designTokens, a11y } from './ui/design-system';
import { cn } from '../lib/utils';

interface QlikScriptEditorLayoutRefactoredProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  onRun?: () => void;
  onFormat?: () => void;
  onSave?: () => void;
  onLoad?: () => void;
  onSettings?: () => void;
  className?: string;
  showToolbar?: boolean;
  showHeader?: boolean;
  showStatusBar?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  customToolbarButtons?: ToolbarButton[];
  title?: string;
  subtitle?: string;
}

const QlikScriptEditorLayoutRefactored: React.FC<QlikScriptEditorLayoutRefactoredProps> = ({
  initialScript = '',
  variables = [],
  onScriptChange,
  onRun,
  onFormat,
  onSave,
  onLoad,
  onSettings,
  className = '',
  showToolbar = true,
  showHeader = true,
  showStatusBar = true,
  isFullscreen = false,
  onToggleFullscreen,
  customToolbarButtons,
  title,
  subtitle = "Edit your Qlik Sense data load script with syntax highlighting and auto-completion"
}) => {
  const [script, setScript] = useState(initialScript);
  const [isRunning, setIsRunning] = useState(false);

  const handleScriptChange = (value: string) => {
    setScript(value);
    onScriptChange?.(value);
  };

  const handleRun = async () => {
    if (onRun) {
      setIsRunning(true);
      try {
        await onRun();
      } finally {
        setIsRunning(false);
      }
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  // Memoized script statistics for performance
  const scriptStats = useMemo(() => {
    const lines = script.split('\n');
    return {
      lines: lines.length,
      characters: script.length,
      currentLine: lines.length,
      currentColumn: lines[lines.length - 1]?.length + 1 || 1
    };
  }, [script]);

  // Skip link for accessibility
  const skipLinkId = 'editor-main-content';

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
        href={`#${skipLinkId}`}
        className={a11y.skipLink}
        aria-label="Skip to main editor content"
      >
        Skip to editor
      </a>

      {/* Header */}
      {showHeader && (
        <Header
          title={title}
          subtitle={subtitle}
          variablesCount={variables.length}
          scriptStats={scriptStats}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen}
        />
      )}

      {/* Toolbar */}
      {showToolbar && (
        <Toolbar
          buttons={customToolbarButtons}
          isRunning={isRunning}
          onRun={handleRun}
          onStop={handleStop}
          onFormat={onFormat}
          onSave={onSave}
          onLoad={onLoad}
          onSettings={onSettings}
        />
      )}

      {/* Main Editor Area */}
      <main 
        id={skipLinkId}
        className="flex-1 flex flex-col min-h-0 p-4 sm:p-6"
        role="main"
        aria-label="Script editor"
      >
        <div className={cn(
          "flex-1 flex flex-col min-h-0 max-w-full mx-auto w-full",
          designTokens.layout.maxWidth
        )}>
          <EditorContainer
            showHeader={true}
            headerProps={{
              filename: "script.qvs",
              language: "qlik",
              showControls: true
            }}
            interactive={true}
            fullHeight={true}
          >
            <QlikScriptEditor
              initialScript={initialScript}
              onChange={handleScriptChange}
              variables={variables}
            />
          </EditorContainer>
        </div>
      </main>

      {/* Status Bar */}
      {showStatusBar && (
        <StatusBar
          scriptStats={scriptStats}
          encoding="UTF-8"
          language="Qlik Script"
          isRunning={isRunning}
          shortcuts={[
            "Ctrl+Space for suggestions",
            "Ctrl+/ for comments",
            "Ctrl+F for search"
          ]}
        />
      )}
    </div>
  );
};

export default QlikScriptEditorLayoutRefactored;