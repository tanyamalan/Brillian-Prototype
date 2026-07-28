import { Badge, Box, Button, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ArrowUpRight, BadgeCheck, Coins, FileText, MessageSquare, Repeat, TrendingUp, Users } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Card, CardHeader } from '../ui/Card';
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

// Benchmark rows are ordered best → worst; bar length scales to the best
// performer. Peer bars stay neutral Ink — only "You" carries the metric's
// status color, so the eye lands on your position.
interface BenchmarkRow {
  label: string;
  display: string;
  pct: number; // bar length, 0–100
  you?: boolean;
}

interface Benchmark {
  title: string;
  value: string;
  status: { label: string; intent: 'success' | 'moderate' | 'warning' };
  youColor: string;
  rows: BenchmarkRow[];
  note: React.ReactNode;
}

const BENCHMARKS: Benchmark[] = [
  {
    title: 'Net income margin',
    value: '31.8%',
    status: { label: 'Below top quartile', intent: 'moderate' },
    youColor: 'status.moderate',
    rows: [
      { label: 'Top 25%', display: '46%', pct: 100 },
      { label: 'Median', display: '36%', pct: 78 },
      { label: 'You', display: '31.8%', pct: 69, you: true },
      { label: 'Bottom 25%', display: '20%', pct: 43 },
    ],
    note: (
      <>
        <Text as="span" fontWeight={600} color="fg">14.2pts</Text> below top-quartile peers. Closing
        half that gap adds ~$80K/yr to SDE.
      </>
    ),
  },
  {
    title: 'AR days outstanding',
    value: '47 days',
    status: { label: 'Needs attention', intent: 'warning' },
    youColor: 'status.warning',
    rows: [
      { label: 'Top 25%', display: '18 days', pct: 35 },
      { label: 'Median', display: '27 days', pct: 52 },
      { label: 'You', display: '47 days', pct: 90, you: true },
      { label: 'Bottom 25%', display: '52 days', pct: 100 },
    ],
    note: (
      <>
        Collecting in <Text as="span" fontWeight={600} color="fg">27 days instead of 47</Text> would
        free up ~$38K in working capital immediately.
      </>
    ),
  },
  {
    title: 'Revenue growth rate',
    value: '8% YoY',
    status: { label: 'Above median', intent: 'success' },
    youColor: 'status.success',
    rows: [
      { label: 'Top 25%', display: '18%', pct: 100 },
      { label: 'You', display: '8%', pct: 44, you: true },
      { label: 'Median', display: '5%', pct: 28 },
      { label: 'Bottom 25%', display: '1%', pct: 6 },
    ],
    note: (
      <>
        Growing faster than <Text as="span" fontWeight={600} color="fg">63% of peers</Text>. Buyers
        pay a premium for consistent growth above 10%.
      </>
    ),
  },
];

function BenchmarkCard({ b }: { b: Benchmark }) {
  return (
    <Card display="flex" flexDir="column" gap="4">
      <Box>
        <Text fontSize="15px" fontWeight={500} color="fg" mb="2">
          {b.title}
        </Text>
        <Flex align="center" gap="2" flexWrap="wrap">
          <Text fontSize="2xl" fontWeight={700} color="fg" lineHeight="1">
            {b.value}
          </Text>
          <Badge intent={b.status.intent}>{b.status.label}</Badge>
        </Flex>
      </Box>

      <Stack gap="2">
        {b.rows.map(row => (
          <Flex key={row.label} align="center" gap="3">
            <Text
              w="72px"
              flexShrink={0}
              textAlign="right"
              fontSize="12px"
              fontWeight={row.you ? 600 : 400}
              color={row.you ? 'fg' : 'fg.subtle'}
            >
              {row.label}
            </Text>
            <Box flex="1" h="6px" rounded="pill" bg="bg.subtle">
              <Box h="full" rounded="pill" w={`${row.pct}%`} bg={row.you ? b.youColor : 'ink.300'} />
            </Box>
            <Text
              w="56px"
              flexShrink={0}
              fontSize="12px"
              fontFamily="mono"
              fontWeight={row.you ? 600 : 400}
              color={row.you ? 'fg' : 'fg.subtle'}
            >
              {row.display}
            </Text>
          </Flex>
        ))}
      </Stack>

      <Text fontSize="13px" color="fg.muted" lineHeight="1.5" mt="auto">
        {b.note}
      </Text>
    </Card>
  );
}

/**
 * ReviewBanner — milestone callout on the dark Forest surface (per the Dark
 * Mode spec): inverse Ink text, lime accent CTA, credential pill as an accent
 * badge, appraiser identity with an initials avatar.
 */
function ReviewBanner() {
  return (
    <Flex
      rounded="card"
      shadow="elevated"
      bg="bg.inverse"
      backgroundImage="linear-gradient(135deg, var(--chakra-colors-forest-700), var(--chakra-colors-forest-900))"
      px={{ base: '6', md: '8' }}
      py={{ base: '6', md: '7' }}
      gap={{ base: '6', xl: '8' }}
      align={{ base: 'stretch', xl: 'center' }}
      flexDir={{ base: 'column', xl: 'row' }}
    >
      <Box flex="1" minW="0">
        <Flex align="center" gap="1.5" mb="2" color="accent.solid">
          <BadgeCheck size={15} />
          <Text fontSize="12px" fontWeight={600} letterSpacing="0.04em" textTransform="uppercase">
            IRS-compliant · credentialed appraiser
          </Text>
        </Flex>
        <Text fontSize="lg" fontWeight={500} color="fg.inverse" lineHeight="1.4" maxW="480px">
          Your report has been reviewed — you're ready to schedule your call.
        </Text>
      </Box>

      <Flex
        align="center"
        gap="3"
        flexShrink={0}
        pl={{ base: '0', xl: '8' }}
        borderLeftWidth={{ base: 0, xl: '1px' }}
        borderColor="navDark.border"
      >
        <Avatar size="lg" label="SC" color="citron.300" textColor="fg" shape="circle" />
        <Box>
          <Text fontSize="14px" fontWeight={600} color="fg.inverse" lineHeight="1.3">
            Sarah Chen
          </Text>
          <Text fontSize="13px" color="fg.inverseSecondary" lineHeight="1.3">
            Certified Business Appraiser
          </Text>
          <Text fontSize="12px" color="fg.inverseSubtle" lineHeight="1.3" mt="0.5">
            Brillian Advisory · 14 yrs valuation & M&A
          </Text>
        </Box>
      </Flex>

      <Button intent="accent" flexShrink={0} w={{ base: 'full', xl: 'auto' }}>
        Schedule review
      </Button>
    </Flex>
  );
}

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
        <StatTile label="Estimated value" value="$2.4M" trend={{ value: '+6%', direction: 'up' }} sublabel="range $2.1M – $2.8M" />
        <StatTile label="Revenue (TTM)" value="$3.1M" trend={{ value: '+3%', direction: 'up' }} sublabel="+9% year over year" />
        <StatTile label="Owner earnings (SDE)" value="$610K" trend={{ value: '+2%', direction: 'up' }} sublabel="19.7% of revenue" />
        <StatTile label="Business health" value="72" trend={{ value: '-3', direction: 'down' }} sublabel="of 100 · above peers" />
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
          How you rank against 400K similar businesses
        </Text>
        {/* One dataset read together → related cards at gap 4 */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" alignItems="stretch">
          {BENCHMARKS.map(b => (
            <BenchmarkCard key={b.title} b={b} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Milestone banner — its own region */}
      <Box mt="8">
        <ReviewBanner />
      </Box>

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
