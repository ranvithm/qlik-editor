import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Code, Brain, Settings, Keyboard } from "lucide-react"

export default function AutoCompletionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Auto-completion</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Intelligent code completion that understands Qlik script context and provides relevant suggestions.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Smart Suggestions</h2>
        <p className="text-muted-foreground mb-6">
          Our auto-completion engine analyzes your code context to provide the most relevant suggestions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle className="text-lg">Qlik Functions</CardTitle>
                  <CardDescription>
                    All built-in Qlik functions with signatures
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Complete function library including:</p>
                <ul className="space-y-1">
                  <li>• Date functions (Date#, Today, MakeDate)</li>
                  <li>• String functions (Left, Mid, Replace)</li>
                  <li>• Aggregation functions (Sum, Count, Avg)</li>
                  <li>• Conditional functions (If, Pick, Match)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-green-600" />
                <div>
                  <CardTitle className="text-lg">Keywords & Syntax</CardTitle>
                  <CardDescription>
                    SQL-like keywords and Qlik-specific syntax
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Context-aware suggestions for:</p>
                <ul className="space-y-1">
                  <li>• LOAD statements and clauses</li>
                  <li>• JOIN operations (LEFT, INNER, RIGHT)</li>
                  <li>• WHERE, GROUP BY, ORDER BY</li>
                  <li>• SET and LET variable assignments</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-purple-600" />
                <div>
                  <CardTitle className="text-lg">Field Names</CardTitle>
                  <CardDescription>
                    Intelligent field name suggestions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Dynamic suggestions based on:</p>
                <ul className="space-y-1">
                  <li>• Previously loaded fields</li>
                  <li>• Current table context</li>
                  <li>• Common field naming patterns</li>
                  <li>• User-defined field aliases</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Context-Aware Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Badge variant="outline" className="mb-2">Function Parameters</Badge>
                    <p className="text-sm text-muted-foreground">
                      Shows parameter hints and expected data types for Qlik functions as you type.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Table Context</Badge>
                    <p className="text-sm text-muted-foreground">
                      Suggests relevant field names based on the current table being loaded or joined.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Syntax Completion</Badge>
                    <p className="text-sm text-muted-foreground">
                      Completes SQL-like clauses and Qlik-specific statements based on cursor position.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Filtering</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Badge variant="outline" className="mb-2">Fuzzy Matching</Badge>
                    <p className="text-sm text-muted-foreground">
                      Find functions and fields even with partial or misspelled input.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Relevance Ranking</Badge>
                    <p className="text-sm text-muted-foreground">
                      Most relevant suggestions appear first based on usage patterns and context.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Recent Usage</Badge>
                    <p className="text-sm text-muted-foreground">
                      Recently used functions and fields are prioritized in suggestions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Auto-completion Examples</CardTitle>
              <CardDescription>
                See how auto-completion works in different scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Function Completion</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-mono mb-2">Type: <code>dat</code></div>
                    <div className="border-l-2 border-blue-500 pl-4">
                      <div className="text-sm space-y-1">
                        <div>📘 <strong>Date#</strong>(text, format) - Parse date from text</div>
                        <div>📘 <strong>Date</strong>(serial) - Format serial number as date</div>
                        <div>📘 <strong>DateDiff</strong>(part, startdate, enddate) - Calculate date difference</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Field Name Completion</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-mono mb-2">Type: <code>cust</code></div>
                    <div className="border-l-2 border-green-500 pl-4">
                      <div className="text-sm space-y-1">
                        <div>🏷️ <strong>CustomerID</strong> - from Customers table</div>
                        <div>🏷️ <strong>CustomerName</strong> - from Customers table</div>
                        <div>🏷️ <strong>CustomerType</strong> - calculated field</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Keyword Completion</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-mono mb-2">Type: <code>lef</code></div>
                    <div className="border-l-2 border-purple-500 pl-4">
                      <div className="text-sm space-y-1">
                        <div>⚡ <strong>LEFT JOIN</strong> - Join tables keeping left table records</div>
                        <div>📘 <strong>Left</strong>(text, count) - Extract leftmost characters</div>
                        <div>📘 <strong>Len</strong>(text) - Get text length</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shortcuts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Keyboard className="h-5 w-5 mr-2" />
                Keyboard Shortcuts
              </CardTitle>
              <CardDescription>
                Speed up your development with these keyboard shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Completion Controls</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Trigger completion</span>
                      <Badge variant="outline">Ctrl+Space</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Accept suggestion</span>
                      <Badge variant="outline">Tab / Enter</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Dismiss completion</span>
                      <Badge variant="outline">Escape</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Navigate suggestions</span>
                      <Badge variant="outline">↑ ↓ Arrow keys</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Advanced Features</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Parameter hints</span>
                      <Badge variant="outline">Ctrl+Shift+Space</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Function signature</span>
                      <Badge variant="outline">Ctrl+K</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Quick info</span>
                      <Badge variant="outline">Ctrl+Q</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Show docs</span>
                      <Badge variant="outline">F1</Badge>
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
                Configuring Auto-completion
              </CardTitle>
              <CardDescription>
                Customize auto-completion behavior to match your preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Basic Configuration</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-sm">
{`<QlikEditor 
  autoComplete={true}
  completionDelay={300}
  maxSuggestions={10}
/>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Advanced Options</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-sm">
{`<QlikEditor 
  completionOptions={{
    enableFunctions: true,
    enableKeywords: true,
    enableFieldNames: true,
    enableSnippets: true,
    fuzzyMatching: true,
    caseSensitive: false,
    triggerCharacters: ['.', '(', '[']
  }}
/>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Custom Completion Provider</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-sm">
{`const customProvider = {
  provideCompletions: (context) => {
    return [
      {
        label: 'MyCustomFunction',
        kind: 'function',
        documentation: 'Custom function description',
        insertText: 'MyCustomFunction($1)',
        insertTextRules: 'InsertAsSnippet'
      }
    ];
  }
};

<QlikEditor completionProvider={customProvider} />`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}