import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Settings, Code, Zap, Shield } from "lucide-react"

export default function AdvancedConfigurationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Advanced Configuration</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Deep customization options for power users and enterprise environments.
        </p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>For Advanced Users</AlertTitle>
        <AlertDescription>
          These configuration options are for experienced developers who need fine-grained
          control over editor behavior. Most users should start with basic configuration.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Custom Extensions
          </CardTitle>
          <CardDescription>
            Extend editor functionality with custom plugins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <pre className="text-sm">
{`import { Extension } from 'qlik-script-editor';

const customExtension: Extension = {
  name: 'custom-formatter',
  
  activate: (editor) => {
    // Add custom formatting rules
    editor.addFormatter({
      formatDocument: (text) => {
        return formatQlikScript(text);
      }
    });
  },
  
  deactivate: (editor) => {
    // Clean up resources
  }
};

<QlikEditor extensions={[customExtension]} />`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Performance Tuning
          </CardTitle>
          <CardDescription>
            Optimize editor performance for large files and complex scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Memory Management</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-xs">
{`<QlikEditor 
  performanceOptions={{
    lazyLoading: true,
    virtualScrolling: true,
    maxFileSize: '10MB',
    debounceDelay: 300,
    maxUndoLevels: 100
  }}
/>`}
                </pre>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Rendering Options</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-xs">
{`<QlikEditor 
  renderingOptions={{
    lineNumbersMinChars: 3,
    showWhitespace: false,
    showIndentGuides: true,
    smoothScrolling: true,
    animateScrolling: false
  }}
/>`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Enterprise Features
          </CardTitle>
          <CardDescription>
            Configuration for enterprise deployment scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Security & Compliance</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`<QlikEditor 
  securityOptions={{
    disableExecute: true,
    auditLogging: true,
    restrictFileAccess: true,
    encryptContent: true
  }}
/>`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Integration Settings</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`<QlikEditor 
  integrationOptions={{
    qlikSenseUrl: 'https://your-qlik-server',
    authProvider: customAuthProvider,
    dataSourceManager: customDataSources,
    versionControl: gitIntegration
  }}
/>`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}