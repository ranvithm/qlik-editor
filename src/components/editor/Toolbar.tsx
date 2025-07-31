"use client"

import type React from "react"
import {
  type LucideIcon,
  Play,
  Square,
  RotateCcw,
  Download,
  Upload,
  Loader2,
  Undo2,
  Redo2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "../../lib/utils"

export interface ToolbarButton {
  icon: LucideIcon
  label: string
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary" | "ghost"
  shortcut?: string
  loading?: boolean
  group?: "primary" | "secondary" | "settings"
}

interface ToolbarProps {
  buttons?: ToolbarButton[]
  isRunning?: boolean
  onRun?: () => void
  onStop?: () => void
  onUndo?: () => void
  onRedo?: () => void
  onFormat?: () => void
  onSave?: () => void
  onLoad?: () => void
  onSettings?: () => void
  onInsertInlineData?: () => void
  className?: string
}

const defaultButtons: ToolbarButton[] = [
  {
    icon: Play,
    label: "Run",
    variant: "primary",
    shortcut: "⌘R",
    group: "primary",
  },
  {
    icon: Square,
    label: "Stop",
    variant: "ghost",
    group: "primary",
  },
  {
    icon: Undo2,
    label: "Undo",
    variant: "ghost",
    shortcut: "⌘Z",
    group: "secondary",
  },
  {
    icon: Redo2,
    label: "Redo",
    variant: "ghost",
    shortcut: "⌘Y",
    group: "secondary",
  },
  {
    icon: RotateCcw,
    label: "Format",
    variant: "ghost",
    shortcut: "⇧⌥F",
    group: "secondary",
  },
  {
    icon: Download,
    label: "Save",
    variant: "ghost",
    shortcut: "⌘S",
    group: "secondary",
  },
  {
    icon: Upload,
    label: "Load",
    variant: "ghost",
    shortcut: "⌘O",
    group: "secondary",
  },
]

const Toolbar: React.FC<ToolbarProps> = ({
  buttons = defaultButtons,
  isRunning = false,
  onRun,
  onStop,
  onUndo,
  onRedo,
  onFormat,
  onSave,
  onLoad,
  onInsertInlineData,
  className,
  
}) => {
  const getButtonProps = (button: ToolbarButton) => {
    let onClick = button.onClick
    let disabled = button.disabled

    switch (button.label) {
      case "Run":
        onClick = onRun
        disabled = disabled || isRunning
        break
      case "Stop":
        onClick = onStop
        disabled = disabled || !isRunning
        break
      case "Undo":
        onClick = onUndo
        break
      case "Redo":
        onClick = onRedo
        break
      case "Format":
        onClick = onFormat
        break
      case "Save":
        onClick = onSave
        break
      case "Load":
        onClick = onLoad
        break
      case "Insert Inline Data":
        onClick = onInsertInlineData
        break
    }

    return { ...button, onClick, disabled }
  }

  // Group buttons
  const primaryButtons = buttons.filter((b) => b.group === "primary")
  const secondaryButtons = buttons.filter((b) => b.group === "secondary")

  return (
    <div
      className={cn(
        "flex items-center h-14 px-4 border-b",
        "bg-gradient-to-r from-background via-background/95 to-background",
        "backdrop-blur-sm border-border/40",
        "shadow-sm",
        className,
      )}
      role="toolbar"
    >
      {/* Left Section - Primary Actions */}
      <div className="flex items-center space-x-1">
        {/* Run/Stop Group */}
        <div className="flex items-center bg-muted/30 rounded-lg p-1 mr-3">
          {primaryButtons.map((button, index) => {
            const buttonProps = getButtonProps(button)
            const Icon = buttonProps.icon
            const isLoading = buttonProps.loading || (isRunning && buttonProps.label === "Run")
            const isRunButton = buttonProps.label === "Run"

            return (
              <Button
                key={`${buttonProps.label}-${index}`}
                variant={isRunButton ? "default" : "ghost"}
                size="sm"
                onClick={buttonProps.onClick}
                disabled={buttonProps.disabled}
                className={cn(
                  "h-9 px-4 font-medium transition-all duration-200",
                  isRunButton && !buttonProps.disabled && "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm",
                  isRunButton && buttonProps.disabled && "bg-muted text-muted-foreground",
                  !isRunButton && "hover:bg-background/80",
                  buttonProps.disabled && "opacity-50 cursor-not-allowed",
                  !buttonProps.disabled && "hover:scale-[1.02] active:scale-[0.98]",
                )}
                title={`${buttonProps.label}${buttonProps.shortcut ? ` (${buttonProps.shortcut})` : ""}`}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Icon className="h-4 w-4 mr-2" />}
                <span className="hidden sm:inline">{buttonProps.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Edit Actions Group */}
        <div className="flex items-center space-x-1 bg-muted/20 rounded-lg p-1">
          {secondaryButtons.slice(0, 2).map((button, index) => {
            const buttonProps = getButtonProps(button)
            const Icon = buttonProps.icon

            return (
              <Button
                key={`${buttonProps.label}-${index}`}
                variant="ghost"
                size="sm"
                onClick={buttonProps.onClick}
                disabled={buttonProps.disabled}
                className={cn(
                  "h-8 w-8 p-0 hover:bg-background/60 transition-all duration-200",
                  !buttonProps.disabled && "hover:scale-105 active:scale-95",
                  buttonProps.disabled && "opacity-40",
                )}
                title={`${buttonProps.label}${buttonProps.shortcut ? ` (${buttonProps.shortcut})` : ""}`}
              >
                <Icon className="h-4 w-4" />
              </Button>
            )
          })}
        </div>

        <Separator orientation="vertical" className="h-6 mx-2 bg-border/60" />

        {/* File Actions Group */}
        <div className="flex items-center space-x-1">
          {secondaryButtons.slice(2).map((button, index) => {
            const buttonProps = getButtonProps(button)
            const Icon = buttonProps.icon

            return (
              <Button
                key={`${buttonProps.label}-${index}`}
                variant="ghost"
                size="sm"
                onClick={buttonProps.onClick}
                disabled={buttonProps.disabled}
                className={cn(
                  "h-9 px-3 font-medium hover:bg-muted/60 transition-all duration-200",
                  !buttonProps.disabled && "hover:scale-[1.02] active:scale-[0.98]",
                  buttonProps.disabled && "opacity-50",
                )}
                title={`${buttonProps.label}${buttonProps.shortcut ? ` (${buttonProps.shortcut})` : ""}`}
              >
                <Icon className="h-4 w-4 mr-2" />
                <span className="hidden md:inline text-sm">{buttonProps.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Center Section - Status Indicator */}
      <div className="flex-1 flex justify-center">
        {isRunning && (
          <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Script Running</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Toolbar
