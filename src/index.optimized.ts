// Main exports for the Qlik Script Editor library
export { default as QlikScriptEditor } from './components/editor/QlikScriptEditor';
export { default as QlikScriptEditorComplete } from './components/editor/QlikScriptEditorComplete';

// Individual UI Components for granular imports
export { default as Header } from './components/editor/Header';
export { default as Toolbar } from './components/editor/Toolbar';
export { default as EditorContainer } from './components/editor/EditorContainer';
export { default as StatusBar } from './components/editor/StatusBar';
export { ModeToggle } from './components/editor/mode-toggle';

// Theme components
export { ThemeProvider, useTheme } from './components/editor/theme-provider';

// Language definitions and utilities
export { 
  registerQlikLanguageRefactored, 
  qlikLanguageDefinitionRefactored, 
  qlikLanguageConfigurationRefactored, 
  QLIK_KEYWORDS, 
  QLIK_FUNCTIONS, 
  ALL_FUNCTIONS 
} from './languages/qlik-refactored';

// Hooks and utilities
export { useQlikEditor } from './hooks/useQlikEditor';
export type { UseQlikEditorOptions, UseQlikEditorReturn } from './hooks/useQlikEditor';

// Editor utilities
export * from './lib/editorUtils';

// Utility functions
export { cn } from './lib/utils';

// Context menu utilities
export { setupEditorContextMenu, ContextMenuConfig } from './components/editor/context-menu';

// Design system exports
export { designTokens, componentVariants, a11y, animations } from './components/editor/design-system';

// Re-export commonly used UI components for convenience
export { Button, buttonVariants } from './components/ui/button';
export { Badge, badgeVariants } from './components/ui/badge';
export { Alert, AlertTitle, AlertDescription } from './components/ui/alert';
export { Progress } from './components/ui/progress';
export { Separator } from './components/ui/separator';
export { Toaster } from './components/ui/sonner';

// Dropdown menu components
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './components/ui/dropdown-menu';

// TypeScript interfaces and types
export interface QlikScriptEditorProps {
  initialScript: string;
  onChange: (value: string) => void;
  variables?: string[];
  onMount?: (editor: import('monaco-editor').editor.IStandaloneCodeEditor) => void;
  className?: string;
  containerClassName?: string;
  editorClassName?: string;
}

export interface QlikScriptEditorCompleteProps {
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

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  variablesCount?: number;
  scriptStats?: {
    lines: number;
    characters: number;
  };
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  className?: string;
}

export interface ToolbarProps {
  buttons?: Array<{
    icon: React.ComponentType<any>;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "ghost";
    shortcut?: string;
    loading?: boolean;
    group?: "primary" | "secondary" | "settings";
  }>;
  isRunning?: boolean;
  onRun?: () => void;
  onStop?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onFormat?: () => void;
  onSave?: () => void;
  onLoad?: () => void;
  onSettings?: () => void;
  onInsertInlineData?: () => void;
  className?: string;
}

export interface StatusBarProps {
  scriptStats?: {
    lines: number;
    characters: number;
    currentLine?: number;
    currentColumn?: number;
  };
  encoding?: string;
  language?: string;
  isRunning?: boolean;
  className?: string;
}

export interface EditorContainerProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  headerProps?: {
    filename?: string;
    language?: string;
    showControls?: boolean;
    className?: string;
  };
  headerClassName?: string;
  contentClassName?: string;
}

// Additional utility types
export interface QlikScriptValidationResult {
  isValid: boolean;
  errors: Array<{
    line: number;
    column: number;
    message: string;
    severity: 'error' | 'warning' | 'info';
  }>;
  warnings: Array<{
    line: number;
    column: number;
    message: string;
  }>;
}

export interface ScriptExecutionResult {
  success: boolean;
  executionTime: number;
  output?: string;
  error?: string;
  warnings?: string[];
}

export interface NotificationOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Version
export const version = '1.0.2';