import type { languages } from 'monaco-editor';

// Helper functions for IntelliSense documentation
function getKeywordDocumentation(keyword: string): string {
  const keywordDocs: { [key: string]: string } = {
    'LOAD': 'Loads data from a source (file, database, inline, etc.) into a Qlik table',
    'SELECT': 'SQL SELECT statement for loading data from ODBC/OLEDB sources',
    'FROM': 'Specifies the data source location (file path, table name, etc.)',
    'WHERE': 'Filters records based on specified conditions',
    'JOIN': 'Combines data from two tables based on common fields',
    'LEFT JOIN': 'Keeps all records from the left table and matching records from the right',
    'INNER JOIN': 'Keeps only records that have matches in both tables',
    'CONCATENATE': 'Appends one table to another with the same field structure',
    'RESIDENT': 'Loads data from a table already loaded in memory',
    'INLINE': 'Defines data directly in the script using inline format',
    'LET': 'Creates a variable and evaluates the expression before storing',
    'SET': 'Creates a variable and stores the expression as text without evaluation',
    'IF': 'Conditional statement that executes code based on a condition',
    'THEN': 'Specifies the code to execute when IF condition is true',
    'ELSE': 'Specifies the code to execute when IF condition is false',
    'ENDIF': 'Marks the end of an IF statement block',
    'FOR': 'Creates a loop that iterates over a range of values',
    'NEXT': 'Marks the end of a FOR loop and increments the counter',
    'DROP': 'Removes a table or field from memory',
    'STORE': 'Saves a table to disk in QVD or other format',
    'QUALIFY': 'Prefixes field names with table name to avoid field name conflicts',
    'UNQUALIFY': 'Removes table name prefixes from field names'
  };
  
  return keywordDocs[keyword] || `Qlik Sense keyword: ${keyword}`;
}

function getFunctionDocumentation(func: string): string {
  const functionDocs: { [key: string]: string } = {
    // String functions
    'Upper': '**Upper(text)** - Converts all characters in text to uppercase\n\nExample: `Upper("hello")` returns `"HELLO"`',
    'Lower': '**Lower(text)** - Converts all characters in text to lowercase\n\nExample: `Lower("HELLO")` returns `"hello"`',
    'Len': '**Len(text)** - Returns the length of the text string\n\nExample: `Len("Hello")` returns `5`',
    'Left': '**Left(text, count)** - Returns the leftmost count characters from text\n\nExample: `Left("Hello", 3)` returns `"Hel"`',
    'Right': '**Right(text, count)** - Returns the rightmost count characters from text\n\nExample: `Right("Hello", 3)` returns `"llo"`',
    'Mid': '**Mid(text, start [, count])** - Returns substring starting at position start\n\nExample: `Mid("Hello", 2, 3)` returns `"ell"`',
    'SubField': '**SubField(text, delimiter [, field_no])** - Extracts substring from delimited text\n\nExample: `SubField("A|B|C", "|", 2)` returns `"B"`',
    
    // Date/Time functions
    'Date': '**Date(number [, format])** - Formats a number as a date\n\nExample: `Date(43831)` returns formatted date',
    'Now': '**Now()** - Returns current timestamp\n\nExample: `Now()` returns current date and time',
    'Today': '**Today()** - Returns current date\n\nExample: `Today()` returns today\'s date',
    'Year': '**Year(date)** - Extracts year from date\n\nExample: `Year("2023-05-15")` returns `2023`',
    'Month': '**Month(date)** - Extracts month from date\n\nExample: `Month("2023-05-15")` returns `5`',
    'Day': '**Day(date)** - Extracts day from date\n\nExample: `Day("2023-05-15")` returns `15`',
    
    // Aggregation functions
    'Sum': '**Sum(expression)** - Returns the sum of expression values\n\nExample: `Sum(Sales)` returns total of Sales field',
    'Count': '**Count([DISTINCT] expression)** - Counts values\n\nExample: `Count(Customer)` returns number of customer records',
    'Avg': '**Avg(expression)** - Returns average of expression values\n\nExample: `Avg(Price)` returns average price',
    'Min': '**Min(expression)** - Returns minimum value\n\nExample: `Min(Date)` returns earliest date',
    'Max': '**Max(expression)** - Returns maximum value\n\nExample: `Max(Date)` returns latest date',
    
    // Inter-record functions
    'Peek': '**Peek(field_name [, row [, table_name]])** - Returns value from previous record\n\nExample: `Peek("Sales")` returns Sales value from previous row',
    'Previous': '**Previous(expression)** - Returns expression value from previous record\n\nExample: `Previous(Amount)` gets previous Amount value',
    
    // Conditional functions
    'If': '**If(condition, then [, else])** - Returns different values based on condition\n\nExample: `If(Sales > 1000, "High", "Low")` categorizes sales',
    
    // Mathematical functions
    'Round': '**Round(number [, decimals])** - Rounds number to specified decimal places\n\nExample: `Round(3.14159, 2)` returns `3.14`',
    'Ceil': '**Ceil(number)** - Rounds up to nearest integer\n\nExample: `Ceil(3.2)` returns `4`',
    'Floor': '**Floor(number)** - Rounds down to nearest integer\n\nExample: `Floor(3.8)` returns `3`'
  };
  
  return functionDocs[func] || `Qlik Sense function: ${func}()`;
}

function getFunctionInsertText(func: string): string {
  const functionInserts: { [key: string]: string } = {
    // Functions with multiple parameters
    'Left': 'Left(${1:text}, ${2:count})',
    'Right': 'Right(${1:text}, ${2:count})',
    'Mid': 'Mid(${1:text}, ${2:start}, ${3:count})',
    'SubField': 'SubField(${1:text}, ${2:delimiter}, ${3:field_no})',
    'Date': 'Date(${1:number}, ${2:format})',
    'If': 'If(${1:condition}, ${2:then}, ${3:else})',
    'Peek': 'Peek(${1:field_name}, ${2:row}, ${3:table_name})',
    'Round': 'Round(${1:number}, ${2:decimals})',
    
    // Functions with single parameter
    'Upper': 'Upper(${1:text})',
    'Lower': 'Lower(${1:text})',
    'Len': 'Len(${1:text})',
    'Year': 'Year(${1:date})',
    'Month': 'Month(${1:date})',
    'Day': 'Day(${1:date})',
    'Sum': 'Sum(${1:expression})',
    'Count': 'Count(${1:expression})',
    'Avg': 'Avg(${1:expression})',
    'Min': 'Min(${1:expression})',
    'Max': 'Max(${1:expression})',
    'Ceil': 'Ceil(${1:number})',
    'Floor': 'Floor(${1:number})',
    
    // Functions with no parameters
    'Now': 'Now()',
    'Today': 'Today()'
  };
  
  return functionInserts[func] || `${func}($0)`;
}

function getCommonFieldSuggestions() {
  return [
    {
      label: '[Field Name]',
      insertText: '[${1:FieldName}]',
      documentation: 'Reference to a field in the data model. Use square brackets for field names with spaces or special characters.'
    },
    {
      label: '[Customer ID]',
      insertText: '[Customer ID]',
      documentation: 'Common field pattern for customer identification'
    },
    {
      label: '[Order Date]',
      insertText: '[Order Date]',
      documentation: 'Common field pattern for date fields'
    },
    {
      label: '[Sales Amount]',
      insertText: '[Sales Amount]',
      documentation: 'Common field pattern for monetary amounts'
    }
  ];
}

function getSystemVariableSuggestions() {
  return [
    {
      label: '$(vToday)',
      insertText: '$(vToday)',
      documentation: 'System variable containing today\'s date'
    },
    {
      label: '$(vCurrentYear)',
      insertText: '$(vCurrentYear)',
      documentation: 'System variable containing current year'
    },
    {
      label: '$(vLastYear)',
      insertText: '$(vLastYear)',
      documentation: 'System variable containing previous year'
    },
    {
      label: '$(vDataPath)',
      insertText: '$(vDataPath)',
      documentation: 'System variable containing data file path'
    }
  ];
}

function getCodeSnippets() {
  return [
    {
      label: 'load-table',
      insertText: 'LOAD\n    ${1:Field1},\n    ${2:Field2},\n    ${3:Field3}\nFROM [${4:DataSource}];',
      detail: 'Basic LOAD statement',
      documentation: 'Creates a basic LOAD statement template with field placeholders'
    },
    {
      label: 'load-where',
      insertText: 'LOAD\n    *\nFROM [${1:DataSource}]\nWHERE ${2:condition};',
      detail: 'LOAD with WHERE clause',
      documentation: 'LOAD statement with filtering condition'
    },
    {
      label: 'left-join',
      insertText: 'LEFT JOIN (${1:MainTable})\nLOAD\n    ${2:JoinField},\n    ${3:AdditionalField}\nFROM [${4:DataSource}];',
      detail: 'LEFT JOIN pattern',
      documentation: 'Left join template for combining tables'
    },
    {
      label: 'inline-table',
      insertText: 'LOAD * INLINE [\n${1:Field1}, ${2:Field2}\n${3:Value1}, ${4:Value2}\n${5:Value3}, ${6:Value4}\n];',
      detail: 'INLINE data table',
      documentation: 'Creates an inline data table with sample structure'
    },
    {
      label: 'let-variable',
      insertText: 'LET ${1:vVariableName} = ${2:expression};',
      detail: 'LET variable assignment',
      documentation: 'Creates a variable with expression evaluation'
    },
    {
      label: 'set-variable',
      insertText: 'SET ${1:vVariableName} = ${2:value};',
      detail: 'SET variable assignment',
      documentation: 'Creates a variable with literal value assignment'
    },
    {
      label: 'if-block',
      insertText: 'IF ${1:condition} THEN\n    ${2:// code when true}\nELSE\n    ${3:// code when false}\nENDIF;',
      detail: 'IF-THEN-ELSE block',
      documentation: 'Conditional execution block'
    },
    {
      label: 'for-loop',
      insertText: 'FOR ${1:i} = ${2:1} TO ${3:10}\n    ${4:// loop body}\nNEXT ${1:i};',
      detail: 'FOR loop',
      documentation: 'For loop iteration structure'
    }
  ];
}

export const qlikLanguageDefinition: languages.IMonarchLanguage = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  defaultToken: 'invalid',
  ignoreCase: true,
  
  // Keywords for Qlik Sense script
  keywords: [
    // Data loading keywords
    'LOAD', 'SELECT', 'FROM', 'WHERE', 'GROUP', 'BY', 'ORDER', 'HAVING',
    'DISTINCT', 'TOP', 'FIRST', 'LAST', 'SAMPLE', 'CROSSTABLE', 'GENERIC',
    'HIERARCHY', 'HIERARCHYBELONGSTO', 'INTERVALMATCH', 'MAPPING', 'SEMANTIC',
    
    // Join keywords
    'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'KEEP', 'CONCATENATE',
    'MERGE', 'REPLACE', 'ADD', 'BUFFER', 'INCREMENTAL', 'INSERT', 'UPDATE',
    
    // Table operations
    'RESIDENT', 'INLINE', 'AUTOGENERATE', 'DROP', 'STORE', 'QUALIFY', 'UNQUALIFY',
    'RENAME', 'ALIAS', 'COMMENT', 'TAG', 'UNTAG',
    
    // Control flow
    'IF', 'THEN', 'ELSE', 'ELSEIF', 'ENDIF', 'FOR', 'TO', 'STEP', 'NEXT',
    'DO', 'WHILE', 'LOOP', 'UNTIL', 'EXIT', 'WHEN', 'UNLESS', 'SWITCH',
    'CASE', 'DEFAULT', 'ENDSWITCH',
    
    // Variables and settings
    'LET', 'SET', 'CALL', 'SUB', 'ENDSUB', 'FUNCTION', 'END',
    
    // File operations
    'DIRECTORY', 'CD', 'EXECUTE', 'SLEEP', 'TRACE', 'LOG', 'LOOSEN',
    
    // Section access
    'SECTION', 'ACCESS', 'APPLICATION', 'ADMIN', 'USER',
    
    // Other keywords
    'NULL', 'TRUE', 'FALSE', 'AND', 'OR', 'NOT', 'XOR', 'LIKE', 'MATCH',
    'AS', 'IS', 'IN', 'EXISTS', 'BINARY', 'BUNDLE', 'CONNECT', 'DISCONNECT',
    'ODBC', 'OLEDB', 'CUSTOM', 'WEB', 'REST', 'XML', 'JSON', 'KML', 'FIX',
    'QVD', 'QVX', 'QVW', 'TXT', 'CSV', 'XLS', 'XLSX', 'HTML', 'DIF',
    'BIFF', 'OOXML', 'QVS'
  ],

  // Built-in functions
  functions: [
    // Aggregation functions
    'Sum', 'Count', 'Avg', 'Min', 'Max', 'Only', 'FirstSortedValue', 'LastSortedValue',
    'Concat', 'Mode', 'Median', 'Fractile', 'Kurtosis', 'Skew', 'Stdev', 'Sterr',
    'VARP', 'VAR', 'STDEVP', 'STERRP', 'Correl',
    
    // String functions
    'Len', 'Left', 'Right', 'Mid', 'SubField', 'SubStringCount', 'Replace', 'Repeat',
    'Reverse', 'PurgeChar', 'KeepChar', 'Upper', 'Lower', 'Proper', 'Capitalize',
    'Trim', 'LTrim', 'RTrim', 'FindOneOf', 'Index', 'WildMatch', 'TextBetween',
    'Hash128', 'Hash160', 'Hash256', 'Evaluate', 'Pur', 'Chr', 'Ord',
    
    // Date and time functions
    'Date', 'Time', 'Timestamp', 'Now', 'Today', 'LocalTime', 'GMT', 'UTC',
    'MakeDate', 'MakeTime', 'MakeWeekDate', 'Year', 'Month', 'Day', 'Hour',
    'Minute', 'Second', 'Millisecond', 'WeekDay', 'WeekYear', 'WeekName',
    'MonthName', 'MonthStart', 'MonthEnd', 'MonthsStart', 'MonthsEnd',
    'YearStart', 'YearEnd', 'YearName', 'YearToDate', 'QuarterStart', 'QuarterEnd',
    'QuarterName', 'WeekStart', 'WeekEnd', 'DayStart', 'DayEnd', 'DayName',
    'DayNumberOfYear', 'DayNumberOfQuarter', 'InYear', 'InYearToDate',
    'InQuarter', 'InQuarterToDate', 'InMonth', 'InMonthToDate', 'InWeek',
    'InWeekToDate', 'InLunarWeek', 'InLunarWeekToDate', 'AddMonths', 'AddYears',
    'Age', 'NetworkDays', 'FirstWorkDate', 'LastWorkDate',
    
    // Mathematical functions
    'Abs', 'Acos', 'Asin', 'Atan', 'Atan2', 'Bitcount', 'Ceil', 'Combin',
    'Cos', 'Cosh', 'Div', 'Even', 'Exp', 'Fact', 'Floor', 'Fmod', 'Frac',
    'Log', 'Log10', 'Mod', 'Odd', 'Permut', 'Pi', 'Pow', 'Rand', 'Round',
    'Sign', 'Sin', 'Sinh', 'Sqrt', 'Sqr', 'Tan', 'Tanh',
    
    // Conditional functions
    'If', 'Alt', 'Class', 'Match', 'Mix', 'Pick', 'ValueList', 'ValueLoop',
    'WildMatch5', 'IsNull', 'IsNum', 'IsText', 'IsTime', 'Dual',
    
    // Inter-record functions
    'Peek', 'Previous', 'Above', 'Below', 'Before', 'After', 'First', 'Last',
    'Exists', 'Lookup', 'ApplyMap', 'MapSubString',
    
    // Field functions
    'FieldValue', 'FieldIndex', 'FieldName', 'NoOfFields', 'FieldValueList',
    'FieldValueCount', 'FieldNumber',
    
    // Table functions
    'NoOfRows', 'NoOfTables', 'TableName', 'TableNumber',
    
    // File functions
    'FileName', 'FilePath', 'FileDir', 'FileExtension', 'FileBaseName',
    'FileSize', 'FileTime', 'QvdCreateTime', 'QvdFieldName', 'QvdNoOfFields',
    'QvdNoOfRecords', 'QvdTableName',
    
    // System functions
    'DocumentName', 'DocumentPath', 'DocumentTitle', 'GetFolderPath',
    'OSUser', 'QVUser', 'ReloadTime', 'QTUser', 'Author', 'ClientPlatform',
    'ComputerName', 'StateName',
    
    // Range functions
    'RangeSum', 'RangeCount', 'RangeAvg', 'RangeMin', 'RangeMax', 'RangeOnly',
    'RangeMode', 'RangeNumericCount', 'RangeTextCount', 'RangeNullCount',
    'RangeMissingCount', 'RangeFractile', 'RangeKurtosis', 'RangeSkew',
    'RangeStdev', 'RangeIRR', 'RangeNPV', 'RangeXIRR', 'RangeXNPV',
    
    // Aggregation scope functions
    'Aggr', 'Total', 'Distinct', 'SetAnalysis',
    
    // Selection functions
    'GetFieldSelections', 'GetCurrentSelections', 'GetSelectedCount',
    'GetPossibleCount', 'GetAlternativeCount', 'GetExcludedCount',
    'GetNotSelectedCount', 'IsPartialReload',
    
    // Color functions
    'Color', 'ColorMix1', 'ColorMix2', 'HSL', 'RGB', 'LightRed', 'Red',
    'DarkRed', 'LightGreen', 'Green', 'DarkGreen', 'LightBlue', 'Blue',
    'DarkBlue', 'Yellow', 'Pink', 'Gray', 'LightGray', 'DarkGray',
    'Black', 'White', 'Brown',
    
    // Formatting functions
    'Money', 'Num', 'Text', 'Date#', 'Time#', 'Timestamp#', 'Interval#',
    'Dual'
  ],

  // Operators
  operators: [
    '=', '>', '<', '!', '~', '?', ':',
    '==', '<=', '>=', '!=', '<>', '&&', '||', '++', '--',
    '+', '-', '*', '/', '&', '|', '^', '%', '<<', '>>', '>>>', '+=', '-=',
    '*=', '/=', '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>='
  ],

  // Common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // Identifiers and keywords
      [/[a-zA-Z_$][\w$]*/, {
        cases: {
          '@keywords': 'keyword',
          '@functions': 'function',
          '@default': 'identifier'
        }
      }],

      // Variable references $(variableName)
      [/\$\([^)]*\)/, 'variable'],

      // Field references [FieldName]
      [/\[[^\]]*\]/, 'field'],

      // Whitespace
      { include: '@whitespace' },

      // Delimiters and operators
      [/[{}()\[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [/@symbols/, {
        cases: {
          '@operators': 'operator',
          '@default': ''
        }
      }],

      // Numbers
      [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, 'number.float'],
      [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, 'number.float'],
      [/0[xX](@hexdigits)[Ll]?/, 'number.hex'],
      [/0(@octaldigits)[Ll]?/, 'number.octal'],
      [/0[bB](@binarydigits)[Ll]?/, 'number.binary'],
      [/(@digits)[fFdD]/, 'number.float'],
      [/(@digits)[lL]?/, 'number'],

      // Delimiter: after number because of .\d floats
      [/[;,.]/, 'delimiter'],

      // Strings
      [/"([^"\\]|\\.)*"/, 'string'],
      [/'([^'\\]|\\.)*'/, 'string'],

      // Characters
      [/'[^\\']'/, 'string'],
      [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
      [/'/, 'string.invalid']
    ],

    whitespace: [
      [/[ \t\r\n]+/, ''],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
      [/REM\s.*$/, 'comment'] // REM comments in Qlik
    ],

    comment: [
      [/[^\/*]+/, 'comment'],
      [/\*\//, 'comment', '@pop'],
      [/[\/*]/, 'comment']
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, 'string', '@pop']
    ]
  }
};

// Language configuration for Qlik
export const qlikLanguageConfiguration: languages.LanguageConfiguration = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/']
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')']
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"', notIn: ['string'] },
    { open: "'", close: "'", notIn: ['string', 'comment'] }
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  folding: {
    markers: {
      start: new RegExp('^\\s*//\\s*#?region\\b'),
      end: new RegExp('^\\s*//\\s*#?endregion\\b')
    }
  },
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  indentationRules: {
    increaseIndentPattern: /^((?!\/\/).)*((\{[^}"'`]*)|(\([^)"'`]*)|(\[[^\]"'`]*))$/,
    decreaseIndentPattern: /^((?!.*?\/\*).*\*\/)?\s*[\}\]\)].*$/
  }
};

// Function to register the Qlik language with Monaco
export function registerQlikLanguage(monaco: typeof import('monaco-editor')) {
  // Register the language
  monaco.languages.register({ id: 'qlik' });

  // Register the language configuration
  monaco.languages.setLanguageConfiguration('qlik', qlikLanguageConfiguration);

  // Register the tokenizer
  monaco.languages.setMonarchTokensProvider('qlik', qlikLanguageDefinition);

  // Enhanced completion item provider with comprehensive IntelliSense
  monaco.languages.registerCompletionItemProvider('qlik', {
    triggerCharacters: ['.', '$', '['],
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const suggestions: languages.CompletionItem[] = [];

      // Get current line text for context
      const lineContent = model.getLineContent(position.lineNumber);
      const textBeforeCursor = lineContent.substring(0, position.column - 1);

      // Check if we're in a variable context
      const isVariableContext = textBeforeCursor.includes('$');
      const isFieldContext = textBeforeCursor.includes('[');

      // Add keyword suggestions
      if (!isVariableContext && !isFieldContext) {
        qlikLanguageDefinition.keywords?.forEach(keyword => {
          const documentation = getKeywordDocumentation(keyword);
          suggestions.push({
            label: keyword,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: keyword,
            range: range,
            detail: 'Qlik Keyword',
            documentation: {
              value: documentation
            },
            sortText: `1_${keyword}` // Priority sorting
          });
        });
      }

      // Add function suggestions with enhanced documentation
      if (!isVariableContext && !isFieldContext) {
        qlikLanguageDefinition.functions?.forEach(func => {
          const documentation = getFunctionDocumentation(func);
          const insertText = getFunctionInsertText(func);
          
          suggestions.push({
            label: func,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
            detail: 'Qlik Function',
            documentation: {
              value: documentation
            },
            sortText: `2_${func}` // Priority sorting
          });
        });
      }

      // Add common field patterns
      if (isFieldContext || word.word.startsWith('[')) {
        const fieldSuggestions = getCommonFieldSuggestions();
        fieldSuggestions.forEach(field => {
          suggestions.push({
            label: field.label,
            kind: monaco.languages.CompletionItemKind.Field,
            insertText: field.insertText,
            range: range,
            detail: 'Field Reference',
            documentation: {
              value: field.documentation
            },
            sortText: `3_${field.label}`
          });
        });
      }

      // Add variable patterns
      if (isVariableContext || word.word.startsWith('$')) {
        const variableSuggestions = getSystemVariableSuggestions();
        variableSuggestions.forEach(variable => {
          suggestions.push({
            label: variable.label,
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: variable.insertText,
            range: range,
            detail: 'System Variable',
            documentation: {
              value: variable.documentation
            },
            sortText: `4_${variable.label}`
          });
        });
      }

      // Add code snippets
      const snippets = getCodeSnippets();
      snippets.forEach(snippet => {
        suggestions.push({
          label: snippet.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: snippet.insertText,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
          detail: snippet.detail,
          documentation: {
            value: snippet.documentation
          },
          sortText: `5_${snippet.label}`
        });
      });

      return { suggestions };
    }
  });

  // Register hover provider for function documentation
  monaco.languages.registerHoverProvider('qlik', {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return;

      const functionDocs: { [key: string]: string } = {
        'Date': 'Date(number[, format]) - Formats a number as a date according to the format string',
        'Peek': 'Peek(field_name[, row[, table_name]]) - Returns the value of a field in a previous record',
        'SubField': 'SubField(text, delimiter[, field_no]) - Returns a substring from a delimited string',
        'Now': 'Now() - Returns the current date and time as a timestamp',
        'Upper': 'Upper(text) - Converts text to uppercase',
        'Sum': 'Sum(expression) - Returns the sum of the expression values',
        'Count': 'Count([DISTINCT] expression) - Returns the number of values',
        'If': 'If(condition, then[, else]) - Conditional function that returns different values based on a condition'
      };

      if (functionDocs[word.word]) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn
          ),
          contents: [
            { value: `**${word.word}**` },
            { value: functionDocs[word.word] }
          ]
        };
      }
    }
  });
}