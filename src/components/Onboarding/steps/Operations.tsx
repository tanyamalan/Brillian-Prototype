import { Input, SimpleGrid } from '@chakra-ui/react';
import { Settings as SettingsIcon } from 'lucide-react';
import DidYouKnow from '../DidYouKnow';
import { FormCard, FormField, StepHeader, StepLayout } from '../../ui/StepLayout';
import { RadioCardGrid } from '../../ui/RadioCardGrid';
import { CheckboxGrid } from '../../ui/CheckboxGrid';

const involvementOptions = [
  { value: 'full-time', title: 'Full-time', desc: '40+ hrs/week' },
  { value: 'part-time', title: 'Part-time', desc: '15–40 hrs/week' },
  { value: 'oversight', title: 'Oversight', desc: 'Under 15 hrs/week' },
  { value: 'passive', title: 'Passive', desc: 'Strategic only' },
];

const systemsOptions = [
  'Standard operating procedures',
  'CRM system',
  'Monthly financials',
  'KPI dashboards',
  'Second-tier management',
  'Training programs',
];

export default function Operations() {
  return (
    <>
      <StepHeader
        title="Operations & team"
        subtitle="How well does the business run when you're not there?"
      />
      <StepLayout
        forms={
          <FormCard>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              <FormField label="Full-time employees">
                <Input type="number" placeholder="14" required />
              </FormField>
              <FormField label="Contractors / part-time">
                <Input type="number" placeholder="3" required />
              </FormField>
            </SimpleGrid>
            <FormField label="Owner involvement in daily operations">
              <RadioCardGrid name="involvement" options={involvementOptions} />
            </FormField>
            <FormField label="Systems & documentation in place">
              <CheckboxGrid options={systemsOptions} />
            </FormField>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={SettingsIcon}
            headline="Owner-dependent businesses sell for 30–50% less than systematized ones."
            summary="If the business can't run without you, you don't own a business — you own a job."
            expandedContent={
              <>
                <p>Buyers pay a premium for businesses with documented systems, second-tier leadership, and recurring processes that don't require the owner.</p>
                <p>Even taking a two-week vacation without checking in is a useful test. If things fall apart, that's information you can act on now.</p>
                <p style={{ fontSize: '10px', color: 'var(--chakra-colors-fg-subtle)', marginTop: '10px', fontStyle: 'italic' }}>Source: UBS Investor Watch</p>
              </>
            }
          />
        }
      />
    </>
  );
}
