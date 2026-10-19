import type { ReactNode } from 'react'

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
export type BadgeVariant = 'soft' | 'solid' | 'outline'

export interface BadgeProps {
  tone?: Tone
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

export function Badge({ tone = 'neutral', variant = 'soft', children, className = '' }: BadgeProps) {
  return (
    <span className={`badge badge--${tone} badge--${variant}` + (className ? ` ${className}` : '')}>
      {children}
    </span>
  )
}
