"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";


const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-12 border-t-4 border-purple-900/50 bg-[#09030f]/80 pt-12 pb-8 backdrop-blur-md z-20">
      <div className="mx-auto max-w-7xl px-4 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <span className="w-2 h-2 bg-purple-500 animate-pulse"></span>
              <span className="font-pixel text-lg text-white neon-text">VMSTORM</span>
            </div>
            <p className="font-terminal text-gray-400 text-lg max-w-sm mt-2">
              Transformando lógica em experiências digitais. Código limpo, infraestrutura robusta e design imersivo.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-4">
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/VictorrMendes" 
                target="_blank" 
                rel="noreferrer"
                className="neon-border pixel-corners flex items-center justify-center p-2 bg-[#150a21] text-purple-400 hover:bg-purple-900/50 hover:text-white transition-colors"
              >
                <GithubIcon />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/victor-mendes-de-souza-728270234/" 
                target="_blank" 
                rel="noreferrer"
                className="neon-border pixel-corners flex items-center justify-center p-2 bg-[#150a21] text-purple-400 hover:bg-purple-900/50 hover:text-white transition-colors"
              >
                <LinkedinIcon />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/5531998186472" 
                target="_blank" 
                rel="noreferrer"
                className="neon-border pixel-corners flex items-center justify-center p-2 bg-[#150a21] text-purple-400 hover:bg-purple-900/50 hover:text-white transition-colors"
              >
                <WhatsappIcon />
              </motion.a>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 font-pixel text-[10px] text-gray-400 hover:text-purple-400 transition-colors group"
            >
              [ SCROLL TO TOP ] 
              <span className="p-1 border border-purple-900/50 bg-[#150a21] group-hover:border-purple-500 transition-colors">
                <ArrowUp size={14} />
              </span>
            </motion.button>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-purple-900/30 flex flex-col sm:flex-row justify-between items-center gap-4 font-terminal text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Victor Mendes de Souza. All rights reserved.</p>
          <p>PLAYER 1 READY_</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;