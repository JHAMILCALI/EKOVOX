export default function CircularChain() {
  const steps = [
    { icon: 'corporate_fare', label: 'VoxStation', color: 'var(--ev-yellow)' },
    { icon: 'receipt_long', label: 'Retiro registrado', color: 'var(--ev-coral)' },
    { icon: 'scale', label: 'Pesaje', color: 'var(--ev-green)' },
    { icon: 'search', label: 'Clasificación', color: 'var(--ev-yellow)' },
    { icon: 'handshake', label: 'Gestor / Reciclador', color: 'var(--ev-coral)' },
    { icon: 'recycling', label: 'Valorización', color: 'var(--ev-green)' },
  ]

  return (
    <section id="cadena" className="circular-chain">
      <div className="section">
        <div className="section-header">
          <span className="eyebrow">Cadena circular</span>
          <h2>La tecnología termina donde empieza la valorización</h2>
        </div>

        <div className="chain-flow">
          {steps.map((s, i) => (
            <div key={s.label} className="chain-step" style={{ '--step-color': s.color } as React.CSSProperties}>
              <div className="chain-step__icon">
                <span className="material-symbols-rounded" aria-label={s.label}>{s.icon}</span>
              </div>
              <span className="chain-step__label">{s.label}</span>
              {i < steps.length - 1 && (
                <svg className="chain-arrow" width="32" height="16" viewBox="0 0 32 16" fill="none" aria-hidden="true">
                  <path d="M0 8h28M22 2l6 6-6 6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <blockquote className="chain-quote">
          EXOVOX busca trabajar con recicladoras, recicladores y gestores autorizados.
          La tecnología debe fortalecer su labor y mejorar la trazabilidad, no reemplazarlos
          ni invisibilizarlos.
        </blockquote>
      </div>
    </section>
  )
}
