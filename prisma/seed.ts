import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const THERAPIST_DESCRIPTION = "Therapist who's gonna do the service"
const ADMIN_DESCRIPTION = "Admin in charge of managing the platform"
const RECEPCIONIST_DESCRIPTION = "Recepcionist in charge of receiving the clients"

enum SEED_TYPE  {
    UserType = "usertype",
    Service = "service",
    User = "user"
}

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

const services: Prisma.ServiceCreateInput[] = [
    {
        "name": "Ritual Lunae",
        "duration": 60,
        "price": 170000,
        "additionalPrice": 80000,
        "description": ["Tu experiencia inicia con aromaterapia y música relajante, creando un ambiente íntimo para el descanso. El masaje se realiza con movimientos relajantes guiados por una terapeuta profesional.", "Durante la sesión, la masajista permanece con bata y lencería, manteniendo un entorno respetuoso. El cliente debe permanecer relajado y evitar tocar a la terapeuta para preservar la calidad de la experiencia." ]
    },
    {
        "name": "Alquimia Lunae",
        "duration": 60,
        "price": 250000,
        "additionalPrice": 110000,
        "description": [
            "Vive una experiencia de relajación profunda y conexión interior a través de un masaje relajante inspirado en la tradición tántrica. Sumérgete en un masaje acompañado de aromaterapia, piedras volcanicas, música suave y un ambiente diseñado para despertar tus sentidos.",
            "Un ritual cuerpo a cuerpo guiado por una terapeuta profesional que permanece en lenceria, con caricias sensuales que van de lo suave a lo apasionado, estimulación manual."
        ]
    },
    {
        "name": "Extasis Tantrico",
        "duration": 60,
        "price": 250000,
        "additionalPrice": 110000,
        "description": [
            "Una experiencia sensorial diseñada para despertar la energía del cuerpo y vivir un ritual de sanación íntima en un ambiente exclusivo.",
            "Disfruta de un masaje relajante diseñado para despertar tus sentidos y liberar tensiones. La sesión incluye toque consciente, aromaterapias, piedras volcánicas y masaje cuerpo a cuerpo para una experiencia profunda de conexión y bienestar.",
            "En este ritual sensorial, la masajista permanece desnuda sin lencería, creando una atmósfera íntima y natural que acompaña la estimulación manual y el flujo de energía del masaje."
        ],
    },
    {
        "name": "Armonia En Pareja Lunae",
        "duration": 90,
        "price": 680000,
        "additionalPrice": 0,
        "description": [
            "Regálense un momento único de conexión, relajación y energía compartida.",
            "Nuestro masaje tántrico en pareja está diseñado para despertar los sentidos, armonizar el cuerpo y fortalecer el vínculo entre ambos en un ambiente íntimo y respetuoso.",
            "Es realizado por dos terapeutas que trabajan de manera sincronizada"
        ],
    },
]

const userTypes: Prisma.UserTypeCreateInput[] = [
    {
        name: "therapist",
        description: THERAPIST_DESCRIPTION,
    },
    {
        name: "admin",
        description: ADMIN_DESCRIPTION
    },
    {
        name: "recepcionist",
        description: RECEPCIONIST_DESCRIPTION
    }
]

const users: Prisma.UserCreateInput[] = [
    {
        name: "Camila Rincón",
        email: "camila.admin@lunae.co",
        userType: { connect: { name: "admin" } },
    },
    {
        name: "Daniela Patiño",
        email: "daniela.recepcion@lunae.co",
        userType: { connect: { name: "recepcionist" } },
    },
    {
        name: "María José Álvarez",
        email: "mariajose.therapist@lunae.co",
        userType: { connect: { name: "therapist" } },
    },
    {
        name: "Valentina Ríos",
        email: "valentina.therapist@lunae.co",
        userType: { connect: { name: "therapist" } },
    },
    {
        name: "Sofía Mendoza",
        email: "sofia.therapist@lunae.co",
        userType: { connect: { name: "therapist" } },
    },
    {
        name: "Isabella Torres",
        email: "isabella.therapist@lunae.co",
        userType: { connect: { name: "therapist" } },
    },
]

async function seedService() {
    for (const s of services) {
        await prisma.service.create({ data: s });
    }
}

async function seedUserType() {
    for (const ut of userTypes) {
        await prisma.userType.create({data: ut})
    }
}

async function seedUser() {
    for (const u of users) {
        await prisma.user.create({ data: u })
    }
}

export async function main(seedType?: SEED_TYPE){
    if(seedType){
        switch (seedType) {
            case SEED_TYPE.Service:
                seedService()
                break;

            case SEED_TYPE.UserType:
                seedUserType()
                break;

            case SEED_TYPE.User:
                seedUser()
                break;
        
            default:
                break;
        }
    } else {
      seedService()
      seedUserType()
      seedUser()
    } 
}

main(SEED_TYPE.User);