export type TimelineItem = {
  category: string;
  year: string;
  title: string;
  subtitle: string;
  list: { name: string; date: string }[];
};

export const timeline: TimelineItem[] = [
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
    year: "2024 - Atual",
    title: "Analista de Operações",
    subtitle: "Next Rental (Frotas)",
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
