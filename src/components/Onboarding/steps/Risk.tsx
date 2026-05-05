import { Text, Textarea } from '@chakra-ui/react';
import { ShieldAlert } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, Question, StepHeader, StepLayout } from '../../ui/StepLayout';
import { InlineRadio, yesNoOptions } from '../../ui/InlineRadio';

export default function Risk() {
  return (
    <>
      <StepHeader
        title="Risk"
        subtitle="Flag anything that shapes how a buyer would read the business."
      />
      <StepLayout
        forms={
          <FormCard>
            <Question
              title="Are there any pending or potential legal, tax, or compliance issues?"
              help="Share anything unresolved that a buyer would want to know about."
            >
              <InlineRadio name="legal-issues" options={yesNoOptions} />
            </Question>

            <Question
              title="What are the biggest operational, financial, or market risks you face?"
              help="Think about what could meaningfully slow the business down or put revenue at risk over the next year or two."
            >
              <Textarea placeholder="Describe the risks most on your mind" rows={4} />
            </Question>

            <Question title="Were there any major changes or one-time events that have impacted your business or strategy?">
              <InlineRadio name="major-changes" options={yesNoOptions} />
            </Question>

            <Question
              title="Are there any known critical dependencies (e.g. single supplier, single customer, key technology)?"
              help="Heavy dependence on any one relationship creates concentration risk and can affect valuation."
            >
              <InlineRadio name="critical-dependencies" options={yesNoOptions} />
            </Question>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={ShieldAlert}
            headline="Known risks get priced lower; surprise risks get the deal killed."
            summary="Being up-front here lets us frame risk in context, which almost always produces a better outcome than a buyer finding it later."
            expandedContent={
              <>
                <Text>Surfaced risks get negotiated; hidden risks blow up in due diligence and either re-trade the price or walk the buyer.</Text>
                <Source>BVR DealStats &middot; Risk Factor Studies</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
