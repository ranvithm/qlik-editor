import { languages } from 'monaco-editor';

// ============================
// LANGUAGE CONSTANTS
// ============================

const QLIK_KEYWORDS = [
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
  
  // Literals and operators
  'NULL', 'TRUE', 'FALSE', 'AND', 'OR', 'NOT', 'XOR', 'LIKE', 'MATCH',
  'AS', 'IS', 'IN', 'EXISTS', 'BINARY', 'BUNDLE', 'CONNECT', 'DISCONNECT',
  
  // Data source types
  'ODBC', 'OLEDB', 'CUSTOM', 'WEB', 'REST', 'XML', 'JSON', 'KML', 'FIX',
  'QVD', 'QVX', 'QVW', 'TXT', 'CSV', 'XLS', 'XLSX', 'HTML', 'DIF',
  'BIFF', 'OOXML', 'QVS'
] as const;

const QLIK_FUNCTIONS = {
  // Aggregation functions
  aggregation: [
    'Sum', 'Count', 'Avg', 'Min', 'Max', 'Only', 'FirstSortedValue', 'LastSortedValue',
    'Concat', 'Mode', 'Median', 'Fractile', 'Kurtosis', 'Skew', 'Stdev', 'Sterr',
    'VARP', 'VAR', 'STDEVP', 'STERRP', 'Correl'
  ],
  
  // String functions
  string: [
    'Len', 'Left', 'Right', 'Mid', 'SubField', 'SubStringCount', 'Replace', 'Repeat',
    'Reverse', 'PurgeChar', 'KeepChar', 'Upper', 'Lower', 'Proper', 'Capitalize',
    'Trim', 'LTrim', 'RTrim', 'FindOneOf', 'Index', 'WildMatch', 'TextBetween',
    'Hash128', 'Hash160', 'Hash256', 'Evaluate', 'Chr', 'Ord'
  ],
  
  // Date and time functions
  dateTime: [
    'Date', 'Time', 'Timestamp', 'Now', 'Today', 'LocalTime', 'GMT', 'UTC',
    'MakeDate', 'MakeTime', 'MakeWeekDate', 'Year', 'Month', 'Day', 'Hour',
    'Minute', 'Second', 'Millisecond', 'WeekDay', 'WeekYear', 'WeekName',
    'MonthName', 'MonthStart', 'MonthEnd', 'MonthsStart', 'MonthsEnd',
    'YearStart', 'YearEnd', 'YearName', 'YearToDate', 'QuarterStart', 'QuarterEnd',
    'QuarterName', 'WeekStart', 'WeekEnd', 'DayStart', 'DayEnd', 'DayName',
    'DayNumberOfYear', 'DayNumberOfQuarter', 'InYear', 'InYearToDate',
    'InQuarter', 'In QuarterToDate', 'InMonth', 'InMonthToDate', 'InWeek',
    'InWeekToDate', 'InLunarWeek', 'InLunarWeekToDate', 'AddMonths', 'AddYears',
    'Age', 'NetworkDays', 'FirstWorkDate', 'LastWorkDate'
  ],
  
  // Mathematical functions
  math: [
    'Abs', 'Acos', 'Asin', 'Atan', 'Atan2', 'Bitcount', 'Ceil', 'Combin',
    'Cos', 'Cosh', 'Div', 'Even', 'Exp', 'Fact', 'Floor', 'Fmod', 'Frac',
    'Log', 'Log10', 'Mod', 'Odd', 'Permut', 'Pi', 'Pow', 'Rand', 'Round',
    'Sign', 'Sin', 'Sinh', 'Sqrt', 'Sqr', 'Tan', 'Tanh'
  ],
  
  // Conditional functions
  conditional: [
    'If', 'Alt', 'Class', 'Match', 'Mix', 'Pick', 'ValueList', 'ValueLoop',
    'WildMatch5', 'IsNull', 'IsNum', 'IsText', 'IsTime', 'Dual'
  ],
  
  // Inter-record functions
  interRecord: [
    'Peek', 'Previous', 'Above', 'Below', 'Before', 'After', 'First', 'Last',
    'Exists', 'Lookup', 'ApplyMap', 'MapSubString'
  ],
  
  // System functions
  system: [
    'DocumentName', 'DocumentPath', 'DocumentTitle', 'GetFolderPath',
    'OSUser', 'QVUser', 'ReloadTime', 'QTUser', 'Author', 'ClientPlatform',
    'ComputerName', 'StateName', 'FileName', 'FilePath', 'FileDir', 
    'FileExtension', 'FileBaseName', 'FileSize', 'FileTime'
  ],
  
  // Range functions
  range: [
    'RangeSum', 'RangeCount', 'RangeAvg', 'RangeMin', 'RangeMax', 'RangeOnly',
    'RangeMode', 'RangeNumericCount', 'RangeTextCount', 'RangeNullCount',
    'RangeMissingCount', 'RangeFractile', 'RangeKurtosis', 'RangeSkew',
    'RangeStdev', 'RangeIRR', 'RangeNPV', 'RangeXIRR', 'RangeXNPV'
  ],
  
  // Color functions
  color: [
    'Color', 'ColorMix1', 'ColorMix2', 'HSL', 'RGB', 'LightRed', 'Red',
    'DarkRed', 'LightGreen', 'Green', 'DarkGreen', 'LightBlue', 'Blue',
    'DarkBlue', 'Yellow', 'Pink', 'Gray', 'LightGray', 'DarkGray',
    'Black', 'White', 'Brown'
  ],
  
  // Formatting functions
  formatting: [
    'Money', 'Num', 'Text', 'Date#', 'Time#', 'Timestamp#', 'Interval#'
  ]
} as const;

// Flatten all functions for easy access
const ALL_FUNCTIONS = Object.values(QLIK_FUNCTIONS).flat();

// ============================
// DOCUMENTATION MAPPINGS
// ============================

interface FunctionDoc {
  syntax: string;
  description: string;
  example?: string;
  category: keyof typeof QLIK_FUNCTIONS;
  parameters?: Array<{
    name: string;
    type: string;
    optional?: boolean;
    description: string;
  }>;
}

const FUNCTION_DOCUMENTATION: Record<string, FunctionDoc> = {
  // String Functions
  Upper: {
    syntax: 'Upper(text)',
    description: 'Converts all characters in text to uppercase',
    example: 'Upper("hello world") returns "HELLO WORLD"',
    category: 'string',
    parameters: [
      { name: 'text', type: 'string', description: 'The text to convert to uppercase' }
    ]
  },
  
  Lower: {
    syntax: 'Lower(text)',
    description: 'Converts all characters in text to lowercase',
    example: 'Lower("HELLO WORLD") returns "hello world"',
    category: 'string',
    parameters: [
      { name: 'text', type: 'string', description: 'The text to convert to lowercase' }
    ]
  },
  
  Left: {
    syntax: 'Left(text, length)',
    description: 'Returns the leftmost characters from a text string',
    example: 'Left("Hello World", 5) returns "Hello"',
    category: 'string',
    parameters: [
      { name: 'text', type: 'string', description: 'The source text string' },
      { name: 'length', type: 'number', description: 'Number of characters to extract' }
    ]
  },
  
  Right: {
    syntax: 'Right(text, length)',
    description: 'Returns the rightmost characters from a text string',
    example: 'Right("Hello World", 5) returns "World"',
    category: 'string',
    parameters: [
      { name: 'text', type: 'string', description: 'The source text string' },
      { name: 'length', type: 'number', description: 'Number of characters to extract' }
    ]
  },
  
  Mid: {
    syntax: 'Mid(text, start [, length])',
    description: 'Returns a substring from the middle of a text string',
    example: 'Mid("Hello World", 7, 5) returns "World"',
    category: 'string',
    parameters: [
      { name: 'text', type: 'string', description: 'The source text string' },
      { name: 'start', type: 'number', description: 'Starting position (1-based)' },
      { name: 'length', type: 'number', optional: true, description: 'Number of characters to extract' }
    ]
  },
  
  SubField: {
    syntax: 'SubField(text, delimiter [, field_no])',
    description: 'Extracts substring from delimited text',
    example: 'SubField("A|B|C", "|", 2) returns "B"',
    category: 'string',
    parameters: [
      { name: 'text', type: 'string', description: 'The delimited text string' },
      { name: 'delimiter', type: 'string', description: 'The delimiter character(s)' },
      { name: 'field_no', type: 'number', optional: true, description: 'Field number to extract (1-based)' }
    ]
  },
  
  // Date/Time Functions
  Date: {
    syntax: 'Date(number [, format])',
    description: 'Formats a number as a date according to the system format',
    example: 'Date(43831) returns formatted date',
    category: 'dateTime',
    parameters: [
      { name: 'number', type: 'number', description: 'Serial date number' },
      { name: 'format', type: 'string', optional: true, description: 'Date format string' }
    ]
  },
  
  Now: {
    syntax: 'Now()',
    description: 'Returns the current timestamp',
    example: 'Now() returns current date and time',
    category: 'dateTime'
  },
  
  Today: {
    syntax: 'Today()',
    description: 'Returns the current date',
    example: 'Today() returns today\'s date',
    category: 'dateTime'
  },
  
  Year: {
    syntax: 'Year(date)',
    description: 'Returns the year of a date',
    example: 'Year("2023-05-15") returns 2023',
    category: 'dateTime',
    parameters: [
      { name: 'date', type: 'date', description: 'The date value' }
    ]
  },
  
  // Math Functions
  Sum: {
    syntax: 'Sum(expression)',
    description: 'Returns the sum of expression values',
    example: 'Sum(Sales) returns total sales',
    category: 'aggregation',
    parameters: [
      { name: 'expression', type: 'numeric', description: 'Expression to sum' }
    ]
  },
  
  Count: {
    syntax: 'Count([DISTINCT] expression)',
    description: 'Counts the number of values',
    example: 'Count(DISTINCT Customer) counts unique customers',
    category: 'aggregation',
    parameters: [
      { name: 'expression', type: 'any', description: 'Expression to count' }
    ]
  },
  
  // Conditional Functions
  If: {
    syntax: 'If(condition, then [, else])',
    description: 'Returns different values based on a condition',
    example: 'If(Sales > 1000, "High", "Low") categorizes sales',
    category: 'conditional',
    parameters: [
      { name: 'condition', type: 'boolean', description: 'Condition to evaluate' },
      { name: 'then', type: 'any', description: 'Value when condition is true' },
      { name: 'else', type: 'any', optional: true, description: 'Value when condition is false' }
    ]
  },
  
  // Inter-record Functions
  Peek: {
    syntax: 'Peek(field_name [, row [, table_name]])',
    description: 'Returns value from a previously loaded record',
    example: 'Peek("Sales", -1) gets previous Sales value',
    category: 'interRecord',
    parameters: [
      { name: 'field_name', type: 'string', description: 'Name of the field' },
      { name: 'row', type: 'number', optional: true, description: 'Row offset (negative for previous rows)' },
      { name: 'table_name', type: 'string', optional: true, description: 'Table name' }
    ]
  }
};

const KEYWORD_DOCUMENTATION: Record<string, string> = {
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
  'FOR': 'Creates a loop that iterates over a range of values',
  'DROP': 'Removes a table or field from memory',
  'STORE': 'Saves a table to disk in QVD or other format'
};

// ============================
// HELPER FUNCTIONS
// ============================

function createFunctionInsertText(func: string): string {
  const doc = FUNCTION_DOCUMENTATION[func];
  if (!doc?.parameters) {
    return `${func}($0)`;
  }
  
  const params = doc.parameters
    .map((p, i) => p.optional ? `\${${i + 1}:${p.name}}` : `\${${i + 1}:${p.name}}`)
    .join(', ');
  
  return `${func}(${params})`;
}

function formatFunctionDocumentation(func: string): string {
  const doc = FUNCTION_DOCUMENTATION[func];
  if (!doc) {
    return `Qlik Sense function: ${func}()`;
  }
  
  let markdown = `**${doc.syntax}**\n\n${doc.description}`;
  
  if (doc.parameters) {
    markdown += '\n\n**Parameters:**\n';
    doc.parameters.forEach(p => {
      const optional = p.optional ? ' (optional)' : '';
      markdown += `- **${p.name}** (*${p.type}*${optional}): ${p.description}\n`;
    });
  }
  
  if (doc.example) {
    markdown += `\n**Example:** ${doc.example}`;
  }
  
  return markdown;
}

// ============================
// CODE SNIPPETS
// ============================

interface CodeSnippet {
  label: string;
  insertText: string;
  detail: string;
  documentation: string;
  category: 'load' | 'join' | 'variable' | 'control' | 'inline';
}

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    label: 'load-basic',
    insertText: 'LOAD\n    ${1:Field1},\n    ${2:Field2},\n    ${3:Field3}\nFROM [${4:DataSource}];',
    detail: 'Basic LOAD statement',
    documentation: 'Creates a basic LOAD statement template with field placeholders',
    category: 'load'
  },
  {
    label: 'load-where',
    insertText: 'LOAD\n    *\nFROM [${1:DataSource}]\nWHERE ${2:condition};',
    detail: 'LOAD with WHERE clause',
    documentation: 'LOAD statement with filtering condition',
    category: 'load'
  },
  {
    label: 'load-resident',
    insertText: 'LOAD\n    ${1:Field1},\n    ${2:Field2}\nRESIDENT ${3:TableName};',
    detail: 'LOAD from resident table',
    documentation: 'Loads data from a table already in memory',
    category: 'load'
  },
  {
    label: 'left-join',
    insertText: 'LEFT JOIN (${1:MainTable})\nLOAD\n    ${2:JoinField},\n    ${3:AdditionalField}\nFROM [${4:DataSource}];',
    detail: 'LEFT JOIN pattern',
    documentation: 'Left join template for combining tables',
    category: 'join'
  },
  {
    label: 'inner-join',
    insertText: 'INNER JOIN (${1:MainTable})\nLOAD\n    ${2:JoinField},\n    ${3:AdditionalField}\nFROM [${4:DataSource}];',
    detail: 'INNER JOIN pattern',
    documentation: 'Inner join template for combining tables',
    category: 'join'
  },
  {
    label: 'inline-table',
    insertText: 'LOAD * INLINE [\n${1:Field1}, ${2:Field2}\n${3:Value1}, ${4:Value2}\n${5:Value3}, ${6:Value4}\n];',
    detail: 'INLINE data table',
    documentation: 'Creates an inline data table with sample structure',
    category: 'inline'
  },
  {
    label: 'let-variable',
    insertText: 'LET ${1:vVariableName} = ${2:expression};',
    detail: 'LET variable assignment',
    documentation: 'Creates a variable with expression evaluation',
    category: 'variable'
  },
  {
    label: 'set-variable',
    insertText: 'SET ${1:vVariableName} = ${2:value};',
    detail: 'SET variable assignment',
    documentation: 'Creates a variable with literal value assignment',
    category: 'variable'
  },
  {
    label: 'if-block',
    insertText: 'IF ${1:condition} THEN\n    ${2:// code when true}\nELSE\n    ${3:// code when false}\nENDIF;',
    detail: 'IF-THEN-ELSE block',
    documentation: 'Conditional execution block',
    category: 'control'
  },
  {
    label: 'for-loop',
    insertText: 'FOR ${1:i} = ${2:1} TO ${3:10}\n    ${4:// loop body}\nNEXT ${1:i};',
    detail: 'FOR loop',
    documentation: 'For loop iteration structure',
    category: 'control'
  },
  {
    label: 'subroutine',
    insertText: 'SUB ${1:SubroutineName}\n    ${2:// subroutine body}\nENDSUB;\n\nCALL ${1:SubroutineName};',
    detail: 'Subroutine definition',
    documentation: 'Creates a reusable subroutine',
    category: 'control'
  }
];

// ============================
// ENHANCED LANGUAGE DEFINITION
// ============================

export const qlikLanguageDefinitionRefactored: languages.IMonarchLanguage = {
  defaultToken: 'invalid',
  ignoreCase: true,
  
  keywords: QLIK_KEYWORDS,
  functions: ALL_FUNCTIONS,
  
  operators: [
    '=', '>', '<', '!', '~', '?', ':',
    '==', '<=', '>=', '!=', '<>', '&&', '||',
    '+', '-', '*', '/', '&', '|', '^', '%',
    '<<', '>>', '>>>', '+=', '-=', '*=', '/=',
    '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>='
  ],

  // Regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

  tokenizer: {
    root: [
      // Keywords and identifiers with improved classification
      [/[a-zA-Z_$][\w$]*/, {
        cases: {
          '@keywords': { token: 'keyword', next: '@keywordContext' },
          '@functions': { token: 'function', next: '@functionContext' },
          '@default': 'identifier'
        }
      }],

      // Enhanced variable references with better tokenization
      [/\$\([^)]*\)/, 'variable.system'],
      [/\$\{[^}]*\}/, 'variable.expression'],

      // Field references with improved handling
      [/\[[^\]]*\]/, 'field.reference'],

      // Whitespace and comments
      { include: '@whitespace' },

      // Brackets and delimiters
      [/[{}()\[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [/@symbols/, {
        cases: {
          '@operators': 'operator',
          '@default': ''
        }
      }],

      // Enhanced number recognition
      [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, 'number.float'],
      [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, 'number.float'],
      [/0[xX](@hexdigits)[Ll]?/, 'number.hex'],
      [/0(@octaldigits)[Ll]?/, 'number.octal'],
      [/0[bB](@binarydigits)[Ll]?/, 'number.binary'],
      [/(@digits)[fFdD]/, 'number.float'],
      [/(@digits)[lL]?/, 'number'],

      // Delimiters
      [/[;,.]/, 'delimiter'],

      // Enhanced string handling
      [/"([^"\\]|\\.)*"/, 'string.double'],
      [/'([^'\\]|\\.)*'/, 'string.single'],

      // Character literals
      [/'[^\\']'/, 'string.char'],
      [/(')(@escapes)(')/, ['string.char', 'string.escape', 'string.char']],
      [/'/, 'string.invalid']
    ],

    // Context-aware tokenization
    keywordContext: [
      [/\s+/, ''],
      [/[a-zA-Z_][\w]*/, 'identifier.after-keyword'],
      [/./, { token: '@rematch', next: '@pop' }]
    ],

    functionContext: [
      [/\s*\(/, { token: 'delimiter.parenthesis', next: '@functionParameters' }],
      [/./, { token: '@rematch', next: '@pop' }]
    ],

    functionParameters: [
      [/[^()]+/, 'parameter'],
      [/\(/, { token: 'delimiter.parenthesis', next: '@functionParameters' }],
      [/\)/, { token: 'delimiter.parenthesis', next: '@pop' }]
    ],

    whitespace: [
      [/[ \t\r\n]+/, ''],
      [/\/\*/, 'comment.block', '@blockComment'],
      [/\/\/.*$/, 'comment.line'],
      [/REM\s.*$/i, 'comment.line.rem'] // Qlik REM comments
    ],

    blockComment: [
      [/[^\/*]+/, 'comment.block'],
      [/\*\//, 'comment.block', '@pop'],
      [/[\/*]/, 'comment.block']
    ]
  }
};

// ============================
// ENHANCED LANGUAGE CONFIGURATION
// ============================

export const qlikLanguageConfigurationRefactored: languages.LanguageConfiguration = {
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
    { open: '"', close: '"', notIn: ['string', 'comment'] },
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
    },
    offSide: true
  },
  
  wordPattern: /(-?\d*\.\d\w*)|([^`~!@#%^&*()\\=+[{}\\|;:'\",./<>?\\s-]+)/g,
  
  indentationRules: {
    increaseIndentPattern: /^((?!\/\/).)*((\{[^}"'`]*)|(\([^)"'`]*)|(\[[^\]"'`]*))$/,
    decreaseIndentPattern: /^((?!.*?\/\*).*\*\/)?\s*[\}\]\)].*$/
  },
  
  onEnterRules: [
    {
      beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
      afterText: /^\s*\*\/$/,
      action: { indentAction: languages.IndentAction.IndentOutdent, appendText: ' * ' }
    },
    {
      beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
      action: { indentAction: languages.IndentAction.None, appendText: ' * ' }
    },
    {
      beforeText: /^(\t|( {2}))* {2}\*( ([^*]|\*(?!\/))*)?$/,
      action: { indentAction: languages.IndentAction.None, appendText: '* ' }
    }
  ]
};

// ============================
// ENHANCED REGISTRATION FUNCTION
// ============================

export function registerQlikLanguageRefactored(monaco: typeof import('monaco-editor')) {
  const languageId = 'qlik';
  
  // Unregister existing language if it exists
  const existingLanguages = monaco.languages.getLanguages();
  if (existingLanguages.some(lang => lang.id === languageId)) {
    // Monaco doesn't provide unregister, so we'll just override
  }
  
  // Register the language
  monaco.languages.register({ 
    id: languageId,
    extensions: ['.qvs', '.qlikview'],
    aliases: ['Qlik', 'qlik', 'QlikView', 'QlikSense'],
    mimetypes: ['text/x-qlik', 'application/x-qlik-script']
  });

  // Set language configuration
  monaco.languages.setLanguageConfiguration(languageId, qlikLanguageConfigurationRefactored);

  // Set tokenizer
  monaco.languages.setMonarchTokensProvider(languageId, qlikLanguageDefinitionRefactored);

  // Enhanced completion provider with performance optimizations
  const completionProvider = monaco.languages.registerCompletionItemProvider(languageId, {
    triggerCharacters: ['.', '$', '[', '('],
    
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const suggestions: languages.CompletionItem[] = [];
      const lineContent = model.getLineContent(position.lineNumber);
      const textBeforeCursor = lineContent.substring(0, position.column - 1);
      
      // Context detection
      const isVariableContext = /\$[\(\{]/.test(textBeforeCursor);
      const isFieldContext = /\[/.test(textBeforeCursor);
      const isFunctionContext = /\w+\($/.test(textBeforeCursor);

      // Keywords (only in appropriate contexts)
      if (!isVariableContext && !isFieldContext && !isFunctionContext) {
        QLIK_KEYWORDS.forEach(keyword => {
          suggestions.push({
            label: keyword,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: keyword,
            range,
            detail: 'Qlik Keyword',
            documentation: {
              value: KEYWORD_DOCUMENTATION[keyword] || `Qlik Sense keyword: ${keyword}`
            },
            sortText: `1_${keyword}`
          });
        });
      }

      // Functions with enhanced documentation
      if (!isVariableContext && !isFieldContext) {
        ALL_FUNCTIONS.forEach(func => {
          const insertText = createFunctionInsertText(func);
          const documentation = formatFunctionDocumentation(func);
          
          suggestions.push({
            label: func,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
            detail: `Qlik Function (${FUNCTION_DOCUMENTATION[func]?.category || 'general'})`,
            documentation: { value: documentation },
            sortText: `2_${func}`
          });
        });
      }

      // Code snippets
      CODE_SNIPPETS.forEach(snippet => {
        suggestions.push({
          label: snippet.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: snippet.insertText,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          detail: snippet.detail,
          documentation: { value: snippet.documentation },
          sortText: `5_${snippet.label}`,
          filterText: snippet.label.replace('-', ' ')
        });
      });

      return { suggestions };
    }
  });

  // Enhanced hover provider with rich documentation
  const hoverProvider = monaco.languages.registerHoverProvider(languageId, {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return;

      const wordText = word.word;
      
      // Function documentation
      if (ALL_FUNCTIONS.includes(wordText)) {
        const documentation = formatFunctionDocumentation(wordText);
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn
          ),
          contents: [
            { value: `**${wordText}** (Function)` },
            { value: documentation }
          ]
        };
      }
      
      // Keyword documentation
      if ((QLIK_KEYWORDS as readonly string[]).includes(wordText.toUpperCase())) {
        const doc = KEYWORD_DOCUMENTATION[wordText.toUpperCase()];
        if (doc) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn
            ),
            contents: [
              { value: `**${wordText.toUpperCase()}** (Keyword)` },
              { value: doc }
            ]
          };
        }
      }
    }
  });

  // Return cleanup function
  return () => {
    completionProvider.dispose();
    hoverProvider.dispose();
  };
}

// Export for external use
export { QLIK_KEYWORDS, QLIK_FUNCTIONS, ALL_FUNCTIONS, FUNCTION_DOCUMENTATION, CODE_SNIPPETS };