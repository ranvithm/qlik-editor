// Main exports for the Qlik Editor library
export { default as QlikScriptEditor } from './components/editor/QlikScriptEditor';
export { default as QlikScriptEditorComplete } from './components/editor/QlikScriptEditorComplete';

// UI Components
export { default as Header } from './components/editor/Header';
export { default as Toolbar } from './components/editor/Toolbar';
export { default as EditorContainer } from './components/editor/EditorContainer';
export { default as StatusBar } from './components/editor/StatusBar';
export { ModeToggle } from './components/editor/mode-toggle';

// Theme components
export { ThemeProvider, useTheme } from './components/editor/theme-provider';

// Language definitions
export { registerQlikLanguageRefactored, qlikLanguageDefinitionRefactored, qlikLanguageConfigurationRefactored, QLIK_KEYWORDS, QLIK_FUNCTIONS, ALL_FUNCTIONS } from './languages/qlik-refactored';

// Hooks and utilities
export { useQlikEditor } from './hooks/useQlikEditor';
export * from './lib/editorUtils';

// Types
export interface QlikScriptEditorProps {
  initialScript: string;
  onChange: (value: string) => void;
  variables?: string[];
}


export interface QlikScriptEditorCompleteProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  className?: string;
  title?: string;
  subtitle?: string;
}

// Version
export const version = '1.0.0';