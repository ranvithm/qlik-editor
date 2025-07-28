import React, { useState } from 'react';
import QlikScriptEditor from './QlikScriptEditor';

interface SimpleQlikEditorProps {
  initialScript?: string;
  variables?: string[];
  onScriptChange?: (script: string) => void;
  className?: string;
}

const SimpleQlikEditor: React.FC<SimpleQlikEditorProps> = ({
  initialScript = '',
  variables = [],
  onScriptChange,
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
      <div className="flex-shrink-0 px-4 py-4 sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Qlik Script Editor
        </h1>
      </div>

      {/* Optional Toolbar Space */}
      <div className="flex-shrink-0 px-4 pb-4 sm:px-6">
        <div className="flex items-center space-x-3">
          {/* Placeholder for future toolbar buttons */}
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Run
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200">
            Format
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200">
            Save
          </button>
        </div>
      </div>

      {/* Main Editor Panel - Full Height, Scrollable */}
      <div className="flex-1 flex flex-col min-h-0 px-4 pb-4 sm:px-6 sm:pb-6">
        {/* Editor Container with Border, Rounded Corners, Smooth Transitions */}
        <div className="
          flex-1 
          min-h-0 
          border 
          border-gray-300 
          rounded-xl 
          shadow-sm 
          hover:shadow-lg 
          hover:border-blue-400 
          transition-all 
          duration-300 
          ease-in-out 
          bg-white 
          overflow-hidden
        ">
          {/* Monaco Editor - Responsive and Full Height */}
          <div className="h-full w-full">
            <QlikScriptEditor
              initialScript={initialScript}
              onChange={handleScriptChange}
              variables={variables}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleQlikEditor;