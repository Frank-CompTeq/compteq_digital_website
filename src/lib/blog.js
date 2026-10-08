import { posts, categories, pageSize, loaders } from 'virtual:blog'

export { posts, categories, pageSize, loaders }

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' })

export function formatDate(iso) {
  return dateFormat.format(new Date(`${iso}T12:00:00Z`))
}

export const blogListPath = (categorySlug, page = 1) => {
  const base = categorySlug ? `/blog/category/${categorySlug}/` : '/blog/'
  return page > 1 ? `${base}page/${page}/` : base
}

export const postPath = (slug) => `/blog/${slug}/`

export function postsFor(categorySlug) {
  return categorySlug ? posts.filter((post) => post.categorySlug === categorySlug) : posts
}

export function pageCount(categorySlug) {
  return Math.max(1, Math.ceil(postsFor(categorySlug).length / pageSize))
}

export function pagePosts(categorySlug, page) {
  const start = (page - 1) * pageSize
  return postsFor(categorySlug).slice(start, start + pageSize)
}

export function relatedPosts(post, limit = 3) {
  const score = (other) =>
    (other.categorySlug === post.categorySlug ? 10 : 0) + other.tags.filter((tag) => post.tags.includes(tag)).length
  return posts
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => score(b) - score(a) || b.date.localeCompare(a.date))
    .slice(0, limit)
}

export function breadcrumbLd(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
