import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  placeholder?: string
  /** Red border + `aria-invalid`, matching Input and Textarea. */
  error?: boolean
}

export function Select({ options, placeholder, error = false, className = '', ...rest }: SelectProps) {
  return (
    <select
      className={'select' + (error ? ' input--error' : '') + (className ? ` ${className}` : '')}
      aria-invalid={error || undefined}
      {...rest}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
