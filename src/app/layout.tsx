import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JoJo Voice Chat',
  description: 'A modern voice-enabled AI chat application built with Next.js and Claude AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
} 