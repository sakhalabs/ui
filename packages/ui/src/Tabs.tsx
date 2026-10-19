import { useRef, type KeyboardEvent } from 'react'

export interface TabItem {
  value: string
  label: string
  badge?: string | number
}

export interface TabsProps {
  items: TabItem[]
  value: string
  onChange: (value: string) => void
}

/** Underline-style tab bar with arrow-key navigation (role=tablist). */
export function Tabs({ items, value, onChange }: TabsProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = items.findIndex((t) => t.value === value)
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const next = e.key === 'ArrowRight' ? (i + 1) % items.length : (i - 1 + items.length) % items.length
      onChange(items[next].value)
      ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
    }
  }

  return (
    <div className="tabs" role="tablist" ref={ref} onKeyDown={onKeyDown}>
      {items.map((t) => (
        <button
          key={t.value}
          role="tab"
          type="button"
          aria-selected={t.value === value}
          className={'tabs-tab' + (t.value === value ? ' tabs-tab--active' : '')}
          onClick={() => onChange(t.value)}
        >
          {t.label}
          {t.badge !== undefined && <span className="tabs-badge">{t.badge}</span>}
        </button>
      ))}
    </div>
  )
}

export interface TabPanelProps {
  value: string
  active: string
  children: React.ReactNode
}

export function TabPanel({ value, active, children }: TabPanelProps) {
  if (value !== active) return null
  return (
    <div role="tabpanel" className="tab-panel">
      {children}
    </div>
  )
}
