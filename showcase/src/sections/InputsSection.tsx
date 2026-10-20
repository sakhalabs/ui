import { useState } from 'react'
import { Button, Field, Input, InputGroup, NumberInput, PasswordInput, SearchInput, Textarea } from '@sakhalabs/ui'
import { Example, PropsTable } from '../doc/Example'

export function InputsSection() {
  const [note, setNote] = useState('')
  const [qty, setQty] = useState(3)
  const [discount, setDiscount] = useState(10)

  return (
    <section className="section" id="inputs">
      <h2 className="section-title">Text Inputs</h2>
      <p className="section-desc">
        Fields always carry a visible label, optional hint or error text. Inputs are uncontrolled by
        default — pass <code>value</code>/<code>onChange</code> when you need state.
      </p>

      <Example
        title="Basic fields"
        description="Label above input, hint below. One column on mobile, row on desktop."
        column
        code={`<Field label="पसलको नाम / Shop name" hint="As printed on the receipt">
  <Input placeholder="e.g. Sakhā Kirana" />
</Field>
<Field label="Email">
  <Input type="email" placeholder="owner@example.com" />
</Field>`}
      >
        <div className="col">
          <Field label="पसलको नाम / Shop name" hint="As printed on the receipt">
            <Input placeholder="e.g. Sakhā Kirana" />
          </Field>
          <Field label="Email">
            <Input type="email" placeholder="owner@example.com" />
          </Field>
        </div>
      </Example>

      <Example
        title="Sizes"
        description="sm for dense tables, md default (40px), lg for touch-first screens."
        code={`<Input size="sm" placeholder="Small — table rows" />
<Input placeholder="Medium — default" />
<Input size="lg" placeholder="Large — POS / touch" />`}
      >
        <Input size="sm" placeholder="Small — table rows" />
        <Input placeholder="Medium — default" />
        <Input size="lg" placeholder="Large — POS / touch" />
      </Example>

      <Example
        title="Increment / decrement number"
        description="POS-style stepper: tap − and + instead of typing. Value is clamped to min/max; typing still works. (template: pos-terminal)"
        code={`const [qty, setQty] = useState(3)

<Field label="मात्रा / Quantity">
  <NumberInput
    value={qty}
    onChange={setQty}
    min={1}
    max={99}
    aria-label="Quantity"
  />
</Field>`}
      >
        <div style={{ width: 180 }}>
          <Field label="मात्रा / Quantity">
            <NumberInput value={qty} onChange={setQty} min={1} max={99} aria-label="Quantity" />
          </Field>
        </div>
      </Example>

      <Example
        title="NumberInput sizes & steps"
        description="lg for touch counters (48px steppers), sm inside table rows. step moves by 5 or 10."
        code={`<NumberInput value={qty} onChange={setQty} min={1} max={99} size="lg" />
<NumberInput value={qty} onChange={setQty} min={1} max={99} />
<NumberInput value={qty} onChange={setQty} min={1} max={99} size="sm" />
<NumberInput value={discount} onChange={setDiscount} min={0} max={50} step={5} />`}
      >
        <NumberInput value={qty} onChange={setQty} min={1} max={99} size="lg" aria-label="Quantity large" />
        <NumberInput value={qty} onChange={setQty} min={1} max={99} aria-label="Quantity medium" />
        <NumberInput value={qty} onChange={setQty} min={1} max={99} size="sm" aria-label="Quantity small" />
        <span className="divider" />
        <div style={{ width: 180 }}>
          <Field label={`Discount — step 5 (${discount}%)`}>
            <NumberInput value={discount} onChange={setDiscount} min={0} max={50} step={5} aria-label="Discount percent" />
          </Field>
        </div>
      </Example>

      <Example
        title="Error state"
        description="Error turns the border red and shows a plain-language message under the field."
        column
        code={`<Field label="फोन नम्बर / Phone" error="फोन नम्बर १० अंकको हुनुपर्छ / Must be 10 digits">
  <Input error defaultValue="98412" />
</Field>

<Field label="मात्रा / Quantity" error="स्टकमा ३ मात्र छ / Only 3 in stock">
  <NumberInput value={qty} onChange={setQty} min={1} max={99} error />
</Field>`}
      >
        <div className="col">
          <Field label="फोन नम्बर / Phone" error="फोन नम्बर १० अंकको हुनुपर्छ / Must be 10 digits">
            <Input error defaultValue="98412" />
          </Field>
          <Field label="मात्रा / Quantity" error="स्टकमा ३ मात्र छ / Only 3 in stock">
            <div style={{ maxWidth: 210 }}>
              <NumberInput value={qty} onChange={setQty} min={1} max={99} error aria-label="Quantity error" />
            </div>
          </Field>
        </div>
      </Example>

      <Example
        title="Prefix & suffix"
        description="Money inputs show the currency as a prefix — the number itself never wraps."
        column
        code={`<Field label="Price">
  <InputGroup pre="रु" suffix=".00" inputMode="decimal" placeholder="0.00" />
</Field>
<Field label="Discount">
  <InputGroup suffix="%" inputMode="numeric" placeholder="0" />
</Field>`}
      >
        <div className="col">
          <Field label="Price">
            <InputGroup pre="रु" suffix=".00" inputMode="decimal" placeholder="0.00" />
          </Field>
          <Field label="Discount">
            <InputGroup suffix="%" inputMode="numeric" placeholder="0" />
          </Field>
        </div>
      </Example>

      <Example
        title="Disabled & read-only"
        description="Read-only keeps the value selectable (e.g. auto-generated invoice number)."
        column
        code={`<Field label="Invoice number">
  <Input readOnly value="INV-2026-0042" onFocus={(e) => e.target.select()} />
</Field>
<Field label="Branch">
  <Input disabled value="Set by head office" onChange={() => {}} />
</Field>`}
      >
        <div className="col">
          <Field label="Invoice number">
            <Input readOnly defaultValue="INV-2026-0042" onFocus={(e) => e.target.select()} />
          </Field>
          <Field label="Branch">
            <Input disabled defaultValue="Set by head office" />
          </Field>
        </div>
      </Example>

      <Example
        title="Password"
        description="Show/hide toggle inside the field. On phones use autoComplete so the keyboard doesn't fight the user."
        code={`<Field label="पासवर्ड / Password">
  <PasswordInput placeholder="At least 8 characters" autoComplete="new-password" />
</Field>`}
      >
        <div style={{ width: 'min(320px, 100%)' }}>
          <Field label="पासवर्ड / Password">
            <PasswordInput placeholder="At least 8 characters" autoComplete="new-password" />
          </Field>
        </div>
      </Example>

      <Example
        title="Date, time & color"
        description="Native pickers — the phone opens its own calendar/clock. Never rebuild these with JS."
        code={`<Input type="date" aria-label="Date" />
<Input type="time" aria-label="Time" />
<Input type="datetime-local" aria-label="Date and time" />
<Input type="color" defaultValue="#4F46E5" aria-label="Color" style={{ width: 56 }} />`}
      >
        <Input type="date" aria-label="Date" defaultValue="2026-10-19" />
        <Input type="time" aria-label="Time" defaultValue="09:30" />
        <Input type="datetime-local" aria-label="Date and time" defaultValue="2026-10-19T09:30" />
        <Input type="color" defaultValue="#4F46E5" aria-label="Color" style={{ width: 56 }} />
      </Example>

      <Example
        title="Phone & numeric keyboards"
        description="inputMode='numeric'/'tel' opens the right mobile keypad — critical for POS entry speed."
        code={`<Input inputMode="numeric" placeholder="रु Amount" aria-label="Amount" />
<Input type="tel" placeholder="98XXXXXXXX" aria-label="Phone" />`}
      >
        <div style={{ width: 160 }}>
          <Input inputMode="numeric" placeholder="रु Amount" aria-label="Amount" />
        </div>
        <div style={{ width: 180 }}>
          <Input type="tel" placeholder="98XXXXXXXX" aria-label="Phone" />
        </div>
      </Example>

      <Example
        title="Textarea with counter"
        description="Growing multi-line input; show a counter when there is a hard limit."
        column
        code={`const [note, setNote] = useState('')

<Field label="Receipt note">
  <Textarea
    value={note}
    maxLength={120}
    onChange={(e) => setNote(e.target.value)}
    placeholder="धन्यवाद! फेरि आउनुहोस्।"
  />
</Field>
<span className="muted-text">{note.length}/120</span>`}
      >
        <div className="col">
          <Field label="Receipt note">
            <Textarea
              value={note}
              maxLength={120}
              onChange={(e) => setNote(e.target.value)}
              placeholder="धन्यवाद! फेरि आउनुहोस्।"
            />
          </Field>
          <span className="muted-text">{note.length}/120</span>
        </div>
      </Example>

      <Example
        title="Search"
        description="Filter lists instantly on typing — no submit button on mobile."
        code={`<SearchInput placeholder="ग्राहक खोज्नुहोस् / Search customers…" />
<SearchInput size="sm" placeholder="Filter products…" />`}
      >
        <div style={{ width: 'min(360px, 100%)' }}>
          <SearchInput placeholder="ग्राहक खोज्नुहोस् / Search customers…" />
        </div>
        <SearchInput size="sm" placeholder="Filter products…" />
      </Example>

      <Example
        title="Inline form row"
        description="Input + button on one row — common for 'add coupon / refer' style actions."
        code={`<InputGroup placeholder="Enter referral code" />
<Button variant="secondary">Apply</Button>`}
      >
        <div style={{ width: 'min(320px, 100%)' }}>
          <InputGroup placeholder="Enter referral code" />
        </div>
        <Button variant="secondary">Apply</Button>
      </Example>

      <PropsTable
        rows={[
          ['Field — label', 'string', 'required'],
          ['Field — hint', 'string', '—'],
          ['Field — error', 'string', '—'],
          ['Input — size', "'sm' | 'md' | 'lg'", "'md'"],
          ['Input — error', 'boolean', 'false'],
          ['InputGroup — pre / suffix', 'ReactNode', '—'],
          ['SearchInput — icon built-in', '—', 'search icon'],
          ['NumberInput — value / onChange', 'number / (n) => void', 'required'],
          ['NumberInput — min / max', 'number', '0 / 9999'],
          ['NumberInput — step', 'number', '1'],
          ['NumberInput — size', "'sm' | 'md' | 'lg'", "'md'"],
          ['NumberInput — error', 'boolean', 'false'],
          ['PasswordInput — same props as Input', '—', 'show/hide toggle built in'],
        ]}
      />
    </section>
  )
}
