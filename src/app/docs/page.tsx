import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Zap, Settings } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 id="introduction" className="scroll-m-20 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Introduction</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mt-6 leading-8 max-w-3xl">
          Welcome to the qlik-script-editor documentation. Get started with powerful Qlik script editing capabilities designed for modern development workflows.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 not-prose">
        <div className="group relative rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-md transition-all duration-200">
          <div className="mb-6">
            <Download className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Installation</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-6">
            Get qlik-script-editor up and running in your project with our comprehensive installation guide.
          </p>
          <Button asChild variant="outline" size="sm" className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Link href="/docs/installation">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="group relative rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-md transition-all duration-200">
          <div className="mb-6">
            <Zap className="h-8 w-8 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Quick Start</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-6">
            Jump right in with a basic example and learn the key concepts to get productive quickly.
          </p>
          <Button asChild variant="outline" size="sm" className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Link href="/docs/quick-start">
              Start Coding <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="group relative rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-md transition-all duration-200">
          <div className="mb-6">
            <Settings className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Configuration</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-6">
            Customize the editor to fit your development workflow and team preferences.
          </p>
          <Button asChild variant="outline" size="sm" className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Link href="/docs/configuration">
              Configure <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <h2 id="what-is-qlik-script-editor" className="scroll-m-20 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">What is qlik-script-editor?</h2>
        <div className="space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-300 max-w-4xl">
          <p>
            qlik-script-editor is a powerful, feature-rich script editor specifically designed for Qlik Sense and QlikView development. 
            It provides developers with enhanced syntax highlighting, intelligent auto-completion, real-time error detection, and seamless integration capabilities.
          </p>
          <p>
            Whether you're building complex data transformations, creating advanced visualizations, or developing enterprise-scale Qlik applications, 
            qlik-script-editor streamlines your development process and helps you write better, more maintainable code.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <h2 id="key-features" className="scroll-m-20 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Key Features</h2>
        <div className="grid gap-8 md:grid-cols-2 not-prose">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="text-2xl">🎨</span> Syntax Highlighting
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-7">
              Full Qlik script syntax highlighting with support for functions, variables, expressions, and more. Enhanced readability with intelligent color coding.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="text-2xl">⚡</span> Auto-completion
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-7">
              Intelligent code completion for Qlik functions, field names, and commonly used patterns. Boost productivity with context-aware suggestions.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="text-2xl">🛡️</span> Error Detection
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-7">
              Real-time error detection and validation to catch issues before execution. Comprehensive diagnostic messages guide you to quick fixes.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="text-2xl">🔧</span> Customizable
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-7">
              Extensive configuration options to tailor the editor to your specific needs. Adapt to your workflow and team conventions.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-10 ring-1 ring-slate-200 dark:ring-slate-800 not-prose">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to get started?</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-7 max-w-2xl">
          Follow our installation guide to add qlik-script-editor to your project in just a few minutes and start building better Qlik applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100">
            <Link href="/docs/installation">Installation Guide</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Link href="/examples">View Examples</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}