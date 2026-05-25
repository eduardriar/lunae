import { CSSProperties } from "react"

type TermsAndConditionsProps = {
    text?: string, 
    style?: CSSProperties
}

export const TermsAndConditions = ({ text = "Privacidad", style }: TermsAndConditionsProps) => {
    const TC = "/files/privacy.pdf"

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