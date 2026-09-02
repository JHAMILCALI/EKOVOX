import { useEffect, useRef } from 'react'

const steps = [
  {
    num: '01',
    title: 'Escanea',
    desc: 'Abre EKOVOX y escanea el QR de la VoxStation.',
    icon: (
      <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="48" height="48" rx="12" fill="rgba(255,184,0,0.1)" />
        <rect x="14" y="14" width="28" height="28" rx="4" stroke="#FFB800" strokeWidth="2" fill="none" />
        <rect x="18" y="18" width="8" height="8" rx="1" fill="#FFB800" opacity="0.7" />
        <rect x="30" y="18" width="8" height="8" rx="1" fill="#FFB800" opacity="0.5" />
        <rect x="18" y="30" width="8" height="8" rx="1" fill="#FFB800" opacity="0.5" />
        <rect x="30" y="30" width="8" height="8" rx="1" fill="#FFB800" opacity="0.3" />
        {/* Phone frame */}
        <rect x="36" y="8" width="16" height="26" rx="4" fill="none" stroke="#FFB800" strokeWidth="1.5" />
        <line x1="39" y1="30" x2="49" y2="30" stroke="#FFB800" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    color: 'var(--ev-yellow)',
  },
  {
    num: '02',
    title: 'Deposita',
    desc: 'Introduce una botella PET vacía. La estación la valida y te muestra el resultado.',
    icon: (
      <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="48" height="48" rx="12" fill="rgba(255,107,74,0.1)" />
        {/* Bottle */}
        <path d="M24 14h8v4l3 4v16a4 4 0 01-4 4H25a4 4 0 01-4-4V22l3-4V14z" fill="none" stroke="#FF6B4A" strokeWidth="2" />
        <rect x="26" y="10" width="4" height="6" rx="1" fill="#FF6B4A" opacity="0.7" />
        {/* Arrow down */}
        <path d="M38 28l-10 10-10-10" stroke="#FF6B4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    ),
    color: 'var(--ev-coral)',
  },
  {
    num: '03',
    title: 'Gana y canjea',
    desc: 'Recibe puntos, revisa tu impacto y elige una rEKOmpensa disponible.',
    icon: (
      <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="48" height="48" rx="12" fill="rgba(0,214,143,0.1)" />
        {/* Star / reward */}
        <path d="M28 14l3.5 7 7.5 1-5.5 5.3 1.3 7.7L28 31.5l-6.8 3.5 1.3-7.7L17 22l7.5-1L28 14z" fill="none" stroke="#00D68F" strokeWidth="2" strokeLinejoin="round" />
        {/* Sparkles */}
        <circle cx="40" cy="16" r="2" fill="#00D68F" opacity="0.5" />
        <circle cx="16" cy="38" r="1.5" fill="#00D68F" opacity="0.4" />
        <circle cx="42" cy="36" r="1" fill="#00D68F" opacity="0.3" />
      </svg>
    ),
    color: 'var(--ev-green)',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )
    const cards = sectionRef.current?.querySelectorAll('.step-card')
    cards?.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="como-funciona" className="how-it-works" ref={sectionRef}>
      <div className="section">
        <div className="section-header">
          <span className="eyebrow">Así de fácil</span>
          <h2>Reciclar y ganar en tres pasos</h2>
        </div>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="step-card glass-card animate-in"
              style={{ transitionDelay: `${i * 0.15}s` } as React.CSSProperties}
            >
              <div className="step-card__icon">{s.icon}</div>
              <span className="step-card__num" style={{ color: s.color }}>{s.num}</span>
              <h3 className="step-card__title">{s.title}</h3>
              <p className="step-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Connector lines between steps on desktop */}
        <div className="steps-connectors" aria-hidden="true">
          <div className="steps-connector" />
          <div className="steps-connector" />
        </div>

        <p className="how-it-works__note">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="8" cy="8" r="7" stroke="var(--ev-text-muted)" strokeWidth="1.5" />
            <text x="8" y="12" textAnchor="middle" fontSize="10" fill="var(--ev-text-muted)" fontWeight="600">i</text>
          </svg>
          El código de barras ayuda a identificar el producto; la estación también valida físicamente el envase.
        </p>
      </div>
    </section>
  )
}
