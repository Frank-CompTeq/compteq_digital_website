import { Link } from 'react-router-dom'
import { blogListPath, formatDate, postPath } from '@/lib/blog'

export function PostCard({ post, headingLevel = 'h2' }) {
  const Heading = headingLevel

  return (
    <article className="post-card">
      <div className="post-card__media" aria-hidden="true">
        <img src={post.image} alt="" width="1200" height="630" loading="lazy" decoding="async" />
      </div>
      <div className="post-card__body">
        <p className="post-card__meta">
          <Link to={blogListPath(post.categorySlug)} className="post-card__cat">{post.category}</Link>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime} min read</span>
        </p>
        <Heading className="post-card__title">
          <Link to={postPath(post.slug)}>{post.title}</Link>
        </Heading>
        <p className="post-card__desc">{post.description}</p>
        <p className="post-card__date">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </div>
    </article>
  )
}
