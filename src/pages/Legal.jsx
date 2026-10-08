import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SITE } from '@/lib/site'
import { DocPage } from '@/components/DocPage'

export default function Legal() {
  return (
    <>
      <Seo
        title="Legal Notice | CompTeq Digital"
        description="Legal notice for compteqdigital.com: publisher, contact details, hosting and terms of use."
        path="/legal/"
      />
      <DocPage title="Legal Notice" updated={SITE.updated}>
        <h2>Publisher</h2>
        <p>
          This website is published by CompTeq Digital, {SITE.street}, {SITE.city}, {SITE.region} {SITE.postalCode},
          United States.
        </p>
        <p>
          Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <br />
          Phone: <a href={SITE.phoneHref}>{SITE.phone}</a>
        </p>

        <h2>Hosting</h2>
        <p>
          The website is hosted by Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Cyprus.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The content of this website (texts, illustrations, graphics, logos and code) is the property of CompTeq
          Digital unless stated otherwise. Fonts are self-hosted and distributed under the SIL Open Font License.
          Reproduction without prior written permission is not allowed.
        </p>

        <h2>Liability</h2>
        <p>
          We do our best to keep the information on this website accurate and up to date, but we cannot guarantee
          that it is complete or free of errors. The information is provided for general purposes and does not
          constitute a contractual offer. Any engagement is governed by a written agreement between the parties.
        </p>

        <h2>Personal data</h2>
        <p>
          How we handle personal data is described in our <Link to="/privacy/">Privacy Policy</Link>.
        </p>
      </DocPage>
    </>
  )
}
