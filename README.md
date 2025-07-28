# @ranjith/qlik-script-editor

<div align="center">

[![npm version](https://badge.fury.io/js/@ranjith%2Fqlik-script-editor.svg)](https://badge.fury.io/js/@ranjith%2Fqlik-script-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A powerful React Monaco Editor component specifically designed for **Qlik Sense scripts** with comprehensive syntax highlighting, intelligent autocomplete, and modern UI components.

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [API](#api-reference) • [Examples](#examples) • [Contributing](#contributing)

</div>

---

## 🚀 Overview

`@ranjith/qlik-script-editor` provides a complete Monaco Editor solution tailored for Qlik Sense development. Built with React, TypeScript, and Tailwind CSS, it offers VS Code-level editing experience for Qlik scripts with intelligent autocomplete, syntax highlighting, and responsive UI components.

### ✨ Features

- 🎯 **Complete Qlik Sense Language Support** - 100+ keywords, 200+ functions with full syntax highlighting
- 🧠 **Intelligent IntelliSense** - Context-aware autocomplete for keywords, functions, variables, and code snippets
- 🎨 **Multiple UI Components** - From basic editor to full-featured layouts with toolbars
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🌙 **Dark Theme** - Qlik Sense Developer-inspired dark theme
- ⚡ **Performance Optimized** - Lazy loading and code splitting for optimal bundle size
- 🔧 **TypeScript First** - Complete type definitions and excellent developer experience
- 🎪 **Customizable** - Extensible with Tailwind CSS and custom variables

---

## 📦 Installation

```bash
npm install @ranjith/qlik-script-editor
```

```bash
yarn add @ranjith/qlik-script-editor
```

```bash
pnpm add @ranjith/qlik-script-editor
```

### Peer Dependencies

```bash
npm install react react-dom monaco-editor
```

---

## 🎯 Usage

### Basic Implementation

```tsx
import React, { useState } from 'react';
import { QlikScriptEditor } from '@ranjith/qlik-script-editor';

function App() {
  const [script, setScript] = useState(`
    // Sample Qlik Sense script
    LOAD 
        CustomerID,
        CustomerName,
        Country
    FROM [lib://DataFiles/Customers.xlsx]
    (ooxml, embedded labels, table is Sheet1);
  `);

  return (
    <div style={{ height: '600px' }}>
      <QlikScriptEditor
        initialScript={script}
        onChange={setScript}
        variables={['vCurrentYear', 'vDataPath']}
      />
    </div>
  );
}

export default App;
```

### Complete React App Example

```tsx
import React, { useState } from 'react';
import { SimpleQlikEditor } from '@ranjith/qlik-script-editor';

const QlikApp = () => {
  const [script, setScript] = useState('');
  
  // Define your Qlik variables for autocomplete
  const qlikVariables = [
    'vCurrentYear',
    'vLastYear', 
    'vDataPath',
    'vQVDPath',
    'vToday'
  ];

  const sampleScript = `
SET ThousandSep=',';
SET DecimalSep='.';
SET DateFormat='M/D/YYYY';

// Load customer data
LOAD
    CustomerID,
    CustomerName,
    City,
    Country,
    Region
FROM [lib://DataFiles/Customers.xlsx]
(ooxml, embedded labels, table is Sheet1);

// Variables example
LET vCurrentYear = Year(Today());
LET vLastYear = $(vCurrentYear) - 1;

// Load sales data with variables
LOAD
    OrderID,
    CustomerID,
    OrderDate,
    Quantity * UnitPrice as TotalAmount
FROM [lib://DataFiles/Orders.csv]
WHERE Year(OrderDate) >= $(vLastYear);
  `;

  return (
    <div className="h-screen bg-gray-100">
      <SimpleQlikEditor
        initialScript={sampleScript}
        variables={qlikVariables}
        onScriptChange={setScript}
        className="shadow-lg"
      />
    </div>
  );
};

export default QlikApp;
```

### Advanced Layout with Toolbar

```tsx
import React, { useState } from 'react';
import { QlikScriptEditorLayout } from '@ranjith/qlik-script-editor';

function AdvancedQlikEditor() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleRun = async () => {
    console.log('Executing Qlik script...');
    // Your script execution logic here
  };

  const handleFormat = () => {
    console.log('Formatting script...');
    // Your formatting logic here
  };

  const handleSave = () => {
    console.log('Saving script...');
    // Your save logic here
  };

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'}>
      <QlikScriptEditorLayout
        initialScript="// Start writing your Qlik script here"
        variables={['vCurrentYear', 'vDataPath', 'vQVDPath']}
        onRun={handleRun}
        onFormat={handleFormat}
        onSave={handleSave}
        showToolbar={true}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
      />
    </div>
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
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `initialScript` | `string` | ✅ | Initial script content to load in the editor |
| `onChange` | `(value: string) => void` | ✅ | Callback fired when script content changes |
| `variables` | `string[]` | ❌ | Array of variable names for autocomplete suggestions |

### SimpleQlikEditor

Clean, responsive layout with basic toolbar and modern styling.

```tsx
interface SimpleQlikEditorProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  className?: string;
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `initialScript` | `string` | ❌ | Initial script content |
| `variables` | `string[]` | ❌ | Variables for autocomplete |
| `onScriptChange` | `(script: string) => void` | ❌ | Script change callback |
| `className` | `string` | ❌ | Additional CSS classes |

### QlikScriptEditorLayout

Full-featured layout with comprehensive toolbar and status bar.

```tsx
interface QlikScriptEditorLayoutProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  onRun?: () => void;
  onFormat?: () => void;
  onSave?: () => void;
  onLoad?: () => void;
  showToolbar?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  className?: string;
}
```

### LazyQlikScriptEditor

Lazy-loaded version with loading skeleton and error boundary for optimal performance.

```tsx
import { LazyQlikScriptEditor } from '@ranjith/qlik-script-editor';

<LazyQlikScriptEditor
  initialScript="LOAD * FROM DataSource;"
  onChange={handleChange}
  variables={['vYear', 'vPath']}
/>
```

---

## 🎪 Custom Autocomplete with Variables

The editor supports custom variable autocomplete using the `variables` prop:

```tsx
const myVariables = [
  'vCurrentYear',    // $(vCurrentYear)
  'vLastYear',       // $(vLastYear)
  'vDataPath',       // $(vDataPath)
  'vQVDPath',        // $(vQVDPath)
  'vToday',          // $(vToday)
  'vUserName'        // $(vUserName)
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

### Built-in Autocomplete Categories

1. **Keywords**: `LOAD`, `SELECT`, `JOIN`, `WHERE`, `IF`, `THEN`, `ELSE`, etc.
2. **Functions**: `Sum()`, `Count()`, `Date()`, `SubField()`, `Peek()`, etc.
3. **System Variables**: `$(vToday)`, `$(vCurrentYear)`, etc.
4. **User Variables**: Your custom variables from the `variables` prop
5. **Code Snippets**: Common patterns like `load-table`, `left-join`, `if-block`

---

## 🎨 Styling with Tailwind CSS

The components are built with Tailwind CSS and can be customized:

```tsx
import { SimpleQlikEditor } from '@ranjith/qlik-script-editor';

<SimpleQlikEditor
  className="border-2 border-blue-500 rounded-xl shadow-2xl"
  initialScript="// Your script here"
/>
```

### Custom Theme Example

```tsx
// Custom wrapper with your styling
<div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl">
  <SimpleQlikEditor
    initialScript={script}
    variables={variables}
    className="shadow-xl border border-gray-200"
  />
</div>
```

### Dark Mode Support

The editor automatically supports dark mode through Tailwind's dark mode classes:

```css
/* Your global CSS */
@media (prefers-color-scheme: dark) {
  .qlik-editor {
    /* Dark theme automatically applied */
  }
}
```

---

## 🌟 Examples

### 1. Basic Qlik Script Editor

```tsx
import { QlikScriptEditor } from '@ranjith/qlik-script-editor';

export const BasicExample = () => {
  const [script, setScript] = useState('LOAD * FROM DataSource;');
  
  return (
    <div className="h-96">
      <QlikScriptEditor
        initialScript={script}
        onChange={setScript}
        variables={['vPath', 'vYear']}
      />
    </div>
  );
};
```

### 2. Full-Featured Editor

```tsx
import { QlikScriptEditorLayout } from '@ranjith/qlik-script-editor';

export const FullFeaturedExample = () => {
  return (
    <QlikScriptEditorLayout
      initialScript="// Advanced Qlik script"
      variables={['vCurrentYear', 'vDataPath']}
      onRun={() => console.log('Run clicked')}
      onSave={() => console.log('Save clicked')}
      showToolbar={true}
    />
  );
};
```

### 3. Mobile-Responsive Editor

```tsx
import { SimpleQlikEditor } from '@ranjith/qlik-script-editor';

export const MobileExample = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <SimpleQlikEditor
        initialScript="// Mobile-friendly editor"
        className="h-full shadow-lg rounded-lg"
      />
    </div>
  );
};
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

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/ranjith/qlik-script-editor.git
cd qlik-script-editor

# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build:lib

# Run tests (if available)
npm test
```

### Contribution Guidelines

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Areas for Contribution

- 🐛 **Bug Fixes** - Report and fix issues
- ✨ **New Features** - Add new editor capabilities
- 📚 **Documentation** - Improve docs and examples
- 🎨 **UI/UX** - Enhance the visual design
- 🔧 **Performance** - Optimize bundle size and runtime
- 🧪 **Testing** - Add unit and integration tests

### Code Style

- Use **TypeScript** for all code
- Follow **ESLint** configuration
- Use **Prettier** for formatting
- Write **clear commit messages**
- Add **JSDoc** comments for public APIs

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Monaco Editor** - The powerful code editor that powers VS Code
- **Qlik Sense** - For the amazing BI platform and scripting language
- **React Community** - For the excellent ecosystem
- **Tailwind CSS** - For the utility-first CSS framework

---

## 📞 Support

- 📚 [Documentation](https://github.com/ranjith/qlik-script-editor#readme)
- 🐛 [Issue Tracker](https://github.com/ranjith/qlik-script-editor/issues)
- 💬 [Discussions](https://github.com/ranjith/qlik-script-editor/discussions)
- 📧 [Email Support](mailto:support@example.com)

---

<div align="center">

**Made with ❤️ for the Qlik Community**

[![npm](https://img.shields.io/npm/v/@ranjith/qlik-script-editor)](https://www.npmjs.com/package/@ranjith/qlik-script-editor)
[![GitHub stars](https://img.shields.io/github/stars/ranjith/qlik-script-editor)](https://github.com/ranjith/qlik-script-editor/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/ranjith/qlik-script-editor)](https://github.com/ranjith/qlik-script-editor/issues)

</div>
