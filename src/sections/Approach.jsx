const PRINCIPLES = [
  ['Clear scope', 'We agree on what gets built, in what order and why, before a line of code is written.'],
  ['You own the result', 'Source code, documentation and infrastructure are handed over in a form your team can run.'],
  ['Secure by default', 'Authentication, least-privilege access and sensible defaults are part of every build.'],
]

const STACK = ['REST & GraphQL APIs', 'Webhooks', 'SQL databases', 'CRM platforms', 'Identity & payments', 'Your own API']

export function Approach() {
  return (
    <section id="approach" className="section approach" aria-labelledby="approach-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="sec-num">03 &mdash; Approach</p>
          <div>
            <h2 className="title" id="approach-title">
              How we work, <em>in plain terms</em>.
            </h2>
          </div>
        </div>
        <div className="principles">
          {PRINCIPLES.map(([title, text]) => (
            <div className="principle" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="integ">
          <h3>Works with your stack</h3>
          <ul>
            {STACK.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
