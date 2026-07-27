import { Badge, Flex, Text } from '@chakra-ui/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card } from './Card';

interface StatTileProps {
  /** Uppercase label above the number. */
  label: string;
  /** The hero number / value. */
  value: string;
  /** Optional supporting line below the value. */
  sublabel?: string;
  /**
   * Optional quarter-over-quarter (or period) change badge next to the value.
   * Direction picks the arrow; intent defaults to success for up / danger for
   * down — override for inverse metrics where down is good.
   */
  trend?: {
    value: string;
    direction: 'up' | 'down';
    intent?: 'success' | 'danger' | 'moderate' | 'warning' | 'neutral';
  };
  /** Compact spacing for dense dashboards. */
  size?: 'sm' | 'md';
}

/**
 * StatTile — labeled KPI card. Use in dashboards and list-page headers to
 * surface key metrics in a consistent block.
 */
export function StatTile({ label, value, sublabel, trend, size = 'md' }: StatTileProps) {
  const isSm = size === 'sm';
  const TrendIcon = trend?.direction === 'down' ? ArrowDownRight : ArrowUpRight;
  const trendIntent = trend?.intent ?? (trend?.direction === 'down' ? 'danger' : 'success');
  return (
    <Card size={isSm ? 'sm' : 'md'}>
      <Text
        fontSize={isSm ? '11px' : '12px'}
        fontWeight={600}
        color="fg.muted"
        textTransform="uppercase"
        letterSpacing="0.5px"
        mb="1"
      >
        {label}
      </Text>
      <Flex align="baseline" gap="2" flexWrap="wrap">
        <Text
          fontSize={isSm ? '22px' : '28px'}
          fontWeight={700}
          color="fg"
          lineHeight="1.1"
          whiteSpace="nowrap"
        >
          {value}
        </Text>
        {trend && (
          <Badge intent={trendIntent}>
            <TrendIcon size={11} />
            {trend.value}
          </Badge>
        )}
      </Flex>
      {sublabel && (
        <Text fontSize={isSm ? '11px' : '12px'} color="fg.subtle" mt="1">
          {sublabel}
        </Text>
      )}
    </Card>
  );
}
