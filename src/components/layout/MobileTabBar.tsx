import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, LayoutGrid, Search, Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { cn } from '../../lib/utils'

export default function MobileTabBar() {
  const { t } = useTranslation()
  const cart = useCartStore()
  const wl = useWishlistStore()
  const cartCount = cart.items.reduce((s, i) => s + i.quantity, 0)

  const tabs = [
    { to: '/', label: t('nav.home'), icon: Home, end: true },
    { to: '/shop', label: t('nav.shop'), icon: LayoutGrid },
    { to: '/search', label: t('nav.search'), icon: Search },
    { to: '/wishlist', label: t('nav.wishlist'), icon: Heart, badge: wl.ids.length },
    { to: '/cart', label: t('nav.cart'), icon: ShoppingCart, badge: cartCount },
  ]

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[150] border-t border-gray-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-5">
        {tabs.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) => cn(
              'relative flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors',
              isActive ? 'text-brand-900' : 'text-gray-400',
            )}
          >
            {({ isActive }) => (
              <>
                <span className={cn('relative rounded-full px-3 py-1 transition-colors', isActive && 'bg-brand-50')}>
                  <tab.icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
                  {tab.badge ? (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] text-white">{tab.badge}</span>
                  ) : null}
                </span>
                <span>{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
