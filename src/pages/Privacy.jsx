import { Seo } from '@/components/Seo'
import { SITE } from '@/lib/site'
import { DocPage } from '@/components/DocPage'

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy | CompTeq Digital"
        description="How CompTeq Digital handles personal data on compteqdigital.com: what we collect, why, and your rights."
        path="/privacy/"
      />
      <DocPage title="Privacy Policy" updated="October 9, 2026">
        <p>
          This policy explains what personal data CompTeq Digital collects through compteqdigital.com, why, and
          what rights you have.
        </p>

        <h2>Who we are</h2>
        <p>
          CompTeq Digital, {SITE.street}, {SITE.city}, {SITE.region} {SITE.postalCode}, United States. Contact:{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <h2>What we collect</h2>
        <h3>Contact form and email</h3>
        <p>
          If you write to us, we receive your name, email address and the message you choose to send. The contact
          form sends those details over HTTPS to Web3Forms (web3forms.com), which delivers them to us by email.
          Web3Forms processes the submission in order to deliver that message. You can also email us directly.
          We do not add you to a mailing list.
        </p>
        <h3>Server logs</h3>
        <p>
          Our hosting provider processes technical data such as IP address, browser type and requested pages in
          server logs, for security and reliability purposes.
        </p>
        <h3>Cookies and tracking</h3>
        <p>
          This website does not use cookies, advertising trackers or analytics tools. Fonts are hosted on our own
          domain, so your browser does not contact third-party font services.
        </p>

        <h2>Why we use your data</h2>
        <p>
          We use the information you send us only to answer your enquiry and, if you become a client, to prepare
          and perform our services. The legal basis is our legitimate interest in responding to business enquiries
          and, where applicable, steps taken at your request before entering into a contract.
        </p>

        <h2>Retention and sharing</h2>
        <p>
          We keep enquiry emails for as long as needed to handle your request and for a reasonable period after
          that, then delete them. We do not sell personal data. We share it only with service providers that help
          us run our business (for example email and hosting providers), under appropriate safeguards.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access, correct, delete or export your personal
          data, to object to or restrict its processing, and to lodge a complaint with a supervisory authority. To
          exercise these rights, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <h2>Changes</h2>
        <p>We may update this policy. The date of the latest revision is shown at the top of this page.</p>
      </DocPage>
    </>
  )
}
