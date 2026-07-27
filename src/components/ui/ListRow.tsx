import { Box, Flex, Text } from '@chakra-ui/react';

/**
 * RowList + ListRow — rows *inside one card*, separated by hairline dividers
 * (border.subtle) instead of gaps. Use when the rows are one dataset read
 * together (transactions, opportunities, line items). For independent,
 * clickable destinations use the other list pattern: separate sm cards in a
 * Stack at gap 2 (see the layout guide's content-composition table).
 */

export function RowList({ children }: { children: React.ReactNode }) {
  return (
    // Rows carry px 3 and bleed 12px past the content edge (mx -3), so the
    // hover fill reads as an inset pill; the divider is drawn as an inset
    // pseudo-border to stay aligned with the card's content width.
    <Box
      mx="-3"
      css={{
        '& > * + *': { position: 'relative' },
        '& > * + *::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '12px',
          right: '12px',
          borderTop: '1px solid var(--chakra-colors-border-subtle)',
        },
      }}
    >
      {children}
    </Box>
  );
}

interface ListRowProps {
  /** Leading icon, rendered in a 40px muted tile. */
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  /** Middle column (timestamps, counts) — hidden on mobile. */
  meta?: string;
  /** Right-aligned content: a value, badge, or action. */
  right?: React.ReactNode;
  onClick?: () => void;
}

export function ListRow({ icon, title, subtitle, meta, right, onClick }: ListRowProps) {
  return (
    <Flex
      align="center"
      gap="4"
      py="3"
      px="3"
      rounded="lg"
      cursor={onClick ? 'pointer' : undefined}
      onClick={onClick}
      _hover={onClick ? { bg: 'bg.dim' } : undefined}
      transition="background-color 0.15s"
    >
      {icon && (
        // bg.subtle (not bg.dim): the tile must stay visible on the hover fill
        <Flex boxSize="40px" rounded="lg" bg="bg.subtle" color="fg" align="center" justify="center" flexShrink={0}>
          {icon}
        </Flex>
      )}
      <Box flex="1" minW="0">
        <Text fontSize="14px" fontWeight={500} color="fg" truncate>
          {title}
        </Text>
        {subtitle && (
          <Text fontSize="13px" color="fg.muted" truncate>
            {subtitle}
          </Text>
        )}
      </Box>
      {meta && (
        <Text fontSize="13px" color="fg.subtle" flexShrink={0} display={{ base: 'none', md: 'block' }}>
          {meta}
        </Text>
      )}
      {right && <Box flexShrink={0}>{right}</Box>}
    </Flex>
  );
}
