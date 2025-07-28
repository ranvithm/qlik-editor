import React, { useState } from 'react';
import QlikScriptEditor from './QlikScriptEditor';

interface QlikScriptEditorWrapperProps {
  initialScript?: string;
  variables?: string[];
  className?: string;
}

const QlikScriptEditorWrapper: React.FC<QlikScriptEditorWrapperProps> = ({
  initialScript = '',
  variables = [],
  className = ''
}) => {
  const [script, setScript] = useState(initialScript);

  const handleScriptChange = (value: string) => {
    setScript(value);
  };

  return (
    <div className={`w-full h-full min-h-screen flex flex-col bg-gray-900 ${className}`}>
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold text-white sm:text-2xl">
            Qlik Script Editor
          </h1>
          <p className="text-gray-400 text-sm mt-1 hidden sm:block">
            Edit your Qlik Sense data load script with syntax highlighting and auto-completion
          </p>
        </div>
      </header>

      {/* Main Editor Area */}
      <main className="flex-1 flex flex-col min-h-0 p-2 h-full sm:p-4 lg:p-6">
        <div className="max-w-7xl flex-1 mx-auto w-full h-full flex flex-col min-h-0">
          {/* Toolbar */}
          <div className="bg-gray-800 border border-gray-700 rounded-t-lg p-2 sm:p-3 flex-shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm font-medium">Script Editor</span>
                {variables.length > 0 && (
                  <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
                    {variables.length} variables available
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span className="hidden sm:inline">Lines: {script.split('\n').length}</span>
                <span className="hidden sm:inline">|</span>
                <span>Characters: {script.length}</span>
              </div>
            </div>
          </div>

          {/* Editor Container */}
          <div className="flex-1 grid bg-gray-900 border-x border-b border-gray-700 rounded-b-lg overflow-hidden">
            <QlikScriptEditor
              initialScript={initialScript}
              onChange={handleScriptChange}
              variables={variables}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 p-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            Use Ctrl+Space for auto-completion • Ctrl+/ for comments • Ctrl+F for search
          </p>
        </div>
      </footer>
    </div>
  );
};

export default QlikScriptEditorWrapper;