import { useState, type ReactNode } from 'react'

export interface ExampleProps {
  title: string
  description?: string
  code: string
  column?: boolean
  grid?: boolean
  children: ReactNode
}

/** Preview + copyable code block used by every showcase section. */
export function Example({ title, description, code, column = false, grid = false, children }: ExampleProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* clipboard unavailable */
    }
  }

  const previewCls = 'preview' + (column ? ' preview--col' : '') + (grid ? ' preview--grid' : '')

  return (
    <div className="example">
      <div className="example-head">
        <div>
          <h4>{title}</h4>
          {description && <p>{description}</p>}
        </div>
        <button className="copy-btn" onClick={copy}>
          {copied ? 'Copied ✓' : 'Copy code'}
        </button>
      </div>
      <div className={previewCls}>{children}</div>
      <details className="code">
        <summary>Code</summary>
        <pre>
          <code>{code}</code>
        </pre>
      </details>
    </div>
  )
}

export type PropRow = [name: string, type: string, def: string]

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="props-wrap">
      <table className="props">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([p, t, d]) => (
            <tr key={p}>
              <td>
                <code>{p}</code>
              </td>
              <td>
                <code>{t}</code>
              </td>
              <td>
                <code>{d}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
