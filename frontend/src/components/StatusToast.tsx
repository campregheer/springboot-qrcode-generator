import { CheckCircle2, CircleAlert, LoaderCircle, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface StatusToastProps {
  message: string
  type: 'success' | 'error' | 'loading'
  onClose: () => void
}

export const StatusToast = ({ message, type, onClose }: StatusToastProps) => {
  const iconMap = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
    error: <CircleAlert className="h-5 w-5 text-rose-400" />,
    loading: <LoaderCircle className="h-5 w-5 animate-spin text-sky-400" />,
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96 }}
        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/85 px-4 py-3 text-sm text-slate-100 shadow-2xl shadow-black/30 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          {iconMap[type]}
          <span>{message}</span>
        </div>
        <button onClick={onClose} className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Fechar notificação">
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
