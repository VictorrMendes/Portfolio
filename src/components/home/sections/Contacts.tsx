import { motion } from "framer-motion";
import { Contact } from "lucide-react";




const Timeline = () => {
  return (
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 className="font-pixel mb-2 text-xl text-white">Modo Co-op</h2>
        <p className="font-terminal text-gray-400 mb-6 text-sm">Link to initiate a game text entry.</p>

        <div className="neon-border pixel-corners bg-[#150a21]/50 p-6 backdrop-blur-sm">
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-transparent border border-purple-800 rounded px-4 py-3 font-terminal text-lg text-white outline-none focus:border-purple-400 transition-colors" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-transparent border border-purple-800 rounded px-4 py-3 font-terminal text-lg text-white outline-none focus:border-purple-400 transition-colors" 
            />
            <textarea 
              placeholder="Message" 
              rows={4} 
              className="w-full bg-transparent border border-purple-800 rounded px-4 py-3 font-terminal text-lg text-white outline-none focus:border-purple-400 transition-colors resize-none"
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#a855f7] rounded py-3 font-pixel text-white text-sm hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all"
            >
              SEND
            </motion.button>
          </form>
        </div>

        <div className="flex gap-6 mt-6 font-pixel text-[10px] text-purple-300">
          <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
            <span className="w-3 h-3 bg-purple-700 inline-block rounded-sm"></span> LinkedIn
          </a>
          <a href="https://github.com/VictorrMendes" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
            <span className="w-3 h-3 bg-purple-700 inline-block rounded-full"></span> GitHub
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
            <span className="w-3 h-3 bg-purple-700 inline-block rotate-45"></span> Netlify
          </a>
        </div>
      </motion.div>



  );
};

export default Timeline;