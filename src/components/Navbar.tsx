import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#rEKOmpensas', label: 'REKOmpensas' },
    { href: '#impacto', label: 'Impacto' },
    { href: '#empresas', label: 'Para empresas' },
    { href: '#faq', label: 'Preguntas' },
  ]

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner">
        {/* Logo */}
        <a href="#" className="navbar__logo" aria-label="EKOVOX inicio">
          <img
            src="/img/logo%20ekovox.png"
            alt="EKOVOX"
            className="navbar__logo-image"
          />
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/demo"
          className="btn btn-primary navbar__cta"
        >
          Probar demo
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <Link
          to="/demo"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '12px', textAlign: 'center' }}
          onClick={() => setMenuOpen(false)}
        >
          Probar demo
        </Link>
      </div>
    </header>
  )
}
