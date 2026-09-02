import { useEffect, useRef } from 'react'

const categories = [
  {
    icon: 'movie',
    title: 'Entretenimiento',
    desc: 'Cine, eventos y experiencias.',
    gradient: 'linear-gradient(135deg, rgba(255,184,0,0.12), rgba(255,107,74,0.08))',
  },
  {
    icon: 'restaurant',
    title: 'Alimentos y bebidas',
    desc: 'Descuentos en tus lugares favoritos.',
    gradient: 'linear-gradient(135deg, rgba(255,107,74,0.12), rgba(255,184,0,0.06))',
  },
  {
    icon: 'shopping_cart',
    title: 'Supermercados',
    desc: 'Ahorra en tu compra semanal.',
    gradient: 'linear-gradient(135deg, rgba(0,214,143,0.12), rgba(255,184,0,0.06))',
  },
  {
    icon: 'medication',
    title: 'Farmacias y bienestar',
    desc: 'Cuida tu salud con beneficios.',
    gradient: 'linear-gradient(135deg, rgba(0,214,143,0.10), rgba(0,150,200,0.08))',
  },
  {
    icon: 'smartphone',
    title: 'Recargas o movilidad',
    desc: 'Conecta y muévete con tus puntos.',
    gradient: 'linear-gradient(135deg, rgba(100,140,255,0.12), rgba(0,214,143,0.06))',
  },
  {
    icon: 'emoji_events',
    title: 'Retos y premios especiales',
    desc: 'Compite y gana rEKOmpensas únicas.',
    gradient: 'linear-gradient(135deg, rgba(255,184,0,0.15), rgba(255,107,74,0.10))',
  },
]

export default function Benefits() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const cards = gridRef.current?.querySelectorAll('.benefit-card')
    cards?.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="rEKOmpensas" className="benefits">
      <div className="section">
        <div className="section-header">
          <span className="eyebrow">REKOmpensas</span>
          <h2>Puntos que se convierten en experiencias útiles</h2>
        </div>

        <div className="benefits-grid" ref={gridRef}>
          {categories.map((c, i) => (
            <div
              key={c.title}
              className="benefit-card glass-card animate-in"
              style={{ transitionDelay: `${i * 0.1}s`, '--card-bg': c.gradient } as React.CSSProperties}
            >
              <div className="benefit-card__icon-wrap">
                <span className="benefit-card__icon material-symbols-rounded" aria-label={c.title}>{c.icon}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>

        <blockquote className="benefits__disclaimer">
          Las rEKOmpensas dependen de disponibilidad, ubicación, vigencia y condiciones de cada aliado.
          Antes del lanzamiento publicaremos el valor en puntos y las reglas de cada beneficio.
        </blockquote>
      </div>
    </section>
  )
}
