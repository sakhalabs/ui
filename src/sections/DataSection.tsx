import { Badge, Button, Card, SearchInput } from '@sakhalabs/ui'
import { Example, PropsTable } from '../doc/Example'

const BILL_ROWS = [
  { id: 'B-1042', customer: 'Sita Devi', amount: '1,250.00', status: 'paid' as const, time: '10:42' },
  { id: 'B-1041', customer: 'Ram Bahadur', amount: '480.50', status: 'due' as const, time: '10:18' },
  { id: 'B-1040', customer: 'Gita Store', amount: '3,100.00', status: 'paid' as const, time: '09:55' },
  { id: 'B-1039', customer: 'Mobile walk-in', amount: '95.00', status: 'due' as const, time: '09:31' },
]

export function DataSection() {
  return (
    <section className="section" id="data">
      <h2 className="section-title">Data Display</h2>
      <p className="section-desc">
        Cards group content, KPI blocks answer "how is my business today?", tables show many rows
        precisely. All numbers use tabular-nums so columns align and never wrap.
      </p>

      <Example
        title="KPI card"
        description="From the card-dashboard template — one big number, small label, delta chip."
        grid
        code={`<Card>
  <span className="kpi-label">आजको बिक्री / Today's sales</span>
  <div className="kpi-value">रु 12,450</div>
  <span className="kpi-delta kpi-delta--up">▲ 8% vs. हिजो</span>
</Card>`}
      >
        <Card>
          <span className="kpi-label">आजको बिक्री / Today's sales</span>
          <div className="kpi-value">रु 12,450</div>
          <span className="kpi-delta kpi-delta--up">▲ 8% vs. हिजो</span>
        </Card>
        <Card>
          <span className="kpi-label">नाफा / Profit</span>
          <div className="kpi-value">रु 2,180</div>
          <span className="kpi-delta kpi-delta--down">▼ 3% vs. हिजो</span>
        </Card>
      </Example>

      <Example
        title="Card with header & actions"
        description="Title + description on top, action buttons in a separated footer."
        code={`<Card
  title="पसलको जानकारी / Shop info"
  description="Shown on printed receipts"
  footer={<><Button variant="ghost">Cancel</Button><Button>Save</Button></>}
>
  …form fields here…
</Card>`}
      >
        <div style={{ width: '100%', maxWidth: 420 }}>
          <Card
            title="पसलको जानकारी / Shop info"
            description="Shown on printed receipts"
            footer={
              <>
                <Button variant="ghost">Cancel</Button>
                <Button>Save</Button>
              </>
            }
          >
            <span className="muted-text">
              Name, address, phone and VAT number appear in the receipt header.
            </span>
          </Card>
        </div>
      </Example>

      <Example
        title="Data table"
        description="From the dense-admin template: sticky header, tabular numbers, status badges, row actions."
        code={`<table className="table">
  <thead>
    <tr><th>Bill</th><th>Customer</th><th>Amount</th><th>Status</th><th></th></tr>
  </thead>
  <tbody>
    {rows.map((r) => (
      <tr key={r.id}>
        <td className="num">{r.id}</td>
        <td>{r.customer}</td>
        <td className="num">रु {r.amount}</td>
        <td><Badge tone={r.status === 'paid' ? 'success' : 'warning'}>…</Badge></td>
        <td><Button size="sm" variant="ghost">View</Button></td>
      </tr>
    ))}
  </tbody>
</table>`}
      >
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Bill</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {BILL_ROWS.map((r) => (
                <tr key={r.id}>
                  <td className="num">{r.id}</td>
                  <td>{r.customer}</td>
                  <td className="num">रु {r.amount}</td>
                  <td>
                    <Badge tone={r.status === 'paid' ? 'success' : 'warning'}>
                      {r.status === 'paid' ? 'Paid' : 'Due'}
                    </Badge>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Example>

      <Example
        title="Table toolbar"
        description="Search + primary action above the table — standard dense-admin header row."
        code={`<SearchInput placeholder="बिल खोज्नुहोस् / Search bills…" />
<Button>+ नयाँ बिल</Button>`}
      >
        <div style={{ width: 'min(320px, 100%)' }}>
          <SearchInput placeholder="बिल खोज्नुहोस् / Search bills…" />
        </div>
        <Button>+ नयाँ बिल</Button>
      </Example>

      <Example
        title="Avatars"
        description="Initials circles for users/customers without photos — accent-tinted, readable in both themes."
        code={`<span className="avatar">SD</span>
<span className="avatar">रा</span>`}
      >
        <span className="avatar">SD</span>
        <span className="avatar">रा</span>
        <span className="avatar">GB</span>
        <span className="muted-text">Sita Devi · Ram Bahadur · Gita Store</span>
      </Example>

      <PropsTable
        rows={[
          ['Card — title / description', 'string', '—'],
          ['Card — footer', 'ReactNode', '—'],
          ['table className="table"', 'built-in class', '—'],
          ['td className="num"', 'tabular numbers class', '—'],
          ['span className="avatar"', 'initials', '—'],
        ]}
      />
    </section>
  )
}
