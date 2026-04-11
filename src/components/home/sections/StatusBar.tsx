import { motion } from "framer-motion";

import GithubGraph from "./GithubGraph";

const StatusBar = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="neon-border pixel-corners mt-16 flex w-full flex-col items-start justify-between gap-8 overflow-hidden border-l-4 border-l-purple-500 bg-[#120524]/90 p-5 shadow-lg backdrop-blur-md sm:p-6 xl:flex-row xl:items-center"
  >
    <div className="flex w-full flex-col gap-6 xl:w-auto">
      <a
        href="https://github.com/VictorrMendes"
        target="_blank"
        rel="noreferrer"
        className="group flex w-max items-center gap-2 font-pixel text-[10px] text-white hover:text-purple-300 hover:neon-text sm:text-xs"
      >
        [GH] GITHUB PROFILE <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>

      <div className="flex w-full flex-col items-start gap-6 font-terminal text-lg sm:flex-row sm:items-center sm:gap-8">
        <div className="flex flex-row items-center gap-6 sm:gap-10">
          <div className="flex min-w-max flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] text-purple-400">Level</span>
              <span className="font-pixel text-2xl text-white sm:text-3xl">54</span>
            </div>
            <span className="mt-1 font-pixel text-[8px] text-gray-500">(Repositórios)</span>
          </div>

          <div className="flex min-w-max flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] text-purple-400">Exp</span>
              <span className="font-pixel text-2xl text-white sm:text-3xl">250+</span>
            </div>
            <span className="mt-1 font-pixel text-[8px] text-gray-500">(Contrib.)</span>
          </div>
        </div>

        <div className="flex w-full flex-row justify-between gap-4 border-t border-purple-900/50 pt-4 sm:w-auto sm:flex-col sm:justify-center sm:gap-2 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <div className="min-w-max text-gray-300">
            Following: <span className="ml-1 font-pixel text-base text-white sm:text-lg">16</span>
          </div>
          <div className="min-w-max text-gray-300">
            Followers: <span className="ml-1 font-pixel text-base text-white sm:text-lg">4</span>
          </div>
        </div>
      </div>
    </div>

    <div className="[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full max-w-full overflow-x-auto pb-2 xl:w-auto">
      <GithubGraph />
    </div>
  </motion.div>
);

export default StatusBar;
