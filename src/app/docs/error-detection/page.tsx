import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertTriangle, CheckCircle, Zap, Settings } from "lucide-react"

export default function ErrorDetectionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Error Detection</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Real-time validation and error detection to catch issues before script execution.
        </p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Proactive Error Prevention</AlertTitle>
        <AlertDescription>
          qlik-script-editor analyzes your code as you type, identifying potential issues
          and providing helpful suggestions to fix them before execution.
        </AlertDescription>
      </Alert>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Types of Errors Detected</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-red-100 dark:bg-red-900 rounded flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Syntax Errors</CardTitle>
                  <CardDescription>
                    Invalid Qlik script syntax
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Missing semicolons</li>
                <li>• Unmatched parentheses/brackets</li>
                <li>• Invalid function calls</li>
                <li>• Malformed LOAD statements</li>
                <li>• Incorrect JOIN syntax</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900 rounded flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Logic Errors</CardTitle>
                  <CardDescription>
                    Logical issues in script flow
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Undefined field references</li>
                <li>• Circular table dependencies</li>
                <li>• Unreachable code blocks</li>
                <li>• Variable scope issues</li>
                <li>• Data type mismatches</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900 rounded flex items-center justify-center">
                  <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Performance Issues</CardTitle>
                  <CardDescription>
                    Code that may impact performance
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Inefficient JOIN operations</li>
                <li>• Missing WHERE clauses</li>
                <li>• Redundant calculations</li>
                <li>• Large Cartesian products</li>
                <li>• Memory-intensive operations</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="real-time" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="real-time">Real-time Validation</TabsTrigger>
          <TabsTrigger value="examples">Error Examples</TabsTrigger>
          <TabsTrigger value="fixes">Quick Fixes</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="real-time" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How Real-time Validation Works</CardTitle>
              <CardDescription>
                Understanding the error detection process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      As You Type
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Errors are detected immediately as you type, with visual indicators
                      appearing directly in the editor. Red underlines show syntax errors,
                      while yellow highlights indicate potential issues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-600" />
                      Context Analysis
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      The analyzer understands your script context, tracking table
                      definitions, field names, and variable declarations to provide
                      accurate error detection and suggestions.
                    </p>
                  </div>
                </div>
                
                <div className="border rounded-lg bg-background">
                  <div className="bg-muted/50 px-3 py-2 border-b text-xs font-mono text-muted-foreground">
                    Live Error Detection Example
                  </div>
                  <div className="p-4">
                    <pre className="text-sm font-mono">
{`LOAD 
  CustomerID,
  CustomerName,
  Date#(OrderDate, 'YYYY-MM-DD') as OrderDate
FROM DataSource
WHERE CustomerID > 0
  AND OrderDate >= '2023-01-01'  // ❌ Error: OrderDate not yet defined
  AND InvalidField IS NOT NULL;  // ❌ Error: InvalidField doesn't exist

LEFT JOIN (Customers)  // ⚠️ Warning: Table 'Customers' not defined above
LOAD 
  CustomerID
  OrderAmount,  // ❌ Error: Missing comma on previous line
  Count(*)      // ❌ Error: Aggregate without GROUP BY
FROM Orders;    // ❌ Error: Missing WHERE clause for large table`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Syntax Error Example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <pre className="text-sm font-mono">
{`LOAD CustomerID, CustomerName
FROM DataSource
WHERE CustomerID > 0`}
                    <span className="text-red-500 underline">;</span> {/* Missing semicolon */}
                  </pre>
                </div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Syntax Error</AlertTitle>
                  <AlertDescription>
                    <strong>Line 3:</strong> Expected semicolon at end of LOAD statement.
                    <br />
                    <strong>Quick Fix:</strong> Add semicolon after the WHERE clause.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Logic Error Example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <pre className="text-sm font-mono">
{`LOAD CustomerID, CustomerName
FROM Customers;

LOAD CustomerID, OrderAmount
FROM Orders
WHERE `}
                    <span className="text-orange-500 underline">CustomerType</span> = 'Premium'; {/* Field not available */}
                  </pre>
                </div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Logic Error</AlertTitle>
                  <AlertDescription>
                    <strong>Line 6:</strong> Field 'CustomerType' is not available in this context.
                    <br />
                    <strong>Suggestion:</strong> Use a field from the Orders table or JOIN with Customers first.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fixes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Fix Suggestions</CardTitle>
              <CardDescription>
                Automatic suggestions to resolve common errors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Available Quick Fixes</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <Badge variant="outline" className="mb-1">Add Missing Semicolon</Badge>
                      <p className="text-muted-foreground">Automatically add semicolon at end of statements</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">Fix Parentheses</Badge>
                      <p className="text-muted-foreground">Balance unmatched brackets and parentheses</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">Suggest Field Names</Badge>
                      <p className="text-muted-foreground">Recommend correct field names for typos</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">Add Missing Clauses</Badge>
                      <p className="text-muted-foreground">Insert required clauses like GROUP BY</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">How to Use</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <Badge variant="outline">1</Badge>
                      <span className="ml-2">Click on the error indicator (red underline)</span>
                    </div>
                    <div>
                      <Badge variant="outline">2</Badge>
                      <span className="ml-2">Review the error description and suggestions</span>
                    </div>
                    <div>
                      <Badge variant="outline">3</Badge>
                      <span className="ml-2">Click "Apply Fix" or use Ctrl+. shortcut</span>
                    </div>
                    <div>
                      <Badge variant="outline">4</Badge>
                      <span className="ml-2">Verify the fix and continue coding</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Error Detection Settings
              </CardTitle>
              <CardDescription>
                Customize error detection behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Basic Configuration</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-sm">
{`<QlikEditor 
  errorDetection={true}
  validateOnType={true}
  showErrorTooltips={true}
  errorDelay={500}
/>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Error Severity Levels</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-sm">
{`<QlikEditor 
  errorLevels={{
    syntax: 'error',        // Red underline
    logic: 'warning',       // Yellow underline
    performance: 'info',    // Blue underline
    style: 'suggestion'     // Dotted underline
  }}
/>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Custom Error Rules</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-sm">
{`const customRules = [
  {
    name: 'no-select-star',
    message: 'Avoid SELECT * in production code',
    severity: 'warning',
    pattern: /SELECT\s+\*/gi
  }
];

<QlikEditor customErrorRules={customRules} />`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Performance Impact</CardTitle>
          <CardDescription>
            Understanding the performance implications of error detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">✅ Lightweight</h4>
              <p className="text-sm text-muted-foreground">
                Error detection runs efficiently in the background without impacting
                typing performance or editor responsiveness.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">⚡ Debounced</h4>
              <p className="text-sm text-muted-foreground">
                Validation is debounced to avoid excessive processing while you're
                actively typing and editing code.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">🎯 Configurable</h4>
              <p className="text-sm text-muted-foreground">
                You can adjust validation frequency and disable specific error types
                for optimal performance on your system.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}