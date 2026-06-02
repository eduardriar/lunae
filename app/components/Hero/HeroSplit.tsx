
import { Eyebrow } from "../eyebrow";
import { Placeholder } from "../placeholder";
import { HERO_OPTIONS, HERO_SLOTS } from "@/app/utils/texts";
import { Dispatch, SetStateAction } from "react";
import { ReserevationCard } from "./ReservationCard";

type HeroSplitProps = {

}

export const Hero = ({ }: HeroSplitProps) => {
    return (
        <section
            data-section="hero"
            className="hero-split"
            style={{
                borderBottom: "1px solid var(--line-soft)",
            }}
        >
            <div className="hero-split__left">
                <div>
                    <Eyebrow style={{ marginBottom: 28 }}>Agenda en 30 segundos</Eyebrow>
                    <h1 className="hero-split__title">
                        Encuentra
                        <br />
                        <em style={{ color: "var(--cafe)" }}>tu momento.</em>
                    </h1>
                    <p className="hero-split__lede">
                        Elige tu ritual y horario. Confirmamos por WhatsApp. Sin formularios largos.
                    </p>
                </div>
                <ReserevationCard />
            </div>
            <div className="hero-split__placeholder">
                <Placeholder
                    tone="dark"
                    imageUrl={'https://res.cloudinary.com/dz9wfl3bv/image/upload/q_auto/f_auto/v1779486468/13_mrxetx.png'}
                    alt="Imagen de masaje relajante"
                    className="hero-split__media"
                    style={{ width: "100%", height: '100%', position: "relative" }}
                >
                    <div className="hero-split__quote-wrap">
                        <p className="hero-split__quote">
                            &ldquo;Una hora aquí cambia toda la semana.&rdquo;
                        </p>
                    </div>
                </Placeholder>
            </div>

        </section>
    )
}