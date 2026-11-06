import React from 'react'
import { cn } from '../../lib/utils'

const colors: Record<string, string> = {
  bio: 'bg-green-100 text-green-800',
  vegan: 'bg-emerald-100 text-emerald-800',
  regional: 'bg-amber-100 text-amber-800',
  glutenFree: 'bg-blue-100 text-blue-800',
  lactoseFree: 'bg-purple-100 text-purple-800',
  new: 'bg-brand-900 text-white',
  sale: 'bg-red-500 text-white',
  neu: 'bg-brand-900 text-white',
  angebot: 'bg-red-500 text-white',
}

export default function Badge({ label, type }: { label: string; type?: string }) {
  const cls = type ? colors[type] || 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800'
  return <span className={cn('inline-block px-2 py-0.5 text-xs font-medium rounded-full', cls)}>{label}</span>
}
