import { motion } from "framer-motion";
import Skills from "./Skills";
import Softskills from "./Softskills";



const About = () => (
  <div id="sobre" className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
      <h2 className="mb-6 flex items-center gap-3 font-pixel text-lg text-white">
        <span className="h-5 w-2 bg-purple-600"></span>ABOUT THE PLAYER
      </h2>
      <div className="neon-border pixel-corners relative min-h-75 bg-[#150a21]/80 p-8 font-terminal text-xl leading-relaxed text-gray-200 backdrop-blur-sm">
        
        <p className="mb-5">A mente analítica de um logístico combinada com a engenhosidade de um desenvolvedor. Atualmente cursando Ciência da Computação, atuo como Desenvolvedor focado no Front-End moderno (React, Next.js, TypeScript) e na construção de integrações sólidas no Back-End (Python, Django). Trago para o código uma visão sistêmica focada em resolver problemas reais.</p>
        <p>Acredito que a tecnologia não serve apenas para criar sistemas, mas para moldar a nossa realidade. Meu objetivo é sempre unir a lógica operacional com a inovação do código para criar arquiteturas limpas, automatizadas e que geram impacto direto.</p>
      </div>
      <div className="mt-5">
      <Softskills />
      </div>
    </motion.div>

    <Skills />
  </div>
);

export default About;
