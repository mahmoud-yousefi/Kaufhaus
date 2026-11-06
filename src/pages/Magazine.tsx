import { getLang } from '../lib/lang'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { articles } from '../data/articles'

export default function Magazine() {
  const { t, i18n } = useTranslation()
  const lang = getLang(i18n.language)
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="font-display text-3xl text-brand-900 mb-6">{t('common.editorialTitle')}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(a => (
          <Link key={a.slug} to={`/magazine/${a.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lift transition">
            <img src={a.image} alt="" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="p-5">
              <div className="text-xs text-brand-600 font-medium mb-1">{a.category[lang]}</div>
              <h3 className="font-display text-lg text-brand-900 mb-2 group-hover:text-brand-700">{a.title[lang]}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{a.excerpt[lang]}</p>
              <div className="text-xs text-gray-400 mt-3">{a.readingTime} {t('common.min')} · {a.publishedAt}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
