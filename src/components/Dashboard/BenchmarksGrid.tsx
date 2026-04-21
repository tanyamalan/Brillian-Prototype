import { Badge, Box, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Card } from '../ui/Card';

type BarColor = 'green' | 'orange' | 'blue' | 'red' | 'gray';

interface BenchBar {
  label: string;
  width: string;
  color: BarColor;
  value: string;
}

interface Benchmark {
  name: string;
  value: string;
  badgeText: string;
  badgePalette: 'yellow' | 'red' | 'green';
  bars: BenchBar[];
  insight: React.ReactNode;
}

const palettes: Record<BarColor, string> = {
  green: '#1E8E3E',
  orange: '#F9AB00',
  blue: '#4285F4',
  red: '#D93025',
  gray: '#BDC1C6',
};

function BenchmarkCard({ name, value, badgeText, badgePalette, bars, insight }: Benchmark) {
  return (
    <Card>
      <Text fontSize="14px" fontWeight={600} color="fg" mb="2">
        {name}
      </Text>
      <HStack align="baseline" gap="2" mb="4">
        <Text fontSize="32px" fontWeight={700} color="fg" lineHeight="1">
          {value}
        </Text>
        <Badge colorPalette={badgePalette} rounded="sm" px="2" py="0.5" fontSize="11px" fontWeight={600}>
          {badgeText}
        </Badge>
      </HStack>
      <Stack gap="2" mb="4">
        {bars.map(bar => (
          <HStack key={bar.label} gap="2">
            <Text fontSize="12px" color="fg.subtle" w="72px" textAlign="right" flexShrink={0}>
              {bar.label}
            </Text>
            <Box flex="1" h="2" bg="bg.subtle" rounded="full" overflow="hidden">
              <Box h="full" w={bar.width} bg={palettes[bar.color]} rounded="full" />
            </Box>
            <Text fontSize="12px" fontWeight={600} color="fg" w="13" flexShrink={0}>
              {bar.value}
            </Text>
          </HStack>
        ))}
      </Stack>
      <Text fontSize="12px" color="fg.muted" lineHeight="1.5">
        {insight}
      </Text>
    </Card>
  );
}

const benchmarks: Benchmark[] = [
  {
    name: 'Net Income Margin',
    value: '31.8%',
    badgeText: 'Below top quartile',
    badgePalette: 'yellow',
    bars: [
      { label: 'Top 25%', width: '100%', color: 'green', value: '46%' },
      { label: 'You', width: '69%', color: 'orange', value: '31.8%' },
      { label: 'Median', width: '78%', color: 'blue', value: '36%' },
      { label: 'Bottom 25%', width: '43%', color: 'gray', value: '20%' },
    ],
    insight: (
      <>
        <Text as="strong" color="fg" fontWeight={600}>14.2pts</Text> below top quartile peers. Closing half that gap adds ~$80K/yr to SDE.
      </>
    ),
  },
  {
    name: 'AR Days Outstanding',
    value: '47 days',
    badgeText: 'Needs attention',
    badgePalette: 'red',
    bars: [
      { label: 'Top 25%', width: '35%', color: 'green', value: '18 days' },
      { label: 'Median', width: '52%', color: 'blue', value: '27 days' },
      { label: 'You', width: '90%', color: 'red', value: '47 days' },
      { label: 'Bottom 25%', width: '100%', color: 'gray', value: '52 days' },
    ],
    insight: (
      <>
        Collecting in <Text as="strong" color="fg" fontWeight={600}>27 days instead of 47</Text> would free up ~$38K in working capital immediately.
      </>
    ),
  },
  {
    name: 'Revenue Growth Rate',
    value: '8% YoY',
    badgeText: 'Above Median',
    badgePalette: 'green',
    bars: [
      { label: 'Top 25%', width: '100%', color: 'green', value: '18%' },
      { label: 'You', width: '44%', color: 'green', value: '8%' },
      { label: 'Median', width: '28%', color: 'blue', value: '5%' },
      { label: 'Bottom 25%', width: '6%', color: 'gray', value: '1%' },
    ],
    insight: (
      <>
        Growing faster than <Text as="strong" color="fg" fontWeight={600}>63% of peers.</Text> Buyers pay a premium for consistent growth above 10%.
      </>
    ),
  },
];

export function BenchmarksGrid() {
  return (
    <>
      <Text fontSize="14px" fontWeight={600} color="fg.muted" mb="4">
        How you rank against 400K similar businesses
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
        {benchmarks.map(b => (
          <BenchmarkCard key={b.name} {...b} />
        ))}
      </SimpleGrid>
    </>
  );
}
