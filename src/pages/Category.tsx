import { getLang } from '../lib/lang'
import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { categories, getCategoryBySlug, getChildren } from '../data/categories'
import { products } from '../data/products'
import ProductCard from '../components/product/ProductCard'

export default function Category() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lang = getLang(i18n.language)
  const cat = getCategoryBySlug(slug || '')
  if (!cat) return <div className="max-w-7xl mx-auto px-4 py-20 text-center">{t('common.noResults')}</div>

  const children = getChildren(cat.id)
  const childIds = [cat.id, ...children.map(c => c.id)]
  const items = products.filter(p => childIds.includes(p.category))

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-brand-900">{cat.name[lang]}</h1>
        <p className="text-gray-500 text-sm mt-1">{items.length} {t('common.results')}</p>
      </div>
      {children.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {children.map(c => (
            <Link key={c.id} to={`/category/${c.slug}`} className="px-4 py-2 bg-white rounded-full text-sm shadow-card hover:shadow-lift transition">
              {c.name[lang]}
            </Link>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      {items.length === 0 && <div className="text-center py-20 text-gray-500">{t('common.noResults')}</div>}
    </div>
  )
}
