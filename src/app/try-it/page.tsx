'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { CodeBlock } from '@/components/code-block'
import { 
  Play, 
  RotateCcw, 
  Download, 
  Copy, 
  CheckCircle, 
  Settings,
  Lightbulb,
  Code,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

const defaultScript = `// Welcome to the Qlik Script Editor!
// Try editing this script and see the results

LOAD 
    CustomerID,
    CustomerName,
    Country,
    OrderDate
FROM [lib://Sales/Customers.xlsx]
(ooxml, embedded labels, table is Sheet1);

LOAD 
    OrderID,
    CustomerID,
    ProductID,
    Quantity * UnitPrice as TotalAmount
FROM [lib://Sales/Orders.xlsx]
(ooxml, embedded labels, table is Orders);

// Left join to combine customer and order data
LEFT JOIN (Orders)
LOAD 
    CustomerID,
    CustomerName,
    Country
RESIDENT Customers;

// Calculate summary statistics
SalesSum:
LOAD 
    Country,
    Sum(TotalAmount) as TotalSales,
    Count(OrderID) as OrderCount,
    Avg(TotalAmount) as AvgOrderValue
RESIDENT Orders
GROUP BY Country;`

const sampleScripts = [
  {
    name: "Data Loading",
    description: "Basic data loading from various sources",
    script: `// Load data from Excel file
LOAD 
    ProductID,
    ProductName,
    Category,
    UnitPrice,
    UnitsInStock
FROM [lib://DataSource/Products.xlsx]
(ooxml, embedded labels, table is Products);

// Load additional product details from CSV
ProductDetails:
LOAD 
    ProductID,
    Description,
    Weight,
    Dimensions
FROM [lib://DataSource/ProductDetails.csv]
(txt, codepage is 1252, embedded labels, delimiter is ',');`
  },
  {
    name: "Transformations",
    description: "Data transformation and calculation examples",
    script: `// Create calculated fields and transformations
Sales:
LOAD 
    OrderID,
    CustomerID,
    ProductID,
    Quantity,
    UnitPrice,
    Quantity * UnitPrice as LineTotal,
    If(Quantity * UnitPrice > 1000, 'High', 'Standard') as OrderType,
    Date(OrderDate, 'YYYY-MM-DD') as FormattedDate,
    Year(OrderDate) as OrderYear,
    Month(OrderDate) as OrderMonth
FROM DataSource;

// Aggregate data by customer
CustomerSummary:
LOAD 
    CustomerID,
    Sum(LineTotal) as TotalRevenue,
    Count(OrderID) as OrderCount,
    Max(LineTotal) as LargestOrder,
    FirstSortedValue(ProductID, -LineTotal) as TopProduct
RESIDENT Sales
GROUP BY CustomerID;`
  },
  {
    name: "Advanced Joins",
    description: "Complex join operations and data modeling",
    script: `// Multiple table joins with filtering
Customers:
LOAD 
    CustomerID,
    CompanyName,
    ContactName,
    City,
    Country
FROM CustomerData
WHERE Country IN ('USA', 'Canada', 'Mexico');

Orders:
LOAD 
    OrderID,
    CustomerID,
    OrderDate,
    ShipCountry
FROM OrderData
WHERE Year(OrderDate) >= 2023;

// Inner join to get only customers with orders
INNER JOIN (Orders)
LOAD 
    CustomerID,
    CompanyName,
    ContactName,
    City,
    Country
RESIDENT Customers;

// Create a mapping table for lookup
CountryMapping:
MAPPING LOAD 
    CountryCode,
    CountryName
FROM CountryLookup;

// Apply mapping to standardize country names
RegionalSales:
LOAD 
    *,
    ApplyMap('CountryMapping', ShipCountry, ShipCountry) as StandardCountry
RESIDENT Orders;`
  }
]

export default function TryItPage() {
  const [script, setScript] = useState(defaultScript)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [selectedExample, setSelectedExample] = useState(-1)

  const runScript = async () => {
    setIsRunning(true)
    setOutput('')
    
    // Simulate script execution
    setTimeout(() => {
      const mockOutput = `Script executed successfully!

Table Analysis:
- Customers: 847 rows loaded
- Orders: 2,155 rows loaded  
- SalesSum: 21 rows generated

Data Model:
✓ Tables linked by CustomerID
✓ No circular references detected
✓ Data quality: 98.7% complete

Execution Time: 1.23 seconds
Memory Usage: 12.4 MB`

      setOutput(mockOutput)
      setIsRunning(false)
    }, 2000)
  }

  const resetScript = () => {
    setScript(defaultScript)
    setOutput('')
    setSelectedExample(-1)
  }

  const loadExample = (index: number) => {
    setScript(sampleScripts[index].script)
    setSelectedExample(index)
    setOutput('')
  }

  const copyScript = () => {
    navigator.clipboard.writeText(script)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center space-y-8 mb-20">
          <div className="mb-8 flex justify-center">
            <Badge className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1.5">
              <span className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Interactive Playground
              </span>
            </Badge>
          </div>
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
            Try
            <span className="relative whitespace-nowrap">
              <span className="relative text-blue-600"> It Live</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 leading-8">
            Experience the qlik-script-editor in action. Write, edit, and execute Qlik scripts in real-time 
            with our interactive playground featuring syntax highlighting and error detection.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sample Scripts Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Code className="h-5 w-5" />
                  Sample Scripts
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Choose from pre-built examples or start from scratch
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={resetScript}
                  variant={selectedExample === -1 ? "default" : "outline"}
                  className={cn(
                    "w-full justify-start h-auto p-3",
                    selectedExample === -1 
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                      : "border-slate-300 dark:border-slate-600"
                  )}
                >
                  <div className="text-left">
                    <div className="font-medium">Default Example</div>
                    <div className="text-xs opacity-75 mt-1">Multi-table data loading</div>
                  </div>
                </Button>
                
                {sampleScripts.map((example, index) => (
                  <Button
                    key={index}
                    onClick={() => loadExample(index)}
                    variant={selectedExample === index ? "default" : "outline"}
                    className={cn(
                      "w-full justify-start h-auto p-3",
                      selectedExample === index 
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                        : "border-slate-300 dark:border-slate-600"
                    )}
                  >
                    <div className="text-left">
                      <div className="font-medium">{example.name}</div>
                      <div className="text-xs opacity-75 mt-1">{example.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="mt-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white text-base">
                  <Lightbulb className="h-4 w-4" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Use proper table aliases for clarity</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <span>GROUP BY after aggregation functions</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Comment your complex transformations</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Test with small datasets first</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editor and Output */}
          <div className="lg:col-span-3 space-y-6">
            {/* Editor */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-900 dark:text-white">Qlik Script Editor</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button onClick={copyScript} variant="outline" size="sm" className="border-slate-300 dark:border-slate-600">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button onClick={resetScript} variant="outline" size="sm" className="border-slate-300 dark:border-slate-600">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={runScript} 
                      disabled={isRunning}
                      className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                    >
                      {isRunning ? (
                        <Settings className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      {isRunning ? 'Running...' : 'Run Script'}
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Write and test your Qlik scripts with real-time syntax highlighting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    className="font-mono text-sm min-h-[400px] resize-none border-slate-200 dark:border-slate-700 focus:ring-blue-500"
                    placeholder="Write your Qlik script here..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            {(output || isRunning) && (
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                    {isRunning ? (
                      <Settings className="h-5 w-5 animate-spin text-blue-600" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {isRunning ? 'Executing Script...' : 'Execution Results'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isRunning ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center space-y-4">
                        <Settings className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                        <p className="text-slate-600 dark:text-slate-400">Processing your Qlik script...</p>
                      </div>
                    </div>
                  ) : (
                    <CodeBlock
                      code={output}
                      language="text"
                      className="bg-slate-50 dark:bg-slate-900"
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {/* Feature Showcase */}
            <Card className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">Editor Features</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Explore the powerful features of qlik-script-editor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto">
                      <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Syntax Highlighting</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Intelligent color coding for Qlik functions and keywords
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mx-auto">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Error Detection</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Real-time validation and syntax error highlighting
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mx-auto">
                      <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Auto-completion</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Smart suggestions for functions and field names
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-slate-50 dark:bg-slate-900 rounded-2xl p-10 ring-1 ring-slate-200 dark:ring-slate-800 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to integrate?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-7 max-w-2xl mx-auto">
            Start using qlik-script-editor in your own applications with our comprehensive documentation and examples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100">
              <a href="/docs/installation">
                <Download className="mr-2 h-5 w-5" />
                Install Now
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
              <a href="/examples">View More Examples</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}