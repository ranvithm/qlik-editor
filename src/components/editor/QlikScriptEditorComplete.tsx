"use client";

import React from "react";
import QlikScriptEditor from "./QlikScriptEditor";
import Toolbar from "./Toolbar";
import EditorContainer from "./EditorContainer";
import StatusBar from "./StatusBar";
import { ModeToggle } from "./mode-toggle";
import { useQlikEditor } from "../../hooks/useQlikEditor";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Toaster } from "../ui/sonner";
import { designTokens, a11y } from "./design-system";
import { cn } from "../../lib/utils";
import {
  Play,
  Square,
  RotateCcw,
  Download,
  Upload,
  AlertTriangle,
  X,
  Undo2,
  Redo2,
  Database,
} from "lucide-react";
import type { editor } from "monaco-editor";

interface QlikScriptEditorCompleteProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  className?: string;
  title?: string;
  subtitle?: string;
}

const QlikScriptEditorComplete: React.FC<QlikScriptEditorCompleteProps> = ({
  initialScript = "",
  variables = [],
  onScriptChange,
  className = "",
  title = "Qlik Script Editor",
  subtitle,
}) => {
  const editor = useQlikEditor({
    initialScript,
    onScriptChange,
  });

  const handleEditorMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    editor.setEditorRef(editorInstance);
  };

  const toolbarButtons = [
    {
      icon: Play,
      label: "Run",
      onClick: editor.handleRun,
      disabled: editor.isRunning || !editor.isScriptValid,
      variant: "primary" as const,
      shortcut: "⌘R",
      loading: editor.isRunning,
      group: "primary" as const,
    },
    {
      icon: Square,
      label: "Stop",
      onClick: editor.handleStop,
      disabled: !editor.isRunning,
      variant: "ghost" as const,
      group: "primary" as const,
    },
    {
      icon: Undo2,
      label: "Undo",
      onClick: editor.handleUndo,
      variant: "ghost" as const,
      shortcut: "⌘Z",
      group: "secondary" as const,
    },
    {
      icon: Redo2,
      label: "Redo",
      onClick: editor.handleRedo,
      variant: "ghost" as const,
      shortcut: "⌘Y",
      group: "secondary" as const,
    },
    {
      icon: RotateCcw,
      label: "Format",
      onClick: editor.handleFormat,
      variant: "ghost" as const,
      shortcut: "⇧⌥F",
      group: "secondary" as const,
    },
    {
      icon: Download,
      label: "Save",
      onClick: editor.handleSave,
      variant: "ghost" as const,
      shortcut: "⌘S",
      group: "secondary" as const,
    },
    {
      icon: Upload,
      label: "Load",
      onClick: editor.handleLoad,
      variant: "ghost" as const,
      shortcut: "⌘O",
      group: "secondary" as const,
    },
    {
      icon: Database,
      label: "Insert Inline Data",
      onClick: editor.handleInsertInlineData,
      variant: "ghost" as const,
      shortcut: "⌘I",
      group: "secondary" as const,
    },
  ];

  const scriptStats = React.useMemo(() => {
    const lines = editor.script.split("\n");
    const cursorPosition = editor.editorRef.current?.getPosition();
    const currentLine = cursorPosition?.lineNumber || lines.length;
    const currentColumn =
      cursorPosition?.column || lines[lines.length - 1]?.length + 1 || 1;

    return {
      lines: lines.length,
      characters: editor.script.length,
      currentLine,
      currentColumn,
    };
  }, [editor.script, editor.editorRef.current]);

  return (
    <div
      className={cn(
        "flex flex-col h-screen w-full",
        designTokens.colors.bg.primary,
        "overflow-hidden",
        className
      )}
      role="application"
      aria-label="Qlik Script Editor Application"
    >
      <a href="#main-editor-content" className={a11y.srOnly}>
        Skip to editor
      </a>

      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {scriptStats.lines} lines
          </Badge>
          <Badge variant="secondary">
            {variables.length} variables
          </Badge>
          <ModeToggle />
        </div>
      </div>

      <Toolbar
        buttons={toolbarButtons}
        isRunning={editor.isRunning}
        onRun={editor.handleRun}
        onStop={editor.handleStop}
        onUndo={editor.handleUndo}
        onRedo={editor.handleRedo}
        onFormat={editor.handleFormat}
        onSave={editor.handleSave}
        onLoad={editor.handleLoad}
        onInsertInlineData={editor.handleInsertInlineData}
      />

      {/* Validation Errors - Dynamic height */}
      {editor.validationErrors.length > 0 && (
          <div className="flex-shrink-0 px-6 pt-4">
            <Alert className="border-red-200 bg-red-50/50 dark:border-red-800/50 dark:bg-red-950/20">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-red-800 dark:text-red-200">
                    {editor.validationErrors.length} validation issue
                    {editor.validationErrors.length > 1 ? "s" : ""} found
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-300 mt-1">
                    {editor.validationErrors.slice(0, 2).map((error, index) => (
                      <div key={index}>
                        Line {error.line}: {error.message}
                      </div>
                    ))}
                    {editor.validationErrors.length > 2 && (
                      <div>
                        ... and {editor.validationErrors.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant="destructive" className="ml-4">
                  {editor.validationErrors.length}
                </Badge>
              </AlertDescription>
            </Alert>
          </div>
        )}

      {/* Execution Progress - Dynamic height */}
      {editor.isRunning && (
        <div className="flex-shrink-0 px-6 pt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {editor.executionMessage}
              </span>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-muted-foreground font-mono">
                  {Math.round(editor.executionProgress)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={editor.handleStop}
                  className="h-7 bg-transparent"
                >
                  <X className="h-3 w-3 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
            <Progress value={editor.executionProgress} className="h-1.5" />
          </div>
        </div>
      )}

      {/* Main Editor - Flexible height */}
      <main
        id="main-editor-content"
        className="flex-1 min-h-0 p-6"
        role="main"
        aria-label="Script editor"
      >
        <EditorContainer
          showHeader={true}
          headerProps={{
            filename: "script.qvs",
            language: "qlik",
            showControls: true,
          }}
        >
          <QlikScriptEditor
            initialScript={initialScript}
            onChange={editor.setScript}
            variables={variables}
            onMount={handleEditorMount}
          />
        </EditorContainer>
      </main>

      {/* Status Bar - Fixed height */}
      <StatusBar
        scriptStats={scriptStats}
        encoding="UTF-8"
        language="Qlik Script"
        isRunning={editor.isRunning}
      />

      {/* Unsaved Changes Indicator */}
      {editor.hasUnsavedChanges && (
        <div className="fixed bottom-6 right-6 z-50">
          <Alert className="w-auto bg-amber-50 border-amber-200 shadow-lg dark:bg-amber-950/20 dark:border-amber-800/50">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="flex items-center space-x-3">
              <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Unsaved changes
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={editor.handleSave}
                className="h-7 bg-transparent"
              >
                Save now
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}


      {/* Sonner Toaster */}
      <Toaster />
    </div>
  );
};

export default QlikScriptEditorComplete;
