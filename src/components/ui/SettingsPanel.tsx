import React, { useState } from 'react';
import { 
  X, 
  Monitor, 
  Palette, 
  Code, 
  Save, 
  Eye, 
  Type, 
  Grid3X3, 
  Zap,
  Clock,
  Shield,
  Settings2,
  RotateCcw
} from 'lucide-react';
import { designTokens, componentVariants, a11y } from './design-system';
import { cn } from '../../lib/utils';

export interface EditorSettings {
  // Appearance
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  
  // Editor Behavior
  wordWrap: 'on' | 'off' | 'wordWrapColumn';
  tabSize: number;
  insertSpaces: boolean;
  autoClosingBrackets: 'always' | 'never' | 'languageDefined';
  autoIndent: 'none' | 'keep' | 'brackets' | 'advanced';
  
  // Features
  minimap: boolean;
  lineNumbers: 'on' | 'off' | 'relative';
  showWhitespace: 'none' | 'boundary' | 'selection' | 'trailing' | 'all';
  highlightActiveIndentGuide: boolean;
  bracketPairColorization: boolean;
  
  // Auto-save
  autoSave: boolean;
  autoSaveInterval: number;
  
  // Validation
  enableValidation: boolean;
  showValidationErrors: boolean;
  
  // Notifications
  showNotifications: boolean;
  notificationDuration: number;
}

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: EditorSettings;
  onSettingsChange: (settings: EditorSettings) => void;
  onResetSettings: () => void;
  className?: string;
}

const defaultSettings: EditorSettings = {
  theme: 'dark' as const,
  fontSize: 14,
  fontFamily: 'Fira Code, Monaco, Consolas, monospace',
  lineHeight: 1.5,
  wordWrap: 'on' as const,
  tabSize: 2,
  insertSpaces: true,
  autoClosingBrackets: 'always' as const,
  autoIndent: 'advanced' as const,
  minimap: true,
  lineNumbers: 'on' as const,
  showWhitespace: 'none' as const,
  highlightActiveIndentGuide: true,
  bracketPairColorization: true,
  autoSave: true,
  autoSaveInterval: 30000,
  enableValidation: true,
  showValidationErrors: true,
  showNotifications: true,
  notificationDuration: 3000,
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  onResetSettings,
  className
}) => {
  const [activeSection, setActiveSection] = useState<'appearance' | 'editor' | 'features' | 'autosave' | 'validation' | 'notifications'>('appearance');

  if (!isOpen) return null;

  const updateSetting = <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const sections = [
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'editor' as const, label: 'Editor', icon: Code },
    { id: 'features' as const, label: 'Features', icon: Eye },
    { id: 'autosave' as const, label: 'Auto-save', icon: Save },
    { id: 'validation' as const, label: 'Validation', icon: Shield },
    { id: 'notifications' as const, label: 'Notifications', icon: Clock },
  ];

  const renderSlider = (
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    unit: string,
    onChange: (value: number) => void
  ) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className={cn(designTokens.typography.body.primary, designTokens.colors.text.primary)}>
          {label}
        </label>
        <span className={cn(designTokens.typography.body.secondary, designTokens.colors.text.secondary)}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
      />
    </div>
  );

  const renderSelect = <T extends string>(
    label: string,
    value: T,
    options: { value: T; label: string }[],
    onChange: (value: T) => void
  ) => (
    <div className="space-y-2">
      <label className={cn(designTokens.typography.body.primary, designTokens.colors.text.primary)}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={cn(
          "w-full px-3 py-2 rounded-md border",
          designTokens.colors.bg.secondary,
          designTokens.colors.border.primary,
          designTokens.colors.text.primary,
          designTokens.typography.body.primary,
          a11y.focusRing
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderInput = (
    label: string,
    value: string | number,
    type: 'text' | 'number',
    onChange: (value: string | number) => void,
    placeholder?: string
  ) => (
    <div className="space-y-2">
      <label className={cn(designTokens.typography.body.primary, designTokens.colors.text.primary)}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full px-3 py-2 rounded-md border",
          designTokens.colors.bg.secondary,
          designTokens.colors.border.primary,
          designTokens.colors.text.primary,
          designTokens.typography.body.primary,
          a11y.focusRing
        )}
      />
    </div>
  );

  const renderToggle = (
    label: string,
    value: boolean,
    onChange: (value: boolean) => void,
    description?: string
  ) => (
    <div className="flex items-start justify-between py-2">
      <div className="flex-1">
        <label className={cn(designTokens.typography.body.primary, designTokens.colors.text.primary, "cursor-pointer")}>
          {label}
        </label>
        {description && (
          <p className={cn(designTokens.typography.body.secondary, designTokens.colors.text.secondary, "mt-1")}>
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          value ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
        )}
        role="switch"
        aria-checked={value}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            value ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'appearance':
        return (
          <div className="space-y-6">
            {renderSelect('Theme', settings.theme, [
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'auto', label: 'System' }
            ], (value) => updateSetting('theme', value))}
            
            {renderSlider('Font Size', settings.fontSize, 10, 24, 1, 'px', (value) => updateSetting('fontSize', value))}
            
            {renderInput('Font Family', settings.fontFamily, 'text', (value) => updateSetting('fontFamily', value as string), 'e.g., Fira Code, Monaco')}
            
            {renderSlider('Line Height', settings.lineHeight, 1.0, 2.0, 0.1, '', (value) => updateSetting('lineHeight', value))}
          </div>
        );
        
      case 'editor':
        return (
          <div className="space-y-6">
            {renderSelect('Word Wrap', settings.wordWrap, [
              { value: 'on', label: 'On' },
              { value: 'off', label: 'Off' },
              { value: 'wordWrapColumn', label: 'At Column' }
            ], (value) => updateSetting('wordWrap', value))}
            
            {renderSlider('Tab Size', settings.tabSize, 1, 8, 1, ' spaces', (value) => updateSetting('tabSize', value))}
            
            {renderToggle('Insert Spaces', settings.insertSpaces, (value) => updateSetting('insertSpaces', value), 'Use spaces instead of tabs')}
            
            {renderSelect('Auto Closing Brackets', settings.autoClosingBrackets, [
              { value: 'always', label: 'Always' },
              { value: 'never', label: 'Never' },
              { value: 'languageDefined', label: 'Language Defined' }
            ], (value) => updateSetting('autoClosingBrackets', value))}
            
            {renderSelect('Auto Indent', settings.autoIndent, [
              { value: 'none', label: 'None' },
              { value: 'keep', label: 'Keep' },
              { value: 'brackets', label: 'Brackets' },
              { value: 'advanced', label: 'Advanced' }
            ], (value) => updateSetting('autoIndent', value))}
          </div>
        );
        
      case 'features':
        return (
          <div className="space-y-4">
            {renderToggle('Minimap', settings.minimap, (value) => updateSetting('minimap', value), 'Show code overview')}
            
            {renderSelect('Line Numbers', settings.lineNumbers, [
              { value: 'on', label: 'On' },
              { value: 'off', label: 'Off' },
              { value: 'relative', label: 'Relative' }
            ], (value) => updateSetting('lineNumbers', value))}
            
            {renderSelect('Show Whitespace', settings.showWhitespace, [
              { value: 'none', label: 'None' },
              { value: 'boundary', label: 'Boundary' },
              { value: 'selection', label: 'Selection' },
              { value: 'trailing', label: 'Trailing' },
              { value: 'all', label: 'All' }
            ], (value) => updateSetting('showWhitespace', value))}
            
            {renderToggle('Highlight Active Indent Guide', settings.highlightActiveIndentGuide, (value) => updateSetting('highlightActiveIndentGuide', value))}
            
            {renderToggle('Bracket Pair Colorization', settings.bracketPairColorization, (value) => updateSetting('bracketPairColorization', value))}
          </div>
        );
        
      case 'autosave':
        return (
          <div className="space-y-6">
            {renderToggle('Enable Auto-save', settings.autoSave, (value) => updateSetting('autoSave', value), 'Automatically save script changes')}
            
            {settings.autoSave && (
              <div>
                {renderSlider('Auto-save Interval', settings.autoSaveInterval / 1000, 5, 300, 5, 's', (value) => updateSetting('autoSaveInterval', value * 1000))}
              </div>
            )}
          </div>
        );
        
      case 'validation':
        return (
          <div className="space-y-4">
            {renderToggle('Enable Validation', settings.enableValidation, (value) => updateSetting('enableValidation', value), 'Validate Qlik script syntax')}
            
            {renderToggle('Show Validation Errors', settings.showValidationErrors, (value) => updateSetting('showValidationErrors', value), 'Display syntax errors in editor')}
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            {renderToggle('Show Notifications', settings.showNotifications, (value) => updateSetting('showNotifications', value), 'Display status notifications')}
            
            {settings.showNotifications && (
              <div>
                {renderSlider('Notification Duration', settings.notificationDuration / 1000, 1, 10, 0.5, 's', (value) => updateSetting('notificationDuration', value * 1000))}
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="settings-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Panel */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={cn(
          componentVariants.panel.elevated,
          "relative w-full max-w-4xl max-h-[90vh] overflow-hidden",
          className
        )}>
          {/* Header */}
          <div className={cn(
            designTokens.colors.bg.secondary,
            designTokens.colors.border.primary,
            "border-b px-6 py-4"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings2 className="h-6 w-6 text-blue-500" />
                <h2 id="settings-title" className={cn(designTokens.typography.heading.secondary, designTokens.colors.text.primary)}>
                  Editor Settings
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={onResetSettings}
                  className={cn(componentVariants.button.ghost, "text-sm")}
                  title="Reset to defaults"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </button>
                <button
                  onClick={onClose}
                  className={cn(componentVariants.button.ghost, "p-2")}
                  aria-label="Close settings"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex h-[calc(90vh-5rem)]">
            {/* Sidebar */}
            <div className={cn(
              designTokens.colors.bg.tertiary,
              designTokens.colors.border.primary,
              "border-r w-48 p-4 overflow-y-auto"
            )}>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full flex items-center px-3 py-2 text-left rounded-md transition-colors",
                        designTokens.typography.body.primary,
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        a11y.focusRing
                      )}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SettingsPanel, defaultSettings };
export type { EditorSettings };