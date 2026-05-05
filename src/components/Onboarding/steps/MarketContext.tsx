import { Input, Text, Textarea } from '@chakra-ui/react';
import { TrendingUp } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, FormField, Question, StepHeader, StepLayout } from '../../ui/StepLayout';

export default function MarketContext() {
  return (
    <>
      <StepHeader
        title="Market Context"
        subtitle="How you're positioned in the market and who's buying from you."
      />
      <StepLayout
        forms={
          <FormCard>
            <Question
              title="What differentiates your company from competitors?"
              help="Think about what you do better, differently, or uniquely compared to others in your market."
            >
              <Textarea placeholder="Describe what sets your company apart" rows={4} />
            </Question>

            <Question
              title="Who is your target customer, and what is the typical sales cycle?"
              help="Describe who buys from you and roughly how long it takes to close a sale."
            >
              <Textarea placeholder="Describe your ideal customer and the typical time to close" rows={4} />
            </Question>

            <Question
              title="What percent of sales are the owners responsible for bringing in?"
              help="Owner-sourced sales indicate dependency on ownership."
            >
              <FormField label="Owner-sourced sales (%)">
                <Input placeholder="0 %" type="number" min={0} max={100} />
              </FormField>
            </Question>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={TrendingUp}
            headline="Differentiation and demand drive the multiple."
            summary="A defensible 'why us' story plus a repeatable sales motion is what separates a 3x SDE business from a 6x one in the same industry."
            expandedContent={
              <>
                <Text>Buyers pay premiums for moats they can describe in one sentence — proprietary process, exclusive vendor relationships, owned distribution, or a brand customers actively choose.</Text>
                <Source>PitchBook M&amp;A Reports</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
