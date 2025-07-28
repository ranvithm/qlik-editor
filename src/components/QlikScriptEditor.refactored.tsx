import React, { 
  useRef, 
  useEffect, 
  useCallback, 
  useMemo, 
  memo, 
  forwardRef, 
  useImperativeHandle 
} from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { registerQlikLanguage } from '../languages/qlik';

// ============================
// TYPES AND INTERFACES
// ============================

/**
 * Monaco Editor instance methods exposed via ref
 */
interface QlikScriptEditorRef {
  /** Get the current editor instance */
  getEditor: () => editor.IStandaloneCodeEditor | undefined;
  /** Get the current script content */
  getValue: () => string;
  /** Set the script content programmatically */
  setValue: (value: string) => void;
  /** Focus the editor */
  focus: () => void;
  /** Insert text at current cursor position */
  insertText: (text: string) => void;
}

/**
 * Theme configuration for the editor
 */
interface QlikEditorTheme {
  name: string;
  base: 'vs' | 'vs-dark' | 'hc-black';
  colors: Record<string, string>;
  rules: Array<{
    token: string;
    foreground?: string;
    background?: string;
    fontStyle?: string;
  }>;
}

/**
 * Editor configuration options
 */
interface QlikEditorOptions {
  /** Font size in pixels */
  fontSize?: number;
  /** Enable/disable minimap */
  minimap?: boolean;
  /** Word wrap setting */
  wordWrap?: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
  /** Tab size */
  tabSize?: number;
  /** Show line numbers */
  lineNumbers?: 'on' | 'off' | 'relative' | 'interval';
  /** Enable folding */
  folding?: boolean;
  /** Enable bracket matching */
  matchBrackets?: 'always' | 'near' | 'never';
}

/**
 * Props for the QlikScriptEditor component
 */
export interface QlikScriptEditorProps {
  /** The initial script content */
  initialScript: string;
  /** Callback fired when script content changes */
  onChange: (value: string) => void;
  /** Array of user-defined variable names for autocomplete */
  variables?: string[];
  /** Custom CSS class name */
  className?: string;
  /** Editor height (default: 100%) */
  height?: string | number;
  /** Editor width (default: 100%) */
  width?: string | number;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: string | null;
  /** Disable the editor */
  disabled?: boolean;
  /** Custom theme configuration */
  theme?: Partial<QlikEditorTheme>;
  /** Editor options override */
  options?: Partial<QlikEditorOptions>;
  /** Callback fired when editor is ready */
  onReady?: (editor: editor.IStandaloneCodeEditor) => void;
  /** Callback fired when editor encounters an error */
  onError?: (error: Error) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================
// CONSTANTS AND CONFIGURATION
// ============================

/**
 * Default Qlik dark theme configuration
 */
const DEFAULT_QLIK_THEME: QlikEditorTheme = {
  name: 'qlik-dark',
  base: 'vs-dark',
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
};

/**
 * Default editor options
 */
const DEFAULT_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
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
  codeLens: false,
  lightbulb: { enabled: 'off' }
};

// ============================
// LOADING AND ERROR COMPONENTS
// ============================

/**
 * Loading spinner component
 */
const EditorLoading: React.FC = memo(() => (
  <div className="h-full w-full flex items-center justify-center bg-gray-900 border border-gray-700 rounded-lg">
    <div className="flex flex-col items-center space-y-3">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-gray-300 text-sm">Loading Qlik Script Editor...</span>
    </div>
  </div>
));

EditorLoading.displayName = 'EditorLoading';

/**
 * Error display component
 */
interface EditorErrorProps {
  error: string;
  onRetry?: () => void;
}

const EditorError: React.FC<EditorErrorProps> = memo(({ error, onRetry }) => (
  <div className="h-full w-full flex items-center justify-center bg-gray-900 border border-red-500 rounded-lg">
    <div className="text-center p-6">
      <div className="text-red-400 text-lg font-semibold mb-2">
        Editor Error
      </div>
      <div className="text-gray-400 text-sm mb-4 max-w-md">
        {error}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  </div>
));

EditorError.displayName = 'EditorError';

// ============================
// MAIN COMPONENT
// ============================

/**
 * QlikScriptEditor - A Monaco Editor component specialized for Qlik Sense scripts
 * 
 * Features:
 * - Qlik Sense syntax highlighting and autocomplete
 * - User-defined variable suggestions
 * - Customizable themes and options
 * - Error handling and loading states
 * - Accessibility support
 * - Memory leak prevention
 */
const QlikScriptEditor = memo(forwardRef<QlikScriptEditorRef, QlikScriptEditorProps>(
  ({
    initialScript,
    onChange,
    variables = [],
    className = '',
    height = '100%',
    width = '100%',
    loading = false,
    error = null,
    disabled = false,
    theme,
    options,
    onReady,
    onError,
    'aria-label': ariaLabel = 'Qlik Script Editor',
    'data-testid': testId,
  }, ref) => {
    // ============================
    // REFS AND STATE
    // ============================
    
    const editorRef = useRef<editor.IStandaloneCodeEditor>();
    const completionProviderRef = useRef<editor.IDisposable>();
    const monacoRef = useRef<typeof import('monaco-editor')>();
    const isLanguageRegisteredRef = useRef(false);

    // ============================
    // MEMOIZED VALUES
    // ============================
    
    /**
     * Memoized theme configuration
     */
    const finalTheme = useMemo((): QlikEditorTheme => ({
      ...DEFAULT_QLIK_THEME,
      ...theme,
      colors: {
        ...DEFAULT_QLIK_THEME.colors,
        ...theme?.colors
      },
      rules: theme?.rules || DEFAULT_QLIK_THEME.rules
    }), [theme]);

    /**
     * Memoized editor options
     */
    const finalOptions = useMemo((): editor.IStandaloneEditorConstructionOptions => ({
      ...DEFAULT_EDITOR_OPTIONS,
      ...options,
      theme: finalTheme.name,
      readOnly: disabled,
      minimap: {
        ...DEFAULT_EDITOR_OPTIONS.minimap,
        enabled: options?.minimap ?? true
      }
    }), [options, disabled, finalTheme.name]);

    /**
     * Memoized variable suggestions
     */
    const variableSuggestions = useMemo(() => 
      variables.map(variable => ({
        label: `$(${variable})`,
        kind: 14, // CompletionItemKind.Variable
        insertText: `$(${variable})`,
        detail: 'User Variable',
        documentation: {
          value: `**$(${variable})** - User-defined variable\n\nUse this variable to reference dynamic values in your script.`
        },
        sortText: `0_${variable}`
      })),
      [variables]
    );

    // ============================
    // IMPERATIVE HANDLE
    // ============================
    
    useImperativeHandle(ref, () => ({
      getEditor: () => editorRef.current,
      getValue: () => editorRef.current?.getValue() || '',
      setValue: (value: string) => editorRef.current?.setValue(value),
      focus: () => editorRef.current?.focus(),
      insertText: (text: string) => {
        const editor = editorRef.current;
        if (editor) {
          const selection = editor.getSelection();
          const range = selection || new (monacoRef.current!.Range)(1, 1, 1, 1);
          editor.executeEdits('insertText', [{
            range,
            text,
            forceMoveMarkers: true
          }]);
        }
      }
    }), []);

    // ============================
    // CALLBACK FUNCTIONS
    // ============================
    
    /**
     * Handle Monaco editor mount
     */
    const handleEditorMount: OnMount = useCallback((editor, monaco) => {
      try {
        editorRef.current = editor;
        monacoRef.current = monaco;

        // Register Qlik language only once
        if (!isLanguageRegisteredRef.current) {
          registerQlikLanguage(monaco);
          isLanguageRegisteredRef.current = true;
        }

        // Define and set custom theme
        monaco.editor.defineTheme(finalTheme.name, {
          base: finalTheme.base,
          inherit: true,
          rules: finalTheme.rules,
          colors: finalTheme.colors
        });
        monaco.editor.setTheme(finalTheme.name);

        // Register variable completion provider
        if (variableSuggestions.length > 0) {
          // Dispose previous provider
          completionProviderRef.current?.dispose();
          
          completionProviderRef.current = monaco.languages.registerCompletionItemProvider('qlik', {
            triggerCharacters: ['$'],
            provideCompletionItems: (model, position) => {
              const word = model.getWordUntilPosition(position);
              const lineContent = model.getLineContent(position.lineNumber);
              const textBeforeCursor = lineContent.substring(0, position.column - 1);
              
              // Only show user variables in variable context
              if (textBeforeCursor.includes('$') || word.word.startsWith('$')) {
                return {
                  suggestions: variableSuggestions.map(suggestion => ({
                    ...suggestion,
                    range: {
                      startLineNumber: position.lineNumber,
                      endLineNumber: position.lineNumber,
                      startColumn: word.startColumn,
                      endColumn: word.endColumn
                    }
                  }))
                };
              }

              return { suggestions: [] };
            }
          });
        }

        // Notify parent component
        onReady?.(editor);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize editor');
        onError?.(error);
      }
    }, [finalTheme, variableSuggestions, onReady, onError]);

    /**
     * Handle editor content change
     */
    const handleEditorChange = useCallback((value: string | undefined) => {
      if (value !== undefined) {
        onChange(value);
      }
    }, [onChange]);

    /**
     * Retry handler for error state
     */
    const handleRetry = useCallback(() => {
      // Force re-mount by clearing refs
      completionProviderRef.current?.dispose();
      completionProviderRef.current = undefined;
      isLanguageRegisteredRef.current = false;
    }, []);

    // ============================
    // CLEANUP EFFECT
    // ============================
    
    useEffect(() => {
      return () => {
        // Cleanup completion provider on unmount
        completionProviderRef.current?.dispose();
      };
    }, []);

    // ============================
    // RENDER
    // ============================

    // Show loading state
    if (loading) {
      return <EditorLoading />;
    }

    // Show error state
    if (error) {
      return <EditorError error={error} onRetry={handleRetry} />;
    }

    return (
      <div 
        className={`h-full w-full flex flex-col ${className}`}
        data-testid={testId}
      >
        <div className="flex-1 min-h-0">
          <Editor
            height={height}
            width={width}
            defaultLanguage="qlik"
            defaultValue={initialScript}
            onMount={handleEditorMount}
            onChange={handleEditorChange}
            options={finalOptions}
            className="border border-gray-700 rounded-lg overflow-hidden"
            aria-label={ariaLabel}
          />
        </div>
      </div>
    );
  }
));

QlikScriptEditor.displayName = 'QlikScriptEditor';

export default QlikScriptEditor;