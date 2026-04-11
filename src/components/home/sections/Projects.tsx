import { motion } from "framer-motion";

const Projects = () => (
  <motion.div id="projetos" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
    <h2 className="mb-8 flex items-center gap-3 font-pixel text-lg text-white">
      <span className="h-5 w-2 bg-purple-600"></span>QUESTS CONCLUÍDAS
    </h2>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      <div className="neon-border pixel-corners group col-span-1 bg-[#150a21]/80 p-4 backdrop-blur-sm md:col-span-2">
        <h3 className="mb-4 border-b border-purple-900/50 pb-2 font-pixel text-sm text-white">FinanceVM (PWA)</h3>
        <p className="mb-4 font-terminal text-sm text-gray-300">App de gestão financeira pessoal estilo Private Bank. PWA instalável com gráficos dinâmicos.</p>
        <span className="border border-purple-800 bg-purple-950 px-2 py-1 font-pixel text-[8px] text-purple-300">NEXT.JS 15</span>
      </div>
      <div className="neon-border pixel-corners group col-span-1 bg-[#150a21]/80 p-4 backdrop-blur-sm md:col-span-2">
        <h3 className="mb-4 border-b border-purple-900/50 pb-2 font-pixel text-sm text-white">Assistente Pessoal IA</h3>
        <p className="mb-4 font-terminal text-sm text-gray-300">Orquestração via n8n consumindo Groq API (IA) para gerir infra nativa Linux via Telegram.</p>
        <span className="border border-purple-800 bg-purple-950 px-2 py-1 font-pixel text-[8px] text-purple-300">PYTHON + N8N</span>
      </div>
    </div>
  </motion.div>
);

export default Projects;
