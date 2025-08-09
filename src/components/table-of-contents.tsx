'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('.prose h2, .prose h3, .prose h4')
    )

    const items: TocItem[] = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1))
    }))

    setTocItems(items)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66% 0px'
      }
    )

    headingElements.forEach((element) => {
      if (element.id) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className={cn("sticky top-24 h-fit bg-white dark:bg-slate-950", className)}>
      <div className="mb-8">
        <h4 className="text-xs font-bold tracking-widest uppercase text-slate-600 dark:text-slate-400 pb-3 border-b border-slate-200 dark:border-slate-800">On this page</h4>
      </div>
      <div className="max-h-[calc(100vh-12rem)] w-full">
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={cn(
                "block w-full text-left text-sm transition-all duration-200 rounded-lg py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-800 h-auto font-normal",
                item.level === 2 && "ml-0",
                item.level === 3 && "ml-4",
                item.level === 4 && "ml-8",
                activeId === item.id
                  ? "text-slate-900 dark:text-white font-medium bg-slate-100 dark:bg-slate-800 border-l-3 border-slate-900 dark:border-white pl-2"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}