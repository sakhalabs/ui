import { useState } from 'react'
import {
  Badge,
  Button,
  EmptyState,
  Modal,
  Pagination,
  Spinner,
  TabPanel,
  Tabs,
  useToast,
} from '@sakhaui/ui'
import { Example, PropsTable } from '../doc/Example'

export function OverlaysSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [tab, setTab] = useState('all')
  const [page, setPage] = useState(3)
  const { push } = useToast()

  return (
    <section className="section" id="overlays">
      <h2 className="section-title">Overlays & Navigation</h2>
      <p className="section-desc">
        Modal dialogs, tab bars, toast notifications, spinners, empty states and pagination — the
        pieces that appear on top of or around your main content.
      </p>

      <Example
        title="Modal"
        description="Confirmation dialogs, quick forms, detail views. Escape or backdrop click closes; body scroll locks while open."
        code={`const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Delete shop</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="पसल मेटाउने? / Delete shop?"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={confirmDelete}>Yes, delete</Button>
    </>
  }
>
  All bills, stock and ledger entries will be removed. This cannot be undone.
</Modal>`}
      >
        <Button variant="danger" onClick={() => setModalOpen(true)}>
          Delete shop…
        </Button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="पसल मेटाउने? / Delete shop?"
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setModalOpen(false)
                  push({ tone: 'danger', title: 'Demo only — nothing deleted', body: 'Wire this to your mutation.' })
                }}
              >
                Yes, delete
              </Button>
            </>
          }
        >
          All bills, stock and ledger entries will be removed. This cannot be undone.
        </Modal>
      </Example>

      <Example
        title="Tabs"
        description="Filter/section switching without leaving the page. Arrow keys move between tabs."
        code={`const [tab, setTab] = useState('all')

<Tabs
  items={[
    { value: 'all', label: 'All', badge: 24 },
    { value: 'due', label: 'Due', badge: 3 },
    { value: 'paid', label: 'Paid' },
  ]}
  value={tab}
  onChange={setTab}
/>
<TabPanel value="all" active={tab}>…all bills…</TabPanel>
<TabPanel value="due" active={tab}>…only dues…</TabPanel>`}
      >
        <div style={{ width: '100%' }}>
          <Tabs
            items={[
              { value: 'all', label: 'सबै / All', badge: 24 },
              { value: 'due', label: 'Due', badge: 3 },
              { value: 'paid', label: 'Paid' },
            ]}
            value={tab}
            onChange={setTab}
          />
          <TabPanel value="all" active={tab}>
            <span className="muted-text">24 bills — showing every transaction.</span>
          </TabPanel>
          <TabPanel value="due" active={tab}>
            <span className="muted-text">3 bills with unpaid dues — remind via WhatsApp.</span>
          </TabPanel>
          <TabPanel value="paid" active={tab}>
            <span className="muted-text">21 bills fully paid.</span>
          </TabPanel>
        </div>
      </Example>

      <Example
        title="Toasts"
        description="Non-blocking confirmations. Wrap the app once in <ToastProvider>, then push() from anywhere."
        code={`// app root:  <ToastProvider><App /></ToastProvider>
const { push } = useToast()

<Button onClick={() => push({ tone: 'success', title: 'सेव भयो / Saved' })}>Save</Button>
<Button variant="outline" onClick={() => push({ tone: 'info', title: 'Syncing', body: '७ बिलहरू लाइन हुँदै।' })}>Sync</Button>
<Button variant="danger" onClick={() => push({ tone: 'danger', title: 'Payment failed' })}>Fail</Button>`}
      >
        <Button onClick={() => push({ tone: 'success', title: 'सेव भयो / Saved', body: 'Shop info updated.' })}>
          Success toast
        </Button>
        <Button
          variant="outline"
          onClick={() => push({ tone: 'info', title: 'सिंक हुँदै / Syncing', body: '७ बिलहरू लाइन हुँदै।' })}
        >
          Info toast
        </Button>
        <Button
          variant="danger"
          onClick={() => push({ tone: 'danger', title: 'Payment failed', body: 'eSewa timed out — try again.' })}
        >
          Error toast
        </Button>
      </Example>

      <Example
        title="Spinner"
        description="Inline loading indicator. Use a label for screen readers; never show it without nearby context."
        code={`<Spinner size="sm" />
<Spinner />
<Spinner size="lg" label="Loading bills" />`}
      >
        <Spinner size="sm" />
        <Spinner />
        <Spinner size="lg" label="Loading bills" />
      </Example>

      <Example
        title="Empty state"
        description="Every empty list must say what it is and what to do next — never a blank screen."
        code={`<EmptyState
  title="कुनै बिल छैन / No bills yet"
  description="पहिलो बिल बनाउनुहोस् — ३ सेकेन्ड लाग्छ। Create your first bill; it takes 3 seconds."
  action={<Button>+ नयाँ बिल / New bill</Button>}
/>`}
      >
        <div style={{ width: '100%', maxWidth: 440 }}>
          <EmptyState
            title="कुनै बिल छैन / No bills yet"
            description="पहिलो बिल बनाउनुहोस् — ३ सेकेन्ड लाग्छ। Create your first bill; it takes 3 seconds."
            action={
              <Button
                onClick={() => push({ tone: 'info', title: 'Demo', body: 'This would open the bill screen.' })}
              >
                + नयाँ बिल / New bill
              </Button>
            }
          />
        </div>
      </Example>

      <Example
        title="Pagination"
        description="Numeric pagination for admin tables. Auto-collapses long ranges with ellipsis."
        code={`const [page, setPage] = useState(3)

<Pagination page={page} pageCount={12} onChange={setPage} />
<span className="muted-text">Page {page} of 12</span>`}
      >
        <Pagination page={page} pageCount={12} onChange={setPage} />
        <span className="muted-text num">
          Page {page} of 12
        </span>
      </Example>

      <PropsTable
        rows={[
          ['Modal — open / onClose', 'boolean / () => void', 'required'],
          ['Modal — size', "'sm' | 'md' | 'lg'", "'md'"],
          ['Modal — footer', 'ReactNode', '—'],
          ['Tabs — items', '{ value, label, badge? }[]', 'required'],
          ['Tabs — value / onChange', 'string / (v) => void', 'required'],
          ['TabPanel — value / active', 'string', 'required'],
          ['ToastProvider — max', 'number', '4'],
          ['useToast() — push', '({ tone?, title, body?, duration? })', 'returns id'],
          ['Spinner — size', "'sm' | 'md' | 'lg'", "'md'"],
          ['EmptyState — title / description / action', 'string / string / ReactNode', '—'],
          ['Pagination — page / pageCount / onChange', 'number / number / (p) => void', 'required'],
        ]}
      />
    </section>
  )
}
