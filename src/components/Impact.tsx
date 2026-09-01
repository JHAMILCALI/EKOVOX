import { useEffect, useRef, useState } from 'react'

const metrics = [
  {
    icon: '♻️',
    label: 'Envases aceptados',
    target: 0,
    unit: 'medido en piloto',
    color: 'var(--ev-green)',
  },
  {
    icon: '⚖️',
    label: 'Kg entregados a valorización',
    target: 0,
    unit: 'medido en piloto',
    color: 'var(--ev-yellow)',
  },
  {
    icon: '📊',
    label: 'Material aprovechado',
    target: 0,
    unit: '% por verificar',
    color: 'var(--ev-coral)',
  },
  {
    icon: '👥',
    label: 'Usuarios activos',
    target: 0,
    unit: 'medido en piloto',
    color: 'var(--ev-green)',
  },
  {
    icon: '🎁',
    label: 'Recompensas canjeadas',
    target: 0,
    unit: 'medido en piloto',
    color: 'var(--ev-yellow)',
  },
  {
    icon: '🤝',
    label: 'Recicladores participantes',
    target: 0,
    unit: 'medido en piloto',
    color: 'var(--ev-coral)',
  },
]

export default function Impact() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="impacto" className="impact" ref={sectionRef}>
      <div className="section">
        <div className="section-header">
          <span className="eyebrow">Impacto verificable</span>
          <h2>Cada depósito cuenta y cada retiro se documenta</h2>
          <p>Estos indicadores se activarán con datos reales cuando comience el piloto.</p>
        </div>

        <div className={`impact-grid ${visible ? 'impact-grid--visible' : ''}`}>
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="impact-card glass-card"
              style={{ transitionDelay: `${i * 0.1}s`, '--metric-color': m.color } as React.CSSProperties}
            >
              <span className="impact-card__icon" role="img" aria-label={m.label}>{m.icon}</span>
              <div className="impact-card__value">
                <span className="impact-card__number">—</span>
              </div>
              <span className="impact-card__label">{m.label}</span>
              <span className="impact-card__unit">{m.unit}</span>
            </div>
          ))}
        </div>

        <p className="impact__note">
          EXOVOX no usa equivalencias como "CO₂ evitado" o "árboles salvados" sin una fuente y metodología pública verificable.
        </p>
      </div>
    </section>
  )
}
