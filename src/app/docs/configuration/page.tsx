import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Monitor, Code, Palette, Keyboard } from "lucide-react"

export default function ConfigurationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Configuration</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Customize qlik-script-editor to fit your development workflow and preferences.
        </p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Options</TabsTrigger>
          <TabsTrigger value="theme">Theme & Appearance</TabsTrigger>
          <TabsTrigger value="behavior">Editor Behavior</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Basic Configuration
              </CardTitle>
              <CardDescription>
                Essential properties to get started with customizing the editor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">height</code>
                    <Badge variant="outline">string | number</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set the height of the editor. Can be a CSS string or pixel value.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor height="400px" />
<QlikEditor height={600} />
<QlikEditor height="50vh" />`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">width</code>
                    <Badge variant="outline">string | number</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set the width of the editor. Defaults to 100%.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor width="100%" />
<QlikEditor width={800} />
<QlikEditor width="80vw" />`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">placeholder</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Text to display when the editor is empty.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor 
  placeholder="Enter your Qlik script here..." 
/>`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">readOnly</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Make the editor read-only. Useful for displaying code samples.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor 
  readOnly={true}
  value="LOAD * FROM DataSource;" 
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Theme & Appearance
              </CardTitle>
              <CardDescription>
                Customize the visual appearance and theming options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">theme</code>
                    <Badge variant="outline">'light' | 'dark' | 'auto'</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set the editor theme. 'auto' follows system preference.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor theme="light" />
<QlikEditor theme="dark" />
<QlikEditor theme="auto" />`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">fontSize</code>
                    <Badge variant="outline">number</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set the font size for the editor content in pixels.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor fontSize={14} />
<QlikEditor fontSize={16} />
<QlikEditor fontSize={18} />`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">fontFamily</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set a custom font family for the editor.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor fontFamily="'Fira Code', monospace" />
<QlikEditor fontFamily="'Source Code Pro', monospace" />`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">lineHeight</code>
                    <Badge variant="outline">number</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Control line spacing. Default is 1.5.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor lineHeight={1.4} />
<QlikEditor lineHeight={1.6} />
<QlikEditor lineHeight={2} />`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Editor Behavior
              </CardTitle>
              <CardDescription>
                Configure how the editor behaves during editing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">autoComplete</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Enable or disable auto-completion features.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor autoComplete={true} />
<QlikEditor autoComplete={false} />`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">tabSize</code>
                    <Badge variant="outline">number</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set the number of spaces per tab. Default is 2.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor tabSize={2} />
<QlikEditor tabSize={4} />
<QlikEditor tabSize={8} />`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">wordWrap</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Enable word wrapping for long lines.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor wordWrap={true} />
<QlikEditor wordWrap={false} />`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">lineNumbers</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Show or hide line numbers. Default is true.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor lineNumbers={true} />
<QlikEditor lineNumbers={false} />`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">bracketMatching</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Enable bracket matching and highlighting.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`<QlikEditor bracketMatching={true} />
<QlikEditor bracketMatching={false} />`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="h-5 w-5 mr-2" />
                Advanced Configuration
              </CardTitle>
              <CardDescription>
                Advanced options for fine-tuning editor behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">extensions</code>
                    <Badge variant="outline">Extension[]</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add custom extensions to enhance functionality.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`import { customExtension } from './extensions';

<QlikEditor 
  extensions={[customExtension()]}
/>`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">keybindings</code>
                    <Badge variant="outline">KeyBinding[]</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Define custom keyboard shortcuts.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`const customKeybindings = [
  {
    key: 'Cmd-k',
    run: () => { /* custom action */ },
    preventDefault: true
  }
];

<QlikEditor keybindings={customKeybindings} />`}
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">completionProvider</code>
                    <Badge variant="outline">CompletionProvider</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Custom completion provider for advanced auto-completion.
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-xs">
{`const customProvider = {
  provideCompletions: (context) => {
    // Return custom completions
    return [];
  }
};

<QlikEditor completionProvider={customProvider} />`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Complete Configuration Example</CardTitle>
              <CardDescription>
                A comprehensive example showing all available options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import QlikEditor from 'qlik-script-editor';

function MyApp() {
  return (
    <QlikEditor
      // Basic options
      height="500px"
      width="100%"
      placeholder="Enter your Qlik script..."
      readOnly={false}
      
      // Theme & appearance
      theme="auto"
      fontSize={14}
      fontFamily="'Fira Code', monospace"
      lineHeight={1.5}
      
      // Behavior
      autoComplete={true}
      tabSize={2}
      wordWrap={true}
      lineNumbers={true}
      bracketMatching={true}
      
      // Event handlers
      onChange={(value) => console.log(value)}
      onFocus={() => console.log('Editor focused')}
      onBlur={() => console.log('Editor blurred')}
      
      // Advanced
      extensions={[]}
      keybindings={[]}
      completionProvider={undefined}
    />
  );
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}