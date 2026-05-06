import { THERAPISTS } from "@/app/utils/texts"
import { Eyebrow } from "../eyebrow"
import { Placeholder } from "../placeholder"

export const ProductInfo = () => {
    return (
        <section
            data-section="filosofia"
            style={{ background: "var(--crema)", padding: "120px 64px" }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr",
                    gap: 96,
                    alignItems: "flex-start",
                    maxWidth: 1280,
                    margin: "0 auto",
                }}
            >
                <div>
                    <Eyebrow style={{ marginBottom: 18 }}>Filosofía</Eyebrow>
                    <h3
                        style={{
                            fontFamily: "var(--ff-display)",
                            fontWeight: 400,
                            fontSize: 52,
                            lineHeight: 1.05,
                            margin: "0 0 28px",
                            color: "var(--negro)",
                        }}
                    >
                        ¿Qué es un masaje
                        <br />
                        <em style={{ color: "var(--cafe)" }}>tántrico?</em>
                    </h3>
                    <p
                        style={{
                            fontFamily: "var(--ff-body)",
                            fontSize: 16,
                            lineHeight: 1.7,
                            color: "var(--ink)",
                            margin: "0 0 24px",
                        }}
                    >
                        Una técnica de bienestar corporal que integra el tacto consciente, la respiración y la conexión mente–cuerpo. Promueve la relajación profunda y la liberación de tensiones físicas y emocionales.
                    </p>
                    <p
                        style={{
                            fontFamily: "var(--ff-body)",
                            fontSize: 16,
                            lineHeight: 1.7,
                            color: "var(--ink)",
                            margin: 0,
                        }}
                    >
                        No tiene fines sexuales. Es una práctica milenaria adaptada a un contexto profesional, seguro y respetuoso.
                    </p>
                </div>
                <div>
                    <Eyebrow style={{ marginBottom: 18 }}>Terapeutas</Eyebrow>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        {THERAPISTS.map((t) => (
                            <div key={t.name}>
                                <Placeholder tone={t.tone} style={{ aspectRatio: "1/1.1" }} />
                                <div style={{ paddingTop: 10 }}>
                                    <div
                                        style={{
                                            fontFamily: "var(--ff-display)",
                                            fontSize: 18,
                                            color: "var(--negro)",
                                        }}
                                    >
                                        {t.name}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "var(--ff-mono)",
                                            fontSize: 9,
                                            letterSpacing: "0.18em",
                                            color: "var(--ink-mute)",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        {t.role}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}