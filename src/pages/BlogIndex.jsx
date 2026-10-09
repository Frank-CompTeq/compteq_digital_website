import { Link } from 'react-router-dom'
import { Rss } from 'lucide-react'
import { SITE } from '@/lib/site'
import { Seo } from '@/components/Seo'
import { PostCard } from '@/components/blog/PostCard'
import { Pagination } from '@/components/blog/Pagination'
import { Button } from '@/components/ui/button'
import { blogListPath, breadcrumbLd, categories, pageCount, pagePosts, postPath, posts as allPosts } from '@/lib/blog'

export default function BlogIndex({ category: categorySlug, page = 1 }) {
  const category = categories.find((item) => item.slug === categorySlug)
  const total = pageCount(categorySlug)
  const list = pagePosts(categorySlug, page)
  const path = blogListPath(categorySlug, page)

  const name = category ? category.name : 'Blog'
  const suffix = page > 1 ? ` (Page ${page})` : ''
  const title = category
    ? `${category.name} articles${suffix} | CompTeq Digital Blog`
    : `Blog${suffix} | CompTeq Digital: SaaS, Automation & Data`
  const description = category
    ? `Articles on ${category.name.toLowerCase()} from CompTeq Digital: practical guidance on custom SaaS, automation, analytics and digital products.`
    : 'Practical articles from CompTeq Digital on custom SaaS development, business process automation, analytics for SaaS products and launching an MVP.'

  const crumbs = [
    { name: 'Home', url: `${SITE.url}/` },
    { name: 'Blog', url: `${SITE.url}/blog/` },
    ...(category ? [{ name: category.name, url: `${SITE.url}${blogListPath(categorySlug)}` }] : []),
  ]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE.url}/blog/#blog`,
        name: `${SITE.name} Blog`,
        url: `${SITE.url}/blog/`,
        description: 'Practical articles on custom SaaS development, process automation, analytics and digital products.',
        inLanguage: 'en',
        publisher: {
          '@type': 'Organization',
          name: SITE.name,
          url: `${SITE.url}/`,
          logo: { '@type': 'ImageObject', url: `${SITE.url}/logo-512.png`, width: 512, height: 512 },
        },
        blogPost: allPosts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: `${SITE.url}${postPath(post.slug)}`,
          datePublished: post.date,
        })),
      },
      breadcrumbLd(crumbs),
    ],
  }

  return (
    <>
      <Seo title={title} description={description} path={path}>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Seo>

      <section className="blog-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li>{category ? <Link to="/blog/">Blog</Link> : <span aria-current="page">Blog</span>}</li>
              {category && <li><span aria-current="page">{category.name}</span></li>}
            </ol>
          </nav>
          <p className="eyebrow">{category ? 'Category' : 'The blog'}</p>
          <h1>
            {category ? (
              <>
                {name}, <em>in practice.</em>
              </>
            ) : (
              <>
                Notes on building <em>software that lasts.</em>
              </>
            )}
          </h1>
          <p className="lede">
            {category
              ? `Every article filed under ${category.name}.`
              : 'Plain-language guidance on custom SaaS, process automation, analytics and launching digital products, from the team at CompTeq Digital.'}
          </p>
        </div>
      </section>

      <section className="blog-list" aria-label="Articles">
        <div className="wrap">
          <div className="blog-tools">
            <nav className="chips" aria-label="Filter by category">
              <ul>
                <li>
                  <Link to="/blog/" aria-current={categorySlug ? undefined : 'page'}>
                    All<span className="chips__n">{allPosts.length}</span>
                  </Link>
                </li>
                {categories.map((item) => (
                  <li key={item.slug}>
                    <Link to={blogListPath(item.slug)} aria-current={item.slug === categorySlug ? 'page' : undefined}>
                      {item.name}<span className="chips__n">{item.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a className="rss-link" href="/rss.xml">
              <Rss aria-hidden="true" size={16} /> RSS feed
            </a>
          </div>

          <div className="post-grid">
            {list.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <Pagination category={categorySlug} page={page} total={total} />
        </div>
      </section>

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
