import type { ChangeEvent } from 'react'

export interface ChoiceProps {
  label: string
  description?: string
  name?: string
  value?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

function ChoiceItem({ type, label, description, disabled, ...rest }: ChoiceProps & { type: 'checkbox' | 'radio' }) {
  return (
    <label className={'check' + (disabled ? ' check--disabled' : '')}>
      <input type={type} disabled={disabled} {...rest} />
      <span>
        {label}
        {description && <span className="check-desc">{description}</span>}
      </span>
    </label>
  )
}

export function Checkbox(props: ChoiceProps) {
  return <ChoiceItem type="checkbox" {...props} />
}

export function Radio(props: ChoiceProps) {
  return <ChoiceItem type="radio" {...props} />
}

export interface RadioOption {
  value: string
  label: string
  description?: string
}

export interface RadioGroupProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  direction?: 'column' | 'row'
}

export function RadioGroup({ name, value, onChange, options, direction = 'column' }: RadioGroupProps) {
  return (
    <div className={'check-box' + (direction === 'row' ? ' check-box--row' : '')}>
      {options.map((o) => (
        <Radio
          key={o.value}
          name={name}
          value={o.value}
          label={o.label}
          description={o.description}
          checked={value === o.value}
          onChange={() => onChange(o.value)}
        />
      ))}
    </div>
  )
}
