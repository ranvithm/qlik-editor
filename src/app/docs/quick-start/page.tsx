import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, Code, Settings, FileText, ArrowRight, AlertCircle, Play } from "lucide-react"
import Link from "next/link"

export default function QuickStartPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Quick Start</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Get up and running with qlik-script-editor in under 5 minutes.
        </p>
      </div>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Before you start</AlertTitle>
        <AlertDescription>
          Make sure you have completed the{" "}
          <Link href="/docs/installation" className="underline">
            installation guide
          </Link>{" "}
          first.
        </AlertDescription>
      </Alert>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Basic Usage</h2>
        <p className="text-muted-foreground mb-6">
          The simplest way to use qlik-script-editor is to import the component and use it with default settings.
        </p>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Basic Implementation
            </CardTitle>
            <CardDescription>
              A minimal example to get you started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 mb-4">
              <pre className="text-sm">
{`import React from 'react';
import QlikEditor from 'qlik-script-editor';

function App() {
  return (
    <div style={{ height: '400px' }}>
      <QlikEditor
        defaultValue="LOAD * FROM DataSource;"
        onChange={(value) => console.log(value)}
      />
    </div>
  );
}

export default App;`}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground">
              This creates a basic editor with Qlik script syntax highlighting and auto-completion.
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Your First Script</h2>
        <p className="text-muted-foreground mb-6">
          Let's create a simple Qlik script that loads data and performs basic transformations.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Sample Qlik Script</CardTitle>
            <CardDescription>
              A real-world example you can copy and paste
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4">
              <pre className="text-sm">
{`// Set variables for date handling
SET vToday = Today();
SET vStartOfYear = YearStart($(vToday));

// Load customer data
LOAD 
  CustomerID,
  CustomerName,
  Country,
  Region,
  Date#(RegistrationDate, 'YYYY-MM-DD') as RegistrationDate
FROM [lib://DataFiles/Customers.xlsx]
(ooxml, embedded labels, table is Customers)
WHERE Date#(RegistrationDate, 'YYYY-MM-DD') >= $(vStartOfYear);

// Load sales data and join with customers
LEFT JOIN (Customers)
LOAD 
  CustomerID,
  Sum(OrderAmount) as TotalSales,
  Count(OrderID) as NumberOfOrders,
  Max(OrderDate) as LastOrderDate
FROM [lib://DataFiles/Orders.xlsx]
(ooxml, embedded labels, table is Orders)
GROUP BY CustomerID;

// Create a calculated field for customer classification
LOAD *,
  if(TotalSales > 10000, 'VIP Customer',
     if(TotalSales > 5000, 'Premium Customer', 
        'Standard Customer')) as CustomerTier
RESIDENT Customers;

DROP TABLE Customers;`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Key Features You'll Use</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                  <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Syntax Highlighting</CardTitle>
                  <CardDescription>
                    Full Qlik script syntax highlighting
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Functions, keywords, strings, and comments are automatically highlighted
                to improve code readability and reduce errors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded flex items-center justify-center">
                  <Play className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Auto-completion</CardTitle>
                  <CardDescription>
                    Intelligent code suggestions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get suggestions for Qlik functions, field names, and common patterns
                as you type to speed up development.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-red-100 dark:bg-red-900 rounded flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Error Detection</CardTitle>
                  <CardDescription>
                    Real-time validation
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Catch syntax errors, typos, and common mistakes before
                executing your scripts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded flex items-center justify-center">
                  <Settings className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Customizable</CardTitle>
                  <CardDescription>
                    Tailor to your workflow
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configure themes, shortcuts, and behavior to match
                your development preferences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Configuration</CardTitle>
              <CardDescription>
                Learn how to customize the editor behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" size="sm">
                <Link href="/docs/configuration">
                  Configure Editor <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Code className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Examples</CardTitle>
              <CardDescription>
                Explore more advanced usage patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" size="sm">
                <Link href="/examples">
                  View Examples <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>You're all set!</AlertTitle>
        <AlertDescription>
          You now have a working qlik-script-editor. Start writing your Qlik scripts and explore
          the advanced features as you need them.
        </AlertDescription>
      </Alert>
    </div>
  )
}