import { Eyebrow } from "../eyebrow"

export const ProductInfo = () => {
    return (
        <section data-section="filosofia" className="product-info">
            <div className="product-info__grid">
                <div>
                    <Eyebrow style={{ marginBottom: 18 }}>Filosofía</Eyebrow>
                    <h3 className="product-info__title">
                        ¿Qué es un masaje
                        <br />
                        <em style={{ color: "var(--cafe)" }}>tántrico?</em>
                    </h3>
                    <p className="product-info__body">
                        Una técnica de bienestar corporal que integra el tacto consciente, la respiración y la conexión mente–cuerpo. Promueve la relajación profunda y la liberación de tensiones físicas y emocionales.
                    </p>
                    <p className="product-info__body product-info__body--last">
                        No tiene fines sexuales. Es una práctica milenaria adaptada a un contexto profesional, seguro y respetuoso.
                    </p>
                </div>
                <div>
                    <Eyebrow style={{ marginBottom: 18 }}>Lunae</Eyebrow>
                    <h3 className="product-info__title">
                        ¿Quienes <em style={{ color: "var(--cafe)" }}>somos?</em>
                    </h3>
                    <p className="product-info__body">
                        Lunae Spa es un espacio de bienestar inspirado en la energía y la calma de la luna, creado para ofrecer experiencias de relajación, conexión y renovación personal.
                    </p>
                    <p className="product-info__body product-info__body--last">
                        A través de masajes tántricos, técnicas de respiración consciente y rituales sensoriales, brindamos un ambiente seguro, profesional y armonioso donde cada persona puede reconectar con su cuerpo, reducir el estrés y encontrar equilibrio entre mente, emociones y energía.
                    </p>
                </div>
            </div>
        </section>
    )
}