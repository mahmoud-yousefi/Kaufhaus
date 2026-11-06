import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { products } from '../data/products'
import { formatPrice } from '../lib/utils'
import { useCartStore } from '../store/cartStore'
import { toast } from 'sonner'

export default function Cart() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en'
  const cart = useCartStore()
  const [promo, setPromo] = useState('')
  const items = cart.items.map(i => ({ ...i, product: products.find(p => p.id === i.productId)! })).filter(i => i.product)

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const shipping = subtotal >= 49 || subtotal === 0 ? 0 : 4.99
  let discount = 0
  if (cart.promoCode) {
    if (cart.promoDiscount < 1) discount = subtotal * cart.promoDiscount
    else discount = cart.promoDiscount
  }
  const total = Math.max(0, subtotal + shipping - discount)

  const applyPromo = () => {
    if (cart.applyPromo(promo)) { toast.success(t('common.promoApplied')); setPromo('') }
    else toast.error(t('common.invalidPromo'))
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h1 className="font-display text-2xl mb-2">{t('common.emptyCart')}</h1>
        <Link to="/shop" className="inline-block mt-4 px-6 py-3 bg-brand-900 text-white rounded-full">{t('common.continueShopping')}</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="font-display text-3xl text-brand-900 mb-6">{t('nav.cart')}</h1>
      <div className="grid md:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-3">
          {items.map(i => (
            <div key={i.productId} className="bg-white rounded-2xl p-4 shadow-card flex flex-col sm:flex-row gap-4">
              <img src={i.product.image} alt="" className="w-20 h-20 rounded-lg object-cover shrink-0" />
              <div className="flex-1">
                <Link to={`/product/${i.product.slug}`} className="font-medium hover:text-brand-700">{i.product.name[lang]}</Link>
                <div className="text-sm text-gray-500">{i.product.brand} · {i.product.unit}</div>
                <div className="text-brand-900 font-semibold mt-1">{formatPrice(i.product.price, lang)}</div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                <button onClick={() => cart.removeItem(i.productId)} className="text-gray-400 hover:text-red-500 shrink-0"><Trash2 size={16} /></button>
                <div className="flex items-center border rounded-full">
                  <button onClick={() => cart.setQuantity(i.productId, i.quantity - 1)} className="px-3 py-1"><Minus size={14} /></button>
                  <span className="px-3 py-1">{i.quantity}</span>
                  <button onClick={() => cart.setQuantity(i.productId, i.quantity + 1)} className="px-3 py-1"><Plus size={14} /></button>
                </div>
                <div className="text-sm font-semibold">{formatPrice(i.product.price * i.quantity, lang)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card h-fit sticky top-24">
          <h2 className="font-semibold mb-4">{t('common.total')}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>{t('common.subtotal')}</span><span>{formatPrice(subtotal, lang)}</span></div>
            <div className="flex justify-between"><span>{t('common.shipping')}</span><span>{shipping === 0 ? t('common.freeShipping') : formatPrice(shipping, lang)}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-700"><span>{t('common.discount')}</span><span>-{formatPrice(discount, lang)}</span></div>}
            <div className="border-t pt-2 flex justify-between font-semibold text-lg"><span>{t('common.total')}</span><span>{formatPrice(total, lang)}</span></div>
          </div>
          <div className="mt-4 flex gap-2">
            <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder={t('common.promoCode')} className="flex-1 border rounded-lg px-3 py-2 text-sm" />
            <button onClick={applyPromo} className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">{t('common.apply')}</button>
          </div>
          {cart.promoCode && (
            <div className="mt-2 text-xs text-green-700 flex justify-between">
              <span>{cart.promoCode}</span>
              <button onClick={cart.removePromo} className="underline">{t('common.remove')}</button>
            </div>
          )}
          <button onClick={() => toast.success(t('common.simulatedCheckout'))} className="mt-4 w-full py-3 bg-brand-900 text-white rounded-full font-medium hover:bg-brand-700 transition">
            {t('common.checkout')}
          </button>
          <Link to="/shop" className="block text-center mt-3 text-sm text-brand-700">{t('common.continueShopping')}</Link>
        </div>
      </div>
    </div>
  )
}
