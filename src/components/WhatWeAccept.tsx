const accepts = [
  'Botellas PET de bebidas',
  'Vacías',
  'Sin aplastar',
  'Dentro de los tamaños habilitados',
  'Con código legible cuando sea requerido',
]

const rejects = [
  'Botellas con líquido',
  'Vidrio o latas en el MVP',
  'Envases de sustancias peligrosas',
  'Vasos, bolsas u objetos no válidos',
  'Envases aplastados que impidan validación',
]

export default function WhatWeAccept() {
  return (
    <section id="que-acepta" className="what-accept">
      <div className="section">
        <div className="section-header">
          <span className="eyebrow">Material aceptado</span>
          <h2>Empezamos con PET para hacerlo bien</h2>
        </div>

        <div className="accept-grid">
          <div className="accept-col accept-col--yes glass-card">
            <div className="accept-col__header">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="14" fill="rgba(0,214,143,0.15)" />
                <path d="M10 16l4 4 8-8" stroke="#00D68F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3>Acepta en el piloto</h3>
            </div>
            <ul>
              {accepts.map((item) => (
                <li key={item}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4 9l3.5 3.5 6.5-7" stroke="#00D68F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="accept-col accept-col--no glass-card">
            <div className="accept-col__header">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="14" fill="rgba(255,107,74,0.15)" />
                <path d="M11 11l10 10M21 11l-10 10" stroke="#FF6B4A" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <h3>No acepta</h3>
            </div>
            <ul>
              {rejects.map((item) => (
                <li key={item}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M5 5l8 8M13 5l-8 8" stroke="#FF6B4A" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="what-accept__cta">
          <a href="#faq" className="btn btn-sEKOndary">Ver preguntas frecuentes</a>
        </div>
      </div>
    </section>
  )
}
