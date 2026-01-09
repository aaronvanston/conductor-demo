import { ThemeProvider } from "@repo/ui/theme-provider"
import type { Metadata, Viewport } from "next"
import { Geist_Mono } from "next/font/google"
import WorkingBranchIndicator from "./working-branch-indicator.client"
import "./globals.css"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Hydrus",
  description: "Conductor Demo - Hydrus App",
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} font-mono antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <WorkingBranchIndicator />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
