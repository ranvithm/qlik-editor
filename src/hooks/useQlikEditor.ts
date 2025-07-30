import { useState, useRef, useCallback, useEffect } from 'react';
import type { editor } from 'monaco-editor';
import {
  formatQlikScript,
  saveScriptToFile,
  loadScriptFromFile,
  executeQlikScript,
  toggleFullscreen,
  isFullscreenActive,
  formatMonacoEditor,
  validateQlikScript,
  showNotification,
  type ScriptExecutionResult,
  type NotificationOptions
} from '../lib/editorUtils';

export interface UseQlikEditorOptions {
  initialScript?: string;
  autoSave?: boolean;
  autoSaveInterval?: number;
  onScriptChange?: (script: string) => void;
  onExecutionComplete?: (result: ScriptExecutionResult) => void;
  onError?: (error: string) => void;
  showNotifications?: boolean;
}

export interface UseQlikEditorReturn {
  // State
  script: string;
  isRunning: boolean;
  isFullscreen: boolean;
  executionProgress: number;
  executionMessage: string;
  lastExecutionResult: ScriptExecutionResult | null;
  hasUnsavedChanges: boolean;
  
  // Actions
  setScript: (script: string) => void;
  handleRun: () => Promise<void>;
  handleStop: () => void;
  handleFormat: () => void;
  handleSave: () => Promise<void>;
  handleLoad: () => Promise<void>;
  handleToggleFullscreen: () => Promise<void>;
  handleUndo: () => void;
  handleRedo: () => void;
  handleFind: () => void;
  handleReplace: () => void;
  handleInsertInlineData: () => void;
  
  // Editor management
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  setEditorRef: (editor: editor.IStandaloneCodeEditor | null) => void;
  
  // Validation
  validationErrors: Array<{ line: number; message: string; severity: 'error' | 'warning' }>;
  isScriptValid: boolean;
  
}

export function useQlikEditor(options: UseQlikEditorOptions = {}): UseQlikEditorReturn {
  const {
    initialScript = '',
    onScriptChange,
    onExecutionComplete,
    onError,
    showNotifications = true
  } = options;

  // State
  const [script, setScriptState] = useState(initialScript);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [executionMessage, setExecutionMessage] = useState('');
  const [lastExecutionResult, setLastExecutionResult] = useState<ScriptExecutionResult | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Array<{ line: number; message: string; severity: 'error' | 'warning' }>>([]);
  const [isScriptValid, setIsScriptValid] = useState(true);

  // Refs
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const executionControllerRef = useRef<AbortController | null>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedScriptRef = useRef(initialScript);

  // Notification helper
  const notify = useCallback((options: NotificationOptions) => {
    if (showNotifications) {
      showNotification(options);
    }
  }, [showNotifications]);


  // Script setter with validation and change tracking
  const setScript = useCallback((newScript: string) => {
    setScriptState(newScript);
    onScriptChange?.(newScript);
    
    // Track unsaved changes
    setHasUnsavedChanges(newScript !== lastSavedScriptRef.current);
    
    // Validate script
    const validation = validateQlikScript(newScript);
    setValidationErrors(validation.errors);
    setIsScriptValid(validation.isValid);
    
    // Auto-save disabled - settings removed
  }, [onScriptChange]);

  // Monaco editor reference management
  const setEditorRef = useCallback((editor: editor.IStandaloneCodeEditor | null) => {
    editorRef.current = editor;
    
    // Set up editor event listeners
    if (editor) {
      // Listen for content changes
      const disposable = editor.onDidChangeModelContent(() => {
        const newScript = editor.getValue();
        if (newScript !== script) {
          setScript(newScript);
        }
      });
      
      // Clean up on editor disposal
      return () => {
        disposable.dispose();
      };
    }
  }, [script, setScript]);

  // Execute script
  const handleRun = useCallback(async () => {
    if (isRunning || !script.trim()) return;

    // Check for validation errors
    if (!isScriptValid) {
      notify({
        type: 'error',
        title: 'Script Validation Failed',
        message: 'Please fix syntax errors before running the script'
      });
      return;
    }

    setIsRunning(true);
    setExecutionProgress(0);
    setExecutionMessage('Starting execution...');
    
    // Create abort controller for cancellation
    executionControllerRef.current = new AbortController();

    try {
      const result = await executeQlikScript(
        script,
        (progress, message) => {
          setExecutionProgress(progress);
          setExecutionMessage(message);
        }
      );

      setLastExecutionResult(result);
      onExecutionComplete?.(result);

      if (result.success) {
        notify({
          type: 'success',
          title: 'Execution Completed',
          message: `Script executed successfully in ${result.duration}ms. ${result.recordsLoaded} records loaded.`
        });
      } else {
        notify({
          type: 'error',
          title: 'Execution Failed',
          message: `Script execution failed with ${result.errors?.length || 0} errors.`
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      onError?.(errorMessage);
      
      notify({
        type: 'error',
        title: 'Execution Error',
        message: errorMessage
      });
    } finally {
      setIsRunning(false);
      setExecutionProgress(0);
      setExecutionMessage('');
      executionControllerRef.current = null;
    }
  }, [script, isRunning, isScriptValid, onExecutionComplete, onError, notify]);

  // Stop execution
  const handleStop = useCallback(() => {
    if (executionControllerRef.current) {
      executionControllerRef.current.abort();
      executionControllerRef.current = null;
    }
    setIsRunning(false);
    setExecutionProgress(0);
    setExecutionMessage('');
    
    notify({
      type: 'warning',
      title: 'Execution Stopped',
      message: 'Script execution was cancelled by user'
    });
  }, [notify]);

  // Format script
  const handleFormat = useCallback(() => {
    try {
      if (editorRef.current) {
        formatMonacoEditor(editorRef.current);
      } else {
        const formattedScript = formatQlikScript(script);
        setScript(formattedScript);
      }
      
      notify({
        type: 'success',
        title: 'Script Formatted',
        message: 'Script has been formatted successfully'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Formatting failed';
      notify({
        type: 'error',
        title: 'Format Error',
        message: errorMessage
      });
    }
  }, [script, setScript, notify]);

  // Save script
  const handleSave = useCallback(async () => {
    try {
      await saveScriptToFile(script, undefined, true); // User-initiated save
      lastSavedScriptRef.current = script;
      setHasUnsavedChanges(false);
      
      // Clear auto-save timeout
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
        autoSaveTimeoutRef.current = null;
      }
      
      notify({
        type: 'success',
        title: 'Script Saved',
        message: 'Script has been saved successfully'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Save failed';
      notify({
        type: 'error',
        title: 'Save Error',
        message: errorMessage
      });
    }
  }, [script, notify]);

  // Load script
  const handleLoad = useCallback(async () => {
    try {
      const loadedScript = await loadScriptFromFile();
      
      if (loadedScript !== null && loadedScript !== undefined && loadedScript.trim()) {
        setScript(loadedScript);
        lastSavedScriptRef.current = loadedScript;
        setHasUnsavedChanges(false);
        
        notify({
          type: 'success',
          title: 'Script Loaded',
          message: 'Script has been loaded successfully'
        });
      }
      // User cancelled or no file selected - this is not an error, so no notification needed
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Load failed';
      notify({
        type: 'error',
        title: 'Load Error',
        message: errorMessage
      });
    }
  }, [setScript, notify]);

  // Toggle fullscreen
  const handleToggleFullscreen = useCallback(async () => {
    try {
      const success = await toggleFullscreen();
      if (success) {
        const newFullscreenState = isFullscreenActive();
        setIsFullscreen(newFullscreenState);
        
        notify({
          type: 'info',
          title: newFullscreenState ? 'Entered Fullscreen' : 'Exited Fullscreen',
          message: newFullscreenState ? 'Press Esc to exit fullscreen' : 'Fullscreen mode disabled'
        });
      }
    } catch {
      notify({
        type: 'error',
        title: 'Fullscreen Error',
        message: 'Failed to toggle fullscreen mode'
      });
    }
  }, [notify]);

  // Editor actions
  const handleUndo = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.trigger('keyboard', 'undo', null);
    }
  }, []);

  const handleRedo = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.trigger('keyboard', 'redo', null);
    }
  }, []);

  const handleFind = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getAction('actions.find')?.run();
    }
  }, []);

  const handleReplace = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.startFindReplaceAction')?.run();
    }
  }, []);

  // Insert inline data at cursor position
  const handleInsertInlineData = useCallback(() => {
    if (editorRef.current) {
      const position = editorRef.current.getPosition();
      if (position) {
        const inlineDataTemplate = `LOAD * INLINE [
    ID, Name, Category, Price
    1, Product A, Electronics, 299.99
    2, Product B, Books, 19.99
    3, Product C, Clothing, 49.99
    4, Product D, Electronics, 599.99
    5, Product E, Books, 29.99
];`;
        
        editorRef.current.executeEdits('insert-inline-data', [{
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: position.column,
            endColumn: position.column
          },
          text: inlineDataTemplate
        }]);
        
        // Move cursor to end of inserted text
        const lines = inlineDataTemplate.split('\n');
        const lastLine = lines[lines.length - 1];
        editorRef.current.setPosition({
          lineNumber: position.lineNumber + lines.length - 1,
          column: lastLine.length + 1
        });
        
        notify({
          type: 'success',
          title: 'Inline Data Inserted',
          message: 'Sample inline data has been inserted at cursor position'
        });
      }
    }
  }, [notify]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(isFullscreenActive());
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      if (executionControllerRef.current) {
        executionControllerRef.current.abort();
      }
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 's':
            event.preventDefault();
            handleSave();
            break;
          case 'o':
            event.preventDefault();
            handleLoad();
            break;
          case 'i':
            event.preventDefault();
            handleInsertInlineData();
            break;
          case 'r':
            event.preventDefault();
            handleRun();
            break;
          case 'Enter':
            if (event.shiftKey) {
              event.preventDefault();
              handleRun();
            }
            break;
        }
      }
      
      if (event.key === 'F11') {
        event.preventDefault();
        handleToggleFullscreen();
      }
      
      if (event.key === 'Escape') {
        if (isRunning) {
          event.preventDefault();
          handleStop();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, handleLoad, handleInsertInlineData, handleRun, handleToggleFullscreen, handleStop, isRunning]);

  return {
    // State
    script,
    isRunning,
    isFullscreen,
    executionProgress,
    executionMessage,
    lastExecutionResult,
    hasUnsavedChanges,
    validationErrors,
    isScriptValid,
    
    // Actions
    setScript,
    handleRun,
    handleStop,
    handleFormat,
    handleSave,
    handleLoad,
    handleToggleFullscreen,
    handleUndo,
    handleRedo,
    handleFind,
    handleReplace,
    handleInsertInlineData,
    
    // Editor management
    editorRef,
    setEditorRef,
    
  };
}