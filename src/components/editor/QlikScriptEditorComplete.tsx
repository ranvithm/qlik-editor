"use client";

import React from "react";
import QlikScriptEditor from "./QlikScriptEditor";
import Toolbar from "./Toolbar";
import EditorContainer from "./EditorContainer";
import StatusBar from "./StatusBar";
import { useQlikEditor } from "../../hooks/useQlikEditor";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Toaster } from "../ui/sonner";
import { designTokens, a11y } from "./design-system";
import { cn } from "../../lib/utils";
import {  AlertTriangle,
  X,
} from "lucide-react";
import type { editor } from "monaco-editor";
import Header from "./Header";

interface QlikScriptEditorCompleteProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  className?: string;
  title?: string;
  subtitle?: string;
  headerClassName?: string;
  toolbarClassName?: string;
  editorClassName?: string;
  statusBarClassName?: string;
  containerClassName?: string;
}

const QlikScriptEditorComplete: React.FC<QlikScriptEditorCompleteProps> = ({
  initialScript = "",
  variables = [],
  onScriptChange,
  className = "",
  title = "Qlik Script Editor",
  subtitle,
  headerClassName,
  toolbarClassName,
  editorClassName,
  statusBarClassName,
  containerClassName,
}) => {
  const editor = useQlikEditor({
    initialScript,
    onScriptChange,
  });

  const handleEditorMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    editor.setEditorRef(editorInstance);
  };

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
      className={cn("flex flex-col h-full w-full", designTokens.colors.bg.primary, "overflow-hidden", className)}
      role="application"
      aria-label="Qlik Script Editor Application"
    >
      <a href="#main-editor-content" className={a11y.srOnly}>
        Skip to editor
      </a>
      <Header
        title={title}
        subtitle={subtitle}
        variablesCount={variables.length}
        scriptStats={scriptStats}
        isFullscreen={editor.isFullscreen}
        onToggleFullscreen={editor.handleToggleFullscreen}
        className={headerClassName}
      />

      <Toolbar
        isRunning={editor.isRunning}
        onRun={editor.handleRun}
        onStop={editor.handleStop}
        onUndo={editor.handleUndo}
        onRedo={editor.handleRedo}
        onFormat={editor.handleFormat}
        onSave={editor.handleSave}
        onLoad={editor.handleLoad}
        onInsertInlineData={editor.handleInsertInlineData}
        className={toolbarClassName}
      />

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

      <main
        id="main-editor-content"
        className={cn("flex-1 p-6", containerClassName)}
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
          className={containerClassName}
        >
          <QlikScriptEditor
            initialScript={initialScript}
            onChange={editor.setScript}
            variables={variables}
            onMount={handleEditorMount}
            className={editorClassName}
          />
        </EditorContainer>
      </main>

      {/* Status Bar - Fixed height */}
      <StatusBar
        scriptStats={scriptStats}
        encoding="UTF-8"
        language="Qlik Script"
        isRunning={editor.isRunning}
        className={statusBarClassName}
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


      <Toaster />
    </div>
  );
};

export default QlikScriptEditorComplete;
