import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { products } from '../data/products'
import { categories } from '../data/categories'
import ProductCard from '../components/product/ProductCard'

export default function Search() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en'
  const [params] = useSearchParams()
  const q = params.get('q') || ''

  const results = useMemo(() => {
    const term = q.toLowerCase().trim()
    if (!term) return []
    return products.filter(p =>
      p.name[lang].toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.description[lang].toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    )
  }, [q, lang])

  const catResults = useMemo(() => {
    const term = q.toLowerCase().trim()
    if (!term) return []
    return categories.filter(c => c.name[lang].toLowerCase().includes(term))
  }, [q, lang])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="font-display text-2xl text-brand-900 mb-2">{t('nav.search')}: "{q}"</h1>
      <p className="text-gray-500 text-sm mb-6">{results.length} {t('common.results')}</p>
      {catResults.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">{t('common.searchCategories')}</h2>
          <div className="flex flex-wrap gap-2">
            {catResults.map(c => (
              <a key={c.id} href={`/Kaufhaus/category/${c.slug}`} className="px-3 py-1.5 bg-white rounded-full text-sm shadow-card">{c.name[lang]}</a>
            ))}
          </div>
        </div>
      )}
      {results.length === 0 ? (
        <div className="text-center py-20 text-gray-500">{t('common.noResults')}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
