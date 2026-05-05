import { Input, NativeSelect, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { MapPin } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, FormField, Question, StepHeader, StepLayout } from '../../ui/StepLayout';
import { InlineRadio, yesNoOptions } from '../../ui/InlineRadio';

const stateOptions = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
];

export default function BusinessProfile() {
  return (
    <>
      <StepHeader
        title="Business profile"
        subtitle="The core facts that frame your valuation context."
      />
      <StepLayout
        forms={
          <FormCard>
            <Question
              title="What is the business type for the company?"
              help="Your business type helps determine valuation assumptions and benchmarks."
            >
              <NativeSelect.Root>
                <NativeSelect.Field rounded="sm" defaultValue="" {...({ required: true } as object)}>
                  <option value="" disabled>Select business type</option>
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
            </Question>

            <Question
              title="What is the business address?"
              help="Enter the main business address where operations are primarily conducted. This location helps us apply the correct local and regional economic context in the valuation."
            >
              <Stack gap="4">
                <FormField label="Address line 1">
                  <Input placeholder="Street address" required />
                </FormField>
                <FormField label="Address line 2">
                  <Input placeholder="Suite, unit, etc. (optional)" />
                </FormField>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                  <FormField label="City">
                    <Input placeholder="City" required />
                  </FormField>
                  <FormField label="State">
                    <NativeSelect.Root>
                      <NativeSelect.Field rounded="sm" defaultValue="" {...({ required: true } as object)}>
                        <option value="" disabled>Select state</option>
                        {stateOptions.map(s => <option key={s}>{s}</option>)}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </FormField>
                  <FormField label="ZIP">
                    <Input placeholder="12345" required />
                  </FormField>
                </SimpleGrid>
              </Stack>
            </Question>

            <Question title="Do you only operate local to this address?">
              <InlineRadio name="local-only" options={yesNoOptions} />
            </Question>

            <Question title="What is your business web site address, if any?">
              <Input placeholder="https://example.com" type="url" />
            </Question>

            <Question
              title="Are there any related entities, affiliates, or subsidiaries?"
              help="If you have multiple related companies or entities that do business with each other, we need to understand these relationships to ensure we're valuing your business accurately and not double-counting assets or revenue."
            >
              <InlineRadio name="related-entities" options={yesNoOptions} />
            </Question>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={MapPin}
            headline="Where you operate matters as much as what you do."
            summary="Regional labor markets, real estate costs, and demographics all shape valuation comparables in a given geography."
            expandedContent={
              <>
                <Text>The same business in two different cities can be worth materially different multiples — buyers price labor pools, customer density, and local cost of living into their offers.</Text>
                <Source>BVR Regional Multiples Study</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
