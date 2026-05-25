export const Map = () => {
    const src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5997537752223!2d-74.10906655590065!3d4.66523181257141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b9daa31d8a9%3A0xbd34a4a23520421f!2sCra.%2070d%20%2348-37%2C%20Bogot%C3%A1!5e0!3m2!1sen!2sco!4v1779586894450!5m2!1sen!2sco"
    return(
        <iframe src={src} height="450" style={{border: 0, width: '100%'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    )
}