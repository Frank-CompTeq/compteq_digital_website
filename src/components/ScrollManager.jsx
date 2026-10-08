import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      target.scrollIntoView()
    } else if (!first.current) {
      window.scrollTo(0, 0)
    }
    first.current = false
  }, [pathname, hash])

  return null
}
