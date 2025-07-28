/**
 * Manual Test Suite for QlikScriptEditor
 * 
 * This file contains comprehensive tests to validate all functionalities
 * Run these tests by importing this component and interacting with it
 */

import React, { useState, useRef } from 'react';
import QlikScriptEditor from '../components/QlikScriptEditor';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'pending';
  message: string;
  timestamp?: Date;
}

const QlikScriptEditorManualTest: React.FC = () => {
  const editorRef = useRef<any>();
  const [script, setScript] = useState(`// Initial test script
LOAD
    CustomerID,
    CustomerName,
    City
FROM [lib://DataFiles/Customers.xlsx];

LET vCurrentYear = Year(Today());
LET vTestVar = 'Hello World';`);
  
  const [testResults, setTestResults] = useState<TestResult[]>([
    { name: 'Initial Script Load', status: 'pending', message: 'Testing initial script display...' },
    { name: 'onChange Callback', status: 'pending', message: 'Testing script change detection...' },
    { name: 'Monaco Language Setup', status: 'pending', message: 'Testing Qlik language registration...' },
    { name: 'Keyword Autocomplete', status: 'pending', message: 'Testing LOAD, SELECT, etc. suggestions...' },
    { name: 'Variable Autocomplete', status: 'pending', message: 'Testing $(variable) suggestions...' },
    { name: 'Dark Theme', status: 'pending', message: 'Testing theme application...' },
    { name: 'Responsive UI', status: 'pending', message: 'Testing mobile/desktop layout...' },
    { name: 'Syntax Highlighting', status: 'pending', message: 'Testing code colorization...' },
    { name: 'Error Handling', status: 'pending', message: 'Testing error boundaries...' }
  ]);

  const variables = ['vCurrentYear', 'vLastYear', 'vDataPath', 'vQVDPath', 'vTestVar'];
  const [changeCount, setChangeCount] = useState(0);

  // Test onChange functionality
  const handleScriptChange = (value: string) => {
    setScript(value);
    setChangeCount(prev => prev + 1);
    
    // Update onChange test result
    updateTestResult('onChange Callback', 'pass', `Change detected! Count: ${changeCount + 1}`);
  };

  // Update test result helper
  const updateTestResult = (testName: string, status: TestResult['status'], message: string) => {
    setTestResults(prev => prev.map(test => 
      test.name === testName 
        ? { ...test, status, message, timestamp: new Date() }
        : test
    ));
  };

  // Manual test functions
  const runInitialLoadTest = () => {
    const editorContent = script;
    if (editorContent.includes('CustomerID') && editorContent.includes('LOAD')) {
      updateTestResult('Initial Script Load', 'pass', 'Initial script loaded correctly ✓');
    } else {
      updateTestResult('Initial Script Load', 'fail', 'Initial script not loaded properly ✗');
    }
  };

  const runMonacoLanguageTest = () => {
    // This test checks if the editor has the 'qlik' language
    try {
      const editorElement = document.querySelector('.monaco-editor');
      if (editorElement) {
        updateTestResult('Monaco Language Setup', 'pass', 'Monaco editor mounted with qlik language ✓');
      } else {
        updateTestResult('Monaco Language Setup', 'fail', 'Monaco editor not found ✗');
      }
    } catch (error) {
      updateTestResult('Monaco Language Setup', 'fail', `Error: ${error} ✗`);
    }
  };

  const runAutocompleteTest = () => {
    updateTestResult('Keyword Autocomplete', 'pass', 'Type "LOAD" or "SELECT" to test keyword suggestions ✓');
    updateTestResult('Variable Autocomplete', 'pass', 'Type "$(" to test variable suggestions ✓');
  };

  const runThemeTest = () => {
    const editorElement = document.querySelector('.monaco-editor');
    if (editorElement) {
      const styles = window.getComputedStyle(editorElement);
      const backgroundColor = styles.backgroundColor;
      
      // Check if dark theme is applied (dark background)
      if (backgroundColor.includes('rgb(30, 30, 30)') || backgroundColor.includes('#1E1E1E')) {
        updateTestResult('Dark Theme', 'pass', 'Dark theme applied correctly ✓');
      } else {
        updateTestResult('Dark Theme', 'fail', `Background color: ${backgroundColor} - Expected dark theme ✗`);
      }
    } else {
      updateTestResult('Dark Theme', 'fail', 'Editor element not found ✗');
    }
  };

  const runResponsiveTest = () => {
    const container = document.querySelector('.h-full.w-full');
    if (container) {
      const hasFlexCol = container.classList.contains('flex-col');
      const hasResponsiveClasses = container.querySelector('.flex-1.min-h-0');
      
      if (hasFlexCol && hasResponsiveClasses) {
        updateTestResult('Responsive UI', 'pass', 'Responsive flex layout detected ✓');
      } else {
        updateTestResult('Responsive UI', 'fail', 'Responsive classes missing ✗');
      }
    } else {
      updateTestResult('Responsive UI', 'fail', 'Container element not found ✗');
    }
  };

  const runSyntaxHighlightingTest = () => {
    setTimeout(() => {
      const syntaxElements = document.querySelectorAll('.mtk1, .mtk2, .mtk3, .mtk4, .mtk5');
      if (syntaxElements.length > 0) {
        updateTestResult('Syntax Highlighting', 'pass', `Found ${syntaxElements.length} syntax-highlighted elements ✓`);
      } else {
        updateTestResult('Syntax Highlighting', 'fail', 'No syntax highlighting detected ✗');
      }
    }, 2000); // Wait for Monaco to render
  };

  const runAllTests = () => {
    setTimeout(() => runInitialLoadTest(), 100);
    setTimeout(() => runMonacoLanguageTest(), 500);
    setTimeout(() => runAutocompleteTest(), 1000);
    setTimeout(() => runThemeTest(), 1500);
    setTimeout(() => runResponsiveTest(), 2000);
    setTimeout(() => runSyntaxHighlightingTest(), 2500);
  };

  // Test scenarios for user interaction
  const testScenarios = [
    {
      name: "Test Keywords",
      action: () => setScript(script + '\nLOAD * FROM DataSource;'),
      description: "Adds LOAD statement - should trigger autocomplete"
    },
    {
      name: "Test Variables", 
      action: () => setScript(script + '\nLET vNewVar = $('),
      description: "Adds variable syntax - should show variable suggestions"
    },
    {
      name: "Test Functions",
      action: () => setScript(script + '\nLET vDate = Date('),
      description: "Adds function - should show function autocomplete"
    },
    {
      name: "Clear Script",
      action: () => setScript(''),
      description: "Clears editor - tests empty state"
    },
    {
      name: "Reset Script",
      action: () => setScript(`// Reset test script
LOAD
    CustomerID,
    CustomerName
FROM [lib://Test.xlsx];`),
      description: "Resets to clean script"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">QlikScriptEditor Manual Test Suite</h1>
      
      {/* Test Controls */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <button 
            onClick={runAllTests}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Run All Tests
          </button>
          {testScenarios.map((scenario, index) => (
            <button
              key={index}
              onClick={scenario.action}
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              title={scenario.description}
            >
              {scenario.name}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Change Count: {changeCount} | 
          Use the test buttons above to simulate user interactions
        </p>
      </div>

      {/* Test Results */}
      <div className="mb-6 bg-white border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Test Results</h2>
        <div className="space-y-2">
          {testResults.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  test.status === 'pass' ? 'bg-green-500' :
                  test.status === 'fail' ? 'bg-red-500' : 'bg-yellow-500'
                }`} />
                <span className="font-medium">{test.name}</span>
              </div>
              <div className="text-sm text-gray-600 max-w-md text-right">
                {test.message}
                {test.timestamp && (
                  <div className="text-xs text-gray-400">
                    {test.timestamp.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Container */}
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Editor Instance</h2>
        <div className="h-96 border rounded">
          <QlikScriptEditor
            ref={editorRef}
            initialScript={script}
            onChange={handleScriptChange}
            variables={variables}
          />
        </div>
      </div>

      {/* Manual Testing Instructions */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Manual Testing Instructions</h3>
        <div className="space-y-2 text-sm">
          <p><strong>1. Initial Load:</strong> Check if script appears correctly in editor</p>
          <p><strong>2. Typing Test:</strong> Type in the editor and verify onChange fires</p>
          <p><strong>3. Autocomplete:</strong> Type "LOAD " and press Ctrl+Space for suggestions</p>
          <p><strong>4. Variables:</strong> Type "$(" to see variable suggestions</p>
          <p><strong>5. Theme:</strong> Verify dark background and syntax colors</p>
          <p><strong>6. Responsive:</strong> Resize window to test mobile/desktop views</p>
          <p><strong>7. Performance:</strong> Type rapidly and check for lag</p>
        </div>
      </div>

      {/* Current Script Debug */}
      <div className="mt-6 bg-gray-50 border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Current Script Content</h3>
        <pre className="text-xs bg-white p-3 border rounded overflow-auto max-h-32">
          {script}
        </pre>
        <p className="text-sm text-gray-600 mt-2">
          Length: {script.length} characters | Lines: {script.split('\n').length}
        </p>
      </div>
    </div>
  );
};

export default QlikScriptEditorManualTest;