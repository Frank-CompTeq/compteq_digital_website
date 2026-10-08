export function DocPage({ title, updated, children }) {
  return (
    <article className="doc">
      <div className="wrap wrap--narrow">
        <p className="eyebrow">Legal</p>
        <h1 className="doc__title">{title}</h1>
        <p className="doc__meta">Last updated: {updated}</p>
        <div className="doc__body">{children}</div>
      </div>
    </article>
  )
}
