"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import Modal from "@/components/ui/Modal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <motion.div id="projetos" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
        <h2 className="mb-8 flex items-center gap-3 font-pixel text-lg md:text-2xl text-white">
          <span className="h-6 md:h-8 w-2 bg-purple-600"></span>QUESTS CONCLUIDAS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <motion.button
              key={project.title}
              type="button"
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
              className="neon-border pixel-corners group flex w-full flex-col text-left bg-[#150a21]/80 backdrop-blur-sm cursor-pointer hover:bg-purple-900/20 transition-all overflow-hidden h-full focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09030f] focus:outline-none"
            >
              <div className="relative w-full h-48 md:h-56 border-b border-purple-900/50 overflow-hidden bg-[#09030f]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150a21]/90 to-transparent"></div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="mb-4 font-pixel text-base md:text-xl lg:text-2xl text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
                <p className="mb-6 font-terminal text-base md:text-lg lg:text-xl text-gray-400 flex-grow leading-relaxed">{project.shortDesc}</p>

                <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
                  {project.tech.map((t) => (
                    <span key={t} className="border border-purple-800 bg-purple-950/50 px-2 py-1.5 md:px-3 md:py-2 font-pixel text-[10px] md:text-xs lg:text-sm text-purple-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <Modal
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        panelClassName="w-full max-w-5xl max-h-[85vh] bg-[#0d0714] flex flex-col neon-border pixel-corners"
      >
        {selectedProject && (
          <>
            <div className="relative h-32 sm:h-48 lg:h-64 shrink-0 overflow-hidden border-b border-purple-900/50">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover opacity-30 blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0714] to-transparent"></div>

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 bg-purple-900/50 border border-purple-500 text-white font-pixel text-xs md:text-base lg:text-lg px-4 py-2 md:px-6 md:py-3 hover:bg-purple-600 transition-colors z-20 pixel-corners"
              >
                [ VOLTAR ]
              </button>

              <div className="absolute bottom-5 left-6 sm:left-8 md:bottom-8 md:left-10 z-10">
                <h3 className="font-pixel text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg">{selectedProject.title}</h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-12 overflow-y-auto custom-scrollbar flex-grow">
              <div className="flex flex-wrap gap-3 mb-8 md:mb-12 border-b border-purple-900/30 pb-6 md:pb-8">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="border border-purple-800 bg-purple-900/30 px-3 py-1.5 md:px-4 md:py-2 font-pixel text-[10px] md:text-sm lg:text-base text-purple-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert max-w-none">{selectedProject.content}</div>

              <div className="mt-10 md:mt-16 pt-8 md:pt-10 border-t border-purple-900/30 text-center sm:text-left">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-pixel text-sm md:text-xl lg:text-2xl px-8 py-4 md:px-10 md:py-5 pixel-corners transition-all"
                >
                  [ INICIAR_SISTEMA / ACESSAR ]
                </a>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default Projects;
