"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ==========================================
// DADOS DOS PROJETOS (Formatados como READMEs)
// ==========================================
const projectsData = [
  {
    title: "VMSERVER: Home Lab",
    shortDesc: "Transformando um notebook Celeron no cérebro de uma casa inteligente. Arquitetura 100% Self-Hosted.",
    tech: ["Docker", "Linux", "n8n", "Llama 3", "Tailscale"],
    image: "/projects/servidor.png",
    link: "https://github.com/VictorrMendes/HomeLab",
    content: (
      // Trocado para font-sans e ajustado o tamanho para uma leitura agradável
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
    )
  },
  {
    title: "FinanceVM (PWA)",
    shortDesc: "App de gestão financeira pessoal estilo Private Bank. Instalável com gráficos dinâmicos.",
    tech: ["Next.js 15", "TypeScript", "Tailwind v4", "Django"],
    image: "/projects/financeVM.png",
    link: "https://myfinances-self.vercel.app",
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
    )
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
    )
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
    )
  },
  {
    title: "Predserv Engenharia",
    shortDesc: "Landing page corporativa focada em conversão, portfólio de obras e alta velocidade.",
    tech: ["Next.js 16", "React 19", "Tailwind 4"],
    image: "/projects/predserv.png",
    link: "https://github.com/VictorrMendes/Predserv",
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
    )
  },
  {
    title: "Amazonas Films",
    shortDesc: "Landing page Empresarial em React com formulário de orçamento dinâmico.",
    tech: ["React 17", "Bootstrap", "EmailJS", "Slick"],
    image: "/projects/amazonasfilms.png",
    link: "https://github.com/VictorrMendes/AmazonasFilms",
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
    )
  }
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    document.body.style.overflow = selectedProject ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <>
      <motion.div id="projetos" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
        <h2 className="mb-8 flex items-center gap-3 font-pixel text-lg md:text-2xl text-white">
          <span className="h-6 md:h-8 w-2 bg-purple-600"></span>QUESTS CONCLUÍDAS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.map((project, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
              className="neon-border pixel-corners group flex flex-col bg-[#150a21]/80 backdrop-blur-sm cursor-pointer hover:bg-purple-900/20 transition-all overflow-hidden h-full"
            >
              <div className="relative w-full h-48 md:h-56 border-b border-purple-900/50 overflow-hidden bg-[#09030f]">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150a21]/90 to-transparent"></div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Título do Card na Tela Principal */}
                <h3 className="mb-4 font-pixel text-base md:text-xl lg:text-2xl text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
                {/* O resumo nos cards da tela inicial permanece em font-terminal para manter a vibe do site */}
                <p className="mb-6 font-terminal text-base md:text-lg lg:text-xl text-gray-400 flex-grow leading-relaxed">{project.shortDesc}</p>
                
                <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={i} className="border border-purple-800 bg-purple-950/50 px-2 py-1.5 md:px-3 md:py-2 font-pixel text-[10px] md:text-xs lg:text-sm text-purple-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="neon-border pixel-corners relative w-full max-w-5xl max-h-[85vh] bg-[#0d0714] flex flex-col shadow-[0_0_50px_rgba(168,85,247,0.4)] z-10"
            >
              
              <div className="relative h-32 sm:h-48 lg:h-64 shrink-0 overflow-hidden border-b border-purple-900/50">
                <Image 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  fill 
                  className="object-cover opacity-30 blur-[2px]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0714] to-transparent"></div>
                
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 bg-purple-900/50 border border-purple-500 text-white font-pixel text-xs md:text-base lg:text-lg px-4 py-2 md:px-6 md:py-3 hover:bg-purple-600 transition-colors z-20 pixel-corners"
                >
                  [ VOLTAR ]
                </button>

                <div className="absolute bottom-5 left-6 sm:left-8 md:bottom-8 md:left-10 z-10">
                  <h3 className="font-pixel text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg">{selectedProject.title}</h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-12 overflow-y-auto custom-scrollbar flex-grow">
                
                <div className="flex flex-wrap gap-3 mb-8 md:mb-12 border-b border-purple-900/30 pb-6 md:pb-8">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="border border-purple-800 bg-purple-900/30 px-3 py-1.5 md:px-4 md:py-2 font-pixel text-[10px] md:text-sm lg:text-base text-purple-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="prose prose-invert max-w-none">
                  {selectedProject.content}
                </div>

                <div className="mt-10 md:mt-16 pt-8 md:pt-10 border-t border-purple-900/30 text-center sm:text-left">
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-pixel text-sm md:text-xl lg:text-2xl px-8 py-4 md:px-10 md:py-5 pixel-corners shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all"
                  >
                    [ INICIAR_SISTEMA / ACESSAR ]
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;