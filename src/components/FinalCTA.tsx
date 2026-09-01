export default function FinalCTA({ onOpenPilotForm, onOpenAllyForm }: { onOpenPilotForm: () => void; onOpenAllyForm: () => void }) {
  return (
    <section className="final-cta">
      <div className="final-cta__bg">
        <div className="final-cta__orb final-cta__orb--1" />
        <div className="final-cta__orb final-cta__orb--2" />
      </div>
      <div className="section final-cta__content">
        <h2>La próxima botella puede volver a sumar.</h2>
        <p>
          Únete al piloto de EXOVOX y ayúdanos a construir una red de reciclaje
          con beneficios para La Paz.
        </p>
        <div className="final-cta__actions">
          <button type="button" className="btn btn-primary" onClick={onOpenPilotForm}>
            Quiero participar
          </button>
          <button type="button" className="btn btn-secondary" onClick={onOpenAllyForm}>
            Quiero ser aliado
          </button>
        </div>
      </div>
    </section>
  )
}
