import type { ElementType } from "react";
import { Users, Rocket, Target, MessageSquare } from "lucide-react";

export type SoftSkill = {
  Icon: ElementType;
  s: string;
  c: string;
  desc: string;
};

export const softSkills: SoftSkill[] = [
  {
    Icon: Users,
    s: "Equipe",
    c: "text-pink-400",
    desc: "Trabalho bem em equipe, valorizando a colaboração e o respeito mútuo para alcançar objetivos comuns.",
  },
  {
    Icon: Rocket,
    s: "Proativo",
    c: "text-purple-300",
    desc: "Sempre tomo a iniciativa para antecipar problemas, buscar soluções e assumir responsabilidades sem precisar de microgerenciamento.",
  },
  {
    Icon: Target,
    s: "Dedicado",
    c: "text-orange-500",
    desc: "Alto nível de foco e comprometimento com as entregas, buscando sempre a excelência e a qualidade no código.",
  },
  {
    Icon: MessageSquare,
    s: "Comunicativo",
    c: "text-green-400",
    desc: "Habilidade de expressar ideias técnicas de forma clara, ouvir ativamente e manter o alinhamento com stakeholders.",
  },
];
