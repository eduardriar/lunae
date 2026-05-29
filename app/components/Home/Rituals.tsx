import { Service } from "@/app/generated/prisma/client";
import { Eyebrow } from "../eyebrow"
import { Placeholder } from "../placeholder"
import { useServices } from "@/app/context/services-context";
import { formatCurrency } from "@/app/utils/currency";
import { Dispatch, SetStateAction } from "react";

type RitualsProps = {
    open: (ritual: {
        name: string;
        id: string;
        duration: number;
        price: number;
        additionalPrice: number;
        description: string[];
        state: boolean;
        imageUrl: string | null;
    }) => void
}

export const Rituals = ({ open }: RitualsProps) => {
    const { services } = useServices();

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
            </div>
            <div
                style={{
                    display: "flex",
                    gap: 20,
                    overflowX: "auto",
                    overflowY: "hidden",
                    scrollSnapType: "x mandatory",
                    paddingBottom: 8,
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {services.map((r) => (
                    <button
                        key={r.name}
                        type="button"
                        className="lift"
                        onClick={() => {
                            open(r)
                        }}
                        style={{
                            flex: "0 0 320px",
                            scrollSnapAlign: "start",
                            display: "flex",
                            flexDirection: "column",
                            cursor: "pointer",
                            background: "transparent",
                            border: "none",
                            padding: 0,
                            textAlign: "left",
                        }}
                    >
                        <Placeholder style={{ height: 320 }} label={r.name.toLowerCase()} imageUrl={r.imageUrl} alt={r.name} />
                        <div style={{ padding: "1rem" }}>
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
                                {r.duration} · {formatCurrency(r.price)}
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