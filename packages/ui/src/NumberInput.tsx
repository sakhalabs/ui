export interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  'aria-label'?: string
  id?: string
}

/** Numeric input with increment/decrement steppers — POS quantity, price, stock counts. */
export function NumberInput({
  value,
  onChange,
  min = 0,
  max = 9999,
  step = 1,
  size = 'md',
  disabled = false,
  ...rest
}: NumberInputProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n))

  return (
    <span className={'input-group number-input' + (size !== 'md' ? ` number-input--${size}` : '')}>
      <button
        type="button"
        className="number-step"
        onClick={() => onChange(clamp(value - step))}
        disabled={disabled || value <= min}
        aria-label="Decrease"
      >
        −
      </button>
      <input
        type="number"
        className="input"
        value={Number.isFinite(value) ? value : ''}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => {
          const raw = e.target.value
          if (raw === '') {
            onChange(min)
            return
          }
          const n = Number(raw)
          if (Number.isNaN(n)) return
          onChange(clamp(n))
        }}
        {...rest}
      />
      <button
        type="button"
        className="number-step"
        onClick={() => onChange(clamp(value + step))}
        disabled={disabled || value >= max}
        aria-label="Increase"
      >
        +
      </button>
    </span>
  )
}
