import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Filter, X, Grid, List, Star, SlidersHorizontal } from 'lucide-react'
import { products } from '../data/products'
import { categories, topLevelCategories } from '../data/categories'
import ProductCard from '../components/product/ProductCard'

type SortKey = 'recommended' | 'priceAsc' | 'priceDesc' | 'rating' | 'newest' | 'bestseller'

const PAGE = 24

export default function Shop() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en'

  const [params, setParams] = useSearchParams()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [mobileFilters, setMobileFilters] = useState(false)
  const [visible, setVisible] = useState(PAGE)
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)

  const categoryParam = params.get('category') || ''
  const sortParam = (params.get('sort') as SortKey) || 'recommended'
  const minPrice = params.get('minPrice') ? Number(params.get('minPrice')) : 0
  const maxPrice = params.get('maxPrice') ? Number(params.get('maxPrice')) : 10000
  const brandParam = params.get('brand') || ''
  const badgeParam = params.get('badge') || ''
  const ratingParam = params.get('rating') ? Number(params.get('rating')) : 0
  const inStockOnly = params.get('inStock') === '1'

  useEffect(() => { setVisible(PAGE) }, [categoryParam, sortParam, minPrice, maxPrice, brandParam, badgeParam, ratingParam, inStockOnly])

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value); else next.delete(key)
    setParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (categoryParam) {
      const cat = categories.find(c => c.id === categoryParam)
      const childIds = categories.filter(c => c.parent === categoryParam).map(c => c.id)
      list = list.filter(p => p.category === categoryParam || (cat && childIds.includes(p.category)))
    }
    if (brandParam) list = list.filter(p => p.brand === brandParam)
    if (badgeParam) list = list.filter(p => p.badges.includes(badgeParam))
    if (ratingParam) list = list.filter(p => p.rating >= ratingParam)
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
  }, [categoryParam, brandParam, badgeParam, ratingParam, minPrice, maxPrice, inStockOnly, sortParam])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(v => Math.min(v + PAGE, filtered.length))
      }
    }, { rootMargin: '400px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [filtered.length])

  const brands = Array.from(new Set(products.map(p => p.brand))).sort()
  const allBadges = Array.from(new Set(products.flatMap(p => p.badges)))

  const activeChips: { key: string; label: string; value?: string }[] = []
  if (categoryParam) activeChips.push({ key: 'category', label: categories.find(c => c.id === categoryParam)?.name[lang] || categoryParam })
  if (brandParam) activeChips.push({ key: 'brand', label: brandParam })
  if (badgeParam) activeChips.push({ key: 'badge', label: t(`common.${badgeParam}`, badgeParam) })
  if (ratingParam) activeChips.push({ key: 'rating', label: `${ratingParam}★ +` })
  if (params.get('minPrice') || params.get('maxPrice')) activeChips.push({ key: 'price', label: `${minPrice}€ – ${maxPrice === 10000 ? '∞' : maxPrice + '€'}` })
  if (inStockOnly) activeChips.push({ key: 'inStock', label: t('common.inStock') })

  const clearChip = (key: string) => {
    if (key === 'price') { updateParam('minPrice', ''); updateParam('maxPrice', '') }
    else updateParam(key, '')
  }

  const Filters = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 font-semibold">{t('filters.category')}</h3>
        <div className="max-h-72 space-y-0.5 overflow-y-auto pr-1">
          <button onClick={() => updateParam('category', '')} className={`block w-full rounded-lg px-2 py-1.5 text-left text-sm ${!categoryParam ? 'bg-brand-100 font-medium text-brand-900' : 'hover:bg-gray-50'}`}>{t('nav.allCategories')}</button>
          {categories.filter(c => !c.parent).map(c => (
            <div key={c.id}>
              <button onClick={() => updateParam('category', c.id)} className={`block w-full rounded-lg px-2 py-1.5 text-left text-sm ${categoryParam === c.id ? 'bg-brand-100 font-medium text-brand-900' : 'hover:bg-gray-50'}`}>{c.name[lang]}</button>
              {categories.filter(s => s.parent === c.id).map(s => (
                <button key={s.id} onClick={() => updateParam('category', s.id)} className={`block w-full rounded-lg py-1 pl-5 pr-2 text-left text-xs ${categoryParam === s.id ? 'text-brand-900 font-medium' : 'text-gray-500 hover:text-brand-700'}`}>{s.name[lang]}</button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 font-semibold">{t('filters.brand')}</h3>
        <select value={brandParam} onChange={(e) => updateParam('brand', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
          <option value="">{t('common.showAll')}</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <h3 className="mb-2 font-semibold">{t('filters.price')}</h3>
        <div className="flex items-center gap-2">
          <input type="number" min={0} placeholder={t('filters.minPrice')} value={params.get('minPrice') || ''} onChange={(e) => updateParam('minPrice', e.target.value)} className="w-1/2 rounded-xl border border-gray-200 px-2.5 py-2 text-sm" />
          <span className="text-gray-400">–</span>
          <input type="number" min={0} placeholder={t('filters.maxPrice')} value={params.get('maxPrice') || ''} onChange={(e) => updateParam('maxPrice', e.target.value)} className="w-1/2 rounded-xl border border-gray-200 px-2.5 py-2 text-sm" />
        </div>
      </div>
      <div>
        <h3 className="mb-2 font-semibold">{t('filters.rating')}</h3>
        {[4.5, 4, 3.5].map(r => (
          <label key={r} className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 text-sm hover:bg-gray-50">
            <input type="radio" name="rating" checked={ratingParam === r} onChange={() => updateParam('rating', ratingParam === r ? '' : String(r))} />
            <span className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className={i < Math.round(r) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />)}</span>
            <span className="text-gray-500">{r}+</span>
          </label>
        ))}
      </div>
      <div>
        <h3 className="mb-2 font-semibold">{t('filters.badges')}</h3>
        <div className="flex flex-wrap gap-1.5">
          {allBadges.map(b => (
            <button key={b} onClick={() => updateParam('badge', badgeParam === b ? '' : b)} className={`rounded-full border px-2.5 py-1 text-xs transition ${badgeParam === b ? 'border-brand-900 bg-brand-900 text-white' : 'border-gray-200 bg-white hover:border-brand-300'}`}>
              {t(`common.${b}`, b)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => updateParam('inStock', e.target.checked ? '1' : '')} />
          {t('common.inStock')}
        </label>
      </div>
      <button onClick={() => setParams(new URLSearchParams())} className="w-full rounded-xl bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">{t('common.clearFilters')}</button>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-brand-900 md:text-3xl">{t('nav.shop')}</h1>
          <p className="text-sm text-gray-500">{t('common.curatedSelection')}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm md:hidden whitespace-nowrap" onClick={() => setMobileFilters(true)}>
            <SlidersHorizontal size={15} /> {t('common.filter')}
          </button>
          <select value={sortParam} onChange={(e) => updateParam('sort', e.target.value)} className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm">
            <option value="recommended">{t('sort.recommended')}</option>
            <option value="priceAsc">{t('sort.priceAsc')}</option>
            <option value="priceDesc">{t('sort.priceDesc')}</option>
            <option value="rating">{t('sort.rating')}</option>
            <option value="newest">{t('sort.newest')}</option>
            <option value="bestseller">{t('sort.bestseller')}</option>
          </select>
          <div className="hidden rounded-full border border-gray-200 bg-white sm:flex">
            <button onClick={() => setView('grid')} className={`rounded-l-full p-2 ${view === 'grid' ? 'bg-gray-100' : ''}`} aria-label="Grid"><Grid size={16} /></button>
            <button onClick={() => setView('list')} className={`rounded-r-full p-2 ${view === 'list' ? 'bg-gray-100' : ''}`} aria-label="List"><List size={16} /></button>
          </div>
        </div>
      </div>

      {activeChips.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {activeChips.map(c => (
            <button key={c.key} onClick={() => clearChip(c.key)} className="flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-900 hover:bg-brand-200">
              {c.label} <X size={12} />
            </button>
          ))}
          <button onClick={() => setParams(new URLSearchParams())} className="text-xs text-red-600 hover:underline">{t('common.clearFilters')}</button>
        </div>
      )}

      <div className="mb-4 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button onClick={() => updateParam('category', '')} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${!categoryParam ? 'bg-brand-900 text-white' : 'bg-white text-gray-700 shadow-card hover:bg-gray-50'}`}>{t('nav.allCategories')}</button>
        {topLevelCategories.map(c => (
          <button key={c.id} onClick={() => updateParam('category', c.id)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${categoryParam === c.id ? 'bg-brand-900 text-white' : 'bg-white text-gray-700 shadow-card hover:bg-gray-50'}`}>{c.name[lang]}</button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <aside className="sticky top-24 hidden h-fit rounded-2xl bg-white p-5 shadow-card md:block">
          <div className="mb-4 flex items-center gap-2 font-display text-lg text-brand-900"><Filter size={16} /> {t('common.filter')}</div>
          <Filters />
        </aside>
        <div>
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-500">{t('common.noResults')}</div>
          ) : (
            <>
              <div className={view === 'grid' ? 'grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4' : 'space-y-3'}>
                {filtered.slice(0, visible).map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              <div ref={sentinelRef} className="h-10" />
              {visible < filtered.length && (
                <div className="mt-2 flex flex-col items-center gap-2">
                  <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-brand-900 transition-all" style={{ width: `${Math.min(100, (visible / filtered.length) * 100)}%` }} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-brand-900" />
                    {t('common.loadingMore')}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-[300] md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-24">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl">{t('common.filter')}</h2>
              <button onClick={() => setMobileFilters(false)} className="rounded-full p-2 hover:bg-gray-100"><X /></button>
            </div>
            <Filters />
            <button onClick={() => setMobileFilters(false)} className="mt-4 w-full rounded-full bg-brand-900 py-3 text-sm font-medium text-white">
              {t('common.showAll')} ({filtered.length})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
