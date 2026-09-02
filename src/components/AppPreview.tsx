import { Link } from 'react-router-dom'

export default function AppPreview() {
  const benefits = [
    { icon: 'location_on', text: 'Encuentra estaciones activas' },
    { icon: 'bolt', text: 'Acumula puntos en tiempo real' },
    { icon: 'receipt_long', text: 'Revisa tu historial' },
    { icon: 'confirmation_number', text: 'Canjea cupones únicos' },
    { icon: 'lock', text: 'Controla tus datos y preferencias' },
  ]

  return (
    <section id="app" className="app-preview">
      <div className="section">
        <div className="section-header">
          <span className="eyebrow">La App</span>
          <h2>Tu reciclaje, tus puntos y tus rEKOmpensas en un solo lugar</h2>
        </div>

        <div className="app-preview__layout">
          {/* Phone mockups */}
          <div className="app-preview__phones">
            {/* Screen 1: Map */}
            <div className="app-screen app-screen--1">
              <div className="app-screen__frame">
                <div className="app-screen__notch" />
                <div className="app-screen__content">
                  <div className="app-screen__header">
                    <span className="material-symbols-rounded" style={{ fontSize: 16, marginRight: 4 }}>map</span>
                    Mapa
                  </div>
                  <div className="app-screen__body" style={{ background: 'linear-gradient(180deg, rgba(0,214,143,0.06), rgba(0,0,0,0))' }}>
                    <div className="app-mock-map">
                      <div className="app-mock-pin" style={{ top: '30%', left: '40%' }} />
                      <div className="app-mock-pin" style={{ top: '50%', left: '60%' }} />
                      <div className="app-mock-pin" style={{ top: '70%', left: '35%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <span className="app-screen__label">Mapa</span>
            </div>

            {/* Screen 2: Scanner */}
            <div className="app-screen app-screen--2">
              <div className="app-screen__frame">
                <div className="app-screen__notch" />
                <div className="app-screen__content">
                  <div className="app-screen__header">
                    <span className="material-symbols-rounded" style={{ fontSize: 16, marginRight: 4 }}>qr_code_scanner</span>
                    Escáner
                  </div>
                  <div className="app-screen__body">
                    <div className="app-mock-scanner">
                      <div className="app-mock-scanner__frame" />
                      <div className="app-mock-scanner__line" />
                    </div>
                  </div>
                </div>
              </div>
              <span className="app-screen__label">Escáner</span>
            </div>

            {/* Screen 3: Summary */}
            <div className="app-screen app-screen--3">
              <div className="app-screen__frame">
                <div className="app-screen__notch" />
                <div className="app-screen__content">
                  <div className="app-screen__header">
                    <span className="material-symbols-rounded" style={{ fontSize: 16, marginRight: 4 }}>analytics</span>
                    Resumen
                  </div>
                  <div className="app-screen__body">
                    <div className="app-mock-stats">
                      <div className="app-mock-stat">
                        <span className="app-mock-stat__val">150</span>
                        <span className="app-mock-stat__label">puntos</span>
                      </div>
                      <div className="app-mock-bar" style={{ '--bar-w': '75%' } as React.CSSProperties} />
                      <div className="app-mock-bar" style={{ '--bar-w': '45%' } as React.CSSProperties} />
                      <div className="app-mock-bar" style={{ '--bar-w': '60%' } as React.CSSProperties} />
                    </div>
                  </div>
                </div>
              </div>
              <span className="app-screen__label">Resumen</span>
            </div>

            {/* Screen 4: Rewards */}
            <div className="app-screen app-screen--4">
              <div className="app-screen__frame">
                <div className="app-screen__notch" />
                <div className="app-screen__content">
                  <div className="app-screen__header">
                    <span className="material-symbols-rounded" style={{ fontSize: 16, marginRight: 4 }}>card_giftcard</span>
                    REKOmpensas
                  </div>
                  <div className="app-screen__body">
                    <div className="app-mock-rewards">
                      <div className="app-mock-reward-item">
                        <span className="material-symbols-rounded" style={{ fontSize: 14, marginRight: 4 }}>movie</span>
                        Cine
                      </div>
                      <div className="app-mock-reward-item">
                        <span className="material-symbols-rounded" style={{ fontSize: 14, marginRight: 4 }}>shopping_cart</span>
                        Super
                      </div>
                      <div className="app-mock-reward-item">
                        <span className="material-symbols-rounded" style={{ fontSize: 14, marginRight: 4 }}>smartphone</span>
                        Recarga
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="app-screen__label">REKOmpensas</span>
            </div>
          </div>

          {/* Benefits list */}
          <div className="app-preview__info">
            <ul className="app-preview__benefits">
              {benefits.map((b) => (
                <li key={b.text}>
                  <span className="app-preview__benefit-icon material-symbols-rounded">{b.icon}</span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/demo"
              className="btn btn-primary"
            >
              Probar demo de la app
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
