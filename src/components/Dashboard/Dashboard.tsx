import { Badge, Box, Button, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ArrowUpRight, Coins, FileText, MessageSquare, Repeat, TrendingUp, Users } from 'lucide-react';
import { Card, CardDivider, CardHeader } from '../ui/Card';
import { ListRow, RowActions, RowList } from '../ui/ListRow';
import { StatTile } from '../ui/StatTile';

interface DashboardProps {
  onStartOnboarding: () => void;
}

/**
 * Owner dashboard — the reference implementation of the guide's layout
 * composition rules:
 *   title block → first region: mb 6 (24px)
 *   stat tiles: 2 → md:4, gap 4 · stat row → content below: mb 6
 *   content cards: 1 → xl:2, gap 6
 *   between major regions: mt 8 (32px)
 *   section header → content: mb 3 · list rows: Stack gap 2
 */

const OPPORTUNITIES = [
  {
    Icon: Coins,
    title: 'Normalize owner add-backs',
    detail: 'Reclassify personal expenses to lift reported SDE.',
    impact: '+$180K',
  },
  {
    Icon: Repeat,
    title: 'Grow recurring revenue share',
    detail: 'Recurring contracts are 12% of revenue; peers run 30%+.',
    impact: '+$120K',
  },
  {
    Icon: Users,
    title: 'Reduce owner dependence',
    detail: 'Document processes so the business runs without you.',
    impact: null, // risk item — badge instead of a value
  },
];

const ACTIVITY = [
  { Icon: FileText, text: '2023 tax return uploaded and parsed', time: '2h ago' },
  { Icon: TrendingUp, text: 'Industry benchmarks refreshed for NAICS 541430', time: 'Yesterday' },
  { Icon: MessageSquare, text: 'Sarah K. (Edward Jones) left a note on Financial Performance', time: '3d ago' },
];

function ValuationCard({ onStartOnboarding }: { onStartOnboarding: () => void }) {
  return (
    <Card display="flex" flexDir="column" gap="4">
      <CardHeader
        title="Estimated valuation"
        description="Based on your profile, financials, and industry comparables."
        action={
          <Button intent="secondary" size="sm" h="9" onClick={onStartOnboarding}>
            Improve accuracy
          </Button>
        }
      />
      <CardDivider />
      <Box>
        <Flex align="baseline" gap="2" mb="4">
          <Text fontSize="3xl" fontWeight={500} color="fg" lineHeight="1">
            $2.4M
          </Text>
          <Badge intent="success">
            <ArrowUpRight size={11} />
            +6% this quarter
          </Badge>
        </Flex>
        {/* Range bar: low → high with the estimate marked */}
        <Box position="relative" h="8px" rounded="pill" bg="forest.100" mb="2">
          <Box position="absolute" left="18%" right="22%" top="0" bottom="0" rounded="pill" bg="forest.400" />
          <Box position="absolute" left="46%" top="-3px" boxSize="14px" rounded="full" bg="forest.600" borderWidth="2px" borderColor="white" />
        </Box>
        <Flex justify="space-between" fontSize="12px" color="fg.subtle" fontFamily="mono" mb="4">
          <Text>Low $2.1M</Text>
          <Text>High $2.8M</Text>
        </Flex>
        <Text fontSize="13px" color="fg.muted" lineHeight="1.5">
          You're <Text as="span" fontWeight={600} color="fg">80% of the way</Text> to your $3M goal.
          Connecting your accounting software narrows the range.
        </Text>
      </Box>
    </Card>
  );
}

function OpportunitiesCard() {
  return (
    <Card display="flex" flexDir="column" gap="4">
      <CardHeader
        title="Top opportunities"
        description="The moves with the biggest impact on your valuation."
        action={
          <Button intent="secondary" size="sm" h="9">
            View all
          </Button>
        }
      />
      <CardDivider />
      {/* In-card rows joined by hairline dividers — the RowList pattern */}
      <RowList>
        {OPPORTUNITIES.map(o => (
          <ListRow
            key={o.title}
            icon={<o.Icon size={18} />}
            title={o.title}
            subtitle={o.detail}
            right={
              <Flex align="center" gap="2">
                {o.impact ? (
                  <Text fontSize="14px" fontWeight={600} color="fg.success">
                    {o.impact}
                  </Text>
                ) : (
                  <Badge intent="moderate">Risk</Badge>
                )}
                <RowActions
                  items={[
                    { label: 'View details' },
                    { label: 'Add to plan' },
                    'separator',
                    { label: 'Dismiss', danger: true },
                  ]}
                />
              </Flex>
            }
            onClick={() => {}}
          />
        ))}
      </RowList>
    </Card>
  );
}

export default function Dashboard({ onStartOnboarding }: DashboardProps) {
  return (
    <Box flex="1" px={{ base: '4', md: '8' }} py="6" maxW="container.detail" w="full" mx="auto">
      {/* Title block → first region: 24px */}
      <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={500} color="fg" mb="1">
        Welcome back, John
      </Heading>
      <Text fontSize="14px" color="fg.muted" mb="6">
        Here's how Acme Services LLC is tracking this quarter.
      </Text>

      {/* Stat tiles: 2 → md:4, gap 4 · row → content below: 24px */}
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" mb="6">
        <StatTile label="Estimated value" value="$2.4M" sublabel="range $2.1M – $2.8M" />
        <StatTile label="Revenue (TTM)" value="$3.1M" sublabel="+9% year over year" />
        <StatTile label="Owner earnings (SDE)" value="$610K" sublabel="19.7% of revenue" />
        <StatTile label="Business health" value="72" sublabel="of 100 · above peers" />
      </SimpleGrid>

      {/* Content cards: 1 → xl:2, gap 6 */}
      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6" alignItems="start">
        <ValuationCard onStartOnboarding={onStartOnboarding} />
        <OpportunitiesCard />
      </SimpleGrid>

      {/* New major region: 32px */}
      <Box mt="8">
        {/* Section header → content: 12px */}
        <Text fontSize="md" fontWeight={500} color="fg" mb="3">
          Recent activity
        </Text>
        {/* List rows: Stack gap 2 */}
        <Stack gap="2">
          {ACTIVITY.map(a => (
            <Card key={a.text} size="sm">
              <Flex align="center" gap="3">
                <Flex boxSize="32px" rounded="lg" bg="forest.50" color="forest.600" align="center" justify="center" flexShrink={0}>
                  <a.Icon size={16} />
                </Flex>
                <Text fontSize="13px" color="fg" flex="1" minW="0">
                  {a.text}
                </Text>
                <Text fontSize="12px" color="fg.subtle" flexShrink={0}>
                  {a.time}
                </Text>
              </Flex>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
