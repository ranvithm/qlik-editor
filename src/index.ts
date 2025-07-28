// Main exports for the Qlik Editor library
export { default as QlikScriptEditor } from './components/QlikScriptEditor';
export { default as QlikScriptEditorLayout } from './components/QlikScriptEditorLayout';
export { default as QlikScriptEditorWrapper } from './components/QlikScriptEditorWrapper';
export { default as QlikEditorUI } from './components/QlikEditorUI';
export { default as SimpleQlikEditor } from './components/SimpleQlikEditor';
export { default as LazyQlikScriptEditor } from './components/LazyQlikScriptEditor';

// Language definitions
export { registerQlikLanguage, qlikLanguageDefinition, qlikLanguageConfiguration } from './languages/qlik';

// Types
export interface QlikScriptEditorProps {
  initialScript: string;
  onChange: (value: string) => void;
  variables?: string[];
}

export interface QlikEditorLayoutProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  onRun?: () => void;
  onFormat?: () => void;
  onSave?: () => void;
  onLoad?: () => void;
  className?: string;
  showToolbar?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export interface QlikEditorUIProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  showToolbar?: boolean;
  className?: string;
}

// Version
export const version = '1.0.0';