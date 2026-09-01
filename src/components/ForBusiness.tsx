import { useState } from 'react'

const offers = [
  {
    icon: '🏭',
    title: 'Patrocina una VoxStation',
    desc: 'Tu marca visible en cada interacción de reciclaje.',
  },
  {
    icon: '🎁',
    title: 'Aporta recompensas',
    desc: 'Ofrece beneficios a usuarios activos y fideliza.',
  },
  {
    icon: '📍',
    title: 'Aloja una estación',
    desc: 'Convierte tu espacio en un punto de economía circular.',
  },
  {
    icon: '📈',
    title: 'Mide una campaña de recuperación',
    desc: 'Datos reales de envases recuperados por tu marca.',
  },
]

const indicators = [
  'Envases recuperados en la red',
  'Actividad por estación y periodo',
  'Formatos o SKU identificados',
  'Puntos y canjes',
  'Destino documentado del material',
]

const interestTypes = [
  'Patrocinar una estación',
  'Aportar recompensas',
  'Alojar una estación',
  'Campaña de recuperación',
  'Reportes e indicadores',
  'Otro',
]

interface FormData {
  name: string
  org: string
  role: string
  contact: string
  interest: string
  city: string
  message: string
  consent: boolean
}

const emptyForm: FormData = {
  name: '', org: '', role: '', contact: '', interest: '', city: '', message: '', consent: false,
}

export default function ForBusiness() {
  const [form, setForm] = useState<FormData>(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const set = (key: keyof FormData, val: string | boolean) =>
    setForm({ ...form, [key]: val })

  return (
    <section id="empresas" className="for-business">
      <div className="section">
        <div className="section-header">
          <span className="eyebrow">Para empresas</span>
          <h2>Convierte tu compromiso ambiental en resultados medibles</h2>
        </div>

        <div className="biz-offers-grid">
          {offers.map((o) => (
            <div key={o.title} className="biz-offer glass-card">
              <span className="biz-offer__icon" role="img" aria-label={o.title}>{o.icon}</span>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
            </div>
          ))}
        </div>

        <div className="biz-indicators glass-card">
          <h3>Indicadores que ofrecemos</h3>
          <ul>
            {indicators.map((ind) => (
              <li key={ind}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 9l3.5 3.5 6.5-7" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {ind}
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="biz-disclaimer">
          Los datos representan envases depositados en EXOVOX; no equivalen a ventas, participación de
          mercado ni consumo total.
        </blockquote>

        {!showForm && !submitted && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Solicitar una conversación
            </button>
          </div>
        )}

        {showForm && !submitted && (
          <form className="biz-form glass-card" onSubmit={handleSubmit}>
            <h3>Cuéntanos sobre tu interés</h3>

            <div className="biz-form__grid">
              <div className="form-group">
                <label htmlFor="biz-name">Nombre</label>
                <input id="biz-name" className="input-field" required value={form.name} onChange={(e) => set('name', e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="biz-org">Organización</label>
                <input id="biz-org" className="input-field" required value={form.org} onChange={(e) => set('org', e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="biz-role">Cargo</label>
                <input id="biz-role" className="input-field" value={form.role} onChange={(e) => set('role', e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="biz-contact">Correo o teléfono</label>
                <input id="biz-contact" className="input-field" required value={form.contact} onChange={(e) => set('contact', e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="biz-interest">Tipo de interés</label>
                <select id="biz-interest" className="input-field" required value={form.interest} onChange={(e) => set('interest', e.target.value)}>
                  <option value="">Selecciona...</option>
                  {interestTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="biz-city">Ciudad</label>
                <input id="biz-city" className="input-field" value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="La Paz" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="biz-msg">Mensaje</label>
              <textarea id="biz-msg" className="input-field" value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Cuéntanos cómo te gustaría participar..." />
            </div>

            <label className="biz-form__consent">
              <input type="checkbox" required checked={form.consent} onChange={(e) => set('consent', e.target.checked)} />
              <span>Acepto que EXOVOX use estos datos para contactarme sobre posibles alianzas.</span>
            </label>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Enviar solicitud
            </button>
          </form>
        )}

        {submitted && (
          <div className="biz-success glass-card">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <circle cx="28" cy="28" r="26" fill="rgba(0,214,143,0.15)" />
              <path d="M16 28l8 8 16-16" stroke="#00D68F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3>¡Solicitud enviada!</h3>
            <p>Nuestro equipo revisará tu información y te contactará pronto.</p>
          </div>
        )}
      </div>
    </section>
  )
}
