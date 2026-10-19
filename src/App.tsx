import { useEffect, useState } from 'react'
import { ACCENTS, THEMES, ToastProvider, applyTheme } from '@sakhaui/ui'
import { ButtonsSection } from './sections/ButtonsSection'
import { InputsSection } from './sections/InputsSection'
import { SelectionSection } from './sections/SelectionSection'
import { FeedbackSection } from './sections/FeedbackSection'
import { OverlaysSection } from './sections/OverlaysSection'
import { DataSection } from './sections/DataSection'

const SECTIONS = [
  { id: 'buttons', title: 'Buttons', Component: ButtonsSection },
  { id: 'inputs', title: 'Text inputs', Component: InputsSection },
  { id: 'selection', title: 'Selection', Component: SelectionSection },
  { id: 'feedback', title: 'Feedback', Component: FeedbackSection },
  { id: 'overlays', title: 'Overlays', Component: OverlaysSection },
  { id: 'data', title: 'Data display', Component: DataSection },
] as const

export default function App() {
  const [themeId, setThemeId] = useState<string>(
    () => localStorage.getItem('sakha-ui-theme') ?? 'clean',
  )
  const [accent, setAccent] = useState<string>(
    () => localStorage.getItem('sakha-ui-accent') ?? '#4F46E5',
  )
  const [active, setActive] = useState<string>('buttons')

  useEffect(() => {
    applyTheme(themeId, accent)
    localStorage.setItem('sakha-ui-theme', themeId)
    localStorage.setItem('sakha-ui-accent', accent)
  }, [themeId, accent])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-84px 0px -65% 0px' },
    )
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]

  return (
    <ToastProvider>
      <div className="app">
        <aside className="sidebar">
          <div className="brand">
            Sakha UI
            <small>@sakhaui/ui — component library for Sakhā Labs products</small>
          </div>
          <div>
            <p className="sidebar-group-title">Components</p>
            <nav className="nav">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''}>
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
          <div className="sidebar-foot">
            Every preview has copy-ready code.
            <br />
            Styles map to the UIUXSakha template catalog.
          </div>
        </aside>

        <div className="main">
          <header className="topbar">
            <h1 className="topbar-title">{theme.name}</h1>
            <span className="muted-text">{theme.description}</span>
            <span className="topbar-spacer" />
            <span className="control-label">Theme</span>
            <div className="seg" role="group" aria-label="Theme">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={t.id === theme.id ? 'active' : ''}
                  aria-pressed={t.id === theme.id}
                  onClick={() => setThemeId(t.id)}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <span className="control-label">Accent</span>
            <div className="swatches">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={'swatch' + (a.color === accent ? ' active' : '')}
                  style={{ background: a.color }}
                  title={a.name}
                  aria-label={`Accent: ${a.name}`}
                  aria-pressed={a.color === accent}
                  onClick={() => setAccent(a.color)}
                />
              ))}
            </div>
          </header>

          <main className="content">
            {SECTIONS.map((s) => (
              <s.Component key={s.id} />
            ))}
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
