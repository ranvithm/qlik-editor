import React, { 
  useRef, 
  useEffect, 
  useCallback, 
  useMemo, 
  memo 
} from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { registerQlikLanguage } from '../languages/qlik';
import { 
  createQlikAutocomplete, 
  variableNamesToQlikVariables,
  type QlikVariable,
  type AutocompleteConfig 
} from '../languages/qlik-autocomplete';

// ============================
// TYPES AND INTERFACES
// ============================

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
  /** Enhanced variable definitions (takes precedence over variables) */
  variableDefinitions?: QlikVariable[];
  /** Custom CSS class name */
  className?: string;
  /** Editor height (default: 100%) */
  height?: string | number;
  /** Editor width (default: 100%) */
  width?: string | number;
  /** Disable the editor */
  disabled?: boolean;
  /** Autocomplete configuration */
  autocompleteConfig?: Partial<AutocompleteConfig>;
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
// MAIN COMPONENT
// ============================

/**
 * QlikScriptEditor - A Monaco Editor component specialized for Qlik Sense scripts
 * 
 * Features:
 * - Comprehensive Qlik Sense syntax highlighting and autocomplete
 * - User-defined variable suggestions with rich documentation
 * - Performance-optimized with proper memory management
 * - Highly configurable and testable
 * - TypeScript-first with full type safety
 */
const QlikScriptEditor = memo<QlikScriptEditorProps>(({
  initialScript,
  onChange,
  variables = [],
  variableDefinitions,
  className = '',
  height = '100%',
  width = '100%',
  disabled = false,
  autocompleteConfig = {},
  onReady,
  onError,
  'aria-label': ariaLabel = 'Qlik Script Editor',
  'data-testid': testId,
}) => {
  // ============================
  // REFS AND STATE
  // ============================
  
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const autocompleteProviderRef = useRef<ReturnType<typeof createQlikAutocomplete>>();
  const isLanguageRegisteredRef = useRef(false);

  // ============================
  // MEMOIZED VALUES
  // ============================
  
  /**
   * Memoized variable definitions for autocomplete
   */
  const finalVariableDefinitions = useMemo((): QlikVariable[] => {
    // Use provided variableDefinitions if available, otherwise convert variable names
    if (variableDefinitions) {
      return variableDefinitions;
    }
    
    if (variables.length > 0) {
      return variableNamesToQlikVariables(variables);
    }
    
    return [];
  }, [variables, variableDefinitions]);

  /**
   * Memoized autocomplete configuration
   */
  const finalAutocompleteConfig = useMemo((): Partial<AutocompleteConfig> => ({
    enableKeywords: true,
    enableFunctions: true,
    enableVariables: true,
    enableFields: true,
    enableSnippets: true,
    maxSuggestions: 50,
    enableFuzzyMatch: true,
    minCharsForSuggestion: 0,
    ...autocompleteConfig
  }), [autocompleteConfig]);

  /**
   * Memoized editor options
   */
  const editorOptions = useMemo((): editor.IStandaloneEditorConstructionOptions => ({
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
    readOnly: disabled,
    guides: {
      bracketPairs: true,
      indentation: true
    },
    suggest: {
      showKeywords: finalAutocompleteConfig.enableKeywords,
      showSnippets: finalAutocompleteConfig.enableSnippets,
      showFunctions: finalAutocompleteConfig.enableFunctions,
      showVariables: finalAutocompleteConfig.enableVariables,
      maxVisibleSuggestions: finalAutocompleteConfig.maxSuggestions || 12
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
  }), [disabled, finalAutocompleteConfig]);

  // ============================
  // CALLBACK FUNCTIONS
  // ============================
  
  /**
   * Handle Monaco editor mount with proper error handling and cleanup
   */
  const handleEditorMount: OnMount = useCallback((editor, monaco) => {
    try {
      editorRef.current = editor;

      // Register Qlik language only once
      if (!isLanguageRegisteredRef.current) {
        registerQlikLanguage(monaco);
        isLanguageRegisteredRef.current = true;
      }

      // Dispose previous autocomplete provider
      autocompleteProviderRef.current?.dispose();

      // Create and register new autocomplete provider
      autocompleteProviderRef.current = createQlikAutocomplete(
        finalVariableDefinitions,
        finalAutocompleteConfig
      );
      
      autocompleteProviderRef.current.register(monaco);

      // Notify parent component
      onReady?.(editor);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to initialize editor');
      console.error('QlikScriptEditor mount error:', error);
      onError?.(error);
    }
  }, [finalVariableDefinitions, finalAutocompleteConfig, onReady, onError]);

  /**
   * Handle editor content change with proper type checking
   */
  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  }, [onChange]);

  // ============================
  // EFFECTS
  // ============================
  
  /**
   * Update autocomplete provider when variables change
   */
  useEffect(() => {
    if (autocompleteProviderRef.current) {
      autocompleteProviderRef.current.setUserVariables(finalVariableDefinitions);
    }
  }, [finalVariableDefinitions]);

  /**
   * Update autocomplete configuration when config changes
   */
  useEffect(() => {
    if (autocompleteProviderRef.current) {
      autocompleteProviderRef.current.updateConfig(finalAutocompleteConfig);
    }
  }, [finalAutocompleteConfig]);

  /**
   * Cleanup effect - dispose autocomplete provider on unmount
   */
  useEffect(() => {
    return () => {
      autocompleteProviderRef.current?.dispose();
    };
  }, []);

  // ============================
  // RENDER
  // ============================

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
          options={editorOptions}
          className="border border-gray-700 rounded-lg overflow-hidden"
          aria-label={ariaLabel}
        />
      </div>
    </div>
  );
});

QlikScriptEditor.displayName = 'QlikScriptEditor';

export default QlikScriptEditor;