import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Reveal from '../components/common/Reveal'

export default function About() {
  return (
    <div>
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src="/images/site/photo-1555529669-e69e7aa0ba9a.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-900/60 flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-white">
            <Reveal>
              <h1 className="font-display text-5xl md:text-6xl mb-3">Über Kaufhaus</h1>
              <p className="text-lg text-white/80 max-w-2xl">Ihr Premium-Kaufhaus für Lebensmittel, Mode, Elektronik und mehr — mit Lieferservice in ganz Deutschland.</p>
            </Reveal>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <Reveal>
          <section>
            <h2 className="font-display text-3xl text-brand-900 mb-4">Unsere Geschichte</h2>
            <p className="text-gray-700 leading-relaxed">Kaufhaus verbindet die Tradition eines deutschen Warenhauses mit modernem Online-Shopping. Seit Jahren stehen Qualität, Vielfalt und Zuverlässigkeit im Mittelpunkt unseres Handelns. Wir setzen auf regionale Partner, nachhaltige Lieferketten und frische Produkte.</p>
          </section>
        </Reveal>
        <Reveal>
          <section className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Qualität', text: 'Sorgfältig ausgewählte Produkte mit hohen Standards.' },
              { title: 'Nachhaltigkeit', text: 'Regionale Partner und verantwortungsvolle Lieferketten.' },
              { title: 'Service', text: 'Schnelle Lieferung und zuverlässiger Kundenservice.' },
            ].map((v, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-xl text-brand-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.text}</p>
              </motion.div>
            ))}
          </section>
        </Reveal>
        <Reveal>
          <section>
            <h2 className="font-display text-3xl text-brand-900 mb-4">Zahlen & Fakten</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { n: '150+', l: 'Produkte' },
                { n: '30+', l: 'Kategorien' },
                { n: '4.8', l: 'Bewertung' },
                { n: '24/7', l: 'Service' },
              ].map((s, i) => (
                <div key={i} className="text-center bg-white rounded-2xl p-6 shadow-card">
                  <div className="font-display text-3xl text-brand-900">{s.n}</div>
                  <div className="text-sm text-gray-500">{s.l}</div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  )
}
