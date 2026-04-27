import { SimpleGrid, Text } from '@chakra-ui/react';
import { TrendingUp } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, FormField, StepHeader, StepLayout } from '../../ui/StepLayout';
import { RadioCardGrid } from '../../ui/RadioCardGrid';
import { CurrencyInput } from '../../ui/CurrencyInput';

const growthOptions = [
  { value: 'Declining', title: 'Declining', desc: 'Below last year' },
  { value: 'Flat', title: 'Flat', desc: '±2%' },
  { value: 'Growing', title: 'Growing', desc: '3–15%' },
  { value: 'Scaling', title: 'Scaling', desc: '15%+' },
];

export default function RevenueProfit() {
  return (
    <>
      <StepHeader
        title="Revenue & profit"
        subtitle="Your trailing 12 months. Estimates are fine — you can refine later."
      />
      <StepLayout
        forms={
          <FormCard>
            <FormField label="Annual revenue" hint="trailing 12 months">
              <CurrencyInput placeholder="1,800,000" required />
            </FormField>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              <FormField label="Cost of goods sold">
                <CurrencyInput placeholder="1,170,000" required />
              </FormField>
              <FormField label="Operating expenses">
                <CurrencyInput placeholder="306,000" required />
              </FormField>
            </SimpleGrid>
            <FormField label="Year-over-year revenue growth">
              <RadioCardGrid name="growth" options={growthOptions} />
            </FormField>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={TrendingUp}
            headline="A 5% margin lift can double your business's value."
            summary="Because valuation is a multiple of profit, every dollar of margin compounds when you sell."
            expandedContent={
              <>
                <Text>If your business does $2M in revenue at a 10% net margin, you have $200K in profit. At a 4× multiple, that's an $800K business.</Text>
                <Text>Lift margin to 15% — same revenue, $300K profit — and the business is now worth $1.2M. A 50% margin improvement created a 50% higher sale price, no growth required.</Text>
                <Source>Exit Planning Institute</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
