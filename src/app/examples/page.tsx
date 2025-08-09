"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import { Input } from "@/components/ui/input";
import {
  Copy,
  Play,
  Lightbulb,
  BookOpen,
  Zap,
  Database,
  BarChart3,
  Filter,
  Code2,
  Search,
  X,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const examples = [
  {
    id: "basic",
    title: "Basic Usage",
    description: "Simple editor setup with default configuration",
    category: "Getting Started",
    difficulty: "Beginner",
    reactCode: `import QlikEditor from 'qlik-script-editor';

function App() {
  return (
    <QlikEditor
      defaultValue="LOAD * FROM DataSource;"
      height="300px"
    />
  );
}`,
    qlikScript: `// Basic data loading example
LOAD 
  CustomerID,
  CustomerName,
  Country,
  Region,
  RegistrationDate
FROM [lib://DataFiles/Customers.xlsx]
(ooxml, embedded labels, table is Sheet1);`,
    tips: [
      "This is the simplest way to get started with qlik-script-editor",
      "The defaultValue prop sets the initial content",
      "Use height to control the editor size",
      "Perfect for simple script editing scenarios",
    ],
  },
  {
    id: "controlled",
    title: "Controlled Component",
    description: "State management with onChange handler",
    category: "State Management",
    difficulty: "Beginner",
    reactCode: `import { useState } from 'react';
import QlikEditor from 'qlik-script-editor';

function App() {
  const [code, setCode] = useState(\`LOAD * FROM DataSource;\`);
  
  const handleValidation = (value) => {
    // Add custom validation logic
    console.log('Script length:', value.length);
    console.log('Has syntax errors:', value.includes('ERROR'));
  };
  
  return (
    <div className="space-y-4">
      <QlikEditor
        value={code}
        onChange={(newValue) => {
          setCode(newValue);
          handleValidation(newValue);
        }}
        height="300px"
      />
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>Length: {code.length} characters</span>
        <span>Lines: {code.split('\\n').length}</span>
      </div>
    </div>
  );
}`,
    qlikScript: `// Controlled component with data transformation
LOAD 
  OrderID,
  CustomerID,
  Date(Date#(OrderDate, 'MM/DD/YYYY')) as OrderDate,
  Date(Date#(ShipDate, 'MM/DD/YYYY')) as ShipDate,
  if(ShipDate > OrderDate + 7, 'Delayed', 'On Time') as ShippingStatus
FROM [lib://DataFiles/Orders.xlsx]
(ooxml, embedded labels, table is Orders)
WHERE OrderDate >= '01/01/2023';

// Join with order details
LEFT JOIN (Orders)
LOAD 
  OrderID,
  ProductID,
  Quantity,
  UnitPrice,
  Quantity * UnitPrice as LineTotal
FROM [lib://DataFiles/OrderDetails.xlsx]
(ooxml, embedded labels, table is OrderDetails);`,
    tips: [
      "Use value and onChange for controlled components",
      "This allows you to react to content changes in real-time",
      "Perfect for form validation or live previews",
      "You can implement custom validation logic in the onChange handler",
    ],
  },
  {
    id: "theming",
    title: "Custom Theming",
    description: "Theme switching and custom styling",
    category: "Customization",
    difficulty: "Intermediate",
    reactCode: `import { useState } from 'react';
import QlikEditor from 'qlik-script-editor';

function App() {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(14);
  
  const customTheme = {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: '569cd6', fontStyle: 'bold' },
      { token: 'string', foreground: 'ce9178' },
      { token: 'number', foreground: 'b5cea8' },
      { token: 'comment', foreground: '6a9955', fontStyle: 'italic' }
    ],
    colors: {
      'editor.background': '#1e1e1e',
      'editor.foreground': '#d4d4d4'
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <select 
          onChange={(e) => setTheme(e.target.value)} 
          value={theme}
          className="px-3 py-1 border rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
          <option value="custom">Custom</option>
        </select>
        
        <div className="flex items-center gap-2">
          <label>Font Size:</label>
          <input
            type="range"
            min="12"
            max="20"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-20"
          />
          <span>{fontSize}px</span>
        </div>
      </div>
      
      <QlikEditor
        theme={theme === 'custom' ? customTheme : theme}
        fontSize={fontSize}
        defaultValue="LOAD * FROM DataSource;"
        height="350px"
        options={{
          minimap: { enabled: false },
          lineNumbers: 'on',
          folding: true
        }}
      />
    </div>
  );
}`,
    qlikScript: `// Advanced data transformation with styling
SET vCurrentYear = Year(Today());
SET vPreviousYear = $(vCurrentYear) - 1;
SET vDateFormat = 'MM/DD/YYYY';

// Load and transform customer data
LOAD 
  CustomerID,
  Upper(CustomerName) as CustomerName,
  Country,
  if(Country = 'USA', 'Domestic', 'International') as CustomerType,
  Date(Date#(RegistrationDate, '$(vDateFormat)')) as RegistrationDate,
  if(Year(Date#(RegistrationDate, '$(vDateFormat)')) >= $(vCurrentYear), 
     'New Customer', 
     'Existing Customer') as CustomerStatus
FROM [lib://DataFiles/Customers.xlsx]
(ooxml, embedded labels, table is Customers)
WHERE Year(Date#(RegistrationDate, '$(vDateFormat)')) >= $(vPreviousYear);

// Create a mapping table for country codes
Mapping LOAD
  Country,
  CountryCode
FROM [lib://DataFiles/CountryCodes.xlsx]
(ooxml, embedded labels, table is CountryCodes);

// Apply mapping to main table
MAP CustomerType USING CountryMapping;`,
    tips: [
      "The theme prop supports 'light', 'dark', 'auto', and custom theme objects",
      "'auto' theme follows the user's system preference",
      "You can customize colors through CSS variables or theme objects",
      "fontSize and other Monaco Editor options are supported",
    ],
  },
  {
    id: "advanced",
    title: "Advanced Configuration",
    description: "Full-featured editor with all bells and whistles",
    category: "Advanced",
    difficulty: "Advanced",
    reactCode: `import { useRef, useState, useCallback } from 'react';
import QlikEditor from 'qlik-script-editor';

function App() {
  const editorRef = useRef(null);
  const [errors, setErrors] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const formatCode = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.format();
    }
  }, []);
  
  const validateScript = useCallback((value) => {
    // Custom validation logic
    const lines = value.split('\\n');
    const newErrors = [];
    
    lines.forEach((line, index) => {
      if (line.trim().startsWith('LOAD') && !line.includes('FROM')) {
        newErrors.push({
          line: index + 1,
          message: 'LOAD statement missing FROM clause',
          severity: 'error'
        });
      }
    });
    
    setErrors(newErrors);
  }, []);
  
  const executeScript = useCallback(async () => {
    setIsExecuting(true);
    try {
      // Simulate script execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Script executed successfully');
    } catch (error) {
      console.error('Script execution failed:', error);
    } finally {
      setIsExecuting(false);
    }
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button 
          onClick={formatCode}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Format Code
        </button>
        <button 
          onClick={executeScript}
          disabled={isExecuting || errors.length > 0}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isExecuting ? 'Executing...' : 'Execute Script'}
        </button>
        {errors.length > 0 && (
          <span className="text-red-600 text-sm">
            {errors.length} error(s) found
          </span>
        )}
      </div>
      
      <QlikEditor
        ref={editorRef}
        defaultValue="LOAD * FROM DataSource;"
        height="400px"
        language="qlik"
        theme="vs-dark"
        onChange={validateScript}
        options={{
          autoComplete: true,
          lineNumbers: 'on',
          minimap: { enabled: true },
          folding: true,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true,
          bracketMatching: 'always',
          showUnused: true,
          suggest: {
            enableExtendedSyntax: true,
            showKeywords: true,
            showSnippets: true
          }
        }}
      />
      
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <h4 className="font-semibold text-red-800 mb-2">Validation Errors:</h4>
          <ul className="text-red-700 text-sm space-y-1">
            {errors.map((error, index) => (
              <li key={index}>
                Line {error.line}: {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`,
    qlikScript: `// Complete data pipeline example
SET ErrorMode = 0; // Continue on error
SET ThousandSep = ',';
SET DecimalSep = '.';
SET MoneyThousandSep = ',';
SET MoneyDecimalSep = '.';
SET DateFormat = 'M/D/YYYY';
SET TimeFormat = 'h:mm:ss TT';

// Variables for date calculations
SET vToday = Today();
SET vYesterday = $(vToday) - 1;
SET vLastMonth = AddMonths($(vToday), -1);
SET vCurrentYear = Year($(vToday));
SET vLastYear = $(vCurrentYear) - 1;

// Load dimension tables first
Customers:
LOAD 
  CustomerID,
  Capitalize(Trim(CustomerName)) as CustomerName,
  Upper(Country) as Country,
  Region,
  City,
  Date(Date#(RegistrationDate, 'M/D/YYYY')) as RegistrationDate,
  Email,
  Phone,
  if(Year(Date#(RegistrationDate, 'M/D/YYYY')) = $(vCurrentYear), 
     'New Customer', 
     if(Year(Date#(RegistrationDate, 'M/D/YYYY')) = $(vLastYear), 
        'Recent Customer', 
        'Established Customer')) as CustomerSegment
FROM [lib://DataFiles/Customers.qvd] (qvd)
WHERE Len(Trim(CustomerName)) > 0;

// Create country mapping for standardization
CountryMapping:
Mapping LOAD
  SourceCountry,
  StandardCountry
FROM [lib://Reference/CountryMapping.xlsx]
(ooxml, embedded labels, table is Mapping);

// Apply country mapping
MAP Country USING CountryMapping;

// Load and transform orders
Orders:
LOAD 
  OrderID,
  CustomerID,
  Date(Floor(Date#(OrderDate, 'M/D/YYYY'))) as OrderDate,
  Date(Floor(Date#(ShipDate, 'M/D/YYYY'))) as ShipDate,
  OrderAmount,
  ShippingCost,
  OrderAmount + ShippingCost as TotalAmount,
  if(Date#(ShipDate, 'M/D/YYYY') - Date#(OrderDate, 'M/D/YYYY') <= 2, 
     'Fast', 
     if(Date#(ShipDate, 'M/D/YYYY') - Date#(OrderDate, 'M/D/YYYY') <= 5, 
        'Standard', 
        'Slow')) as ShippingSpeed,
  Year(Date#(OrderDate, 'M/D/YYYY')) as OrderYear,
  Month(Date#(OrderDate, 'M/D/YYYY')) as OrderMonth,
  Quarter(Date#(OrderDate, 'M/D/YYYY')) as OrderQuarter
FROM [lib://DataFiles/Orders.qvd] (qvd)
WHERE Date#(OrderDate, 'M/D/YYYY') >= AddYears($(vToday), -3)
  AND IsNum(OrderAmount)
  AND OrderAmount > 0;

// Calculate customer metrics
CustomerMetrics:
LOAD 
  CustomerID,
  Count(OrderID) as TotalOrders,
  Sum(OrderAmount) as TotalSpent,
  Avg(OrderAmount) as AvgOrderAmount,
  Min(OrderDate) as FirstOrderDate,
  Max(OrderDate) as LastOrderDate,
  Max(OrderDate) - Min(OrderDate) as CustomerLifespanDays,
  if($(vToday) - Max(OrderDate) <= 30, 'Active', 
     if($(vToday) - Max(OrderDate) <= 90, 'At Risk', 
        'Inactive')) as CustomerStatus
FROM Orders
GROUP BY CustomerID;

// Join metrics back to customers
LEFT JOIN (Customers)
LOAD * FROM CustomerMetrics;

// Create calendar for time analysis
Calendar:
LOAD 
  Date,
  Year(Date) as Year,
  Month(Date) as Month,
  Day(Date) as Day,
  Quarter(Date) as Quarter,
  Week(Date) as Week,
  WeekDay(Date) as WeekDay,
  if(WeekDay(Date) >= 1 and WeekDay(Date) <= 5, 'Weekday', 'Weekend') as DayType,
  Date(MonthStart(Date)) as MonthStart,
  Date(QuarterStart(Date)) as QuarterStart
FROM [lib://Reference/Calendar.qvd] (qvd)
WHERE Date >= '1/1/2020' and Date <= '12/31/2025';`,
    tips: [
      "Use useRef to access editor methods programmatically",
      "The format() method automatically formats the code",
      "Enable autoComplete for enhanced developer experience",
      "Custom validation can be implemented in the onChange handler",
      "Monaco Editor options provide extensive customization",
    ],
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description: "Handling large scripts with performance considerations",
    category: "Performance",
    difficulty: "Advanced",
    reactCode: `import { memo, useMemo, useCallback } from 'react';
import QlikEditor from 'qlik-script-editor';

const PerformantQlikEditor = memo(({ 
  value, 
  onChange, 
  height = '400px',
  readOnly = false 
}) => {
  // Debounced change handler to prevent excessive updates
  const debouncedOnChange = useCallback(
    debounce((newValue) => {
      onChange?.(newValue);
    }, 300),
    [onChange]
  );

  // Memoized editor options for large files
  const editorOptions = useMemo(() => ({
    minimap: { enabled: false }, // Disable for large files
    lineNumbers: 'on',
    wordWrap: 'on',
    folding: true,
    renderWhitespace: 'boundary',
    smoothScrolling: true,
    cursorSmoothCaretAnimation: true,
    fontSize: 14,
    fontFamily: 'Consolas, Monaco, monospace',
    // Performance optimizations
    renderLineHighlight: 'line',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    suggest: {
      // Limit suggestions for better performance
      maxVisibleSuggestions: 10,
      quickSuggestions: { 
        other: true, 
        comments: false, 
        strings: false 
      }
    }
  }), []);

  return (
    <QlikEditor
      value={value}
      onChange={debouncedOnChange}
      height={height}
      theme="vs-dark"
      options={editorOptions}
      loading={<div className="p-4 text-center">Loading large script...</div>}
      readOnly={readOnly}
    />
  );
});

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function App() {
  const [largeScript, setLargeScript] = useState('');
  
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Optimized for handling large Qlik scripts (10,000+ lines)
      </div>
      <PerformantQlikEditor
        value={largeScript}
        onChange={setLargeScript}
        height="500px"
      />
    </div>
  );
}`,
    qlikScript: `// Large-scale enterprise data loading example
// This script demonstrates patterns for handling large datasets efficiently

// ==================== CONFIGURATION ====================
SET ErrorMode = 0;
SET Verbosity = 1; // Enable logging for monitoring

// Memory and performance settings
SET RAM_ScaleFactor = 1;
SET CPU_ScaleFactor = 1;

// Date and number formatting
SET ThousandSep = ',';
SET DecimalSep = '.';
SET DateFormat = 'YYYY-MM-DD';
SET TimestampFormat = 'YYYY-MM-DD hh:mm:ss';

// ==================== VARIABLES ====================
// Performance monitoring
SET vStartTime = Now();
SET vScriptVersion = '2024.01.15';
SET vDataPath = 'lib://Enterprise/Data/';

// Date range variables (last 5 years)
SET vMaxDate = Date(Today());
SET vMinDate = Date(AddYears(Today(), -5));
SET vCurrentYear = Year(Today());
SET vPreviousYear = $(vCurrentYear) - 1;

// ==================== MAIN DATA TABLES ====================

// Load customers with incremental loading
Customers:
LOAD 
  CustomerID,
  CustomerName,
  CompanyName,
  ContactTitle,
  Country,
  Region,
  City,
  PostalCode,
  Phone,
  Email,
  Date(Floor(CreatedDate)) as CustomerCreatedDate,
  Date(Floor(ModifiedDate)) as CustomerModifiedDate,
  if(Year(CreatedDate) = $(vCurrentYear), 'New', 'Existing') as CustomerType
FROM [$(vDataPath)Customers_*.qvd] (qvd)
WHERE CreatedDate >= '$(vMinDate)' 
  AND CreatedDate <= '$(vMaxDate)'
  AND Len(CustomerName) > 0;

// Optimize by storing in QVD for reuse
STORE Customers INTO [$(vDataPath)Processed/Customers_Processed.qvd] (qvd);

// Load products with hierarchy
Products:
LOAD 
  ProductID,
  ProductName,
  CategoryID,
  CategoryName,
  SubCategoryID,
  SubCategoryName,
  SupplierID,
  SupplierName,
  UnitPrice,
  UnitsInStock,
  if(UnitsInStock > 50, 'In Stock', 
     if(UnitsInStock > 0, 'Low Stock', 'Out of Stock')) as StockStatus,
  UnitPrice * UnitsInStock as StockValue,
  Date(Floor(ProductCreatedDate)) as ProductCreatedDate
FROM [$(vDataPath)Products.qvd] (qvd)
WHERE IsNum(UnitPrice) AND UnitPrice > 0;

// Create category hierarchy for drill-down
CategoryHierarchy:
Hierarchy(CategoryID, ParentCategoryID, CategoryName, CategoryPath, CategoryLevel)
LOAD 
  CategoryID,
  ParentCategoryID,
  CategoryName
FROM [$(vDataPath)Categories.qvd] (qvd);

// Load large transaction table in chunks
FOR vYear = $(vPreviousYear) to $(vCurrentYear)
  
  Transactions_$(vYear):
  LOAD 
    TransactionID,
    CustomerID,
    ProductID,
    Date(Floor(TransactionDate)) as TransactionDate,
    Quantity,
    UnitPrice,
    Discount,
    Quantity * UnitPrice * (1 - Discount) as NetAmount,
    Year(TransactionDate) as TransactionYear,
    Month(TransactionDate) as TransactionMonth,
    Quarter(TransactionDate) as TransactionQuarter,
    'Q' & Quarter(TransactionDate) & ' ' & Year(TransactionDate) as YearQuarter
  FROM [$(vDataPath)Transactions_$(vYear).qvd] (qvd)
  WHERE TransactionDate >= Date#('$(vYear)-01-01', 'YYYY-MM-DD')
    AND TransactionDate < Date#('$(vYear + 1)-01-01', 'YYYY-MM-DD')
    AND Quantity > 0
    AND UnitPrice > 0;
  
  // Store processed data for optimal loading
  STORE Transactions_$(vYear) INTO [$(vDataPath)Processed/Transactions_$(vYear)_Processed.qvd] (qvd);

NEXT vYear;

// Concatenate all transaction years
Transactions:
LOAD * FROM [$(vDataPath)Processed/Transactions_*_Processed.qvd] (qvd);

// ==================== AGGREGATED TABLES ====================

// Customer summary with performance metrics
CustomerSummary:
LOAD 
  CustomerID,
  Count(DISTINCT TransactionID) as TotalTransactions,
  Count(DISTINCT ProductID) as UniqueProducts,
  Sum(NetAmount) as TotalSpent,
  Avg(NetAmount) as AvgTransactionAmount,
  Min(TransactionDate) as FirstPurchaseDate,
  Max(TransactionDate) as LastPurchaseDate,
  Max(TransactionDate) - Min(TransactionDate) as CustomerLifespanDays,
  if(Today() - Max(TransactionDate) <= 30, 'Active',
     if(Today() - Max(TransactionDate) <= 90, 'At Risk',
        if(Today() - Max(TransactionDate) <= 180, 'Dormant', 'Lost'))) as CustomerSegment
FROM Transactions
GROUP BY CustomerID;

// Product performance summary
ProductSummary:
LOAD 
  ProductID,
  Count(DISTINCT TransactionID) as TimesOrdered,
  Count(DISTINCT CustomerID) as UniqueCustomers,
  Sum(Quantity) as TotalQuantitySold,
  Sum(NetAmount) as TotalRevenue,
  Avg(NetAmount / Quantity) as AvgSellingPrice,
  Min(TransactionDate) as FirstSaleDate,
  Max(TransactionDate) as LastSaleDate
FROM Transactions
GROUP BY ProductID;

// ==================== CALENDAR TABLE ====================
// Essential for time-based analysis
MasterCalendar:
LOAD 
  Date,
  Year(Date) as Year,
  Month(Date) as Month,
  MonthName(Date) as MonthName,
  Quarter(Date) as Quarter,
  'Q' & Quarter(Date) as QuarterName,
  Week(Date) as Week,
  Weekday(Date) as Weekday,
  WeekdayName(Date) as WeekdayName,
  Day(Date) as Day,
  if(Weekday(Date) >= 1 and Weekday(Date) <= 5, 'Weekday', 'Weekend') as DayType,
  if(InMonth(Date, $(vCurrentYear), 1) or 
     InMonth(Date, $(vCurrentYear), 7) or
     InMonth(Date, $(vCurrentYear), 12), 'Peak Season', 'Regular') as Season
WHERE Date >= '$(vMinDate)' AND Date <= '$(vMaxDate)';

// Generate calendar
FOR vDate = Num(Date#('$(vMinDate)', 'YYYY-MM-DD')) to Num(Date#('$(vMaxDate)', 'YYYY-MM-DD'))
  Calendar_Temp:
  LOAD Date($(vDate)) as Date
  AutoGenerate 1;
NEXT vDate;

// Apply calendar generation to MasterCalendar template
MasterCalendar:
LOAD * WHERE Date >= '$(vMinDate)' AND Date <= '$(vMaxDate)';
LOAD
  Date,
  Year(Date) as Year,
  Month(Date) as Month,
  MonthName(Date) as MonthName,
  Quarter(Date) as Quarter,
  'Q' & Quarter(Date) as QuarterName,
  Week(Date) as Week,
  Weekday(Date) as Weekday,
  WeekdayName(Date) as WeekdayName,
  Day(Date) as Day,
  if(Weekday(Date) >= 1 and Weekday(Date) <= 5, 'Weekday', 'Weekend') as DayType
FROM Calendar_Temp;

DROP TABLE Calendar_Temp;

// ==================== PERFORMANCE LOGGING ====================
SET vEndTime = Now();
SET vExecutionTime = Interval($(vEndTime) - $(vStartTime));

Log_Performance:
LOAD
  '$(vScriptVersion)' as ScriptVersion,
  '$(vStartTime)' as StartTime,
  '$(vEndTime)' as EndTime,
  '$(vExecutionTime)' as ExecutionTime,
  NoOfRows('Customers') as CustomerRows,
  NoOfRows('Products') as ProductRows,
  NoOfRows('Transactions') as TransactionRows,
  NoOfRows('MasterCalendar') as CalendarRows
AutoGenerate 1;

STORE Log_Performance INTO [$(vDataPath)Logs/Performance_$(vScriptVersion)_$(vEndTime).qvd] (qvd);`,
    tips: [
      "Use memo() to prevent unnecessary re-renders of the editor",
      "Debounce onChange events to improve performance with large scripts",
      "Disable minimap for large files to reduce memory usage",
      "Consider lazy loading for very large scripts",
      "Store intermediate results in QVD format for faster loading",
    ],
  },
  {
    id: "integration",
    title: "Framework Integration",
    description: "Integration with popular React frameworks",
    category: "Integration",
    difficulty: "Intermediate",
    reactCode: `// Next.js App Router Integration
'use client'

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import to avoid SSR issues
const QlikEditor = dynamic(() => import('qlik-script-editor'), {
  ssr: false,
  loading: () => (
    <div className="border rounded-lg p-8 text-center bg-muted/20">
      <div className="animate-pulse">Loading Qlik Script Editor...</div>
    </div>
  )
});

// Custom hook for script management
function useQlikScript(initialValue = '') {
  const [script, setScript] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState([]);
  
  const validateScript = useCallback((value) => {
    // Add your validation logic here
    const hasLoad = /LOAD\\s+/.test(value);
    const hasFrom = /FROM\\s+/.test(value);
    
    if (hasLoad && !hasFrom) {
      setErrors(['LOAD statement requires FROM clause']);
      setIsValid(false);
    } else {
      setErrors([]);
      setIsValid(true);
    }
  }, []);
  
  const updateScript = useCallback((newValue) => {
    setScript(newValue);
    validateScript(newValue);
  }, [validateScript]);
  
  return { script, updateScript, isValid, errors };
}

export default function QlikScriptPage() {
  const { script, updateScript, isValid, errors } = useQlikScript(
    'LOAD * FROM DataSource;'
  );
  
  return (
    <div className="container mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Qlik Script Editor</h1>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={\`w-3 h-3 rounded-full \${isValid ? 'bg-green-500' : 'bg-red-500'}\`} />
          <span className="text-sm">
            {isValid ? 'Valid Script' : 'Script Errors'}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          {script.length} characters
        </span>
      </div>
      
      <Suspense fallback={<div>Loading editor...</div>}>
        <QlikEditor
          value={script}
          onChange={updateScript}
          height="500px"
          theme="vs-dark"
          options={{
            lineNumbers: 'on',
            minimap: { enabled: false },
            wordWrap: 'on'
          }}
        />
      </Suspense>
      
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <h3 className="font-semibold text-red-800">Validation Errors:</h3>
          <ul className="text-red-700 text-sm mt-2">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// TypeScript definitions (types/qlik-script-editor.d.ts)
declare module 'qlik-script-editor' {
  interface QlikEditorProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    height?: string | number;
    width?: string | number;
    theme?: 'light' | 'dark' | 'auto' | object;
    language?: string;
    options?: {
      lineNumbers?: 'on' | 'off' | 'relative' | 'interval';
      minimap?: { enabled: boolean };
      wordWrap?: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
      fontSize?: number;
      fontFamily?: string;
      autoComplete?: boolean;
      [key: string]: any;
    };
    readOnly?: boolean;
    loading?: React.ReactNode;
  }
  
  const QlikEditor: React.ForwardRefExoticComponent<
    QlikEditorProps & React.RefAttributes<any>
  >;
  
  export default QlikEditor;
}`,
    qlikScript: `// Sample script for framework integration testing
// This script tests various Qlik Sense features and syntax

// ==================== VARIABLES & SETTINGS ====================
SET ThousandSep = ',';
SET DecimalSep = '.';
SET MoneyThousandSep = ',';
SET MoneyDecimalSep = '.';
SET MoneyFormat = '$ #,##0.00;-$ #,##0.00';
SET TimeFormat = 'h:mm:ss TT';
SET DateFormat = 'M/D/YYYY';
SET TimestampFormat = 'M/D/YYYY h:mm:ss[.fff] TT';

// Framework integration test variables
LET vFramework = 'Next.js';
LET vVersion = '14.0.0';
LET vTestDate = Today();

// ==================== SAMPLE DATA LOADING ====================

// Customer data with validation
Customers:
LOAD
    CustomerID,
    CustomerName,
    if(Len(Trim(CustomerName)) = 0, 'Unknown Customer', CustomerName) as ValidatedCustomerName,
    Company,
    Country,
    Region,
    City,
    PostalCode,
    Phone,
    Email,
    Date(Floor(RegistrationDate)) as RegistrationDate,
    '$(vFramework)' as DataSource,
    '$(vTestDate)' as LoadDate
FROM [lib://TestData/customers.xlsx]
(ooxml, embedded labels, table is Customers)
WHERE Len(Trim(CustomerID)) > 0;

// Product catalog
Products:
LOAD
    ProductID,
    ProductName,
    CategoryName,
    SupplierName,
    UnitPrice,
    UnitsInStock,
    if(UnitsInStock > 50, 'In Stock',
       if(UnitsInStock > 10, 'Low Stock', 
          'Out of Stock')) as StockStatus,
    UnitPrice * UnitsInStock as InventoryValue,
    if(UnitPrice > 50, 'Premium', 
       if(UnitPrice > 20, 'Standard', 'Budget')) as PriceSegment
FROM [lib://TestData/products.xlsx]
(ooxml, embedded labels, table is Products)
WHERE IsNum(UnitPrice) AND UnitPrice > 0;

// Sales transactions
Sales:
LOAD
    TransactionID,
    CustomerID,
    ProductID,
    Date(Floor(OrderDate)) as OrderDate,
    Quantity,
    UnitPrice,
    Discount,
    Quantity * UnitPrice * (1 - Discount) as SalesAmount,
    Year(OrderDate) as SalesYear,
    Month(OrderDate) as SalesMonth,
    Quarter(OrderDate) as SalesQuarter,
    if(Discount > 0.1, 'High Discount',
       if(Discount > 0.05, 'Standard Discount', 'No Discount')) as DiscountTier
FROM [lib://TestData/sales.xlsx]
(ooxml, embedded labels, table is Sales)
WHERE OrderDate >= AddYears(Today(), -2)
  AND Quantity > 0
  AND UnitPrice > 0;

// ==================== CALCULATED DIMENSIONS ====================

// Customer segments based on purchase behavior
CustomerSegments:
LOAD
    CustomerID,
    Sum(SalesAmount) as TotalSpent,
    Count(TransactionID) as TransactionCount,
    Avg(SalesAmount) as AvgTransactionAmount,
    if(Sum(SalesAmount) > 10000, 'VIP',
       if(Sum(SalesAmount) > 5000, 'Premium',
          if(Sum(SalesAmount) > 1000, 'Standard', 'Basic'))) as CustomerSegment,
    if(Count(TransactionID) > 20, 'Frequent Buyer',
       if(Count(TransactionID) > 10, 'Regular Buyer', 'Occasional Buyer')) as BuyingFrequency
FROM Sales
GROUP BY CustomerID;

// Product performance metrics
ProductPerformance:
LOAD
    ProductID,
    Sum(SalesAmount) as TotalRevenue,
    Sum(Quantity) as TotalQuantitySold,
    Count(DISTINCT CustomerID) as UniqueCustomers,
    Avg(UnitPrice) as AvgSellingPrice,
    Sum(SalesAmount) / Sum(Quantity) as RevenuePerUnit,
    if(Sum(Quantity) > 1000, 'Best Seller',
       if(Sum(Quantity) > 500, 'Good Seller',
          if(Sum(Quantity) > 100, 'Average Seller', 'Slow Mover'))) as PerformanceCategory
FROM Sales
GROUP BY ProductID;

// ==================== TIME DIMENSION ====================

// Calendar table for time analysis
Calendar:
LOAD
    Date,
    Year(Date) as Year,
    Month(Date) as Month,
    MonthName(Date) as MonthName,
    Quarter(Date) as Quarter,
    'Q' & Quarter(Date) & ' ' & Year(Date) as YearQuarter,
    Week(Date) as Week,
    WeekDay(Date) as WeekDay,
    WeekdayName(Date) as WeekdayName,
    Day(Date) as Day,
    if(WeekDay(Date) >= 1 AND WeekDay(Date) <= 5, 'Weekday', 'Weekend') as DayType,
    if(Month(Date) IN (12, 1, 2), 'Q1',
       if(Month(Date) IN (3, 4, 5), 'Q2',
          if(Month(Date) IN (6, 7, 8), 'Q3', 'Q4'))) as FiscalQuarter
FROM [lib://TestData/calendar.qvd] (qvd)
WHERE Date >= AddYears(Today(), -3) AND Date <= Today();

// ==================== VALIDATION & TESTING ====================

// Data quality checks
DataQuality:
LOAD
    'Customers' as TableName,
    Count(*) as TotalRows,
    Count(DISTINCT CustomerID) as UniqueKeys,
    Count(*) - Count(DISTINCT CustomerID) as DuplicateRows,
    Count(CustomerName) - Count(DISTINCT CustomerName) as DuplicateNames
FROM Customers
UNION
LOAD
    'Products' as TableName,
    Count(*) as TotalRows,
    Count(DISTINCT ProductID) as UniqueKeys,
    Count(*) - Count(DISTINCT ProductID) as DuplicateRows,
    Count(ProductName) - Count(DISTINCT ProductName) as DuplicateNames
FROM Products
UNION
LOAD
    'Sales' as TableName,
    Count(*) as TotalRows,
    Count(DISTINCT TransactionID) as UniqueKeys,
    Count(*) - Count(DISTINCT TransactionID) as DuplicateRows,
    0 as DuplicateNames
FROM Sales;

// Framework integration metadata
IntegrationInfo:
LOAD
    '$(vFramework)' as Framework,
    '$(vVersion)' as Version,
    Now() as ProcessingTime,
    ScriptErrorCount() as ErrorCount,
    if(ScriptErrorCount() = 0, 'Success', 'Failed') as Status
AutoGenerate 1;`,
    tips: [
      "Use dynamic imports in Next.js to avoid SSR issues with Monaco Editor",
      "Create custom hooks for script state management",
      "Add proper TypeScript definitions for better development experience",
      "Use Suspense for better loading states",
      "Consider error boundaries for robust error handling",
    ],
  },
];

const categories = [...new Set(examples.map((ex) => ex.category))];
const difficulties = [...new Set(examples.map((ex) => ex.difficulty))];

// Category colors for better visual distinction
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Getting Started":
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700",
    "State Management":
      "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700",
    Customization:
      "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700",
    Advanced:
      "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700",
    Performance:
      "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-700",
    Integration:
      "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-300 dark:border-cyan-700",
  };
  return (
    colors[category] ||
    "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
  );
};

export default function ExamplesPage() {
  const [selectedExample, setSelectedExample] = useState(examples[0]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExamples = useMemo(() => {
    return examples.filter((ex) => {
      const matchesCategory =
        selectedCategory === "all" || ex.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "all" || ex.difficulty === selectedDifficulty;
      const matchesSearch =
        searchQuery === "" ||
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedDifficulty !== "all" ||
    searchQuery !== "";

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 fade-in">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="mb-8 flex justify-center">
            <Badge className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1.5">
              <span className="text-sm font-medium">
                {examples.length} Interactive Examples
              </span>
            </Badge>
          </div>
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
            Interactive
            <span className="relative whitespace-nowrap">
              <span className="relative text-blue-600"> Examples</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 leading-8">
            Explore comprehensive examples showcasing different ways to
            integrate and use qlik-script-editor in your applications. From
            basic usage to advanced enterprise scenarios with real-world Qlik
            scripts.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 ring-1 ring-slate-200 dark:ring-slate-800">
            {/* Search Bar */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                Search Examples
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search by title, description, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Options */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Filter Examples
                </label>
                <div className="flex items-center gap-3">
                  <Badge className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1 rounded-lg text-xs font-medium">
                    {filteredExamples.length} found
                  </Badge>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="h-8 px-3 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </div>

              {/* Category and Difficulty Filters - Horizontal Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full" />
                    Category
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={cn(
                        "px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium",
                        selectedCategory === "all"
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                          : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600"
                      )}
                    >
                      All ({examples.length})
                    </button>
                    {categories.map((category) => {
                      const count = examples.filter(
                        (ex) => ex.category === category
                      ).length;
                      const isSelected = selectedCategory === category;
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={cn(
                            "px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium",
                            isSelected
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600"
                          )}
                        >
                          {category} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    Difficulty Level
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedDifficulty("all")}
                      className={cn(
                        "px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium flex items-center gap-2",
                        selectedDifficulty === "all"
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                          : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600"
                      )}
                    >
                      <div className="flex items-center gap-1">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                        <div className="h-1.5 w-1.5 bg-yellow-500 rounded-full" />
                        <div className="h-1.5 w-1.5 bg-red-500 rounded-full" />
                      </div>
                      All Levels
                    </button>
                    {difficulties.map((difficulty) => {
                      const count = examples.filter(
                        (ex) => ex.difficulty === difficulty
                      ).length;
                      const isSelected = selectedDifficulty === difficulty;
                      return (
                        <button
                          key={difficulty}
                          onClick={() => setSelectedDifficulty(difficulty)}
                          className={cn(
                            "px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium flex items-center gap-2",
                            isSelected
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600"
                          )}
                        >
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full",
                              difficulty === "Beginner"
                                ? "bg-green-500"
                                : difficulty === "Intermediate"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            )}
                          />
                          {difficulty} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Active filters:
                    </span>
                    {selectedCategory !== "all" && (
                      <Badge className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1 rounded-lg flex items-center gap-2">
                        <span className="font-medium">
                          Category: {selectedCategory}
                        </span>
                        <button
                          onClick={() => setSelectedCategory("all")}
                          className="hover:bg-white/20 dark:hover:bg-slate-900/20 rounded p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedDifficulty !== "all" && (
                      <Badge className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1 rounded-lg flex items-center gap-2">
                        <span className="font-medium">
                          Level: {selectedDifficulty}
                        </span>
                        <button
                          onClick={() => setSelectedDifficulty("all")}
                          className="hover:bg-white/20 dark:hover:bg-slate-900/20 rounded p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                    >
                      {filteredExamples.length} result
                      {filteredExamples.length !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 flex gap-4">
          <div className="flex w-xl justify-between mb-6">
            <div className="mb-12 w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center text-lg">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Examples
                </h3>
                <Badge variant="outline" className="px-3 py-1">
                  {filteredExamples.length} of {examples.length}
                </Badge>
              </div>

              {filteredExamples.length === 0 && (
                <Card className="p-8 text-center">
                  <div className="space-y-3">
                    <div className="mx-auto h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-muted-foreground">
                      No examples found
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredExamples.map((example) => (
                  <Card
                    key={example.id}
                    className={`cursor-pointer w-full transition-all duration-200 hover:shadow-md group ${
                      selectedExample.id === example.id
                        ? "border-primary shadow-lg ring-2 ring-primary/20 bg-primary/5"
                        : "hover:border-primary/30 hover:bg-accent/50"
                    }`}
                    onClick={() => setSelectedExample(example)}
                  >
                    <CardHeader className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-3 flex-1 min-w-0">
                          <div className="flex items-start gap-2">
                            <CardTitle className="text-base leading-tight text-foreground group-hover:text-primary transition-colors">
                              {example.title}
                            </CardTitle>
                            {selectedExample.id === example.id && (
                              <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                            )}
                          </div>
                          <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                            {example.description}
                          </CardDescription>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              className={`text-xs border ${getCategoryColor(
                                example.category
                              )}`}
                            >
                              {example.category}
                            </Badge>
                            <Badge
                              className={`text-xs ${getDifficultyColor(
                                example.difficulty
                              )}`}
                            >
                              {example.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <Card className="border-2 border-primary/20 bg-gradient-to-r from-background to-primary/5">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-4 flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <CardTitle className="text-3xl text-foreground">
                          {selectedExample.title}
                        </CardTitle>
                        <Badge
                          className={`${getDifficultyColor(
                            selectedExample.difficulty
                          )}`}
                        >
                          {selectedExample.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="text-lg leading-7 text-muted-foreground">
                        {selectedExample.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge
                        className={`border-2 ${getCategoryColor(
                          selectedExample.category
                        )} px-3 py-1`}
                      >
                        {selectedExample.category}
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        Interactive Example
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        Copy-Paste Ready
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Code Examples */}
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="qlik-script" className="w-full">
                  <div className="border-b px-6 py-4">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                      <TabsTrigger
                        value="qlik-script"
                        className="flex items-center gap-2"
                      >
                        <Database className="h-4 w-4" />
                        Qlik Script
                      </TabsTrigger>
                      <TabsTrigger
                        value="react-code"
                        className="flex items-center gap-2"
                      >
                        <Code2 className="h-4 w-4" />
                        React Code
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="qlik-script" className="p-6 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold flex items-center text-lg">
                          <Database className="h-5 w-5 mr-2 text-primary" />
                          Qlik Script Example
                        </h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            copyToClipboard(selectedExample.qlikScript)
                          }
                          className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                          Copy Script
                        </Button>
                      </div>
                      <CodeBlock
                        code={selectedExample.qlikScript}
                        language="sql"
                        showLineNumbers={true}
                        className="border border-border/50"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="react-code" className="p-6 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold flex items-center text-lg">
                          <Code2 className="h-5 w-5 mr-2 text-primary" />
                          React Implementation
                        </h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            copyToClipboard(selectedExample.reactCode)
                          }
                          className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                          Copy Code
                        </Button>
                      </div>
                      <CodeBlock
                        code={selectedExample.reactCode}
                        language="tsx"
                        showLineNumbers={true}
                        className="border border-border/50"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Tips & Best Practices */}
            <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-amber-800 dark:text-amber-200">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Tips & Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedExample.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-amber-500 rounded-full flex-shrink-0 mt-2" />
                      <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            {selectedExample.id === "performance" && (
              <Card className="border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-green-800 dark:text-green-200">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Performance Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-green-950/40 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        300ms
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        Debounce Delay
                      </div>
                    </div>
                    <div className="bg-white dark:bg-green-950/40 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        10K+
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        Lines Supported
                      </div>
                    </div>
                    <div className="bg-white dark:bg-green-950/40 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ~50MB
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        Memory Usage
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-blue-800 dark:text-blue-200">
                  <Zap className="h-5 w-5 mr-2" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 justify-start border-blue-200 hover:bg-blue-100 dark:border-blue-800 dark:hover:bg-blue-950/40"
                  >
                    <a href="/docs/installation" className="block">
                      <div>
                        <div className="font-semibold text-blue-800 dark:text-blue-200">
                          Get Started
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-300">
                          Install and setup guide
                        </div>
                      </div>
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 justify-start border-blue-200 hover:bg-blue-100 dark:border-blue-800 dark:hover:bg-blue-950/40"
                  >
                    <a href="/docs/configuration" className="block">
                      <div>
                        <div className="font-semibold text-blue-800 dark:text-blue-200">
                          Configuration
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-300">
                          Customize your editor
                        </div>
                      </div>
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 justify-start border-blue-200 hover:bg-blue-100 dark:border-blue-800 dark:hover:bg-blue-950/40"
                  >
                    <a href="/api" className="block">
                      <div>
                        <div className="font-semibold text-blue-800 dark:text-blue-200">
                          API Reference
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-300">
                          Complete API documentation
                        </div>
                      </div>
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 justify-start border-blue-200 hover:bg-blue-100 dark:border-blue-800 dark:hover:bg-blue-950/40"
                  >
                    <a
                      href="https://github.com/qlik-script-editor"
                      target="_blank"
                      className="block"
                    >
                      <div>
                        <div className="font-semibold text-blue-800 dark:text-blue-200">
                          GitHub
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-300">
                          Source code & issues
                        </div>
                      </div>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
