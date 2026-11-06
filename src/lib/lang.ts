export type Lang = 'de' | 'en'

/**
 * Normalise any language tag (`de`, `de-DE`, `en-US`, …) to a supported
 * two-letter language code. Anything unknown falls back to German.
 */
export function normalizeLang(value?: string | null): Lang {
  return value && value.toLowerCase().startsWith('en') ? 'en' : 'de'
}

/** Read the current language from an i18next instance (`i18n.language`). */
export function getLang(value?: string): Lang {
  return normalizeLang(value)
}
