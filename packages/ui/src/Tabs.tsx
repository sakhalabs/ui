import { useRef, type KeyboardEvent, type ReactNode } from 'react'

export interface TabItem {
  value: string
  label: string
  badge?: string | number
}

export interface TabsProps {
  items: TabItem[]
  value: string
  onChange: (value: string) => void
  /** Optional base id — links each tab to its panel (pass the same id to TabPanel). */
  id?: string
}

/** Underline-style tab bar: roving tabindex, Arrow keys and Home/End. */
export function Tabs({ items, value, onChange, id }: TabsProps) {
  const ref = useRef<HTMLDivElement>(null)

  const select = (index: number) => {
    const item = items[index]
    if (!item) return
    onChange(item.value)
    ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = Math.max(0, items.findIndex((t) => t.value === value))
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        select((i + 1) % items.length)
        break
      case 'ArrowLeft':
        e.preventDefault()
        select((i - 1 + items.length) % items.length)
        break
      case 'Home':
        e.preventDefault()
        select(0)
        break
      case 'End':
        e.preventDefault()
        select(items.length - 1)
        break
    }
  }

  return (
    <div className="tabs" role="tablist" ref={ref} onKeyDown={onKeyDown}>
      {items.map((t) => {
        const selected = t.value === value
        return (
          <button
            key={t.value}
            id={id ? `${id}-tab-${t.value}` : undefined}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={id ? `${id}-panel-${t.value}` : undefined}
            tabIndex={selected ? 0 : -1}
            className={'tabs-tab' + (selected ? ' tabs-tab--active' : '')}
            onClick={() => onChange(t.value)}
          >
            {t.label}
            {t.badge !== undefined && <span className="tabs-badge">{t.badge}</span>}
          </button>
        )
      })}
    </div>
  )
}

export interface TabPanelProps {
  value: string
  active: string
  children: ReactNode
  /** Same base id as Tabs, so the panel is labelled by its tab. */
  id?: string
}

export function TabPanel({ value, active, children, id }: TabPanelProps) {
  if (value !== active) return null
  return (
    <div
      role="tabpanel"
      id={id ? `${id}-panel-${value}` : undefined}
      aria-labelledby={id ? `${id}-tab-${value}` : undefined}
      tabIndex={0}
      className="tab-panel"
    >
      {children}
    </div>
  )
}
