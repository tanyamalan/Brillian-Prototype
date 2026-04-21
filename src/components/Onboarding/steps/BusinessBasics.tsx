import { Input, NativeSelect, SimpleGrid } from '@chakra-ui/react';
import { Lightbulb } from 'lucide-react';
import DidYouKnow from '../DidYouKnow';
import { FormCard, FormField, StepHeader, StepLayout } from '../../ui/StepLayout';
import { RadioCardGrid } from '../../ui/RadioCardGrid';

const structureOptions = [
  { value: 'LLC', title: 'LLC', desc: 'Limited Liability Company' },
  { value: 'S-Corp', title: 'S-Corp', desc: 'Pass-through taxation' },
  { value: 'C-Corp', title: 'C-Corp', desc: 'Standard corporation' },
  { value: 'Sole Prop', title: 'Sole Prop', desc: 'Single owner' },
];

const roleOptions = [
  { value: 'owner', title: 'Owner', desc: 'Sole or majority owner' },
  { value: 'partner', title: 'Partner', desc: 'Co-owner or partner' },
  { value: 'cfo', title: 'CFO / Finance', desc: 'Financial leadership' },
  { value: 'advisor', title: 'Advisor', desc: 'External advisor or CPA' },
];

export default function BusinessBasics() {
  return (
    <>
      <StepHeader
        title="Let's get the basics down"
        subtitle="We'll use this to set up your account and benchmark your business."
      />
      <StepLayout
        forms={
          <>
            <FormCard title="Your details">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                <FormField label="First name">
                  <Input placeholder="John" required />
                </FormField>
                <FormField label="Last name">
                  <Input placeholder="Richardson" required />
                </FormField>
              </SimpleGrid>
              <FormField label="Email">
                <Input placeholder="john@acmeservices.com" type="email" required />
              </FormField>
              <FormField label="Your role">
                <RadioCardGrid name="role" options={roleOptions} />
              </FormField>
            </FormCard>

            <FormCard title="Business details">
              <FormField label="Business name">
                <Input placeholder="Acme Services LLC" required />
              </FormField>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                <FormField label="Industry">
                  <NativeSelect.Root>
                    <NativeSelect.Field rounded="sm" defaultValue="" {...({ required: true } as object)}>
                      <option value="" disabled>Select industry…</option>
                      <option>Professional Services</option>
                      <option>Construction & Trades</option>
                      <option>Healthcare</option>
                      <option>Manufacturing</option>
                      <option>Retail & E-commerce</option>
                      <option>Restaurants & Hospitality</option>
                      <option>Technology & Software</option>
                      <option>Other</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </FormField>
                <FormField label="Year founded">
                  <Input placeholder="2015" type="number" min={1900} max={2026} required />
                </FormField>
              </SimpleGrid>
              <FormField label="Business structure">
                <RadioCardGrid name="structure" options={structureOptions} />
              </FormField>
            </FormCard>
          </>
        }
        sidebar={
          <DidYouKnow
            Icon={Lightbulb}
            headline="Industry matters more than size for valuation."
            summary="Two businesses with identical profits can be worth wildly different amounts depending on the multiple their industry commands."
            expandedContent={
              <>
                <p>SaaS companies routinely sell for 5–10× revenue, while traditional service businesses typically trade at 2–4× SDE (Seller's Discretionary Earnings).</p>
                <p>That's why benchmarking against your specific industry — not just "all small businesses" — is the foundation of an accurate valuation.</p>
                <p style={{ fontSize: '10px', color: 'var(--chakra-colors-fg-subtle)', marginTop: '10px', fontStyle: 'italic' }}>Source: BizBuySell Insight Report</p>
              </>
            }
          />
        }
      />
    </>
  );
}
