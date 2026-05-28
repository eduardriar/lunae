
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
            style={{
                display: "flex",
                flexDirection: "row",
                minHeight: 576,
                borderBottom: "1px solid var(--line-soft)",
            }}
        >
            <div style={{
                width: "50%",
                padding: "72px 64px 64px",
                display: "flex",
                flexDirection: "column",
            }}>
                <div>
                    <Eyebrow style={{ marginBottom: 28 }}>Agenda en 30 segundos</Eyebrow>
                    <h1
                        style={{
                            fontFamily: "var(--ff-display)",
                            fontWeight: 400,
                            fontSize: 104,
                            lineHeight: 0.95,
                            letterSpacing: "-0.02em",
                            margin: "0 0 24px",
                            color: "var(--negro)",
                        }}
                    >
                        Encuentra
                        <br />
                        <em style={{ color: "var(--cafe)" }}>tu momento.</em>
                    </h1>
                    <p
                        style={{
                            fontFamily: "var(--ff-body)",
                            fontSize: 17,
                            lineHeight: 1.6,
                            color: "var(--ink-soft)",
                            margin: "0 0 36px",
                            maxWidth: 480,
                        }}
                    >
                        Elige tu ritual y horario. Confirmamos por WhatsApp. Sin formularios largos.
                    </p>
                </div>
                <ReserevationCard />
            </div>
            <Placeholder
                tone="dark"
                imageUrl={'https://res.cloudinary.com/dz9wfl3bv/image/upload/q_auto/f_auto/v1779486468/13_mrxetx.png'}
                alt="Imagen de masaje relajante"
                style={{ width: "30%", minHeight: 720, position: "relative" }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        left: 40,
                        right: 40,
                        padding: "1rem",
                        zIndex: 1,
                    }}
                >
                    <p
                        style={{
                            fontFamily: "var(--ff-display)",
                            fontStyle: "italic",
                            fontSize: "3rem",
                            lineHeight: 1.25,
                            margin: 0,
                            width: "100%",
                            color: "var(--blanco)"
                        }}
                    >
                        &ldquo;Una hora aquí cambia toda la semana.&rdquo;
                    </p>
                </div>
            </Placeholder>
        </section>
    )
}