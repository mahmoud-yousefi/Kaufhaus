import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown, Globe } from 'lucide-react'
import { categories, topLevelCategories, getChildren } from '../../data/categories'
import { products } from '../../data/products'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { useUIStore } from '../../store/uiStore'
import { formatPrice } from '../../lib/utils'

export default function Header() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en'
  const navigate = useNavigate()
  const cart = useCartStore()
  const wl = useWishlistStore()
  const ui = useUIStore()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const cartCount = cart.items.reduce((s, i) => s + i.quantity, 0)
  const wlCount = wl.ids.length

  const suggestions = query.trim().length > 1
    ? products.filter(p => (p.name[lang] + ' ' + p.brand + ' ' + p.category).toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : []

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

  const submitSearch = (q: string) => {
    const term = q.trim()
    if (!term) return
    ui.addSearch(term)
    navigate(`/search?q=${encodeURIComponent(term)}`)
    setSearchOpen(false)
    setQuery('')
  }

  const switchLang = (l: string) => {
    i18n.changeLanguage(l)
    localStorage.setItem('lang', l)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="bg-brand-900 text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>{t('common.benefit1')}</span>
          <div className="hidden md:flex gap-4">
            <span>{t('common.benefit2')}</span>
            <span>{t('common.benefit3')}</span>
            <span>{t('common.benefit4')}</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <button className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="menu"><Menu /></button>
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-brand-900 text-white flex items-center justify-center font-display text-lg">K</div>
          <span className="font-display text-xl font-semibold text-brand-900 hidden sm:block">Kaufhaus</span>
        </Link>
        <div ref={searchRef} className="flex-1 relative max-w-2xl">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSearchOpen(true) }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(e) => { if (e.key === 'Enter') submitSearch(query) }}
              placeholder={t('common.searchPlaceholder')}
              className="flex-1 bg-transparent outline-none px-3 text-sm"
            />
            {query && <button onClick={() => setQuery('')}><X size={16} className="text-gray-400" /></button>}
          </div>
          {searchOpen && (suggestions.length > 0 || catSuggestions.length > 0 || (query.trim().length === 0 && ui.searchHistory.length > 0)) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lift border border-gray-100 p-3 z-50">
              {query.trim().length === 0 && ui.searchHistory.length > 0 && (
                <div className="mb-2">
                  <div className="text-xs text-gray-400 mb-1">{t('common.searchHistory')}</div>
                  {ui.searchHistory.map(h => (
                    <button key={h} onClick={() => submitSearch(h)} className="block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 rounded-lg">{h}</button>
                  ))}
                </div>
              )}
              {catSuggestions.length > 0 && (
                <div className="mb-2">
                  <div className="text-xs text-gray-400 mb-1">{t('common.searchCategories')}</div>
                  {catSuggestions.map(c => (
                    <button key={c.id} onClick={() => { navigate(`/category/${c.slug}`); setSearchOpen(false); setQuery('') }} className="block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 rounded-lg">{c.name[lang]}</button>
                  ))}
                </div>
              )}
              {suggestions.length > 0 && (
                <div>
                  <div className="text-xs text-gray-400 mb-1">{t('common.searchProducts')}</div>
                  {suggestions.map(p => (
                    <button key={p.id} onClick={() => { navigate(`/product/${p.slug}`); setSearchOpen(false); setQuery('') }} className="flex items-center gap-3 w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 rounded-lg">
                      <img src={p.image} alt="" className="w-8 h-8 rounded object-cover" />
                      <span className="flex-1 truncate">{p.name[lang]}</span>
                      <span className="text-gray-400 text-xs">{p.brand}</span>
                    </button>
                  ))}
                </div>
              )}
              {query.trim().length > 1 && (
                <button onClick={() => submitSearch(query)} className="mt-2 w-full text-left px-3 py-2 text-sm bg-gray-50 rounded-lg hover:bg-gray-100">
                  {t('nav.search')}: "{query}"
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <button className="flex items-center gap-1 px-2 py-1.5 text-sm hover:bg-gray-100 rounded-full">
              <Globe size={18} /> <span className="hidden sm:inline">{lang.toUpperCase()}</span> <ChevronDown size={14} />
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lift border border-gray-100 p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <button onClick={() => switchLang('de')} className={`block w-full text-left px-3 py-1.5 text-sm rounded-lg hover:bg-gray-50 ${lang === 'de' ? 'font-semibold' : ''}`}>Deutsch</button>
              <button onClick={() => switchLang('en')} className={`block w-full text-left px-3 py-1.5 text-sm rounded-lg hover:bg-gray-50 ${lang === 'en' ? 'font-semibold' : ''}`}>English</button>
            </div>
          </div>
          <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full">
            <Heart size={20} />
            {wlCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{wlCount}</span>}
          </Link>
          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-900 text-white text-xs rounded-full flex items-center justify-center">{cartCount}</span>}
          </Link>
        </div>
      </div>
      {/* Mega menu */}
      <nav className="hidden md:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1">
          {topLevelCategories.slice(0, 8).map(cat => (
            <div key={cat.id} className="relative group" onMouseEnter={() => setActiveCat(cat.id)} onMouseLeave={() => setActiveCat(null)}>
              <Link to={`/category/${cat.slug}`} className="px-3 py-3 text-sm font-medium hover:text-brand-700 flex items-center gap-1">
                {cat.name[lang]} <ChevronDown size={14} className="opacity-50" />
              </Link>
              {activeCat === cat.id && (
                <div className="absolute left-0 top-full bg-white shadow-lift border border-gray-100 rounded-2xl p-6 w-[640px] z-50 grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <div className="font-semibold mb-3 text-brand-900">{cat.name[lang]}</div>
                    <div className="grid grid-cols-2 gap-1">
                      {getChildren(cat.id).map(sub => (
                        <Link key={sub.id} to={`/category/${sub.slug}`} className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-50 hover:text-brand-700">
                          {sub.name[lang]}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-2">{t('common.bestsellers')}</div>
                    {products.filter(p => p.category === cat.id || getChildren(cat.id).some(c => c.id === p.category)).slice(0, 3).map(p => (
                      <Link key={p.id} to={`/product/${p.slug}`} className="flex items-center gap-2 mb-2 hover:opacity-80">
                        <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" />
                        <div className="text-xs">
                          <div className="font-medium line-clamp-1">{p.name[lang]}</div>
                          <div className="text-brand-700">{formatPrice(p.price, lang)}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link to="/shop" className="px-3 py-3 text-sm font-medium hover:text-brand-700">{t('nav.shop')}</Link>
          <Link to="/offers" className="px-3 py-3 text-sm font-medium text-red-600">{t('nav.offers')}</Link>
          <Link to="/magazine" className="px-3 py-3 text-sm font-medium hover:text-brand-700">{t('nav.magazine')}</Link>
        </div>
      </nav>
      {/* Mobile drawer */}
      <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] md:hidden"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white overflow-y-auto p-4 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-display text-xl">Kaufhaus</span>
              <button onClick={() => setMobileOpen(false)}><X /></button>
            </div>
            <div className="space-y-1">
              {topLevelCategories.map(cat => (
                <div key={cat.id}>
                  <Link to={`/category/${cat.slug}`} onClick={() => setMobileOpen(false)} className="block px-3 py-2 font-medium rounded-lg hover:bg-gray-50">{cat.name[lang]}</Link>
                  {getChildren(cat.id).map(sub => (
                    <Link key={sub.id} to={`/category/${sub.slug}`} onClick={() => setMobileOpen(false)} className="block px-6 py-1.5 text-sm text-gray-600 hover:text-brand-700">{sub.name[lang]}</Link>
                  ))}
                </div>
              ))}
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="block px-3 py-2 font-medium">{t('nav.shop')}</Link>
              <Link to="/offers" onClick={() => setMobileOpen(false)} className="block px-3 py-2 font-medium text-red-600">{t('nav.offers')}</Link>
              <Link to="/magazine" onClick={() => setMobileOpen(false)} className="block px-3 py-2 font-medium">{t('nav.magazine')}</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="block px-3 py-2 font-medium">{t('nav.about')}</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="block px-3 py-2 font-medium">{t('nav.contact')}</Link>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  )
}
