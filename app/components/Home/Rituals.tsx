import { Eyebrow } from "../eyebrow"
import { Placeholder } from "../placeholder"
import { RitualName, RITUALS } from "../rituals"

type RitualsProps = {
    open: (ritual?: RitualName | undefined) => void;
}

export const Rituals = ({open}: RitualsProps) => {

    return (
        <section data-section="rituales" style={{ padding: "90px 64px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 48,
                    gap: 24,
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <Eyebrow style={{ marginBottom: 12 }}>Carta de rituales</Eyebrow>
                    <h2
                        style={{
                            fontFamily: "var(--ff-display)",
                            fontWeight: 400,
                            fontSize: 56,
                            margin: 0,
                            color: "var(--negro)",
                        }}
                    >
                        Cuatro caminos, <em style={{ color: "var(--cafe)" }}>una luna.</em>
                    </h2>
                </div>
                <button
                    onClick={() => open()}
                    className="btn btn-primary"
                    style={{ fontSize: 13, padding: "12px 24px" }}
                >
                    Agendar →
                </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
                {RITUALS.map((r) => (
                    <button
                        key={r.name}
                        type="button"
                        className="lift"
                        onClick={() => open(r.name)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            cursor: "pointer",
                            background: "transparent",
                            border: "none",
                            padding: 0,
                            textAlign: "left",
                        }}
                    >
                        <Placeholder tone={r.tone} style={{ height: 320 }} label={r.name.toLowerCase()} />
                        <div style={{ paddingTop: 18 }}>
                            <h3
                                style={{
                                    fontFamily: "var(--ff-display)",
                                    fontSize: 26,
                                    fontWeight: 400,
                                    margin: "0 0 6px",
                                    color: "var(--negro)",
                                }}
                            >
                                {r.name}
                            </h3>
                            <div
                                style={{
                                    fontFamily: "var(--ff-mono)",
                                    fontSize: 10,
                                    letterSpacing: "0.16em",
                                    color: "var(--ink-mute)",
                                    textTransform: "uppercase",
                                }}
                            >
                                {r.duration} · {r.price}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            <p
                style={{
                    fontFamily: "var(--ff-body)",
                    fontSize: 13,
                    color: "var(--ink-mute)",
                    marginTop: 24,
                    textAlign: "right",
                }}
            >
                + adicionales por 30 min
            </p>
        </section>
    )
}