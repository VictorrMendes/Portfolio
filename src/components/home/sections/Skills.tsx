"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills, type Skill } from "@/content/skills";
import Modal from "@/components/ui/Modal";
import TileGrid from "@/components/ui/TileGrid";

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const tiles = skills.map((skill) => ({
    key: skill.s,
    icon: <span className={`font-pixel text-2xl md:text-3xl ${skill.c}`}>{skill.t}</span>,
    label: skill.s,
  }));

  return (
    <>
      <motion.div id="skills" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 className="mb-6 flex items-center gap-3 font-pixel text-lg text-white">
          <span className="h-5 w-2 bg-purple-600"></span>SKILLS / INVENTORY
        </h2>

        <TileGrid
          tiles={tiles}
          onSelect={(key) => setSelectedSkill(skills.find((s) => s.s === key) ?? null)}
        />
      </motion.div>

      <Modal open={selectedSkill !== null} onClose={() => setSelectedSkill(null)} panelClassName="w-full max-w-sm bg-[#150a21] p-6 neon-border pixel-corners">
        {selectedSkill && (
          <>
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 font-pixel text-xs text-gray-400 hover:text-white transition-colors"
            >
              [X]
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              <span className={`font-pixel text-5xl mb-4 ${selectedSkill.c}`}>{selectedSkill.t}</span>
              <h3 className="font-pixel text-xl text-white mb-2">{selectedSkill.s}</h3>

              <div className="w-full h-px bg-purple-900/50 my-4 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rotate-45"></div>
              </div>

              <p className="font-terminal text-lg text-gray-300 leading-relaxed">{selectedSkill.desc}</p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default Skills;
