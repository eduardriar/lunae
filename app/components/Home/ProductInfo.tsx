import { PRODUCT_INFO } from "@/app/utils/copies"
import { Eyebrow } from "../eyebrow"

export const ProductInfo = () => {
    return (
        <section data-section="filosofia" className="product-info">
            <div className="product-info__grid">
                <div>
                    <Eyebrow style={{ marginBottom: 18 }}>{PRODUCT_INFO.philosophy.eyebrow}</Eyebrow>
                    <h3 className="product-info__title">
                        {PRODUCT_INFO.philosophy.title}
                    </h3>
                    <p className="product-info__body">
                        {PRODUCT_INFO.philosophy.body}
                    </p>
                    <p className="product-info__body product-info__body--last">
                        {PRODUCT_INFO.philosophy.bodyLast}
                    </p>
                </div>
                <div>
                    <Eyebrow style={{ marginBottom: 18 }}>{PRODUCT_INFO.about.eyebrow}</Eyebrow>
                    <h3 className="product-info__title">
                        {PRODUCT_INFO.about.title}
                    </h3>
                    <p className="product-info__body">
                        {PRODUCT_INFO.about.body}
                    </p>
                    <p className="product-info__body product-info__body--last">
                        {PRODUCT_INFO.about.bodyLast}
                    </p>
                </div>
            </div>
        </section>
    )
}
