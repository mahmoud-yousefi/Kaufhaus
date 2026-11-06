import React from 'react'
import { cn } from '../../lib/utils'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ variant = 'primary', size = 'md', className, children, ...rest }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-brand-900 text-white hover:bg-brand-700 active:scale-[0.98]',
    secondary: 'bg-accent-500 text-white hover:bg-accent-600',
    ghost: 'text-brand-900 hover:bg-brand-100',
    outline: 'border border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white',
  }
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' }
  return <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>{children}</button>
}
