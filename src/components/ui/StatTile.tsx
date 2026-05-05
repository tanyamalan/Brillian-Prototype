import { Text } from '@chakra-ui/react';
import { Card } from './Card';

interface StatTileProps {
  /** Uppercase label above the number. */
  label: string;
  /** The hero number / value. */
  value: string;
  /** Optional supporting line below the value. */
  sublabel?: string;
  /** Compact spacing for dense dashboards. */
  size?: 'sm' | 'md';
}

/**
 * StatTile — labeled KPI card. Use in dashboards and list-page headers to
 * surface key metrics in a consistent block.
 */
export function StatTile({ label, value, sublabel, size = 'md' }: StatTileProps) {
  const isSm = size === 'sm';
  return (
    <Card p={isSm ? '4' : undefined}>
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
      <Text
        fontSize={isSm ? '22px' : '28px'}
        fontWeight={700}
        color="fg"
        lineHeight="1.1"
        whiteSpace="nowrap"
      >
        {value}
      </Text>
      {sublabel && (
        <Text fontSize={isSm ? '11px' : '12px'} color="fg.subtle" mt="1">
          {sublabel}
        </Text>
      )}
    </Card>
  );
}
