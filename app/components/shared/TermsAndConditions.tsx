import { CSSProperties } from "react"

type TermsAndConditionsProps = {
    text?: string, 
    style?: CSSProperties
}

export const TermsAndConditions = ({ text = "Términos y Condiciones", style }: TermsAndConditionsProps) => {
    const TC = "/files/T&C_Lunae.pdf"

    return (
        <span>
            <a
                href={TC}
                download="Terminos-y-Condiciones-Lunae.pdf"
                target="_blank"
                rel="noreferrer"
                style={{ ...style, textDecoration: "underline" }}
            >
                {text}
            </a>
        </span>

    )
}