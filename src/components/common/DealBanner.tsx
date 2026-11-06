import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { products } from '../../data/products'
import { formatPrice } from '../../lib/utils'

function useCountdown() {
  const [left, setLeft] = useState(3600 * 8 + 42 * 60)
  useEffect(() => {
    const id = window.setInterval(() => setLeft(v => (v > 0 ? v - 1 : 0)), 1000)
    return () => window.clearInterval(id)
  }, [])
  const h = Math.floor(left / 3600)
  const m = Math.floor((left % 3600) / 60)
  const s = left % 60
  return { h, m, s }
}

export default function DealBanner() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en'
  const { h, m, s } = useCountdown()
  const deal = products.find(p => p.originalPrice) || products[0]
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-3xl bg-accent-500 text-white"
      >
        <div className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr_0.8fr]">
          <div className="p-8 md:p-10">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{t('nav.offers')}</div>
            <h2 className="font-display text-3xl md:text-4xl">{t('common.weeklyOffers')}</h2>
            <p className="mt-3 max-w-sm text-white/85">{t('common.saveUpTo')}</p>
            <div className="mt-6 flex items-center gap-3">
              {[pad(h), pad(m), pad(s)].map((n, i) => (
                <React.Fragment key={i}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 font-display text-xl tabular-nums backdrop-blur">{n}</div>
                  {i < 2 && <span className="text-xl font-bold">:</span>}
                </React.Fragment>
              ))}
              <span className="ml-2 text-sm text-white/70">{t('common.min')}</span>
            </div>
          </div>
          <div className="hidden h-48 md:block">
            <img src={deal.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="p-8 md:p-10 md:pl-0">
            <div className="text-sm text-white/70">{deal.brand}</div>
            <div className="font-display text-2xl">{deal.name[lang]}</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-semibold">{formatPrice(deal.price, lang)}</span>
              {deal.originalPrice && <span className="text-white/60 line-through">{formatPrice(deal.originalPrice, lang)}</span>}
            </div>
            <Link to={`/product/${deal.slug}`} className="mt-5 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent-600 transition hover:bg-white/90">
              {t('common.shopNow')}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
