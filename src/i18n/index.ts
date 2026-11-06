import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import de from './de.json'
import en from './en.json'

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null

i18n.use(initReactI18next).init({
  resources: { de: { translation: de }, en: { translation: en } },
  lng: stored || 'de',
  fallbackLng: 'de',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') document.documentElement.lang = lng
  if (typeof localStorage !== 'undefined') localStorage.setItem('lang', lng)
})

export default i18n
