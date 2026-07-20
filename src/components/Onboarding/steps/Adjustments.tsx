import { Button, NativeSelect, Text } from '@chakra-ui/react';
import { Plus, SlidersHorizontal } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, Question, StepHeader, StepLayout } from '../../ui/StepLayout';

export default function Adjustments() {
  return (
    <>
      <StepHeader
        title="Adjustments"
        subtitle="Normalize the financials so we can benchmark apples to apples."
      />
      <StepLayout
        forms={
          <FormCard>
            <Question title="Are there any non-recurring or extraordinary expenses or income present in the uploaded financial statements?">
              <Button intent="secondary" size="sm">
                <Plus size={14} />
                Add Non-Recurring Item
              </Button>
            </Question>

            <Question title="What owner or family compensation, perks, or discretionary expenses are included in the financials?">
              <Button intent="secondary" size="sm">
                <Plus size={14} />
                Add Expense
              </Button>
            </Question>

            <Question
              title="Have your financials been audited, reviewed, or compiled by a CPA?"
              help="We weight the numbers differently depending on whether they were audited, reviewed, compiled, or self-prepared."
            >
              <NativeSelect.Root>
                <NativeSelect.Field defaultValue="" {...({ required: true } as object)}>
                  <option value="" disabled>Select an assurance level</option>
                  <option value="audited">Audited</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="compiled">Compiled</option>
                  <option value="self">Self-prepared</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Question>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={SlidersHorizontal}
            headline="Add-backs are where reported profit becomes real profit."
            summary="Normalizing owner perks and one-off expenses can lift reported earnings 10–30% for owner-operated businesses — which directly moves valuation."
            expandedContent={
              <>
                <Text>Owner salary, family payroll, vehicle leases, club memberships, and one-time legal fees all get scrutinized in due diligence.</Text>
                <Text>Surfacing them now lets us model "true" earnings power instead of accepting whatever the tax-optimized P&amp;L shows.</Text>
                <Source>Mercer Capital — Normalization Adjustments Guide</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
