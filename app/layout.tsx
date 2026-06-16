import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MegaWin - Live Betting Odds',
  description: 'Compare odds and find the best value at MegaWin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100">{children}</body>
    </html>
  )
}
