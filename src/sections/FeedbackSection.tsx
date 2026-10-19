import { useState } from 'react'
import { Alert, Badge, Button } from '@sakhaui/ui'
import { Example, PropsTable } from '../doc/Example'

export function FeedbackSection() {
  const [showWelcome, setShowWelcome] = useState(true)

  return (
    <section className="section" id="feedback">
      <h2 className="section-title">Feedback & Status</h2>
      <p className="section-desc">
        Badges label status (paid / due / low stock); alerts communicate system messages. Colour is
        never the only signal — always pair it with text.
      </p>

      <Example
        title="Badges"
        description="soft for lists and tables, solid for counters, outline for tags."
        code={`<Badge tone="neutral">Draft</Badge>
<Badge tone="info">Building</Badge>
<Badge tone="success">Paid</Badge>
<Badge tone="warning">Low stock</Badge>
<Badge tone="danger">Overdue</Badge>

<Badge tone="success" variant="solid">12</Badge>
<Badge tone="info" variant="outline">beta</Badge>`}
      >
        <Badge tone="neutral">Draft</Badge>
        <Badge tone="info">Building</Badge>
        <Badge tone="success">Paid</Badge>
        <Badge tone="warning">Low stock</Badge>
        <Badge tone="danger">Overdue</Badge>
        <span className="divider" />
        <Badge tone="success" variant="solid">
          12
        </Badge>
        <Badge tone="danger" variant="solid">
          3
        </Badge>
        <Badge tone="info" variant="outline">
          beta
        </Badge>
      </Example>

      <Example
        title="Alerts"
        description="Toned message blocks with icon + title + one-line body. Danger uses role=alert for screen readers."
        code={`<Alert tone="info" title="सिंक हुँदै / Syncing">
  ७ बिलहरू अफलाइनमा बनेका छन् — इन्टरनेट आएपछि सिंक हुनेछन्।
</Alert>
<Alert tone="success" title="Payment received">रु 1,250.00 from Sita Devi.</Alert>
<Alert tone="warning" title="स्टक कम / Low stock">आटा (10kg) मात्र २ बोरी बाँकी छन्।</Alert>
<Alert tone="danger" title="Payment failed">eSewa responded with a timeout — try again.</Alert>`}
      >
        <div className="col">
          <Alert tone="info" title="सिंक हुँदै / Syncing">
            ७ बिलहरू अफलाइनमा बनेका छन् — इन्टरनेट आएपछि सिंक हुनेछन्।
          </Alert>
          <Alert tone="success" title="Payment received">
            रु 1,250.00 from Sita Devi.
          </Alert>
          <Alert tone="warning" title="स्टक कम / Low stock">
            आटा (10kg) मात्र २ बोरी बाँकी छन्।
          </Alert>
          <Alert tone="danger" title="Payment failed">
            eSewa responded with a timeout — try again.
          </Alert>
        </div>
      </Example>

      <Example
        title="Dismissible alert"
        description="Temporary messages (welcome, tips) can be dismissed; destructive warnings should not be."
        code={`{showWelcome && (
  <Alert tone="info" title="पहिलो पटक? / First time?"
         onDismiss={() => setShowWelcome(false)}>
    ३ सेकेन्डमा पहिलो बिल बनाउने तरिका →
  </Alert>
)}`}
      >
        <div className="col">
          {showWelcome ? (
            <Alert tone="info" title="पहिलो पटक? / First time?" onDismiss={() => setShowWelcome(false)}>
              ३ सेकेन्डमा पहिलो बिल बनाउने तरिका →
            </Alert>
          ) : (
            <Button variant="outline" onClick={() => setShowWelcome(true)}>
              Show alert again
            </Button>
          )}
        </div>
      </Example>

      <PropsTable
        rows={[
          ['Badge — tone', "'neutral' | 'info' | 'success' | 'warning' | 'danger'", "'neutral'"],
          ['Badge — variant', "'soft' | 'solid' | 'outline'", "'soft'"],
          ['Alert — tone', "'info' | 'success' | 'warning' | 'danger' | 'neutral'", "'info'"],
          ['Alert — title', 'string', 'required'],
          ['Alert — onDismiss', '() => void', '—'],
        ]}
      />
    </section>
  )
}
