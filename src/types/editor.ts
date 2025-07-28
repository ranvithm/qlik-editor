import type { editor } from 'monaco-editor';

/**
 * Monaco Editor instance methods exposed via ref
 */
export interface QlikScriptEditorRef {
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
export interface QlikEditorTheme {
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
export interface QlikEditorOptions {
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
 * Variable suggestion for autocomplete
 */
export interface VariableSuggestion {
  label: string;
  kind: number;
  insertText: string;
  detail: string;
  documentation: {
    value: string;
  };
  sortText: string;
}

/**
 * Error information
 */
export interface EditorError {
  message: string;
  code?: string;
  stack?: string;
}