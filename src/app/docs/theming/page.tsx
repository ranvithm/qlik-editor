import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Moon, Sun, Monitor } from "lucide-react"

export default function ThemingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Theming</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Customize the visual appearance of qlik-script-editor to match your application design.
        </p>
      </div>

      <Tabs defaultValue="themes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="themes">Built-in Themes</TabsTrigger>
          <TabsTrigger value="custom">Custom Themes</TabsTrigger>
          <TabsTrigger value="variables">CSS Variables</TabsTrigger>
        </TabsList>

        <TabsContent value="themes" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Sun className="h-8 w-8 text-yellow-500" />
                  <div>
                    <CardTitle>Light Theme</CardTitle>
                    <CardDescription>Clean, bright interface</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-xs">
{`<QlikEditor theme="light" />`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Moon className="h-8 w-8 text-blue-500" />
                  <div>
                    <CardTitle>Dark Theme</CardTitle>
                    <CardDescription>Easy on the eyes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-xs">
{`<QlikEditor theme="dark" />`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Monitor className="h-8 w-8 text-gray-500" />
                  <div>
                    <CardTitle>Auto Theme</CardTitle>
                    <CardDescription>Follows system preference</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-xs">
{`<QlikEditor theme="auto" />`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Creating Custom Themes</CardTitle>
              <CardDescription>
                Define your own color schemes and styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`const customTheme = {
  name: 'my-theme',
  colors: {
    background: '#1e1e1e',
    foreground: '#d4d4d4',
    keyword: '#569cd6',
    string: '#ce9178',
    comment: '#6a9955',
    function: '#dcdcaa',
    number: '#b5cea8',
    operator: '#d4d4d4'
  }
};

<QlikEditor customTheme={customTheme} />`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variables" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CSS Variables Reference</CardTitle>
              <CardDescription>
                Override specific styling aspects using CSS custom properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Editor Colors</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-xs">
{`:root {
  --qlik-editor-background: #ffffff;
  --qlik-editor-foreground: #000000;
  --qlik-editor-selection: #add6ff;
  --qlik-editor-cursor: #000000;
  --qlik-editor-line-highlight: #f0f0f0;
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Syntax Colors</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-xs">
{`:root {
  --qlik-syntax-keyword: #0066cc;
  --qlik-syntax-string: #008800;
  --qlik-syntax-number: #cc6600;
  --qlik-syntax-comment: #888888;
  --qlik-syntax-function: #6600cc;
  --qlik-syntax-operator: #cc0000;
}`}
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