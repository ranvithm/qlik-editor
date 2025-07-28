/**
 * Qlik Script Editor Autocomplete System
 * 
 * Provides comprehensive, performant autocomplete for Qlik Sense scripts
 * Handles keywords, functions, variables, fields, and code snippets
 */

import type { languages, editor, IRange } from 'monaco-editor';

// ============================
// TYPES AND INTERFACES
// ============================

/**
 * Context information for autocomplete
 */
interface CompletionContext {
  lineContent: string;
  textBeforeCursor: string;
  textAfterCursor: string;
  currentWord: string;
  isInString: boolean;
  isInComment: boolean;
  isInVariable: boolean;
  isInField: boolean;
  isInFunction: boolean;
}

/**
 * Completion item with enhanced properties
 */
interface QlikCompletionItem extends languages.CompletionItem {
  priority: number;
  category: 'keyword' | 'function' | 'variable' | 'field' | 'snippet' | 'operator';
  description?: string;
  example?: string;
  deprecated?: boolean;
}

/**
 * Variable definition for user-defined variables
 */
export interface QlikVariable {
  name: string;
  description?: string;
  type?: 'string' | 'number' | 'date' | 'boolean';
  example?: string;
  deprecated?: boolean;
}

/**
 * Configuration for autocomplete behavior
 */
export interface AutocompleteConfig {
  /** Enable keyword suggestions */
  enableKeywords?: boolean;
  /** Enable function suggestions */
  enableFunctions?: boolean;
  /** Enable variable suggestions */
  enableVariables?: boolean;
  /** Enable field suggestions */
  enableFields?: boolean;
  /** Enable code snippets */
  enableSnippets?: boolean;
  /** Maximum number of suggestions to show */
  maxSuggestions?: number;
  /** Enable fuzzy matching */
  enableFuzzyMatch?: boolean;
  /** Minimum characters before showing suggestions */
  minCharsForSuggestion?: number;
}

// ============================
// CONSTANTS AND DATA
// ============================

/**
 * Qlik keywords with detailed information
 */
const QLIK_KEYWORDS: QlikCompletionItem[] = [
  // Data Loading Keywords (High Priority)
  {
    label: 'LOAD',
    kind: 14, // CompletionItemKind.Keyword
    insertText: 'LOAD',
    detail: 'Data Loading Statement',
    documentation: { value: '**LOAD** - Loads data from a source into a Qlik table\n\n```qlik\nLOAD CustomerID, CustomerName\nFROM DataSource;\n```' },
    priority: 10,
    category: 'keyword'
  },
  {
    label: 'SELECT',
    kind: 14,
    insertText: 'SELECT',
    detail: 'SQL SELECT Statement',
    documentation: { value: '**SELECT** - SQL SELECT statement for ODBC/OLEDB sources\n\n```qlik\nSELECT * FROM TableName;\n```' },
    priority: 9,
    category: 'keyword'
  },
  {
    label: 'FROM',
    kind: 14,
    insertText: 'FROM',
    detail: 'Data Source Specification',
    documentation: { value: '**FROM** - Specifies the data source location\n\n```qlik\nFROM [lib://DataFiles/file.xlsx];\n```' },
    priority: 9,
    category: 'keyword'
  },
  {
    label: 'WHERE',
    kind: 14,
    insertText: 'WHERE',
    detail: 'Filter Condition',
    documentation: { value: '**WHERE** - Filters records based on conditions\n\n```qlik\nWHERE Year(OrderDate) = 2023;\n```' },
    priority: 8,
    category: 'keyword'
  },
  
  // Join Keywords
  {
    label: 'JOIN',
    kind: 14,
    insertText: 'JOIN',
    detail: 'Table Join Operation',
    documentation: { value: '**JOIN** - Combines data from two tables\n\n```qlik\nJOIN (TableA)\nLOAD * FROM TableB;\n```' },
    priority: 8,
    category: 'keyword'
  },
  {
    label: 'LEFT JOIN',
    kind: 14,
    insertText: 'LEFT JOIN',
    detail: 'Left Outer Join',
    documentation: { value: '**LEFT JOIN** - Keeps all records from left table\n\n```qlik\nLEFT JOIN (MainTable)\nLOAD * FROM LookupTable;\n```' },
    priority: 7,
    category: 'keyword'
  },
  
  // Control Flow Keywords
  {
    label: 'IF',
    kind: 14,
    insertText: 'IF',
    detail: 'Conditional Statement',
    documentation: { value: '**IF** - Conditional execution\n\n```qlik\nIF vCondition THEN\n    // code\nENDIF;\n```' },
    priority: 7,
    category: 'keyword'
  },
  {
    label: 'LET',
    kind: 14,
    insertText: 'LET',
    detail: 'Variable Assignment (Evaluated)',
    documentation: { value: '**LET** - Creates variable with expression evaluation\n\n```qlik\nLET vYear = Year(Today());\n```' },
    priority: 8,
    category: 'keyword'
  },
  {
    label: 'SET',
    kind: 14,
    insertText: 'SET',
    detail: 'Variable Assignment (Literal)',
    documentation: { value: '**SET** - Creates variable with literal value\n\n```qlik\nSET vPath = "C:\\Data\\";\n```' },
    priority: 8,
    category: 'keyword'
  }
];

/**
 * Qlik functions with parameter templates
 */
const QLIK_FUNCTIONS: QlikCompletionItem[] = [
  // String Functions
  {
    label: 'Upper',
    kind: 3, // CompletionItemKind.Function
    insertText: 'Upper(${1:text})',
    insertTextRules: 4, // CompletionItemInsertTextRule.InsertAsSnippet
    detail: 'String Function',
    documentation: { value: '**Upper(text)** - Converts text to uppercase\n\n**Example:** `Upper("hello")` returns `"HELLO"`' },
    priority: 6,
    category: 'function'
  },
  {
    label: 'SubField',
    kind: 3,
    insertText: 'SubField(${1:text}, ${2:delimiter}, ${3:field_no})',
    insertTextRules: 4,
    detail: 'String Function',
    documentation: { value: '**SubField(text, delimiter, field_no)** - Extracts substring from delimited text\n\n**Example:** `SubField("A|B|C", "|", 2)` returns `"B"`' },
    priority: 7,
    category: 'function'
  },
  
  // Date Functions
  {
    label: 'Date',
    kind: 3,
    insertText: 'Date(${1:number}, ${2:format})',
    insertTextRules: 4,
    detail: 'Date Function',
    documentation: { value: '**Date(number, format)** - Formats number as date\n\n**Example:** `Date(43831, "YYYY-MM-DD")` returns formatted date' },
    priority: 7,
    category: 'function'
  },
  {
    label: 'Now',
    kind: 3,
    insertText: 'Now()',
    detail: 'Date Function',
    documentation: { value: '**Now()** - Returns current timestamp\n\n**Example:** `Now()` returns current date and time' },
    priority: 6,
    category: 'function'
  },
  
  // Aggregation Functions
  {
    label: 'Sum',
    kind: 3,
    insertText: 'Sum(${1:expression})',
    insertTextRules: 4,
    detail: 'Aggregation Function',
    documentation: { value: '**Sum(expression)** - Returns sum of expression values\n\n**Example:** `Sum(Sales)` returns total sales' },
    priority: 9,
    category: 'function'
  },
  {
    label: 'Count',
    kind: 3,
    insertText: 'Count(${1:expression})',
    insertTextRules: 4,
    detail: 'Aggregation Function',
    documentation: { value: '**Count(expression)** - Counts non-null values\n\n**Example:** `Count(Customer)` returns customer count' },
    priority: 9,
    category: 'function'
  }
];

/**
 * Code snippets for common patterns
 */
const CODE_SNIPPETS: QlikCompletionItem[] = [
  {
    label: 'load-table',
    kind: 27, // CompletionItemKind.Snippet
    insertText: 'LOAD\n    ${1:Field1},\n    ${2:Field2},\n    ${3:Field3}\nFROM [${4:DataSource}];',
    insertTextRules: 4,
    detail: 'Code Snippet',
    documentation: { value: '**LOAD Table** - Basic table loading pattern\n\nCreates a LOAD statement template with field placeholders' },
    priority: 8,
    category: 'snippet'
  },
  {
    label: 'load-where',
    kind: 27,
    insertText: 'LOAD *\nFROM [${1:DataSource}]\nWHERE ${2:condition};',
    insertTextRules: 4,
    detail: 'Code Snippet',
    documentation: { value: '**LOAD with WHERE** - Filtered data loading pattern\n\nLoads data with filtering condition' },
    priority: 7,
    category: 'snippet'
  },
  {
    label: 'left-join',
    kind: 27,
    insertText: 'LEFT JOIN (${1:MainTable})\nLOAD\n    ${2:JoinField},\n    ${3:AdditionalField}\nFROM [${4:DataSource}];',
    insertTextRules: 4,
    detail: 'Code Snippet',
    documentation: { value: '**LEFT JOIN** - Table joining pattern\n\nJoins additional data to existing table' },
    priority: 7,
    category: 'snippet'
  }
];

/**
 * System variables commonly used in Qlik scripts
 */
const SYSTEM_VARIABLES: QlikVariable[] = [
  { name: 'vToday', description: 'Current date', type: 'date', example: '$(vToday)' },
  { name: 'vCurrentYear', description: 'Current year', type: 'number', example: '$(vCurrentYear)' },
  { name: 'vLastYear', description: 'Previous year', type: 'number', example: '$(vLastYear)' },
  { name: 'vDataPath', description: 'Data file path', type: 'string', example: '$(vDataPath)' }
];

// ============================
// UTILITY FUNCTIONS
// ============================

/**
 * Analyzes the current context for intelligent completions
 */
function analyzeContext(model: editor.ITextModel, position: editor.Position): CompletionContext {
  const lineContent = model.getLineContent(position.lineNumber);
  const textBeforeCursor = lineContent.substring(0, position.column - 1);
  const textAfterCursor = lineContent.substring(position.column - 1);
  const word = model.getWordUntilPosition(position);
  
  // Advanced context detection
  const isInString = /(['"])[^'"]*$/.test(textBeforeCursor) && !/(['"])[^'"]*['"].*$/.test(textBeforeCursor);
  const isInComment = /\/\//.test(textBeforeCursor) || /\/\*[^*]*$/.test(textBeforeCursor);
  const isInVariable = /\$\s*\([^)]*$/.test(textBeforeCursor);
  const isInField = /\[[^\]]*$/.test(textBeforeCursor);
  const isInFunction = /\w+\s*\([^)]*$/.test(textBeforeCursor);
  
  return {
    lineContent,
    textBeforeCursor,
    textAfterCursor,
    currentWord: word.word,
    isInString,
    isInComment,
    isInVariable,
    isInField,
    isInFunction
  };
}

/**
 * Performs fuzzy matching for suggestions
 */
function fuzzyMatch(query: string, target: string, threshold: number = 0.6): boolean {
  if (!query) return true;
  
  query = query.toLowerCase();
  target = target.toLowerCase();
  
  // Exact match
  if (target.includes(query)) return true;
  
  // Acronym match (e.g., "lj" matches "LEFT JOIN")
  const acronym = target.split(/\s+/).map(word => word[0]).join('');
  if (acronym.includes(query)) return true;
  
  // Character sequence match
  let queryIndex = 0;
  for (let i = 0; i < target.length && queryIndex < query.length; i++) {
    if (target[i] === query[queryIndex]) {
      queryIndex++;
    }
  }
  
  return queryIndex / query.length >= threshold;
}

/**
 * Creates completion items for user variables
 */
function createVariableCompletions(
  variables: QlikVariable[], 
  range: IRange, 
  includeSystemVars: boolean = true
): QlikCompletionItem[] {
  const completions: QlikCompletionItem[] = [];
  
  // Add user variables
  variables.forEach(variable => {
    completions.push({
      label: `$(${variable.name})`,
      kind: 6, // CompletionItemKind.Variable
      insertText: `$(${variable.name})`,
      range,
      detail: variable.type ? `${variable.type.charAt(0).toUpperCase() + variable.type.slice(1)} Variable` : 'User Variable',
      documentation: {
        value: `**$(${variable.name})** - ${variable.description || 'User-defined variable'}\n\n${variable.example ? `**Example:** ${variable.example}` : ''}`
      },
      priority: 5,
      category: 'variable',
      deprecated: variable.deprecated
    });
  });
  
  // Add system variables
  if (includeSystemVars) {
    SYSTEM_VARIABLES.forEach(variable => {
      completions.push({
        label: `$(${variable.name})`,
        kind: 6,
        insertText: `$(${variable.name})`,
        range,
        detail: 'System Variable',
        documentation: {
          value: `**$(${variable.name})** - ${variable.description}\n\n**Type:** ${variable.type}\n**Example:** ${variable.example}`
        },
        priority: 4,
        category: 'variable'
      });
    });
  }
  
  return completions;
}

/**
 * Filters and sorts suggestions based on context and query
 */
function filterAndSortSuggestions(
  suggestions: QlikCompletionItem[],
  query: string,
  context: CompletionContext,
  config: AutocompleteConfig
): QlikCompletionItem[] {
  let filtered = suggestions;
  
  // Apply fuzzy matching if enabled
  if (config.enableFuzzyMatch && query.length >= (config.minCharsForSuggestion || 1)) {
    filtered = suggestions.filter(item => fuzzyMatch(query, item.label as string));
  }
  
  // Context-based filtering
  if (context.isInComment) {
    return []; // No suggestions in comments
  }
  
  if (context.isInString) {
    // Only show field references in strings
    filtered = filtered.filter(item => item.category === 'field');
  }
  
  if (context.isInVariable) {
    // Only show variables in variable context
    filtered = filtered.filter(item => item.category === 'variable');
  }
  
  // Sort by priority and relevance
  filtered.sort((a, b) => {
    // Priority first
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0);
    }
    
    // Then by label match quality
    const aStartsWithQuery = (a.label as string).toLowerCase().startsWith(query.toLowerCase());
    const bStartsWithQuery = (b.label as string).toLowerCase().startsWith(query.toLowerCase());
    
    if (aStartsWithQuery && !bStartsWithQuery) return -1;
    if (!aStartsWithQuery && bStartsWithQuery) return 1;
    
    // Finally alphabetical
    return (a.label as string).localeCompare(b.label as string);
  });
  
  // Limit results
  return filtered.slice(0, config.maxSuggestions || 50);
}

// ============================
// MAIN AUTOCOMPLETE CLASS
// ============================

/**
 * Qlik Autocomplete Provider
 * 
 * Manages all autocomplete functionality for Qlik scripts
 */
export class QlikAutocompleteProvider {
  private config: AutocompleteConfig;
  private userVariables: QlikVariable[] = [];
  private disposables: languages.IDisposable[] = [];
  
  constructor(config: Partial<AutocompleteConfig> = {}) {
    this.config = {
      enableKeywords: true,
      enableFunctions: true,
      enableVariables: true,
      enableFields: true,
      enableSnippets: true,
      maxSuggestions: 50,
      enableFuzzyMatch: true,
      minCharsForSuggestion: 0,
      ...config
    };
  }
  
  /**
   * Updates user variables for completion
   */
  setUserVariables(variables: QlikVariable[]): void {
    this.userVariables = variables;
  }
  
  /**
   * Registers the completion provider with Monaco
   */
  register(monaco: typeof import('monaco-editor')): languages.IDisposable {
    const provider = monaco.languages.registerCompletionItemProvider('qlik', {
      triggerCharacters: ['.', '$', '[', '(', ' '],
      
      provideCompletionItems: (model, position): languages.ProviderResult<languages.CompletionList> => {
        const context = analyzeContext(model, position);
        const word = model.getWordUntilPosition(position);
        const range: IRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };
        
        let suggestions: QlikCompletionItem[] = [];
        
        // Add different types of completions based on config
        if (this.config.enableKeywords) {
          suggestions = suggestions.concat(QLIK_KEYWORDS.map(item => ({ ...item, range })));
        }
        
        if (this.config.enableFunctions) {
          suggestions = suggestions.concat(QLIK_FUNCTIONS.map(item => ({ ...item, range })));
        }
        
        if (this.config.enableVariables) {
          suggestions = suggestions.concat(createVariableCompletions(this.userVariables, range));
        }
        
        if (this.config.enableSnippets) {
          suggestions = suggestions.concat(CODE_SNIPPETS.map(item => ({ ...item, range })));
        }
        
        // Filter and sort
        const filtered = filterAndSortSuggestions(
          suggestions,
          context.currentWord,
          context,
          this.config
        );
        
        return {
          suggestions: filtered
        };
      }
    });
    
    this.disposables.push(provider);
    return provider;
  }
  
  /**
   * Updates configuration
   */
  updateConfig(config: Partial<AutocompleteConfig>): void {
    this.config = { ...this.config, ...config };
  }
  
  /**
   * Disposes all registered providers
   */
  dispose(): void {
    this.disposables.forEach(disposable => disposable.dispose());
    this.disposables = [];
  }
}

// ============================
// UTILITY EXPORTS
// ============================

/**
 * Creates a simple autocomplete provider for basic use cases
 */
export function createQlikAutocomplete(
  variables: QlikVariable[] = [],
  config: Partial<AutocompleteConfig> = {}
): QlikAutocompleteProvider {
  const provider = new QlikAutocompleteProvider(config);
  provider.setUserVariables(variables);
  return provider;
}

/**
 * Converts simple variable names to QlikVariable objects
 */
export function variableNamesToQlikVariables(names: string[]): QlikVariable[] {
  return names.map(name => ({
    name,
    description: `User-defined variable: ${name}`,
    type: 'string'
  }));
}

// Export types for external use
export type { QlikCompletionItem, CompletionContext, AutocompleteConfig };