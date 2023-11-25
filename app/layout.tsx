import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/modal-provider'
import { CrispProvider } from '@/components/crisp-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ai-jarvis',
  description: 'this is jarvis that think and give result',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
  
    <html lang="en">
      <body className={inter.className}>
        <CrispProvider/>
      <ModalProvider/>
        {children}</body>
    </html>
  
    </ClerkProvider>
  )
}
