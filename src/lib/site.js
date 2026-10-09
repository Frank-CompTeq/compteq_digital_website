export { SITE } from './site-data.js'

export const NAV = [
  { label: 'Services', to: '/#services' },
  { label: 'Process', to: '/#process' },
  { label: 'Approach', to: '/#approach' },
  { label: 'Blog', to: '/blog/' },
]

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/** Inlined at build time. Empty when VITE_WEB3FORMS_ACCESS_KEY is not set. */
export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''
