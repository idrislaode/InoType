import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { durations } from '@/data/arduinoSnippets';
import { cn } from '@/lib/utils';

interface DurationSelectorProps {
  selected: number;
  onChange: (duration: number) => void;
}

export function DurationSelector({ selected, onChange }: DurationSelectorProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap justify-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span className="text-sm">Duration:</span>
      </div>
      <div className="flex gap-1">
        {durations.map((dur) => (
          <motion.button
            key={dur}
            onClick={() => onChange(dur)}
            className={cn(
              "filter-chip",
              selected === dur && "filter-chip-active"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {dur}s
          </motion.button>
        ))}
      </div>
    </div>
  );
}
