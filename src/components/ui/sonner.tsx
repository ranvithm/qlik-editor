import * as React from "react"
import { cn } from "../../lib/utils"

interface ToasterProps {
  className?: string
}

// Simple toast implementation since we don't have sonner installed
const Toaster: React.FC<ToasterProps> = ({ className }) => {
  return <div className={cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:right-0 sm:flex-col md:max-w-[420px]", className)} />
}

export { Toaster }