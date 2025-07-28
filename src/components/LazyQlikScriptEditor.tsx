import React, { Suspense, lazy } from 'react';

// Lazy load the QlikScriptEditor component
const QlikScriptEditor = lazy(() => import('./QlikScriptEditor'));

interface LazyQlikScriptEditorProps {
  initialScript: string;
  onChange: (value: string) => void;
  variables?: string[];
}

// Loading component for Monaco Editor
const EditorSkeleton: React.FC = () => (
  <div className="h-full w-full flex flex-col animate-pulse">
    <div className="flex-1 bg-gray-800 border border-gray-700 rounded-lg flex flex-col">
      {/* Header skeleton */}
      <div className="h-8 bg-gray-700 rounded-t-lg flex items-center px-4 space-x-2">
        <div className="h-2 bg-gray-600 rounded w-16"></div>
        <div className="h-2 bg-gray-600 rounded w-8"></div>
        <div className="flex-1"></div>
        <div className="h-2 bg-gray-600 rounded w-12"></div>
      </div>
      
      {/* Line numbers skeleton */}
      <div className="flex flex-1">
        <div className="w-12 bg-gray-750 border-r border-gray-600 p-2 space-y-1">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="h-4 bg-gray-600 rounded w-6"></div>
          ))}
        </div>
        
        {/* Content area skeleton */}
        <div className="flex-1 p-4 space-y-2">
          {Array.from({ length: 15 }, (_, i) => (
            <div 
              key={i} 
              className={`h-4 bg-gray-600 rounded ${
                i % 3 === 0 ? 'w-3/4' : i % 3 === 1 ? 'w-1/2' : 'w-5/6'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Loading text */}
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
      <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-300">Loading Monaco Editor...</span>
        </div>
      </div>
    </div>
  </div>
);

// Error boundary for lazy loading failures
class EditorErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Monaco Editor failed to load:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-gray-900 border border-gray-700 rounded-lg">
          <div className="text-center p-8">
            <div className="text-red-400 text-lg font-semibold mb-2">
              Failed to load editor
            </div>
            <div className="text-gray-400 text-sm mb-4">
              Monaco Editor could not be loaded. Please refresh the page to try again.
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const LazyQlikScriptEditor: React.FC<LazyQlikScriptEditorProps> = (props) => {
  return (
    <EditorErrorBoundary>
      <Suspense fallback={<EditorSkeleton />}>
        <QlikScriptEditor {...props} />
      </Suspense>
    </EditorErrorBoundary>
  );
};

export default LazyQlikScriptEditor;