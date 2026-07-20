import { Box, Button, Checkbox, Input, NativeSelect, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Plus, Users } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, FormField, Question, StepHeader, StepLayout } from '../../ui/StepLayout';
import { InlineRadio, yesNoOptions } from '../../ui/InlineRadio';

function OwnerBlock() {
  return (
    <Box borderWidth="1px" borderColor="border.subtle" rounded="md" p="4" bg="bg.dim">
      <Stack gap="4">
        <FormField label="Owner Type">
          <NativeSelect.Root>
            <NativeSelect.Field defaultValue="Individual">
              <option>Individual</option>
              <option>Trust</option>
              <option>Entity / Corporation</option>
              <option>Other</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </FormField>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          <FormField label="First Name">
            <Input placeholder="First" />
          </FormField>
          <FormField label="Last Name">
            <Input placeholder="Last" />
          </FormField>
        </SimpleGrid>
        <FormField label="Email">
          <Input placeholder="name@company.com" type="email" />
        </FormField>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          <FormField label="Ownership %">
            <Input placeholder="0 %" type="number" min={0} max={100} />
          </FormField>
          <FormField label="Year Started">
            <Input placeholder="YYYY" type="number" min={1900} max={2026} />
          </FormField>
        </SimpleGrid>
        <FormField label="Role / Title">
          <Input placeholder="CEO" />
        </FormField>
        <Stack gap="2">
          <Checkbox.Root defaultChecked>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label fontSize="13px">Active Role?</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label fontSize="13px">Majority voting control?</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label fontSize="13px">Economic ownership differs from voting/control rights?</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label fontSize="13px">Special rights beyond standard ownership?</Checkbox.Label>
          </Checkbox.Root>
        </Stack>
      </Stack>
    </Box>
  );
}

export default function Ownership() {
  return (
    <>
      <StepHeader
        title="Ownership"
        subtitle="Who owns what, and how the cap table is structured."
      />
      <StepLayout
        forms={
          <FormCard>
            <Question
              title="Who owns the business?"
              help="List each owner with their ownership share and any special rights. You can add multiple owners below."
            >
              <Stack gap="4">
                <OwnerBlock />
                <Box>
                  <Button intent="secondary" size="sm">
                    <Plus size={14} />
                    Add owner
                  </Button>
                </Box>
              </Stack>
            </Question>

            <Question
              title="Are there any buy/sell agreements between the owners?"
              help="Describe any agreements that govern how ownership can transfer between owners or to third parties."
            >
              <InlineRadio name="buy-sell" options={yesNoOptions} />
            </Question>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={Users}
            headline="Ownership structure shapes what a buyer actually gets."
            summary="Voting control, special rights, and buy/sell agreements can make otherwise similar ownership stakes worth very different amounts."
            expandedContent={
              <>
                <Text>Two 25% stakes can be priced very differently if one carries veto rights or a guaranteed buyout — that's why we capture the structure, not just the percentages.</Text>
                <Source>AICPA SSVS-1</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
