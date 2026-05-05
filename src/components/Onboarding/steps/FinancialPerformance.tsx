import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { Database, FileSpreadsheet } from 'lucide-react';
import DidYouKnow, { Source } from '../DidYouKnow';
import { FormCard, StepHeader, StepLayout } from '../../ui/StepLayout';

export default function FinancialPerformance() {
  return (
    <>
      <StepHeader
        title="Financial performance"
        subtitle="Connect QuickBooks or upload statements so we can work with the real numbers."
      />
      <StepLayout
        forms={
          <FormCard>
            <Text fontSize="14px" color="fg" lineHeight="1.6">
              Connect QuickBooks so we can import your financial statements automatically. It's read-only and takes about 30 seconds.
            </Text>

            <Box>
              <Text fontSize="15px" fontWeight={600} color="brand.solid" mb="1">
                Connect QuickBooks
              </Text>
              <Text fontSize="13px" color="fg.muted">
                Read-only access to your historical financial statements.
              </Text>
            </Box>

            <Stack direction={{ base: 'column', md: 'row' }} gap="3">
              <Button
                bg="status.success"
                color="fg.onBrand"
                _hover={{ bg: 'status.success.dark' }}
                rounded="sm"
                px="4"
                fontWeight={500}
                fontSize="13px"
                h="control"
                data-onboarding-required
              >
                <Database size={14} />
                Connect to QuickBooks
              </Button>
              <Button intent="secondary">
                <FileSpreadsheet size={14} />
                I don't have QuickBooks, I will upload statements instead
              </Button>
            </Stack>
          </FormCard>
        }
        sidebar={
          <DidYouKnow
            Icon={Database}
            headline="Real financials beat estimates every time."
            summary="Working from your actual balance sheet and income statement typically tightens the valuation range by 30% or more vs. guesswork."
            expandedContent={
              <>
                <Text>Buyers and lenders don't rely on owner estimates — they want trailing 3 years of P&amp;L plus a current balance sheet.</Text>
                <Text>The fastest path to a defensible valuation is connecting your accounting system once and letting us work from the source.</Text>
                <Source>NACVA Practitioner Survey</Source>
              </>
            }
          />
        }
      />
    </>
  );
}
