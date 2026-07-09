"use client";

import { motion } from "framer-motion";

export type Tile = {
  key: string;
  icon: React.ReactNode;
  label: string;
  colorClassName?: string;
};

type TileGridProps = {
  tiles: Tile[];
  onSelect: (key: string) => void;
  columns?: string;
};

const TileGrid = ({ tiles, onSelect, columns = "grid-cols-4" }: TileGridProps) => (
  <div className={`grid gap-4 ${columns}`}>
    {tiles.map((tile) => (
      <motion.button
        key={tile.key}
        type="button"
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(tile.key)}
        className="neon-border pixel-corners flex aspect-square cursor-pointer flex-col items-center justify-center bg-[#150a21]/60 p-2 backdrop-blur-sm transition-colors hover:bg-purple-900/40 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09030f] focus:outline-none"
      >
        <div className={tile.colorClassName}>{tile.icon}</div>
        <span className="mt-2 text-center font-pixel text-[8px] text-gray-300">{tile.label}</span>
      </motion.button>
    ))}
  </div>
);

export default TileGrid;
