import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

interface ThemeToggleProps {
  theme: 'dark' | 'light'
  onToggle: () => void
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-slate-700 shadow-sm backdrop-blur-xl transition-colors dark:text-slate-100"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </motion.button>
  )
}
