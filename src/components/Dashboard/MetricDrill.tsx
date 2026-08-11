import { useState } from 'react';
import { Badge, Box, Button, CloseButton, Drawer, Flex, Portal, Stack, Text } from '@chakra-ui/react';
import { ArrowDownRight, ArrowUpRight, Coins, Repeat, Users } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';
import { ListRow, RowList } from '../ui/ListRow';

export type MetricId = 'value' | 'revenue' | 'sde' | 'health';

interface QA {
  q: string;
  a: string;
}

interface DrillConfig {
  label: string;
  value: string;
  trend: { value: string; direction: 'up' | 'down'; intent: 'success' | 'danger' };
  blurb: string;
  qa: QA[];
}

const DRILLS: Record<MetricId, DrillConfig> = {
  value: {
    label: 'Estimated value',
    value: '$2.4M',
    trend: { value: '+6% this quarter', direction: 'up', intent: 'success' },
    blurb:
      'Your estimated value combines your owner earnings (SDE), current industry multiples for graphic design services, and your risk profile. The range narrows as your financial data improves.',
    qa: [
      {
        q: 'Why did my valuation change?',
        a: 'Your valuation rose 6% this quarter, mostly because your trailing-twelve-month owner earnings grew from $585K to $610K. Industry multiples for your sector held steady, so the gain is driven by your own performance.',
      },
      {
        q: 'How is this calculated?',
        a: "We apply market multiples from real transactions in your industry (NAICS 541430) to your normalized owner earnings, then adjust for risk factors like customer concentration and owner dependence. The low–high range reflects how much those factors could swing a real sale.",
      },
      {
        q: 'How do I increase it?',
        a: 'The two biggest levers right now: normalize your owner add-backs (worth about $180K) and grow your recurring revenue share (about $120K). Reducing how much the business depends on you personally also removes a discount buyers apply.',
      },
    ],
  },
  revenue: {
    label: 'Revenue (TTM)',
    value: '$3.1M',
    trend: { value: '+3% this quarter', direction: 'up', intent: 'success' },
    blurb:
      'Trailing-twelve-month revenue across all channels, updated from your connected accounting data. Buyers look for steady, diversified growth — pace matters less than consistency.',
    qa: [
      {
        q: 'How does my growth compare?',
        a: "You're growing 8% year over year — faster than 63% of similar businesses. The median for your industry is 5%. Buyers pay a premium for consistent growth above 10%.",
      },
      {
        q: 'Does revenue mix matter?',
        a: 'Yes — recurring contracts are currently 12% of your revenue, while peers run 30%+. Recurring revenue is more valuable because it is predictable; shifting your mix is one of your top opportunities.',
      },
    ],
  },
  sde: {
    label: 'Owner earnings (SDE)',
    value: '$610K',
    trend: { value: '+2% this quarter', direction: 'up', intent: 'success' },
    blurb:
      "Seller's discretionary earnings — your profit plus your compensation and perks added back. This is the number buyers multiply, so every dollar of SDE moves your valuation by several dollars.",
    qa: [
      {
        q: 'What counts as an add-back?',
        a: 'Owner salary, personal vehicle and travel run through the business, one-time expenses, and family members on payroll who aren\'t essential to operations. We flag likely add-backs automatically from your accounting data.',
      },
      {
        q: 'Why is my margin below top quartile?',
        a: 'Your net income margin is 31.8% against a top-quartile mark of 46%. Closing half that gap adds roughly $80K a year to SDE — the add-back review is the fastest path.',
      },
    ],
  },
  health: {
    label: 'Business health',
    value: '72',
    trend: { value: '-3 this quarter', direction: 'down', intent: 'danger' },
    blurb:
      'A 0–100 score across financial strength, customer concentration, owner dependence, and data quality. You score above your peer group, but the trend slipped this quarter.',
    qa: [
      {
        q: 'Why did my score drop?',
        a: 'Your receivables slowed — you now collect in 47 days against a peer median of 27. That single factor took 4 points off the score; everything else held or improved.',
      },
      {
        q: 'What moves it fastest?',
        a: 'Tightening collections. Getting from 47 to 27 days would restore the score and free roughly $38K of working capital immediately.',
      },
    ],
  },
};

const OPPORTUNITY_ROWS = [
  { Icon: Coins, title: 'Normalize owner add-backs', detail: 'Reclassify personal expenses to lift reported SDE.', impact: '+$180K' },
  { Icon: Repeat, title: 'Grow recurring revenue share', detail: 'Recurring contracts are 12% of revenue; peers run 30%+.', impact: '+$120K' },
  { Icon: Users, title: 'Reduce owner dependence', detail: 'Document processes so the business runs without you.', impact: null },
];

/** Pre-written question chips — the "chat without typing" pattern. */
function Questions({ qa }: { qa: QA[] }) {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <Box>
      <Text fontSize="14px" fontWeight={500} color="fg" mb="2.5">
        Common questions
      </Text>
      <Flex gap="2" flexWrap="wrap">
        {qa.map((item, i) => {
          const active = sel === i;
          return (
            <Button
              key={item.q}
              size="sm"
              h="8"
              px="3.5"
              fontSize="12px"
              fontWeight={500}
              rounded="pill"
              bg={active ? 'brand.solid' : 'bg'}
              color={active ? 'fg.inverse' : 'fg.muted'}
              borderWidth="1px"
              borderColor={active ? 'brand.solid' : 'border'}
              _hover={active ? { bg: 'brand.emphasized' } : { bg: 'bg.dim', color: 'fg' }}
              onClick={() => setSel(active ? null : i)}
            >
              {item.q}
            </Button>
          );
        })}
      </Flex>
      {sel != null && (
        <Card variant="filled" size="sm" mt="3">
          <Text fontSize="13px" color="fg.body" lineHeight="1.6">
            {qa[sel]!.a}
          </Text>
        </Card>
      )}
    </Box>
  );
}

interface MetricDrillProps {
  metricId: MetricId | null;
  onClose: () => void;
}

/**
 * MetricDrill — the slide-over deep dive behind each dashboard stat tile.
 * Anatomy: metric header → plain-English blurb → metric-specific detail →
 * question chips → advisor hand-off. Depth on demand, no chat box.
 */
export function MetricDrill({ metricId, onClose }: MetricDrillProps) {
  const config = metricId ? DRILLS[metricId] : null;
  const TrendIcon = config?.trend.direction === 'down' ? ArrowDownRight : ArrowUpRight;

  return (
    <Drawer.Root open={!!metricId} onOpenChange={e => { if (!e.open) onClose(); }} placement="end">
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content w={{ base: 'full', md: '480px' }} maxW="full" bg="bg">
            {config && (
              <>
                <Flex px="6" pt="6" pb="4" align="flex-start" justify="space-between" gap="4">
                  <Box>
                    <Text fontSize="12px" fontWeight={600} color="fg.muted" textTransform="uppercase" letterSpacing="0.5px" mb="1">
                      {config.label}
                    </Text>
                    <Flex align="baseline" gap="2" flexWrap="wrap">
                      <Text fontSize="3xl" fontWeight={700} color="fg" lineHeight="1">
                        {config.value}
                      </Text>
                      <Badge intent={config.trend.intent}>
                        <TrendIcon size={11} />
                        {config.trend.value}
                      </Badge>
                    </Flex>
                  </Box>
                  <CloseButton onClick={onClose} color="fg.muted" />
                </Flex>

                <Box px="6" pb="6" flex="1" overflowY="auto">
                  <Stack gap="6">
                    <Text fontSize="14px" color="fg.body" lineHeight="1.6">
                      {config.blurb}
                    </Text>

                    {metricId === 'value' && (
                      <>
                        <Box>
                          <Text fontSize="14px" fontWeight={500} color="fg" mb="2.5">
                            Your range
                          </Text>
                          <Box position="relative" h="8px" rounded="pill" bg="forest.100" mb="2">
                            <Box position="absolute" left="18%" right="22%" top="0" bottom="0" rounded="pill" bg="forest.400" />
                            <Box position="absolute" left="46%" top="-3px" boxSize="14px" rounded="full" bg="forest.600" borderWidth="2px" borderColor="white" />
                          </Box>
                          <Flex justify="space-between" fontSize="12px" color="fg.subtle" fontFamily="mono">
                            <Text>Low $2.1M</Text>
                            <Text>High $2.8M</Text>
                          </Flex>
                        </Box>

                        <Box>
                          <Text fontSize="14px" fontWeight={500} color="fg" mb="1">
                            What could move it
                          </Text>
                          <RowList>
                            {OPPORTUNITY_ROWS.map(o => (
                              <ListRow
                                key={o.title}
                                icon={<o.Icon size={18} />}
                                title={o.title}
                                subtitle={o.detail}
                                right={
                                  o.impact ? (
                                    <Text fontSize="14px" fontWeight={600} color="fg.success">
                                      {o.impact}
                                    </Text>
                                  ) : (
                                    <Badge intent="moderate">Risk</Badge>
                                  )
                                }
                                onClick={() => {}}
                              />
                            ))}
                          </RowList>
                        </Box>
                      </>
                    )}

                    <Questions qa={config.qa} />
                  </Stack>
                </Box>

                {/* Advisor hand-off — the human is the deepest drill-down */}
                <Flex px="6" py="4" borderTopWidth="1px" borderColor="border.subtle" align="center" gap="3">
                  <Avatar size="md" label="SC" color="citron.300" textColor="fg" shape="circle" />
                  <Box flex="1" minW="0">
                    <Text textStyle="label" color="fg" lineHeight="1.3">
                      Still curious?
                    </Text>
                    <Text fontSize="12px" color="fg.subtle" lineHeight="1.3">
                      Sarah Chen · Certified Business Appraiser
                    </Text>
                  </Box>
                  <Button intent="secondary" size="sm" h="9" flexShrink={0}>
                    Ask Sarah
                  </Button>
                </Flex>
              </>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
