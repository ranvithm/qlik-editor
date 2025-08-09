"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { Menu, X, ExternalLink, Github } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Docs", href: "/docs" },
  { name: "Try It", href: "/try-it" },
  { name: "Examples", href: "/examples" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-slate-950/60">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-100 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white dark:text-slate-900 font-bold text-sm">
                QS
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">
                QlikScript Studio
              </span>
              <Badge
                variant="secondary"
                className="text-xs hidden sm:inline-flex bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                {process.env.NEXT_PUBLIC_VERSION || "v2.0.0"}
              </Badge>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800",
                  pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              <Link
                href="https://github.com/ranvithm/qlik-editor"
                target="_blank"
                className="flex items-center space-x-2"
              >
                <Github className="h-4 w-4" />
                <span className="hidden lg:inline">GitHub</span>
              </Link>
            </Button>
            <ThemeToggle />
            <Button
              size="sm"
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
              asChild
            >
              <Link href="/docs">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-600 dark:text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                    pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href))
                      ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link
                  href="https://github.com/ranvithm/qlik-editor"
                  target="_blank"
                  className="flex items-center space-x-2"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Link>
              </Button>
              <Button
                size="sm"
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                asChild
              >
                <Link href="/docs">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-100 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white dark:text-slate-900 font-bold text-sm">
                  QS
                </span>
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">
                QlikScript Studio
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-md">
              Professional script editor designed for Qlik Sense and QlikView development. 
              Features advanced syntax highlighting, intelligent auto-completion, real-time error detection, 
              and interactive playground for seamless development.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/ranvithm/qlik-editor"
                className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </Link>
              <Link
                href="https://npmjs.com/package/qlik-script-editor"
                className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>NPM</span>
              </Link>
            </div>
          </div>

          {/* Documentation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Documentation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/docs"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Getting Started
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/installation"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Installation
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/quick-start"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Quick Start
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/configuration"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Configuration
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* API & Examples */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Interactive & Examples
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/try-it"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Try It Live
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/examples"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Examples
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/syntax-highlighting"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Syntax Highlighting
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/auto-completion"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Auto-completion
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="https://github.com/ranvithm/qlik-editor/issues"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Issues
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/ranvithm/qlik-editor/discussions"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Discussions
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/ranvithm/qlik-editor/blob/main/LICENSE"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    License
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
              <p>&copy; 2024 QlikScript Studio. All rights reserved.</p>
              <span className="hidden md:block">•</span>
              <p className="hidden md:block">
                Built with Next.js, ShadCN UI, and ❤️
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <span>Version</span>
              <Badge
                variant="secondary"
                className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {process.env.NEXT_PUBLIC_VERSION || "v2.0.0"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
