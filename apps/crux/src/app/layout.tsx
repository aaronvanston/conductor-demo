import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { ThemeProvider } from "@repo/ui/theme-provider"
import { WorkingBranchIndicator } from "@repo/ui/working-branch-indicator"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Crux",
  description: "Conductor Demo - Crux App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WorkingBranchIndicator />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
