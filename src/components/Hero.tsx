export default function Hero({
  onOpenPilotForm,
  onOpenAllyForm,
}: {
  onOpenPilotForm: () => void
  onOpenAllyForm: () => void
}) {
  return (
    <section className="hero" id="hero">
      {/* Background with La Paz mountain silhouette & geometric paceño relief accents */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__gradient" />
        <div className="hero__radial-glow" />

        {/* Mountain Silhouette (Illimani & La Paz topography contour) */}
        <svg
          className="hero__mountains-svg"
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 320L120 280L240 290L360 210L480 260L600 180L720 120L840 200L960 160L1080 240L1200 220L1320 270L1440 240V320H0Z"
            fill="rgba(19, 163, 161, 0.04)"
          />
          <path
            d="M0 320L180 260L320 275L500 190L680 240L820 140L980 210L1120 180L1280 250L1440 220V320H0Z"
            fill="rgba(154, 205, 50, 0.03)"
          />
        </svg>

        {/* Subtle Geometric Paceño relief patterns & tech dots */}
        <div className="hero__tech-grid" />
      </div>

      <div className="hero__container">
        {/* Main 2-Column Hero Content */}
        <div className="hero__main">
          {/* Left Column (Content) */}
          <div className="hero__left">
            {/* Eyebrow */}
            <div className="hero__eyebrow">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 15L7 9L11 15H3Z" fill="#5DAE32" />
                <path d="M9 15L13 7L17 15H9Z" fill="#9ACD32" />
                <circle cx="15" cy="6" r="2.5" fill="#F7C62F" />
              </svg>
              <span>TECNOLOGÍA CIRCULAR HECHA PARA LA PAZ</span>
            </div>

            {/* H1 Headline */}
            <h1 className="hero__title">
              Haz que tu<br />
              reciclaje<br />
              <span className="hero__title-accent">tenga voz.</span>
            </h1>

            {/* Subtitle */}
            <p className="hero__subtitle">
              Deposita envases PET en una VoxStation, recibe puntos en la app y canjéalos
              por beneficios de empresas aliadas.
            </p>

            {/* Buttons / CTAs */}
            <div className="hero__actions">
              <button
                type="button"
                className="btn btn-hero-primary"
                onClick={onOpenPilotForm}
              >
                <span>Quiero participar en el piloto</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4.166 10h11.667M10 4.166L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                className="btn btn-hero-secondary"
                onClick={onOpenAllyForm}
              >
                Quiero ser aliado
              </button>
            </div>

            {/* Pilot Microcopy */}
            <div className="hero__micro">
              <div className="hero__micro-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#9ACD32" strokeWidth="1.5" />
                  <text x="8" y="11.5" textAnchor="middle" fontSize="10" fill="#9ACD32" fontWeight="700">i</text>
                </svg>
              </div>
              <p>
                <strong style={{ color: '#FFFFFF' }}>Piloto en preparación en La Paz.</strong>{' '}
                Participar en la lista no tiene costo ni garantiza selección.
              </p>
            </div>
          </div>

          {/* Middle 3-Step Flow Connector (Curved line with 3 nodes) */}
          <div className="hero__flow" aria-hidden="true">
            <svg className="hero__flow-line" viewBox="0 0 120 260" fill="none">
              <path
                d="M20 20 Q100 130 20 240"
                stroke="#7DBD35"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.6"
              />
            </svg>
            <div className="hero__flow-node hero__flow-node--1">
              <div className="hero__flow-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#13A3A1" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <path d="M14 14h3v3h-3zM17 17h3v3h-3z" />
                </svg>
              </div>
              <div className="hero__flow-text">
                <span className="hero__flow-title">Escanea</span>
                <span className="hero__flow-sub">el QR</span>
              </div>
            </div>

            <div className="hero__flow-node hero__flow-node--2">
              <div className="hero__flow-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ACD32" strokeWidth="2">
                  <path d="M10 2h4v3h-4zM9 5h6l2 4v11a2 2 0 01-2 2H9a2 2 0 01-2-2V9l2-4z" />
                  <path d="M12 11v6M9 14l3 3 3-3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="hero__flow-text">
                <span className="hero__flow-title">Deposita</span>
                <span className="hero__flow-sub">tu botella PET</span>
              </div>
            </div>

            <div className="hero__flow-node hero__flow-node--3">
              <div className="hero__flow-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#13A3A1" strokeWidth="2">
                  <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
                </svg>
              </div>
              <div className="hero__flow-text">
                <span className="hero__flow-title">Gana puntos</span>
                <span className="hero__flow-sub">y canjéalos</span>
              </div>
            </div>
          </div>

          {/* Right Column (VoxStation + Phone Visual) */}
          <div className="hero__right">
            <div className="hero__visual-container">
              {/* Teal Glow aura behind station */}
              <div className="hero__station-glow" />

              {/* VoxStation Main Graphic (SVG inspired by reference photo) */}
              <div className="hero__station-wrapper">
                <svg
                  viewBox="0 0 340 460"
                  fill="none"
                  className="hero__station-svg"
                  aria-label="VoxStation Estación de Reciclaje EXOVOX"
                >
                  {/* Top Roof Roof overhang */}
                  <rect x="30" y="38" width="280" height="22" rx="6" fill="#08485A" stroke="#13A3A1" strokeWidth="1.5" />
                  <rect x="34" y="42" width="272" height="6" rx="3" fill="#9ACD32" />
                  {/* Spotlights under roof */}
                  <circle cx="100" cy="64" r="3" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="170" cy="64" r="3" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="240" cy="64" r="3" fill="#FFFFFF" opacity="0.9" />

                  {/* Top Brand Box Header */}
                  <rect x="65" y="60" width="210" height="90" rx="10" fill="#063747" stroke="#13A3A1" strokeWidth="1.5" />
                  {/* Paceño Geometric Pattern on Header Top */}
                  <path d="M70 65L80 75L90 65L100 75L110 65" stroke="rgba(19,163,161,0.3)" strokeWidth="1.5" />
                  <path d="M230 65L240 75L250 65L260 75L270 65" stroke="rgba(19,163,161,0.3)" strokeWidth="1.5" />
                  {/* Logo Icon on Header */}
                  <path d="M152 82L162 70L172 82H152Z" fill="#5DAE32" />
                  <path d="M164 82L174 67L184 82H164Z" fill="#9ACD32" />
                  <circle cx="178" cy="65" r="3" fill="#F7C62F" />
                  <path d="M148 86C156 84.5 164 87.5 172 86C176 85.2 180 85.5 184 86" stroke="#13A3A1" strokeWidth="2" strokeLinecap="round" />
                  <text x="170" y="112" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="24" fill="#FFFFFF">
                    EXO<tspan fill="#9ACD32">VOX</tspan>
                  </text>
                  <text x="170" y="132" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="9" fill="#B8CDD0" letterSpacing="0.1em">
                    VOXSTATION
                  </text>

                  {/* Main Station Outer Structure Body */}
                  <rect x="50" y="150" width="240" height="290" rx="14" fill="#032B3A" stroke="#087D83" strokeWidth="2" />

                  {/* Side Geometric Paceño Relief Pattern (Left border accents) */}
                  <g opacity="0.85">
                    <path d="M52 170L62 180L52 190" stroke="#9ACD32" strokeWidth="2.5" fill="none" />
                    <path d="M52 200L62 210L52 220" stroke="#13A3A1" strokeWidth="2.5" fill="none" />
                    <path d="M52 230L62 240L52 250" stroke="#F7C62F" strokeWidth="2.5" fill="none" />
                    <path d="M52 260L62 270L52 280" stroke="#F39A22" strokeWidth="2.5" fill="none" />
                    <path d="M52 290L62 300L52 310" stroke="#5DAE32" strokeWidth="2.5" fill="none" />
                  </g>

                  {/* Inner Front White/Light Panel */}
                  <rect x="70" y="165" width="200" height="260" rx="10" fill="#F3F5EF" />

                  {/* Header Title on Panel */}
                  <text x="170" y="190" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="15" fill="#032B3A" letterSpacing="0.05em">
                    RECICLA Y GANA
                  </text>

                  {/* Left Compartment: Display Screen & Camera */}
                  <rect x="80" y="202" width="85" height="120" rx="8" fill="#063747" stroke="#13A3A1" strokeWidth="1.5" />
                  {/* Camera lens */}
                  <circle cx="122.5" cy="225" r="10" fill="#032B3A" stroke="#13A3A1" strokeWidth="1.5" />
                  <circle cx="122.5" cy="225" r="4" fill="#9ACD32" />
                  {/* Bottle Icon diagram */}
                  <path d="M100 255h10v6l3 5v30a2 2 0 01-2 2h-12a2 2 0 01-2-2v-30l3-5v-6z" fill="none" stroke="#B8CDD0" strokeWidth="1.5" />
                  <path d="M125 255h18v40h-18z" fill="none" stroke="#B8CDD0" strokeWidth="1.5" strokeDasharray="2 2" />

                  {/* Right Compartment: Main PET Deposit Opening */}
                  <rect x="175" y="202" width="85" height="120" rx="12" fill="#032B3A" stroke="#5DAE32" strokeWidth="2" />
                  {/* Inner Deposit Hole with Glow */}
                  <circle cx="217.5" cy="262" r="32" fill="#021F2A" stroke="#13A3A1" strokeWidth="2" />
                  {/* Recycle Icon inside slot */}
                  <path d="M217.5 246L222 254H213L217.5 246Z" fill="#9ACD32" />
                  <path d="M228 266L222 274L218 266" stroke="#9ACD32" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M207 266L213 274L217 266" stroke="#9ACD32" strokeWidth="2" fill="none" strokeLinecap="round" />

                  {/* Status Indicator LED */}
                  <circle cx="60" cy="310" r="5" fill="#9ACD32">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>

                  {/* Bottom Graphic Instructions on White Panel */}
                  <rect x="80" y="335" width="180" height="75" rx="6" fill="#FFFFFF" stroke="#B8CDD0" strokeWidth="1" />
                  <text x="110" y="355" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="7.5" fill="#032B3A">1. DEPOSITA</text>
                  <text x="110" y="365" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6.5" fill="#087D83">TUS ENVASES</text>

                  <text x="170" y="355" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="7.5" fill="#032B3A">2. RECICLA</text>
                  <text x="170" y="365" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6.5" fill="#5DAE32">CON EXOVOX</text>

                  <text x="230" y="355" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="7.5" fill="#032B3A">3. SUMA PUNTOS</text>
                  <text x="230" y="365" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6.5" fill="#F7C62F">Y GANA PREMIOS</text>
                </svg>
              </div>

              {/* Mobile / App Phone Mockup (Front Right) */}
              <div className="hero__phone-wrapper">
                <div className="hero__phone-card">
                  {/* Top Phone Speaker / Camera Notch */}
                  <div className="hero__phone-notch" />

                  {/* Phone Screen Header */}
                  <div className="hero__phone-header">
                    <span className="hero__phone-time">3:01</span>
                    <span className="hero__phone-signal">5G 🔋</span>
                  </div>

                  {/* App Greeting */}
                  <div className="hero__phone-body">
                    <div className="hero__phone-title">¡Bien hecho!</div>
                    <div className="hero__phone-sub">Tu reciclaje tiene voz 🌿</div>

                    {/* Central Points Badge */}
                    <div className="hero__phone-badge">
                      <div className="hero__phone-pts-val">+10</div>
                      <div className="hero__phone-pts-lbl">PUNTOS</div>
                    </div>
                    <div className="hero__phone-status">Botella PET aceptada</div>

                    {/* Impact Metrics Row */}
                    <div className="hero__phone-metrics">
                      <div className="hero__phone-metric">
                        <span className="hero__phone-m-val">12</span>
                        <span className="hero__phone-m-lbl">Envases</span>
                      </div>
                      <div className="hero__phone-metric">
                        <span className="hero__phone-m-val">1.2 kg</span>
                        <span className="hero__phone-m-lbl">CO₂ evitado</span>
                      </div>
                      <div className="hero__phone-metric">
                        <span className="hero__phone-m-val">120</span>
                        <span className="hero__phone-m-lbl">Puntos</span>
                      </div>
                    </div>

                    {/* Ver recompensas button */}
                    <div className="hero__phone-btn">
                      <span>Ver recompensas</span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3l5 5-5 5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero Trust Strip / Indicators */}
        <div className="hero__trust-strip">
          <div className="hero__trust-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ACD32" strokeWidth="1.8">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p>
              Diseñado para conectar <strong>ciudadanía</strong>, <strong>empresas</strong>,{' '}
              <strong>espacios anfitriones</strong>, <strong>municipio</strong> y{' '}
              <strong>recicladores de base</strong>.
            </p>
          </div>

          <div className="hero__trust-divider" aria-hidden="true" />

          <div className="hero__trust-indicators">
            <div className="hero__trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ACD32" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
              </svg>
              <span>Tecnología con propósito</span>
            </div>

            <div className="hero__trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ACD32" strokeWidth="2">
                <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
              </svg>
              <span>Beneficios reales</span>
            </div>

            <div className="hero__trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ACD32" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
              <span>Impacto verificable</span>
            </div>

            <div className="hero__trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ACD32" strokeWidth="2">
                <path d="M3 20h18L12 4z" />
                <path d="M12 11l4 9H8z" />
              </svg>
              <span>Hecho en La Paz</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
