import React from 'react';
import { designTokens, componentVariants, a11y, combineClasses } from './design-system';
import { cn } from '../../lib/utils';

interface EditorHeaderProps {
  filename?: string;
  language?: string;
  showControls?: boolean;
}

interface EditorContainerProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  headerProps?: EditorHeaderProps;
  fullHeight?: boolean;
  interactive?: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  filename = "script.qvs",
  language = "qlik",
  showControls = true
}) => {
  return (
    <div className={cn(
      designTokens.colors.bg.tertiary,
      designTokens.colors.border.primary,
      "px-4 py-2 border-b flex items-center justify-between"
    )}>
      <div className="flex items-center space-x-2">
        {/* Window Controls */}
        {showControls && (
          <div className="flex space-x-1" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        )}
        
        <span className={cn(
          designTokens.typography.body.primary,
          designTokens.colors.text.secondary,
          "font-medium ml-2"
        )}>
          {filename}
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className={cn(
          designTokens.typography.body.secondary,
          designTokens.colors.text.muted,
          "hidden md:inline"
        )}>
          Qlik Sense Script
        </span>
        <span className={cn(
          componentVariants.badge.default,
          "font-mono"
        )}>
          {language}
        </span>
      </div>
    </div>
  );
};

const EditorContainer: React.FC<EditorContainerProps> = ({
  children,
  className,
  showHeader = true,
  headerProps = {},
  fullHeight = true,
  interactive = true
}) => {
  const containerClasses = cn(
    componentVariants.panel.editor,
    fullHeight ? "flex-1 min-h-0" : "h-96",
    interactive ? "group" : "",
    className
  );

  const wrapperClasses = cn(
    "h-full w-full",
    designTokens.colors.bg.editor,
    "overflow-hidden",
    showHeader ? "" : designTokens.radius.lg
  );

  const editorClasses = cn(
    "w-full",
    showHeader ? "h-[calc(100%-3rem)]" : "h-full"
  );

  return (
    <div 
      className={containerClasses}
      role="region"
      aria-label="Code editor"
    >
      <div className={wrapperClasses}>
        {showHeader && <EditorHeader {...headerProps} />}
        
        <div 
          className={editorClasses}
          aria-label="Monaco editor content"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default EditorContainer;