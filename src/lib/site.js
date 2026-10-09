export { SITE } from './site-data.js'

export const NAV = [
  { label: 'Services', to: '/#services' },
  { label: 'Process', to: '/#process' },
  { label: 'Approach', to: '/#approach' },
  { label: 'Blog', to: '/blog/' },
]

export const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || ''
