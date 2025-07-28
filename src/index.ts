// Main exports for the Qlik Editor library
export { default as QlikScriptEditor } from './components/QlikScriptEditor';
export { default as QlikScriptEditorLayoutRefactored } from './components/QlikScriptEditorLayoutRefactored';
export { default as QlikScriptEditorWrapperRefactored } from './components/QlikScriptEditorWrapperRefactored';
export { default as SimpleQlikEditorRefactored } from './components/SimpleQlikEditorRefactored';
export { default as QlikScriptEditorComplete } from './components/QlikScriptEditorComplete';
export { default as QlikEditorDemo } from './components/QlikEditorDemo';

// UI Components
export { default as Header } from './components/ui/Header';
export { default as Toolbar } from './components/ui/Toolbar';
export { default as EditorContainer } from './components/ui/EditorContainer';
export { default as StatusBar } from './components/ui/StatusBar';

// Language definitions
export { registerQlikLanguageRefactored, qlikLanguageDefinitionRefactored, qlikLanguageConfigurationRefactored, QLIK_KEYWORDS, QLIK_FUNCTIONS, ALL_FUNCTIONS } from './languages/qlik-refactored';

// Hooks and utilities
export { useQlikEditor } from './hooks/useQlikEditor';
export { NotificationProvider, useNotification, useNotifications } from './context/NotificationContext';
export * from './utils/editorUtils';

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
  autoSave?: boolean;
  showNotifications?: boolean;
}

// Version
export const version = '1.0.0';