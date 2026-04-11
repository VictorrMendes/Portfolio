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
        
        <p className="mb-5">Desenvolvedor Frontend focado na stack React/Next.js e Analista de Operações experiente em otimização de processos.</p>
        <p>Fascinado por automação e infraestrutura digital. Transformo dores reais em soluções eficientes de alta performance, combinando código limpo no frontend com Home Labs auto-hospedados.</p>
      </div>
      <div className="mt-5">
      <Softskills />
      </div>
    </motion.div>

    <Skills />
  </div>
);

export default About;
