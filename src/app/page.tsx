import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, FileText, Zap, Shield, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="relative">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-20 pb-16 text-center lg:pt-32">
              <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex justify-center">
                  <Badge className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1.5">
                    <span className="text-sm font-medium">
                      {process.env.NEXT_PUBLIC_VERSION || "v2.0.0"} - Latest
                      Release
                    </span>
                  </Badge>
                </div>
                <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-7xl fade-in">
                  QlikScript
                  <span className="relative whitespace-nowrap">
                    <span className="relative text-blue-600">
                      {" "}
                      Studio{" "}
                    </span>
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 fade-in">
                  Professional script editor for Qlik Sense and QlikView development. 
                  Advanced syntax highlighting, intelligent auto-completion, real-time error detection, 
                  and interactive playground for seamless development workflows.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 fade-in">
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                    asChild
                  >
                    <Link href="/docs">
                      Get started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                    asChild
                  >
                    <Link href="/examples">View examples</Link>
                  </Button>
                </div>

                <div className="mt-12 fade-in">
                  <div className="mx-auto max-w-lg">
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-900 p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 font-medium">
                        Install via npm
                      </p>
                      <div className="flex items-center justify-between rounded bg-slate-900 dark:bg-slate-800 px-4 py-3">
                        <code className="text-sm text-slate-100 dark:text-slate-200 font-mono">
                          npm install qlikscript-studio
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything you need for Qlik development
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Professional development tools designed to enhance your Qlik scripting
              workflow and productivity
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Syntax Highlighting
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Full Qlik script syntax highlighting with support for
                  functions, variables, and expressions.
                </p>
              </div>

              <div className="group relative rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <Zap className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Auto-completion
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Intelligent code completion for Qlik functions, field names,
                  and commonly used patterns.
                </p>
              </div>

              <div className="group relative rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Error Detection
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Real-time error detection and validation to catch issues
                  before execution.
                </p>
              </div>

              <div className="group relative rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Code Formatting
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Automatic code formatting and indentation for better
                  readability and consistency.
                </p>
              </div>

              <div className="group relative rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Team Collaboration
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Built-in features for code sharing, commenting, and
                  collaborative development.
                </p>
              </div>

              <div className="group relative rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="h-8 w-8 bg-slate-900 dark:bg-white rounded-md flex items-center justify-center">
                    <span className="text-white dark:text-slate-900 font-bold text-sm">
                      Q
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Qlik Integration
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Seamless integration with Qlik Sense and QlikView environments
                  for smooth development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Get started in minutes
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Install QlikScript Studio and start building better Qlik
                applications with professional development tools
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-8 ring-1 ring-slate-200 dark:ring-slate-800">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Installation
                  </h3>
                  <div className="rounded-lg bg-slate-900 dark:bg-slate-800 p-4">
                    <pre className="text-sm text-slate-100 dark:text-slate-200">
                      <code>{`npm install qlikscript-studio
# or
yarn add qlikscript-studio`}</code>
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Basic Usage
                  </h3>
                  <div className="rounded-lg bg-slate-900 dark:bg-slate-800 p-4">
                    <pre className="text-sm text-slate-100 dark:text-slate-200">
                      <code>{`import QlikScriptEditor from 'qlikscript-studio';

<QlikScriptEditor />`}</code>
                    </pre>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                  asChild
                >
                  <Link href="/docs">
                    View full documentation{" "}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to enhance your Qlik development?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Join thousands of developers using QlikScript Studio to build
              better Qlik applications with enhanced productivity.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100"
                asChild
              >
                <Link href="/docs">Read documentation</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 text-white hover:bg-slate-800"
                asChild
              >
                <Link href="/try-it">Try It Live</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
