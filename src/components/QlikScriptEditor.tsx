import React, { useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { registerQlikLanguageRefactored } from '../languages/qlik-refactored';

interface QlikScriptEditorProps {
  initialScript: string;
  onChange: (value: string) => void;
  variables?: string[];
  onMount?: (editor: editor.IStandaloneCodeEditor) => void;
}

const QlikScriptEditor: React.FC<QlikScriptEditorProps> = ({
  initialScript,
  onChange,
  variables = [],
  onMount
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    editorRef.current = editor;

    // Register the comprehensive Qlik language definition
    registerQlikLanguageRefactored(monaco);

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

    // Configure editor theme
    monaco.editor.defineTheme('qlik-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '4FC3F7', fontStyle: 'bold' },
        { token: 'function', foreground: 'A5D6A7' },
        { token: 'variable', foreground: 'FFB74D' },
        { token: 'string', foreground: 'F8BBD0' },
        { token: 'field', foreground: 'CE93D8' },
        { token: 'comment', foreground: '75715E', fontStyle: 'italic' },
        { token: 'number', foreground: 'AED581' }
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41',
        'editorIndentGuide.background': '#404040',
        'editorIndentGuide.activeBackground': '#707070',
        'editor.selectionHighlightBackground': '#ADD6FF26'
      }
    });

    monaco.editor.setTheme('qlik-dark');
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          defaultLanguage="qlik"
          defaultValue={initialScript}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          options={{
            theme: 'qlik-dark',
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
          className="border border-gray-700 rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
};

export default QlikScriptEditor;