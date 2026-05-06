import { stepBadgeStyle } from "@/app/utils/stepBadgeStyle";
import { Eyebrow } from "../eyebrow";
import { RitualName } from "../rituals";
import { Placeholder } from "../placeholder";
import { HERO_OPTIONS, HERO_SLOTS } from "@/app/utils/texts";
import { Dispatch, SetStateAction } from "react";

type HeroSplitProps = {
    ritualSel: { name: RitualName; label: string },
    setRitualSel: Dispatch<SetStateAction<{
        name: RitualName;
        label: string;
    }>>;
    slotSel: string,
    setSlotSel: Dispatch<SetStateAction<string>>
}

export const Hero = ({ ritualSel, setRitualSel, slotSel, setSlotSel }: HeroSplitProps) => {


    return (
        <section
            data-section="hero"
            style={{
                display: "grid",
                gridTemplateColumns: "1.05fr 1fr",
                minHeight: 720,
                borderBottom: "1px solid var(--line-soft)",
            }}
        >
            <div
                style={{
                    padding: "72px 64px 64px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
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
                        Elige tu ritual y horario. Confirmamos por WhatsApp con tu terapeuta. Sin formularios largos, sin teléfono.
                    </p>
                </div>

                <div
                    style={{
                        background: "#fff",
                        border: "1px solid var(--line)",
                        borderRadius: 6,
                        padding: 28,
                        boxShadow: "0 30px 60px -30px rgba(128,97,75,0.25)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 20,
                        }}
                    >
                        <Eyebrow>Agenda rápida</Eyebrow>
                        <span
                            style={{
                                fontFamily: "var(--ff-mono)",
                                fontSize: 10,
                                letterSpacing: "0.18em",
                                color: "var(--sage-deep)",
                                textTransform: "uppercase",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            <span
                                aria-hidden
                                style={{ width: 6, height: 6, background: "var(--sage-deep)", borderRadius: "50%" }}
                            />{" "}
                            disponible
                        </span>
                    </div>

                    <div style={{ marginBottom: 18 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                            <span style={stepBadgeStyle}>1</span>
                            <span style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "var(--negro)" }}>
                                Elige tu ritual
                            </span>
                        </div>
                        <select
                            value={ritualSel.label}
                            onChange={(e) => {
                                const found = HERO_OPTIONS.find((o) => o.label === e.target.value);
                                if (found) setRitualSel(found);
                            }}
                            style={{
                                width: "100%",
                                padding: "14px 16px",
                                border: "1px solid var(--line)",
                                borderRadius: 4,
                                fontFamily: "var(--ff-display)",
                                fontSize: 18,
                                color: "var(--negro)",
                                background: "var(--blanco)",
                                cursor: "pointer",
                            }}
                        >
                            {HERO_OPTIONS.map((o) => (
                                <option key={o.name}>{o.label}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                            <span style={stepBadgeStyle}>2</span>
                            <span style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "var(--negro)" }}>
                                Selecciona un horario
                            </span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                            {HERO_SLOTS.map((s) => {
                                const sel = slotSel === s;
                                return (
                                    <button
                                        type="button"
                                        key={s}
                                        onClick={() => setSlotSel(s)}
                                        style={{
                                            padding: "12px 8px",
                                            border: `1px solid ${sel ? "var(--negro)" : "var(--line)"}`,
                                            background: sel ? "var(--negro)" : "transparent",
                                            color: sel ? "var(--blanco)" : "var(--negro)",
                                            borderRadius: 4,
                                            fontFamily: "var(--ff-body)",
                                            fontSize: 12,
                                            cursor: "pointer",
                                            transition: "all 0.15s ease",
                                        }}
                                    >
                                        {s}
                                    </button>
                                );
                            })}
                        </div>
                        <a
                            onClick={() => open(ritualSel.name)}
                            style={{
                                display: "inline-block",
                                marginTop: 12,
                                fontFamily: "var(--ff-body)",
                                fontSize: 12,
                                color: "var(--cafe)",
                                cursor: "pointer",
                            }}
                        >
                            + ver más horarios
                        </a>
                    </div>

                    <button
                        type="button"
                        onClick={() => open(ritualSel.name)}
                        className="btn btn-primary"
                        style={{ width: "100%", padding: 16 }}
                    >
                        Continuar →
                    </button>
                </div>
            </div>

            <Placeholder
                tone="dark"
                label="foto editorial — manos, vela, piedras volcánicas"
                style={{ minHeight: 720, position: "relative" }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 32,
                        right: 32,
                        color: "var(--crema)",
                        fontFamily: "var(--ff-mono)",
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        opacity: 0.7,
                        zIndex: 1,
                    }}
                >
                    ✦ ed. 04 · luz de vela
                </div>
                <div
                    style={{
                        position: "absolute",
                        bottom: 40,
                        left: 40,
                        right: 40,
                        color: "var(--blanco)",
                        zIndex: 1,
                    }}
                >
                    <p
                        style={{
                            fontFamily: "var(--ff-display)",
                            fontStyle: "italic",
                            fontSize: 32,
                            lineHeight: 1.25,
                            margin: 0,
                            maxWidth: 420,
                        }}
                    >
                        &ldquo;Una hora aquí cambia toda la semana.&rdquo;
                    </p>
                    <div
                        style={{
                            fontFamily: "var(--ff-mono)",
                            fontSize: 10,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            opacity: 0.7,
                            marginTop: 14,
                        }}
                    >
                        — huésped frecuente
                    </div>
                </div>
            </Placeholder>
        </section>
    )
}