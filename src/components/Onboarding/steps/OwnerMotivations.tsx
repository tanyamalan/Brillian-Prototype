import { Input, SimpleGrid, Text } from '@chakra-ui/react';
import { Lightbulb } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, FormField, Question, StepHeader, StepLayout } from '../../ui/StepLayout';
import { InlineRadio } from '../../ui/InlineRadio';

export default function OwnerMotivations() {
  return (
    <>
      <StepHeader
        title="Owner & Motivations"
        subtitle="Tell us about your relationship to the business and what you want from it."
      />
      <StepLayout
        forms={
          <FormCard>
            <SimpleGrid columns={1} gap="4">
              <FormField label="Title / Role">
                <Input placeholder="CEO" required />
              </FormField>
              <FormField label="Year you started">
                <Input placeholder="YYYY" type="number" min={1900} max={2026} required />
              </FormField>
              <FormField label="Percent of business owned">
                <Input placeholder="0 %" type="number" min={0} max={100} required />
              </FormField>
            </SimpleGrid>

            <Question
              title="What are your personal financial goals for the business? We will help guide and track to this goal."
              help="Understanding your goals helps us personalize our analysis and help to achieving your goals."
            >
              <InlineRadio
                name="financial-goals"
                options={[
                  { value: 'cash-out', label: 'Cash out via sale / merger' },
                  { value: 'cash-flow', label: 'Cash flow growth' },
                ]}
              />
            </Question>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={Lightbulb}
            headline="Your stake and goals shape valuation outcomes."
            summary="Knowing how much of the business you own and what you want from it helps us frame the right valuation for your situation."
            expandedContent={
              <>
                <Text>An owner planning to sell in 18 months gets a different analysis than one optimizing for long-term cash distributions — even for an identical business.</Text>
                <Text>Minority stakes also trade at discounts to controlling stakes, so ownership percent directly influences your number.</Text>
                <Source>Pratt's Stats / DealStats</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
