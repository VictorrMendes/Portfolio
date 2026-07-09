"use client";

import { useState } from "react";
import { SITE } from "@/content/site";

const NAV_ITEMS = [
  { id: "home", label: "[ HOME ]" },
  { id: "sobre", label: "SOBRE" },
  { id: "skills", label: "SKILLS" },
  { id: "projetos", label: "PROJETOS" },
  { id: "rota", label: "ROTA" },
];

const FOCUS_RING =
  "focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09030f] focus:outline-none rounded-sm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-40 mx-auto max-w-7xl font-pixel text-[9px] text-purple-300 md:top-6 lg:left-20 lg:right-20">
      <div className="neon-border pixel-corners flex items-center justify-between bg-[#150a21]/80 p-3 backdrop-blur-lg">
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 bg-purple-500 animate-pulse"></span>
          <span className="text-white text-xs md:text-sm neon-text tracking-wider">VICTOR MENDES</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center space-x-5 border-r border-purple-900 pr-6 py-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`cursor-pointer text-purple-400 hover:text-white hover:neon-text transition-colors ${FOCUS_RING}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 text-white text-xs">
            <a href={SITE.github} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[GITHUB]</a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[LINKEDIN]</a>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[WHATSAPP]</a>
          </div>
        </div>

        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            className={`text-white hover:text-purple-400 transition-colors ${FOCUS_RING}`}
          >
            {isOpen ? "[ X ]" : "[ MENU ]"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="menu-mobile"
          className="md:hidden mt-2 flex flex-col items-center gap-4 neon-border pixel-corners bg-[#150a21]/95 p-5 backdrop-blur-lg animate-in fade-in slide-in-from-top-2"
        >
          <ul className="flex flex-col items-center space-y-5 w-full border-b border-purple-900 pb-5 text-[10px]">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`cursor-pointer text-purple-400 hover:text-white hover:neon-text transition-colors ${FOCUS_RING}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-6 text-white text-[10px] w-full pt-1">
            <a href={SITE.github} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[GITHUB]</a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[LINKEDIN]</a>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[WHATSAPP]</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
