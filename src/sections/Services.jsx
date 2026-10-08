import { Link } from 'react-router-dom'

const SERVICES = [
  {
    numeral: 'i.',
    title: 'Custom SaaS Development',
    text: 'Bespoke, scalable and secure web applications, designed around your business model and delivered from concept to production.',
    items: ['Multi-tenant platforms and portals', 'APIs and back-office tools', 'Cloud-native, secure by default'],
    cta: 'Discuss a SaaS project',
  },
  {
    numeral: 'ii.',
    title: 'Process Automation',
    text: 'Replace repetitive manual work with reliable, AI-assisted workflows that save time, reduce errors and scale with you.',
    items: ['Workflow and approval automation', 'Document and data capture', 'System-to-system integrations'],
    cta: 'Automate a process',
  },
  {
    numeral: 'iii.',
    title: 'Data Analytics & BI',
    text: 'Custom dashboards and reports that turn scattered data into real-time, decision-ready insight.',
    items: ['Operational and executive dashboards', 'Unified data pipelines', 'KPI tracking and alerts'],
    cta: 'Plan a dashboard',
  },
  {
    numeral: 'iv.',
    title: 'Digital Products',
    text: 'From idea to first release: we shape, prototype and ship the web products your customers and teams will use every day.',
    items: ['Product discovery and prototyping', 'MVPs and first releases', 'Iteration after launch'],
    cta: 'Shape a product',
  },
]

export function Services() {
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="sec-num">01 &mdash; Services</p>
          <div>
            <h2 className="title" id="services-title">
              Four disciplines, <em>one</em> accountable team.
            </h2>
            <p>
              From first concept to production, we build the software that carries your operations and stay
              to make it better.
            </p>
          </div>
        </div>
        <div className="svc-grid">
          {SERVICES.map((service) => (
            <article className="svc" key={service.title}>
              <div className="svc__n" aria-hidden="true">{service.numeral}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="link-arrow" to="/#contact">{service.cta}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
