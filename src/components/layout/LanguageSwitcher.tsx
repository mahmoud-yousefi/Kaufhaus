import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en'
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, right: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const place = () => {
    const r = btnRef.current?.getBoundingClientRect()
    if (r) setPos({ top: r.bottom + 8, right: window.innerWidth - r.right })
  }

  useEffect(() => {
    if (!open) return
    place()
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const onScroll = () => setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [open])

  const choose = (l: 'de' | 'en') => {
    i18n.changeLanguage(l)
    localStorage.setItem('lang', l)
    setOpen(false)
  }

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-full hover:bg-gray-100 transition-colors"
      >
        <Globe size={18} />
        <span className="hidden sm:inline">{lang.toUpperCase()}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <div className="fixed inset-0" style={{ zIndex: 300 }} onClick={() => setOpen(false)} />
              <motion.div
                ref={menuRef}
                role="menu"
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.16 }}
                style={{ position: 'fixed', top: pos.top, right: pos.right, zIndex: 301 }}
                className="w-44 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-lift"
              >
                {(['de', 'en'] as const).map(l => (
                  <button
                    key={l}
                    role="menuitemradio"
                    aria-checked={lang === l}
                    onClick={() => choose(l)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    <span className={lang === l ? 'font-semibold' : ''}>{l === 'de' ? 'Deutsch' : 'English'}</span>
                    {lang === l && <Check size={15} className="text-accent-500" />}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
