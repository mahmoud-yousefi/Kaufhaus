import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  return (
    <footer className="bg-brand-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-display text-2xl mb-3">Kaufhaus</div>
          <p className="text-sm text-white/70">{t('common.homeHeroSubtitle')}</p>
          <div className="flex gap-3 mt-4">
            <Facebook size={18} className="opacity-70 hover:opacity-100 cursor-pointer" />
            <Instagram size={18} className="opacity-70 hover:opacity-100 cursor-pointer" />
            <Twitter size={18} className="opacity-70 hover:opacity-100 cursor-pointer" />
            <Youtube size={18} className="opacity-70 hover:opacity-100 cursor-pointer" />
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">{t('common.footerAbout')}</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-white">Über uns</Link></li>
            <li><Link to="/magazine" className="hover:text-white">Magazin</Link></li>
            <li><Link to="/contact" className="hover:text-white">Kontakt</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">{t('common.footerService')}</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Versand & Lieferung</li>
            <li>Rückgabe & Erstattung</li>
            <li>Zahlungsmethoden</li>
            <li>Kundenservice</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">{t('common.footerLegal')}</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/legal/impressum" className="hover:text-white">Impressum</Link></li>
            <li><Link to="/legal/datenschutz" className="hover:text-white">Datenschutz</Link></li>
            <li><Link to="/legal/agb" className="hover:text-white">AGB</Link></li>
            <li><Link to="/legal/widerruf" className="hover:text-white">Widerrufsbelehrung</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {year} Kaufhaus. {t('common.rights')}
      </div>
    </footer>
  )
}
