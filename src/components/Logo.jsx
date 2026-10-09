import { Link } from 'react-router-dom'

export function Logo({ light = false }) {
  return (
    <Link to="/" className={light ? 'brand brand--light' : 'brand'} aria-label="CompTeq Digital, home">
      <img
        src={light ? '/logo-light.svg' : '/logo.svg'}
        alt="CompTeq Digital"
        width="233"
        height="54"
        decoding="async"
      />
    </Link>
  )
}
