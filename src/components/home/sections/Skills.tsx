"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
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

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<{ t: string; s: string; c: string; desc: string } | null>(null);

  return (
    <>
      <motion.div id="skills" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 className="mb-6 flex items-center gap-3 font-pixel text-lg text-white">
          <span className="h-5 w-2 bg-purple-600"></span>SKILLS / INVENTORY
        </h2>
        
        <div className="grid grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={`${skill.s}-${index}`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSkill(skill)} 
              className="neon-border pixel-corners flex aspect-square cursor-pointer flex-col items-center justify-center bg-[#150a21]/60 p-2 backdrop-blur-sm transition-colors hover:bg-purple-900/40"
            >
              <span className={`font-pixel text-2xl md:text-3xl ${skill.c}`}>{skill.t}</span>
              <span className="mt-2 text-center font-pixel text-[40%] text-gray-300">{skill.s}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="neon-border pixel-corners relative z-10 w-full max-w-sm bg-[#150a21] p-6 shadow-[0_0_30px_rgba(168,85,247,0.5)]"
            >
              <button 
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 font-pixel text-xs text-gray-400 hover:text-white transition-colors"
              >
                [X]
              </button>
              
              <div className="flex flex-col items-center text-center mt-2">
                <span className={`font-pixel text-5xl mb-4 ${selectedSkill.c}`}>
                  {selectedSkill.t}
                </span>
                <h3 className="font-pixel text-xl text-white mb-2">
                  {selectedSkill.s}
                </h3>
                
                <div className="w-full h-px bg-purple-900/50 my-4 relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rotate-45"></div>
                </div>

                <p className="font-terminal text-lg text-gray-300 leading-relaxed">
                  {selectedSkill.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Skills;