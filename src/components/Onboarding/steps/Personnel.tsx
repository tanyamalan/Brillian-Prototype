import { Button, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { Plus, Users2 } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, FormField, Question, StepHeader, StepLayout } from '../../ui/StepLayout';
import { InlineRadio, yesNoOptions } from '../../ui/InlineRadio';

export default function Personnel() {
  return (
    <>
      <StepHeader
        title="Personnel"
        subtitle="Who works in the business, what they do, and how it runs without you."
      />
      <StepLayout
        forms={
          <FormCard>
            <Question
              title="Are any owners paid a salary for roles they perform in the business?"
              help="Only include owners who receive regular compensation for day-to-day work. Leave empty if none."
            >
              <Button intent="secondary" size="sm">
                <Plus size={14} />
                Add Owner Salary
              </Button>
            </Question>

            <Question
              title="How many full-time and part-time employees do you have?"
              help="Counts help us benchmark labor intensity."
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                <FormField label="Full-time employees">
                  <Input placeholder="0" type="number" min={0} />
                </FormField>
                <FormField label="Part-time employees">
                  <Input placeholder="0" type="number" min={0} />
                </FormField>
              </SimpleGrid>
            </Question>

            <Question
              title="Are there key managers in place? Could they operate the business without the current ownership?"
              help="Describe bench strength. A business that runs without the owner is typically worth more."
            >
              <InlineRadio name="key-managers" options={yesNoOptions} />
            </Question>

            <Question
              title="Do you have any employee retention challenges or key-person risk?"
              help="Roles where a single departure would be hard to replace count as key-person risk."
            >
              <InlineRadio name="retention-risk" options={yesNoOptions} />
            </Question>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={Users2}
            headline="A business that runs without you is worth dramatically more."
            summary="Owner-dependent operations routinely discount enterprise value by 20–40% at exit."
            expandedContent={
              <>
                <Text>The fix is bench strength: documented processes, a capable second-in-command, and managers who already handle day-to-day decisions.</Text>
                <Source>RMA Annual Statement Studies</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
