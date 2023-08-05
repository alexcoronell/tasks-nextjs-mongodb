import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tasks NextJS MongoDB',
  description: 'Admin Tasks Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='container mx-auto px-5 mt-4'>
          {children}
        </main>
      </body>
    </html>
  )
}
