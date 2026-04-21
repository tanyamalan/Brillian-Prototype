import { SimpleGrid } from '@chakra-ui/react';
import { Coins } from 'lucide-react';
import DidYouKnow from '../DidYouKnow';
import { FormCard, FormField, StepHeader, StepLayout } from '../../ui/StepLayout';
import { CheckboxGrid } from '../../ui/CheckboxGrid';
import { CurrencyInput } from '../../ui/CurrencyInput';

const addbackOptions = [
  'Vehicle',
  'Travel',
  'Meals & entertainment',
  'Phone & subscriptions',
  'Family on payroll',
  'Above-market rent',
];

export default function OwnerCompensation() {
  return (
    <>
      <StepHeader
        title="Owner compensation & add-backs"
        subtitle="These adjustments help us calculate your true earning power (SDE)."
      />
      <StepLayout
        forms={
          <FormCard>
            <FormField label="Owner salary" hint="W-2 + distributions">
              <CurrencyInput placeholder="180,000" required />
            </FormField>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              <FormField label="Owner benefits & perks">
                <CurrencyInput placeholder="24,000" />
              </FormField>
              <FormField label="Depreciation & amortization">
                <CurrencyInput placeholder="42,000" />
              </FormField>
            </SimpleGrid>
            <FormField label="Other personal expenses run through the business">
              <CheckboxGrid options={addbackOptions} />
            </FormField>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={Coins}
            headline="Add-backs typically increase reported earnings by 20–35%."
            summary="Most owners systematically understate what their business actually earns."
            expandedContent={
              <>
                <p>Tax returns are designed to minimize taxable income — not to showcase value. Buyers and lenders look at SDE, which adds back owner-specific expenses a new owner wouldn't incur.</p>
                <p>Common add-backs: above-market owner salary, personal vehicle, family wages, one-time legal fees, and discretionary travel.</p>
                <p style={{ fontSize: '10px', color: 'var(--chakra-colors-fg-subtle)', marginTop: '10px', fontStyle: 'italic' }}>Source: Cornerstone Business Advisors</p>
              </>
            }
          />
        }
      />
    </>
  );
}
