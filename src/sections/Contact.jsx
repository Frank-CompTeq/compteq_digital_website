import { SITE } from '@/lib/site'
import { ContactForm } from '@/components/ContactForm'

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap contact__grid">
        <div>
          <p className="sec-num sec-num--solo">04 &mdash; Contact</p>
          <h2 className="title" id="contact-title">
            Let&rsquo;s build the next version of your business, <em>together.</em>
          </h2>
          <dl className="contact__list">
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a href={SITE.phoneHref}>{SITE.phone}</a></dd>
            </div>
            <div>
              <dt>Studio</dt>
              <dd>
                {SITE.street}
                <br />
                {SITE.city}, {SITE.region} {SITE.postalCode}
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
