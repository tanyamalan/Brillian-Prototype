import { Input, Text, Textarea } from '@chakra-ui/react';
import { CheckCircle2 } from 'lucide-react';
import DidYouKnow from '../DidYouKnow';
import { FormCard, FormField, StepHeader, StepLayout } from '../../ui/StepLayout';
import { CheckboxGrid } from '../../ui/CheckboxGrid';

const contactOptions = ['Email', 'Phone', 'Through my advisor', 'Dashboard only'];

export default function ReviewFinish() {
  return (
    <>
      <StepHeader
        title="Review & finish"
        subtitle="A quick look at what you've shared. You can edit any section anytime."
      />
      <StepLayout
        forms={
          <FormCard>
            <FormField label="Your financial advisor" hint="optional">
              <Input placeholder="Name or firm" />
            </FormField>
            <FormField label="Anything else we should know?">
              <Textarea
                placeholder="Pending acquisitions, recent leadership changes, planned investments, etc."
                rounded="sm"
                minH="80px"
              />
            </FormField>
            <FormField label="How should we contact you with your report?">
              <CheckboxGrid options={contactOptions} />
            </FormField>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={CheckCircle2}
            headline="Your Brillian dashboard updates as your financials do."
            summary="Once you connect your books, valuation, health score, and benchmarks refresh automatically every month."
            expandedContent={
              <>
                <Text>That means you'll see the impact of every decision — a price increase, a new hire, a paid-down loan — reflected in your enterprise value within weeks.</Text>
                <Text>Your advisor sees the same numbers in real time, so conversations move from "what happened last quarter?" to "what should we do next?"</Text>
              </>
            }
          />
        }
      />
    </>
  );
}
