import Footer from '../components/Footer'
import { GlobalContextProvider } from '../context/store';

import '../styles/globals.css';

export const metadata = {
  title: 'Search Movies',
  description: 'Bushido Challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-700 text-zinc-200">
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
        <Footer />
      </body>
    </html>
  )
}
