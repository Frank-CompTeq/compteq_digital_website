import { Link } from 'react-router-dom'

export function Logo({ light = false }) {
  return (
    <Link to="/" className={light ? 'brand brand--light' : 'brand'} aria-label="CompTeq Digital, home">
      <b>CompTeq</b>
      <span>Digital</span>
    </Link>
  )
}
