"use client"

import type React from "react"
import {
  type LucideIcon,
  Play,
  Square,
  RotateCcw,
  Download,
  Upload,
  Settings,
  Loader2,
  Undo2,
  Redo2,
} from "lucide-react"
import { Button } from "./button"
import { Separator } from "./separator"
import { designTokens } from "./design-system"
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
  {
    icon: Settings,
    label: "Settings",
    variant: "ghost",
    group: "settings",
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
  onSettings,
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
      case "Settings":
        onClick = onSettings
        break
    }

    return { ...button, onClick, disabled }
  }

  // Group buttons
  const primaryButtons = buttons.filter((b) => b.group === "primary")
  const secondaryButtons = buttons.filter((b) => b.group === "secondary")
  const settingsButtons = buttons.filter((b) => b.group === "settings")

  const renderButton = (button: ToolbarButton, index: number) => {
    const buttonProps = getButtonProps(button)
    const Icon = buttonProps.icon
    const isLoading = buttonProps.loading || (isRunning && buttonProps.label === "Run")

    return (
      <Button
        key={`${buttonProps.label}-${index}`}
        variant={buttonProps.variant as any}
        size="sm"
        onClick={buttonProps.onClick}
        disabled={buttonProps.disabled}
        className={cn(
          "h-8 px-3 font-medium",
          buttonProps.disabled && "opacity-50",
          !buttonProps.disabled && "hover:scale-[1.02] active:scale-[0.98]",
          designTokens.transitions.fast,
        )}
        title={`${buttonProps.label}${buttonProps.shortcut ? ` (${buttonProps.shortcut})` : ""}`}
      >
        {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Icon className="h-3.5 w-3.5" />}
        <span className="ml-2 hidden sm:inline">{buttonProps.label}</span>
      </Button>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between h-12 px-6",
        designTokens.colors.bg.glass,
        "border-b border-border/20",
        "supports-[backdrop-filter]:bg-background/40",
        className,
      )}
      role="toolbar"
    >
      <div className="flex items-center space-x-1">
        {/* Primary Actions */}
        <div className="flex items-center space-x-1">{primaryButtons.map(renderButton)}</div>

        {secondaryButtons.length > 0 && (
          <>
            <Separator orientation="vertical" className="h-5 mx-2" />
            <div className="flex items-center space-x-1">{secondaryButtons.map(renderButton)}</div>
          </>
        )}
      </div>

      {/* Settings */}
      {settingsButtons.length > 0 && <div className="flex items-center">{settingsButtons.map(renderButton)}</div>}
    </div>
  )
}

export default Toolbar
