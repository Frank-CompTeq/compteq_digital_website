import { Link } from 'react-router-dom'
import { blogListPath } from '@/lib/blog'

export function Pagination({ category, page, total }) {
  if (total <= 1) return null
  const numbers = Array.from({ length: total }, (_, index) => index + 1)

  return (
    <nav className="pager" aria-label="Pagination">
      <ul>
        <li>
          {page > 1 ? (
            <Link to={blogListPath(category, page - 1)} rel="prev">Newer</Link>
          ) : (
            <span className="pager__off" aria-hidden="true">Newer</span>
          )}
        </li>
        {numbers.map((number) => (
          <li key={number}>
            <Link
              to={blogListPath(category, number)}
              aria-current={number === page ? 'page' : undefined}
              aria-label={`Page ${number}`}
              className={number === page ? 'pager__on' : undefined}
            >
              {number}
            </Link>
          </li>
        ))}
        <li>
          {page < total ? (
            <Link to={blogListPath(category, page + 1)} rel="next">Older</Link>
          ) : (
            <span className="pager__off" aria-hidden="true">Older</span>
          )}
        </li>
      </ul>
    </nav>
  )
}
