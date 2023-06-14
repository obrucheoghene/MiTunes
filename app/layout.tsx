import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Figtree } from 'next/font/google'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import { APP_NAME } from '@/libs/configs'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: APP_NAME,
  description: 'Stream and share music, podcast, stories and other audio content',
}

export const revalidate = 0 //prevent caching

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
          <UserProvider>
            <ModalProvider/>
            <Sidebar >
              {children}
            </Sidebar>
            <Player/>
          </UserProvider>
      </body>
    </html>
  )
}
