import { Box, Button, Checkbox, Input, NativeSelect, Text } from '@chakra-ui/react';
import { Plus, Scale } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, Question, StepHeader, StepLayout } from '../../ui/StepLayout';

export default function Finances() {
  return (
    <>
      <StepHeader
        title="Finances"
        subtitle="Capital structure and how revenue moves through the books."
      />
      <StepLayout
        forms={
          <FormCard>
            <Question
              title="What best describes the current operating condition of the business?"
              help="How the business is performing today shapes the valuation approach."
            >
              <NativeSelect.Root>
                <NativeSelect.Field rounded="sm" defaultValue="going-concern" {...({ required: true } as object)}>
                  <option value="going-concern">Going concern</option>
                  <option value="growth">Rapid growth</option>
                  <option value="declining">Declining</option>
                  <option value="distressed">Distressed / turnaround</option>
                  <option value="liquidation">Liquidation</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Text fontSize="12px" color="fg.subtle" mt="1.5">
                The business is expected to keep running in the foreseeable future, generating revenue and profits as usual.
              </Text>
            </Question>

            <Question
              title="How are revenues recognized (cash vs. accrual)?"
              help="Revenue recognition affects how we interpret your financials. Cash-basis counts revenue when payment is received; accrual counts it when it's earned."
            >
              <NativeSelect.Root>
                <NativeSelect.Field rounded="sm" defaultValue="accrual" {...({ required: true } as object)}>
                  <option value="accrual">Accrual</option>
                  <option value="cash">Cash</option>
                  <option value="hybrid">Hybrid</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Text fontSize="12px" color="fg.subtle" mt="1.5">
                Revenue is recognized when earned, regardless of when cash is received.
              </Text>
            </Question>

            <Question
              title="What share of your revenue is recurring or long-term contract?"
              help="Recurring revenue is typically more valuable than one-off sales because it is more predictable."
            >
              <Input placeholder="0 %" type="number" min={0} max={100} required />
              <Box mt="2">
                <Checkbox.Root>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="13px" color="fg.muted">
                    If easier to describe in words click box below
                  </Checkbox.Label>
                </Checkbox.Root>
              </Box>
            </Question>

            <Question
              title="What debt facilities are currently outstanding?"
              help="Leave empty if none; otherwise add up to three facilities."
            >
              <Button intent="secondary" size="sm">
                <Plus size={14} />
                Add Debt Facility
              </Button>
            </Question>

            <Question
              title="Are there any non-operating assets or liabilities on the balance sheet?"
              help="Items not tied to day-to-day operations (idle real estate, surplus cash, personal loans, etc.) are treated separately in the valuation."
            >
              <Button intent="secondary" size="sm">
                <Plus size={14} />
                Add Item
              </Button>
            </Question>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={Scale}
            headline="Debt changes valuation math, not business value."
            summary="Operating performance drives enterprise value; debt and non-operating items shift what that enterprise value means to you as the owner."
            expandedContent={
              <>
                <Text>Two businesses with identical EBITDA can deliver wildly different proceeds to owners depending on how much debt sits on the balance sheet at close.</Text>
                <Text>Non-operating assets (excess cash, real estate held outside operations) get added back to the equity number, so it pays to surface them upfront.</Text>
                <Source>Mergers & Acquisitions of Privately Held Companies — Mercer Capital</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
