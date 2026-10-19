export interface SliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  'aria-label'?: string
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, disabled = false, ...rest }: SliderProps) {
  return (
    <input
      type="range"
      className="slider"
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      {...rest}
    />
  )
}
