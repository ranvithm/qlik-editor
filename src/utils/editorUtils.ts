import type { editor } from 'monaco-editor';

// Type definitions for File System Access API
interface FileSystemFileHandle {
  createWritable(): Promise<FileSystemWritableFileStream>;
}

interface FileSystemWritableFileStream {
  write(data: string): Promise<void>;
  close(): Promise<void>;
}

interface FilePickerOptions {
  suggestedName?: string;
  types?: Array<{
    description: string;
    accept: Record<string, string[]>;
  }>;
}

declare global {
  interface Window {
    showSaveFilePicker(options?: FilePickerOptions): Promise<FileSystemFileHandle>;
    showOpenFilePicker(options?: FilePickerOptions): Promise<FileSystemFileHandle[]>;
  }

  interface HTMLElement {
    webkitRequestFullscreen?(): Promise<void>;
    msRequestFullscreen?(): Promise<void>;
    mozRequestFullScreen?(): Promise<void>;
  }

  interface Document {
    webkitExitFullscreen?(): Promise<void>;
    msExitFullscreen?(): Promise<void>;
    mozCancelFullScreen?(): Promise<void>;
    webkitFullscreenElement?: Element | null;
    msFullscreenElement?: Element | null;
    mozFullScreenElement?: Element | null;
  }
}

// ============================
// SCRIPT FORMATTING UTILITIES
// ============================

/**
 * Format Qlik script with proper indentation and spacing
 */
export function formatQlikScript(script: string): string {
  if (!script.trim()) return script;

  const lines = script.split('\n');
  const formattedLines: string[] = [];
  let indentLevel = 0;
  let inComment = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      formattedLines.push('');
      continue;
    }

    // Handle block comments
    if (line.startsWith('/*')) {
      inComment = true;
    }
    if (line.endsWith('*/')) {
      inComment = false;
      formattedLines.push('  '.repeat(indentLevel) + line);
      continue;
    }
    if (inComment) {
      formattedLines.push('  '.repeat(indentLevel) + line);
      continue;
    }

    // Handle line comments
    if (line.startsWith('//') || line.toUpperCase().startsWith('REM ')) {
      formattedLines.push('  '.repeat(indentLevel) + line);
      continue;
    }

    // Keywords that decrease indentation
    const decreaseIndentKeywords = [
      'ENDIF', 'ENDSWITCH', 'ENDSUB', 'NEXT', 'ELSE', 'ELSEIF'
    ];
    
    // Keywords that increase indentation
    const increaseIndentKeywords = [
      'IF', 'FOR', 'WHILE', 'DO', 'SUB', 'SWITCH', 'CASE'
    ];

    const upperLine = line.toUpperCase();
    
    // Decrease indent for closing keywords
    if (decreaseIndentKeywords.some(keyword => upperLine.startsWith(keyword))) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Format different statement types
    if (upperLine.startsWith('LOAD')) {
      formattedLines.push('  '.repeat(indentLevel) + formatLoadStatement(line));
    } else if (upperLine.startsWith('SELECT')) {
      formattedLines.push('  '.repeat(indentLevel) + formatSelectStatement(line));
    } else if (upperLine.includes('JOIN')) {
      formattedLines.push('  '.repeat(indentLevel) + line);
    } else {
      formattedLines.push('  '.repeat(indentLevel) + line);
    }

    // Increase indent for opening keywords
    if (increaseIndentKeywords.some(keyword => upperLine.startsWith(keyword))) {
      indentLevel++;
    }
    
    // Special handling for ELSE (decrease then increase)
    if (upperLine.startsWith('ELSE') && !upperLine.startsWith('ELSEIF')) {
      indentLevel++;
    }
  }

  return formattedLines.join('\n');
}

function formatLoadStatement(line: string): string {
  // Basic LOAD statement formatting
  if (line.toUpperCase().startsWith('LOAD')) {
    return line.replace(/,\s*/g, ',\n    ');
  }
  return line;
}

function formatSelectStatement(line: string): string {
  // Basic SELECT statement formatting
  if (line.toUpperCase().startsWith('SELECT')) {
    return line.replace(/,\s*/g, ',\n    ');
  }
  return line;
}

// ============================
// FILE OPERATIONS
// ============================

/**
 * Save script to local file
 */
export async function saveScriptToFile(script: string, filename?: string): Promise<void> {
  const actualFilename = filename || `qlik-script-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.qvs`;
  
  try {
    // Check if we're in a browser environment that supports File System Access API
    if ('showSaveFilePicker' in window) {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: actualFilename,
        types: [
          {
            description: 'Qlik Script files',
            accept: {
              'text/plain': ['.qvs', '.txt']
            }
          }
        ]
      });
      
      const writable = await fileHandle.createWritable();
      await writable.write(script);
      await writable.close();
    } else {
      // Fallback to download
      downloadScript(script, actualFilename);
    }
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('Failed to save file:', error);
      // Fallback to download
      downloadScript(script, actualFilename);
    }
  }
}

/**
 * Download script as file (fallback method)
 */
export function downloadScript(script: string, filename: string): void {
  const blob = new Blob([script], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Load script from file
 */
export async function loadScriptFromFile(): Promise<string | null> {
  try {
    // Check if we're in a browser environment that supports File System Access API
    if ('showOpenFilePicker' in window) {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'Qlik Script files',
            accept: {
              'text/plain': ['.qvs', '.txt', '.sql']
            }
          }
        ],
        multiple: false
      });
      
      const file = await fileHandle.getFile();
      return await file.text();
    } else {
      // Fallback to input file
      return await loadScriptViaInput();
    }
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('Failed to load file:', error);
    }
    return null;
  }
}

/**
 * Load script via file input (fallback method)
 */
export function loadScriptViaInput(): Promise<string | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.qvs,.txt,.sql';
    input.style.display = 'none';
    
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const text = await file.text();
          resolve(text);
        } catch (error) {
          console.error('Failed to read file:', error);
          resolve(null);
        }
      } else {
        resolve(null);
      }
      document.body.removeChild(input);
    };
    
    input.oncancel = () => {
      resolve(null);
      document.body.removeChild(input);
    };
    
    document.body.appendChild(input);
    input.click();
  });
}

// ============================
// SCRIPT EXECUTION SIMULATION
// ============================

export interface ScriptExecutionResult {
  success: boolean;
  duration: number;
  errors?: string[];
  warnings?: string[];
  recordsLoaded?: number;
  tablesCreated?: string[];
}

/**
 * Simulate Qlik script execution with realistic feedback
 */
export async function executeQlikScript(
  script: string,
  onProgress?: (progress: number, message: string) => void
): Promise<ScriptExecutionResult> {
  const startTime = Date.now();
  
  // Simulate execution phases
  const phases = [
    { name: 'Parsing script', duration: 200 },
    { name: 'Loading data sources', duration: 500 },
    { name: 'Processing transformations', duration: 800 },
    { name: 'Creating associations', duration: 300 },
    { name: 'Finalizing data model', duration: 200 }
  ];
  
  let totalProgress = 0;
  const progressIncrement = 100 / phases.length;
  
  for (const phase of phases) {
    onProgress?.(totalProgress, phase.name);
    await new Promise(resolve => setTimeout(resolve, phase.duration));
    totalProgress += progressIncrement;
  }
  
  // Analyze script for feedback
  const analysis = analyzeScript(script);
  const duration = Date.now() - startTime;
  
  onProgress?.(100, 'Execution completed');
  
  return {
    success: analysis.errors.length === 0,
    duration,
    errors: analysis.errors,
    warnings: analysis.warnings,
    recordsLoaded: Math.floor(Math.random() * 10000) + 1000,
    tablesCreated: analysis.tables
  };
}

function analyzeScript(script: string): {
  errors: string[];
  warnings: string[];
  tables: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const tables: string[] = [];
  
  const lines = script.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim().toUpperCase();
    const lineNum = i + 1;
    
    // Check for common syntax errors
    if (line.startsWith('LOAD') && !line.includes('FROM') && !line.includes('RESIDENT') && !line.includes('INLINE')) {
      if (i === lines.length - 1 || !lines.slice(i + 1).some(l => l.trim().toUpperCase().includes('FROM'))) {
        errors.push(`Line ${lineNum}: LOAD statement missing FROM clause`);
      }
    }
    
    // Check for unmatched IF/ENDIF
    if (line.startsWith('IF ') && !script.toUpperCase().includes('ENDIF')) {
      warnings.push(`Line ${lineNum}: IF statement without matching ENDIF`);
    }
    
    // Extract table names
    const loadMatch = line.match(/LOAD.*FROM\s+\[?([^\];\s]+)\]?/);
    if (loadMatch) {
      tables.push(loadMatch[1]);
    }
  }
  
  return { errors, warnings, tables };
}

// ============================
// FULLSCREEN UTILITIES
// ============================

/**
 * Enter fullscreen mode
 */
export async function enterFullscreen(element?: HTMLElement): Promise<boolean> {
  const targetElement = element || document.documentElement;
  
  try {
    if (targetElement.requestFullscreen) {
      await targetElement.requestFullscreen();
    } else if (targetElement.webkitRequestFullscreen) {
      await targetElement.webkitRequestFullscreen();
    } else if (targetElement.msRequestFullscreen) {
      await targetElement.msRequestFullscreen();
    } else if (targetElement.mozRequestFullScreen) {
      await targetElement.mozRequestFullScreen();
    }
    return true;
  } catch (error) {
    console.error('Failed to enter fullscreen:', error);
    return false;
  }
}

/**
 * Exit fullscreen mode
 */
export async function exitFullscreen(): Promise<boolean> {
  try {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      await document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      await document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      await document.mozCancelFullScreen();
    }
    return true;
  } catch (error) {
    console.error('Failed to exit fullscreen:', error);
    return false;
  }
}

/**
 * Check if currently in fullscreen mode
 */
export function isFullscreenActive(): boolean {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement
  );
}

/**
 * Toggle fullscreen mode
 */
export async function toggleFullscreen(element?: HTMLElement): Promise<boolean> {
  if (isFullscreenActive()) {
    return await exitFullscreen();
  } else {
    return await enterFullscreen(element);
  }
}

// ============================
// MONACO EDITOR UTILITIES
// ============================

/**
 * Apply formatting to Monaco editor
 */
export function formatMonacoEditor(editor: editor.IStandaloneCodeEditor): void {
  const model = editor.getModel();
  if (!model) return;
  
  const script = model.getValue();
  const formattedScript = formatQlikScript(script);
  
  // Use Monaco's edit operation to maintain undo history
  editor.executeEdits('format', [{
    range: model.getFullModelRange(),
    text: formattedScript
  }]);
  
  // Trigger formatting action
  editor.getAction('editor.action.formatDocument')?.run();
}

/**
 * Insert code snippet into Monaco editor
 */
export function insertSnippet(editor: editor.IStandaloneCodeEditor, snippet: string): void {
  const selection = editor.getSelection();
  if (!selection) return;
  
  editor.executeEdits('insert-snippet', [{
    range: selection,
    text: snippet
  }]);
  
  editor.focus();
}

/**
 * Get selected text or current line
 */
export function getSelectedTextOrLine(editor: editor.IStandaloneCodeEditor): string {
  const model = editor.getModel();
  const selection = editor.getSelection();
  
  if (!model || !selection) return '';
  
  if (selection.isEmpty()) {
    // Return current line if no selection
    const lineNumber = selection.positionLineNumber;
    return model.getLineContent(lineNumber);
  } else {
    // Return selected text
    return model.getValueInRange(selection);
  }
}

// ============================
// VALIDATION UTILITIES
// ============================

/**
 * Validate Qlik script syntax
 */
export function validateQlikScript(script: string): {
  isValid: boolean;
  errors: Array<{ line: number; message: string; severity: 'error' | 'warning' }>;
} {
  const errors: Array<{ line: number; message: string; severity: 'error' | 'warning' }> = [];
  const lines = script.split('\n');
  
  let ifCount = 0;
  let forCount = 0;
  let subCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim().toUpperCase();
    const lineNum = i + 1;
    
    // Check control flow balance
    if (line.startsWith('IF ')) ifCount++;
    if (line.startsWith('ENDIF')) ifCount--;
    if (line.startsWith('FOR ')) forCount++;
    if (line.startsWith('NEXT')) forCount--;
    if (line.startsWith('SUB ')) subCount++;
    if (line.startsWith('ENDSUB')) subCount--;
    
    // Check for unbalanced structures at end
    if (i === lines.length - 1) {
      if (ifCount > 0) {
        errors.push({ line: lineNum, message: 'Unmatched IF statement(s)', severity: 'error' });
      }
      if (forCount > 0) {
        errors.push({ line: lineNum, message: 'Unmatched FOR loop(s)', severity: 'error' });
      }
      if (subCount > 0) {
        errors.push({ line: lineNum, message: 'Unmatched SUB routine(s)', severity: 'error' });
      }
    }
    
    // Check for common syntax issues
    if (line.includes('=') && !line.includes('LET') && !line.includes('SET') && !line.includes('WHERE')) {
      if (!line.includes('==') && !line.includes('<=') && !line.includes('>=') && !line.includes('!=')) {
        errors.push({ line: lineNum, message: 'Assignment should use LET or SET', severity: 'warning' });
      }
    }
  }
  
  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors
  };
}

// ============================
// NOTIFICATION UTILITIES
// ============================

export interface NotificationOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

// Global notification handler - will be set by the notification provider
let globalNotificationHandler: ((options: NotificationOptions) => void) | null = null;

/**
 * Set the global notification handler
 */
export function setNotificationHandler(handler: (options: NotificationOptions) => void): void {
  globalNotificationHandler = handler;
}

/**
 * Show toast notification
 */
export function showNotification(options: NotificationOptions): void {
  if (globalNotificationHandler) {
    globalNotificationHandler(options);
  } else {
    // Fallback to console logging
    console.log(`[${options.type.toUpperCase()}] ${options.title}: ${options.message}`);
  }
}