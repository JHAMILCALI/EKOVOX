import { useState, useEffect } from 'react'

export default function Navbar({ onOpenPilotForm }: { onOpenPilotForm: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#recompensas', label: 'Recompensas' },
    { href: '#impacto', label: 'Impacto' },
    { href: '#empresas', label: 'Para empresas' },
    { href: '#faq', label: 'Preguntas' },
  ]

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner">
        {/* Logo */}
        <a href="#" className="navbar__logo" aria-label="EXOVOX inicio">
          <svg width="150" height="36" viewBox="0 0 150 36" fill="none" aria-hidden="true">
            {/* Mountain / Sun Logo icon */}
            <path d="M4 22L11 11L18 22H4Z" fill="#5DAE32" />
            <path d="M12 22L19 9L26 22H12Z" fill="#9ACD32" />
            <circle cx="21" cy="8" r="3.5" fill="#F7C62F" />
            <path d="M2 25C8 23.5 14 26.5 20 25C23 24.2 26 24.5 28 25" stroke="#13A3A1" strokeWidth="2.5" strokeLinecap="round" />
            <text x="34" y="25" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="22" fill="#FFFFFF">
              EXO<tspan fill="#9ACD32">VOX</tspan>
            </text>
          </svg>
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
        <button
          type="button"
          className="btn btn-primary navbar__cta"
          onClick={onOpenPilotForm}
        >
          Quiero participar
        </button>

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
        <button
          type="button"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '12px' }}
          onClick={() => { setMenuOpen(false); onOpenPilotForm(); }}
        >
          Quiero participar
        </button>
      </div>
    </header>
  )
}
