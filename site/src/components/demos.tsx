import { useEffect, useState, type CSSProperties } from 'react'
import {
  ACCENTS,
  Alert,
  Badge,
  Button,
  Field,
  Input,
  NumberInput,
  Select,
  Switch,
  THEMES,
  contrastText,
  mix,
} from '@sakhalabs/ui'

/**
 * The library's `applyTheme()` writes its tokens onto <html> — which on this
 * docs site would clobber Starlight's own light/dark toggle. So the demos
 * instead scope the library variables to a single wrapper element; CSS custom
 * properties inherit, so every component inside picks them up.
 */
function vars(themeId: string, accent: string): CSSProperties {
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]
  const onAccent = contrastText(accent)
  const strong = onAccent === '#ffffff' ? mix(accent, '#0b0f17', 0.82) : mix(accent, '#ffffff', 0.8)
  return {
    ...theme.vars,
    '--accent': accent,
    '--accent-contrast': onAccent,
    '--accent-strong': strong,
  } as CSSProperties
}

/** Follow Starlight's light/dark switch (it toggles data-theme on <html>). */
function useDocsTheme(): 'light' | 'dark' {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  useEffect(() => {
    const el = document.documentElement
    const read = () => setMode(el.dataset.theme === 'dark' ? 'dark' : 'light')
    read()
    const observer = new MutationObserver(read)
    observer.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])
  return mode
}

/* ------------------------------------------------------------------ demos */

export function ComponentStrip() {
  const mode = useDocsTheme()
  const [qty, setQty] = useState(2)
  const [category, setCategory] = useState('grocery')
  const [vat, setVat] = useState(true)

  return (
    <div className="demo-surface" style={vars(mode === 'dark' ? 'dark' : 'clean', '#4F46E5')}>
      <div className="demo-row">
        <Button variant="primary">Save bill</Button>
        <Button variant="secondary">Hold</Button>
        <Button variant="outline">Print</Button>
        <Button variant="danger" loading>
          Deleting…
        </Button>
      </div>

      <div className="demo-row">
        <Badge tone="success">Paid</Badge>
        <Badge tone="warning" variant="solid">
          Low stock
        </Badge>
        <Badge tone="danger">Overdue</Badge>
        <Badge tone="info" variant="outline">
          beta
        </Badge>
      </div>

      <div className="demo-grid">
        <Field label="किराना / Category">
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'grocery', label: 'किराना / Grocery' },
              { value: 'snacks', label: 'Snacks' },
              { value: 'drinks', label: 'Drinks' },
            ]}
          />
        </Field>
        <Field label="मात्रा / Quantity">
          <NumberInput value={qty} onChange={setQty} min={1} max={99} aria-label="Quantity" />
        </Field>
      </div>

      <Switch label="VAT included in prices" checked={vat} onChange={setVat} />

      <Alert tone="warning" title="स्टक कम / Low stock">
        आटा (10kg) मात्र २ बोरी बाँकी छन्।
      </Alert>
    </div>
  )
}

export function ThemePlayground() {
  const [themeId, setThemeId] = useState('clean')
  const [accent, setAccent] = useState<string>('#4F46E5')
  const [qty, setQty] = useState(2)
  const [email, setEmail] = useState('')

  return (
    <div>
      <div className="demo-row" style={{ marginBottom: '0.6rem' }}>
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setThemeId(t.id)}
            aria-pressed={themeId === t.id}
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: 999,
              cursor: 'pointer',
              fontSize: '0.85rem',
              border: '1px solid var(--sl-color-gray-5)',
              background: themeId === t.id ? 'var(--sl-color-accent)' : 'transparent',
              color: themeId === t.id ? 'var(--sl-color-accent-contrast)' : 'var(--sl-color-text)',
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="demo-row" style={{ marginBottom: '1rem' }}>
        {ACCENTS.map((a) => (
          <button
            key={a.id}
            type="button"
            title={a.name}
            aria-label={a.name}
            aria-pressed={accent === a.color}
            onClick={() => setAccent(a.color)}
            style={{
              width: 26,
              height: 26,
              borderRadius: 999,
              cursor: 'pointer',
              background: a.color,
              border: accent === a.color ? '3px solid var(--sl-color-text)' : '1px solid var(--sl-color-gray-5)',
            }}
          />
        ))}
      </div>

      <div className="demo-surface" style={vars(themeId, accent)}>
        <div className="demo-row">
          <Button variant="primary">Save</Button>
          <Button variant="outline">Cancel</Button>
          <Badge tone="success">Paid</Badge>
          <Badge tone="danger" variant="solid">
            Overdue
          </Badge>
        </div>
        <Field label="Email" hint="We never share it">
          <Input
            type="email"
            placeholder="owner@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <div className="demo-row">
          <NumberInput value={qty} onChange={setQty} min={1} max={99} aria-label="Quantity" />
          <Button variant="secondary">Add to bill</Button>
        </div>
      </div>
    </div>
  )
}
