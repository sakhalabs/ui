import { useState } from 'react'
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'

export interface FieldProps {
  label: string
  hint?: string
  error?: string
  children: ReactNode
}

/** Label + control + hint/error wrapper. Clicking the label focuses the control. */
export function Field({ label, hint, error, children }: FieldProps) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {error ? (
        <span className="field-error" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className="field-hint">{hint}</span>
      ) : null}
    </label>
  )
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
}

export function Input({ size = 'md', error = false, className = '', type = 'text', ...rest }: InputProps) {
  const cls =
    'input' +
    (size !== 'md' ? ` input--${size}` : '') +
    (error ? ' input--error' : '') +
    (className ? ` ${className}` : '')
  return <input type={type} className={cls} aria-invalid={error || undefined} {...rest} />
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export function Textarea({ error = false, className = '', rows = 4, ...rest }: TextareaProps) {
  const cls = 'textarea' + (error ? ' input--error' : '') + (className ? ` ${className}` : '')
  return <textarea rows={rows} className={cls} aria-invalid={error || undefined} {...rest} />
}

export interface InputGroupProps extends InputProps {
  /** ReactNode version of the native string `prefix` attr — renamed to avoid the clash. */
  pre?: ReactNode
  suffix?: ReactNode
  icon?: ReactNode
}

/** Input wrapped in a bordered group — for prefixes (रु), suffixes, or a leading icon. */
export function InputGroup({ pre, suffix, icon, size = 'md', error = false, className = '', type = 'text', ...rest }: InputGroupProps) {
  const cls =
    'input' +
    (size !== 'md' ? ` input--${size}` : '') +
    (error ? ' input--error' : '') +
    (className ? ` ${className}` : '')
  return (
    <span className="input-group">
      {pre && <span className="input-prefix">{pre}</span>}
      {icon}
      <input type={type} className={cls} {...rest} />
      {suffix && <span className="input-suffix">{suffix}</span>}
    </span>
  )
}

export function SearchInput({ placeholder = 'Search…', ...rest }: InputProps) {
  return (
    <InputGroup
      placeholder={placeholder}
      icon={
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      }
      {...rest}
    />
  )
}

/** Password field with a show/hide toggle inside the input group. */
export function PasswordInput({ className = '', ...rest }: InputProps) {
  const [show, setShow] = useState(false)
  return (
    <InputGroup
      type={show ? 'text' : 'password'}
      className={className}
      icon={
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      }
      suffix={
        <button type="button" className="link-btn" onClick={() => setShow((s) => !s)}>
          {show ? 'Hide' : 'Show'}
        </button>
      }
      {...rest}
    />
  )
}
