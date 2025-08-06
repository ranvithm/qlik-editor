"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import type { editor } from "monaco-editor"
import { useTheme } from "./theme-provider"
import { registerQlikLanguageRefactored } from "../../languages/qlik-refactored"
import { setupEditorContextMenu } from "./context-menu"
import { Editor } from "@monaco-editor/react"
import { cn } from "../../lib/utils"

interface QlikScriptEditorProps {
  initialScript: string
  onChange: (script: string) => void
  variables: string[] // For auto-completion (though not yet fully implemented in language def)
  onMount?: (editor: editor.IStandaloneCodeEditor) => void
  className?: string
  containerClassName?: string
  editorClassName?: string
}

const QlikScriptEditor: React.FC<QlikScriptEditorProps> = ({
  initialScript,
  onChange,
  variables = [],
  onMount,
  className,
  containerClassName,
  editorClassName
}) => {
  const { theme } = useTheme()
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import('monaco-editor') | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('qlik-dark');

  // Get the appropriate Monaco theme based on current theme
  const getMonacoTheme = useCallback(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'qlik-dark' : 'qlik-light';
    }
    return theme === 'dark' ? 'qlik-dark' : 'qlik-light';
  }, [theme]);


  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Register the comprehensive Qlik language definition
    registerQlikLanguageRefactored(monaco);

    // Configure context menu
    setupEditorContextMenu(editor, monaco);

    // Call onMount callback if provided
    onMount?.(editor);

    // Add user-defined variables to completion provider
    if (variables.length > 0) {
      monaco.languages.registerCompletionItemProvider('qlik', {
        triggerCharacters: ['$'],
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn
          };

          const lineContent = model.getLineContent(position.lineNumber);
          const textBeforeCursor = lineContent.substring(0, position.column - 1);
          
          // Only show user variables in variable context
          if (textBeforeCursor.includes('$') || word.word.startsWith('$')) {
            const suggestions = variables.map(variable => ({
              label: `$(${variable})`,
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: `$(${variable})`,
              range: range,
              detail: 'User Variable',
              documentation: {
                value: `**$(${variable})** - User-defined variable\n\nUse this variable to reference dynamic values in your script.`
              },
              sortText: `0_${variable}` // Higher priority than system variables
            }));

            return { suggestions };
          }

          return { suggestions: [] };
        }
      });
    }

    // Configure enhanced editor themes
    monaco.editor.defineTheme('qlik-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable.system', foreground: '4FC3F7' },
        { token: 'variable.expression', foreground: 'FFB74D' },
        { token: 'field.reference', foreground: 'CE93D8' },
        { token: 'string.double', foreground: 'CE9178' },
        { token: 'string.single', foreground: 'CE9178' },
        { token: 'comment.block', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'comment.line', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'comment.line.rem', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'number.hex', foreground: 'B5CEA8' },
        { token: 'number.binary', foreground: 'B5CEA8' },
        { token: 'number.octal', foreground: 'B5CEA8' },
        { token: 'number.float', foreground: 'B5CEA8' },
        { token: 'operator', foreground: 'D4D4D4' },
        { token: 'delimiter', foreground: 'D4D4D4' },
        { token: 'identifier', foreground: '9CDCFE' },
        { token: 'identifier.after-keyword', foreground: '4EC9B0' }
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#C6C6C6',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41',
        'editorIndentGuide.background': '#404040',
        'editorIndentGuide.activeBackground': '#707070',
        'editor.selectionHighlightBackground': '#ADD6FF26',
        'editor.wordHighlightBackground': '#575757B8',
        'editor.wordHighlightStrongBackground': '#004972B8',
        'editorCursor.foreground': '#AEAFAD',
        'editor.findMatchBackground': '#515C6A',
        'editor.findMatchHighlightBackground': '#EA5C0040',
        'editor.hoverHighlightBackground': '#264f7840'
      }
    });

    monaco.editor.defineTheme('qlik-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
        { token: 'function', foreground: '795E26' },
        { token: 'variable.system', foreground: '0070C1' },
        { token: 'variable.expression', foreground: 'AF00DB' },
        { token: 'field.reference', foreground: '7B1FA2' },
        { token: 'string.double', foreground: 'A31515' },
        { token: 'string.single', foreground: 'A31515' },
        { token: 'comment.block', foreground: '008000', fontStyle: 'italic' },
        { token: 'comment.line', foreground: '008000', fontStyle: 'italic' },
        { token: 'comment.line.rem', foreground: '008000', fontStyle: 'italic' },
        { token: 'number', foreground: '098658' },
        { token: 'number.hex', foreground: '098658' },
        { token: 'number.binary', foreground: '098658' },
        { token: 'number.octal', foreground: '098658' },
        { token: 'number.float', foreground: '098658' },
        { token: 'operator', foreground: '000000' },
        { token: 'delimiter', foreground: '000000' },
        { token: 'identifier', foreground: '001080' },
        { token: 'identifier.after-keyword', foreground: '267F99' }
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#000000',
        'editorLineNumber.foreground': '#237893',
        'editorLineNumber.activeForeground': '#0B216F',
        'editor.selectionBackground': '#ADD6FF',
        'editor.inactiveSelectionBackground': '#E5EBF1',
        'editorIndentGuide.background': '#D3D3D3',
        'editorIndentGuide.activeBackground': '#939393',
        'editor.selectionHighlightBackground': '#ADD6FF4D',
        'editor.wordHighlightBackground': '#57575740',
        'editor.wordHighlightStrongBackground': '#0E639C40',
        'editorCursor.foreground': '#000000',
        'editor.findMatchBackground': '#A8AC94',
        'editor.findMatchHighlightBackground': '#EA5C0040',
        'editor.hoverHighlightBackground': '#ADD6FF40'
      }
    });

    // Set initial theme
    const initialTheme = getMonacoTheme();
    setCurrentTheme(initialTheme);
    monaco.editor.setTheme(initialTheme);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  // Update theme when it changes
  useEffect(() => {
    const newTheme = getMonacoTheme();
    if (newTheme !== currentTheme && monacoRef.current) {
      setCurrentTheme(newTheme);
      monacoRef.current.editor.setTheme(newTheme);
    }
  }, [theme, currentTheme, getMonacoTheme]);

  // Handle system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => {
        const newTheme = getMonacoTheme();
        if (newTheme !== currentTheme && monacoRef.current) {
          setCurrentTheme(newTheme);
          monacoRef.current.editor.setTheme(newTheme);
        }
      };

      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, [theme, currentTheme, getMonacoTheme]);

  return (
    <div className={cn("h-full w-full flex flex-col", className)}>
      <div className={cn("flex-1 min-h-0", containerClassName)}>
        <Editor
          height="100%"
          defaultLanguage="qlik"
          defaultValue={initialScript}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          options={{
            theme: currentTheme,
            fontSize: 14,
            lineNumbers: 'on',
            renderWhitespace: 'selection',
            wordWrap: 'on',
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            folding: true,
            foldingHighlight: true,
            showFoldingControls: 'mouseover',
            matchBrackets: 'always',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoSurround: 'languageDefined',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true,
              showVariables: true
            },
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false
            },
            parameterHints: { enabled: true },
            hover: { enabled: true },
            contextmenu: true,
            mouseWheelZoom: true,
            smoothScrolling: true,
            cursorBlinking: 'blink',
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight: 'all',
            occurrencesHighlight: 'singleFile',
            selectionHighlight: true,
            codeLens: false
          }}
          className={cn("border-t border-border overflow-hidden dark:border-gray-700 light:border-gray-300", editorClassName)}
        />
      </div>
    </div>
  );
};

export default QlikScriptEditor
