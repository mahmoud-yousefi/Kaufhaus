import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Heart } from 'lucide-react'
import { products } from '../data/products'
import { useWishlistStore } from '../store/wishlistStore'
import { useCartStore } from '../store/cartStore'
import ProductCard from '../components/product/ProductCard'
import { toast } from 'sonner'

export default function Wishlist() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en'
  const wl = useWishlistStore()
  const cart = useCartStore()
  const items = products.filter(p => wl.ids.includes(p.id))

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Heart size={64} className="mx-auto text-gray-300 mb-4" />
        <h1 className="font-display text-2xl mb-2">{t('common.emptyWishlist')}</h1>
        <Link to="/shop" className="inline-block mt-4 px-6 py-3 bg-brand-900 text-white rounded-full">{t('common.continueShopping')}</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-brand-900">{t('nav.wishlist')}</h1>
        <button onClick={() => { wl.clear(); toast.success('Merkliste geleert') }} className="text-sm text-red-600">Alle entfernen</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
