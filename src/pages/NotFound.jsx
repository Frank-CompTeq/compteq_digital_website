import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | CompTeq Digital" description="This page does not exist." path="/404/" noindex />
      <section className="doc">
        <div className="wrap wrap--narrow">
          <p className="eyebrow">Error 404</p>
          <h1 className="doc__title">This page could not be found.</h1>
          <p className="doc__meta">The address may be mistyped, or the page may have moved.</p>
          <Button asChild>
            <Link to="/">Back to the home page</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
