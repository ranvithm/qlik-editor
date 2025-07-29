"use client"

import type React from "react"
import { Maximize2, Minimize2, Code2 } from "lucide-react"
import { Button } from "./button"
import { Badge } from "./badge"
import { designTokens, a11y } from "./design-system"
import { cn } from "../../lib/utils"

interface HeaderProps {
  title?: string
  subtitle?: string
  variablesCount?: number
  scriptStats?: {
    lines: number
    characters: number
  }
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
  className?: string
}

const Header: React.FC<HeaderProps> = ({
  title = "Qlik Script Editor",
  variablesCount = 0,
  scriptStats,
  isFullscreen = false,
  onToggleFullscreen,
  className,
}) => {
  return (
    <header
      className={cn(
        "flex items-center justify-between h-14 px-6",
        designTokens.colors.bg.glass,
        "border-b border-border/30",
        "supports-[backdrop-filter]:bg-background/60",
        className,
      )}
      role="banner"
    >
      {/* Left - Title */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10">
          <Code2 className="h-4 w-4 text-primary" />
        </div>

        <div className="flex items-center space-x-4">
          <h1 className={cn(designTokens.typography.heading.secondary, "text-foreground")}>{title}</h1>

          {variablesCount > 0 && (
            <Badge variant="secondary" className="h-5 px-2 text-xs font-medium">
              {variablesCount} vars
            </Badge>
          )}
        </div>
      </div>

      {/* Right - Stats & Controls */}
      <div className="flex items-center space-x-4">
        {scriptStats && (
          <div className="hidden md:flex items-center space-x-3 text-xs text-muted-foreground">
            <span>{scriptStats.lines.toLocaleString()} lines</span>
            <span>•</span>
            <span>{scriptStats.characters.toLocaleString()} chars</span>
          </div>
        )}

        {onToggleFullscreen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFullscreen}
            className={cn("h-7 w-7 p-0", a11y.focusRing)}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
