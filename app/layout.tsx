import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mood',
  description:
    'Discover your emotional patterns with our AI-powered journal. Create entries, receive mood analysis, and track your emotional journey with personalized insights and sentiment analysis.',
  keywords:
    'AI journal, mood tracking, emotional analysis, AI-powered journaling, sentiment analysis',
  openGraph: {
    type: 'website',
    url: 'https://mood-ai-journal-tau.vercel.app/',
    title: 'Mood',
    description:
      'Track and analyze your emotions with our AI-powered journal. Receive personalized insights with each entry.',
    images: [
      {
        url: 'https://mood-ai-journal-tau.vercel.app/seo-image.png',
        alt: 'AI-Powered Mood Journal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Mood Journal',
    description:
      'Create journal entries and let AI analyze your mood and emotions.',
    images: ['https://mood-ai-journal-tau.vercel.app/seo-image.png'],
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
