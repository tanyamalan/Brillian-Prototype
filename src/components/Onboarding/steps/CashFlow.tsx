import { SimpleGrid } from '@chakra-ui/react';
import { Wallet } from 'lucide-react';
import DidYouKnow from '../DidYouKnow';
import { FormCard, FormField, StepHeader, StepLayout } from '../../ui/StepLayout';
import { RadioCardGrid } from '../../ui/RadioCardGrid';
import { CurrencyInput } from '../../ui/CurrencyInput';

const collectionOptions = [
  { value: '0-30', title: '0–30 days', desc: 'Strong' },
  { value: '30-45', title: '30–45 days', desc: 'Typical' },
  { value: '45-60', title: '45–60 days', desc: 'Stretched' },
  { value: '60+', title: '60+ days', desc: 'At risk' },
];

export default function CashFlow() {
  return (
    <>
      <StepHeader
        title="Cash flow & working capital"
        subtitle="How money moves through your business day to day."
      />
      <StepLayout
        forms={
          <FormCard>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              <FormField label="Cash on hand">
                <CurrencyInput placeholder="120,000" required />
              </FormField>
              <FormField label="Accounts receivable">
                <CurrencyInput placeholder="175,000" required />
              </FormField>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              <FormField label="Accounts payable">
                <CurrencyInput placeholder="95,000" required />
              </FormField>
              <FormField label="Inventory value">
                <CurrencyInput placeholder="60,000" required />
              </FormField>
            </SimpleGrid>
            <FormField label="Average collection time on invoices">
              <RadioCardGrid name="collection" options={collectionOptions} />
            </FormField>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={Wallet}
            headline="82% of failed small businesses cite cash flow problems — not lack of profit."
            summary="Profitable businesses go under every day because cash arrives too slowly."
            expandedContent={
              <>
                <p>Cash and profit are not the same thing. You can show $200K in annual profit while running out of money to make payroll, because that profit is locked up in unpaid invoices and inventory.</p>
                <p>Shortening collections from 45 to 30 days on $1M in revenue frees up roughly $40K in working capital.</p>
                <p style={{ fontSize: '10px', color: 'var(--chakra-colors-fg-subtle)', marginTop: '10px', fontStyle: 'italic' }}>Source: Relay Cash Flow Compass, 2024</p>
              </>
            }
          />
        }
      />
    </>
  );
}
