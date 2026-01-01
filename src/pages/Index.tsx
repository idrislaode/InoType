import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryFilter } from '@/components/CategoryFilter';
import { DifficultySelector } from '@/components/DifficultySelector';
import { DurationSelector } from '@/components/DurationSelector';
import { TypingTest } from '@/components/TypingTest';
import { Category, Difficulty, getRandomSnippet, Snippet } from '@/data/arduinoSnippets';
import { motion } from 'framer-motion';

const Index = () => {
  const [category, setCategory] = useState<Category>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [duration, setDuration] = useState(60);
  const [snippet, setSnippet] = useState<Snippet>(() => getRandomSnippet('all', 'beginner'));
  const [key, setKey] = useState(0);

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setSnippet(getRandomSnippet(newCategory, difficulty));
    setKey(prev => prev + 1);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setSnippet(getRandomSnippet(category, newDifficulty));
    setKey(prev => prev + 1);
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    setKey(prev => prev + 1);
  };

  const handleNewSnippet = useCallback(() => {
    setSnippet(getRandomSnippet(category, difficulty));
    setKey(prev => prev + 1);
  }, [category, difficulty]);

  const handleComplete = useCallback((wpm: number, accuracy: number) => {
    console.log(`Completed: ${wpm} WPM, ${accuracy}% accuracy`);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 pb-8">
        {/* Filters */}
        <motion.div 
          className="space-y-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap justify-center gap-6 p-4 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm">
            <CategoryFilter selected={category} onChange={handleCategoryChange} />
            <div className="hidden md:block w-px bg-border/50" />
            <DifficultySelector selected={difficulty} onChange={handleDifficultyChange} />
            <div className="hidden md:block w-px bg-border/50" />
            <DurationSelector selected={duration} onChange={handleDurationChange} />
          </div>
        </motion.div>

        {/* Typing Test */}
        <TypingTest
          key={key}
          snippet={snippet}
          duration={duration}
          onComplete={handleComplete}
          onNewSnippet={handleNewSnippet}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
