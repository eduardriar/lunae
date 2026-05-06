export type RitualName =
  | "Ritual Lunae"
  | "Alquimia Lunae"
  | "Éxtasis Tántrico"
  | "Armonía en Pareja";

export type RitualTone = "crema" | "sage" | "cafe" | "deep";

export type Ritual = {
  name: RitualName;
  duration: string;
  price: string;
  tone: RitualTone;
  sub: string;
};

export const RITUALS: Ritual[] = [
  { name: "Ritual Lunae", duration: "60 min", price: "$170.000", tone: "crema", sub: "Iniciación" },
  { name: "Alquimia Lunae", duration: "60 min", price: "$250.000", tone: "sage", sub: "Profundidad" },
  { name: "Éxtasis Tántrico", duration: "60 min", price: "$250.000", tone: "cafe", sub: "Sensorial" },
  { name: "Armonía en Pareja", duration: "90 min", price: "$680.000", tone: "deep", sub: "Vínculo · 2 personas" },
];

export const RITUAL_BY_NAME: Record<RitualName, Ritual> = RITUALS.reduce(
  (acc, r) => {
    acc[r.name] = r;
    return acc;
  },
  {} as Record<RitualName, Ritual>,
);
