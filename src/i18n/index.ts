import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import de from './de.json'
import en from './en.json'
import { normalizeLang } from '../lib/lang'

const canStore = typeof localStorage !== 'undefined'
// Use a namespaced key so other projects on the same origin (GitHub Pages
// project sites share `*.github.io`) cannot override our language. Fall back to
// the legacy `lang` key once, normalising values such as `de-DE`.
const stored = canStore ? localStorage.getItem('kaufhaus-lang') ?? localStorage.getItem('lang') : null
const initialLang = normalizeLang(stored)

i18n.use(initReactI18next).init({
  resources: { de: { translation: de }, en: { translation: en } },
  lng: initialLang,
  supportedLngs: ['de', 'en'],
  fallbackLng: 'de',
  interpolation: { escapeValue: false },
})

if (canStore) localStorage.setItem('kaufhaus-lang', initialLang)
if (typeof document !== 'undefined') document.documentElement.lang = initialLang

i18n.on('languageChanged', (lng) => {
  const lang = normalizeLang(lng)
  if (typeof document !== 'undefined') document.documentElement.lang = lang
  if (canStore) localStorage.setItem('kaufhaus-lang', lang)
})

export default i18n
