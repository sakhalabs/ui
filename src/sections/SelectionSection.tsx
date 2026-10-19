import { useState } from 'react'
import { Checkbox, Field, FileDrop, RadioGroup, Select, Slider, Switch } from '@sakhalabs/ui'
import { Example, PropsTable } from '../doc/Example'

export function SelectionSection() {
  const [category, setCategory] = useState('grocery')
  const [notify, setNotify] = useState({ sms: true, whatsapp: false, daily: true })
  const [payment, setPayment] = useState('cash')
  const [toggles, setToggles] = useState({ vat: true, offline: true, receipt: false })
  const [discount, setDiscount] = useState(10)

  return (
    <section className="section" id="selection">
      <h2 className="section-title">Selection Controls</h2>
      <p className="section-desc">
        Select, checkbox, radio, switch, slider and file upload. Rule of thumb: radio for one-of-few
        choices, switch for on/off settings that apply immediately, checkbox for multiple independent
        options.
      </p>

      <Example
        title="Select"
        description="Native select (accessible everywhere) with custom chevron. Use for long lists."
        column
        code={`<Field label="Category">
  <Select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    options={[
      { value: 'grocery', label: 'किराना / Grocery' },
      { value: 'snacks', label: 'Snacks' },
      { value: 'drinks', label: 'Drinks' },
      { value: 'household', label: 'Household' },
    ]}
  />
</Field>`}
      >
        <div className="col">
          <Field label="Category">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: 'grocery', label: 'किराना / Grocery' },
                { value: 'snacks', label: 'Snacks' },
                { value: 'drinks', label: 'Drinks' },
                { value: 'household', label: 'Household' },
              ]}
            />
          </Field>
        </div>
      </Example>

      <Example
        title="Checkboxes"
        description="Multiple independent options (notification preferences)."
        code={`<Checkbox
  label="SMS alerts"
  description="Send due-date reminders by SMS"
  checked={notify.sms}
  onChange={(e) => setNotify({ ...notify, sms: e.target.checked })}
/>
<Checkbox label="WhatsApp offers" checked={notify.whatsapp} onChange={…} />
<Checkbox label="Disabled option" disabled />`}
      >
        <div className="stack-sm">
          <Checkbox
            label="SMS alerts"
            description="Send due-date reminders by SMS"
            checked={notify.sms}
            onChange={(e) => setNotify({ ...notify, sms: e.target.checked })}
          />
          <Checkbox
            label="WhatsApp offers"
            description="Weekly offers to regular customers"
            checked={notify.whatsapp}
            onChange={(e) => setNotify({ ...notify, whatsapp: e.target.checked })}
          />
          <Checkbox label="Disabled option" disabled />
        </div>
      </Example>

      <Example
        title="Radio group"
        description="One-of-few exclusive choice — here the POS payment method."
        code={`<RadioGroup
  name="payment"
  value={payment}
  onChange={setPayment}
  options={[
    { value: 'cash', label: 'Cash', description: 'Paisa ready at counter' },
    { value: 'esewa', label: 'eSewa' },
    { value: 'khalti', label: 'Khalti' },
    { value: 'credit', label: 'उधारो / Credit', description: 'Add to customer ledger' },
  ]}
/>`}
      >
        <RadioGroup
          name="payment"
          value={payment}
          onChange={setPayment}
          options={[
            { value: 'cash', label: 'Cash', description: 'Paisa ready at counter' },
            { value: 'esewa', label: 'eSewa' },
            { value: 'khalti', label: 'Khalti' },
            { value: 'credit', label: 'उधारो / Credit', description: 'Add to customer ledger' },
          ]}
        />
      </Example>

      <Example
        title="Switches"
        description="Immediate-apply on/off settings — the effect happens the moment it's tapped, no Save button."
        code={`<Switch label="VAT included in prices" checked={toggles.vat}
        onChange={(v) => setToggles({ ...toggles, vat: v })} />
<Switch label="Offline billing" checked={toggles.offline} onChange={…} />
<Switch label="Print receipt automatically" checked={toggles.receipt} onChange={…} />`}
      >
        <div className="stack-sm">
          <Switch
            label="VAT included in prices"
            checked={toggles.vat}
            onChange={(v) => setToggles({ ...toggles, vat: v })}
          />
          <Switch
            label="Offline billing — cache products locally"
            checked={toggles.offline}
            onChange={(v) => setToggles({ ...toggles, offline: v })}
          />
          <Switch
            label="Print receipt automatically"
            checked={toggles.receipt}
            onChange={(v) => setToggles({ ...toggles, receipt: v })}
          />
          <Switch label="Disabled switch" checked={false} onChange={() => {}} disabled />
        </div>
      </Example>

      <Example
        title="Slider"
        description="Continuous values (discount %, volume). Show the live value next to it."
        code={`<span className="muted-text">{discount}%</span>
<Slider value={discount} onChange={setDiscount} min={0} max={50} aria-label="Discount percent" />`}
      >
        <span className="muted-text num" style={{ minWidth: 44, textAlign: 'right' }}>
          {discount}%
        </span>
        <div style={{ flex: 1, minWidth: 200 }}>
          <Slider value={discount} onChange={setDiscount} min={0} max={50} aria-label="Discount percent" />
        </div>
      </Example>

      <Example
        title="File upload"
        description="Drag-and-drop zone that also works as a plain file picker on phones."
        column
        code={`<FileDrop
  accept="image/png,image/jpeg"
  title="पसलको लोगो / Shop logo"
  hint="PNG or JPG, up to 2 MB"
  onFile={(file) => upload(file)}
/>

<FileDrop disabled title="Uploads locked" hint="Verify your account to upload" />`}
      >
        <div className="col">
          <div style={{ maxWidth: 360, width: '100%' }}>
            <FileDrop accept="image/png,image/jpeg" title="पसलको लोगो / Shop logo" hint="PNG or JPG, up to 2 MB" />
          </div>
          <div style={{ maxWidth: 360, width: '100%' }}>
            <FileDrop disabled title="Uploads locked" hint="Verify your account to upload" />
          </div>
        </div>
      </Example>

      <PropsTable
        rows={[
          ['Select — options', '{ value, label }[]', 'required'],
          ['Select — placeholder', 'string', '—'],
          ['Select — error', 'boolean', 'false'],
          ['Checkbox / Radio — label', 'string', 'required'],
          ['Checkbox / Radio — description', 'string', '—'],
          ['RadioGroup — direction', "'column' | 'row'", "'column'"],
          ['Switch — checked / onChange', 'boolean / (v) => void', 'required'],
          ['Switch — disabled', 'boolean', 'false'],
          ['Slider — min / max / step', 'number', '0 / 100 / 1'],
          ['FileDrop — onFile', '(file: File) => void', '—'],
          ['FileDrop — title / hint / accept', 'string', '—'],
          ['FileDrop — disabled', 'boolean', 'false'],
        ]}
      />
    </section>
  )
}
