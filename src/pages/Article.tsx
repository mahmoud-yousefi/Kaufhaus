import { getLang } from '../lib/lang'
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { articles, getArticleBySlug } from '../data/articles'

export default function Article() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lang = getLang(i18n.language)
  const article = getArticleBySlug(slug || '')
  if (!article) return <div className="max-w-7xl mx-auto px-4 py-20 text-center">{t('common.noResults')}</div>
  const related = articles.filter(a => a.slug !== article.slug).slice(0, 3)
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/magazine" className="text-sm text-brand-700 mb-4 inline-block">← {t('nav.magazine')}</Link>
      <div className="text-xs text-brand-600 font-medium mb-2">{article.category[lang]}</div>
      <h1 className="font-display text-3xl md:text-4xl text-brand-900 mb-3">{article.title[lang]}</h1>
      <div className="text-sm text-gray-500 mb-6">{t('common.publishedOn')} {article.publishedAt} · {article.readingTime} {t('common.min')} {t('common.readingTime')}</div>
      <img src={article.image} alt="" className="w-full h-72 object-cover rounded-2xl mb-6" />
      <div className="prose prose-lg text-gray-700 leading-relaxed">
        <p>{article.content[lang]}</p>
      </div>
      <div className="mt-10">
        <h3 className="font-display text-xl text-brand-900 mb-4">{t('common.relatedArticles')}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {related.map(a => (
            <Link key={a.slug} to={`/magazine/${a.slug}`} className="bg-white rounded-xl overflow-hidden shadow-card">
              <img src={a.image} alt="" className="w-full h-32 object-cover" />
              <div className="p-3 text-sm font-medium">{a.title[lang]}</div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
