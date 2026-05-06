import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="lfooter">
      <div className="lfooter-grid">
        <div>
          <Logo size={22} color="var(--blanco)" />
          <p
            style={{
              fontFamily: "var(--ff-display)",
              fontSize: 28,
              lineHeight: 1.25,
              color: "var(--blanco)",
              marginTop: 28,
              fontStyle: "italic",
              fontWeight: 400,
              maxWidth: 360,
            }}
          >
            Un espacio para reencontrarte, bajo la calma de la luna.
          </p>
        </div>
        <div>
          <h4>Visítanos</h4>
          <p>
            Cra. 11 #93–43
            <br />
            Chicó, Bogotá
            <br />
            +57 313 555 0142
          </p>
        </div>
        <div>
          <h4>Horario</h4>
          <p>
            Lun – Sáb · 10–9
            <br />
            Domingo · 11–7
            <br />
            Última cita 8 pm
          </p>
        </div>
        <div>
          <h4>Síguenos</h4>
          <p>
            Instagram · @lunae.spa
            <br />
            WhatsApp · directo
            <br />
            Carta privada
          </p>
        </div>
      </div>
      <div className="lfooter-bot">
        <span>© 2026 Lunae · Spa tántrico de bienestar</span>
        <span>Privacidad · Términos</span>
      </div>
    </footer>
  );
}
