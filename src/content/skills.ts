export type Skill = {
  t: string;
  s: string;
  c: string;
  desc: string;
};

export const skills: Skill[] = [
  { t: "⚛", s: "React", c: "text-cyan-400", desc: "Biblioteca principal. Cria interfaces de usuário dinâmicas e baseadas em componentes reutilizáveis." },
  { t: "JS", s: "JavaScript", c: "text-yellow-400", desc: "A linguagem base que dá vida e lógica às interações da web moderna." },
  { t: "TS", s: "TypeScript", c: "text-blue-500", desc: "Superconjunto de JS que adiciona tipagem estática, garantindo um código mais seguro e escalável." },
  { t: "N", s: "Next.js", c: "text-white", desc: "Framework React para renderização do lado do servidor (SSR) e geração de sites estáticos de alta performance." },
  { t: "PY", s: "Python", c: "text-yellow-500", desc: "Linguagem versátil focada em legibilidade, muito usada em automações, IA e backends robustos." },
  { t: "dj", s: "Django", c: "text-green-600", desc: "Framework web Python de alto nível que incentiva o desenvolvimento rápido e um design limpo." },
  { t: "🐧", s: "Linux", c: "text-white", desc: "Sistema operacional base para servidores, essencial para gerenciamento de infraestrutura e Home Labs." },
  { t: "🐳", s: "Docker", c: "text-blue-400", desc: "Plataforma de containerização para empacotar, distribuir e rodar aplicações em qualquer ambiente." },
  { t: "Fg", s: "Figma", c: "text-pink-400", desc: "Ferramenta de design e prototipagem colaborativa focada na criação de interfaces UI/UX." },
  { t: "UI", s: "Responsive", c: "text-purple-300", desc: "Arquitetura CSS fluida garantindo que a aplicação funcione e pareça perfeita em qualquer tamanho de tela." },
  { t: "Git", s: "Version", c: "text-orange-500", desc: "Sistema de controle de versão distribuído para rastrear alterações de código em equipe." },
  { t: "n8n", s: "Orquestração", c: "text-green-400", desc: "Ferramenta de automação de fluxo de trabalho baseada em nós, conectando APIs e serviços perfeitamente." },
];
