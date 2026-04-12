"use client";

import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false); 
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-40 mx-auto max-w-7xl font-pixel text-[9px] text-purple-300 md:top-6 lg:left-20 lg:right-20">
      <div className="neon-border pixel-corners flex items-center justify-between bg-[#150a21]/80 p-3 backdrop-blur-lg shadow-[0_0_20px_rgba(168,85,247,0.3)]">
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 bg-purple-500 animate-pulse"></span>
          <span className="text-white text-xs md:text-sm neon-text tracking-wider">VICTOR MENDES</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center space-x-5 border-r border-purple-900 pr-6 py-1">
            <li onClick={() => scrollToSection('home')} className="cursor-pointer text-purple-400 hover:text-white hover:neon-text transition-colors">[ HOME ]</li>
            <li onClick={() => scrollToSection('sobre')} className="cursor-pointer hover:text-white hover:neon-text transition-colors">SOBRE</li>
            <li onClick={() => scrollToSection('skills')} className="cursor-pointer hover:text-white hover:neon-text transition-colors">SKILLS</li>
            <li onClick={() => scrollToSection('projetos')} className="cursor-pointer hover:text-white hover:neon-text transition-colors">PROJETOS</li>
            <li onClick={() => scrollToSection('rota')} className="cursor-pointer hover:text-white hover:neon-text transition-colors">ROTA</li>
          </ul>
          <div className="flex items-center gap-4 text-white text-xs">
            <a href="https://github.com/VictorrMendes" target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[GITHUB]</a>
            <a href="https://www.linkedin.com/in/victor-mendes-de-souza-728270234/" target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[LINKEDIN]</a>
            <a href="https://wa.me/5531998186472" target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[WHATSAPP]</a>
          </div>
        </div>

        <div className="flex md:hidden items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-purple-400 transition-colors focus:outline-none"
          >
            {isOpen ? "[ X ]" : "[ MENU ]"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col items-center gap-4 neon-border pixel-corners bg-[#150a21]/95 p-5 backdrop-blur-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] animate-in fade-in slide-in-from-top-2">
          <ul className="flex flex-col items-center space-y-5 w-full border-b border-purple-900 pb-5 text-[10px]">
                        <li onClick={() => scrollToSection('home')} className="cursor-pointer text-purple-400 hover:text-white hover:neon-text transition-colors">[ HOME ]</li>
            <li onClick={() => scrollToSection('sobre')} className="cursor-pointer hover:text-white hover:neon-text transition-colors">SOBRE</li>
            <li onClick={() => scrollToSection('skills')} className="cursor-pointer hover:text-white hover:neon-text transition-colors">SKILLS</li>
            <li onClick={() => scrollToSection('projetos')} className="cursor-pointer hover:text-white hover:neon-text transition-colors">PROJETOS</li>
            <li onClick={() => scrollToSection('rota')} className="cursor-pointer hover:text-white hover:neon-text transition-colors">ROTA</li>
          </ul>

          <div className="flex justify-center gap-6 text-white text-[10px] w-full pt-1">
            <a href="https://github.com/VictorrMendes" target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[GITHUB]</a>
            <a href="https://www.linkedin.com/in/victor-mendes-de-souza-728270234/" target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[LINKEDIN]</a>
            <a href="https://wa.me/5531998186472" target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[WHATSAPP]</a>
          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;