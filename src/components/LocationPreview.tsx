import { useState } from 'react'

const locationTypes = [
  'Universidad',
  'Centro comercial',
  'Supermercado',
  'Espacio público',
  'Otro',
]

export default function LocationPreview() {
  const [suggestion, setSuggestion] = useState({ place: '', type: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="ubicaciones" className="locations">
      <div className="section">
        <div className="section-header">
          <span className="eyebrow">Ubicaciones</span>
          <h2>Encuentra una VoxStation cerca de ti</h2>
          <p>Próximamente en La Paz. Ayúdanos a elegir los mejores puntos.</p>
        </div>

        <div className="locations-content">
          {/* Stylized map of La Paz */}
          <div className="locations-map glass-card">
            <svg viewBox="0 0 500 400" fill="none" className="locations-map__svg" aria-label="Mapa estilizado de La Paz">
              {/* Background grid */}
              {Array.from({ length: 20 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0" y1={i * 20} x2="500" y2={i * 20}
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="0.5"
                />
              ))}
              {Array.from({ length: 25 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * 20} y1="0" x2={i * 20} y2="400"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="0.5"
                />
              ))}

              {/* Terrain - abstract mountain lines */}
              <path d="M0 300 Q80 200 160 250 Q240 180 320 220 Q400 160 500 200 L500 400 L0 400Z" fill="rgba(255,184,0,0.03)" />
              <path d="M0 320 Q100 260 200 290 Q300 240 400 280 Q450 260 500 270 L500 400 L0 400Z" fill="rgba(0,214,143,0.03)" />

              {/* Roads */}
              <path d="M50 200 Q150 180 250 200 Q350 220 450 180" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
              <path d="M200 50 Q220 150 200 250 Q180 320 220 380" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
              <path d="M100 100 Q200 120 300 100 Q400 80 450 120" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" />

              {/* City label */}
              <text x="250" y="200" textAnchor="middle" fontFamily="Outfit" fontWeight="700" fontSize="18" fill="rgba(255,255,255,0.12)">
                LA PAZ
              </text>
              <text x="250" y="220" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="rgba(255,255,255,0.06)">
                Próximas ubicaciones por confirmar
              </text>

              {/* Decorative pulse circles */}
              <circle cx="180" cy="160" r="6" fill="none" stroke="var(--ev-yellow)" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="6;20;6" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="300" cy="240" r="6" fill="none" stroke="var(--ev-green)" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="6;20;6" dur="3.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="350" cy="140" r="6" fill="none" stroke="var(--ev-coral)" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="6;20;6" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* Suggest location form */}
          <div className="locations-suggest glass-card">
            <h3>📍 Sugiere una ubicación</h3>
            <p>¿Dónde te gustaría encontrar una VoxStation?</p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="locations-form">
                <div className="form-group">
                  <label htmlFor="loc-place">Lugar o dirección</label>
                  <input
                    id="loc-place"
                    type="text"
                    className="input-field"
                    placeholder="Ej: Universidad Mayor de San Andrés"
                    required
                    value={suggestion.place}
                    onChange={(e) => setSuggestion({ ...suggestion, place: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loc-type">Tipo de espacio</label>
                  <select
                    id="loc-type"
                    className="input-field"
                    required
                    value={suggestion.type}
                    onChange={(e) => setSuggestion({ ...suggestion, type: e.target.value })}
                  >
                    <option value="">Selecciona...</option>
                    {locationTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="loc-email">Tu correo (opcional)</label>
                  <input
                    id="loc-email"
                    type="email"
                    className="input-field"
                    placeholder="correo@ejemplo.com"
                    value={suggestion.email}
                    onChange={(e) => setSuggestion({ ...suggestion, email: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Enviar sugerencia
                </button>
              </form>
            ) : (
              <div className="locations-success">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <circle cx="24" cy="24" r="22" fill="rgba(0,214,143,0.15)" />
                  <path d="M14 24l6 6 14-14" stroke="#00D68F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>¡Gracias! Tu sugerencia fue registrada. Te contactaremos si abrimos en esa zona.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
