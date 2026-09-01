import { useState } from 'react'

const ageRanges = ['16-18', '19-22', '23-25', '26-28', '29+']
const usageLocations = [
  'Universidad',
  'Centro comercial',
  'Supermercado',
  'Espacio público',
  'Lugar de trabajo',
  'Otro',
]

interface PilotData {
  name: string
  contact: string
  age: string
  zone: string
  places: string[]
  consent: boolean
}

const empty: PilotData = {
  name: '', contact: '', age: '', zone: '', places: [], consent: false,
}

export default function PilotForm({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [form, setForm] = useState<PilotData>(empty)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  if (!open) return null

  const togglePlace = (p: string) => {
    setForm((prev) => ({
      ...prev,
      places: prev.places.includes(p)
        ? prev.places.filter((x) => x !== p)
        : [...prev.places, p],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulated submission
    setTimeout(() => setStatus('success'), 1200)
  }

  const handleClose = () => {
    onClose()
    // Reset after animation
    setTimeout(() => {
      setForm(empty)
      setStatus('idle')
    }, 300)
  }

  return (
    <div className="pilot-overlay" onClick={handleClose}>
      <div
        className="pilot-modal glass-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Formulario de registro al piloto"
      >
        <button type="button" className="pilot-modal__close" onClick={handleClose} aria-label="Cerrar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="pilot-modal__success">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="30" fill="rgba(0,214,143,0.15)" />
              <path d="M18 32l10 10 18-18" stroke="#00D68F" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3>¡Te registraste en la lista!</h3>
            <p>Te contactaremos cuando el piloto esté listo en tu zona. Gracias por sumarte a EXOVOX.</p>
            <button type="button" className="btn btn-primary" onClick={handleClose}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <h3 className="pilot-modal__title">Quiero participar en el piloto</h3>
            <p className="pilot-modal__desc">
              Déjanos tus datos y te avisaremos cuando EXOVOX esté disponible en tu zona.
            </p>

            <form onSubmit={handleSubmit} className="pilot-form">
              <div className="form-group">
                <label htmlFor="pilot-name">Nombre o alias</label>
                <input
                  id="pilot-name"
                  className="input-field"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="¿Cómo te llamamos?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pilot-contact">Correo o teléfono</label>
                <input
                  id="pilot-contact"
                  className="input-field"
                  required
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  placeholder="correo@ejemplo.com o +591..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="pilot-age">Rango de edad</label>
                <select
                  id="pilot-age"
                  className="input-field"
                  required
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                >
                  <option value="">Selecciona...</option>
                  {ageRanges.map((a) => (
                    <option key={a} value={a}>{a} años</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="pilot-zone">Zona o macrodistrito</label>
                <input
                  id="pilot-zone"
                  className="input-field"
                  value={form.zone}
                  onChange={(e) => setForm({ ...form, zone: e.target.value })}
                  placeholder="Ej: Centro, Sopocachi, Sur..."
                />
              </div>

              <div className="form-group">
                <label>¿Dónde usarías EXOVOX?</label>
                <div className="pilot-places">
                  {usageLocations.map((p) => (
                    <label key={p} className={`pilot-place-chip ${form.places.includes(p) ? 'pilot-place-chip--active' : ''}`}>
                      <input
                        type="checkbox"
                        checked={form.places.includes(p)}
                        onChange={() => togglePlace(p)}
                        className="sr-only"
                      />
                      {p}
                    </label>
                  ))}
                </div>
              </div>

              <label className="pilot-consent">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                />
                <span>Acepto que EXOVOX use estos datos para contactarme sobre el piloto.</span>
              </label>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <span className="pilot-spinner" />
                ) : (
                  'Registrarme en la lista'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
