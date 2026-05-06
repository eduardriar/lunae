import { GIFT_TIERS } from "@/app/utils/texts"
import { Eyebrow } from "../eyebrow"
import { Placeholder } from "../placeholder"

export const Location = () => {
    return (
        <section
            data-section="visitanos"
            style={{
                padding: "110px 64px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                maxWidth: 1320,
                margin: "0 auto",
            }}
        >
            <div
                style={{
                    background: "var(--negro)",
                    color: "var(--blanco)",
                    padding: 48,
                    borderRadius: 6,
                }}
            >
                <Eyebrow color="var(--sage)" style={{ marginBottom: 18 }}>
                    Visítanos
                </Eyebrow>
                <h3
                    style={{
                        fontFamily: "var(--ff-display)",
                        fontWeight: 400,
                        fontSize: 48,
                        margin: "0 0 24px",
                        color: "var(--blanco)",
                    }}
                >
                    Cra. 11 #93–43
                </h3>
                <Placeholder
                    tone="dark"
                    label="mapa · chicó, bogotá"
                    style={{ height: 180, borderRadius: 4, marginBottom: 24 }}
                />
                <div
                    style={{
                        fontFamily: "var(--ff-body)",
                        fontSize: 14,
                        lineHeight: 1.7,
                        opacity: 0.85,
                    }}
                >
                    Lun–Sáb · 10–9 · Dom · 11–7
                    <br />
                    +57 313 555 0142 · hola@lunae.spa
                </div>
            </div>
            <div
                data-section="regalo"
                style={{
                    background: "var(--sage)",
                    color: "var(--negro)",
                    padding: 48,
                    borderRadius: 6,
                }}
            >
                <Eyebrow style={{ marginBottom: 18 }}>Regalo · Bonos</Eyebrow>
                <h3
                    style={{
                        fontFamily: "var(--ff-display)",
                        fontWeight: 400,
                        fontSize: 48,
                        margin: "0 0 16px",
                        color: "var(--negro)",
                    }}
                >
                    Regala un <em>ritual</em>
                </h3>
                <p
                    style={{
                        fontFamily: "var(--ff-body)",
                        fontSize: 15,
                        lineHeight: 1.6,
                        margin: "0 0 28px",
                        maxWidth: 380,
                    }}
                >
                    Un detalle que invita a parar, respirar y reencontrarse.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                    {GIFT_TIERS.map((b) => (
                        <button
                            key={b}
                            type="button"
                            className="lift"
                            onClick={() => open()}
                            style={{
                                background: "var(--blanco)",
                                border: "none",
                                padding: "20px 8px",
                                borderRadius: 4,
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                        >
                            <div style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: "var(--negro)" }}>
                                {b}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}