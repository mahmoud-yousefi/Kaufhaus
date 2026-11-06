import { getLang } from '../../lib/lang'
import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown } from 'lucide-react'
import { categories, topLevelCategories, getChildren } from '../../data/categories'
import { products } from '../../data/products'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { useUIStore } from '../../store/uiStore'
import LanguageSwitcher from './LanguageSwitcher'
import MobileMenu from './MobileMenu'

export default function Header() {
  const { t, i18n } = useTranslation()
  const lang = getLang(i18n.language)
  const navigate = useNavigate()
  const cart = useCartStore()
  const wl = useWishlistStore()
  const ui = useUIStore()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const megaTimer = useRef<number | null>(null)

  const cartCount = cart.items.reduce((s, i) => s + i.quantity, 0)
  const wlCount = wl.ids.length

  const suggestions = query.trim().length > 1
    ? products.filter(p => (p.name[lang] + ' ' + p.brand + ' ' + p.category).toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : []

  const trending = lang === 'de' ? ['Apfel', 'Kaffee', 'Bio', 'Schokolade', 'Käse'] : ['Apple', 'Coffee', 'Organic', 'Chocolate', 'Cheese']

  const catSuggestions = query.trim().length > 1
    ? categories.filter(c => c.name[lang].toLowerCase().includes(query.toLowerCase())).slice(0, 4)
    : []

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const onScroll = () => setActiveCat(null)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submitSearch = (q: string) => {
    const term = q.trim()
    if (!term) return
    ui.addSearch(term)
    navigate(`/search?q=${encodeURIComponent(term)}`)
    setSearchOpen(false)
    setQuery('')
  }

  const openMega = (id: string) => {
    if (megaTimer.current) window.clearTimeout(megaTimer.current)
    setActiveCat(id)
  }
  const closeMega = () => {
    megaTimer.current = window.setTimeout(() => setActiveCat(null), 120)
  }

  return (
    <header className="sticky top-0 z-[100] border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="bg-brand-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
          <span>{t('common.benefit1')}</span>
          <div className="hidden gap-5 md:flex">
            <span>{t('common.benefit2')}</span>
            <span>{t('common.benefit3')}</span>
            <span>{t('common.benefit4')}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-2.5 lg:flex-nowrap lg:gap-3 lg:py-3">
        <button className="rounded-full p-2 hover:bg-gray-100 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Menü öffnen">
          <Menu size={22} />
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Kaufhaus Startseite">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-900 font-display text-base text-white sm:h-9 sm:w-9 sm:text-lg">K</div>
          <span className="block whitespace-nowrap font-display text-lg font-semibold text-brand-900 sm:text-xl">Kaufhaus</span>
        </Link>

        <div ref={searchRef} className="relative order-last w-full lg:order-none lg:w-full lg:max-w-2xl lg:flex-1">
          <div className="flex items-center rounded-full bg-gray-100 px-3 py-2 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-brand-300 sm:px-4">
            <Search size={16} className="text-gray-400 sm:h-[18px] sm:w-[18px]" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSearchOpen(true) }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitSearch(query)
                if (e.key === 'Escape') { setSearchOpen(false); setQuery('') }
                if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, suggestions.length - 1)) }
                if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, -1)) }
              }}
              placeholder={t('common.searchPlaceholder')}
              aria-label={t('nav.search')}
              className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
            />
            {query && <button onClick={() => setQuery('')} aria-label="Clear"><X size={16} className="text-gray-400" /></button>}
          </div>

          {searchOpen && (suggestions.length > 0 || catSuggestions.length > 0 || query.trim().length === 0) && (
            <div className="absolute left-0 right-0 top-full mt-2 z-[130] rounded-2xl border border-gray-100 bg-white p-3 shadow-lift">
              {query.trim().length === 0 && (
                <div className="mb-2">
                  <div className="mb-2 px-2 text-xs text-gray-400">{t('common.searchSuggestions')}</div>
                  <div className="flex flex-wrap gap-1.5 px-2 pb-2">
                    {trending.map(term => (
                      <button key={term} onClick={() => submitSearch(term)} className="rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-600 hover:bg-brand-50 hover:text-brand-900">{term}</button>
                    ))}
                  </div>
                  {ui.searchHistory.length > 0 && (
                    <>
                      <div className="mb-1 flex items-center justify-between px-2">
                        <span className="text-xs text-gray-400">{t('common.searchHistory')}</span>
                        <button onClick={ui.clearSearchHistory} className="text-xs text-brand-700 hover:underline">{t('common.clearFilters')}</button>
                      </div>
                      {ui.searchHistory.map(h => (
                        <button key={h} onClick={() => submitSearch(h)} className="block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-gray-50">{h}</button>
                      ))}
                    </>
                  )}
                </div>
              )}
              {catSuggestions.length > 0 && (
                <div className="mb-2">
                  <div className="mb-1 px-2 text-xs text-gray-400">{t('common.searchCategories')}</div>
                  {catSuggestions.map(c => (
                    <button key={c.id} onClick={() => { navigate(`/category/${c.slug}`); setSearchOpen(false); setQuery('') }} className="block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-gray-50">{c.name[lang]}</button>
                  ))}
                </div>
              )}
              {suggestions.length > 0 && (
                <div>
                  <div className="mb-1 px-2 text-xs text-gray-400">{t('common.searchProducts')}</div>
                  {suggestions.map(p => (
                    <button key={p.id} onClick={() => { navigate(`/product/${p.slug}`); setSearchOpen(false); setQuery('') }} className="flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left text-sm hover:bg-gray-50">
                      <img src={p.image} alt="" className="h-8 w-8 rounded object-cover" />
                      <span className="flex-1 truncate">{p.name[lang]}</span>
                      <span className="text-xs text-gray-400">{p.brand}</span>
                    </button>
                  ))}
                </div>
              )}
              {query.trim().length > 1 && (
                <button onClick={() => submitSearch(query)} className="mt-2 w-full rounded-lg bg-gray-50 px-3 py-2 text-left text-sm hover:bg-gray-100">
                  {t('nav.search')}: "{query}"
                </button>
              )}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1 lg:ml-0">
          <LanguageSwitcher />
          <Link to="/wishlist" aria-label={t('nav.wishlist')} className="relative hidden rounded-full p-1.5 hover:bg-gray-100 sm:inline-flex sm:p-2">
            <Heart size={18} className="sm:h-5 sm:w-5" />
            {wlCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white sm:h-5 sm:min-w-5 sm:text-xs">{wlCount}</span>}
          </Link>
          <Link to="/cart" aria-label={t('nav.cart')} className="relative hidden rounded-full p-1.5 hover:bg-gray-100 sm:inline-flex sm:p-2">
            <ShoppingCart size={18} className="sm:h-5 sm:w-5" />
            {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-900 px-1 text-[10px] text-white sm:h-5 sm:min-w-5 sm:text-xs">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* Desktop mega menu */}
      <nav className="hidden border-t border-gray-100 lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4">
          <div className="relative" onMouseEnter={() => openMega('all')} onMouseLeave={closeMega}>
            <button
              onClick={() => setActiveCat(v => (v === 'all' ? null : 'all'))}
              aria-expanded={activeCat === 'all'}
              className={`flex items-center gap-1 whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors hover:text-brand-700 ${activeCat === 'all' ? 'text-brand-700' : ''}`}
            >
              {t('nav.allCategories')}
              <ChevronDown size={14} className={`opacity-40 transition-transform ${activeCat === 'all' ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <Link to="/shop" className="shrink-0 whitespace-nowrap px-3 py-3 text-sm font-medium hover:text-brand-700">{t('nav.shop')}</Link>
          <Link to="/offers" className="shrink-0 whitespace-nowrap px-3 py-3 text-sm font-medium text-red-600">{t('nav.offers')}</Link>
          <Link to="/magazine" className="shrink-0 whitespace-nowrap px-3 py-3 text-sm font-medium hover:text-brand-700">{t('nav.magazine')}</Link>
          <Link to="/about" className="shrink-0 whitespace-nowrap px-3 py-3 text-sm font-medium hover:text-brand-700">{t('nav.about')}</Link>
        </div>
      </nav>

      {activeCat === 'all' && (
        <div
          className="absolute left-0 right-0 top-full z-[120] hidden border-t border-gray-100 bg-white shadow-lift lg:block"
          onMouseEnter={() => openMega('all')}
          onMouseLeave={closeMega}
        >
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-5 flex items-center justify-between">
              <div className="font-display text-xl text-brand-900">{t('nav.allCategories')}</div>
              <Link to="/shop" className="text-sm text-brand-700 hover:underline">{t('common.showAll')}</Link>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 xl:grid-cols-5">
              {topLevelCategories.map(cat => {
                const children = getChildren(cat.id)
                return (
                  <div key={cat.id}>
                    <Link to={`/category/${cat.slug}`} className="mb-2 block font-display text-sm font-semibold text-brand-900 hover:text-brand-700">
                      {cat.name[lang]}
                    </Link>
                    <div className="space-y-1">
                      {children.slice(0, 5).map(sub => (
                        <Link key={sub.id} to={`/category/${sub.slug}`} className="block text-sm text-gray-600 hover:text-brand-700">
                          {sub.name[lang]}
                        </Link>
                      ))}
                      {children.length === 0 && (
                        <Link to={`/category/${cat.slug}`} className="block text-sm text-gray-600 hover:text-brand-700">
                          {t('common.showAll')}
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
