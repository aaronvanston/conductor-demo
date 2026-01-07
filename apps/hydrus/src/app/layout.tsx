import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@repo/ui/theme-provider"
import { WorkingBranchIndicator } from "@repo/ui/working-branch-indicator"
import "./globals.css"

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Hydrus",
  description: "Conductor Demo - Hydrus App",
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
