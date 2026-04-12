import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => (
  <div id="home" className="mt-32 flex flex-col-reverse items-center justify-between gap-12 md:mt-40 lg:flex-row">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full text-center lg:w-3/5 lg:text-left"
    >
      <h1 className="mb-4 font-pixel text-3xl leading-snug tracking-wide text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] md:text-5xl lg:text-[48px]">
        VICTOR MENDES DE SOUZA
      </h1>
      <div className="mb-6 inline-block border-l-4 border-purple-500 bg-purple-950/60 px-3 py-1.5 pixel-corners">
        <p className="font-pixel text-[10px] tracking-widest text-purple-200 md:text-[11px]">
          DESENVOLVEDOR || FRONT-END || <span className="text-cyan-400">REACT</span> || <span className="text-blue-300">NEXT.JS</span> || <span className="text-yellow-400">PYTHON</span>
        </p>
      </div>
      <p className="mx-auto mb-10 max-w-2xl font-terminal text-xl leading-relaxed text-gray-200 md:text-2xl lg:mx-0">
        Embarcando na emocionante jornada como programador. Focado no desenvolvimento Front-end, dominando tecnologias modernas como JavaScript e React para moldar experiências digitais nítidas.
      </p>
      <motion.a
        href="/Currculo_Victor_Mendes_Desenvolvedor.pdf"
        download
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="neon-border pixel-corners group relative inline-block bg-[#8A2BE2]/20 px-10 py-5 font-pixel text-sm text-white transition-colors hover:bg-[#8A2BE2]/60 hover:shadow-[0_0_25px_#8A2BE2]"
      >
        [ PRESS START / INICIAR JORNADA ]
      </motion.a>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="relative"
    >
      <div className="absolute -inset-4 animate-pulse rounded-full bg-purple-600/25 blur-3xl"></div>
      <div className="neon-border pixel-corners relative z-10 border-4 border-[#a855f7] bg-[#120524] p-2 shadow-[0_0_40px_rgba(168,85,247,0.6)]">
        <div className="relative h-60 w-60 overflow-hidden border border-purple-900 pixelated md:h-72 md:w-72 lg:h-80 lg:w-80">
          <Image src="/avatar.png" alt="Victor Mendes" fill priority quality={100} className="object-cover" />
        </div>
      </div>
    </motion.div>
  </div>
);

export default Hero;
