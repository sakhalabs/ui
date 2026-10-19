export interface Theme {
  id: string
  name: string
  description: string
  vars: Record<string, string>
}

/** Visual themes mapped to the UI/UX template catalog (see UIUXSakha docs). */
export const THEMES: Theme[] = [
  {
    id: 'clean',
    name: 'Clean SaaS',
    description: 'Light, minimal, friendly — the default product look. (template: clean-saas)',
    vars: {
      '--bg': '#F8FAFC',
      '--surface': '#FFFFFF',
      '--surface-2': '#F1F5F9',
      '--text': '#0F172A',
      '--muted': '#64748B',
      '--border': '#E2E8F0',
      '--border-w': '1px',
      '--radius': '8px',
      '--radius-lg': '16px',
      '--shadow': '0 1px 3px rgba(15, 23, 42, 0.08)',
      '--shadow-btn': 'none',
      '--font': 'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans Devanagari", sans-serif',
    },
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Structured navy corporate look, crisp radii. (template: corporate-trust)',
    vars: {
      '--bg': '#EEF2F7',
      '--surface': '#FFFFFF',
      '--surface-2': '#E2E8F0',
      '--text': '#0F172A',
      '--muted': '#475569',
      '--border': '#CBD5E1',
      '--border-w': '1px',
      '--radius': '4px',
      '--radius-lg': '6px',
      '--shadow': '0 1px 2px rgba(15, 23, 42, 0.10)',
      '--shadow-btn': 'none',
      '--font': 'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans Devanagari", sans-serif',
    },
  },
  {
    id: 'playful',
    name: 'Playful',
    description: 'Warm cream, very round, soft shadows. (template: playful-bright)',
    vars: {
      '--bg': '#FFF7ED',
      '--surface': '#FFFFFF',
      '--surface-2': '#FFEDD5',
      '--text': '#292524',
      '--muted': '#78716C',
      '--border': '#FED7AA',
      '--border-w': '1px',
      '--radius': '18px',
      '--radius-lg': '28px',
      '--shadow': '0 8px 20px rgba(234, 88, 12, 0.10)',
      '--shadow-btn': '0 4px 10px rgba(234, 88, 12, 0.15)',
      '--font': 'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans Devanagari", sans-serif',
    },
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    description: 'Thick black borders, hard offset shadows, monospace. (template: neo-brutalist)',
    vars: {
      '--bg': '#FFFDF7',
      '--surface': '#FFFFFF',
      '--surface-2': '#F2EFE2',
      '--text': '#111111',
      '--muted': '#444444',
      '--border': '#111111',
      '--border-w': '2px',
      '--radius': '2px',
      '--radius-lg': '2px',
      '--shadow': '4px 4px 0 #111111',
      '--shadow-btn': '3px 3px 0 #111111',
      '--font': 'ui-monospace, "Cascadia Mono", Menlo, Consolas, monospace',
    },
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Dark analytics-cockpit style. (template: analytics-dark)',
    vars: {
      '--bg': '#0B0F17',
      '--surface': '#111827',
      '--surface-2': '#1F2937',
      '--text': '#E5E7EB',
      '--muted': '#9CA3AF',
      '--border': '#273244',
      '--border-w': '1px',
      '--radius': '10px',
      '--radius-lg': '14px',
      '--shadow': '0 1px 3px rgba(0, 0, 0, 0.5)',
      '--shadow-btn': 'none',
      '--font': 'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans Devanagari", sans-serif',
    },
  },
]

/** Accent colors from the Sakhā skins catalog (SakhaLabs/src/skins.tsx). */
export const ACCENTS = [
  { id: 'everest-indigo', name: 'Everest Indigo', color: '#4F46E5' },
  { id: 'deep-ocean', name: 'Deep Ocean', color: '#075985' },
  { id: 'teal-mist', name: 'Teal Mist', color: '#0D9488' },
  { id: 'emerald-field', name: 'Emerald Field', color: '#047857' },
  { id: 'rhododendron', name: 'Rhododendron', color: '#D61F4A' },
  { id: 'sunset-pass', name: 'Sunset Pass', color: '#EA580C' },
  { id: 'mustang-amber', name: 'Mustang Amber', color: '#D97706' },
  { id: 'violet-peak', name: 'Violet Peak', color: '#7C3AED' },
] as const

export function getTheme(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}

export function getAccent(color: string) {
  return ACCENTS.find((a) => a.color === color || a.id === color) ?? ACCENTS[0]
}

/**
 * Apply a theme + accent to <html>. Call once at app root.
 * All components read these CSS variables, so everything restyles.
 */
export function applyTheme(theme: string | Theme, accent?: string): Theme {
  const t = typeof theme === 'string' ? getTheme(theme) : theme
  if (typeof document === 'undefined') return t
  const root = document.documentElement
  root.setAttribute('data-theme', t.id)
  for (const [k, v] of Object.entries(t.vars)) root.style.setProperty(k, v)
  if (accent) root.style.setProperty('--accent', accent)
  return t
}
