import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import './DemoPage.css'

/* ─── Types ─────────────────────────────────────── */
type Screen =
  | 'splash' | 'onboarding' | 'auth' | 'auth-code' | 'auth-profile'
  | 'home' | 'locations' | 'points' | 'profile'
  | 'station-detail' | 'scanner' | 'session' | 'session-summary'
  | 'reward-detail' | 'coupons' | 'impact' | 'history'
  | 'preferences' | 'privacy' | 'notifications'

interface Station {
  id: number
  name: string
  address: string
  distance: string
  status: 'available' | 'almost-full' | 'offline' | 'closed'
  statusText: string
  host: string
  hours: string
  material: string
  accessibility: string
  lastUpdate: string
}

interface Reward {
  id: number
  icon: string
  name: string
  partner: string
  cost: number
  stock: string
  stockColor: string
  validity: string
  description: string
}

interface DepositEvent {
  type: 'idle' | 'validating' | 'accepted' | 'rejected'
  message: string
  points?: number
}

/* ─── Mock Data ─────────────────────────────────── */
const STATIONS: Station[] = [
  { id: 1, name: 'VoxStation Campus UMSA', address: 'Av. Villazón, Monoblock Central', distance: '350m', status: 'available', statusText: 'Disponible', host: 'Universidad Mayor de San Andrés', hours: 'Lun-Sáb 8:00-20:00', material: 'Botellas PET vacías sin aplastar', accessibility: 'Acceso en planta baja', lastUpdate: 'Hace 5 min' },
  { id: 2, name: 'VoxStation Megacenter', address: 'Av. Rafael Pabón, Irpavi', distance: '1.2km', status: 'available', statusText: 'Disponible', host: 'Megacenter La Paz', hours: 'Lun-Dom 10:00-22:00', material: 'Botellas PET vacías sin aplastar', accessibility: 'Acceso con rampa', lastUpdate: 'Hace 3 min' },
  { id: 3, name: 'VoxStation Plaza Avaroa', address: 'C. Rosendo Gutiérrez, Sopocachi', distance: '2.1km', status: 'almost-full', statusText: 'Casi llena', host: 'Alcaldía de La Paz', hours: 'Lun-Vie 7:00-19:00', material: 'Botellas PET vacías sin aplastar', accessibility: 'Acceso libre', lastUpdate: 'Hace 12 min' },
  { id: 4, name: 'VoxStation Sopocachi', address: 'Av. 6 de Agosto #2450', distance: '3.4km', status: 'offline', statusText: 'Fuera de servicio', host: 'Café Typica', hours: 'Lun-Sáb 9:00-21:00', material: 'Botellas PET vacías sin aplastar', accessibility: 'Acceso en planta baja', lastUpdate: 'Hace 2 horas' },
  { id: 5, name: 'VoxStation San Miguel', address: 'C. 21, Calacoto', distance: '5.8km', status: 'closed', statusText: 'Cerrada por horario', host: 'Centro Comercial San Miguel', hours: 'Lun-Sáb 8:00-20:00', material: 'Botellas PET vacías sin aplastar', accessibility: 'Nivel subsuelo con ascensor', lastUpdate: 'Hace 1 hora' },
]

const REWARDS: Reward[] = [
  { id: 1, icon: 'local_cafe', name: 'Café gratis', partner: 'La Paz Coffee', cost: 80, stock: 'Disponible', stockColor: '#7DBD35', validity: 'Hasta 30/09', description: 'Un café americano o latte de tamaño regular en cualquier sucursal de La Paz Coffee.' },
  { id: 2, icon: 'movie', name: '2x1 Cine', partner: 'Multicine', cost: 120, stock: 'Disponible', stockColor: '#7DBD35', validity: 'Hasta 15/10', description: 'Dos entradas por el precio de una en cualquier función regular de lunes a jueves.' },
  { id: 3, icon: 'shopping_cart', name: 'Bs 10 descuento', partner: 'Supermercado Ketal', cost: 150, stock: 'Poco stock', stockColor: '#F7C62F', validity: 'Hasta 30/09', description: 'Descuento de Bs 10 en compras mayores a Bs 50 en cualquier sucursal Ketal.' },
  { id: 4, icon: 'smartphone', name: 'Recarga Bs 5', partner: 'Tigo', cost: 50, stock: 'Disponible', stockColor: '#7DBD35', validity: 'Hasta 31/10', description: 'Recarga de Bs 5 de saldo para tu línea Tigo. Se aplica en 24 horas.' },
  { id: 5, icon: 'local_pizza', name: 'Pizza personal', partner: 'Pizza Hut', cost: 200, stock: 'No elegible', stockColor: '#ff6b6b', validity: 'Hasta 30/09', description: 'Una pizza personal de un ingrediente en cualquier sucursal Pizza Hut La Paz.' },
  { id: 6, icon: 'confirmation_number', name: 'Entrada museo', partner: 'Museo Nacional', cost: 60, stock: 'Próximamente', stockColor: '#7c84a3', validity: 'Por confirmar', description: 'Entrada general al Museo Nacional de Arte, válida cualquier día de la semana.' },
]

const ONBOARDING_SLIDES = [
  { icon: 'recycling', title: 'Recicla botellas PET', desc: 'Deposita tus botellas vacías en una VoxStation cerca de ti y contribuye al reciclaje en La Paz.' },
  { icon: 'qr_code_scanner', title: 'Escanea una VoxStation', desc: 'Abre la app, escanea el QR de la estación y comienza a depositar envases uno a uno.' },
  { icon: 'stars', title: 'Suma puntos y canjea', desc: 'Cada botella aceptada suma VoxPuntos que puedes canjear por beneficios de empresas aliadas.' },
  { icon: 'public', title: 'Sigue tu impacto', desc: 'Conoce cuántos envases has reciclado, el peso recuperado y el destino del material.' },
]

/* ─── Material Symbols Helper ───────────────────── */
function MatIcon({ name, className = '', style }: { name: string; className?: string; style?: React.CSSProperties }) {
  return <span className={`material-symbols-rounded ${className}`} style={style} aria-hidden="true">{name}</span>
}

/* ─── Component ─────────────────────────────────── */
export default function DemoPage() {
  // Navigation state
  const [screen, setScreen] = useState<Screen>('splash')
  const [, setScreenStack] = useState<Screen[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  // Layout & Video Animation state
  const [phonePosition, setPhonePosition] = useState<'center' | 'right' | 'left'>('center')
  const [bgVideo, setBgVideo] = useState<string | null>(null)
  const [bgBlur, setBgBlur] = useState<boolean>(false)

  // App state
  const [points, setPoints] = useState(150)
  const [showBalance, setShowBalance] = useState(true)
  const [totalDeposits, setTotalDeposits] = useState(20)
  const [onboardingPage, setOnboardingPage] = useState(0)

  /* Preserved auth state for future demo activation:
  const [authMode, setAuthMode] = useState<'phone' | 'email'>('phone')
  const [authStep, setAuthStep] = useState<'input' | 'code' | 'profile'>('input')
  */
  const [locationView, setLocationView] = useState<'map' | 'list'>('list')
  const [pointsTab, setPointsTab] = useState<'movements' | 'rewards'>('movements')
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [couponsTab, setCouponsTab] = useState<'available' | 'used' | 'expired'>('available')

  // Session state
  const [sessionTime, setSessionTime] = useState(0)
  const [sessionAccepted, setSessionAccepted] = useState(0)
  const [sessionRejected, setSessionRejected] = useState(0)
  const [sessionPoints, setSessionPoints] = useState(0)
  const [sessionEvents, setSessionEvents] = useState<DepositEvent[]>([])

  // UI state
  const [toast, setToast] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)
  const [confirmText, setConfirmText] = useState({ title: '', desc: '' })
  const [showQR, setShowQR] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>(['Disponible'])
  const [movementFilter, setMovementFilter] = useState('Todos')

  // Preferences
  const [prefTransactional, setPrefTransactional] = useState(true)
  const [prefOperative, setPrefOperative] = useState(true)
  const [prefRewards, setPrefRewards] = useState(true)
  const [prefMarketing, setPrefMarketing] = useState(false)

  // Refs
  const scanTransitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sessionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const depositTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const touchStartX = useRef(0)

  // ─── Navigation helpers ──────────────────────────
  const pushScreen = useCallback((s: Screen) => {
    setScreenStack(prev => [...prev, screen])
    setScreen(s)
  }, [screen])

  const popScreen = useCallback(() => {
    setScreenStack(prev => {
      const newStack = [...prev]
      const last = newStack.pop()
      if (last) setScreen(last)
      return newStack
    })
  }, [])

  const goToTab = useCallback((s: Screen) => {
    setScreenStack([])
    setScreen(s)
  }, [])

  // ─── Toast helper ────────────────────────────────
  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }, [])

  // ─── Scan Trigger Handler ────────────────────────
  // Al presionar el botón de escanear mueve el teléfono al borde derecho,
  // reproduce 'demo_qr_escaner.mp4' en el background con desenfoque focalizado detrás del teléfono,
  // y espera 3 segundos para cambiar a la pantalla de cámara escáner QR.
  const handleStartScan = useCallback(() => {
    setPhonePosition('right')
    setBgVideo('/video/demo_qr_escaner.mp4')
    setBgBlur(true)

    if (scanTransitionTimerRef.current) clearTimeout(scanTransitionTimerRef.current)
    scanTransitionTimerRef.current = setTimeout(() => {
      setScreen('scanner')
      setScreenStack([])
    }, 3000)
  }, [])

  // ─── Close / Cancel Scanner ──────────────────────
  const handleCloseScanner = useCallback(() => {
    if (scanTransitionTimerRef.current) clearTimeout(scanTransitionTimerRef.current)
    setBgVideo(null)
    setBgBlur(false)
    setPhonePosition('center')
    goToTab('home')
  }, [goToTab])

  // ─── End Session Handler ─────────────────────────
  // Regresa el teléfono al centro, apaga video de fondo y navega de vuelta a home
  const handleEndSession = useCallback(() => {
    if (sessionTimerRef.current) clearInterval(sessionTimerRef.current)
    depositTimeoutsRef.current.forEach(t => clearTimeout(t))
    depositTimeoutsRef.current = []

    setPoints(p => p + sessionPoints)
    setTotalDeposits(d => d + sessionAccepted)
    setBgVideo(null)
    setBgBlur(false)
    setPhonePosition('center')
    goToTab('home')
    showToast(`¡Sesión terminada! Has sumado +${sessionPoints} VoxPuntos`)
  }, [sessionPoints, sessionAccepted, goToTab, showToast])

  // ─── Locations Video (demo_map.mp4 sin desenfoque)
  // Agrega el video 'demo_map.mp4' cuando se entre a la sección de ubicaciones, sin desenfoque
  useEffect(() => {
    if (screen === 'locations') {
      setBgVideo('/video/demo_map.mp4')
      setBgBlur(false)
    } else if (screen !== 'scanner' && screen !== 'session') {
      // Si sale de ubicaciones y no está en el flujo de escaneo/sesión, apagar el video de mapa
      if (bgVideo === '/video/demo_map.mp4') {
        setBgVideo(null)
        setBgBlur(false)
      }
    }
  }, [screen, bgVideo])

  // ─── Splash auto-transition ──────────────────────
  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('onboarding'), 2000)
      return () => clearTimeout(t)
    }
  }, [screen])

  // ─── Scanner auto-transition (3s) ────────────────
  // En lugar de pantalla negra, se reproduce demo_qr_escaner_first_person.mp4
  // y tras 3 segundos pasa automáticamente a la pantalla de sesión de reciclaje.
  useEffect(() => {
    if (screen === 'scanner') {
      const t = setTimeout(() => {
        setScreen('session')
        setScreenStack([])
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [screen])

  // ─── Session: Mover a la izquierda, video botellas y 20s
  // Al entrar a Sesión de reciclaje mueve la pantalla a la izquierda,
  // transiciona el video del fondo a demo_qr_botellas.mp4
  // y abarca exactamente 20 segundos de ingreso de botellas.
  // Una vez terminada regresa el teléfono al centro y navega de vuelta a home.
  useEffect(() => {
    if (screen !== 'session') return

    // Mueve la pantalla a la izquierda y transiciona video de fondo a botellas
    setPhonePosition('left')
    setBgVideo('/video/demo_qr_botellas.mp4')
    setBgBlur(true)

    setSessionTime(0)
    setSessionAccepted(0)
    setSessionRejected(0)
    setSessionPoints(0)
    setSessionEvents([{ type: 'idle', message: 'Acerca una botella a la compuerta' }])

    // Timer de 20 segundos (1 segundo por tick)
    sessionTimerRef.current = setInterval(() => {
      setSessionTime(t => Math.min(t + 1, 20))
    }, 1000)

    // Cronograma exacto de depósitos durante los 20s
    depositTimeoutsRef.current.forEach(t => clearTimeout(t))
    depositTimeoutsRef.current = []

    // Botella 1 (Validación t=2.5s, Aceptada t=4.5s)
    depositTimeoutsRef.current.push(setTimeout(() => {
      setSessionEvents(prev => [...prev, { type: 'validating', message: 'Validando botella 1/4...' }])
    }, 2500))

    depositTimeoutsRef.current.push(setTimeout(() => {
      setSessionEvents(prev => [...prev.filter(e => e.type !== 'validating'), { type: 'accepted', message: 'Botella aceptada: +15 puntos', points: 15 }])
      setSessionAccepted(1)
      setSessionPoints(15)
    }, 4500))

    // Botella 2 (Validación t=7.5s, Aceptada t=9.5s)
    depositTimeoutsRef.current.push(setTimeout(() => {
      setSessionEvents(prev => [...prev, { type: 'validating', message: 'Validando botella 2/4...' }])
    }, 7500))

    depositTimeoutsRef.current.push(setTimeout(() => {
      setSessionEvents(prev => [...prev.filter(e => e.type !== 'validating'), { type: 'accepted', message: 'Botella aceptada: +15 puntos', points: 15 }])
      setSessionAccepted(2)
      setSessionPoints(30)
    }, 9500))

    // Botella 3 (Validación t=12.0s, Rechazo t=14.0s)
    depositTimeoutsRef.current.push(setTimeout(() => {
      setSessionEvents(prev => [...prev, { type: 'validating', message: 'Validando botella 3/4...' }])
    }, 12000))

    depositTimeoutsRef.current.push(setTimeout(() => {
      setSessionEvents(prev => [...prev.filter(e => e.type !== 'validating'), { type: 'rejected', message: 'La botella todavía tiene líquido', points: 0 }])
      setSessionRejected(1)
    }, 14000))

    // Botella 4 (Validación t=16.5s, Aceptada t=18.5s)
    depositTimeoutsRef.current.push(setTimeout(() => {
      setSessionEvents(prev => [...prev, { type: 'validating', message: 'Validando botella 4/4...' }])
    }, 16500))

    depositTimeoutsRef.current.push(setTimeout(() => {
      setSessionEvents(prev => [...prev.filter(e => e.type !== 'validating'), { type: 'accepted', message: 'Botella aceptada: +15 puntos', points: 15 }])
      setSessionAccepted(3)
      setSessionPoints(45)
    }, 18500))

    // t = 20.0s (Terminación exacta de la sesión a los 20 segundos)
    depositTimeoutsRef.current.push(setTimeout(() => {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current)
      setPoints(p => p + 45)
      setTotalDeposits(d => d + 3)
      setBgVideo(null)
      setBgBlur(false)
      setPhonePosition('center')
      goToTab('home')
      showToast('¡Sesión completada! Has reciclado 3 botellas (+45 VoxPuntos)')
    }, 20000))

    return () => {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current)
      depositTimeoutsRef.current.forEach(t => clearTimeout(t))
      depositTimeoutsRef.current = []
    }
  }, [screen, goToTab, showToast])

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  // ─── Onboarding swipe ───────────────────────────
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0 && onboardingPage < 3) setOnboardingPage(p => p + 1)
      if (diff < 0 && onboardingPage > 0) setOnboardingPage(p => p - 1)
    }
  }

  // ─── Confirm modal ──────────────────────────────
  const openConfirm = (title: string, desc: string, action: () => void) => {
    setConfirmText({ title, desc })
    setConfirmAction(() => action)
    setShowConfirm(true)
  }

  // ─── Status helper ──────────────────────────────
  const statusClass = (status: string) => {
    switch (status) {
      case 'available': return 'demo-status--available'
      case 'almost-full': return 'demo-status--almost-full'
      case 'offline': return 'demo-status--offline'
      case 'closed': return 'demo-status--closed'
      default: return ''
    }
  }

  // ─── QR mock pattern ────────────────────────────
  const qrPattern = [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1]

  /* ═════════════════════════════════════════════════
     RENDER SCREENS
     ═════════════════════════════════════════════════ */

  const renderScreen = () => {
    switch (screen) {
      // ─── SPLASH ────────────────────────────
      case 'splash':
        return (
          <div className="demo-screen demo-splash">
            <div className="demo-splash__logo">EKO<span>VOX</span></div>
            <p className="demo-splash__tagline">Tu reciclaje tiene voz.</p>
            <div className="demo-splash__spinner" />
            <span className="demo-splash__version">v1.0.0-beta</span>
          </div>
        )

      // ─── ONBOARDING ───────────────────────
      case 'onboarding':
        return (
          <div className="demo-screen demo-onboarding" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <button className="demo-onboarding__skip" onClick={() => { setIsLoggedIn(true); goToTab('home') }}>
              Omitir
            </button>
            <div className="demo-onboarding__slides" key={onboardingPage}>
              <div className="demo-onboarding__icon-container">
                <MatIcon name={ONBOARDING_SLIDES[onboardingPage].icon} className="demo-onboarding__icon-symbol" />
              </div>
              <h2 className="demo-onboarding__title">{ONBOARDING_SLIDES[onboardingPage].title}</h2>
              <p className="demo-onboarding__desc">{ONBOARDING_SLIDES[onboardingPage].desc}</p>
            </div>
            <div className="demo-onboarding__dots">
              {ONBOARDING_SLIDES.map((_, i) => (
                <div key={i} className={`demo-onboarding__dot ${i === onboardingPage ? 'demo-onboarding__dot--active' : ''}`} />
              ))}
            </div>
            <button className="demo-onboarding__btn" onClick={() => {
              if (onboardingPage < 3) setOnboardingPage(p => p + 1)
              else { setIsLoggedIn(true); goToTab('home') }
            }}>
              {onboardingPage < 3 ? 'Siguiente' : 'Comenzar'}
            </button>
          </div>
        )

      /* ─── AUTH (PANTALLAS COMENTADAS PARA LA DEMO) ──────────────
      case 'auth':
        return (
          <div className="demo-screen demo-auth">
            ...
          </div>
        )
      ──────────────────────────────────────────────────────────── */

      // ─── HOME ──────────────────────────────
      case 'home':
        return (
          <div className="demo-screen demo-home">
            {/* Top Header */}
            <div className="demo-home__header">
              <div className="demo-home__header-left">
                <button className="demo-home__profile-circle" onClick={() => goToTab('profile')} title="Ver perfil">
                  <MatIcon name="person" style={{ fontSize: 22 }} />
                </button>
                <div className="demo-home__user-titles">
                  <span className="demo-home__greeting-sub">Buenas noches</span>
                  <h1 className="demo-home__greeting-name">{isLoggedIn ? 'Camila' : 'Visitante'}</h1>
                </div>
              </div>

              <div className="demo-home__header-right">
                <button className="demo-home__action-circle" onClick={() => showToast('Centro de soporte EKOVOX')} title="Soporte">
                  <MatIcon name="support_agent" style={{ fontSize: 20 }} />
                </button>
                <button className="demo-home__action-circle demo-home__action-circle--badge" onClick={() => pushScreen('notifications')} title="Notificaciones">
                  <MatIcon name="notifications" style={{ fontSize: 20 }} />
                  <span className="demo-home__badge-dot" />
                </button>
              </div>
            </div>

            {/* Large Rounded Balance Card */}
            <div className="demo-balance-card">
              <div className="demo-balance-card__top">
                <div className="demo-balance-card__brand">
                  EKO<span>VOX</span>
                </div>
                <div className="demo-balance-card__id">EVX-60558</div>
              </div>

              <div className="demo-balance-card__bottom">
                <div className="demo-balance-card__info">
                  <span className="demo-balance-card__label">Tu saldo disponible:</span>
                  <div className="demo-balance-card__amount-row">
                    <span className="demo-balance-card__unit">Pts</span>
                    <span className="demo-balance-card__amount">{showBalance ? points : '••••'}</span>
                  </div>
                </div>

                <button
                  className={`demo-pill-toggle ${showBalance ? 'demo-pill-toggle--on' : 'demo-pill-toggle--off'}`}
                  onClick={() => setShowBalance(!showBalance)}
                  title={showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
                >
                  <span className="demo-pill-toggle__circle" />
                </button>
              </div>
            </div>

            {/* 3 Quick Action Cards */}
            <div className="demo-quick-grid">
              <div className="demo-quick-card" onClick={handleStartScan}>
                <div className="demo-quick-card__icon-wrap demo-quick-card__icon-wrap--green">
                  <MatIcon name="qr_code_scanner" />
                </div>
                <span className="demo-quick-card__title">Escanear</span>
                <span className="demo-quick-card__subtitle">Depositar</span>
              </div>

              <div className="demo-quick-card" onClick={() => goToTab('locations')}>
                <div className="demo-quick-card__icon-wrap demo-quick-card__icon-wrap--teal">
                  <MatIcon name="explore" />
                </div>
                <span className="demo-quick-card__title">Estaciones</span>
                <span className="demo-quick-card__subtitle">Ver mapa</span>
              </div>

              <div className="demo-quick-card" onClick={() => goToTab('points')}>
                <div className="demo-quick-card__icon-wrap demo-quick-card__icon-wrap--yellow">
                  <MatIcon name="card_giftcard" />
                </div>
                <span className="demo-quick-card__title">Canjear</span>
                <span className="demo-quick-card__subtitle">Beneficios</span>
              </div>
            </div>

            {/* Two Wide Pill Action Buttons */}
            <div className="demo-pill-actions">
              <button className="demo-pill-btn demo-pill-btn--primary" onClick={handleStartScan}>
                <MatIcon name="qr_code_scanner" style={{ fontSize: 20 }} />
                <span>Escanear QR</span>
              </button>
              <button className="demo-pill-btn demo-pill-btn--secondary" onClick={() => goToTab('locations')}>
                <MatIcon name="near_me" style={{ fontSize: 20 }} />
                <span>Buscar VoxStation</span>
              </button>
            </div>

            {/* Nearby Station Section */}
            <div className="demo-section-label">Estación cercana</div>
            <div className="demo-station-card" onClick={() => { setSelectedStation(STATIONS[0]); pushScreen('station-detail') }}>
              <div className="demo-station-card__icon">
                <MatIcon name="location_on" style={{ fontSize: 22 }} />
              </div>
              <div className="demo-station-card__info">
                <div className="demo-station-card__name">{STATIONS[0].name}</div>
                <div className="demo-station-card__meta">{STATIONS[0].distance} · {STATIONS[0].address}</div>
              </div>
              <span className={`demo-station-card__status ${statusClass(STATIONS[0].status)}`}>{STATIONS[0].statusText}</span>
            </div>

            {/* Challenge Card */}
            <div className="demo-challenge">
              <div className="demo-challenge__tag">
                <MatIcon name="flag" style={{ fontSize: 14, marginRight: 4 }} />
                Reto activo
              </div>
              <div className="demo-challenge__title">Reto Septiembre</div>
              <div className="demo-challenge__desc">Recicla 20 botellas este mes</div>
              <div className="demo-challenge__bar">
                <div className="demo-challenge__bar-fill" style={{ width: `${Math.min((totalDeposits / 20) * 100, 100)}%` }} />
              </div>
              <div className="demo-challenge__progress">{Math.min(totalDeposits, 20)}/20</div>
            </div>

            {/* Recent Activity */}
            <div className="demo-section-label">Actividad reciente</div>
            {[
              { icon: 'recycling', name: 'Sesión de reciclaje', pts: '+45', time: 'Hace 2 días', earn: true },
              { icon: 'local_cafe', name: 'Canje: Café gratis', pts: '-80', time: 'Hace 5 días', earn: false },
              { icon: 'recycling', name: 'Sesión de reciclaje', pts: '+30', time: 'Hace 1 semana', earn: true },
            ].map((a, i) => (
              <div key={i} className="demo-activity">
                <div className={`demo-activity__icon ${a.earn ? 'demo-activity__icon--earn' : 'demo-activity__icon--spend'}`}>
                  <MatIcon name={a.icon} style={{ fontSize: 20 }} />
                </div>
                <div className="demo-activity__info">
                  <div className="demo-activity__name">{a.name}</div>
                  <div className="demo-activity__time">{a.time}</div>
                </div>
                <span className={`demo-activity__pts ${a.earn ? 'demo-activity__pts--pos' : 'demo-activity__pts--neg'}`}>{a.pts}</span>
              </div>
            ))}

            {/* Featured Reward */}
            <div style={{ marginTop: 12 }}>
              <div className="demo-reward-card" onClick={() => { setSelectedReward(REWARDS[0]); pushScreen('reward-detail') }}>
                <div className="demo-reward-card__icon">
                  <MatIcon name="local_cafe" style={{ fontSize: 22 }} />
                </div>
                <div className="demo-reward-card__info">
                  <div className="demo-reward-card__name">Recompensa destacada</div>
                  <div className="demo-reward-card__partner">Café gratis · 80 pts</div>
                </div>
                <MatIcon name="chevron_right" style={{ color: 'var(--ev-text-muted)' }} />
              </div>
            </div>
          </div>
        )

      // ─── LOCATIONS ─────────────────────────
      case 'locations':
        return (
          <div className="demo-screen demo-locations">
            <h1 className="demo-home__greeting" style={{ marginBottom: 16 }}>Ubicaciones</h1>

            <div className="demo-locations__search-wrap">
              <span className="demo-locations__search-icon"><MatIcon name="search" style={{ fontSize: 20 }} /></span>
              <input className="demo-locations__search" placeholder="Buscar zona o lugar..." readOnly style={{ paddingLeft: 42 }} />
            </div>

            <div className="demo-locations__toggle">
              <button className={`demo-locations__toggle-btn ${locationView === 'map' ? 'demo-locations__toggle-btn--active' : ''}`} onClick={() => setLocationView('map')}>
                <MatIcon name="map" style={{ fontSize: 18, marginRight: 6 }} />
                Mapa
              </button>
              <button className={`demo-locations__toggle-btn ${locationView === 'list' ? 'demo-locations__toggle-btn--active' : ''}`} onClick={() => setLocationView('list')}>
                <MatIcon name="format_list_bulleted" style={{ fontSize: 18, marginRight: 6 }} />
                Lista
              </button>
            </div>

            <div className="demo-filters">
              {['Disponible', 'Cerca', 'Abierto ahora'].map(f => (
                <button key={f} className={`demo-filter-chip ${activeFilters.includes(f) ? 'demo-filter-chip--active' : ''}`}
                  onClick={() => setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])}>
                  {f}
                </button>
              ))}
            </div>

            {locationView === 'map' ? (
              <div className="demo-map">
                <div className="demo-map__grid" />
                <div className="demo-map__pin demo-map__pin--green" style={{ top: '25%', left: '35%' }} onClick={() => { setSelectedStation(STATIONS[0]); pushScreen('station-detail') }} />
                <div className="demo-map__pin demo-map__pin--green" style={{ top: '45%', left: '65%' }} onClick={() => { setSelectedStation(STATIONS[1]); pushScreen('station-detail') }} />
                <div className="demo-map__pin demo-map__pin--yellow" style={{ top: '35%', left: '50%' }} onClick={() => { setSelectedStation(STATIONS[2]); pushScreen('station-detail') }} />
                <div className="demo-map__pin demo-map__pin--red" style={{ top: '60%', left: '40%' }} onClick={() => { setSelectedStation(STATIONS[3]); pushScreen('station-detail') }} />
                <div className="demo-map__pin demo-map__pin--gray" style={{ top: '70%', left: '70%' }} onClick={() => { setSelectedStation(STATIONS[4]); pushScreen('station-detail') }} />
              </div>
            ) : null}

            {(locationView === 'list' ? STATIONS : []).map(s => (
              <div key={s.id} className="demo-station-card" onClick={() => { setSelectedStation(s); pushScreen('station-detail') }}>
                <div className="demo-station-card__icon">
                  <MatIcon name="location_on" style={{ fontSize: 22 }} />
                </div>
                <div className="demo-station-card__info">
                  <div className="demo-station-card__name">{s.name}</div>
                  <div className="demo-station-card__meta">{s.distance} · {s.address}</div>
                </div>
                <span className={`demo-station-card__status ${statusClass(s.status)}`}>{s.statusText}</span>
              </div>
            ))}
          </div>
        )

      // ─── STATION DETAIL ────────────────────
      case 'station-detail':
        if (!selectedStation) return null
        return (
          <div className="demo-screen">
            <div className="demo-header">
              <button className="demo-header__back" onClick={popScreen}>
                <MatIcon name="arrow_back" style={{ fontSize: 22 }} />
              </button>
              <span className="demo-header__title">{selectedStation.name}</span>
            </div>
            <div className="demo-detail">
              <div className={`demo-detail__status ${statusClass(selectedStation.status)}`}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor' }} />
                {selectedStation.statusText}
              </div>
              {[
                { icon: 'location_on', label: 'Dirección', value: selectedStation.address },
                { icon: 'corporate_fare', label: 'Anfitrión', value: selectedStation.host },
                { icon: 'schedule', label: 'Horario', value: selectedStation.hours },
                { icon: 'recycling', label: 'Material aceptado', value: selectedStation.material },
                { icon: 'accessible', label: 'Accesibilidad', value: selectedStation.accessibility },
                { icon: 'update', label: 'Última actualización', value: selectedStation.lastUpdate },
              ].map((r, i) => (
                <div key={i} className="demo-detail__row">
                  <span className="demo-detail__row-icon">
                    <MatIcon name={r.icon} style={{ fontSize: 20 }} />
                  </span>
                  <div>
                    <div className="demo-detail__row-label">{r.label}</div>
                    <div className="demo-detail__row-value">{r.value}</div>
                  </div>
                </div>
              ))}
              <div className="demo-detail__actions">
                <button className="demo-detail__nav-btn" onClick={() => showToast('Navegación no disponible en demo')}>
                  <MatIcon name="near_me" style={{ fontSize: 18, marginRight: 6 }} />
                  Navegar
                </button>
                <button className="demo-detail__report" onClick={() => showToast('Reporte enviado (demo)')}>
                  <MatIcon name="flag" style={{ fontSize: 18, marginRight: 6 }} />
                  Reportar
                </button>
              </div>
            </div>
          </div>
        )

      // ─── SCANNER ───────────────────────────
      case 'scanner':
        return (
          <div className="demo-screen demo-scanner">
            {/* Reproduce en la pantalla del teléfono el video en primera persona */}
            <video
              src="/video/demo_qr_escaner_first_person.mp4"
              autoPlay
              muted
              playsInline
              loop
              className="demo-scanner__video"
            />
            <div className="demo-scanner__content">
              <button className="demo-scanner__close" onClick={handleCloseScanner}>
                <MatIcon name="close" style={{ fontSize: 22 }} />
              </button>
              <div className="demo-scanner__frame">
                <div className="demo-scanner__corner demo-scanner__corner--tl" />
                <div className="demo-scanner__corner demo-scanner__corner--tr" />
                <div className="demo-scanner__corner demo-scanner__corner--bl" />
                <div className="demo-scanner__corner demo-scanner__corner--br" />
                <div className="demo-scanner__line" />
              </div>
              <p className="demo-scanner__text">Escaneando VoxStation...</p>
              <p className="demo-scanner__subtext">Apunta al código QR en la estación</p>
              <button className="demo-scanner__manual" onClick={() => {
                setScreen('session')
                setScreenStack([])
              }}>Ingresar código manual</button>
            </div>
          </div>
        )

      // ─── SESSION ───────────────────────────
      case 'session':
        return (
          <div className="demo-screen">
            <div className="demo-header">
              <span className="demo-header__title">Sesión de reciclaje</span>
            </div>
            <div className="demo-session">
              <div className="demo-session__connected">
                <div className="demo-session__pulse" />
                <span className="demo-session__station">VoxStation Campus UMSA conectada</span>
              </div>
              <div className="demo-session__timer">{formatTime(sessionTime)} / 0:20</div>
              <div className="demo-session__stats">
                <div className="demo-session__stat">
                  <span className="demo-session__stat-val demo-session__stat-val--accepted">{sessionAccepted}</span>
                  <span className="demo-session__stat-label">Aceptadas</span>
                </div>
                <div className="demo-session__stat">
                  <span className="demo-session__stat-val demo-session__stat-val--rejected">{sessionRejected}</span>
                  <span className="demo-session__stat-label">Rechazadas</span>
                </div>
                <div className="demo-session__stat">
                  <span className="demo-session__stat-val demo-session__stat-val--points">+{sessionPoints}</span>
                  <span className="demo-session__stat-label">Puntos</span>
                </div>
              </div>
              <div className="demo-session__feed">
                {sessionEvents.map((e, i) => (
                  <div key={i} className={`demo-session__event demo-session__event--${e.type}`}>
                    <span className="demo-session__event-icon">
                      <MatIcon
                        name={
                          e.type === 'idle'
                            ? 'autorenew'
                            : e.type === 'validating'
                              ? 'hourglass_top'
                              : e.type === 'accepted'
                                ? 'check_circle'
                                : 'cancel'
                        }
                        style={{ fontSize: 18 }}
                      />
                    </span>
                    <span className="demo-session__event-text">{e.message}</span>
                    {e.points ? <span className="demo-session__event-pts">+{e.points}</span> : null}
                  </div>
                ))}
              </div>
              <p className="demo-session__instruction">Deposita una botella a la vez en la compuerta</p>
              <button className="demo-session__end-btn" onClick={handleEndSession}>Terminar sesión</button>
            </div>
          </div>
        )

      // ─── SESSION SUMMARY ───────────────────
      case 'session-summary':
        return (
          <div className="demo-screen">
            <div className="demo-header">
              <span className="demo-header__title">Resumen</span>
            </div>
            <div className="demo-summary">
              <div className="demo-summary__check">
                <MatIcon name="check" style={{ fontSize: 36, color: 'var(--navy-950)' }} />
              </div>
              <h2 className="demo-summary__title">¡Sesión completada!</h2>
              <div className="demo-summary__stats">
                <div className="demo-summary__stat">
                  <span className="demo-summary__stat-val" style={{ color: 'var(--lime-500)' }}>{sessionAccepted}</span>
                  <span className="demo-summary__stat-label">Aceptadas</span>
                </div>
                <div className="demo-summary__stat">
                  <span className="demo-summary__stat-val" style={{ color: '#ff6b6b' }}>{sessionRejected}</span>
                  <span className="demo-summary__stat-label">Rechazadas</span>
                </div>
                <div className="demo-summary__stat">
                  <span className="demo-summary__stat-val" style={{ color: 'var(--yellow-500)' }}>+{sessionPoints}</span>
                  <span className="demo-summary__stat-label">Puntos</span>
                </div>
              </div>
              <div className="demo-summary__info">
                {sessionRejected > 0 && <div className="demo-summary__info-row"><span>Rechazos</span><span>{sessionRejected} botella con líquido</span></div>}
                <div className="demo-summary__info-row"><span>Nuevo saldo</span><span>{points} VoxPuntos</span></div>
                <div className="demo-summary__info-row"><span>Impacto</span><span>~{sessionAccepted * 22}g de PET</span></div>
                <div className="demo-summary__info-row"><span>Ubicación</span><span>VoxStation Campus UMSA</span></div>
                <div className="demo-summary__info-row"><span>Hora</span><span>01/09/2026 · {new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}</span></div>
              </div>
              <div className="demo-summary__actions">
                <button className="demo-onboarding__btn" onClick={() => goToTab('home')}>Volver al inicio</button>
                <button className="demo-auth__skip" onClick={() => pushScreen('history')}>Ver historial</button>
              </div>
            </div>
          </div>
        )

      // ─── POINTS ────────────────────────────
      case 'points':
        return (
          <div className="demo-screen demo-points">
            <h1 className="demo-home__greeting" style={{ textAlign: 'center', marginBottom: 16 }}>Puntos</h1>
            <div className="demo-points__balance">
              <div className="demo-points__amount">{points}</div>
              <div className="demo-points__label">VoxPuntos</div>
            </div>
            <p className="demo-points__expiry">
              <MatIcon name="schedule" style={{ fontSize: 15, verticalAlign: 'middle', marginRight: 4 }} />
              Próximo vencimiento: 45 puntos el 30/11
            </p>

            <div className="demo-points__tabs">
              <button className={`demo-points__tab ${pointsTab === 'movements' ? 'demo-points__tab--active' : ''}`} onClick={() => setPointsTab('movements')}>Movimientos</button>
              <button className={`demo-points__tab ${pointsTab === 'rewards' ? 'demo-points__tab--active' : ''}`} onClick={() => setPointsTab('rewards')}>Recompensas</button>
            </div>

            {pointsTab === 'movements' && <>
              <div className="demo-filters" style={{ marginBottom: 12 }}>
                {['Todos', 'Ganados', 'Usados', 'Vencidos'].map(f => (
                  <button key={f} className={`demo-filter-chip ${movementFilter === f ? 'demo-filter-chip--active' : ''}`} onClick={() => setMovementFilter(f)}>{f}</button>
                ))}
              </div>
              {[
                { icon: 'recycling', desc: 'Sesión de reciclaje', date: '01/09', amount: '+45', earn: true },
                { icon: 'local_cafe', desc: 'Café La Paz Coffee', date: '27/08', amount: '-80', earn: false },
                { icon: 'recycling', desc: 'Sesión de reciclaje', date: '25/08', amount: '+30', earn: true },
                { icon: 'card_giftcard', desc: 'Bono primer depósito', date: '20/08', amount: '+15', earn: true },
                { icon: 'shopping_cart', desc: 'Descuento supermercado', date: '18/08', amount: '-50', earn: false },
              ].map((tx, i) => (
                <div key={i} className="demo-tx">
                  <div className="demo-tx__icon" style={{ background: tx.earn ? 'rgba(93,174,50,0.15)' : 'rgba(243,154,34,0.15)' }}>
                    <MatIcon name={tx.icon} style={{ fontSize: 20, color: tx.earn ? 'var(--lime-500)' : 'var(--orange-500)' }} />
                  </div>
                  <div className="demo-tx__info">
                    <div className="demo-tx__desc">{tx.desc}</div>
                    <div className="demo-tx__date">{tx.date}</div>
                  </div>
                  <span className="demo-tx__amount" style={{ color: tx.earn ? 'var(--lime-500)' : 'var(--orange-500)' }}>{tx.amount}</span>
                </div>
              ))}
              <button className="demo-auth__skip" style={{ marginTop: 8 }} onClick={() => pushScreen('coupons')}>Ver mis cupones →</button>
            </>}

            {pointsTab === 'rewards' && <>
              {REWARDS.map(r => (
                <div key={r.id} className="demo-reward-card" onClick={() => { setSelectedReward(r); pushScreen('reward-detail') }}>
                  <div className="demo-reward-card__icon">
                    <MatIcon name={r.icon} style={{ fontSize: 22 }} />
                  </div>
                  <div className="demo-reward-card__info">
                    <div className="demo-reward-card__name">{r.name}</div>
                    <div className="demo-reward-card__partner">{r.partner}</div>
                  </div>
                  <div>
                    <div className="demo-reward-card__cost">{r.cost} pts</div>
                    <div className="demo-reward-card__stock" style={{ color: r.stockColor }}>{r.stock}</div>
                  </div>
                </div>
              ))}
            </>}
          </div>
        )

      // ─── REWARD DETAIL ─────────────────────
      case 'reward-detail':
        if (!selectedReward) return null
        const canRedeem = points >= selectedReward.cost && selectedReward.stock === 'Disponible'
        return (
          <div className="demo-screen">
            <div className="demo-header">
              <button className="demo-header__back" onClick={popScreen}>
                <MatIcon name="arrow_back" style={{ fontSize: 22 }} />
              </button>
              <span className="demo-header__title">Recompensa</span>
            </div>
            <div className="demo-reward-detail">
              <div className="demo-reward-detail__hero">
                <MatIcon name={selectedReward.icon} style={{ fontSize: 44, color: 'var(--yellow-500)' }} />
              </div>
              <div className="demo-reward-detail__name">{selectedReward.name}</div>
              <div className="demo-reward-detail__partner">{selectedReward.partner}</div>
              <div className="demo-reward-detail__cost">{selectedReward.cost}</div>
              <div className="demo-reward-detail__cost-label">VoxPuntos</div>
              <div className="demo-summary__info">
                <div className="demo-summary__info-row"><span>Estado</span><span style={{ color: selectedReward.stockColor }}>{selectedReward.stock}</span></div>
                <div className="demo-summary__info-row"><span>Vigencia</span><span>{selectedReward.validity}</span></div>
                <div className="demo-summary__info-row"><span>Descripción</span><span style={{ maxWidth: 200 }}>{selectedReward.description}</span></div>
              </div>
              <button className="demo-onboarding__btn" style={{ marginTop: 20, opacity: canRedeem ? 1 : 0.4 }}
                disabled={!canRedeem}
                onClick={() => openConfirm(
                  '¿Confirmar canje?',
                  `Se descontarán ${selectedReward.cost} VoxPuntos de tu saldo.`,
                  () => {
                    setPoints(p => p - selectedReward.cost)
                    setShowConfirm(false)
                    showToast('¡Cupón canjeado! Revisa tus cupones.')
                    popScreen()
                  }
                )}>
                {canRedeem ? 'Canjear' : points < selectedReward.cost ? 'Puntos insuficientes' : 'No disponible'}
              </button>
            </div>
          </div>
        )

      // ─── COUPONS ───────────────────────────
      case 'coupons':
        return (
          <div className="demo-screen">
            <div className="demo-header">
              <button className="demo-header__back" onClick={popScreen}>
                <MatIcon name="arrow_back" style={{ fontSize: 22 }} />
              </button>
              <span className="demo-header__title">Mis cupones</span>
            </div>
            <div className="demo-pad-content">
              <div className="demo-points__tabs" style={{ marginBottom: 16 }}>
                <button className={`demo-points__tab ${couponsTab === 'available' ? 'demo-points__tab--active' : ''}`} onClick={() => setCouponsTab('available')}>Disponibles</button>
                <button className={`demo-points__tab ${couponsTab === 'used' ? 'demo-points__tab--active' : ''}`} onClick={() => setCouponsTab('used')}>Usados</button>
                <button className={`demo-points__tab ${couponsTab === 'expired' ? 'demo-points__tab--active' : ''}`} onClick={() => setCouponsTab('expired')}>Vencidos</button>
              </div>
              {couponsTab === 'available' && (
                <div className="demo-coupon">
                  <span className="demo-coupon__icon">
                    <MatIcon name="local_cafe" style={{ fontSize: 22, color: 'var(--yellow-500)' }} />
                  </span>
                  <div className="demo-coupon__info">
                    <div className="demo-coupon__name">Café gratis · La Paz Coffee</div>
                    <div className="demo-coupon__expiry">Vence: 30/09/2026</div>
                  </div>
                  <button className="demo-coupon__use-btn" onClick={() => setShowQR(true)}>Usar</button>
                </div>
              )}
              {couponsTab === 'used' && (
                <div className="demo-coupon" style={{ opacity: 0.5 }}>
                  <span className="demo-coupon__icon">
                    <MatIcon name="shopping_cart" style={{ fontSize: 22 }} />
                  </span>
                  <div className="demo-coupon__info">
                    <div className="demo-coupon__name">Bs 10 descuento · Ketal</div>
                    <div className="demo-coupon__expiry">Usado: 18/08/2026</div>
                  </div>
                </div>
              )}
              {couponsTab === 'expired' && (
                <p style={{ color: 'var(--ev-text-muted)', fontSize: '0.85rem', textAlign: 'center', marginTop: 30 }}>No tienes cupones vencidos</p>
              )}
            </div>
          </div>
        )

      // ─── PROFILE ───────────────────────────
      case 'profile':
        return (
          <div className="demo-screen demo-profile">
            <h1 className="demo-home__greeting" style={{ marginBottom: 16 }}>Perfil</h1>
            <div className="demo-profile__header">
              <div className="demo-profile__avatar">{isLoggedIn ? 'C' : '?'}</div>
              <div>
                <div className="demo-profile__name">{isLoggedIn ? 'Camila' : 'Visitante'}</div>
                <div className="demo-profile__contact">{isLoggedIn ? 'camila@email.com' : 'Sin cuenta'}</div>
              </div>
            </div>
            <div className="demo-profile__stats">
              <div className="demo-profile__stat">
                <span className="demo-profile__stat-val">{totalDeposits}</span>
                <span className="demo-profile__stat-label">Envases</span>
              </div>
              <div className="demo-profile__stat">
                <span className="demo-profile__stat-val">{points}</span>
                <span className="demo-profile__stat-label">Puntos</span>
              </div>
              <div className="demo-profile__stat">
                <span className="demo-profile__stat-val">3</span>
                <span className="demo-profile__stat-label">Canjes</span>
              </div>
            </div>
            {[
              { icon: 'analytics', label: 'Impacto personal', screen: 'impact' as Screen },
              { icon: 'receipt_long', label: 'Historial de reciclaje', screen: 'history' as Screen },
              { icon: 'confirmation_number', label: 'Mis cupones', screen: 'coupons' as Screen },
              { icon: 'tune', label: 'Preferencias', screen: 'preferences' as Screen },
              { icon: 'security', label: 'Privacidad y datos', screen: 'privacy' as Screen },
              { icon: 'help_outline', label: 'Ayuda y soporte', screen: null },
            ].map((item, i) => (
              <div key={i} className="demo-menu-item" onClick={() => item.screen ? pushScreen(item.screen) : showToast('Soporte no disponible en demo')}>
                <span className="demo-menu-item__icon">
                  <MatIcon name={item.icon} style={{ fontSize: 20 }} />
                </span>
                <span className="demo-menu-item__label">{item.label}</span>
                <span className="demo-menu-item__arrow">
                  <MatIcon name="chevron_right" style={{ fontSize: 18 }} />
                </span>
              </div>
            ))}
            <div className="demo-menu-item demo-menu-item--danger" onClick={() => showToast('Sesión cerrada (demo)')}>
              <span className="demo-menu-item__icon">
                <MatIcon name="logout" style={{ fontSize: 20 }} />
              </span>
              <span className="demo-menu-item__label">Cerrar sesión</span>
            </div>
          </div>
        )

      // ─── IMPACT ────────────────────────────
      case 'impact':
        return (
          <div className="demo-screen">
            <div className="demo-header">
              <button className="demo-header__back" onClick={popScreen}>
                <MatIcon name="arrow_back" style={{ fontSize: 22 }} />
              </button>
              <span className="demo-header__title">Tu impacto</span>
            </div>
            <div className="demo-impact">
              <div className="demo-impact__big">
                <div className="demo-impact__big-num">{totalDeposits}</div>
                <div className="demo-impact__big-label">envases reciclados</div>
              </div>
              <div className="demo-impact__weight">~{totalDeposits * 22}g de PET recuperado</div>
              <p className="demo-impact__equiv">≈ {Math.round(totalDeposits / 7)} botellas menos en el vertedero por semana</p>

              <div className="demo-section-label" style={{ textAlign: 'center' }}>Depósitos mensuales</div>
              <div className="demo-impact__chart">
                <div className="demo-impact__bar" style={{ height: '40%' }}><span className="demo-impact__bar-label">Jul</span></div>
                <div className="demo-impact__bar" style={{ height: '65%' }}><span className="demo-impact__bar-label">Ago</span></div>
                <div className="demo-impact__bar" style={{ height: '85%' }}><span className="demo-impact__bar-label">Sep</span></div>
              </div>

              <div className="demo-impact__streak">
                <MatIcon name="local_fire_department" style={{ fontSize: 18, color: 'var(--orange-500)', verticalAlign: 'middle', marginRight: 4 }} />
                Racha: 3 semanas consecutivas
              </div>
              <div className="demo-impact__community">
                <div style={{ fontSize: '0.85rem', color: 'var(--ev-text-bright)', marginBottom: 4 }}>Comunidad EKOVOX</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--lime-500)' }}>1,247</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ev-text-muted)' }}>envases reciclados en total</div>
              </div>
              <p className="demo-impact__note">Metodología: peso estimado de 22g por botella PET estándar. Datos actualizados al 01/09/2026.</p>
            </div>
          </div>
        )

      // ─── HISTORY ───────────────────────────
      case 'history':
        return (
          <div className="demo-screen">
            <div className="demo-header">
              <button className="demo-header__back" onClick={popScreen}>
                <MatIcon name="arrow_back" style={{ fontSize: 22 }} />
              </button>
              <span className="demo-header__title">Historial</span>
            </div>
            <div className="demo-pad-content">
              {[
                { date: '01/09/2026', station: 'VoxStation Campus UMSA', count: 3, pts: '+45' },
                { date: '25/08/2026', station: 'VoxStation Megacenter', count: 2, pts: '+30' },
                { date: '20/08/2026', station: 'VoxStation Campus UMSA', count: 1, pts: '+15' },
              ].map((s, i) => (
                <div key={i} className="demo-history-item">
                  <div className="demo-history-item__top">
                    <span className="demo-history-item__date">{s.date}</span>
                    <span className="demo-history-item__pts">{s.pts}</span>
                  </div>
                  <div className="demo-history-item__station">{s.station}</div>
                  <div className="demo-history-item__count">{s.count} envase{s.count > 1 ? 's' : ''} aceptado{s.count > 1 ? 's' : ''}</div>
                </div>
              ))}
            </div>
          </div>
        )

      // ─── NOTIFICATIONS ─────────────────────
      case 'notifications':
        return (
          <div className="demo-screen">
            <div className="demo-header">
              <button className="demo-header__back" onClick={popScreen}>
                <MatIcon name="arrow_back" style={{ fontSize: 22 }} />
              </button>
              <span className="demo-header__title">Notificaciones</span>
            </div>
            <div className="demo-pad-content">
              {[
                { text: 'Sesión completada: +45 puntos', time: 'Hace 2 días' },
                { text: 'Tu cupón de café vence en 3 días', time: 'Hace 1 día' },
                { text: 'Nueva recompensa: 2x1 Cine', time: 'Hace 4 días' },
                { text: 'VoxStation UMSA disponible nuevamente', time: 'Hace 1 semana' },
              ].map((n, i) => (
                <div key={i} className="demo-notif">
                  <div className="demo-notif__dot" />
                  <div>
                    <div className="demo-notif__text">{n.text}</div>
                    <div className="demo-notif__time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      // ─── PREFERENCES ──────────────────────
      case 'preferences':
        return (
          <div className="demo-screen">
            <div className="demo-header">
              <button className="demo-header__back" onClick={popScreen}>
                <MatIcon name="arrow_back" style={{ fontSize: 22 }} />
              </button>
              <span className="demo-header__title">Preferencias</span>
            </div>
            <div className="demo-pad-content">
              <div className="demo-section-label">Notificaciones</div>
              <div className="demo-pref-row"><span className="demo-pref-row__label">Transaccionales</span><button className={`demo-toggle ${prefTransactional ? 'demo-toggle--on' : 'demo-toggle--off'}`} onClick={() => setPrefTransactional(v => !v)} /></div>
              <div className="demo-pref-row"><span className="demo-pref-row__label">Operativas</span><button className={`demo-toggle ${prefOperative ? 'demo-toggle--on' : 'demo-toggle--off'}`} onClick={() => setPrefOperative(v => !v)} /></div>
              <div className="demo-pref-row"><span className="demo-pref-row__label">Recompensas</span><button className={`demo-toggle ${prefRewards ? 'demo-toggle--on' : 'demo-toggle--off'}`} onClick={() => setPrefRewards(v => !v)} /></div>
              <div className="demo-pref-row"><span className="demo-pref-row__label">Marketing</span><button className={`demo-toggle ${prefMarketing ? 'demo-toggle--on' : 'demo-toggle--off'}`} onClick={() => setPrefMarketing(v => !v)} /></div>
              <div style={{ marginTop: 24 }}>
                <div className="demo-section-label">General</div>
                <div className="demo-pref-row"><span className="demo-pref-row__label">Ubicación</span><span style={{ color: 'var(--lime-500)', fontSize: '0.82rem' }}>Activa</span></div>
                <div className="demo-pref-row"><span className="demo-pref-row__label">Idioma</span><span style={{ color: 'var(--ev-text-bright)', fontSize: '0.82rem' }}>Español</span></div>
              </div>
            </div>
          </div>
        )

      // ─── PRIVACY ──────────────────────────
      case 'privacy':
        return (
          <div className="demo-screen">
            <div className="demo-header">
              <button className="demo-header__back" onClick={popScreen}>
                <MatIcon name="arrow_back" style={{ fontSize: 22 }} />
              </button>
              <span className="demo-header__title">Privacidad y datos</span>
            </div>
            <div className="demo-pad-content">
              <div className="demo-section-label">Tus datos</div>
              <button className="demo-privacy-btn" onClick={() => showToast('Descarga iniciada (demo)')}>
                <MatIcon name="download" style={{ fontSize: 18, marginRight: 8 }} />
                Descargar mis datos
              </button>
              <button className="demo-privacy-btn" onClick={() => showToast('Abriendo política (demo)')}>
                <MatIcon name="policy" style={{ fontSize: 18, marginRight: 8 }} />
                Política de privacidad
              </button>
              <button className="demo-privacy-btn" onClick={() => showToast('Abriendo términos (demo)')}>
                <MatIcon name="description" style={{ fontSize: 18, marginRight: 8 }} />
                Términos de uso (v2.1)
              </button>
              <button className="demo-privacy-btn demo-privacy-btn--danger"
                onClick={() => openConfirm('¿Eliminar cuenta?', 'Esta acción es irreversible. Se eliminarán todos tus datos.', () => {
                  setShowConfirm(false)
                  showToast('Cuenta eliminada (demo)')
                })}>
                <MatIcon name="delete_forever" style={{ fontSize: 18, marginRight: 8 }} />
                Eliminar mi cuenta
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Show bottom nav?
  const showNav = ['home', 'locations', 'points', 'profile'].includes(screen)

  return (
    <div className="demo-page">
      {/* Background Video with Clean / Sharp Display */}
      <div className={`demo-bg-video-wrap ${bgVideo ? 'demo-bg-video-wrap--active' : ''}`} aria-hidden="true">
        {bgVideo && (
          <video
            key={bgVideo}
            src={bgVideo}
            autoPlay
            muted
            playsInline
            loop
            className="demo-bg-video"
          />
        )}
        <div className={`demo-bg-video__gradient ${!bgBlur ? 'demo-bg-video__gradient--light' : ''}`} />
      </div>

      <div className="demo-topbar">
        <Link to="/" className="demo-topbar__back">
          <MatIcon name="arrow_back" style={{ fontSize: 18 }} />
          Volver
        </Link>
        <div className="demo-topbar__info">
          <h1 className="demo-topbar__title">EKOVOX Demo</h1>
          <p className="demo-topbar__desc">Demo interactiva de la app móvil</p>
        </div>
      </div>

      {/* Phone Wrapper with Smooth Left / Right / Center Translation */}
      <div className={`demo-phone-wrapper demo-phone-wrapper--${phonePosition}`}>
        {/* Desenfoque focalizado SOLO detrás del teléfono */}
        {bgVideo && bgBlur && (
          <div className="demo-phone-backdrop-blur" aria-hidden="true" />
        )}

        <div className="demo-phone">
          <div className="demo-phone__notch" />
          <div className="demo-phone__screen">
            <div className="demo-app">
              {renderScreen()}

              {/* Bottom Navigation */}
              {showNav && (
                <div className="demo-nav">
                  <button className={`demo-nav__item ${screen === 'home' ? 'demo-nav__item--active' : ''}`} onClick={() => goToTab('home')}>
                    <div className="demo-nav__icon-pill">
                      <MatIcon name="home" />
                    </div>
                    <span>Inicio</span>
                  </button>
                  <button className={`demo-nav__item ${screen === 'locations' ? 'demo-nav__item--active' : ''}`} onClick={() => goToTab('locations')}>
                    <div className="demo-nav__icon-pill">
                      <MatIcon name="explore" />
                    </div>
                    <span>Ubicaciones</span>
                  </button>
                  <button className="demo-nav__scan" onClick={handleStartScan} title="Escanear VoxStation">
                    <MatIcon name="qr_code_scanner" style={{ fontSize: 26 }} />
                  </button>
                  <button className={`demo-nav__item ${screen === 'points' ? 'demo-nav__item--active' : ''}`} onClick={() => goToTab('points')}>
                    <div className="demo-nav__icon-pill">
                      <MatIcon name="stars" />
                    </div>
                    <span>Puntos</span>
                  </button>
                  <button className={`demo-nav__item ${screen === 'profile' ? 'demo-nav__item--active' : ''}`} onClick={() => goToTab('profile')}>
                    <div className="demo-nav__icon-pill">
                      <MatIcon name="person" />
                    </div>
                    <span>Perfil</span>
                  </button>
                </div>
              )}

              {/* Toast */}
              {toast && <div className="demo-toast">{toast}</div>}

              {/* Confirm Modal */}
              {showConfirm && (
                <div className="demo-confirm">
                  <div className="demo-confirm__box">
                    <h3 className="demo-confirm__title">{confirmText.title}</h3>
                    <p className="demo-confirm__desc">{confirmText.desc}</p>
                    <div className="demo-confirm__actions">
                      <button className="demo-confirm__btn demo-confirm__btn--cancel" onClick={() => setShowConfirm(false)}>Cancelar</button>
                      <button className="demo-confirm__btn demo-confirm__btn--ok" onClick={() => confirmAction?.()}>Confirmar</button>
                    </div>
                  </div>
                </div>
              )}

              {/* QR Code Modal */}
              {showQR && (
                <div className="demo-qr-modal">
                  <div className="demo-qr-modal__code">
                    <div className="demo-qr-modal__qr-grid">
                      {qrPattern.map((cell, i) => (
                        <div key={i} className={`demo-qr-modal__qr-cell ${cell === 0 ? 'demo-qr-modal__qr-cell--empty' : ''}`} />
                      ))}
                    </div>
                  </div>
                  <div className="demo-qr-modal__text-code">EXV-4829</div>
                  <div className="demo-qr-modal__timer">Expira en 5:00</div>
                  <button className="demo-qr-modal__close" onClick={() => setShowQR(false)}>Cerrar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
