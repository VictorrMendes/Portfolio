export type TimelineItem = {
  category: string;
  year: string;
  title: string;
  subtitle: string;
  description?: string;
  list: { name: string; date: string }[];
};

export const timeline: TimelineItem[] = [
  {
    category: "Experiência",
    year: "Jun 2026 - Presente",
    title: "Analista Desenvolvedor Fullstack",
    subtitle: "Franq (Fintech)",
    description:
      "Debug e melhorias em sistemas React/Next.js (frontend) e Python/Django (backend). Monitoramento de logs AWS, integração com APIs de terceiros e desenvolvimento de novos projetos internos.",
    list: [],
  },
  {
    category: "Educação",
    year: "2024 - 2028",
    title: "Ciência da Computação",
    subtitle: "Universidade Anhembi Morumbi",
    list: [],
  },
  {
    category: "Certificações",
    year: "2025",
    title: "",
    subtitle: "",
    list: [
      { name: "React / JavaScript", date: "2025" },
      { name: "Python / Django", date: "2025" },
      { name: "Linux Professional", date: "2025" },
      { name: "Git e GitHub", date: "2025" },
      { name: "Arquitetura de Redes", date: "2025" },
    ],
  },
  {
    category: "Experiência",
    year: "Nov 2024 - Mai 2026",
    title: "Analista de Operações",
    subtitle: "Next Rental / Mills",
    description:
      "Desenvolvi um app fullstack de controle de frotas (Next.js + Django) usado na operação real. Dashboards Power BI para KPIs gerenciais. Desenvolvi bot de automação Python que reduziu abertura de OS de 15min para 3min.",
    list: [
      { name: "Automação com Python", date: "" },
      { name: "Gestão de Frotas", date: "" },
    ],
  },
  {
    category: "Experiência",
    year: "2023 - Atual",
    title: "Dev. Freelancer",
    subtitle: "Autônomo",
    list: [
      { name: "Desenvolvimento React", date: "" },
      { name: "Portfólios e E-commerces", date: "" },
      { name: "Infraestrutura Web", date: "" },
    ],
  },
  {
    category: "Experiência",
    year: "05/2022 - 10/2024",
    title: "Auxiliar Logístico",
    subtitle: "Palácio Dos Leilões",
    list: [
      { name: "Coordenação de Setor", date: "" },
      { name: "Relacionamento B2B", date: "" },
    ],
  },
];
