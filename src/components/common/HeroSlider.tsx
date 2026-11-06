import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'

const slides = [
  { img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1800', title: 'heroSlide1Title', text: 'heroSlide1Text', accent: false },
  { img: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1800', title: 'heroSlide2Title', text: 'heroSlide2Text', accent: true },
  { img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1800', title: 'heroSlide3Title', text: 'heroSlide3Text', accent: false },
]

export default function HeroSlider() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = window.setInterval(() => setIndex(i => (i + 1) % slides.length), 6500)
    return () => window.clearInterval(id)
  }, [])

  const slide = slides[index]

  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-brand-900 text-white">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <img src={slide.img} alt="" className="h-full w-full object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/65 to-transparent" />

      <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center px-4 py-20">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-500/20 px-3 py-1 text-sm font-medium text-accent-500">
                <Star size={14} className="fill-accent-500" /> {t('common.newDelivery')}
              </div>
              <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">{t(`common.${slide.title}`)}</h1>
              <p className="mt-5 max-w-xl text-lg text-white/80">{t(`common.${slide.text}`)}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="rounded-full bg-white px-7 py-3.5 font-medium text-brand-900 shadow-lg transition hover:bg-gray-100">{t('common.shopNow')}</Link>
            <Link to="/offers" className="rounded-full border border-white/40 px-7 py-3.5 font-medium transition hover:bg-white/10">{t('nav.offers')}</Link>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2"><Star size={16} className="fill-amber-400 text-amber-400" /> 4.8/5 {t('common.reviews')}</span>
            <span>260+ {t('common.searchProducts')}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
      <button
        onClick={() => setIndex((index + 1) % slides.length)}
        className="absolute bottom-6 right-6 hidden h-10 w-10 items-center justify-center rounded-full border border-white/30 hover:bg-white/10 md:flex"
        aria-label="Next slide"
      >
        <ArrowRight size={18} />
      </button>
    </section>
  )
}
