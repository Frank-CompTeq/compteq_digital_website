import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroVisual } from '@/components/HeroVisual'

const FACTS = [
  ['Built to measure', 'Custom software shaped around your workflow, not the other way round.'],
  ['Connected by design', 'APIs, webhooks and integrations so your tools share one source of truth.'],
  ['Local, accountable team', 'Florida-based, working directly with your decision-makers.'],
]

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div>
          <p className="eyebrow">St. Petersburg, Florida &middot; SaaS &amp; digital products</p>
          <h1 id="hero-title">
            SaaS and digital products, <em>engineered</em> around your business.
          </h1>
          <p className="lede">
            CompTeq Digital designs and builds custom SaaS platforms, automates the processes that slow your
            team down, and turns scattered data into dashboards people actually use.
          </p>
          <div className="cta-row">
            <Button asChild>
              <Link to="/#contact">
                Schedule a free consultation <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Link className="link-arrow" to="/#services">
              See what we build
            </Link>
          </div>
        </div>
        <HeroVisual />
      </div>
      <div className="wrap">
        <ul className="facts">
          {FACTS.map(([title, text]) => (
            <li key={title}>
              <strong>{title}</strong>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
