import { useState, type DragEvent } from 'react'

export interface FileDropProps {
  onFile?: (file: File) => void
  accept?: string
  hint?: string
  title?: string
  disabled?: boolean
}

export function FileDrop({
  onFile,
  accept,
  hint = 'PNG or JPG, up to 2 MB',
  title,
  disabled = false,
}: FileDropProps) {
  const [name, setName] = useState<string | null>(null)
  const [active, setActive] = useState(false)

  const take = (file: File | undefined) => {
    if (!file || disabled) return
    setName(file.name)
    onFile?.(file)
  }

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setActive(false)
    take(e.dataTransfer.files?.[0])
  }

  return (
    <label
      className={
        'filedrop' + (active ? ' filedrop--active' : '') + (disabled ? ' filedrop--disabled' : '')
      }
      aria-disabled={disabled || undefined}
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setActive(true)
      }}
      onDragLeave={() => setActive(false)}
      onDrop={onDrop}
    >
      {/* Visually hidden, never display:none — the zone must stay keyboard-reachable. */}
      <input
        type="file"
        className="filedrop-input"
        accept={accept}
        disabled={disabled}
        onChange={(e) => take(e.target.files?.[0] ?? undefined)}
      />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <span className="filedrop-title">{name ?? title ?? 'Choose a file or drop it here'}</span>
      <span className="filedrop-hint">{hint}</span>
    </label>
  )
}
