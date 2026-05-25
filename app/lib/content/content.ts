export const ADDRESS = "Cra. 70D # 48 - 37";
const SCHEDULE = "Lun–Sáb · 10–9 · Dom · 11–7";
const NUMBER = "+57 324 3425393";
const EMAIL = "contacto@lunae.spa";
const NEIGHBOR = "Normandía, Bogotá";
const EYEBROW = "Visítanos"

export const CONTENT = {
    name: "Lunae Spa",
    location: {
        eyebrow: EYEBROW,
        address: ADDRESS,
        contactInfo: `${NUMBER} · ${EMAIL}`,
        schedule: SCHEDULE
    },
    footer: {
        visitUs: EYEBROW,
        span: "Un espacio para reencontrarte, bajo la calma de la luna.",
        address: ADDRESS,
        schedule: {
            title: "Horario",
            dates: SCHEDULE
        },
        neighbor: NEIGHBOR,
        followUs: "Síguenos",
        instagram: {
            account: "",
            label: "Instagram"
        },
        whatsapp: {
            account: NUMBER,
            label: "WhatsApp"
        },
        additional: "Carta Privada",
        copyright: "© 2026 Lunae · Spa tántrico de bienestar",
        dataPrivacy: "Privacidad · Términos"
    },
    whatsapp: {
        welcome: [
            "🌙 ¡Hola! Bienvenido a Lunae Spa\n\nSomos un espacio de renovación inspirado en la calma y el poder sanador de la luna.\nAquí te invitamos a reconectar con tu cuerpo, liberar tensiones y vivir una experiencia sensorial única.\n\n¿Qué deseas explorar hoy?",
            "📋 Reservar una cita",
            "📞 Contacto directo"
        ],
        service: [
            "✨ Nuestros Rituales\n\nCada ritual está diseñado para despertar tus sentidos y guiarte hacia el equilibrio que buscas.\n\n",
            "Ver rituales"
        ],
        dates: [
            "📅 Elegiste [SERVICE]. \n\nLa luna nos guía hacia el momento perfecto para ti.\nEstamos disponibles en los próximos 5 días laborales.\n\n¿Cuál es tu fecha ideal?\n\nRecuerda: Los rituales son más profundos cuando encuentras el espacio mental y emocional para vivirlos.",
            "Elegir fecha",
            "Próximos días disponibles"
        ],
        time: [
            "⏰ Elige la hora para tu reserva el día [DATE]\n\nLas horas disponibles te permiten conectar en el momento que mejor se alinea con tu energía para el día [DAY].\n\n",
            "Elige tu horario",
            "Horarios disponibles"
        ],
        confirmation: [
            "🌙 Resumen de tu experiencia\n\nRitual seleccionado: [RITUAL]\nFecha: [DATE]\nHora: [TIME]\nDuración: [DURATION]\nInversión: $[PRICE]\n\nEste es tu espacio. Un momento dedicado únicamente a ti, donde la profesionalidad y la sensualidad convergen para tu bienestar.\n\n¿Es correcto este resumen?\n\n",
            "✅ Confirmar",
            "❌ Modificar"
        ],
        name: [
            "💫 Casi listo\n\nPara personalizar tu experiencia, ¿cuál es tu nombre?\n\nEs importante para nosotros conocer quién se conectará con nuestro espacio y nuestras terapeutas."
        ],
        final: [
            "✨ ¡Tu reserva está confirmada!\n\n¡Gracias, [NAME]!\n\nTu ritual ha sido reservado:\n🌙 [RITUAL]\n📅 [DATE] a las [TIME]\n⏱️ [DURATION] minutos\n💰 Inversión: $[PRICE]\n\n💡 Consejos para tu experiencia:\n• Llega 10 minutos antes para alinear tu energía\n• Viste ropa cómoda que puedas dejar fácilmente\n• Apaga tu teléfono o ponlo en silencio\n• Abre tu cuerpo y mente a la experiencia\n\nSi tienes dudas o necesitas cancelar, contáctanos con mínimo 24 horas de anticipación.\n\n🌙 Nos vemos en Lunae. Tu transformación te espera.\n\n📞 Contacto directo: [PHONE]\n📧 Email: [EMAIL]"
        ]
    }
}