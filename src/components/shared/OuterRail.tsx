import { Box, Button, Circle, Stack, Text } from '@chakra-ui/react';
import { getOuterItems, settingsItem } from './navConfig';
import type { NavItem, ViewMode } from './navConfig';

interface OuterRailProps {
  viewMode: ViewMode;
  activeId: string;
  onSelect: (id: string) => void;
}

function RailItem({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}) {
  const { Icon } = item;
  return (
    <Button
      variant="ghost"
      h="auto"
      px="0"
      py="1"
      w={{ base: 'auto', md: 'full' }}
      minW={{ base: '14', md: 'auto' }}
      flexDir="column"
      gap="1"
      rounded="md"
      bg="transparent"
      color={active ? 'fg' : 'fg.muted'}
      fontWeight={active ? 600 : 500}
      // Pill-style hover/active highlight wraps just the icon, not the label.
      _hover={{
        '& .rail-icon': { bg: 'bg.subtle' },
        color: 'fg',
      }}
      onClick={onClick}
    >
      <Box
        className="rail-icon"
        boxSize="40px"
        rounded="md"
        bg={active ? 'border' : 'transparent'}
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="background-color 0.15s ease"
      >
        <Icon size={20} strokeWidth={active ? 2.25 : 2} />
      </Box>
      <Text fontSize="11px" lineHeight="1.1">
        {item.label}
      </Text>
    </Button>
  );
}

export function OuterRail({ viewMode, activeId, onSelect }: OuterRailProps) {
  const items = getOuterItems(viewMode);

  return (
    <Box
      as="nav"
      w={{ base: 'full', md: '72px' }}
      bg="bg"
      borderRightWidth={{ base: 0, md: '1px' }}
      borderTopWidth={{ base: '1px', md: 0 }}
      borderColor="border"
      flexShrink={0}
      display="flex"
      flexDir={{ base: 'row', md: 'column' }}
      alignItems="center"
      py={{ base: '2', md: '4' }}
      px={{ base: '2', md: '0' }}
      gap={{ base: '0', md: '1' }}
      position={{ base: 'fixed', md: 'static' }}
      bottom={{ base: 0, md: 'auto' }}
      left={{ base: 0, md: 'auto' }}
      zIndex={{ base: 100, md: 'auto' }}
      justifyContent={{ base: 'space-around', md: 'flex-start' }}
    >
      {/* Brand logo (desktop only) */}
      <Circle
        size="36px"
        bg="brand.solid"
        color="white"
        rounded="md"
        fontWeight={700}
        fontSize="16px"
        mb="2"
        display={{ base: 'none', md: 'flex' }}
      >
        B
      </Circle>

      {/* Outer items */}
      <Stack
        gap="1"
        flexDir={{ base: 'row', md: 'column' }}
        flex={{ base: 1, md: 'initial' }}
        justifyContent={{ base: 'space-around', md: 'flex-start' }}
        w={{ base: 'full', md: 'full' }}
        align="stretch"
      >
        {items.map(item => (
          <RailItem
            key={item.id}
            item={item}
            active={activeId === item.id}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </Stack>

      {/* Spacer + Settings (desktop only) */}
      <Box flex="1" display={{ base: 'none', md: 'block' }} />
      <Box display={{ base: 'none', md: 'block' }} w="full">
        <RailItem
          item={settingsItem}
          active={activeId === settingsItem.id}
          onClick={() => onSelect(settingsItem.id)}
        />
      </Box>
    </Box>
  );
}
