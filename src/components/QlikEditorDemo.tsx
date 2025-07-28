import React, { useState } from 'react';
import QlikScriptEditorComplete from './QlikScriptEditorComplete';
import { designTokens } from './ui/design-system';
import { cn } from '../lib/utils';

const SAMPLE_SCRIPT = `// Sample Qlik Sense Data Load Script
// This script demonstrates various Qlik features

// Set variables
SET vDataPath = 'lib://data/';
LET vCurrentYear = Year(Now());
LET vLastYear = $(vCurrentYear) - 1;

// Load sales data
LOAD
    OrderID,
    CustomerID,
    [Product Name],
    [Order Date],
    [Sales Amount],
    Quantity,
    Year([Order Date]) as OrderYear,
    Month([Order Date]) as OrderMonth,
    If([Sales Amount] > 1000, 'High', 'Low') as SalesCategory
FROM [$(vDataPath)/sales_data.xlsx]
(ooxml, embedded labels, table is Sheet1)
WHERE Year([Order Date]) >= $(vLastYear);

// Load customer data
LEFT JOIN (Sales)
LOAD
    CustomerID,
    [Customer Name],
    City,
    Country,
    Region
FROM [$(vDataPath)/customers.csv]
(txt, codepage is 1252, embedded labels, delimiter is ',', msq);

// Create a calendar table
LOAD
    Date,
    Year(Date) as Year,
    Month(Date) as Month,
    MonthName(Date) as MonthName,
    Quarter(Date) as Quarter,
    WeekDay(Date) as WeekDay,
    Week(Date) as Week
FROM [$(vDataPath)/calendar.qvd] (qvd);

// Drop temporary fields
DROP FIELD [Order Date];

// Store data model
STORE Sales INTO [lib://output/sales_model.qvd] (qvd);`;

const SAMPLE_VARIABLES = [
  'vDataPath',
  'vCurrentYear', 
  'vLastYear',
  'vOutputPath',
  'vCompanyName',
  'vReportDate',
  'vCurrency'
];

const QlikEditorDemo: React.FC = () => {
  const [selectedScript, setSelectedScript] = useState(SAMPLE_SCRIPT);
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(true);

  const handleScriptChange = (newScript: string) => {
    setSelectedScript(newScript);
    console.log('Script changed:', newScript.length, 'characters');
  };

  const scriptTemplates = [
    {
      name: 'Empty Script',
      description: 'Start with a blank script',
      script: '// Your Qlik script here\n\n'
    },
    {
      name: 'Basic Load',
      description: 'Simple data loading template',
      script: `// Basic data loading script
LOAD
    Field1,
    Field2,
    Field3
FROM [data_source.xlsx]
(ooxml, embedded labels, table is Sheet1);`
    },
    {
      name: 'Join Example',
      description: 'Data joining template',
      script: `// Main table
LOAD
    CustomerID,
    OrderID,
    [Order Date],
    [Sales Amount]
FROM [orders.csv]
(txt, codepage is 1252, embedded labels, delimiter is ',');

// Join customer data
LEFT JOIN (Orders)
LOAD
    CustomerID,
    [Customer Name],
    City,
    Country
FROM [customers.csv]
(txt, codepage is 1252, embedded labels, delimiter is ',');`
    },
    {
      name: 'Advanced Script',
      description: 'Complex script with variables and transformations',
      script: SAMPLE_SCRIPT
    }
  ];

  return (
    <div className={cn(
      "h-screen w-full flex flex-col",
      designTokens.colors.bg.primary
    )}>
      {/* Demo Header */}
      <div className={cn(
        designTokens.colors.bg.secondary,
        designTokens.colors.border.primary,
        "border-b px-6 py-4"
      )}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn(
              designTokens.typography.heading.primary,
              designTokens.colors.text.primary
            )}>
              Qlik Script Editor Demo
            </h1>
            <p className={cn(
              designTokens.colors.text.secondary,
              designTokens.typography.body.primary,
              "mt-1"
            )}>
              Full-featured Qlik Sense script editor with syntax highlighting, auto-completion, and execution simulation
            </p>
          </div>

          {/* Template Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className={cn(
                designTokens.colors.text.secondary,
                designTokens.typography.body.primary
              )}>
                Template:
              </label>
              <select
                onChange={(e) => {
                  const template = scriptTemplates[parseInt(e.target.value)];
                  if (template) {
                    setSelectedScript(template.script);
                  }
                }}
                className={cn(
                  designTokens.colors.bg.tertiary,
                  designTokens.colors.text.primary,
                  designTokens.colors.border.primary,
                  "border rounded-md px-3 py-1 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
              >
                {scriptTemplates.map((template, index) => (
                  <option key={index} value={index}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="advanced-features"
                checked={showAdvancedFeatures}
                onChange={(e) => setShowAdvancedFeatures(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label 
                htmlFor="advanced-features"
                className={cn(
                  designTokens.colors.text.secondary,
                  designTokens.typography.body.primary
                )}
              >
                Advanced Features
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      {showAdvancedFeatures && (
        <div className={cn(
          designTokens.colors.bg.secondary,
          designTokens.colors.border.primary,
          "border-b px-6 py-3"
        )}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Syntax Highlighting', desc: 'Full Qlik language support' },
              { title: 'Auto-completion', desc: 'IntelliSense with 200+ functions' },
              { title: 'Script Execution', desc: 'Simulate script running' },
              { title: 'File Operations', desc: 'Save/load scripts' },
              { title: 'Format Code', desc: 'Auto-format your scripts' },
              { title: 'Error Detection', desc: 'Real-time validation' }
            ].map((feature, index) => (
              <div
                key={index}
                className={cn(
                  designTokens.colors.bg.tertiary,
                  designTokens.colors.border.secondary,
                  "border rounded-lg p-3 text-center"
                )}
              >
                <h3 className={cn(
                  designTokens.typography.body.primary,
                  designTokens.colors.text.primary,
                  "font-medium mb-1"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  designTokens.typography.body.secondary,
                  designTokens.colors.text.muted
                )}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Editor */}
      <div className="flex-1 min-h-0">
        <QlikScriptEditorComplete
          initialScript={selectedScript}
          variables={SAMPLE_VARIABLES}
          onScriptChange={handleScriptChange}
          title="Qlik Script Editor"
          subtitle="Full-featured editor with syntax highlighting, auto-completion, and script execution"
          autoSave={true}
          showNotifications={true}
        />
      </div>

      {/* Footer */}
      <div className={cn(
        designTokens.colors.bg.secondary,
        designTokens.colors.border.primary,
        "border-t px-6 py-2"
      )}>
        <div className="flex items-center justify-between text-sm">
          <div className={cn(designTokens.colors.text.muted)}>
            Try these features: Run script (Ctrl+R) • Format code (Shift+Alt+F) • Save file (Ctrl+S) • Fullscreen (F11)
          </div>
          <div className={cn(designTokens.colors.text.muted)}>
            React + Monaco Editor + TypeScript
          </div>
        </div>
      </div>
    </div>
  );
};

export default QlikEditorDemo;