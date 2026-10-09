import { Link } from 'react-router-dom'
import { SITE } from '@/lib/site'
import { Seo } from '@/components/Seo'
import { PostCard } from '@/components/blog/PostCard'
import { Button } from '@/components/ui/button'
import { blogListPath, breadcrumbLd, formatDate, postPath, relatedPosts } from '@/lib/blog'

export default function BlogPost({ post, content }) {
  const url = `${SITE.url}${postPath(post.slug)}`
  const related = relatedPosts(post)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        image: [`${SITE.url}${post.ogImage}`],
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: 'en',
        articleSection: post.category,
        keywords: post.tags.length ? post.tags.join(', ') : undefined,
        author: {
          '@type': post.authorType === 'person' ? 'Person' : 'Organization',
          name: post.author,
          url: post.authorType === 'person' ? undefined : `${SITE.url}/`,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE.name,
          url: `${SITE.url}/`,
          logo: { '@type': 'ImageObject', url: `${SITE.url}/logo-512.png`, width: 512, height: 512 },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      },
      breadcrumbLd([
        { name: 'Home', url: `${SITE.url}/` },
        { name: 'Blog', url: `${SITE.url}/blog/` },
        { name: post.title, url },
      ]),
    ],
  }

  return (
    <>
      <Seo
        title={`${post.title} | CompTeq Digital`}
        description={post.description}
        path={postPath(post.slug)}
        type="article"
        image={post.ogImage}
        imageAlt={post.imageAlt}
        article={{ published: post.date, modified: post.updated, section: post.category, tags: post.tags }}
      >
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Seo>

      <article className="post">
        <header className="post-head">
          <div className="wrap wrap--narrow">
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blog/">Blog</Link></li>
                <li><span aria-current="page">{post.category}</span></li>
              </ol>
            </nav>
            <p className="eyebrow">
              <Link to={blogListPath(post.categorySlug)}>{post.category}</Link>
            </p>
            <h1 className="post-title">{post.title}</h1>
            <p className="lede">{post.description}</p>
            <p className="post-meta">
              <span>By {post.author}</span>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime} min read</span>
            </p>
          </div>
        </header>

        <div className="wrap post-cover">
          <img src={post.image} alt="" width="1200" height="630" decoding="async" fetchPriority="high" />
        </div>

        <div className="wrap post-layout">
          {content.toc.length > 0 && (
            <aside className="toc" aria-labelledby="toc-title">
              <h2 id="toc-title" className="toc__title">On this page</h2>
              <ol>
                {content.toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? 'toc__sub' : undefined}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
          <div className="prose" dangerouslySetInnerHTML={{ __html: content.html }} />
        </div>

        <div className="wrap wrap--narrow">
          <aside className="post-about" aria-label="About the author">
            <p className="post-about__name">{post.author}</p>
            <p>
              CompTeq Digital designs and builds custom SaaS, process automation, data products and digital tools
              for growing businesses from St. Petersburg, Florida.{' '}
              <Link to="/#contact">Talk to us about your project.</Link>
            </p>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="related" aria-labelledby="related-title">
          <div className="wrap">
            <h2 className="title" id="related-title">Keep reading</h2>
            <div className="post-grid">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="blog-cta">
        <div className="wrap blog-cta__inner">
          <p className="title">Have a product or process in mind?</p>
          <Button asChild variant="onDark">
            <Link to="/#contact">Start a project</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
