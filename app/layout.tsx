import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const roboto_mono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '2Do App',
  description: 'Created By 2hit and 2im',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto_mono.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
