import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Hero({
  onOpenAllyForm,
}: {
  onOpenAllyForm: () => void
}) {
  const [videoEnded, setVideoEnded] = useState(false)

  return (
    <section className="hero" id="hero">
      {/* Full-screen product video background */}
      <div className="hero__bg" aria-hidden="true">
        <img
          src="/img/final%20home.png"
          alt=""
          className="hero__background-image"
        />
        <video
          src="/video/video ekovox.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => setVideoEnded(true)}
          onError={() => setVideoEnded(true)}
          className={`hero__background-video ${videoEnded ? 'hero__background-video--ended' : ''}`}
        />
        <div className="hero__gradient" />
      </div>

      <div className="hero__container">
        {/* Main foreground content */}
        <div className="hero__main">
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
              <Link
                to="/demo"
                className="btn btn-hero-primary"
              >
                <span>Probar demo</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4.166 10h11.667M10 4.166L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

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
                Explora la demo interactiva de la app EXOVOX.
              </p>
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
