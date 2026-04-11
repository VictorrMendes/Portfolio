import { motion } from "framer-motion";
import Contacts from "./Contacts";

const Timeline = () => {
  return (
    <div  className="mt-20 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 id="rota" className="font-pixel mb-10 text-xl text-white">TRAJETÓRIA / REGISTROS</h2>

        <div className="relative border-l-2 border-purple-600 ml-3 pl-8 pb-4 space-y-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
            <div className="absolute -left-10.25 top-1 h-4 w-4 rounded-full border-4 border-[#09030f] bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>

            <div className="flex items-center justify-between mb-1 w-full max-w-sm">
              <h3 className="font-pixel text-sm text-purple-400">Education</h3>
              <span className="font-pixel text-xs text-purple-600">2024</span>
            </div>
            <p className="font-terminal text-xl text-white">Ciência da Computação</p>
            <p className="font-terminal text-lg text-gray-400">Anhembi Morumbi</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -left-10.25 top-1 h-4 w-4 rounded-full border-4 border-[#09030f] bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>

            <h3 className="font-pixel text-sm text-purple-400 mb-3">Certificações</h3>
            <ul className="font-terminal text-lg text-gray-300 space-y-2 max-w-sm">
              <li className="flex justify-between">
                <span>React</span> <span className="text-purple-600">2025</span>
              </li>
              <li className="flex justify-between">
                <span>JavaScript</span> <span className="text-purple-600">2025</span>
              </li>
              <li className="flex justify-between">
                <span>Django</span> <span className="text-purple-600">2025</span>
              </li>
              <li className="flex justify-between">
                <span>Python</span> <span className="text-purple-600">2025</span>
              </li>
              <li className="flex justify-between">
                <span>Git e GitHub</span> <span className="text-purple-600">2025</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

        <Contacts />
    </div>
  );
  
};

export default Timeline;
