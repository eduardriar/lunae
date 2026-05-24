import { RitualName } from "../components/rituals";

export const HERO_SLOTS = ["Hoy 4pm", "Mañ 11am", "Mañ 2pm", "Vie 6pm"];
export const HERO_OPTIONS: Array<{ name: RitualName; label: string }> = [
    { name: "Alquimia Lunae", label: "Alquimia Lunae · 60 min · $250.000" },
    { name: "Ritual Lunae", label: "Ritual Lunae · 60 min · $170.000" },
    { name: "Éxtasis Tántrico", label: "Éxtasis Tántrico · 60 min · $250.000" },
    { name: "Armonía en Pareja", label: "Armonía en Pareja · 90 min · $680.000" },
];

export const THERAPISTS: Array<{ name: string; role: string; tone: "cafe" | "sage" | "deep" | "crema"; image: string }> = [
  { name: "María José", role: "Lead · Alquimia", tone: "cafe", image: "" },
  { name: "Sara", role: "Aromaterapia", tone: "sage", image: "" },
  { name: "Lucía", role: "Tantra clásico", tone: "deep", image: "" },
  { name: "Valentina", role: "Sensorial", tone: "crema", image: "" },
];

export const GIFT_TIERS = ["$170k", "$250k", "$680k", "a medida"];