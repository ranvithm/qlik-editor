import React, { useEffect } from 'react';
import QlikScriptEditor from './QlikScriptEditor';
import Header from './ui/Header';
import Toolbar from './ui/Toolbar';
import EditorContainer from './ui/EditorContainer';
import StatusBar from './ui/StatusBar';
import { NotificationProvider, useNotifications } from '../context/NotificationContext';
import { useQlikEditor } from '../hooks/useQlikEditor';
import { setNotificationHandler } from '../utils/editorUtils';
import { designTokens, a11y } from './ui/design-system';
import { cn } from '../lib/utils';
import { Play, Square, RotateCcw, Download, Upload, Settings, Undo, Redo, Search, Replace } from 'lucide-react';

// ============================
// MAIN EDITOR COMPONENT
// ============================

interface QlikScriptEditorCompleteProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  className?: string;
  title?: string;
  subtitle?: string;
  autoSave?: boolean;
  showNotifications?: boolean;
}

const QlikScriptEditorCompleteInner: React.FC<QlikScriptEditorCompleteProps> = ({
  initialScript = '',
  variables = [],
  onScriptChange,
  className = '',
  title = "Qlik Script Editor",
  subtitle = "Edit your Qlik Sense data load script with syntax highlighting and auto-completion",
  autoSave = false,
  showNotifications = true
}) => {
  const notifications = useNotifications();
  
  // Initialize the editor hook with all functionality
  const editor = useQlikEditor({
    initialScript,
    autoSave,
    autoSaveInterval: 30000, // 30 seconds
    onScriptChange,
    onExecutionComplete: (result) => {
      if (result.success) {
        notifications.showSuccess(
          'Execution Completed',
          `Script executed successfully in ${result.duration}ms. ${result.recordsLoaded} records loaded.`,
          {
            duration: 5000,
            actions: [
              {
                label: 'View Details',
                onClick: () => console.log('Execution details:', result)
              }
            ]
          }
        );
      } else {
        notifications.showError(
          'Execution Failed',
          `Script execution failed with ${result.errors?.length || 0} errors.`,
          {
            duration: 0, // Don't auto-dismiss errors
            actions: [
              {
                label: 'View Errors',
                onClick: () => console.log('Execution errors:', result.errors)
              }
            ]
          }
        );
      }
    },
    onError: (error) => {
      notifications.showError('Script Error', error);
    },
    showNotifications
  });

  // Set up notification handler
  useEffect(() => {
    setNotificationHandler((options) => {
      notifications.addNotification(options);
    });
  }, [notifications]);

  // Handle Monaco editor reference
  const handleEditorMount = (editorInstance: any) => {
    editor.setEditorRef(editorInstance);
  };

  // Custom toolbar buttons with all functionality
  const toolbarButtons = [
    {
      icon: Play,
      label: 'Run Script',
      onClick: editor.handleRun,
      disabled: editor.isRunning || !editor.isScriptValid,
      variant: 'primary' as const,
      shortcut: 'Ctrl+R',
      loading: editor.isRunning
    },
    {
      icon: Square,
      label: 'Stop',
      onClick: editor.handleStop,
      disabled: !editor.isRunning,
      variant: 'secondary' as const
    },
    {
      icon: RotateCcw,
      label: 'Format',
      onClick: editor.handleFormat,
      variant: 'secondary' as const,
      shortcut: 'Shift+Alt+F'
    },
    {
      icon: Download,
      label: 'Save',
      onClick: editor.handleSave,
      variant: 'secondary' as const,
      shortcut: 'Ctrl+S'
    },
    {
      icon: Upload,
      label: 'Load',
      onClick: editor.handleLoad,
      variant: 'secondary' as const,
      shortcut: 'Ctrl+O'
    },
    {
      icon: Undo,
      label: 'Undo',
      onClick: editor.handleUndo,
      variant: 'secondary' as const,
      shortcut: 'Ctrl+Z'
    },
    {
      icon: Redo,
      label: 'Redo',
      onClick: editor.handleRedo,
      variant: 'secondary' as const,
      shortcut: 'Ctrl+Y'
    },
    {
      icon: Search,
      label: 'Find',
      onClick: editor.handleFind,
      variant: 'secondary' as const,
      shortcut: 'Ctrl+F'
    },
    {
      icon: Replace,
      label: 'Replace',
      onClick: editor.handleReplace,
      variant: 'secondary' as const,
      shortcut: 'Ctrl+H'
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => notifications.showInfo('Settings', 'Settings panel coming soon!'),
      variant: 'secondary' as const
    }
  ];

  // Calculate script statistics
  const scriptStats = React.useMemo(() => {
    const lines = editor.script.split('\n');
    return {
      lines: lines.length,
      characters: editor.script.length,
      currentLine: lines.length,
      currentColumn: lines[lines.length - 1]?.length + 1 || 1
    };
  }, [editor.script]);

  return (
    <div 
      className={cn(
        "flex flex-col h-full w-full",
        designTokens.colors.bg.primary,
        className
      )}
      role="application"
      aria-label="Qlik Script Editor Application"
    >
      {/* Skip Link for Accessibility */}
      <a
        href="#main-editor-content"
        className={a11y.skipLink}
        aria-label="Skip to main editor content"
      >
        Skip to editor
      </a>

      {/* Header with script statistics and fullscreen toggle */}
      <Header
        title={title}
        subtitle={subtitle}
        variablesCount={variables.length}
        scriptStats={scriptStats}
        isFullscreen={editor.isFullscreen}
        onToggleFullscreen={editor.handleToggleFullscreen}
      />

      {/* Toolbar with all editor actions */}
      <Toolbar
        buttons={toolbarButtons}
        isRunning={editor.isRunning}
        showStatus={true}
      />

      {/* Validation Errors Display */}
      {editor.validationErrors.length > 0 && (
        <div className={cn(
          designTokens.colors.bg.secondary,
          "border-b border-red-500/20 px-4 py-2"
        )}>
          <div className="text-sm text-red-400">
            <strong>Validation Issues:</strong>
            <ul className="list-disc list-inside mt-1">
              {editor.validationErrors.slice(0, 3).map((error, index) => (
                <li key={index}>
                  Line {error.line}: {error.message}
                </li>
              ))}
              {editor.validationErrors.length > 3 && (
                <li>... and {editor.validationErrors.length - 3} more issues</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Execution Progress Bar */}
      {editor.isRunning && (
        <div className={cn(
          designTokens.colors.bg.secondary,
          "border-b border-blue-500/20 px-4 py-2"
        )}>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="flex justify-between text-sm text-blue-400 mb-1">
                <span>{editor.executionMessage}</span>
                <span>{Math.round(editor.executionProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${editor.executionProgress}%` }}
                />
              </div>
            </div>
            <button
              onClick={editor.handleStop}
              className={cn(
                "px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded",
                designTokens.transitions.fast
              )}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Editor Area */}
      <main 
        id="main-editor-content"
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
              onChange={editor.setScript}
              variables={variables}
              onMount={handleEditorMount}
            />
          </EditorContainer>
        </div>
      </main>

      {/* Status Bar with enhanced information */}
      <StatusBar
        scriptStats={scriptStats}
        encoding="UTF-8"
        language="Qlik Script"
        isRunning={editor.isRunning}
        shortcuts={[
          "Ctrl+R to run",
          "Ctrl+S to save",
          "Ctrl+O to load",
          "Ctrl+F to find",
          "F11 for fullscreen"
        ]}
      />

      {/* Unsaved Changes Indicator */}
      {editor.hasUnsavedChanges && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className={cn(
            "bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-lg",
            "flex items-center space-x-2",
            designTokens.transitions.normal
          )}>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">Unsaved changes</span>
            <button
              onClick={editor.handleSave}
              className="text-xs underline hover:no-underline"
            >
              Save now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================
// WRAPPER WITH NOTIFICATION PROVIDER
// ============================

const QlikScriptEditorComplete: React.FC<QlikScriptEditorCompleteProps> = (props) => {
  return (
    <NotificationProvider defaultDuration={4000} maxNotifications={5}>
      <QlikScriptEditorCompleteInner {...props} />
    </NotificationProvider>
  );
};

export default QlikScriptEditorComplete;