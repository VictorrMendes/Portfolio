"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Importando os ícones da biblioteca Lucide
import { Users, Rocket, Target, MessageSquare } from "lucide-react";

// Trocamos a chave "t" (texto) por "Icon" (Componente)
const softSkillsData = [
  { 
    Icon: Users, 
    s: "Equipe", 
    c: "text-pink-400", 
    desc: "Trabalho bem em equipe, valorizando a colaboração e o respeito mútuo para alcançar objetivos comuns." 
  },
  { 
    Icon: Rocket, 
    s: "Proativo", 
    c: "text-purple-300", 
    desc: "Sempre tomo a iniciativa para antecipar problemas, buscar soluções e assumir responsabilidades sem precisar de microgerenciamento." 
  },
  { 
    Icon: Target, 
    s: "Dedicado", 
    c: "text-orange-500", 
    desc: "Alto nível de foco e comprometimento com as entregas, buscando sempre a excelência e a qualidade no código." 
  },
  { 
    Icon: MessageSquare, 
    s: "Comunicativo", 
    c: "text-green-400", 
    desc: "Habilidade de expressar ideias técnicas de forma clara, ouvir ativamente e manter o alinhamento com stakeholders." 
  },
];

type SkillType = {
  Icon: React.ElementType;
  s: string;
  c: string;
  desc: string;
};

const Softskills = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);

  return (
    <>
      <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 className="mb-6 flex items-center gap-3 font-pixel text-lg text-white">
          <span className="h-5 w-2 bg-purple-600"></span>SOFT SKILLS
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {softSkillsData.map((skill, index) => {
            const IconComponent = skill.Icon; 
            
            return (
              <motion.div
                key={`${skill.s}-${index}`}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSkill(skill)} 
                className="neon-border pixel-corners flex aspect-square cursor-pointer flex-col items-center justify-center bg-[#150a21]/60 p-2 backdrop-blur-sm transition-colors hover:bg-purple-900/40"
              >
                <div className={`mb-2 ${skill.c}`}>
                  <IconComponent size={36} strokeWidth={1.5} />
                </div>
                <span className="mt-1 text-center font-pixel text-[8px] sm:text-[10px] text-gray-300">
                  {skill.s}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedSkill && (
          <div key={selectedSkill.s} className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
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
              onMouseLeave={() => setSelectedSkill(null)}
              className="neon-border pixel-corners relative z-10 w-full max-w-sm bg-[#150a21] p-6 shadow-[0_0_30px_rgba(168,85,247,0.5)]"
            >
              <button 
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 font-pixel text-xs text-gray-400 hover:text-white transition-colors"
              >
                [X]
              </button>
              
              <div className="flex flex-col items-center text-center mt-2">
                <div className={`mb-4 ${selectedSkill.c}`}>
                  <selectedSkill.Icon size={64} strokeWidth={1.5} />
                </div>
                
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

export default Softskills;