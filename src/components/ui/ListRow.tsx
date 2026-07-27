import { Box, Flex, IconButton, Menu, Portal, Text } from '@chakra-ui/react';
import { MoreHorizontal } from 'lucide-react';

/**
 * RowList + ListRow — rows *inside one card*, separated by hairline dividers
 * (border.subtle) instead of gaps. Use when the rows are one dataset read
 * together (transactions, opportunities, line items). For independent,
 * clickable destinations use the other list pattern: separate sm cards in a
 * Stack at gap 2 (see the layout guide's content-composition table).
 */

export function RowList({ children }: { children: React.ReactNode }) {
  return (
    // Rows span the card's content width exactly — the hover fill and the
    // dividers both line up with the card header. Row content is padded
    // inside the fill (px 3 on ListRow). The divider is a pseudo-element,
    // not a border, so the row's hover radius can't curve it.
    <Box
      css={{
        '& > * + *': { position: 'relative' },
        '& > * + *::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'var(--chakra-colors-border-subtle)',
        },
      }}
    >
      {children}
    </Box>
  );
}

export type RowActionItem = { label: string; danger?: boolean; onSelect?: () => void } | 'separator';

/**
 * RowActions — the ⋯ overflow menu for a ListRow's right slot. Click is
 * isolated from the row, and the menu follows the overlay recipe (radius.card,
 * shadow.raised, border.subtle separators).
 */
export function RowActions({ items, ariaLabel = 'Row actions' }: { items: RowActionItem[]; ariaLabel?: string }) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          variant="ghost"
          size="xs"
          aria-label={ariaLabel}
          color="fg.subtle"
          rounded="control"
          onClick={e => e.stopPropagation()}
        >
          <MoreHorizontal size={16} />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="180px">
            {items.map((item, i) =>
              item === 'separator' ? (
                <Menu.Separator key={`sep-${i}`} />
              ) : (
                <Menu.Item
                  key={item.label}
                  value={item.label}
                  fontSize="13px"
                  color={item.danger ? 'brl.danger' : undefined}
                  onClick={e => {
                    e.stopPropagation();
                    item.onSelect?.();
                  }}
                >
                  {item.label}
                </Menu.Item>
              )
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
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
