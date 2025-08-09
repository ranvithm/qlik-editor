import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Code, Zap, Settings } from "lucide-react"

export default function SyntaxHighlightingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Syntax Highlighting</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Advanced syntax highlighting for Qlik scripts with support for all Qlik functions and constructs.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">What's Highlighted</h2>
        <p className="text-muted-foreground mb-6">
          qlik-script-editor provides comprehensive syntax highlighting for all aspects of Qlik scripting language.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2 text-blue-600" />
                Keywords & Functions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <Badge variant="outline" className="mb-2">Keywords</Badge>
                  <p className="text-muted-foreground">
                    LOAD, FROM, WHERE, GROUP BY, ORDER BY, INNER JOIN, LEFT JOIN, etc.
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Functions</Badge>
                  <p className="text-muted-foreground">
                    Date#, Sum, Count, If, Match, ApplyMap, Peek, Previous, etc.
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Operators</Badge>
                  <p className="text-muted-foreground">
                    =, &lt;&gt;, &gt;=, &lt;=, AND, OR, NOT, &amp;, +, -, *, /, etc.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2 text-green-600" />
                Data Types & Literals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <Badge variant="outline" className="mb-2">Strings</Badge>
                  <p className="text-muted-foreground">
                    Single and double-quoted strings with escape sequences
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Numbers</Badge>
                  <p className="text-muted-foreground">
                    Integers, decimals, scientific notation, currency
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Dates</Badge>
                  <p className="text-muted-foreground">
                    Date literals, time stamps, and date functions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-purple-600" />
                Variables & Fields
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <Badge variant="outline" className="mb-2">Variables</Badge>
                  <p className="text-muted-foreground">
                    $(variable), SET statements, LET statements
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Field Names</Badge>
                  <p className="text-muted-foreground">
                    Column references, calculated fields, aliases
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Table Names</Badge>
                  <p className="text-muted-foreground">
                    Table references, file paths, connection strings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-orange-600" />
                Comments & Directives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <Badge variant="outline" className="mb-2">Comments</Badge>
                  <p className="text-muted-foreground">
                    Single-line (//) and multi-line (/* */) comments
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">REM Statements</Badge>
                  <p className="text-muted-foreground">
                    REM blocks for documentation and notes
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Directives</Badge>
                  <p className="text-muted-foreground">
                    TRACE, DEBUG, VERBATIM, and other directives
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="example" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="example">Live Example</TabsTrigger>
          <TabsTrigger value="themes">Color Themes</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>

        <TabsContent value="example" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Syntax Highlighting in Action</CardTitle>
              <CardDescription>
                See how different Qlik script elements are highlighted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg bg-background">
                <div className="bg-muted/50 px-3 py-2 border-b text-xs font-mono text-muted-foreground">
                  Example Qlik Script with Syntax Highlighting
                </div>
                <div className="p-4">
                  <pre className="text-sm font-mono">
                    <code>
{`// Data loading script with comprehensive highlighting
SET vToday = Today();
SET vStartDate = MakeDate(2023, 1, 1);

/*
 * Load customer master data
 * Source: Excel file with customer information
 */
LOAD 
  CustomerID,
  CustomerName as [Customer Name],
  if(Country = 'USA', 'Domestic', 'International') as CustomerType,
  Date#(RegistrationDate, 'YYYY-MM-DD') as RegDate,
  Num(CustomerID, '00000') as [Customer Code],
  Upper(CustomerName) & ' - ' & Country as DisplayName
FROM [lib://DataFiles/Customers.xlsx]
(ooxml, embedded labels, table is Customers)
WHERE Date#(RegistrationDate, 'YYYY-MM-DD') >= $(vStartDate)
  AND Len(Trim(CustomerName)) > 0;

// Calculate aggregated sales metrics
LEFT JOIN (Customers)
LOAD 
  CustomerID,
  Sum(OrderAmount) as TotalSales,
  Count(DISTINCT OrderID) as OrderCount,
  Avg(OrderAmount) as AvgOrderValue,
  Max(OrderDate) as LastOrderDate,
  Min(OrderDate) as FirstOrderDate,
  RangeSum(Above(Sum(OrderAmount), 0, 12)) as Rolling12MonthSales
FROM [lib://DataFiles/Orders.qvd] (qvd)
GROUP BY CustomerID;

// Create customer tier classification
NoConcatenate
LOAD *,
  Class(TotalSales, 'Premium', 10000, 'Standard', 1000, 'Basic') as CustomerTier,
  if(LastOrderDate >= $(vToday) - 90, 'Active', 'Inactive') as Status
RESIDENT Customers;

DROP TABLE Customers;

TRACE 'Data load completed: ' & Now();`}
                    </code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="themes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Color Themes</CardTitle>
              <CardDescription>
                Choose from multiple color schemes to match your preference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Light Themes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-100 border rounded"></div>
                      <span className="text-sm">Default Light</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-100 border rounded"></div>
                      <span className="text-sm">GitHub Light</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-amber-50 border rounded"></div>
                      <span className="text-sm">Solarized Light</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Dark Themes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-800 border rounded"></div>
                      <span className="text-sm">Default Dark</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-900 border rounded"></div>
                      <span className="text-sm">GitHub Dark</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-900 border rounded"></div>
                      <span className="text-sm">VS Code Dark</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customizing Syntax Highlighting</CardTitle>
              <CardDescription>
                Advanced options for customizing highlighting behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Theme Selection</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-sm">
{`<QlikEditor 
  theme="dark"
  syntaxTheme="github-dark"
/>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Custom Color Scheme</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-sm">
{`const customColors = {
  keyword: '#0066cc',
  string: '#008800',
  number: '#cc6600',
  comment: '#888888',
  function: '#6600cc',
  operator: '#cc0000'
};

<QlikEditor customColors={customColors} />`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Disable Specific Highlighting</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-sm">
{`<QlikEditor 
  highlightOptions={{
    keywords: true,
    functions: true,
    strings: true,
    numbers: false,  // Disable number highlighting
    comments: true,
    variables: true
  }}
/>`}
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
          <CardTitle>Performance Considerations</CardTitle>
          <CardDescription>
            Tips for optimal syntax highlighting performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">✅ Best Practices</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use appropriate themes for your environment</li>
                <li>• Enable only needed highlighting features</li>
                <li>• Consider disabling animations for large files</li>
                <li>• Use debounced updates for real-time highlighting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚠️ Performance Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Large files (&gt;10MB) may highlight slowly</li>
                <li>• Complex regex patterns can impact performance</li>
                <li>• Consider lazy loading for very large scripts</li>
                <li>• Use virtualization for extremely long files</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}