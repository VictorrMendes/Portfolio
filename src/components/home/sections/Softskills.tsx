"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { softSkills, type SoftSkill } from "@/content/soft-skills";
import Modal from "@/components/ui/Modal";
import TileGrid from "@/components/ui/TileGrid";

const Softskills = () => {
  const [selectedSkill, setSelectedSkill] = useState<SoftSkill | null>(null);

  const tiles = softSkills.map((skill) => ({
    key: skill.s,
    icon: <skill.Icon size={36} strokeWidth={1.5} />,
    label: skill.s,
    colorClassName: `mb-2 ${skill.c}`,
  }));

  return (
    <>
      <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 className="mb-6 flex items-center gap-3 font-pixel text-lg text-white">
          <span className="h-5 w-2 bg-purple-600"></span>SOFT SKILLS
        </h2>

        <TileGrid
          tiles={tiles}
          columns="grid-cols-2 md:grid-cols-4"
          onSelect={(key) => setSelectedSkill(softSkills.find((s) => s.s === key) ?? null)}
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
              <div className={`mb-4 ${selectedSkill.c}`}>
                <selectedSkill.Icon size={64} strokeWidth={1.5} />
              </div>

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

export default Softskills;
