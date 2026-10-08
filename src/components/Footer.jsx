import { Link } from 'react-router-dom'
import { SITE } from '@/lib/site'
import { Logo } from '@/components/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__cols">
          <div>
            <Logo light />
            <p className="site-footer__tag">
              Custom SaaS, automation, data products and digital tools for growing businesses.
            </p>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              <li><Link to="/#services">Custom SaaS</Link></li>
              <li><Link to="/#services">Process automation</Link></li>
              <li><Link to="/#services">Data &amp; BI</Link></li>
              <li><Link to="/#services">Digital products</Link></li>
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li><Link to="/#process">Process</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
              <li><Link to="/privacy/">Privacy Policy</Link></li>
              <li><Link to="/legal/">Legal Notice</Link></li>
            </ul>
          </div>
          <div>
            <h2>Talk to us</h2>
            <ul>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
            </ul>
          </div>
        </div>
        <div className="site-footer__legal">
          <span>&copy; {year} CompTeq Digital. All rights reserved.</span>
          <span>St. Petersburg, Florida</span>
        </div>
      </div>
    </footer>
  )
}
