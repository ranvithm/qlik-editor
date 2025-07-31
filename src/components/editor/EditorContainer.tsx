"use client";

import type React from "react";
import { Badge } from "../ui/badge";
import { componentVariants } from "./design-system";
import { cn } from "../../lib/utils";

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
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  filename = "script.qvs",
  language = "qlik",
  showControls = true,
}) => {
  return (
    <div className="flex items-center justify-between h-10 px-4 bg-muted/20 border-b border-border/30">
      <div className="flex items-center space-x-3">
        {showControls && (
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
        )}

        <span className="text-sm font-medium text-foreground/80">{filename}</span>
      </div>

      <Badge variant="outline" className="h-5 px-2 text-xs font-mono bg-background/50">
        {language}
      </Badge>
    </div>
  )
}

const EditorContainer: React.FC<EditorContainerProps> = ({
  children,
  className,
  showHeader = true,
  headerProps = {},
}) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full w-full",
        componentVariants.panel.glass,
        "overflow-hidden",
        className
      )}
      role="region"
      aria-label="Code editor"
    >
      {showHeader && <EditorHeader {...headerProps} />}

      <div
        className={cn("flex-1 min-h-0 relative", showHeader ? "" : "h-full")}
      >
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
};

export default EditorContainer;
