// Example of how to consume qlik-script-editor in a React application
import React, { useState } from 'react';
import { 
  QlikScriptEditor, 
  QlikScriptEditorComplete,
  ThemeProvider,
  type QlikScriptEditorProps 
} from 'qlik-script-editor';

// Import the required styles
import 'qlik-script-editor/styles';

// Example 1: Basic usage
function BasicEditorExample() {
  const [script, setScript] = useState('// Your Qlik script here');
  const [variables] = useState(['OrderID', 'CustomerName', 'SalesAmount']);

  const handleScriptChange = (newScript: string) => {
    setScript(newScript);
    console.log('Script updated:', newScript);
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <QlikScriptEditor
        initialScript={script}
        onChange={handleScriptChange}
        variables={variables}
        className="border border-gray-300 rounded"
      />
    </div>
  );
}

// Example 2: Complete editor with all features
function CompleteEditorExample() {
  const [script, setScript] = useState(`
LOAD * FROM [
  OrderID,
  CustomerName,
  SalesAmount,
  OrderDate
] (qvd);

SET vToday = Today();
  `);

  return (
    <ThemeProvider defaultTheme="system" storageKey="qlik-editor-theme">
      <div style={{ height: '600px', width: '100%' }}>
        <QlikScriptEditorComplete
          initialScript={script}
          onScriptChange={(newScript) => console.log('Updated:', newScript)}
          title="Sales Data Script"
          subtitle="Data loading and transformation"
          variables={['OrderID', 'CustomerName', 'SalesAmount', 'OrderDate']}
        />
      </div>
    </ThemeProvider>
  );
}

// Example 3: Custom integration with Monaco features
function CustomEditorExample() {
  const [script, setScript] = useState('');

  const handleEditorMount = (editor: any) => {
    // Add custom commands, themes, or other Monaco features
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      console.log('Save shortcut pressed');
    });

    // Set custom options
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      wordWrap: 'on'
    });
  };

  return (
    <QlikScriptEditor
      initialScript={script}
      onChange={setScript}
      onMount={handleEditorMount}
      className="custom-editor"
      variables={[]}
    />
  );
}

// Main App component showing all examples
export default function App() {
  const [activeExample, setActiveExample] = useState<'basic' | 'complete' | 'custom'>('basic');

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Qlik Script Editor Examples</h1>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setActiveExample('basic')}
          className={`px-4 py-2 rounded ${activeExample === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Basic Editor
        </button>
        <button 
          onClick={() => setActiveExample('complete')}
          className={`px-4 py-2 rounded ${activeExample === 'complete' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Complete Editor
        </button>
        <button 
          onClick={() => setActiveExample('custom')}
          className={`px-4 py-2 rounded ${activeExample === 'custom' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Custom Integration
        </button>
      </div>

      <div className="border rounded-lg p-4">
        {activeExample === 'basic' && <BasicEditorExample />}
        {activeExample === 'complete' && <CompleteEditorExample />}
        {activeExample === 'custom' && <CustomEditorExample />}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Installation:</h3>
        <code className="block bg-gray-800 text-green-400 p-2 rounded">
          npm install qlik-script-editor monaco-editor react react-dom
        </code>
        
        <h3 className="font-semibold mb-2 mt-4">Import styles:</h3>
        <code className="block bg-gray-800 text-green-400 p-2 rounded">
          import 'qlik-script-editor/styles';
        </code>
      </div>
    </div>
  );
}

// TypeScript usage example
interface CustomAppProps {
  initialCode?: string;
  onSave?: (code: string) => void;
}

export function TypeScriptExample({ initialCode = '', onSave }: CustomAppProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <QlikScriptEditorComplete
        initialScript={initialCode}
        onScriptChange={onSave}
        title="TypeScript Integration"
        className="h-96"
      />
    </ThemeProvider>
  );
}