import { Eyebrow } from "../eyebrow"

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
                    <Eyebrow style={{ marginBottom: 18 }}>Lunae</Eyebrow>
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
                        ¿Quienes <em style={{ color: "var(--cafe)" }}>somos?</em>
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
                        Lunae Spa es un espacio de bienestar inspirado en la energía y la calma de la luna, creado para ofrecer experiencias de relajación, conexión y renovación personal. 
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
                        A través de masajes tántricos, técnicas de respiración consciente y rituales sensoriales, brindamos un ambiente seguro, profesional y armonioso donde cada persona puede reconectar con su cuerpo, reducir el estrés y encontrar equilibrio entre mente, emociones y energía. 
                    </p>
                </div>
            </div>
        </section>
    )
}