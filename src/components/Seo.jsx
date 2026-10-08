import { Head } from 'vite-react-ssg'
import { SITE } from '@/lib/site'

export function Seo({
  title,
  description = SITE.description,
  path = '/',
  noindex = false,
  type = 'website',
  image = SITE.ogImage,
  imageAlt = 'CompTeq Digital: custom SaaS and digital products',
  article = null,
  children,
}) {
  const url = `${SITE.url}${path}`
  const imageUrl = `${SITE.url}${image}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      {article && <meta property="article:published_time" content={article.published} />}
      {article?.modified && <meta property="article:modified_time" content={article.modified} />}
      {article && <meta property="article:section" content={article.section} />}
      {article?.tags?.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {children}
    </Head>
  )
}
