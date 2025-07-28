import React, { useState } from 'react';
import { Play, RotateCcw, Save, Settings } from 'lucide-react';
import QlikScriptEditor from './QlikScriptEditor';

interface QlikEditorUIProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  showToolbar?: boolean;
  className?: string;
}

const QlikEditorUI: React.FC<QlikEditorUIProps> = ({
  initialScript = '',
  variables = [],
  onScriptChange,
  showToolbar = true,
  className = ''
}) => {
  const [script, setScript] = useState(initialScript);

  const handleScriptChange = (value: string) => {
    setScript(value);
    onScriptChange?.(value);
  };

  return (
    <div className={`flex flex-col h-full w-full bg-gray-50 ${className}`}>
      {/* Header with Label */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Qlik Script Editor
          </h1>
          <div className="text-sm text-gray-500">
            <span className="hidden sm:inline">Lines: {script.split('\n').length}</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span>Characters: {script.length}</span>
          </div>
        </div>
      </div>

      {/* Optional Toolbar */}
      {showToolbar && (
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-2 sm:px-6">
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <Play className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Run</span>
            </button>
            
            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <RotateCcw className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Format</span>
            </button>
            
            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <Save className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Save</span>
            </button>
            
            <div className="flex-1"></div>
            
            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Editor Panel */}
      <div className="flex-1 flex flex-col min-h-0 p-4 sm:p-6">
        <div className="flex-1 min-h-0 max-w-full mx-auto w-full">
          {/* Editor Container with Smooth Transitions */}
          <div className="
            h-full w-full
            border border-gray-300 
            rounded-lg 
            shadow-sm 
            hover:shadow-md 
            hover:border-blue-400
            transition-all duration-300 ease-in-out
            bg-white
            overflow-hidden
            group
          ">
            {/* Editor Header Bar (Optional) */}
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-3 text-sm font-medium text-gray-600">
                  script.qvs
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Qlik Script
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

      {/* Footer Status Bar */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-4 py-2 sm:px-6">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span>Ready</span>
            {variables.length > 0 && (
              <>
                <span>•</span>
                <span>{variables.length} variables available</span>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">Ctrl+Space for autocomplete</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Ctrl+/ for comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QlikEditorUI;