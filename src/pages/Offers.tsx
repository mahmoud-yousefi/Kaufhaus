import React from 'react'
import { useTranslation } from 'react-i18next'
import { products } from '../data/products'
import ProductCard from '../components/product/ProductCard'

export default function Offers() {
  const { t } = useTranslation()
  const offers = products.filter(p => p.originalPrice)
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="font-display text-3xl text-brand-900 mb-6">{t('nav.offers')}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {offers.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
