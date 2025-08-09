import { DocsSidebar } from '@/components/docs-sidebar'
import { TableOfContents } from '@/components/table-of-contents'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-8xl mx-auto">
        <div className="flex">
          {/* Fixed sidebar */}
          <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 md:sticky md:block">
            <DocsSidebar />
          </aside>
          
          {/* Main content */}
          <main className="flex-1 min-h-[calc(100vh-4rem)]">
            <div className="mx-auto max-w-7xl">
              {/* Mobile menu */}
              <div className="mb-4 flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-4 w-4" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 bg-white dark:bg-slate-950">
                    <div className="p-6">
                      <DocsSidebar />
                    </div>
                  </SheetContent>
                </Sheet>
                <h2 className="ml-3 text-sm font-medium text-slate-900 dark:text-white">Documentation</h2>
              </div>
              
              {/* Content with TOC */}
              <div className="flex gap-8">
                <div className="min-w-0 flex-1 px-4 py-12 lg:px-8 xl:pr-0 lg:py-16">
                  <div className="prose prose-slate dark:prose-invert max-w-none fade-in">
                    {children}
                  </div>
                </div>
                
                {/* Table of Contents */}
                <div className="hidden w-64 shrink-0 xl:block">
                  <div className="sticky top-24 py-12 lg:py-16">
                    <TableOfContents />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}