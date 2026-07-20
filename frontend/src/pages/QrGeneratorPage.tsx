import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Copy, Download, Sparkles, QrCode, RefreshCcw, ScanLine } from 'lucide-react'
import { ThemeToggle } from '../components/ThemeToggle'
import { StatusToast } from '../components/StatusToast'
import { useTheme } from '../hooks/useTheme'
import { postQrCode } from '../services/qrService'
import { validateQrInput } from '../utils/qrValidation'

export const QrGeneratorPage = () => {
  const { theme, setTheme } = useTheme()
  const [text, setText] = useState('https://github.com')
  const [loading, setLoading] = useState(false)
  const [resultUrl, setResultUrl] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const validation = useMemo(() => validateQrInput(text), [text])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validation.isValid) {
      setError(validation.message)
      setSuccess('')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')
    setResultUrl('')

    try {
      const data = await postQrCode(text.trim())
      setResultUrl(data.url)
      setSuccess('QR Code gerado com sucesso. Seu resultado está pronto para compartilhar.')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao gerar o QR Code.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!resultUrl) return
    try {
      await navigator.clipboard.writeText(resultUrl)
      setSuccess('Link copiado para a área de transferência.')
    } catch {
      setError('Não foi possível copiar automaticamente o link.')
    }
  }

  const handleDownload = () => {
    if (!resultUrl) return
    const link = document.createElement('a')
    link.href = resultUrl
    link.download = 'qrcode.png'
    link.click()
    setSuccess('Download iniciado com sucesso.')
  }

  const handleReset = () => {
    setText('')
    setResultUrl('')
    setError('')
    setSuccess('')
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.2),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] px-4 py-6 text-slate-900 transition-colors duration-500 dark:text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-[0_30px_120px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:bg-slate-950/50">
        <header className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-400 to-violet-500 text-white shadow-lg shadow-cyan-500/20">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.28em] text-slate-400 uppercase">QR Studio</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Gere QR Codes com elegância</p>
            </div>
          </div>
          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        </header>

        <section className="grid flex-1 gap-6 px-5 py-4 sm:px-8 sm:py-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-sm text-sky-600 dark:text-sky-300">
              <Sparkles className="h-4 w-4" />
              Interface moderna para produtos SaaS
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Transforme qualquer link ou texto em uma experiência visual impecável.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Crie QR Codes limpos, rápidos e bonitos para campanhas, produtos, apresentações ou compartilhamentos em segundos.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 rounded-[28px] border border-white/10 bg-white/70 p-4 shadow-lg shadow-slate-950/5 backdrop-blur-xl dark:bg-slate-900/70 sm:p-5">
              <label htmlFor="content" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Texto ou URL</label>
              <div className="group relative">
                <input
                  id="content"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Cole um link, texto ou convite..."
                  className={`w-full rounded-2xl border bg-transparent px-4 py-4 pr-12 text-base outline-none transition-all duration-300 ${validation.isValid ? 'border-slate-200 focus:border-sky-400 dark:border-slate-700 dark:focus:border-sky-400' : 'border-rose-300 focus:border-rose-400 dark:border-rose-500/50 dark:focus:border-rose-400'} shadow-sm focus:ring-4 focus:ring-sky-500/10`}
                />
                <div className={`pointer-events-none absolute inset-y-0 right-4 flex items-center ${validation.isValid ? 'text-slate-400' : 'text-rose-400'}`}>
                  <ScanLine className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className={`text-sm ${validation.isValid ? 'text-slate-500 dark:text-slate-400' : 'text-rose-500'}`}>
                  {validation.message}
                </p>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <QrCode className="h-4 w-4" />
                      Gerar QR Code
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="flex items-center">
            <div className="w-full rounded-[32px] border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-black/20 dark:bg-slate-900/70 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-100">Preview</p>
                  <p className="text-sm text-slate-400">Resultado em tempo real com transição elegante</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                  {resultUrl ? 'Pronto' : 'Aguardando'}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!resultUrl ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center"
                  >
                    <div className="mb-6 rounded-3xl border border-sky-400/20 bg-sky-400/10 p-5 text-sky-400">
                      <QrCode className="h-12 w-12" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white">Seu QR Code aparecerá aqui</h2>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
                      Adicione qualquer texto ou URL e veja o resultado ganhar vida com uma transição suave e elegante.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.96, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">QR Code gerado</p>
                          <p className="text-sm text-slate-400">Atualizado recentemente</p>
                        </div>
                        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                          Visual pronto
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center rounded-[24px] bg-white p-4 shadow-inner">
                        <img src={resultUrl} alt="QR Code gerado" className="h-56 w-56 rounded-2xl object-contain sm:h-64 sm:w-64" />
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                        <p className="mb-2 text-xs uppercase tracking-[0.28em] text-slate-500">URL gerada</p>
                        <p className="break-all text-sm text-slate-300">{resultUrl}</p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCopy} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/15">
                          <Copy className="h-4 w-4" />
                          Copiar
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleDownload} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/15">
                          <Download className="h-4 w-4" />
                          Download
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleReset} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/15">
                          <RefreshCcw className="h-4 w-4" />
                          Gerar outro
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>
      </div>

      <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-3 px-1 sm:px-0">
        <AnimatePresence mode="wait">
          {error ? <StatusToast key="error" message={error} type="error" onClose={() => setError('')} /> : null}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {success ? <StatusToast key="success" message={success} type="success" onClose={() => setSuccess('')} /> : null}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {loading ? <StatusToast key="loading" message="Gerando seu QR Code com cuidado..." type="loading" onClose={() => setSuccess('')} /> : null}
        </AnimatePresence>
      </div>
    </main>
  )
}
