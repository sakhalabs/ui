import { useState } from 'react'
import { Button } from '@sakhalabs/ui'
import { Example, PropsTable } from '../doc/Example'

export function ButtonsSection() {
  const [loading, setLoading] = useState(false)

  const simulate = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1600)
  }

  return (
    <section className="section" id="buttons">
      <h2 className="section-title">Buttons</h2>
      <p className="section-desc">
        Five variants cover every Sakhā product: one primary action per screen, secondary for
        alternatives, outline/ghost for low-emphasis, danger for destructive.
      </p>

      <Example
        title="Variants"
        description="Only one primary button visible per screen — it marks the main action."
        code={`<Button variant="primary">नयाँ बिल / New bill</Button>
<Button variant="secondary">Save draft</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Learn more</Button>
<Button variant="danger">Delete shop</Button>`}
      >
        <Button variant="primary">नयाँ बिल / New bill</Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="ghost">Learn more</Button>
        <Button variant="danger">Delete shop</Button>
      </Example>

      <Example
        title="Sizes"
        description="sm for table rows and toolbars, md default, lg for POS / touch-first screens (48px)."
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large — touch</Button>`}
      >
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large — touch</Button>
      </Example>

      <Example
        title="States"
        description="Loading keeps the button width stable; disabled for unavailable actions."
        code={`<Button onClick={simulate} loading={loading}>
  {loading ? 'सेव हुँदै…' : 'Save'}
</Button>
<Button disabled>Not available</Button>
<Button variant="primary" loading disabled>Saving…</Button>`}
      >
        <Button onClick={simulate} loading={loading}>
          {loading ? 'सेव हुँदै…' : 'Save'}
        </Button>
        <Button disabled>Not available</Button>
        <Button variant="primary" loading disabled>
          Saving…
        </Button>
      </Example>

      <Example
        title="With icons"
        description="Icons clarify action type; always keep the text label for non-technical users."
        code={`<Button>
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
  Add product
</Button>
<Button variant="outline">Download report</Button>
<Button variant="danger">Delete</Button>`}
      >
        <Button>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add product
        </Button>
        <Button variant="outline">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download report
        </Button>
        <Button variant="danger">Delete</Button>
      </Example>

      <Example
        title="Full width"
        description="Mobile primary actions (POS pay, onboarding continue) span the full width."
        column
        code={`<Button fullWidth size="lg">PAY — रु 1,250.00</Button>`}
      >
        <Button fullWidth size="lg">
          PAY — रु 1,250.00
        </Button>
      </Example>

      <PropsTable
        rows={[
          ['variant', "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", "'primary'"],
          ['size', "'sm' | 'md' | 'lg'", "'md'"],
          ['loading', 'boolean', 'false'],
          ['fullWidth', 'boolean', 'false'],
          ['disabled', 'boolean', 'false'],
          ['onClick', '(e) => void', '—'],
        ]}
      />
    </section>
  )
}
