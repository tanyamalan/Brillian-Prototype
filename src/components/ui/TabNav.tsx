import { Box, Button, HStack } from '@chakra-ui/react';

export interface TabItem {
  id: string;
  label: string;
}

interface TabNavProps {
  tabs: TabItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * TabNav — in-page section switcher. Tabs sit on radii.control (4px), matching
 * buttons and inputs, in a single row that scrolls horizontally when it
 * overflows (e.g. on mobile), with the scrollbar hidden so it stays clean.
 */
export function TabNav({ tabs, activeId, onSelect }: TabNavProps) {
  return (
    <Box
      overflowX="auto"
      mx={{ base: '-4', md: '0' }}
      px={{ base: '4', md: '0' }}
      css={{
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <HStack gap="1" flexWrap="nowrap" w="max-content">
        {tabs.map(t => {
          const active = t.id === activeId;
          return (
            <Button
              key={t.id}
              onClick={() => onSelect(t.id)}
              flexShrink={0}
              h="9"
              px="4"
              rounded="control"
              fontSize="13px"
              fontWeight={active ? 600 : 500}
              bg={active ? 'brand.solid' : 'transparent'}
              color={active ? 'fg.onBrand' : 'fg.muted'}
              _hover={active ? { bg: 'brand.emphasized' } : { bg: 'bg.subtle', color: 'fg' }}
            >
              {t.label}
            </Button>
          );
        })}
      </HStack>
    </Box>
  );
}
