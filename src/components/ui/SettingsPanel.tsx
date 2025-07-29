"use client"

import type React from "react"
import { X, Palette, Code, Save, Eye, Shield, Clock, Settings2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { animations } from "./design-system"
import { cn } from "../../lib/utils"

export interface EditorSettings {
  // Appearance
  theme: "light" | "dark" | "auto"
  fontSize: number
  fontFamily: string
  lineHeight: number

  // Editor Behavior
  wordWrap: "on" | "off" | "wordWrapColumn"
  tabSize: number
  insertSpaces: boolean
  autoClosingBrackets: "always" | "never" | "languageDefined"
  autoIndent: "none" | "keep" | "brackets" | "advanced"

  // Features
  minimap: boolean
  lineNumbers: "on" | "off" | "relative"
  showWhitespace: "none" | "boundary" | "selection" | "trailing" | "all"
  highlightActiveIndentGuide: boolean
  bracketPairColorization: boolean

  // Auto-save
  autoSave: boolean
  autoSaveInterval: number

  // Validation
  enableValidation: boolean
  showValidationErrors: boolean

  // Notifications
  showNotifications: boolean
  notificationDuration: number
}

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  settings: EditorSettings
  onSettingsChange: (settings: EditorSettings) => void
  onResetSettings: () => void
  className?: string
}

const defaultSettings: EditorSettings = {
  theme: "dark" as const,
  fontSize: 14,
  fontFamily: "Fira Code, Monaco, Consolas, monospace",
  lineHeight: 1.5,
  wordWrap: "on" as const,
  tabSize: 2,
  insertSpaces: true,
  autoClosingBrackets: "always" as const,
  autoIndent: "advanced" as const,
  minimap: true,
  lineNumbers: "on" as const,
  showWhitespace: "none" as const,
  highlightActiveIndentGuide: true,
  bracketPairColorization: true,
  autoSave: true,
  autoSaveInterval: 30000,
  enableValidation: true,
  showValidationErrors: true,
  showNotifications: true,
  notificationDuration: 3000,
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  onResetSettings,
  className,
}) => {
  const updateSetting = <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  const SettingCard: React.FC<{
    title: string
    description: string
    children: React.ReactNode
  }> = ({ title, description, children }) => (
    <Card className={cn("transition-all duration-200 hover:shadow-md", animations.fadeIn)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )

  const SliderSetting: React.FC<{
    label: string
    value: number
    min: number
    max: number
    step: number
    unit: string
    onChange: (value: number) => void
  }> = ({ label, value, min, max, step, unit, onChange }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <Badge variant="outline" className="font-mono text-xs">
          {value}
          {unit}
        </Badge>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  )

  const SwitchSetting: React.FC<{
    label: string
    description?: string
    checked: boolean
    onChange: (checked: boolean) => void
  }> = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between space-x-4">
      <div className="space-y-1">
        <Label className="text-sm font-medium">{label}</Label>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("max-w-4xl max-h-[90vh] overflow-hidden p-0", className)}>
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                <Settings2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">Editor Settings</DialogTitle>
                <DialogDescription className="text-sm">Customize your Qlik Script Editor experience</DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onResetSettings}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="appearance" className="h-full">
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-48 border-r bg-muted/30 p-4">
                <TabsList className="grid w-full grid-cols-1 gap-1 h-auto bg-transparent">
                  <TabsTrigger value="appearance" className="w-full justify-start data-[state=active]:bg-background">
                    <Palette className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger value="editor" className="w-full justify-start data-[state=active]:bg-background">
                    <Code className="h-4 w-4 mr-2" />
                    Editor
                  </TabsTrigger>
                  <TabsTrigger value="features" className="w-full justify-start data-[state=active]:bg-background">
                    <Eye className="h-4 w-4 mr-2" />
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="autosave" className="w-full justify-start data-[state=active]:bg-background">
                    <Save className="h-4 w-4 mr-2" />
                    Auto-save
                  </TabsTrigger>
                  <TabsTrigger value="validation" className="w-full justify-start data-[state=active]:bg-background">
                    <Shield className="h-4 w-4 mr-2" />
                    Validation
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start data-[state=active]:bg-background">
                    <Clock className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <TabsContent value="appearance" className="mt-0 space-y-6">
                  <SettingCard title="Theme" description="Choose your preferred color scheme">
                    <div className="space-y-3">
                      <Label>Color Theme</Label>
                      <Select value={settings.theme} onValueChange={(value: any) => updateSetting("theme", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </SettingCard>

                  <SettingCard title="Typography" description="Customize font settings">
                    <SliderSetting
                      label="Font Size"
                      value={settings.fontSize}
                      min={10}
                      max={24}
                      step={1}
                      unit="px"
                      onChange={(value) => updateSetting("fontSize", value)}
                    />
                    <div className="space-y-3">
                      <Label>Font Family</Label>
                      <Input
                        value={settings.fontFamily}
                        onChange={(e) => updateSetting("fontFamily", e.target.value)}
                        placeholder="e.g., Fira Code, Monaco"
                      />
                    </div>
                    <SliderSetting
                      label="Line Height"
                      value={settings.lineHeight}
                      min={1.0}
                      max={2.0}
                      step={0.1}
                      unit=""
                      onChange={(value) => updateSetting("lineHeight", value)}
                    />
                  </SettingCard>
                </TabsContent>

                <TabsContent value="editor" className="mt-0 space-y-6">
                  <SettingCard title="Text Editing" description="Configure text editing behavior">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label>Word Wrap</Label>
                        <Select
                          value={settings.wordWrap}
                          onValueChange={(value: any) => updateSetting("wordWrap", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="on">On</SelectItem>
                            <SelectItem value="off">Off</SelectItem>
                            <SelectItem value="wordWrapColumn">At Column</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <SliderSetting
                        label="Tab Size"
                        value={settings.tabSize}
                        min={1}
                        max={8}
                        step={1}
                        unit=" spaces"
                        onChange={(value) => updateSetting("tabSize", value)}
                      />

                      <SwitchSetting
                        label="Insert Spaces"
                        description="Use spaces instead of tabs"
                        checked={settings.insertSpaces}
                        onChange={(value) => updateSetting("insertSpaces", value)}
                      />
                    </div>
                  </SettingCard>

                  <SettingCard title="Auto Completion" description="Configure automatic code completion">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label>Auto Closing Brackets</Label>
                        <Select
                          value={settings.autoClosingBrackets}
                          onValueChange={(value: any) => updateSetting("autoClosingBrackets", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="always">Always</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                            <SelectItem value="languageDefined">Language Defined</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label>Auto Indent</Label>
                        <Select
                          value={settings.autoIndent}
                          onValueChange={(value: any) => updateSetting("autoIndent", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="keep">Keep</SelectItem>
                            <SelectItem value="brackets">Brackets</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SettingCard>
                </TabsContent>

                <TabsContent value="features" className="mt-0 space-y-6">
                  <SettingCard title="Editor Features" description="Enable or disable editor features">
                    <div className="space-y-4">
                      <SwitchSetting
                        label="Minimap"
                        description="Show code overview"
                        checked={settings.minimap}
                        onChange={(value) => updateSetting("minimap", value)}
                      />

                      <Separator />

                      <div className="space-y-3">
                        <Label>Line Numbers</Label>
                        <Select
                          value={settings.lineNumbers}
                          onValueChange={(value: any) => updateSetting("lineNumbers", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="on">On</SelectItem>
                            <SelectItem value="off">Off</SelectItem>
                            <SelectItem value="relative">Relative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <SwitchSetting
                        label="Highlight Active Indent Guide"
                        checked={settings.highlightActiveIndentGuide}
                        onChange={(value) => updateSetting("highlightActiveIndentGuide", value)}
                      />

                      <SwitchSetting
                        label="Bracket Pair Colorization"
                        checked={settings.bracketPairColorization}
                        onChange={(value) => updateSetting("bracketPairColorization", value)}
                      />
                    </div>
                  </SettingCard>
                </TabsContent>

                <TabsContent value="autosave" className="mt-0 space-y-6">
                  <SettingCard title="Auto-save" description="Automatically save your work">
                    <div className="space-y-4">
                      <SwitchSetting
                        label="Enable Auto-save"
                        description="Automatically save script changes"
                        checked={settings.autoSave}
                        onChange={(value) => updateSetting("autoSave", value)}
                      />

                      {settings.autoSave && (
                        <>
                          <Separator />
                          <SliderSetting
                            label="Auto-save Interval"
                            value={settings.autoSaveInterval / 1000}
                            min={5}
                            max={300}
                            step={5}
                            unit="s"
                            onChange={(value) => updateSetting("autoSaveInterval", value * 1000)}
                          />
                        </>
                      )}
                    </div>
                  </SettingCard>
                </TabsContent>

                <TabsContent value="validation" className="mt-0 space-y-6">
                  <SettingCard title="Script Validation" description="Validate Qlik script syntax">
                    <div className="space-y-4">
                      <SwitchSetting
                        label="Enable Validation"
                        description="Validate Qlik script syntax"
                        checked={settings.enableValidation}
                        onChange={(value) => updateSetting("enableValidation", value)}
                      />

                      <SwitchSetting
                        label="Show Validation Errors"
                        description="Display syntax errors in editor"
                        checked={settings.showValidationErrors}
                        onChange={(value) => updateSetting("showValidationErrors", value)}
                      />
                    </div>
                  </SettingCard>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0 space-y-6">
                  <SettingCard title="Notifications" description="Configure notification preferences">
                    <div className="space-y-4">
                      <SwitchSetting
                        label="Show Notifications"
                        description="Display status notifications"
                        checked={settings.showNotifications}
                        onChange={(value) => updateSetting("showNotifications", value)}
                      />

                      {settings.showNotifications && (
                        <>
                          <Separator />
                          <SliderSetting
                            label="Notification Duration"
                            value={settings.notificationDuration / 1000}
                            min={1}
                            max={10}
                            step={0.5}
                            unit="s"
                            onChange={(value) => updateSetting("notificationDuration", value * 1000)}
                          />
                        </>
                      )}
                    </div>
                  </SettingCard>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { SettingsPanel, defaultSettings }
