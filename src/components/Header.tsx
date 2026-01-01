import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export function Header() {
  return (
    <motion.header 
      className="text-center py-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-center gap-3 mb-2">
        <Cpu className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">
          <span className="text-primary">Ino</span>
          <span className="text-foreground">Type</span>
        </h1>
      </div>
      <p className="text-muted-foreground text-sm">
        Typing Speed Test for Arduino Developers by Idrsldev
      </p>
    </motion.header>
  );
}
