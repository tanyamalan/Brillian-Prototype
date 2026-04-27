import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { ArrowUp } from 'lucide-react';
import { Card } from '../ui/Card';

interface Metric {
  value: string;
  label: string;
  change: string;
}

function MetricCard({ value, label, change }: Metric) {
  return (
    <Box bg="bg.dim" rounded="sm" p={{ base: '3', md: '4' }} minW="0">
      <Text
        fontSize={{ base: '18px', md: '22px' }}
        fontWeight={700}
        color="fg"
        lineHeight="1.2"
        whiteSpace="nowrap"
      >
        {value}
      </Text>
      <Text fontSize="12px" color="fg.muted" mt="0.5">
        {label}
      </Text>
      <HStack mt="1" gap="0.5" color="brl.success" fontSize="11px" fontWeight={600}>
        <ArrowUp size={11} />
        <Text as="span" whiteSpace="nowrap">{change}</Text>
      </HStack>
    </Box>
  );
}

const metrics: Metric[] = [
  { value: '$572K', label: 'SDE', change: '12% YoY' },
  { value: '$1.8M', label: 'Revenue', change: '8% YoY' },
  { value: '31.8%', label: 'Margin', change: '1.4pts' },
];

export function ValuationCard() {
  return (
    <Card>
      <Flex justify="space-between" align="center" mb="1">
        <Text fontSize="14px" fontWeight={600} color="fg.muted">
          Business Valuation
        </Text>
        <Text fontSize="12px" color="fg.subtle">
          Updated Feb 2026
        </Text>
      </Flex>
      <Text
        fontSize={{ base: '32px', md: '42px' }}
        fontWeight={700}
        color="brl.success"
        letterSpacing="-1px"
        lineHeight="1.1"
      >
        $2.4M
      </Text>
      <Text fontSize="12px" color="fg.subtle" mt="1" mb="4">
        Based on 4.2 x SDE multiple Industry average: 3.6X
      </Text>
      <SimpleGrid columns={3} gap="2">
        {metrics.map(m => (
          <MetricCard key={m.label} {...m} />
        ))}
      </SimpleGrid>
    </Card>
  );
}
