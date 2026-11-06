import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Product } from '../../data/products'
import { formatPrice, discountPercent } from '../../lib/utils'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import Badge from '../ui/Badge'

const badgeMap: Record<string, string> = {
  bio: 'bio', vegan: 'vegan', regional: 'regional', glutenfrei: 'glutenFree', laktosefrei: 'lactoseFree', neu: 'new', angebot: 'sale',
}

export default function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'de' | 'en'
  const cart = useCartStore()
  const wl = useWishlistStore()
  const liked = wl.has(product.id)

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lift transition-all duration-300 flex flex-col">
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name[lang]}
          loading="lazy"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {product.badges.slice(0, 2).map(b => (
            <Badge key={b} label={t(`common.${badgeMap[b] || b}`, b)} type={badgeMap[b] || b} />
          ))}
          {product.originalPrice && (
            <Badge label={`-${discountPercent(product.price, product.originalPrice)}%`} type="sale" />
          )}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); wl.toggle(product.id) }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition"
          aria-label="wishlist"
        >
          <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
        </button>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        <Link to={`/product/${product.slug}`} className="font-medium text-sm leading-snug line-clamp-2 hover:text-brand-700">
          {product.name[lang]}
        </Link>
        {!compact && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description[lang]}</p>
        )}
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-auto pt-3 flex items-end justify-between gap-2">
          <div>
            <div className="text-lg font-semibold text-brand-900">{formatPrice(product.price, lang)}</div>
            {product.originalPrice && (
              <div className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice, lang)}</div>
            )}
            <div className="text-xs text-gray-500">{product.unit}</div>
          </div>
          <button
            onClick={() => cart.addItem(product.id)}
            disabled={product.stock === 0}
            className="w-10 h-10 rounded-full bg-brand-900 text-white flex items-center justify-center hover:bg-brand-700 transition disabled:bg-gray-300"
            aria-label={t('common.addToCart')}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
        {product.stock === 0 && <div className="text-xs text-red-500 mt-2">{t('common.outOfStock')}</div>}
        {product.stock > 0 && product.stock < 10 && <div className="text-xs text-amber-600 mt-2">{t('common.lowStock')}</div>}
      </div>
    </motion.div>
  )
}
