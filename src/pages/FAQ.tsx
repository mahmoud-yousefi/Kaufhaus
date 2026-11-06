import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'Wie lange dauert die Lieferung?', a: 'In der Regel 1-3 Werktage innerhalb Deutschlands.' },
  { q: 'Ab welchem Betrag ist der Versand kostenlos?', a: 'Ab einem Bestellwert von 49 €.' },
  { q: 'Wie kann ich bezahlen?', a: 'Kreditkarte, PayPal, SEPA-Lastschrift und Kauf auf Rechnung.' },
  { q: 'Wie lange kann ich Produkte zurückgeben?', a: '30 Tage ab Erhalt der Ware.' },
  { q: 'Gibt es einen Mindestbestellwert?', a: 'Nein, es gibt keinen Mindestbestellwert.' },
  { q: 'Sind die Produkte frisch?', a: 'Wir garantieren Frische bei allen verderblichen Produkten.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl text-brand-900 mb-6">FAQ</h1>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white rounded-xl shadow-card overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center px-5 py-4 text-left font-medium">
              {f.q} <ChevronDown size={18} className={`transition ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <div className="px-5 pb-4 text-gray-600 text-sm">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
