import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { NAV } from '@/lib/site'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'

export function Header() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const listRef = useRef(null)

  const close = useCallback((returnFocus = false) => {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return undefined

    listRef.current?.querySelector('a')?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') close(true)
    }
    const onPointer = (event) => {
      if (!event.target.closest?.('[data-menu-root]')) close()
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 961px)').matches) close()
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('resize', onResize)
    }
  }, [open, close])

  return (
    <header className="site-header">
      <div className="wrap site-header__bar" data-menu-root>
        <Logo />
        <button
          ref={buttonRef}
          type="button"
          className="menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
        <nav className="main-nav" aria-label="Main" data-open={open}>
          <ul id="main-menu" ref={listRef}>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="nav-link" onClick={() => close()}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Button asChild size="sm" className="nav-cta">
                <Link to="/#contact" onClick={() => close()}>
                  Start a project
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
