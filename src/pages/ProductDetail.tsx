import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Star, ShoppingCart, Heart, Truck, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { getProductBySlug } from '../data/products'
import { products } from '../data/products'
import { formatPrice, discountPercent } from '../lib/utils'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import ProductCard from '../components/product/ProductCard'
import Badge from '../components/ui/Badge'

export default function ProductDetail() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en'
  const product = getProductBySlug(slug || '')
  const cart = useCartStore()
  const wl = useWishlistStore()
  const [qty, setQty] = useState(1)
  const [imgIdx, setImgIdx] = useState(0)

  if (!product) return <div className="max-w-7xl mx-auto px-4 py-20 text-center">{t('common.noResults')}</div>

  const liked = wl.has(product.id)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const boughtTogether = products.filter(p => p.id !== product.id).slice(0, 3)

  const gallery = [product.image, ...(product.images || [])]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-brand-700">Home</Link> / <Link to="/shop" className="hover:text-brand-700">Shop</Link> / <span className="text-brand-900">{product.name[lang]}</span>
      </nav>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Gallery */}
        <div>
          <div className="relative bg-gray-50 rounded-2xl overflow-hidden">
            <img src={gallery[imgIdx]} alt={product.name[lang]} className="w-full h-[420px] object-cover" />
            {gallery.length > 1 && (
              <>
                <button onClick={() => setImgIdx((imgIdx - 1 + gallery.length) % gallery.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"><ChevronLeft size={18} /></button>
                <button onClick={() => setImgIdx((imgIdx + 1) % gallery.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"><ChevronRight size={18} /></button>
              </>
            )}
          </div>
          <div className="flex gap-2 mt-3">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setImgIdx(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${i === imgIdx ? 'border-brand-900' : 'border-transparent'}`}>
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        {/* Info */}
        <div>
          <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
          <h1 className="font-display text-3xl text-brand-900 mb-3">{product.name[lang]}</h1>
          <div className="flex items-center gap-2 mb-4 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className={i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
              ))}
            </div>
            <span className="text-gray-500">{product.rating.toFixed(1)} ({product.reviewCount} {t('common.reviews')})</span>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl font-semibold text-brand-900">{formatPrice(product.price, lang)}</span>
            {product.originalPrice && (
              <>
                <span className="text-gray-400 line-through">{formatPrice(product.originalPrice, lang)}</span>
                <span className="text-red-600 text-sm font-medium">-{discountPercent(product.price, product.originalPrice)}%</span>
              </>
            )}
          </div>
          <div className="text-sm text-gray-500 mb-4">{product.unit}</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.badges.map(b => <Badge key={b} label={t(`common.${b}`, b)} type={b} />)}
          </div>
          <div className="text-sm mb-4">
            {product.stock > 0 ? (
              <span className="text-green-700 font-medium">{t('common.inStock')} ({product.stock})</span>
            ) : (
              <span className="text-red-600 font-medium">{t('common.outOfStock')}</span>
            )}
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description[lang]}</p>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-lg">−</button>
              <span className="px-4 py-2 font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-2 text-lg">+</button>
            </div>
            <button
              onClick={() => { for (let i = 0; i < qty; i++) cart.addItem(product.id); setQty(1) }}
              disabled={product.stock === 0}
              className="flex-1 py-3 bg-brand-900 text-white rounded-full font-medium hover:bg-brand-700 transition flex items-center justify-center gap-2 disabled:bg-gray-300"
            >
              <ShoppingCart size={18} /> {t('common.addToCart')}
            </button>
            <button onClick={() => wl.toggle(product.id)} className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-gray-50">
              <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : ''} />
            </button>
          </div>
          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2"><Truck size={16} /> {t('common.delivery')}: 1-3 Werktage</div>
            <div className="flex items-center gap-2"><RotateCcw size={16} /> {t('common.returns')}: 30 Tage</div>
          </div>
        </div>
      </div>

      {/* Attributes */}
      <section className="mt-10 bg-white rounded-2xl p-6 shadow-card">
        <h2 className="font-semibold mb-4">{t('common.description')}</h2>
        <p className="text-gray-700 mb-6">{product.description[lang]}</p>
        <h3 className="font-semibold mb-2">{t('common.attributes')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div className="flex justify-between border-b py-2"><span className="text-gray-500">Marke</span><span>{product.brand}</span></div>
          <div className="flex justify-between border-b py-2"><span className="text-gray-500">Einheit</span><span>{product.unit}</span></div>
          <div className="flex justify-between border-b py-2"><span className="text-gray-500">Bewertung</span><span>{product.rating.toFixed(1)}</span></div>
        </div>
      </section>

      {/* Reviews placeholder */}
      <section className="mt-6 bg-white rounded-2xl p-6 shadow-card">
        <h2 className="font-semibold mb-4">{t('common.reviewsTitle')}</h2>
        <div className="space-y-4">
          {[
            { name: 'Anna M.', rating: 5, text: 'Sehr gute Qualität, schnelle Lieferung. Immer wieder!' },
            { name: 'Thomas K.', rating: 4, text: 'Gutes Preis-Leistungs-Verhältnis.' },
          ].map((r, i) => (
            <div key={i} className="border-b pb-4 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{r.name}</span>
                <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={12} className={j < r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />)}</div>
              </div>
              <p className="text-sm text-gray-600">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently bought together */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-brand-900 mb-4">{t('common.frequentlyBought')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {boughtTogether.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Related */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-brand-900 mb-4">{t('common.relatedProducts')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
