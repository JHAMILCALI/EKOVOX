import { useState } from 'react'

const faqs = [
  {
    q: '¿EKOVOX ya está funcionando?',
    a: 'Estamos construyendo el prototipo y preparando un piloto en La Paz. Publicaremos ubicaciones únicamente cuando estén confirmadas.',
  },
  {
    q: '¿Qué envases podré depositar?',
    a: 'El MVP se enfocará en botellas PET de bebidas vacías y sin aplastar. Cada estación mostrará su lista vigente.',
  },
  {
    q: '¿Cómo se calculan los puntos?',
    a: 'Según material, formato y campaña activa. La app mostrará la cantidad antes o inmediatamente después de aceptar el envase.',
  },
  {
    q: '¿Por qué debo escanear la estación?',
    a: 'Para vincular de forma segura los depósitos de esa sesión con tu cuenta.',
  },
  {
    q: '¿Qué ocurre si la botella es rechazada?',
    a: 'La VoxStation la devolverá y explicará la razón para que puedas corregirla o llevarla a otro punto adecuado.',
  },
  {
    q: '¿Los puntos son dinero?',
    a: 'No. Son unidades promocionales del programa EKOVOX y se usan bajo las condiciones publicadas.',
  },
  {
    q: '¿Puedo retirar efectivo?',
    a: 'No en el MVP. Los puntos se canjean por beneficios habilitados.',
  },
  {
    q: '¿Qué hacen con mis datos?',
    a: 'Usamos los datos mínimos necesarios para operar la cuenta, prevenir fraude y medir el programa. Los reportes para aliados son agregados o anonimizados.',
  },
  {
    q: '¿Venden mis hábitos de consumo?',
    a: 'No vendemos datos personales ni historiales individuales. EKOVOX ofrece indicadores operativos y ambientales agregados.',
  },
  {
    q: '¿Qué pasa con las botellas?',
    a: 'Cada retiro se pesa y registra antes de entregar el material a recicladores o gestores autorizados.',
  },
  {
    q: '¿Cómo puede participar una empresa?',
    a: 'Puede aportar rEKOmpensas, alojar o patrocinar una estación, financiar una campaña o contratar reportes agregados.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="faq">
      <div className="section">
        <div className="section-header">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Todo lo que necesitas saber</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                <button
                  type="button"
                  className="faq-item__trigger"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-item__question">{faq.q}</span>
                  <svg
                    className="faq-item__chevron"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="faq-item__content">
                  <p>{faq.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
