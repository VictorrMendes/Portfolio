import type { ReactNode } from "react";
import { SITE } from "@/content/site";

export type Project = {
  title: string;
  shortDesc: string;
  tech: string[];
  image: string;
  link: string;
  content: ReactNode;
};

export const projects: Project[] = [
  {
    title: "VMSERVER: Home Lab",
    shortDesc: "19 containers Docker orquestrando automação com IA (Llama 3), IoT, monitoramento Grafana e n8n. Tudo rodando em um notebook reaproveitado.",
    tech: ["Docker", "Linux", "n8n", "Llama 3", "Tailscale"],
    image: "/projects/servidor.png",
    link: "https://github.com/VictorrMendes/HomeLab",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Transformando um notebook Positivo (com processador Celeron) no cérebro de uma casa inteligente. Uma arquitetura 100% Self-Hosted, orquestrada por fluxos automatizados e Inteligência Artificial.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">💡 A Filosofia</h4>
        <p>Sempre fui fascinado por filmes futuristas com casas inteligente (como o J.A.R.V.I.S.). Resolvi trazer isso para o mundo real usando um hardware encostado. O objetivo foi criar um Assistente Pessoal capaz de gerenciar infraestrutura, salvar anotações e controlar a casa via linguagem natural, rodando 100% localmente sem depender das nuvens das Big Techs.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">🛠️ Arquitetura Inteligente</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">Interceptação Segura:</strong> Webhook do n8n exposto via Cloudflare Tunnels validando estritamente meu Chat ID do Telegram.</li>
          <li><strong className="text-white">Intent Routing (LLM):</strong> A mensagem bruta vai para a API Groq (Llama 3), classificando a intenção em milissegundos.</li>
          <li><strong className="text-white">Microsserviços:</strong> Integrações nativas via HTTP e SSH para gerenciar Home Assistant, SO Linux e Blinko (Segundo Cérebro).</li>
        </ul>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">💻 Stack e Otimização</h4>
        <p>Sistema otimizado com ZRAM para suportar dezenas de containers no Celeron. Rodando Nginx Proxy Manager, Grafana, InfluxDB, Portainer, Homarr e Tailscale (Zero Trust Network).</p>
      </div>
    ),
  },
  {
    title: "FinanceVM (PWA)",
    shortDesc: "PWA financeiro com dashboard de ativos, análise gráfica e agenda de pagamentos. Next.js 15 + TypeScript + Django. Deploy na Vercel.",
    tech: ["Next.js 15", "TypeScript", "Tailwind v4", "Django"],
    image: "/projects/financeVM.png",
    link: "https://myfinances-self.vercel.app/login",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Um aplicativo web progressivo (PWA) moderno e responsivo para gestão financeira pessoal. Controle total de receitas, despesas, cartões e investimentos com uma interface estilo Fintech.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">📌 Funcionalidades Principais</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">Autenticação Private Bank:</strong> Login seguro com JWT e Refresh Tokens via Backend Python.</li>
          <li><strong className="text-white">Dashboard de Ativos:</strong> Visão consolidada de liquidez, reserva e patrimônio.</li>
          <li><strong className="text-white">Análise Gráfica:</strong> Distribuição de gastos por categoria usando Recharts.</li>
          <li><strong className="text-white">PWA Nativo:</strong> Utilização de Workbox Service Workers para instalação direta no Android e iOS.</li>
        </ul>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">🚀 O Código</h4>
        <p>Desenvolvido com foco em mobile-first e alta performance. O Frontend utiliza Next.js com App Router e Tailwind CSS, consumindo uma API REST privada e segura construída em Django.</p>
      </div>
    ),
  },
  {
    title: "Oracle-Fin",
    shortDesc: "Plataforma fullstack de análise financeira integrando Brapi, Yahoo Finance e OpenFinData. Autenticação JWT, alertas configuráveis, Docker Compose.",
    tech: ["React", "TypeScript", "Python", "Django", "PostgreSQL"],
    image: "/projects/oracle.jpg",
    link: SITE.github,
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Plataforma fullstack de análise financeira que integra múltiplas fontes de dados de mercado (Brapi, Yahoo Finance, OpenFinData) para consolidar cotações, indicadores e finanças pessoais em um só lugar.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">⚙️ Detalhes Técnicos</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">Autenticação:</strong> Login seguro via JWT com fluxo de refresh token.</li>
          <li><strong className="text-white">Alertas Configuráveis:</strong> Notificações customizadas por ativo e indicador financeiro.</li>
          <li><strong className="text-white">Infraestrutura:</strong> Docker Compose orquestrando API, banco de dados e serviços auxiliares.</li>
          <li><strong className="text-white">Stack:</strong> Frontend em React + TypeScript consumindo uma API REST em Python/Django com PostgreSQL.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "LeituraXP",
    shortDesc: "Buscador de livros com autenticação e consumo de APIs externas de literatura.",
    tech: ["Next.js", "React", "Tailwind", "shadcn/ui"],
    image: "/projects/leituraxp.png",
    link: "https://leitura-xp.vercel.app",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Um buscador de livros que permite acessar detalhes e sinopses de diversas obras, consumindo a Google Books API. Desenvolvido para unir minhas paixões por leitura e programação.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">⚙️ Detalhes Técnicos</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">Gerenciamento de Estado:</strong> Uso da Context API do React para gerenciar o estado global de autenticação com persistência no LocalStorage.</li>
          <li><strong className="text-white">Rotas Protegidas:</strong> Implementação de Next.js Middleware para bloquear acesso a áreas internas sem sessão ativa.</li>
          <li><strong className="text-white">Consumo de Dados Avançado:</strong> Controle manual de estados (`isLoading`, `isError`, `data`) nativamente via Fetch e useEffect, sem bibliotecas de terceiros.</li>
          <li><strong className="text-white">UI/UX:</strong> Componentização moderna baseada no shadcn/ui.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "EventoHub 🚀",
    shortDesc: "Plataforma de eventos moderna e performática com foco em SSG, ISR e Server Actions.",
    tech: ["Next.js", "Zod", "Hook Form", "Jest"],
    image: "/projects/eventohub.png",
    link: "https://eventohub.vercel.app",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Uma plataforma moderna para a divulgação e criação de eventos de tecnologia. Este projeto foi desenvolvido como um case prático para demonstrar proficiência em tecnologias front-end modernas, com foco em performance, SEO e qualidade de código.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">🎯 Conceitos Arquiteturais Aplicados</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">SSG & ISR:</strong> A listagem de eventos é gerada estaticamente com revalidação em segundo plano a cada 60 segundos (ISR), garantindo carregamento instantâneo.</li>
          <li><strong className="text-white">Server Actions:</strong> Manipulação de dados e persistência (criação de eventos) de forma segura diretamente no back-end.</li>
          <li><strong className="text-white">Formulários Robustos:</strong> Uso do React Hook Form integrado com Zod para validação em tempo real de esquemas estritos.</li>
          <li><strong className="text-white">Testes Automatizados:</strong> Ambiente coberto por testes unitários e de componente usando Jest e React Testing Library.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Predserv Engenharia",
    shortDesc: "Landing page corporativa focada em conversão, portfólio de obras e alta velocidade.",
    tech: ["Next.js 16", "React 19", "Tailwind 4"],
    image: "/projects/predserv.png",
    link: "https://predservengenharia.com.br/",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Site Empresarial desenvolvido para cliente real (Predserv Engenharia & Reformas Civis), com foco em apresentação de serviços, prova social e captação de contatos.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">📌 Visão Geral do Projeto</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">Foco em Conversão:</strong> Estrutura de UX desenhada para transmitir credibilidade e facilitar a solicitação de orçamentos (Leads).</li>
          <li><strong className="text-white">Conteúdo Desacoplado:</strong> Arquitetura orientada para manutenção onde todo o conteúdo (textos, depoimentos, serviços) fica centralizado em um arquivo isolado (`content.ts`), permitindo atualizações fáceis sem alterar os componentes.</li>
          <li><strong className="text-white">Vanguarda Técnica:</strong> Utilizando as versões mais recentes das ferramentas web (Next.js 16 App Router e React 19).</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Amazonas Films",
    shortDesc: "Landing page Empresarial em React com formulário de orçamento dinâmico.",
    tech: ["React 17", "Bootstrap", "EmailJS", "Slick"],
    image: "/projects/amazonasfilms.png",
    link: "https://amazonas-films.com/",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Landing page Empresarial da Amazonas Filmes e Adesivos, desenvolvida em React, com foco em apresentação de serviços, galeria de projetos, depoimentos e formulário de contato para solicitação de orçamentos.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">📌 Visão Geral do Projeto</h4>
        <p>O projeto é uma SPA (Single Page Application) com navegação por rolagem suave entre seções. Os textos e dados principais ficam centralizados em um arquivo JSON, facilitando a manutenção futura.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">⚙️ Funcionalidades e Integrações</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">EmailJS:</strong> Integração direta no front-end para envio de e-mails de orçamento sem necessidade de um backend próprio.</li>
          <li><strong className="text-white">Carrossel Interativo:</strong> Utilização do React Slick e Yet Another React Lightbox para uma galeria de portfólio imersiva.</li>
          <li><strong className="text-white">Estilização Híbrida:</strong> Combinação de CSS Customizado com a base sólida do Bootstrap e ícones do Font Awesome.</li>
        </ul>
      </div>
    ),
  },
];
