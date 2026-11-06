import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const res = schema.safeParse(form)
    if (!res.success) {
      const errs: Record<string, string> = {}
      res.error.issues.forEach(i => { errs[i.path[0] as string] = t('common.required') })
      setErrors(errs)
      return
    }
    setErrors({})
    toast.success(t('common.contactSuccess'))
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl text-brand-900 mb-6">{t('nav.contact')}</h1>
      <form onSubmit={submit} className="bg-white rounded-2xl p-6 shadow-card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('common.name')}</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
          {errors.name && <div className="text-xs text-red-500 mt-1">{t('common.required')}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('common.email')}</label>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
          {errors.email && <div className="text-xs text-red-500 mt-1">{t('common.invalidEmail')}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('common.message')}</label>
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full border rounded-lg px-3 py-2" />
          {errors.message && <div className="text-xs text-red-500 mt-1">{t('common.required')}</div>}
        </div>
        <button className="px-6 py-3 bg-brand-900 text-white rounded-full font-medium hover:bg-brand-700 transition">{t('common.send')}</button>
      </form>
    </div>
  )
}
