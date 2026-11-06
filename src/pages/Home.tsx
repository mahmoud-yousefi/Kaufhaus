import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Truck, Shield, RefreshCw, Leaf, Star } from 'lucide-react'
import { products } from '../data/products'
import { topLevelCategories } from '../data/categories'
import ProductCarousel from '../components/product/ProductCarousel'
import Reveal from '../components/common/Reveal'
import HeroSlider from '../components/common/HeroSlider'
import DealBanner from '../components/common/DealBanner'
import MarqueeStrip from '../components/common/MarqueeStrip'

export default function Home() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en'

  const bestsellers = products.slice(0, 8)
  const newArrivals = products.slice(8, 16)
  const offers = products.filter(p => p.originalPrice).slice(0, 8)
  const produce = products.filter(p => p.category === 'produce').slice(0, 8)
  const meat = products.filter(p => ['beef','chicken','turkey'].includes(p.category)).slice(0, 8)
  const bakery = products.filter(p => p.category === 'bakery' || p.category === 'cakes').slice(0, 8)
  const organic = products.filter(p => p.badges.includes('bio')).slice(0, 8)
  const electronics = products.filter(p => ['electronics','phones','computers','appliances'].includes(p.category)).slice(0, 8)
  const brands = Array.from(new Set(products.map(p => p.brand))).slice(0, 12)

  const Section = ({ title, items, link, subtitle }: { title: string; items: any[]; link?: string; subtitle?: string }) => (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <Reveal>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-brand-900">{title}</h2>
            {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
          </div>
          {link && <Link to={link} className="text-sm text-brand-700 flex items-center gap-1 hover:gap-2 transition-all">{t('common.showAll')} <ArrowRight size={16} /></Link>}
        </div>
      </Reveal>
      <ProductCarousel items={items} />
    </section>
  )

  return (
    <div>
      <HeroSlider />

      <MarqueeStrip />

      {/* Benefits */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, text: t('common.benefit1') },
            { icon: Shield, text: t('common.benefit2') },
            { icon: RefreshCw, text: t('common.benefit3') },
            { icon: Leaf, text: t('common.benefit4') },
          ].map((b, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex items-center gap-3">
                <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className="text-accent-500"><b.icon size={24} /></motion.div>
                <span className="text-sm font-medium">{b.text}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl text-brand-900 mb-6">{t('common.exploreCategories')}</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {topLevelCategories.slice(0, 12).map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.05}>
              <Link to={`/category/${cat.slug}`} className="group bg-white rounded-2xl p-4 text-center shadow-card hover:shadow-lift transition block">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto mb-2 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 font-display text-2xl"
                >
                  {cat.name[lang].charAt(0)}
                </motion.div>
                <div className="text-sm font-medium group-hover:text-brand-700">{cat.name[lang]}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <DealBanner />
      <Section title={t('common.weeklyOffers')} items={offers.length ? offers : bestsellers} link="/offers" subtitle={t('common.saveUpTo')} />
      <Section title={t('common.bestsellers')} items={bestsellers} link="/shop" subtitle={t('common.mostPopular')} />

      {/* Editorial banner */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden bg-brand-100">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="text-sm text-brand-600 font-medium mb-2">{t('common.editorialTitle')}</div>
                <h3 className="font-display text-2xl md:text-3xl text-brand-900 mb-3">{t('common.bioRegionalTitle')}</h3>
                <p className="text-gray-700 mb-6">{t('common.bioRegionalText')}</p>
                <Link to="/category/bio-produkte" className="self-start px-6 py-3 bg-brand-900 text-white rounded-full text-sm font-medium hover:bg-brand-700 transition">{t('common.shopNow')}</Link>
              </div>
              <motion.div className="h-64 md:h-auto overflow-hidden" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6 }}>
                <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900" alt="" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </Reveal>
      </section>

      <Section title={t('common.freshProduce')} items={produce} link="/category/obst-gemuese" />
      <Section title={t('common.premiumMeat')} items={meat} link="/category/fleisch-gefluegel" />
      <Section title={t('common.bakery')} items={bakery} link="/category/brot-backwaren" />
      <Section title={t('common.bioRegional')} items={organic} link="/category/bio-produkte" />
      <Section title={t('common.electronics')} items={electronics} link="/category/elektronik" />
      <Section title={t('common.newArrivals')} items={newArrivals} link="/shop" />

      {/* Brands */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <h2 className="font-display text-2xl text-brand-900 mb-6 text-center">{t('common.popularBrands')}</h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {brands.map((b, i) => (
              <Reveal key={b} delay={i * 0.03}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="px-5 py-3 bg-gray-50 rounded-full text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-900 transition cursor-pointer"
                >
                  {b}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl text-brand-900 mb-6 text-center">{t('common.trustTitle')}</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Anna M.', text: t('common.testimonial1'), rating: 5 },
            { name: 'Thomas K.', text: t('common.testimonial2'), rating: 5 },
            { name: 'Sarah L.', text: t('common.testimonial3'), rating: 4 },
          ].map((tst, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex mb-2">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} className={j < tst.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />)}</div>
                <p className="text-gray-700 mb-3">"{tst.text}"</p>
                <div className="text-sm font-medium text-brand-900">{tst.name}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brand-900 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="font-display text-3xl mb-3">{t('common.newsletter')}</h2>
            <p className="text-white/80 mb-6">{t('common.newsletterText')}</p>
            <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={t('common.email')} className="flex-1 px-4 py-3 rounded-full text-gray-900 outline-none" />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="px-6 py-3 bg-accent-500 rounded-full font-medium hover:bg-accent-600 transition">{t('common.subscribe')}</motion.button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
