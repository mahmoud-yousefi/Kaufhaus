import { getLang } from '../lib/lang'
import React, { useMemo, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search as SearchIcon } from 'lucide-react'
import { products } from '../data/products'
import { categories } from '../data/categories'
import ProductCard from '../components/product/ProductCard'
import { useUIStore } from '../store/uiStore'

export default function Search() {
  const { t, i18n } = useTranslation()
  const lang = getLang(i18n.language)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const ui = useUIStore()
  const q = params.get('q') || ''
  const [term, setTerm] = useState(q)

  const results = useMemo(() => {
    const s = q.toLowerCase().trim()
    if (!s) return []
    return products.filter(p =>
      p.name[lang].toLowerCase().includes(s) ||
      p.brand.toLowerCase().includes(s) ||
      p.description[lang].toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s)
    )
  }, [q, lang])

  const catResults = useMemo(() => {
    const s = q.toLowerCase().trim()
    if (!s) return []
    return categories.filter(c => c.name[lang].toLowerCase().includes(s))
  }, [q, lang])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!term.trim()) return
    ui.addSearch(term)
    navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <form onSubmit={submit} className="mx-auto mb-8 flex max-w-2xl items-center rounded-full bg-white px-4 py-2 shadow-card ring-1 ring-gray-100 focus-within:ring-brand-300">
        <SearchIcon size={18} className="text-gray-400" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={t('common.searchPlaceholder')}
          aria-label={t('nav.search')}
          className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm outline-none"
        />
        <button className="shrink-0 rounded-full bg-brand-900 px-5 py-2 text-sm font-medium text-white hover:bg-brand-700 whitespace-nowrap">{t('nav.search')}</button>
      </form>

      {q ? (
        <>
          <h1 className="font-display text-2xl text-brand-900 mb-2">{t('nav.search')}: "{q}"</h1>
          <p className="mb-6 text-sm text-gray-500">{t('common.curatedSelection')}</p>
          {catResults.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-2 font-semibold">{t('common.searchCategories')}</h2>
              <div className="flex flex-wrap gap-2">
                {catResults.map(c => (
                  <Link key={c.id} to={`/category/${c.slug}`} className="rounded-full bg-white px-3 py-1.5 text-sm shadow-card">{c.name[lang]}</Link>
                ))}
              </div>
            </div>
          )}
          {results.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <p className="mb-4">{t('common.noResults')}</p>
              <Link to="/shop" className="rounded-full bg-brand-900 px-5 py-2.5 text-sm text-white">{t('common.continueShopping')}</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {results.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="font-display text-2xl text-brand-900 mb-1">{t('nav.search')}</h1>
          <p className="mb-6 text-sm text-gray-500">{t('common.searchPlaceholder')}</p>
          {ui.searchHistory.length > 0 && (
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="font-semibold">{t('common.searchHistory')}</h2>
                <button onClick={ui.clearSearchHistory} className="text-xs text-brand-700 hover:underline">{t('common.clearFilters')}</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {ui.searchHistory.map(h => (
                  <Link key={h} to={`/search?q=${encodeURIComponent(h)}`} className="rounded-full bg-white px-3 py-1.5 text-sm shadow-card">{h}</Link>
                ))}
              </div>
            </div>
          )}
          <h2 className="mb-3 font-semibold">{t('common.bestsellers')}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </div>
  )
}
