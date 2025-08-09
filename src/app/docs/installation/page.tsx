import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Terminal, Package, Copy, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"

export default function InstallationPage() {
  return (
    <div className="space-y-12 fade-in">
      <div className="space-y-4">
        <h1 id="installation" className="scroll-m-20">Installation</h1>
        <p className="text-xl text-muted-foreground leading-8">
          Get qlik-script-editor installed and ready to use in your project in just a few steps.
        </p>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="px-3 py-1">v1.0.5</Badge>
          <Badge variant="outline" className="px-3 py-1">TypeScript</Badge>
          <Badge variant="outline" className="px-3 py-1">React 16+</Badge>
        </div>
      </div>

      <div>
        <h2 id="prerequisites" className="scroll-m-20">Prerequisites</h2>
        <p className="text-muted-foreground mb-6">Make sure you have the following installed before proceeding:</p>
        <div className="grid gap-6 md:grid-cols-2 not-prose">
          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Node.js</CardTitle>
                  <CardDescription>
                    Version 16.0.0 or higher
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="destructive" className="text-xs">Required</Badge>
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://nodejs.org" target="_blank" className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Download
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Terminal className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Package Manager</CardTitle>
                  <CardDescription>
                    npm, yarn, or pnpm
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="destructive" className="text-xs">Required</Badge>
                <span className="text-xs text-muted-foreground">Included with Node.js</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 id="installation-methods" className="scroll-m-20">Quick Start</h2>
        <p className="text-muted-foreground mb-6">Choose your preferred package manager to install qlik-script-editor:</p>
        
        <div className="space-y-4 not-prose">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-blue-900 dark:text-blue-100">NPM (Recommended)</CardTitle>
                  <CardDescription className="text-blue-700 dark:text-blue-300">
                    Most popular package manager for Node.js
                  </CardDescription>
                </div>
                <Badge className="bg-blue-600 hover:bg-blue-700">Popular</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code="npm install qlik-script-editor"
                language="bash"
                title="NPM Installation"
              />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Yarn</CardTitle>
                <CardDescription>
                  Fast, reliable, and secure dependency management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code="yarn add qlik-script-editor"
                  language="bash"
                />
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">PNPM</CardTitle>
                <CardDescription>
                  Efficient package manager with disk space optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code="pnpm add qlik-script-editor"
                  language="bash"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div>
        <h2 id="basic-setup" className="scroll-m-20">Basic Setup</h2>
        <p className="text-muted-foreground mb-6">
          After installation, you can import and use qlik-script-editor in your React application. Here's a simple example to get you started:
        </p>

        <div className="space-y-6 not-prose">
          <CodeBlock
            code={`import React from 'react';
import QlikEditor from 'qlik-script-editor';

function App() {
  const [script, setScript] = React.useState('LOAD * FROM DataSource;');
  
  return (
    <div className="p-4">
      <h1>My Qlik Script Editor</h1>
      <QlikEditor
        value={script}
        onChange={setScript}
        height="400px"
        theme="auto"
      />
    </div>
  );
}

export default App;`}
            language="tsx"
            title="Basic React Component"
            showLineNumbers
          />
          
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>That's it!</AlertTitle>
            <AlertDescription>
              You now have a fully functional Qlik script editor in your React application with syntax highlighting, auto-completion, and error detection.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <div>
        <h2 id="typescript-support" className="scroll-m-20">TypeScript Support</h2>
        <p className="text-muted-foreground mb-6">
          qlik-script-editor includes built-in TypeScript declarations for full type safety. No additional @types packages are needed.
        </p>

        <div className="space-y-6 not-prose">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
                <Badge variant="outline" className="border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-300">TypeScript</Badge>
                Complete Type Safety
              </CardTitle>
              <CardDescription className="text-purple-700 dark:text-purple-300">
                Full TypeScript support with comprehensive type definitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import QlikEditor, { EditorProps, QlikEditorRef } from 'qlik-script-editor';

interface MyEditorProps {
  initialValue?: string;
  onScriptChange: (value: string) => void;
}

const MyEditor: React.FC<MyEditorProps> = ({ initialValue, onScriptChange }) => {
  const editorRef = React.useRef<QlikEditorRef>(null);
  
  const handleFormat = () => {
    editorRef.current?.format();
  };
  
  return (
    <div>
      <button onClick={handleFormat}>Format Code</button>
      <QlikEditor
        ref={editorRef}
        defaultValue={initialValue}
        onChange={onScriptChange}
        height="400px"
      />
    </div>
  );
};`}
                language="tsx"
                title="TypeScript Example"
                showLineNumbers
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200 dark:border-green-800 rounded-lg p-6 not-prose">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Installation Complete!</h3>
            <p className="text-green-700 dark:text-green-300 leading-relaxed">
              You're all set! qlik-script-editor is now installed and ready to use in your project.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a href="/docs/quick-start">Quick Start Guide →</a>
              </Button>
              <Button variant="outline" asChild className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-950">
                <a href="/examples">View Examples</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 id="troubleshooting" className="scroll-m-20">Troubleshooting</h2>
        <p className="text-muted-foreground mb-6">Having issues with installation? Here are some common solutions:</p>
        <div className="space-y-4 not-prose">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Common Installation Issues</AlertTitle>
            <AlertDescription>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-2.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Node.js Version</p>
                    <p className="text-sm text-muted-foreground">Ensure you're using Node.js 16 or higher. Check with <code className="bg-muted px-1 py-0.5 rounded text-xs">node --version</code></p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-2.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Clear Cache</p>
                    <p className="text-sm text-muted-foreground">Delete node_modules and package-lock.json, then run <code className="bg-muted px-1 py-0.5 rounded text-xs">npm install</code> again</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-2.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Peer Dependencies</p>
                    <p className="text-sm text-muted-foreground">Install React 16.8+ if not already present: <code className="bg-muted px-1 py-0.5 rounded text-xs">npm install react react-dom</code></p>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
          
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100">Need More Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-amber-800 dark:text-amber-200">If you're still experiencing issues, here are some resources:</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950">
                  <a href="https://github.com/qlik-script-editor/qlik-script-editor/issues" target="_blank" className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    GitHub Issues
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950">
                  <a href="/docs/configuration" className="flex items-center gap-1">
                    Configuration Guide
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}