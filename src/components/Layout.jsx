import { Outlet } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import frauncesUrl from '@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2?url'
import interUrl from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ScrollManager } from '@/components/ScrollManager'

export function Layout() {
  return (
    <>
      <Head>
        <link rel="preload" href={frauncesUrl} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={interUrl} as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ScrollManager />
    </>
  )
}
