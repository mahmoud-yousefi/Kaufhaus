import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Truck, Shield, RefreshCw, Leaf } from 'lucide-react'
import { products } from '../data/products'
import { categories, topLevelCategories } from '../data/categories'
import ProductCard from '../components/product/ProductCard'

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

  const Section = ({ title, items, link }: { title: string; items: any[]; link?: string }) => (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-display text-2xl md:text-3xl text-brand-900">{title}</h2>
        {link && <Link to={link} className="text-sm text-brand-700 flex items-center gap-1 hover:gap-2 transition-all">{t('common.showAll')} <ArrowRight size={16} /></Link>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-accent-500 font-medium mb-3">{t('common.homeHeroTitle')}</div>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-5">
              {t('common.homeHeroTitle')}
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-lg">{t('common.homeHeroSubtitle')}</p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/shop" className="px-7 py-3.5 bg-white text-brand-900 rounded-full font-medium hover:bg-gray-100 transition">{t('common.shopNow')}</Link>
              <Link to="/offers" className="px-7 py-3.5 border border-white/40 rounded-full font-medium hover:bg-white/10 transition">{t('nav.offers')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, text: t('common.benefit1') },
            { icon: Shield, text: t('common.benefit2') },
            { icon: RefreshCw, text: t('common.benefit3') },
            { icon: Leaf, text: t('common.benefit4') },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <b.icon size={22} className="text-accent-500" />
              <span className="text-sm font-medium">{b.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="font-display text-2xl md:text-3xl text-brand-900 mb-6">{t('common.exploreCategories')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {topLevelCategories.slice(0, 12).map(cat => (
            <Link key={cat.id} to={`/category/${cat.slug}`} className="group bg-white rounded-2xl p-4 text-center shadow-card hover:shadow-lift transition">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 font-display text-xl">
                {cat.name[lang].charAt(0)}
              </div>
              <div className="text-sm font-medium group-hover:text-brand-700">{cat.name[lang]}</div>
            </Link>
          ))}
        </div>
      </section>

      <Section title={t('common.weeklyOffers')} items={offers.length ? offers : bestsellers} link="/offers" />
      <Section title={t('common.bestsellers')} items={bestsellers} link="/shop" />
      <Section title={t('common.freshProduce')} items={produce} link="/category/obst-gemuese" />
      <Section title={t('common.premiumMeat')} items={meat} link="/category/fleisch-gefluegel" />

      {/* Editorial banner */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="relative rounded-3xl overflow-hidden bg-brand-100">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="text-sm text-brand-600 font-medium mb-2">{t('common.editorialTitle')}</div>
              <h3 className="font-display text-2xl md:text-3xl text-brand-900 mb-3">Bio & Regional aus Ihrer Region</h3>
              <p className="text-gray-700 mb-6">Entdecken Sie unsere kuratierte Auswahl an Bio- und Regionalprodukten — frisch, nachhaltig und mit Herkunftsgarantie.</p>
              <Link to="/category/bio-produkte" className="self-start px-6 py-3 bg-brand-900 text-white rounded-full text-sm font-medium hover:bg-brand-700 transition">{t('common.shopNow')}</Link>
            </div>
            <div className="h-64 md:h-auto">
              <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Section title={t('common.bakery')} items={bakery} link="/category/brot-backwaren" />
      <Section title={t('common.bioRegional')} items={organic} link="/category/bio-produkte" />
      <Section title={t('common.electronics')} items={electronics} link="/category/elektronik" />
      <Section title={t('common.newArrivals')} items={newArrivals} link="/shop" />

      {/* Newsletter */}
      <section className="bg-brand-900 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl mb-3">{t('common.newsletter')}</h2>
          <p className="text-white/80 mb-6">{t('common.newsletterText')}</p>
          <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={t('common.email')} className="flex-1 px-4 py-3 rounded-full text-gray-900 outline-none" />
            <button className="px-6 py-3 bg-accent-500 rounded-full font-medium hover:bg-accent-600 transition">{t('common.subscribe')}</button>
          </form>
        </div>
      </section>
    </div>
  )
}
