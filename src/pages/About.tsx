import React from 'react'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en'
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-display text-4xl text-brand-900 mb-6">Über Kaufhaus</h1>
      <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200" alt="" className="w-full h-64 object-cover rounded-2xl mb-6" />
      <div className="prose text-gray-700 leading-relaxed space-y-4">
        <p>Kaufhaus ist Ihr Premium-Kaufhaus für Lebensmittel, Mode, Elektronik und mehr. Wir verbinden die Tradition eines deutschen Warenhauses mit modernem Online-Shopping.</p>
        <p>Unsere Mission: Qualität, Vielfalt und Zuverlässigkeit für jeden Haushalt in Deutschland und Europa. Wir setzen auf regionale Partner, nachhaltige Lieferketten und frische Produkte.</p>
        <p>Mit über 150 sorgfältig ausgewählten Produkten, einem Magazin voller Inspiration und einem Service, der überzeugt, möchten wir Ihr vertrauensvoller Begleiter im Alltag sein.</p>
        <h2 className="font-display text-2xl text-brand-900 mt-6">Unsere Werte</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Qualität und Frische</li>
          <li>Nachhaltigkeit und Verantwortung</li>
          <li>Kundenzufriedenheit</li>
          <li>Transparenz und Fairness</li>
        </ul>
      </div>
    </div>
  )
}
