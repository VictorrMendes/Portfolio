"use client";

import { motion } from "framer-motion";
import Contacts from "./Contacts";
import { timeline as timelineData } from "@/content/timeline";

const Timeline = () => {
  return (
    <div className="mt-20 mb-20 w-full max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 id="rota" className="font-pixel mb-12 md:mb-16 text-2xl md:text-3xl text-white text-left md:text-center">
          TRAJETORIA / REGISTROS
        </h2>
      </motion.div>

      <div className="relative w-full pb-8">
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-purple-900/50 transform -translate-x-1/2"></div>

        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15 }}
              className={`relative flex items-start mb-8 md:mb-12 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
            >
              <div className="absolute left-[15px] md:left-1/2 mt-1.5 w-4 h-4 rounded-full border-2 border-purple-500 bg-[#09030f] flex items-center justify-center z-10 transform -translate-x-1/2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              </div>

              <div className={`hidden md:block absolute mt-[13px] w-12 h-[2px] bg-purple-800/80 ${isLeft ? 'right-1/2' : 'left-1/2'}`}></div>

              <div className="md:hidden absolute left-[15px] mt-[13px] w-[25px] h-[2px] bg-purple-800/80"></div>

              <div className="hidden md:block w-1/2"></div>

              <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right text-left pl-10 md:pl-0' : 'pl-10 md:pl-12 text-left'}`}>

                <div className={`flex flex-wrap items-center gap-2 md:gap-4 mb-4 ${isLeft ? 'md:flex-row-reverse' : 'flex-row'}`}>
                  <h3 className={`font-pixel text-lg md:text-2xl text-purple-400 border-purple-600 ${isLeft ? 'md:border-r-2 md:pr-3 md:border-l-0 border-l-2 pl-3 md:pl-0' : 'border-l-2 pl-3'}`}>
                    {item.category}
                  </h3>
                  <span className="font-pixel text-sm md:text-base text-purple-600">{item.year}</span>
                </div>

                <div className="font-terminal text-gray-300">
                  {item.title && <p className="text-xl md:text-2xl text-white mb-1 font-bold">{item.title}</p>}
                  {item.subtitle && <p className="text-base md:text-lg text-gray-400 mb-4">{item.subtitle}</p>}
                  {item.description && <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed">{item.description}</p>}

                  {item.list && item.list.length > 0 && (
                    <ul className="space-y-2 mt-4">
                      {item.list.map((li, i) => (
                        <li key={i} className={`flex justify-between w-full md:w-4/5 ${isLeft ? 'md:ml-auto md:flex-row-reverse' : 'mr-auto'} gap-4 border-b border-purple-900/30 pb-1`}>
                          <span className="text-base md:text-lg text-gray-300">{li.name}</span>
                          {li.date && <span className="text-sm md:text-base text-purple-500/70 whitespace-nowrap">{li.date}</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 md:mt-32">
        <Contacts />
      </div>

    </div>
  );
};

export default Timeline;