import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';

interface Opportunity {
  name: string;
  desc: string;
  annual: string;
  ev: string;
}

function OpportunityRow({
  opportunity,
  showDivider,
}: {
  opportunity: Opportunity;
  showDivider: boolean;
}) {
  return (
    <Box py="4" borderBottomWidth={showDivider ? '1px' : 0} borderColor="border.subtle">
      {/* Desktop / tablet — single horizontal row */}
      <Flex display={{ base: 'none', md: 'flex' }} align="center" gap="4">
        <Box flex="1" minW="0">
          <Text fontSize="14px" fontWeight={600} color="fg" mb="0.5">
            {opportunity.name}
          </Text>
          <Text fontSize="12px" color="fg.muted" lineHeight="1.4">
            {opportunity.desc}
          </Text>
        </Box>
        <Box textAlign="right" flexShrink={0}>
          <Text fontSize="14px" fontWeight={700} color="fg">
            {opportunity.annual}
          </Text>
          <Text fontSize="10px" color="fg.subtle">Annual Value</Text>
        </Box>
        <Box textAlign="right" flexShrink={0}>
          <Text fontSize="14px" fontWeight={700} color="brl.success">
            {opportunity.ev}
          </Text>
          <Text fontSize="10px" color="fg.subtle">Enterprise Value</Text>
        </Box>
        <Box color="fg.subtle" flexShrink={0}>
          <ChevronRight size={18} />
        </Box>
      </Flex>

      {/* Mobile — stacked */}
      <Box display={{ base: 'block', md: 'none' }}>
        <Flex align="flex-start" gap="2" mb="1">
          <Text fontSize="14px" fontWeight={600} color="fg" flex="1">
            {opportunity.name}
          </Text>
          <Box color="fg.subtle" flexShrink={0} mt="0.5">
            <ChevronRight size={16} />
          </Box>
        </Flex>
        <Text fontSize="12px" color="fg.muted" lineHeight="1.4" mb="2">
          {opportunity.desc}
        </Text>
        <HStack gap="4">
          <Box>
            <Text fontSize="14px" fontWeight={700} color="fg">
              {opportunity.annual}
            </Text>
            <Text fontSize="10px" color="fg.subtle">Annual</Text>
          </Box>
          <Box>
            <Text fontSize="14px" fontWeight={700} color="brl.success">
              {opportunity.ev}
            </Text>
            <Text fontSize="10px" color="fg.subtle">Enterprise Value</Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

const opportunities: Opportunity[] = [
  {
    name: 'Refinance debt to reduce rate',
    desc: 'Your credit line is 12% vs. 8-9.5% market rate — a 20-25% savings gap',
    annual: '$47K',
    ev: '+$117K',
  },
  {
    name: 'Reduce COGS to industry Standard',
    desc: 'COGS is ~ 20% above peers — margins are 34% vs. 45%-50% industry avg.',
    annual: '$120K',
    ev: '+$300K',
  },
];

export function OpportunitiesCard() {
  return (
    <Card>
      <Flex justify="space-between" align="center" mb="4">
        <Text fontSize="14px" fontWeight={600} color="fg">
          Top Opportunities to close the gap
        </Text>
        <Button variant="plain" color="brand.solid" textStyle="label" p="0" h="auto">
          See All
        </Button>
      </Flex>
      {opportunities.map((op, i) => (
        <OpportunityRow
          key={op.name}
          opportunity={op}
          showDivider={i < opportunities.length - 1}
        />
      ))}
    </Card>
  );
}
