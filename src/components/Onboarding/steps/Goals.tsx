import { Text } from '@chakra-ui/react';
import { Clock } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, FormField, StepHeader, StepLayout } from '../../ui/StepLayout';
import { RadioCardGrid } from '../../ui/RadioCardGrid';
import { CurrencyInput } from '../../ui/CurrencyInput';

const goalOptions = [
  { value: 'grow', title: 'Grow & scale', desc: 'Build long-term value' },
  { value: 'optimize', title: 'Optimize', desc: 'Improve profit & cash' },
  { value: 'exit', title: 'Plan an exit', desc: 'Sell or transition' },
  { value: 'lifestyle', title: 'Lifestyle', desc: 'Steady income, less work' },
];

const exitOptions = [
  { value: '<2yrs', title: 'Under 2 years', desc: 'Imminent' },
  { value: '2-5yrs', title: '2–5 years', desc: 'Planning window' },
  { value: '5-10yrs', title: '5–10 years', desc: 'Long horizon' },
  { value: 'never', title: 'No plans', desc: 'Hold indefinitely' },
];

export default function Goals() {
  return (
    <>
      <StepHeader
        title="Your goals & time horizon"
        subtitle="This shapes the recommendations we'll surface for you."
      />
      <StepLayout
        forms={
          <FormCard>
            <FormField label="What's your primary goal for the business?">
              <RadioCardGrid name="goal" options={goalOptions} />
            </FormField>
            <FormField label="When might you exit or transition?">
              <RadioCardGrid name="exit" options={exitOptions} />
            </FormField>
            <FormField label="Target business value at exit" hint="optional">
              <CurrencyInput placeholder="5,000,000" />
            </FormField>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={Clock}
            headline="75% of owners regret selling within a year of closing."
            summary="Most regret comes from selling without a clear plan — financial, operational, or personal."
            expandedContent={
              <>
                <Text>Owners who start exit planning 3+ years in advance net 25–50% more on their sale than those who scramble in the final months.</Text>
                <Text>Even if you never plan to sell, building the business as if you will makes it stronger, more resilient, and more enjoyable to own.</Text>
                <Source>Exit Planning Institute</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
