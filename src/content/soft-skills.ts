import type { ElementType } from "react";
import { Puzzle, Workflow, Server, GraduationCap } from "lucide-react";

export type SoftSkill = {
  Icon: ElementType;
  s: string;
  c: string;
  desc: string;
};

export const softSkills: SoftSkill[] = [
  {
    Icon: Puzzle,
    s: "Problem-Solving",
    c: "text-pink-400",
    desc: "Gosto de mergulhar em problemas complexos, quebrar em partes menores e encontrar a solução mais elegante, seja no código ou na infraestrutura.",
  },
  {
    Icon: Workflow,
    s: "Automação",
    c: "text-purple-300",
    desc: "Enxergo tarefas repetitivas como oportunidades de automação — do bot que economiza tempo real no trabalho aos fluxos que rodam sozinhos no meu Home Lab.",
  },
  {
    Icon: Server,
    s: "Self-Hosted",
    c: "text-orange-500",
    desc: "Gerencio minha própria infraestrutura (Docker, Linux, redes) rodando serviços 24/7, sem depender de nuvens de terceiros.",
  },
  {
    Icon: GraduationCap,
    s: "Aprendizado",
    c: "text-green-400",
    desc: "Trato cada stack nova, cada bug difícil e cada certificação como um novo nível a subir — aprender é parte do jogo.",
  },
];
