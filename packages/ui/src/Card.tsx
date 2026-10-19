import type { ReactNode } from 'react'

export interface CardProps {
  title?: string
  description?: string
  footer?: ReactNode
  children: ReactNode
  className?: string
}

export function Card({ title, description, footer, children, className = '' }: CardProps) {
  return (
    <div className={'card' + (className ? ` ${className}` : '')}>
      {(title || description) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {description && <p className="card-desc">{description}</p>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
