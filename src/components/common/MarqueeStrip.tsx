import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Truck, Leaf, ShieldCheck, Gift, Coffee } from 'lucide-react'

export default function MarqueeStrip() {
  const { t } = useTranslation()
  const items = [
    { icon: Truck, text: t('common.benefit1') },
    { icon: Sparkles, text: t('common.newDelivery') },
    { icon: Leaf, text: t('common.bioRegional') },
    { icon: ShieldCheck, text: t('common.benefit2') },
    { icon: Gift, text: t('common.newsletter') },
    { icon: Coffee, text: t('common.editorialTitle') },
  ]
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-brand-100 bg-brand-50/70 py-3">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-2 text-sm font-medium text-brand-800">
            <it.icon size={16} className="text-accent-500" /> {it.text}
            <span className="ml-6 text-brand-300">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
