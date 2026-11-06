import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Filter, X, Grid, List } from 'lucide-react'
import { products } from '../data/products'
import { categories } from '../data/categories'
import ProductCard from '../components/product/ProductCard'

type SortKey = 'recommended' | 'priceAsc' | 'priceDesc' | 'rating' | 'newest' | 'bestseller'

export default function Shop() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en'
  const [params, setParams] = useSearchParams()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [mobileFilters, setMobileFilters] = useState(false)

  const categoryParam = params.get('category') || ''
  const sortParam = (params.get('sort') as SortKey) || 'recommended'
  const minPrice = params.get('minPrice') ? Number(params.get('minPrice')) : 0
  const maxPrice = params.get('maxPrice') ? Number(params.get('maxPrice')) : 10000
  const brandParam = params.get('brand') || ''
  const badgeParam = params.get('badge') || ''
  const inStockOnly = params.get('inStock') === '1'

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value); else next.delete(key)
    setParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (categoryParam) list = list.filter(p => p.category === categoryParam)
    if (brandParam) list = list.filter(p => p.brand === brandParam)
    if (badgeParam) list = list.filter(p => p.badges.includes(badgeParam))
    list = list.filter(p => p.price >= minPrice && p.price <= maxPrice)
    if (inStockOnly) list = list.filter(p => p.stock > 0)
    switch (sortParam) {
      case 'priceAsc': list.sort((a,b) => a.price - b.price); break
      case 'priceDesc': list.sort((a,b) => b.price - a.price); break
      case 'rating': list.sort((a,b) => b.rating - a.rating); break
      case 'newest': list.sort((a,b) => b.id.localeCompare(a.id)); break
      case 'bestseller': list.sort((a,b) => b.reviewCount - a.reviewCount); break
      default: break
    }
    return list
  }, [categoryParam, brandParam, badgeParam, minPrice, maxPrice, inStockOnly, sortParam])

  const brands = Array.from(new Set(products.map(p => p.brand))).sort()
  const allBadges = Array.from(new Set(products.flatMap(p => p.badges)))

  const Filters = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">{t('filters.category')}</h3>
        <div className="space-y-1 max-h-60 overflow-y-auto">
          <button onClick={() => updateParam('category', '')} className={`block w-full text-left px-2 py-1 text-sm rounded ${!categoryParam ? 'bg-brand-100 text-brand-900' : 'hover:bg-gray-50'}`}>{t('nav.allCategories')}</button>
          {categories.filter(c => !c.parent).map(c => (
            <button key={c.id} onClick={() => updateParam('category', c.id)} className={`block w-full text-left px-2 py-1 text-sm rounded ${categoryParam === c.id ? 'bg-brand-100 text-brand-900' : 'hover:bg-gray-50'}`}>{c.name[lang]}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">{t('filters.brand')}</h3>
        <select value={brandParam} onChange={(e) => updateParam('brand', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm">
          <option value="">{t('nav.allCategories')}</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <h3 className="font-semibold mb-2">{t('filters.price')}</h3>
        <div className="flex gap-2">
          <input type="number" placeholder={t('filters.minPrice')} value={params.get('minPrice') || ''} onChange={(e) => updateParam('minPrice', e.target.value)} className="w-1/2 border rounded-lg px-2 py-1 text-sm" />
          <input type="number" placeholder={t('filters.maxPrice')} value={params.get('maxPrice') || ''} onChange={(e) => updateParam('maxPrice', e.target.value)} className="w-1/2 border rounded-lg px-2 py-1 text-sm" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">{t('filters.badges')}</h3>
        <div className="space-y-1">
          {allBadges.map(b => (
            <label key={b} className="flex items-center gap-2 text-sm">
              <input type="radio" name="badge" checked={badgeParam === b} onChange={() => updateParam('badge', badgeParam === b ? '' : b)} />
              {t(`common.${b}`, b)}
            </label>
          ))}
          {badgeParam && <button onClick={() => updateParam('badge', '')} className="text-xs text-brand-700">{t('common.clearFilters')}</button>}
        </div>
      </div>
      <div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => updateParam('inStock', e.target.checked ? '1' : '')} />
          {t('common.inStock')}
        </label>
      </div>
      <button onClick={() => setParams(new URLSearchParams())} className="text-sm text-red-600">{t('common.clearFilters')}</button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-2xl md:text-3xl text-brand-900">{t('nav.shop')}</h1>
        <div className="flex items-center gap-2">
          <button className="md:hidden px-3 py-2 border rounded-lg flex items-center gap-2 text-sm" onClick={() => setMobileFilters(true)}>
            <Filter size={16} /> {t('common.filter')}
          </button>
          <select value={sortParam} onChange={(e) => updateParam('sort', e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="recommended">{t('sort.recommended')}</option>
            <option value="priceAsc">{t('sort.priceAsc')}</option>
            <option value="priceDesc">{t('sort.priceDesc')}</option>
            <option value="rating">{t('sort.rating')}</option>
            <option value="newest">{t('sort.newest')}</option>
            <option value="bestseller">{t('sort.bestseller')}</option>
          </select>
          <div className="hidden sm:flex border rounded-lg">
            <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-gray-100' : ''}`}><Grid size={16} /></button>
            <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-gray-100' : ''}`}><List size={16} /></button>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-4">{filtered.length} {t('common.results')}</div>

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        <aside className="hidden md:block bg-white rounded-2xl p-5 shadow-card h-fit sticky top-24">
          <Filters />
        </aside>
        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">{t('common.noResults')}</div>
          ) : (
            <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-3'}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">{t('common.filter')}</h2>
              <button onClick={() => setMobileFilters(false)}><X /></button>
            </div>
            <Filters />
          </div>
        </div>
      )}
    </div>
  )
}
