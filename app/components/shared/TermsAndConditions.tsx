import { CSSProperties } from "react"
import { TERMS } from "@/app/utils/copies"

type TermsAndConditionsProps = {
    text?: string,
    style?: CSSProperties
}

export const TermsAndConditions = ({ text = TERMS.linkLabel, style }: TermsAndConditionsProps) => {
    const TC = "/files/privacy.pdf"

    return (
        <span>
            <a
                href={TC}
                download={TERMS.downloadName}
                target="_blank"
                rel="noreferrer"
                style={{ ...style, textDecoration: "underline" }}
            >
                {text}
            </a>
        </span>

    )
}