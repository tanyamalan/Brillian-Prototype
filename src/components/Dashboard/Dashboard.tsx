import { useState } from 'react';
import { Box, Button, Flex, Heading, Link as ChakraLink, SimpleGrid, Text } from '@chakra-ui/react';
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

export default function Dashboard({ onStartOnboarding }: DashboardProps) {
  const [drill, setDrill] = useState<MetricId | null>(null);

  const digestLink = (label: string, metric: MetricId) => (
    <ChakraLink variant="inline" fontSize="15px" onClick={() => setDrill(metric)}>
      {label}
    </ChakraLink>
  );

  return (
    <Box flex="1" px={{ base: '4', md: '8' }} py="6" maxW="container.detail" w="full" mx="auto">
      {/* Title block → first region: 24px */}
      <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={500} color="fg" mb="1">
        Welcome back, John
      </Heading>
      <Text fontSize="14px" color="fg.muted" mb="6">
        Here's how Acme Services LLC is tracking this quarter.
      </Text>

      {/* Plain-English digest — inline links open the same drill-ins as the tiles */}
      <Card mb="6">
        <Text fontSize="15px" color="fg.body" lineHeight="1.7" maxW="720px">
          Your business is worth about{' '}
          <Text as="span" fontWeight={600} color="fg">$2.4M</Text>, up 6% this quarter —{' '}
          {digestLink("see what's driving it", 'value')}. Owner earnings grew to{' '}
          <Text as="span" fontWeight={600} color="fg">$610K</Text>, though{' '}
          {digestLink('your margin still trails top-quartile peers', 'sde')}. One watch item: you're
          collecting invoices slower than similar businesses, which{' '}
          {digestLink('pulled your health score down 3 points', 'health')}.
        </Text>
      </Card>

      {/* Stat tiles: 2 → md:4, gap 4 — each opens its drill-in */}
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" mb="6">
        <StatTile label="Estimated value" value="$2.4M" trend={{ value: '+6%', direction: 'up' }} sublabel="range $2.1M – $2.8M" onClick={() => setDrill('value')} />
        <StatTile label="Revenue (TTM)" value="$3.1M" trend={{ value: '+3%', direction: 'up' }} sublabel="+9% year over year" onClick={() => setDrill('revenue')} />
        <StatTile label="Owner earnings (SDE)" value="$610K" trend={{ value: '+2%', direction: 'up' }} sublabel="19.7% of revenue" onClick={() => setDrill('sde')} />
        <StatTile label="Business health" value="72" trend={{ value: '-3', direction: 'down' }} sublabel="of 100 · above peers" onClick={() => setDrill('health')} />
      </SimpleGrid>

      {/* One next-best-action — everything else lives in the drill-ins */}
      <Text fontSize="md" fontWeight={500} color="fg" mb="3">
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
