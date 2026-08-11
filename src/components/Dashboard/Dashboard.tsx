import { useState } from 'react';
import { Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { BadgeCheck, Coins } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';
import { StatTile } from '../ui/StatTile';
import { MetricDrill } from './MetricDrill';
import type { MetricId } from './MetricDrill';

interface DashboardProps {
  onStartOnboarding: () => void;
}

/**
 * Owner dashboard, simplified: the four headline metrics ARE the navigation.
 * Each tile opens a slide-over drill-in (MetricDrill) with the depth — trend
 * context, plain-English answers via question chips, and an advisor hand-off.
 * Above the tiles, a plain-English digest with inline drill-in links; below,
 * one next-best-action and the review milestone banner. Depth on demand.
 */

/**
 * ReviewBanner — milestone callout on the dark Forest surface (per the Dark
 * Mode spec): inverse Ink text, lime accent CTA, credential pill as an accent
 * eyebrow, appraiser identity with an initials avatar.
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

/** Conversational entry point — a prepared prompt that opens a drill-in. */
function PromptChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button
      size="sm"
      h="9"
      px="4"
      fontSize="13px"
      fontWeight={500}
      rounded="pill"
      bg="bg"
      color="fg.muted"
      borderWidth="1px"
      borderColor="border"
      _hover={{ bg: 'bg.dim', color: 'fg', borderColor: 'border.strong' }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default function Dashboard({ onStartOnboarding }: DashboardProps) {
  const [drill, setDrill] = useState<MetricId | null>(null);

  return (
    <Box flex="1" px={{ base: '4', md: '8' }} py="6" maxW="container.detail" w="full" mx="auto">
      {/* Title block → first region: 24px */}
      <Heading as="h1" textStyle="pageTitle" color="fg" mb="1">
        Welcome back, John
      </Heading>
      <Text fontSize="14px" color="fg.muted" mb="6">
        Here's how Acme Services LLC is tracking this quarter.
      </Text>

      {/* Hero — the headline stat carries the page; prompts drive the depth */}
      <Card size="lg" mb="6">
        <Text fontSize="12px" fontWeight={600} color="fg.subtle" textTransform="uppercase" letterSpacing="0.6px" mb="3">
          Q3 2026 · Estimated value
        </Text>
        <Heading as="h2" textStyle="display" fontSize={{ base: '3xl', md: '4xl' }} color="fg" mb="2">
          Acme is worth about{' '}
          <Text as="span" fontWeight={700} color="brand.fg" whiteSpace="nowrap">
            $2.4M
          </Text>
        </Heading>
        <Text fontSize="15px" color="fg.muted" lineHeight="1.6" maxW="560px" mb="5">
          That's up{' '}
          <Text as="span" fontWeight={600} color="fg.success">$140K (+6%)</Text>{' '}
          since spring — your margin work is paying off.
        </Text>

        <Box maxW="480px" mb="6">
          <Box position="relative" h="8px" rounded="pill" bg="forest.100" mb="2">
            <Box position="absolute" left="18%" right="22%" top="0" bottom="0" rounded="pill" bg="forest.400" />
            <Box position="absolute" left="46%" top="-3px" boxSize="14px" rounded="full" bg="forest.600" borderWidth="2px" borderColor="white" />
          </Box>
          <Flex justify="space-between" fontSize="12px" color="fg.subtle" fontFamily="mono">
            <Text>Low $2.1M</Text>
            <Text>High $2.8M</Text>
          </Flex>
        </Box>

        <Text fontSize="14px" fontWeight={500} color="fg" mb="2.5">
          Where do you want to start?
        </Text>
        <Flex gap="2" flexWrap="wrap">
          <PromptChip label="What's driving the +$140K?" onClick={() => setDrill('value')} />
          <PromptChip label="How do I compare to peers?" onClick={() => setDrill('sde')} />
          <PromptChip label="Why did my health score dip?" onClick={() => setDrill('health')} />
          <PromptChip label="Show me my easy wins" onClick={() => setDrill('value')} />
        </Flex>
      </Card>

      {/* Supporting metrics — each opens its drill-in */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" mb="6">
        <StatTile label="Revenue (TTM)" value="$3.1M" trend={{ value: '+3%', direction: 'up' }} sublabel="+9% year over year" onClick={() => setDrill('revenue')} />
        <StatTile label="Owner earnings (SDE)" value="$610K" trend={{ value: '+2%', direction: 'up' }} sublabel="19.7% of revenue" onClick={() => setDrill('sde')} />
        <StatTile label="Business health" value="72" trend={{ value: '-3', direction: 'down' }} sublabel="of 100 · above peers" onClick={() => setDrill('health')} />
      </SimpleGrid>

      {/* One next-best-action — everything else lives in the drill-ins */}
      <Text textStyle="sectionHeader" color="fg" mb="3">
        Do this next
      </Text>
      <Card>
        <Flex align={{ base: 'flex-start', md: 'center' }} gap="4" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
          <Flex boxSize="40px" rounded="lg" bg="bg.subtle" color="fg" align="center" justify="center" flexShrink={0}>
            <Coins size={18} />
          </Flex>
          <Box flex="1" minW="0">
            <Text fontSize="14px" fontWeight={500} color="fg" mb="0.5">
              Normalize owner add-backs
            </Text>
            <Text fontSize="13px" color="fg.muted" lineHeight="1.5">
              Worth about <Text as="span" fontWeight={600} color="fg.success">+$180K</Text> to your
              valuation — reclassify personal expenses to lift reported SDE.
            </Text>
          </Box>
          <Button intent="primary" flexShrink={0} w={{ base: 'full', md: 'auto' }} onClick={onStartOnboarding}>
            See how
          </Button>
        </Flex>
      </Card>

      {/* Milestone banner — its own region */}
      <Box mt="8">
        <ReviewBanner />
      </Box>

      <MetricDrill metricId={drill} onClose={() => setDrill(null)} />
    </Box>
  );
}
