import React, { useState } from 'react';
import { Play, Square, RotateCcw, Download, Upload, Settings, Maximize2, Minimize2 } from 'lucide-react';
import QlikScriptEditor from './QlikScriptEditor';

interface QlikScriptEditorLayoutProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  onRun?: () => void;
  onFormat?: () => void;
  onSave?: () => void;
  onLoad?: () => void;
  className?: string;
  showToolbar?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const QlikScriptEditorLayout: React.FC<QlikScriptEditorLayoutProps> = ({
  initialScript = '',
  variables = [],
  onScriptChange,
  onRun,
  onFormat,
  onSave,
  onLoad,
  className = '',
  showToolbar = true,
  isFullscreen = false,
  onToggleFullscreen
}) => {
  const [script, setScript] = useState(initialScript);
  const [isRunning, setIsRunning] = useState(false);

  const handleScriptChange = (value: string) => {
    setScript(value);
    onScriptChange?.(value);
  };

  const handleRun = async () => {
    if (onRun) {
      setIsRunning(true);
      try {
        await onRun();
      } finally {
        setIsRunning(false);
      }
    }
  };

  const toolbarButtons = [
    {
      icon: Play,
      label: 'Run Script',
      onClick: handleRun,
      disabled: isRunning,
      variant: 'primary' as const,
      shortcut: 'Ctrl+R'
    },
    {
      icon: Square,
      label: 'Stop',
      onClick: () => setIsRunning(false),
      disabled: !isRunning,
      variant: 'secondary' as const
    },
    {
      icon: RotateCcw,
      label: 'Format',
      onClick: onFormat,
      variant: 'secondary' as const,
      shortcut: 'Shift+Alt+F'
    },
    {
      icon: Download,
      label: 'Save',
      onClick: onSave,
      variant: 'secondary' as const,
      shortcut: 'Ctrl+S'
    },
    {
      icon: Upload,
      label: 'Load',
      onClick: onLoad,
      variant: 'secondary' as const,
      shortcut: 'Ctrl+O'
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => {},
      variant: 'secondary' as const
    }
  ];

  return (
    <div className={`flex flex-col h-full w-full bg-gray-50 dark:bg-gray-900 ${className}`}>
      {/* Header */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
              Qlik Script Editor
            </h2>
            {variables.length > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {variables.length} variables
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Script Stats */}
            <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Lines: {script.split('\n').length}</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span>Chars: {script.length}</span>
            </div>
            
            {/* Fullscreen Toggle */}
            {onToggleFullscreen && (
              <button
                onClick={onToggleFullscreen}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      {showToolbar && (
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2">
              {toolbarButtons.map((button, index) => {
                const Icon = button.icon;
                const isPrimary = button.variant === 'primary';
                
                return (
                  <button
                    key={index}
                    onClick={button.onClick}
                    disabled={button.disabled}
                    className={`
                      inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isPrimary
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md disabled:bg-blue-300 disabled:cursor-not-allowed'
                        : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
                      }
                      ${button.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                    `}
                    title={`${button.label} ${button.shortcut ? `(${button.shortcut})` : ''}`}
                  >
                    <Icon className={`h-4 w-4 ${button.label && !button.disabled ? 'sm:mr-2' : ''} ${isRunning && button.icon === Play ? 'animate-pulse' : ''}`} />
                    <span className="hidden sm:inline">{button.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Status indicator */}
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-600'}`} />
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
                {isRunning ? 'Running...' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Editor Container */}
      <div className="flex-1 flex flex-col min-h-0 p-4 sm:p-6">
        <div className="flex-1 flex flex-col min-h-0 max-w-full mx-auto w-full">
          {/* Editor Wrapper with smooth transitions */}
          <div className="flex-1 min-h-0 group">
            <div className="
              h-full w-full 
              border border-gray-300 dark:border-gray-600 
              rounded-xl 
              overflow-hidden 
              shadow-sm hover:shadow-lg 
              transition-all duration-300 ease-in-out
              group-hover:border-blue-400 dark:group-hover:border-blue-500
              bg-white dark:bg-gray-900
              ring-1 ring-gray-200 dark:ring-gray-700
              hover:ring-2 hover:ring-blue-500/20 dark:hover:ring-blue-400/20
            ">
              {/* Editor Header Bar */}
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 ml-2">
                    script.qvs
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="hidden md:inline">Qlik Sense Script</span>
                  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">
                    qlik
                  </span>
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="h-[calc(100%-3rem)] w-full">
                <QlikScriptEditor
                  initialScript={initialScript}
                  onChange={handleScriptChange}
                  variables={variables}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 sm:px-6">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Ln {script.split('\n').length}, Col 1</span>
            <span>UTF-8</span>
            <span>Qlik Script</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">Ctrl+Space for suggestions</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Ctrl+/ for comments</span>
            <div className={`flex items-center space-x-1 ${isRunning ? 'text-green-600' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span>{isRunning ? 'Running' : 'Ready'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QlikScriptEditorLayout;