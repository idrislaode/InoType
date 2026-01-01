import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Zap, Target, RotateCcw, Cpu } from 'lucide-react';
import { Snippet } from '@/data/arduinoSnippets';
import { cn } from '@/lib/utils';

interface TypingTestProps {
  snippet: Snippet;
  duration: number;
  onComplete: (wpm: number, accuracy: number) => void;
  onNewSnippet: () => void;
}

export function TypingTest({ snippet, duration, onComplete, onNewSnippet }: TypingTestProps) {
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const code = snippet.code;
  const lines = code.split('\n');

  // Calculate stats
  const correctChars = input.split('').filter((char, i) => char === code[i]).length;
  const totalTyped = input.length;
  const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;
  
  const elapsedMinutes = startTime ? (Date.now() - startTime) / 60000 : 0;
  const wpm = elapsedMinutes > 0 ? Math.round((correctChars / 5) / elapsedMinutes) : 0;

  // Timer
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          setIsComplete(true);
          onComplete(wpm, accuracy);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, wpm, accuracy, onComplete]);

  // Check completion
  useEffect(() => {
    if (input === code && input.length > 0) {
      setIsActive(false);
      setIsComplete(true);
      onComplete(wpm, accuracy);
    }
  }, [input, code, wpm, accuracy, onComplete]);

  // Get the expected indentation at current position
  const getExpectedIndent = useCallback((position: number): string => {
    // Find the indentation that should be at this position in the code
    let indent = '';
    for (let i = position; i < code.length; i++) {
      const char = code[i];
      if (char === ' ') {
        indent += ' ';
      } else if (char === '\t') {
        indent += '\t';
      } else {
        break;
      }
    }
    return indent;
  }, [code]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComplete) {
      e.preventDefault();
      return;
    }

    const currentPos = input.length;
    const expectedChar = code[currentPos];

    // Handle Enter key
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (expectedChar === '\n') {
        // Add the newline
        let newInput = input + '\n';
        
        // Auto-add the expected indentation after newline
        const indent = getExpectedIndent(currentPos + 1);
        newInput += indent;
        
        if (!isActive && newInput.length === 1) {
          setIsActive(true);
          setStartTime(Date.now());
        }
        
        setInput(newInput);
      }
      return;
    }

    // Handle Tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      
      if (expectedChar === ' ') {
        // Check if we need to add spaces (2-space indent)
        let spacesToAdd = '';
        for (let i = currentPos; i < code.length && code[i] === ' '; i++) {
          spacesToAdd += ' ';
          if (spacesToAdd.length >= 2) break; // Add 2 spaces at a time
        }
        
        if (spacesToAdd.length > 0) {
          if (!isActive) {
            setIsActive(true);
            setStartTime(Date.now());
          }
          setInput(input + spacesToAdd);
        }
      }
      return;
    }

    // Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (input.length > 0) {
        setInput(input.slice(0, -1));
      }
      return;
    }
  }, [input, code, isActive, isComplete, getExpectedIndent]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Ignore if trying to add newline through normal input (handled in keydown)
    if (value.includes('\n') && !input.includes('\n')) {
      return;
    }
    
    // Only process single character additions
    if (value.length === input.length + 1) {
      const newChar = value[value.length - 1];
      
      // Skip newlines here (handled in keydown)
      if (newChar === '\n') {
        return;
      }
      
      if (!isActive && !isComplete) {
        setIsActive(true);
        setStartTime(Date.now());
      }

      if (!isComplete) {
        setInput(value);
      }
    } else if (value.length < input.length) {
      // Handle deletion
      setInput(value);
    }
  }, [input, isActive, isComplete]);

  const handleReset = () => {
    setInput('');
    setTimeLeft(duration);
    setIsActive(false);
    setIsComplete(false);
    setStartTime(null);
    textareaRef.current?.focus();
  };

  const handleNewSnippet = () => {
    handleReset();
    onNewSnippet();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Convert flat index to line and column
  const getLineAndCol = (index: number): { line: number; col: number } => {
    let remaining = index;
    for (let i = 0; i < lines.length; i++) {
      const lineLen = lines[i].length + (i < lines.length - 1 ? 1 : 0); // +1 for \n
      if (remaining < lineLen) {
        return { line: i, col: remaining };
      }
      remaining -= lineLen;
    }
    return { line: lines.length - 1, col: lines[lines.length - 1].length };
  };

  // Get current cursor position
  const cursorPos = getLineAndCol(input.length);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Stats */}
      <div className="flex justify-center gap-4">
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Timer className="w-4 h-4" />
            <span>TIME</span>
          </div>
          <div className="text-2xl font-mono font-bold text-primary">
            {formatTime(timeLeft)}
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Zap className="w-4 h-4" />
            <span>WPM</span>
          </div>
          <div className="text-2xl font-mono font-bold text-arduino-yellow">
            {wpm}
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Target className="w-4 h-4" />
            <span>ACCURACY</span>
          </div>
          <div className={cn(
            "text-2xl font-mono font-bold",
            accuracy >= 90 ? "text-arduino-green" : accuracy >= 70 ? "text-arduino-yellow" : "text-destructive"
          )}>
            {accuracy}%
          </div>
        </motion.div>
      </div>

      {/* Code Editor */}
      <motion.div 
        className="code-editor"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={() => textareaRef.current?.focus()}
      >
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-muted-foreground font-mono">{snippet.filename}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Cpu className="w-3 h-3" />
            <span>{snippet.library}</span>
          </div>
        </div>

        {/* Code Area */}
        <div className="p-4 min-h-[200px] font-mono text-sm leading-relaxed relative overflow-x-auto">
          {/* Code display with line numbers */}
          <div className="flex">
            {/* Line numbers */}
            <div className="flex-shrink-0 pr-4 text-right text-muted-foreground/50 select-none border-r border-border/30 mr-4">
              {lines.map((_, lineIndex) => (
                <div key={lineIndex} className="h-6">
                  {lineIndex + 1}
                </div>
              ))}
            </div>
            
            {/* Code content */}
            <div className="flex-1 whitespace-pre">
              {lines.map((line, lineIndex) => {
                // Calculate the starting index for this line
                let lineStartIndex = 0;
                for (let i = 0; i < lineIndex; i++) {
                  lineStartIndex += lines[i].length + 1; // +1 for \n
                }

                return (
                  <div key={lineIndex} className="h-6 flex">
                    {line.split('').map((char, charIndex) => {
                      const absoluteIndex = lineStartIndex + charIndex;
                      let className = 'code-char';
                      
                      if (absoluteIndex < input.length) {
                        if (input[absoluteIndex] === char) {
                          className += ' code-char-correct';
                        } else {
                          className += ' code-char-incorrect';
                        }
                      } else if (absoluteIndex === input.length) {
                        className += ' code-char-current';
                      }

                      return (
                        <span key={charIndex} className={className}>
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      );
                    })}
                    {/* Show cursor at end of line for Enter */}
                    {lineIndex < lines.length - 1 && lineStartIndex + line.length === input.length && (
                      <span className="code-char code-char-current">
                        {'\u00A0'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hidden textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 opacity-0 cursor-text resize-none"
            autoFocus
            disabled={isComplete}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      </motion.div>

      {/* Instructions / Results */}
      <AnimatePresence mode="wait">
        {!isActive && !isComplete && (
          <motion.p
            key="instruction"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-muted-foreground"
          >
            Click the code area and start typing. Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Enter</kbd> for new line (auto-indents), <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Tab</kbd> for spaces
          </motion.p>
        )}

        {isComplete && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-4"
          >
            <h3 className="text-xl font-bold text-primary">
              {input === code ? '🎉 Perfect!' : '⏱️ Time\'s up!'}
            </h3>
            <p className="text-muted-foreground">
              You typed at <span className="text-arduino-yellow font-bold">{wpm} WPM</span> with{' '}
              <span className={accuracy >= 90 ? "text-arduino-green" : "text-destructive"}>
                {accuracy}% accuracy
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Snippet Button */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleNewSnippet}
          className="btn-primary"
        >
          <RotateCcw className="w-4 h-4" />
          New Snippet
        </button>
      </motion.div>
    </div>
  );
}
