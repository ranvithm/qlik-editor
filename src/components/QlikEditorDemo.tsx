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

  const handleScriptChange = (newScript: string) => {
    setSelectedScript(newScript);
    console.log('Script changed:', newScript.length, 'characters');
  };


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

        </div>
      </div>


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