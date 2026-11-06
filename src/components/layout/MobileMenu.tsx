import { getLang } from '../../lib/lang'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { topLevelCategories, getChildren } from '../../data/categories'

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, i18n } = useTranslation()
  const lang = getLang(i18n.language)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 md:hidden"
          style={{ zIndex: 400 }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="absolute left-0 top-0 flex h-full w-[86vw] max-w-sm flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <Link to="/" onClick={onClose} className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-900 font-display text-white">K</span>
                <span className="font-display text-lg font-semibold text-brand-900">Kaufhaus</span>
              </Link>
              <button onClick={onClose} aria-label="Close menu" className="rounded-full p-2 hover:bg-gray-100"><X size={20} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-0.5">
                {topLevelCategories.map(cat => (
                  <div key={cat.id}>
                    <Link to={`/category/${cat.slug}`} onClick={onClose} className="flex items-center justify-between rounded-xl px-3 py-2.5 font-medium text-brand-900 hover:bg-gray-50">
                      {cat.name[lang]}
                      {getChildren(cat.id).length > 0 && <ChevronRight size={16} className="text-gray-400" />}
                    </Link>
                    {getChildren(cat.id).length > 0 && (
                      <div className="mb-1 ml-3 border-l border-gray-100 pl-2">
                        {getChildren(cat.id).map(sub => (
                          <Link key={sub.id} to={`/category/${sub.slug}`} onClick={onClose} className="block rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:text-brand-700">
                            {sub.name[lang]}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-gray-100 pt-4 space-y-1">
                <Link to="/shop" onClick={onClose} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-gray-50">{t('nav.shop')}</Link>
                <Link to="/offers" onClick={onClose} className="block rounded-xl px-3 py-2.5 font-medium text-red-600 hover:bg-red-50">{t('nav.offers')}</Link>
                <Link to="/magazine" onClick={onClose} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-gray-50">{t('nav.magazine')}</Link>
                <Link to="/about" onClick={onClose} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-gray-50">{t('nav.about')}</Link>
                <Link to="/contact" onClick={onClose} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-gray-50">{t('nav.contact')}</Link>
                <Link to="/faq" onClick={onClose} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-gray-50">{t('nav.faq')}</Link>
              </div>
            </nav>
            <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
              © {new Date().getFullYear()} Kaufhaus
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
