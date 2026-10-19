import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'

export type ToastTone = 'info' | 'success' | 'warning' | 'danger'

export interface ToastItem {
  id: number
  tone: ToastTone
  title: string
  body?: string
}

interface ToastApi {
  push: (t: { tone?: ToastTone; title: string; body?: string; duration?: number }) => number
  dismiss: (id: number) => void
}

const ToastContext = createContext<ToastApi | null>(null)

export interface ToastProviderProps {
  children: ReactNode
  max?: number
}

/** App-level toast host. Wrap once, then call useToast() anywhere. */
export function ToastProvider({ children, max = 4 }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([])
  const seq = useRef(0)

  const dismiss = useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id))
  }, [])

  const push = useCallback<ToastApi['push']>(
    ({ tone = 'info', title, body, duration = 4000 }) => {
      const id = ++seq.current
      setItems((list) => [...list.slice(-(max - 1)), { id, tone, title, body }])
      if (duration > 0) setTimeout(() => dismiss(id), duration)
      return id
    },
    [max, dismiss],
  )

  const api = useMemo(() => ({ push, dismiss }), [push, dismiss])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toaster" role="region" aria-label="Notifications">
        {items.map((t) => (
          <div key={t.id} className={`toast toast--${t.tone}`} role={t.tone === 'danger' ? 'alert' : 'status'}>
            <div className="toast-content">
              <p className="toast-title">{t.title}</p>
              {t.body && <p className="toast-body">{t.body}</p>}
            </div>
            <button className="alert-close" onClick={() => dismiss(t.id)} aria-label="Close">
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/** const { push } = useToast(); push({ tone: 'success', title: 'सेव भयो' }) */
export function useToast(): ToastApi {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
