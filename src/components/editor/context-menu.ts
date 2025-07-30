import type { editor } from 'monaco-editor';

/**
 * Context menu configuration for Monaco editor
 * Handles filtering out unwanted actions and adding custom Qlik-specific actions
 */

interface ContextMenuAction {
  id: string;
  label: string;
  contextMenuGroupId?: string;
  contextMenuOrder?: number;
  keybindings?: number[];
  run: (editor: editor.IStandaloneCodeEditor) => void;
}

/**
 * List of Monaco actions to block from appearing in context menu
 */
const BLOCKED_ACTIONS = [
  'editor.action.changeAll',
  'editor.action.selectAllMatches', 
  'editor.action.changeAllMatches',
  'editor.action.quickCommand',
  'editor.action.quickCommandCenter',
  'editor.action.quickOutline',
  'editor.action.selectAllOccurrences',
  'editor.action.addSelectionToNextFindMatch',
  'editor.action.selectHighlights',
  'workbench.action.showCommands'
];

/**
 * Text patterns in action labels to block (case-insensitive)
 */
const BLOCKED_LABEL_PATTERNS = [
  'change all',
  'command palette',
  'select all occurrences',
  'change all occurrences'
];

/**
 * Custom Qlik-specific context menu actions
 */
const CUSTOM_QLIK_ACTIONS: ContextMenuAction[] = [
  {
    id: 'qlik.insertLoadStatement',
    label: 'Insert LOAD Statement',
    contextMenuGroupId: 'qlik',
    contextMenuOrder: 1,
    run: (editor) => {
      const selection = editor.getSelection();
      if (selection) {
        const loadTemplate = `LOAD\n    Field1,\n    Field2,\n    Field3\nFROM [DataSource.qvd] (qvd);`;
        editor.executeEdits('insert-load', [{
          range: selection,
          text: loadTemplate
        }]);
      }
    }
  },
  {
    id: 'qlik.insertSet',
    label: 'Insert SET Variable',
    contextMenuGroupId: 'qlik',
    contextMenuOrder: 2,
    run: (editor) => {
      const selection = editor.getSelection();
      if (selection) {
        const setTemplate = `SET vVariableName = 'VariableValue';`;
        editor.executeEdits('insert-set', [{
          range: selection,
          text: setTemplate
        }]);
      }
    }
  }
];

/**
 * Filters out unwanted actions from context menu
 */
function filterContextMenuActions(actions: any[]): any[] {
  return actions.filter((action: any) => {
    if (!action || !action.id) return true;
    
    // Block specific actions by ID
    if (BLOCKED_ACTIONS.includes(action.id)) return false;
    
    // Block actions that contain specific text in label (case insensitive)
    if (action.label) {
      const label = action.label.toLowerCase();
      if (BLOCKED_LABEL_PATTERNS.some(pattern => label.includes(pattern))) {
        return false;
      }
    }
    
    // Debug: Log all actions to console (can be removed later)
    if (action.id && action.label) {
      console.log('Context menu action:', action.id, '-', action.label);
    }
    
    return true;
  });
}

/**
 * Disables unwanted actions directly at the editor level
 */
function disableUnwantedActions(editor: editor.IStandaloneCodeEditor): void {
  BLOCKED_ACTIONS.forEach(actionId => {
    try {
      const action = editor.getAction(actionId);
      if (action) {
        // Disable the action completely
        (action as any).isSupported = () => false;
        (action as any).enabled = false;
      }
    } catch (e) {
      // Action might not exist, ignore
    }
  });
}

/**
 * Adds custom Qlik-specific actions to the editor
 */
function addCustomActions(editor: editor.IStandaloneCodeEditor): void {
  CUSTOM_QLIK_ACTIONS.forEach(actionConfig => {
    editor.addAction({
      id: actionConfig.id,
      label: actionConfig.label,
      contextMenuGroupId: actionConfig.contextMenuGroupId,
      contextMenuOrder: actionConfig.contextMenuOrder,
      keybindings: actionConfig.keybindings,
      run: () => actionConfig.run(editor)
    });
  });
}

/**
 * Sets up context menu filtering and custom actions for Monaco editor
 */
export function setupEditorContextMenu(
  editor: editor.IStandaloneCodeEditor, 
  monaco: typeof import('monaco-editor')
): void {
  // Override the context menu to remove unwanted items
  const originalContextMenuService = (editor as any)._contextMenuService;
  if (originalContextMenuService) {
    const originalShowContextMenu = originalContextMenuService.showContextMenu;
    originalContextMenuService.showContextMenu = function(delegate: any, ...args: any[]) {
      // Filter out unwanted menu items
      if (delegate && delegate.getActions) {
        const originalGetActions = delegate.getActions;
        delegate.getActions = function() {
          const actions = originalGetActions.call(this);
          return filterContextMenuActions(actions);
        };
      }
      return originalShowContextMenu.call(this, delegate, ...args);
    };
  }

  // Disable unwanted actions directly
  const disableActions = () => {
    disableUnwantedActions(editor);
  };
  
  // Apply disabling after a short delay to ensure all actions are loaded
  setTimeout(disableActions, 100);

  // Add custom Qlik-specific actions
  addCustomActions(editor);
}

/**
 * Configuration object for easy customization
 */
export const ContextMenuConfig = {
  blockedActions: BLOCKED_ACTIONS,
  blockedLabelPatterns: BLOCKED_LABEL_PATTERNS,
  customActions: CUSTOM_QLIK_ACTIONS,
  
  /**
   * Add a new blocked action ID
   */
  addBlockedAction(actionId: string): void {
    if (!BLOCKED_ACTIONS.includes(actionId)) {
      BLOCKED_ACTIONS.push(actionId);
    }
  },
  
  /**
   * Add a new blocked label pattern
   */
  addBlockedLabelPattern(pattern: string): void {
    if (!BLOCKED_LABEL_PATTERNS.includes(pattern.toLowerCase())) {
      BLOCKED_LABEL_PATTERNS.push(pattern.toLowerCase());
    }
  },
  
  /**
   * Add a new custom action
   */
  addCustomAction(action: ContextMenuAction): void {
    CUSTOM_QLIK_ACTIONS.push(action);
  }
};