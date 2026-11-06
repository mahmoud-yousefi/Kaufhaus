import React from 'react'
import { motion } from 'framer-motion'

export default function BrandLoader({ label = 'Kaufhaus' }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-2xl border-2 border-brand-200"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-2 rounded-xl bg-brand-900"
          animate={{ scale: [1, 0.92, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        />
        <span className="relative font-display text-2xl text-white">K</span>
      </div>
      <div className="text-sm font-medium tracking-wide text-brand-700">{label}</div>
      <div className="h-1 w-32 overflow-hidden rounded-full bg-brand-100">
        <motion.div
          className="h-full w-1/3 rounded-full bg-accent-500"
          animate={{ x: ['-100%', '300%'] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
