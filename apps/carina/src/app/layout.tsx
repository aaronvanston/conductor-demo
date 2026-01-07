import type { Metadata } from "next"
import { Source_Serif_4 } from "next/font/google"
import { ThemeProvider } from "@repo/ui/theme-provider"
import { WorkingBranchIndicator } from "@repo/ui/working-branch-indicator"
import "./globals.css"

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Carina",
  description: "Conductor Demo - Carina App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sourceSerif.variable} font-serif antialiased`}>
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
