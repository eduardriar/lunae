
import { Eyebrow } from "../eyebrow";
import { Placeholder } from "../placeholder";
import { HERO } from "@/app/utils/copies";
import { ReserevationCard } from "./ReservationCard";

type HeroSplitProps = {
    
}

export const Hero = ({ }: HeroSplitProps) => {
    return (
        <section
            data-section="hero"
            className="hero-split"
            style={{
                borderBottom: "1px solid var(--line-soft)",
            }}
        >
            <div className="hero-split__left">
                <div>
                    <Eyebrow style={{ marginBottom: 28 }}>{HERO.eyebrow}</Eyebrow>
                    <h1 className="hero-split__title">
                        {HERO.title}
                    </h1>
                    <p className="hero-split__lede">
                        {HERO.lede}
                    </p>
                </div>
                <ReserevationCard />
            </div>
            <div className="hero-split__placeholder">
                <Placeholder
                    tone="dark"
                    imageUrl={'https://res.cloudinary.com/dz9wfl3bv/image/upload/q_auto/f_auto/v1779486468/13_mrxetx.png'}
                    alt={HERO.imageAlt}
                    className="hero-split__media"
                    style={{ width: "100%", height: '100%', position: "relative" }}
                >
                    <div className="hero-split__quote-wrap">
                        <p className="hero-split__quote">
                            {HERO.quote}
                        </p>
                    </div>
                </Placeholder>
            </div>

        </section>
    )
}
