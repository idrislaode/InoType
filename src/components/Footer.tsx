import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      className="text-center py-6 text-sm text-muted-foreground font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Strengthen your Muscle Memory • Inspired by{" "}
      <a
        href="https://androidtype.lovable.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:text-foreground transition-colors"
      >
        AndroidType
      </a>
    </motion.footer>
  );
}
