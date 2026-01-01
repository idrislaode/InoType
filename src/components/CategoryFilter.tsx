import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { Category, categories } from '@/data/arduinoSnippets';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selected: Category;
  onChange: (category: Category) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap justify-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Code2 className="w-4 h-4" />
        <span className="text-sm">Category:</span>
      </div>
      <div className="flex gap-1 flex-wrap justify-center">
        {categories.map((cat) => (
          <motion.button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={cn(
              "filter-chip",
              selected === cat.value && "filter-chip-active"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
