export default function Footer() {
  return (
    <footer className="footer">
      <div className="section footer__inner">
        <div className="footer__brand">
          <svg width="120" height="30" viewBox="0 0 140 34" fill="none" aria-hidden="true">
            <rect x="0" y="4" width="26" height="26" rx="6" fill="url(#footer-logo-grad)" />
            <path d="M8 17l4 4 6-8" stroke="#0a0e27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="34" y="25" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="22" fill="white">
              EXO<tspan fill="#FFB800">VOX</tspan>
            </text>
            <defs>
              <linearGradient id="footer-logo-grad" x1="0" y1="4" x2="26" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFB800" />
                <stop offset="1" stopColor="#FF6B4A" />
              </linearGradient>
            </defs>
          </svg>
          <p className="footer__tagline">Tu reciclaje tiene voz.</p>
          <p className="footer__location">📍 La Paz, Bolivia</p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Secciones</h4>
            <ul>
              <li><a href="#como-funciona">Cómo funciona</a></li>
              <li><a href="#recompensas">Recompensas</a></li>
              <li><a href="#impacto">Impacto</a></li>
              <li><a href="#empresas">Para empresas</a></li>
              <li><a href="#faq">Preguntas</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacidad">Privacidad</a></li>
              <li><a href="#terminos">Términos de uso</a></li>
              <li><a href="#bases-piloto">Bases del piloto</a></li>
              <li><a href="#accesibilidad">Accesibilidad</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href="mailto:hola@exovox.com">hola@exovox.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} EXOVOX. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
