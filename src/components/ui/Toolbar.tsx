import React from 'react';
import { LucideIcon, Play, Square, RotateCcw, Download, Upload, Settings } from 'lucide-react';
import { designTokens, componentVariants, a11y, combineClasses } from './design-system';
import { cn } from '../../lib/utils';

export interface ToolbarButton {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  shortcut?: string;
  loading?: boolean;
}

interface ToolbarProps {
  buttons?: ToolbarButton[];
  isRunning?: boolean;
  onRun?: () => void;
  onStop?: () => void;
  onFormat?: () => void;
  onSave?: () => void;
  onLoad?: () => void;
  onSettings?: () => void;
  className?: string;
  showStatus?: boolean;
}

const defaultButtons: ToolbarButton[] = [
  {
    icon: Play,
    label: 'Run Script',
    variant: 'primary',
    shortcut: 'Ctrl+R'
  },
  {
    icon: Square,
    label: 'Stop',
    variant: 'secondary'
  },
  {
    icon: RotateCcw,
    label: 'Format',
    variant: 'secondary',
    shortcut: 'Shift+Alt+F'
  },
  {
    icon: Download,
    label: 'Save',
    variant: 'secondary',
    shortcut: 'Ctrl+S'
  },
  {
    icon: Upload,
    label: 'Load',
    variant: 'secondary',
    shortcut: 'Ctrl+O'
  },
  {
    icon: Settings,
    label: 'Settings',
    variant: 'secondary'
  }
];

const Toolbar: React.FC<ToolbarProps> = ({
  buttons = defaultButtons,
  isRunning = false,
  onRun,
  onStop,
  onFormat,
  onSave,
  onLoad,
  onSettings,
  className,
  showStatus = true
}) => {
  const getButtonProps = (button: ToolbarButton, index: number) => {
    let onClick = button.onClick;
    let disabled = button.disabled;

    // Map default actions
    if (!onClick) {
      switch (button.label) {
        case 'Run Script':
          onClick = onRun;
          disabled = disabled || isRunning;
          break;
        case 'Stop':
          onClick = onStop;
          disabled = disabled || !isRunning;
          break;
        case 'Format':
          onClick = onFormat;
          break;
        case 'Save':
          onClick = onSave;
          break;
        case 'Load':
          onClick = onLoad;
          break;
        case 'Settings':
          onClick = onSettings;
          break;
      }
    }

    return { ...button, onClick, disabled };
  };

  return (
    <div 
      className={cn(
        designTokens.colors.bg.secondary,
        designTokens.colors.border.primary,
        "border-b flex-shrink-0 px-4 py-2 sm:px-6",
        className
      )}
      role="toolbar"
      aria-label="Editor toolbar"
    >
      <div className="flex items-center justify-between">
        {/* Toolbar Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2" role="group">
          {buttons.map((button, index) => {
            const buttonProps = getButtonProps(button, index);
            const Icon = buttonProps.icon;
            const isPrimary = buttonProps.variant === 'primary';
            const isLoading = buttonProps.loading || (isRunning && buttonProps.label === 'Run Script');
            
            return (
              <button
                key={`${buttonProps.label}-${index}`}
                onClick={buttonProps.onClick}
                disabled={buttonProps.disabled}
                className={cn(
                  isPrimary ? componentVariants.button.primary : componentVariants.button.secondary,
                  "inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2",
                  designTokens.typography.body.primary,
                  buttonProps.disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-105 active:scale-95',
                  a11y.focusRing
                )}
                title={`${buttonProps.label}${buttonProps.shortcut ? ` (${buttonProps.shortcut})` : ''}`}
                aria-label={buttonProps.label}
                aria-disabled={buttonProps.disabled}
              >
                <Icon 
                  className={cn(
                    "h-4 w-4",
                    buttonProps.label && !buttonProps.disabled ? "sm:mr-2" : "",
                    isLoading ? "animate-pulse" : ""
                  )} 
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">
                  {buttonProps.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Status Indicator */}
        {showStatus && (
          <div 
            className="flex items-center space-x-2"
            role="status"
            aria-live="polite"
          >
            <div 
              className={cn(
                "h-2 w-2 rounded-full",
                isRunning 
                  ? "bg-green-500 animate-pulse" 
                  : "bg-gray-300 dark:bg-gray-600"
              )}
              aria-hidden="true"
            />
            <span className={cn(
              designTokens.typography.body.secondary,
              designTokens.colors.text.secondary,
              "hidden sm:inline"
            )}>
              {isRunning ? 'Running...' : 'Ready'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;