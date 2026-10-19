export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

/** Indeterminate loading spinner. Pass label for screen readers. */
export function Spinner({ size = 'md', label }: SpinnerProps) {
  return (
    <span
      className={`spinner spinner--standalone spinner--${size}`}
      role={label ? 'status' : undefined}
      aria-label={label}
    >
      {label && <span className="sr-only">{label}</span>}
    </span>
  )
}
