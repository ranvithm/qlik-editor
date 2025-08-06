# 💡 Qlik Script Editor Example App

This example application demonstrates how to use the `@ranjith/qlik-script-editor` NPM package in a real React application.

## 🚀 Features Demonstrated

- ✅ **NPM Package Integration** - Shows how to import and use the editor package
- ✅ **Theme Switching** - Light/dark/system theme support
- ✅ **Variable Auto-completion** - Custom Qlik variables in autocomplete
- ✅ **Real-world Script** - Sample Qlik Sense data load script
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Modern React** - Uses React 19 with TypeScript

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ (with workspaces support)

### Installation & Running

From the workspace root:

```bash
# Install dependencies for all packages
npm install

# Build the editor package first
npm run build:package

# Start the example app
npm run dev
```

Or run directly from this directory:

```bash
# From packages/qlik-script-editor/example/
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
example/
├── src/
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # React entry point
│   ├── index.css            # Global styles with Tailwind
│   └── vite-env.d.ts        # TypeScript definitions
│
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # This file
```

## 💻 Code Examples

### Basic Integration

```tsx
import { QlikScriptEditorComplete, ThemeProvider } from '@ranjith/qlik-script-editor';
import '@ranjith/qlik-script-editor/styles';

function App() {
  const [script, setScript] = useState(SAMPLE_SCRIPT);

  return (
    <ThemeProvider defaultTheme="dark">
      <QlikScriptEditorComplete
        initialScript={script}
        variables={SAMPLE_VARIABLES}
        onScriptChange={setScript}
        title="Qlik Script Editor Package Demo"
      />
    </ThemeProvider>
  );
}
```

### Custom Variables

```tsx
const SAMPLE_VARIABLES = [
  "vDataPath",
  "vCurrentYear", 
  "vLastYear",
  "vOutputPath",
  "vCompanyName",
  "vReportDate",
  "vCurrency"
];
```

### Sample Script

The example includes a comprehensive Qlik script showing:

- Variable definitions with `SET` and `LET`
- Data loading from various sources (Excel, CSV, QVD)
- Table joins and transformations
- Conditional logic and expressions
- Data storage operations

## 🎨 Styling

The example uses Tailwind CSS for styling and demonstrates:

- **Responsive Layout** - Adapts to different screen sizes
- **Theme Integration** - Consistent with the editor's theme system
- **Custom Styling** - How to add your own CSS classes
- **CSS Variables** - Using Tailwind's CSS custom properties

## 🔧 Configuration

### Vite Configuration

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

### TypeScript Configuration

The example uses modern TypeScript configuration with:
- ES2020 target
- Bundler module resolution  
- Strict type checking
- React JSX support

## 📝 Usage Patterns

### 1. Basic Editor

```tsx
<QlikScriptEditor
  initialScript={script}
  onChange={setScript}
  variables={variables}
/>
```

### 2. Complete Editor with UI

```tsx
<QlikScriptEditorComplete
  initialScript={script}
  variables={variables}
  onScriptChange={handleChange}
  title="My Editor"
  subtitle="Description"
/>
```

### 3. Theme Provider

```tsx
<ThemeProvider defaultTheme="system" storageKey="my-theme">
  {/* Your editor components */}
</ThemeProvider>
```

## 🚀 Build & Deploy

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## 🔍 What You'll See

The example app includes:

1. **Header Section** - Title and description
2. **Editor Area** - Full-featured Qlik script editor with:
   - Syntax highlighting for Qlik language
   - Auto-completion for keywords, functions, variables
   - Theme toggle (light/dark/system)
   - Toolbar with action buttons
   - Status bar with script statistics
   - Error highlighting and validation

3. **Sample Content** - Realistic Qlik script with:
   - Variable definitions
   - Data load statements
   - JOIN operations
   - Conditional logic
   - Field transformations

## 🛠️ Customization

### Adding Custom Variables

```tsx
const myVariables = [
  'vMyVariable',
  'vAnotherVar',
  'vCustomPath'
];

<QlikScriptEditorComplete variables={myVariables} />
```

### Custom Styling

```tsx
<QlikScriptEditorComplete
  className="my-custom-editor"
  title="Custom Title"
  subtitle="Custom Subtitle"
/>
```

### Event Handling

```tsx
const handleScriptChange = (newScript: string) => {
  console.log('Script changed:', newScript.length, 'characters');
  setScript(newScript);
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Monaco Editor not loading** - Make sure `monaco-editor` is installed as a peer dependency

2. **Styles not applied** - Import the CSS: `import '@ranjith/qlik-script-editor/styles'`

3. **TypeScript errors** - Ensure you have the latest TypeScript and React types

4. **Build errors** - Check that all peer dependencies are correctly installed

### Getting Help

- Check the [main README](../../../README.md) for workspace setup
- Review the [package documentation](../README.md)
- Look at the source code in `src/App.tsx`

## 📄 License

This example app is part of the Qlik Script Editor workspace and is licensed under the MIT License.

---

**Happy coding with Qlik Script Editor! 🚀**