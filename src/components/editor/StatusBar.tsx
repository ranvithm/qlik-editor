"use client"

import type React from "react"
import { Badge } from "../ui/badge"
import { designTokens } from "./design-system"
import { cn } from "../../lib/utils"

interface StatusBarProps {
  scriptStats?: {
    lines: number
    characters: number
    currentLine?: number
    currentColumn?: number
  }
  encoding?: string
  language?: string
  isRunning?: boolean
  className?: string
}

const StatusBar: React.FC<StatusBarProps> = ({
  scriptStats,
  encoding = "UTF-8",
  language = "Qlik Script",
  isRunning = false,
  className,
}) => {
  return (
    <footer
      className={cn(
        "flex items-center justify-between h-8 px-6",
        designTokens.colors.bg.glass,
        "border-t border-border/20 text-xs",
        "supports-[backdrop-filter]:bg-background/40",
        className,
      )}
      role="contentinfo"
    >
      {/* Left - Position */}
      <div className="flex items-center space-x-4 text-muted-foreground">
        {scriptStats && (
          <>
            <span>
              Ln {scriptStats.currentLine || scriptStats.lines}, Col {scriptStats.currentColumn || 1}
            </span>
            <span>•</span>
            <span>{encoding}</span>
            <span>•</span>
            <span>{language}</span>
          </>
        )}
      </div>

      {/* Right - Status */}
      <div className="flex items-center space-x-2">
        <div
          className={cn(
            "w-1.5 h-1.5 rounded-full transition-colors",
            isRunning ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/40",
          )}
        />
        <Badge variant={isRunning ? "default" : "secondary"} className="h-5 px-2 text-xs">
          {isRunning ? "Running" : "Ready"}
        </Badge>
      </div>
    </footer>
  )
}

export default StatusBar
