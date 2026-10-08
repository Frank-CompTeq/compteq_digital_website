const STEPS = [
  ['Discover', 'Understand the workflow', 'We map your processes, systems and goals, and agree on the outcomes that define success.'],
  ['Design', 'Shape the solution', 'Architecture, interface and integration plan, validated with you on clickable prototypes.'],
  ['Build', 'Ship in short cycles', 'Working software delivered in small increments, tested, documented and connected to your tools.'],
  ['Run', 'Measure and improve', 'Monitoring, support and iteration, reported against the targets set on day one.'],
]

export function Process() {
  return (
    <section id="process" className="section process" aria-labelledby="process-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="sec-num">02 &mdash; Process</p>
          <div>
            <h2 className="title" id="process-title">
              A method you can <em>follow</em>.
            </h2>
            <p>Four clear stages, each ending with a deliverable and a review. No surprises, no black box.</p>
          </div>
        </div>
        <ol className="steps">
          {STEPS.map(([label, title, text], index) => (
            <li className="step" key={label}>
              <div className="step__dot" aria-hidden="true">{index + 1}</div>
              <span className="step__label">{label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
