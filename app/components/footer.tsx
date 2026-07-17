import { CONTENT } from "../utils/copies";
import { Logo } from "./logo";
import { TermsAndConditions } from "./shared/TermsAndConditions";

export function Footer() {
  return (
    <footer className="lfooter">
      <div className="lfooter-grid">
        <div>
          <Logo size={72} color="var(--blanco)" />
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
            {CONTENT.footer.span}
          </p>
        </div>
        <div>
          <h4>{CONTENT.footer.visitUs}</h4>
          <p>
            {CONTENT.footer.address}
            <br />
            {CONTENT.footer.neighbor}
            <br />
            {CONTENT.footer.whatsapp.account}
          </p>
        </div>
        <div>
          <h4>{CONTENT.footer.schedule.title}</h4>
          <p>
            {CONTENT.footer.schedule.dates}
          </p>
        </div>
        <div>
          <h4>{CONTENT.footer.followUs}</h4>
          <p>
            {CONTENT.footer.instagram.label} · {CONTENT.footer.instagram.account}
            <br />
            {CONTENT.footer.whatsapp.label} · {CONTENT.footer.whatsapp.account}
            <br />
            {CONTENT.footer.additional}
          </p>
        </div>
      </div>
      <div className="lfooter-bot">
        <span>{CONTENT.footer.copyright}</span>
        <TermsAndConditions text={CONTENT.footer.dataPrivacy}/>
      </div>
    </footer>
  );
}
