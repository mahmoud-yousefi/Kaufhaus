import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const content: Record<string, { title: string; body: string }> = {
  impressum: { title: 'Impressum', body: 'Platzhalter. Angaben gemäß § 5 TMG werden vor kommerzieller Nutzung ergänzt. Dieses Dokument ist ein Platzhalter und bedarf rechtlicher Prüfung.' },
  datenschutz: { title: 'Datenschutz', body: 'Platzhalter. Datenschutzerklärung gemäß DSGVO. Vor kommerzieller Nutzung rechtlich prüfen lassen.' },
  agb: { title: 'AGB', body: 'Platzhalter. Allgemeine Geschäftsbedingungen. Vor kommerzieller Nutzung rechtlich prüfen lassen.' },
  widerruf: { title: 'Widerrufsbelehrung', body: 'Platzhalter. Widerrufsbelehrung für Verbraucher. Vor kommerzieller Nutzung rechtlich prüfen lassen.' },
}

export default function Legal() {
  const { slug } = useParams()
  const c = content[slug || ''] || { title: slug, body: 'Platzhalter.' }
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl text-brand-900 mb-4">{c.title}</h1>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
        Platzhalter — vor kommerzieller Nutzung rechtlich prüfen lassen.
      </div>
      <p className="text-gray-700 leading-relaxed">{c.body}</p>
    </div>
  )
}
