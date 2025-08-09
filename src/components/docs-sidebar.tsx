'use client'

import Link from 'next/link'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Book, 
  Download, 
  Settings, 
  Zap, 
  Code2, 
  Palette,
  Shield,
  Play
} from 'lucide-react'

const docsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          name: "",
          icon: Book,
        },
        {
          title: "Installation",
          href: "/docs/installation",
          name: "installation",
          icon: Download,
        },
        {
          title: "Quick Start",
          href: "/docs/quick-start",
          name: "quick-start",
          icon: Zap,
        },
      ],
    },
    {
      title: "Core Features",
      items: [
        {
          title: "Syntax Highlighting",
          href: "/docs/syntax-highlighting",
          name: "syntax-highlighting",
          icon: Palette,
        },
        {
          title: "Auto-completion",
          href: "/docs/auto-completion",
          name: "auto-completion",
          icon: Code2,
        },
        {
          title: "Error Detection",
          href: "/docs/error-detection",
          name: "error-detection",
          icon: Shield,
        },
      ],
    },
    {
      title: "Configuration",
      items: [
        {
          title: "Basic Configuration",
          href: "/docs/configuration",
          name: "configuration",
          icon: Settings,
        },
        {
          title: "Advanced Options",
          href: "/docs/advanced-configuration",
          name: "advanced-configuration",
          icon: Settings,
        },
        {
          title: "Theming",
          href: "/docs/theming",
          name: "theming",
          icon: Palette,
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          title: "Examples",
          href: "/examples",
          name: "examples",
          icon: Play,
        },
        {
          title: "Try It Live",
          href: "/try-it",
          name: "try-it",
          icon: Code2,
        }
      ],
    },
  ],
}

export function DocsSidebar() {
  const pathname = usePathname()
  const activePath = useSelectedLayoutSegment()
  console.log(`Active Path: ${activePath}`);
  
  // Check if current path is in a group to highlight the group
  const getActiveGroup = (group: typeof docsConfig.sidebarNav[0]) => {
    return group.items.some((item) => pathname === item.href || 
      (item.href !== '/docs' && pathname.startsWith(item.href)))
  }

  return (
    <div className="w-full h-full bg-white dark:bg-slate-950">
      <ScrollArea className="h-[calc(100vh-4rem)] py-8 px-6 lg:py-12">
        <div className="space-y-10">
          {docsConfig.sidebarNav.map((group, groupIndex) => {
            const isGroupActive = getActiveGroup(group)
            return (
              <div key={groupIndex} className="space-y-4">
                <h4 className={cn(
                  "text-xs font-bold tracking-widest uppercase transition-colors pb-3 border-b border-slate-200 dark:border-slate-800",
                  isGroupActive 
                    ? "text-slate-900 dark:text-white" 
                    : "text-slate-600 dark:text-slate-400"
                )}>
                  {group.title}
                </h4>
                <div className="space-y-1">
                  {group.items.map((item, itemIndex) => {
                    const Icon = item.icon
                    const isActive = activePath === item.name || pathname === item.href
                    return (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className={cn(
                          'group flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative',
                          isActive
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-100"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                      >
                        <Icon className={cn(
                          "mr-3 h-4 w-4 transition-all duration-200 shrink-0",
                          isActive 
                            ? "text-white dark:text-slate-900" 
                            : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                        )} />
                        <span className="truncate flex-1 text-left">{item.title}</span>
                        {isActive && (
                          <div className="w-1.5 h-1.5 bg-white dark:bg-slate-900 rounded-full shrink-0 ml-2" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}