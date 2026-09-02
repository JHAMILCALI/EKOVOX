import { Link } from 'react-router-dom'

export default function FinalCTA({ onOpenAllyForm }: { onOpenAllyForm: () => void }) {
  return (
    <section className="final-cta">
      <div className="final-cta__bg">
        <div className="final-cta__orb final-cta__orb--1" />
        <div className="final-cta__orb final-cta__orb--2" />
      </div>
      <div className="section final-cta__content">
        <h2>La próxima botella puede volver a sumar.</h2>
        <p>
          Únete al piloto de EKOVOX y ayúdanos a construir una red de reciclaje
          con beneficios para La Paz.
        </p>
        <div className="final-cta__actions">
          <Link to="/demo" className="btn btn-primary">
            Probar demo
          </Link>
          <button type="button" className="btn btn-sEKOndary" onClick={onOpenAllyForm}>
            Quiero ser aliado
          </button>
        </div>
      </div>
    </section>
  )
}
