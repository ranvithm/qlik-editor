'use client'

import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({ 
  code, 
  language = 'typescript', 
  title, 
  showLineNumbers = false,
  className 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { resolvedTheme } = useTheme()

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const theme = resolvedTheme === 'dark' ? themes.okaidia : themes.oceanicNext

  return (
    <div className={cn("relative group not-prose", className)}>
      {title && (
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 rounded-t-xl">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600" />
            ) : (
              <Copy className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            )}
          </Button>
        </div>
      )}
      <div className="relative">
        <Highlight theme={theme} code={code} language={language}>
          {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre 
              className={cn(
                "overflow-x-auto p-6 text-sm leading-7 font-mono",
                title ? "rounded-b-xl" : "rounded-xl",
                "bg-slate-900 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm",
                highlightClassName
              )} 
              style={{
                ...style,
                backgroundColor: resolvedTheme === 'dark' ? 'rgb(2 6 23)' : 'rgb(15 23 42)',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                  {showLineNumbers && (
                    <span className="table-cell pr-4 text-slate-500 select-none w-[1%] text-right">
                      {i + 1}
                    </span>
                  )}
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        {!title && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="absolute top-4 right-4 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/10 hover:bg-white/20 border border-white/20 text-white"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

export function InlineCode({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <code className={cn(
      "relative rounded-md bg-muted px-2 py-1 font-mono text-sm font-medium text-foreground",
      className
    )}>
      {children}
    </code>
  )
}