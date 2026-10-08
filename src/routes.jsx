import { Layout } from '@/components/Layout'
import Home from '@/pages/Home'
import Privacy from '@/pages/Privacy'
import Legal from '@/pages/Legal'
import NotFound from '@/pages/NotFound'
import BlogIndex from '@/pages/BlogIndex'
import BlogPost from '@/pages/BlogPost'
import { categories, loaders, pageCount, posts } from '@/lib/blog'

function listRoutes(category) {
  const base = category ? `blog/category/${category}` : 'blog'
  const routes = [{ path: base, element: <BlogIndex category={category} /> }]
  for (let page = 2; page <= pageCount(category); page += 1) {
    routes.push({ path: `${base}/page/${page}`, element: <BlogIndex category={category} page={page} /> })
  }
  return routes
}

const blogRoutes = [
  ...listRoutes(undefined),
  ...categories.flatMap((category) => listRoutes(category.slug)),
  ...posts.map((post) => ({
    path: `blog/${post.slug}`,
    lazy: async () => {
      const content = (await loaders[post.slug]()).default
      return { element: <BlogPost post={post} content={content} /> }
    },
  })),
]

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home />, entry: 'src/pages/Home.jsx' },
      { path: 'privacy', element: <Privacy />, entry: 'src/pages/Privacy.jsx' },
      { path: 'legal', element: <Legal />, entry: 'src/pages/Legal.jsx' },
      ...blogRoutes,
      { path: '404', element: <NotFound />, entry: 'src/pages/NotFound.jsx' },
      { path: '*', element: <NotFound /> },
    ],
  },
]
