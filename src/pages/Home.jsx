import { Head } from 'vite-react-ssg'
import { SITE } from '@/lib/site'
import { Seo } from '@/components/Seo'
import { Hero } from '@/sections/Hero'
import { Services } from '@/sections/Services'
import { Process } from '@/sections/Process'
import { Approach } from '@/sections/Approach'
import { Contact } from '@/sections/Contact'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: { '@type': 'ImageObject', url: `${SITE.url}/logo-512.png`, width: 512, height: 512 },
  image: `${SITE.url}${SITE.ogImage}`,
  description: SITE.description,
  email: SITE.email,
  telephone: '+1-407-205-9645',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.street,
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    postalCode: SITE.postalCode,
    addressCountry: SITE.country,
  },
  areaServed: 'US',
  knowsAbout: ['Custom SaaS development', 'Process automation', 'Data analytics and business intelligence', 'Digital product development'],
}

export default function Home() {
  return (
    <>
      <Seo title="CompTeq Digital | Custom SaaS, Automation & Digital Products" path="/">
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Seo>
      <Head>
        <meta name="theme-color" content="#FBF9F4" />
      </Head>
      <Hero />
      <Services />
      <Process />
      <Approach />
      <Contact />
    </>
  )
}
