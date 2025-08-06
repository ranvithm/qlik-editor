# qlik-script-editor

<div align="center">

[![npm version](https://badge.fury.io/js/qlik-script-editor.svg)](https://badge.fury.io/js/qlik-script-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A powerful React Monaco Editor component specifically designed for **Qlik Sense scripts** with comprehensive syntax highlighting, intelligent autocomplete, and modern UI components.

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [API](#api-reference) • [Examples](#examples)

</div>

---

## 🚀 Overview

`qlik-script-editor` provides a complete Monaco Editor solution tailored for Qlik Sense development. Built with React, TypeScript, and Tailwind CSS, it offers VS Code-level editing experience for Qlik scripts with intelligent autocomplete, syntax highlighting, and responsive UI components.

### ✨ Features

- 🎯 **Complete Qlik Sense Language Support** - 100+ keywords, 200+ functions with full syntax highlighting
- 🧠 **Intelligent IntelliSense** - Context-aware autocomplete for keywords, functions, variables, and code snippets
- 🎨 **Multiple UI Components** - From basic editor to full-featured layouts with toolbars
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🌙 **Theme Support** - Light/dark/system themes with custom Qlik-inspired styling
- ⚡ **Performance Optimized** - Lazy loading and code splitting for optimal bundle size
- 🔧 **TypeScript First** - Complete type definitions and excellent developer experience
- 🎪 **Customizable** - Extensible with Tailwind CSS and custom variables

---

## 📦 Installation

```bash
npm install qlik-script-editor monaco-editor react react-dom
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react@>=18.0.0 react-dom@>=18.0.0 monaco-editor@>=0.44.0
```

---

## 🎯 Usage

### Basic Implementation

```tsx
import React, { useState } from 'react';
import { QlikScriptEditor, ThemeProvider } from 'qlik-script-editor';

function App() {
  const [script, setScript] = useState(`
    LOAD 
        CustomerID,
        CustomerName,
        Country
    FROM [lib://DataFiles/Customers.xlsx]
    (ooxml, embedded labels, table is Sheet1);
  `);

  return (
    <ThemeProvider defaultTheme="dark">
      <div style={{ height: '600px' }}>
        <QlikScriptEditor
          initialScript={script}
          onChange={setScript}
          variables={['vCurrentYear', 'vDataPath']}
        />
      </div>
    </ThemeProvider>
  );
}
```

### Complete Editor with UI

```tsx
import { QlikScriptEditorComplete, ThemeProvider } from 'qlik-script-editor';

function QlikApp() {
  const [script, setScript] = useState('');
  
  const qlikVariables = [
    'vCurrentYear',
    'vLastYear', 
    'vDataPath',
    'vQVDPath'
  ];

  return (
    <ThemeProvider defaultTheme="system">
      <div className="h-screen">
        <QlikScriptEditorComplete
          initialScript="// Start writing your Qlik script here"
          variables={qlikVariables}
          onScriptChange={setScript}
          title="My Qlik Editor"
          subtitle="Build powerful data load scripts"
        />
      </div>
    </ThemeProvider>
  );
}
```

---

## 📚 API Reference

### QlikScriptEditor

The core Monaco Editor component with Qlik Sense language support.

```tsx
interface QlikScriptEditorProps {
  initialScript: string;
  onChange: (value: string) => void;
  variables?: string[];
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `initialScript` | `string` | ✅ | Initial script content to load in the editor |
| `onChange` | `(value: string) => void` | ✅ | Callback fired when script content changes |
| `variables` | `string[]` | ❌ | Array of variable names for autocomplete suggestions |
| `onMount` | `(editor) => void` | ❌ | Callback fired when editor is mounted |

### QlikScriptEditorComplete

Full-featured editor with toolbar, status bar, and comprehensive UI.

```tsx
interface QlikScriptEditorCompleteProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  className?: string;
  title?: string;
  subtitle?: string;
}
```

### ThemeProvider

Provides theme context for the editor components.

```tsx
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}
```

---

## 🎪 Advanced Features

### Custom Variable Autocomplete

```tsx
const myVariables = [
  'vCurrentYear',    // $(vCurrentYear)
  'vLastYear',       // $(vLastYear)
  'vDataPath',       // $(vDataPath)
  'vQVDPath',        // $(vQVDPath)
];

<QlikScriptEditor
  initialScript="LET vTotal = $(vCurrentYear) - $(vLastYear);"
  onChange={handleChange}
  variables={myVariables}
/>
```

### Autocomplete Features

- **Type `$(` or `$`** - Triggers variable suggestions
- **Type `[`** - Shows field reference suggestions  
- **Type any word** - Shows keyword and function suggestions
- **Ctrl+Space** - Manual autocomplete trigger
- **Rich Documentation** - Hover over functions for parameter info

### Built-in Language Support

- **Keywords**: `LOAD`, `SELECT`, `JOIN`, `WHERE`, `IF`, `THEN`, `ELSE`, etc.
- **Functions**: `Sum()`, `Count()`, `Date()`, `SubField()`, `Peek()`, etc.
- **System Variables**: Built-in Qlik system variables
- **Code Snippets**: Common patterns like `load-table`, `left-join`, `if-block`

---

## 🎨 Theming

### Theme Options

- **light** - Light theme optimized for Qlik development
- **dark** - Dark theme with Qlik-inspired colors
- **system** - Automatically follows system preference

### Custom Styling

```tsx
import { QlikScriptEditorComplete } from '@ranjith/qlik-script-editor';

<QlikScriptEditorComplete
  className="border-2 border-blue-500 rounded-xl shadow-2xl"
  initialScript="// Your script here"
/>
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Space` | Trigger autocomplete |
| `Ctrl+/` | Toggle line comment |
| `Ctrl+F` | Find and replace |
| `Ctrl+G` | Go to line |
| `Ctrl+D` | Select next occurrence |
| `Alt+F12` | Peek definition |
| `F12` | Go to definition |

---

## 🌟 Examples

Check out the [example app](./example/) in this workspace for a complete implementation showing:

- NPM package integration
- Theme switching
- Variable auto-completion
- Real-world Qlik script editing
- Responsive design

---

## 🤝 Contributing

We welcome contributions! Please see the main [README](../../README.md) for development setup and contribution guidelines.

---

## 📄 License

MIT License - see the [LICENSE](../../LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Monaco Editor** - The powerful code editor that powers VS Code
- **Qlik Sense** - For the amazing BI platform and scripting language
- **React Community** - For the excellent ecosystem
- **Tailwind CSS** - For the utility-first CSS framework

---

<div align="center">

**Made with ❤️ for the Qlik Community**

[![npm](https://img.shields.io/npm/v/@ranjith/qlik-script-editor)](https://www.npmjs.com/package/@ranjith/qlik-script-editor)
[![GitHub stars](https://img.shields.io/github/stars/ranjith/qlik-script-editor)](https://github.com/ranvithm/qlik-script-editor/stargazers)

</div>