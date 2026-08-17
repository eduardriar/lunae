import type { ReactNode } from "react";

const Em = ({ children }: { children: ReactNode }) => (
    <em style={{ color: "var(--cafe)" }}>{children}</em>
);

export const ADDRESS = "Cra. 70D # 48 - 37";
const SCHEDULE = "Lun-Dom · 11-19";
const PHONE_NUMBER = "+57 300 1372490";
const EMAIL = "contacto@lunae.spa";
const NEIGHBOR = "Normandía, Bogotá";
const EYEBROW = "Visítanos";

export const HERO_SLOTS = ["Hoy 4pm", "Mañ 11am", "Mañ 2pm", "Vie 6pm"];
export const HERO_OPTIONS: Array<{ name: string; label: string }> = [
    { name: "Alquimia Lunae", label: "Alquimia Lunae · 60 min · $300.000" },
    { name: "Ritual Lunae", label: "Ritual Lunae · 60 min · $200.000" },
    { name: "Éxtasis Tántrico", label: "Éxtasis Tántrico · 60 min · $300.000" },
    { name: "Armonía en Pareja", label: "Armonía en Pareja · 90 min · $680.000" },
];

export const METADATA = {
    title: "Lunae · Spa tántrico de bienestar",
    description:
        "Un espacio para reencontrarte, bajo la calma de la luna. Rituales tántricos profesionales en Bogotá.",
};

export const STRIP_ITEMS = [
    "ambiente seguro",
    "terapeutas profesionales certificadas",
    "experiencia respetuosa",
];

export const NAV = {
    links: [
        ["Rituales", "rituales"],
        ["Filosofía", "filosofia"],
        ["Visítanos", "visitanos"],
    ] as Array<[string, string]>,
    cta: "Agendar",
};

export const HERO = {
    eyebrow: "Agenda en 30 segundos",
    title: (
        <>
            Encuentra
            <br />
            <Em>tu momento.</Em>
        </>
    ),
    lede: "Elige tu ritual y horario. Confirmamos por WhatsApp. Sin formularios largos.",
    imageAlt: "Imagen de masaje relajante",
    quote: "“Una hora aquí cambia toda la semana.”",
};

export const RESERVATION_CARD = {
    eyebrow: "Agenda rápida para hoy mismo",
    available: "disponible",
    step1: "Elige tu ritual",
    step2: "Selecciona un horario",
    cta: "Continuar →",
};

export const RITUALS_SECTION = {
    eyebrow: "Selecciona tu servicio",
    title: (
        <>
            Cuatro caminos, <Em>una luna.</Em>
        </>
    ),
    minutes: "minutos",
    additionalNote: "+ adicionales por 30 min",
};

export const RITUALS_MODAL = {
    cta: "Agendar →",
};

export const PRODUCT_INFO = {
    philosophy: {
        eyebrow: "Filosofía",
        title: (
            <>
                ¿Qué es un masaje
                <br />
                <Em>tántrico?</Em>
            </>
        ),
        body: "Una técnica de bienestar corporal que integra el tacto consciente, la respiración y la conexión mente–cuerpo. Promueve la relajación profunda y la liberación de tensiones físicas y emocionales.",
        bodyLast: "No tiene fines sexuales. Es una práctica milenaria adaptada a un contexto profesional, seguro y respetuoso.",
    },
    about: {
        eyebrow: "Lunae",
        title: (
            <>
                ¿Quienes <Em>somos?</Em>
            </>
        ),
        body: "Lunae Spa es un espacio de bienestar inspirado en la energía y la calma de la luna, creado para ofrecer experiencias de relajación, conexión y renovación personal.",
        bodyLast: "A través de masajes tántricos, técnicas de respiración consciente y rituales sensoriales, brindamos un ambiente seguro, profesional y armonioso donde cada persona puede reconectar con su cuerpo, reducir el estrés y encontrar equilibrio entre mente, emociones y energía.",
    },
};

export const BOOKING_MODAL = {
    ariaLabel: "Reserva tu ritual",
    stepIndicator: (step: number, total: number) => `Reserva · paso ${step} de ${total}`,
    cancel: "Cancelar",
    back: "Atrás",
    next: "Continuar →",
    confirm: "Confirmar",
};

export const BOOKING_STEP1 = {
    title: (
        <>
            Elige tu <Em>ritual.</Em>
        </>
    ),
    subtitle: "Cuatro caminos. Una sola intención.",
    minutes: "minutos",
};

export const BOOKING_STEP_THERAPIST = {
    title: (
        <>
            Elige tu <Em>terapeuta.</Em>
        </>
    ),
    subtitle: "Quien guiará tu ritual.",
    loading: "Cargando terapeutas…",
    specialtiesFallback: "Terapeuta · Lunae",
};

export const BOOKING_STEP2 = {
    title: (
        <>
            ¿Cuándo te <Em>recibimos?</Em>
        </>
    ),
    dayLabel: "Día",
    hourLabel: "Hora",
    today: "Hoy",
    scheduleNote: "✦ Última cita 7 pm · Lun–Dom.",
};

export const BOOKING_STEP3 = {
    title: (
        <>
            ¿Cómo te <Em>llamamos?</Em>
        </>
    ),
    subtitle: "Confirmamos por WhatsApp en menos de una hora.",
    nameLabel: "Nombre",
    namePlaceholder: "Como prefieras que te llamemos",
    phoneLabel: "WhatsApp",
    phonePlaceholder: PHONE_NUMBER,
    prefsLabel: "Preferencias · opcional",
    prefs: ["Aromaterapia suave", "Música instrumental", "Sin conversación", "Té después"],
    errors: {
        name: "Necesitamos tu nombre",
        phone: "WhatsApp con código de país",
    },
};

export const BOOKING_STEP4 = {
    title: <Em>Reservado.</Em>,
    subtitle: (name: string) =>
        `${name ? `Gracias, ${name}. ` : ""}Te enviamos la confirmación por WhatsApp.`,
    reservationLabel: (id: string) => `Tu reserva · #${id}`,
    rowRitual: "Ritual",
    rowDate: "Fecha & hora",
    rowPlace: "Lugar",
    rowTotal: "Total",
    minutes: "minutos",
    termsPrefix: "He leído y acepto los ",
};

export const TERMS = {
    linkLabel: "Términos y Condiciones",
    downloadName: "Terminos-y-Condiciones-Lunae.pdf",
};

export const TOAST = {
    reserved: (firstName?: string) =>
        `Ritual reservado${firstName ? `, ${firstName}` : ""}. Confirmamos por WhatsApp.`,
};

export const A11Y = {
    closeModal: "Cerrar",
    loadingSchedules: "Cargando horarios",
    logo: "Lunae",
};

export const CONTENT = {
    name: "Lunae Spa",
    location: {
        eyebrow: EYEBROW,
        address: ADDRESS,
        contactInfo: `${PHONE_NUMBER} · ${EMAIL}`,
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
            account: PHONE_NUMBER,
            label: "WhatsApp"
        },
        additional: "Carta Privada",
        copyright: "© 2026 Lunae · Spa tántrico de bienestar",
        dataPrivacy: "Tratamiento de Datos Personales"
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
            "⏰ Elige la hora para tu reserva el día [DATE]\n\nLas horas disponibles te permiten conectar en el momento que mejor se alinea con tu energía para el día seleccionado.\n\n",
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
};
