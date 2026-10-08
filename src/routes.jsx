import { Layout } from '@/components/Layout'
import Home from '@/pages/Home'
import Privacy from '@/pages/Privacy'
import Legal from '@/pages/Legal'
import NotFound from '@/pages/NotFound'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home />, entry: 'src/pages/Home.jsx' },
      { path: 'privacy', element: <Privacy />, entry: 'src/pages/Privacy.jsx' },
      { path: 'legal', element: <Legal />, entry: 'src/pages/Legal.jsx' },
      { path: '404', element: <NotFound />, entry: 'src/pages/NotFound.jsx' },
      { path: '*', element: <NotFound /> },
    ],
  },
]
