import { useEffect } from 'react'
import { Link, useRouteError } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'

export function RouteError() {
  const error = useRouteError()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="doc">
          <div className="wrap wrap--narrow">
            <p className="eyebrow">Error</p>
            <h1 className="doc__title">This page could not be loaded.</h1>
            <p className="doc__meta">
              Refresh the page and try again. If it keeps happening, email{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <Button asChild>
              <Link to="/">Back to the home page</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
