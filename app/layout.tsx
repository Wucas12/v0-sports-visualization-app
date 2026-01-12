import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist_Mono, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geistMono = Geist_Mono({ subsets: ["latin"] })

// Quincy font - using elegant serif (Cormorant Garamond) as Quincy alternative
// If you have Quincy font files, you can use next/font/local instead
// Place font files in public/fonts/ and use localFont from "next/font/local"
const quincy = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-quincy",
  weight: ["300", "400", "500", "600", "700"],
  fallback: ["Georgia", "serif"],
})

export const metadata: Metadata = {
  title: "Vantage - Sports Visualization & Meditation",
  description: "AI-powered visualization and meditation audio for peak athletic performance",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased ${quincy.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
