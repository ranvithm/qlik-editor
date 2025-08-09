import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation, Footer } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QlikScript Studio - Professional Qlik Development",
  description: "Advanced script editor for Qlik Sense and QlikView development. Features syntax highlighting, intelligent auto-completion, real-time error detection, and interactive playground.",
  keywords: "Qlik, QlikView, Qlik Sense, Script Editor, Data Visualization, Business Intelligence, Development Tools",
  authors: [{ name: "Ranjithkumar M", url: "https://ranjithm.in" }],
  creator: "QlikScript Studio",
  publisher: "QlikScript Studio",
  applicationName: "QlikScript Studio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" }
    ],
    apple: "/apple-touch-icon.svg",
    shortcut: "/favicon.svg"
  },
  openGraph: {
    title: "QlikScript Studio - Professional Qlik Development",
    description: "Advanced script editor for Qlik Sense and QlikView development with syntax highlighting and interactive playground.",
    type: "website",
    locale: "en_US",
    siteName: "QlikScript Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "QlikScript Studio - Professional Qlik Development",
    description: "Advanced script editor for Qlik Sense and QlikView development with syntax highlighting and interactive playground.",
    creator: "@qlikscriptstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
