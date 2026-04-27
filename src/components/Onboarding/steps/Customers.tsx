import { Input, SimpleGrid, Text } from '@chakra-ui/react';
import { Users } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, FormField, StepHeader, StepLayout } from '../../ui/StepLayout';
import { RadioCardGrid } from '../../ui/RadioCardGrid';
import { CheckboxGrid } from '../../ui/CheckboxGrid';

const top5Options = [
  { value: '<25', title: 'Under 25%', desc: 'Diversified' },
  { value: '25-50', title: '25–50%', desc: 'Balanced' },
  { value: '50-75', title: '50–75%', desc: 'Concentrated' },
  { value: '>75', title: 'Over 75%', desc: 'High risk' },
];

const recurringOptions = [
  'Long-term contracts',
  'Subscriptions',
  'Monthly retainers',
  'Repeat purchase patterns',
];

export default function Customers() {
  return (
    <>
      <StepHeader
        title="Customers & revenue mix"
        subtitle="Concentration risk is one of the biggest hits to enterprise value."
      />
      <StepLayout
        forms={
          <FormCard>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              <FormField label="Total active customers">
                <Input type="number" placeholder="120" required />
              </FormField>
              <FormField label="% revenue from top customer">
                <Input type="number" placeholder="18" min={0} max={100} required />
              </FormField>
            </SimpleGrid>
            <FormField label="% revenue from top 5 customers">
              <RadioCardGrid name="top5" options={top5Options} />
            </FormField>
            <FormField label="Recurring revenue model">
              <CheckboxGrid options={recurringOptions} />
            </FormField>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={Users}
            headline="If one customer is over 20% of revenue, expect a 20–40% valuation discount."
            summary="Buyers price in the risk that the customer leaves the day after closing."
            expandedContent={
              <>
                <Text>Customer concentration is one of the first things buyers and lenders examine. A business doing $5M with one client at 40% will often be valued more like a $3M business.</Text>
                <Text>The fix isn't just adding customers; it's diversifying revenue mix and building recurring contracts.</Text>
                <Source>Capitaliz / Forbes</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
