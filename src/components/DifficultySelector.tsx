import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';
import { Difficulty, difficulties } from '@/data/arduinoSnippets';
import { cn } from '@/lib/utils';

interface DifficultySelectorProps {
  selected: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

export function DifficultySelector({ selected, onChange }: DifficultySelectorProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap justify-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Gauge className="w-4 h-4" />
        <span className="text-sm">Level:</span>
      </div>
      <div className="flex gap-1 flex-wrap justify-center">
        {difficulties.map((diff) => (
          <motion.button
            key={diff.value}
            onClick={() => onChange(diff.value)}
            className={cn(
              "filter-chip",
              selected === diff.value && "filter-chip-active"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title={diff.description}
          >
            {diff.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
