import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { getOuterItems, HEADER_HEIGHT, settingsItem } from './navConfig';
import type { NavItem, ViewMode } from './navConfig';

interface OuterRailProps {
  viewMode: ViewMode;
  activeId: string;
  onSelect: (id: string) => void;
  /** Dark unified nav (advisor demo toggle) — rail + panel share one forest surface. */
  dark?: boolean;
}

function RailItem({
  item,
  active,
  dark,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  dark: boolean;
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
      rounded="lg"
      bg="transparent"
      color={
        active
          ? (dark ? 'navDark.fg' : 'nav.activeFg')
          : (dark ? 'navDark.muted' : 'fg.muted')
      }
      fontWeight={active ? 600 : 500}
      // Pill-style hover/active highlight wraps just the icon, not the label.
      _hover={{
        '& .rail-icon': {
          bg: active
            ? (dark ? 'navDark.activeBg' : 'nav.activeBg')
            : (dark ? 'navDark.hoverBg' : 'nav.hoverBg'),
        },
        color: active ? (dark ? 'navDark.fg' : 'nav.activeFg') : (dark ? 'navDark.fg' : 'fg'),
      }}
      onClick={onClick}
    >
      <Box
        className="rail-icon"
        boxSize="40px"
        rounded="lg"
        bg={active ? (dark ? 'navDark.activeBg' : 'nav.activeBg') : 'transparent'}
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

export function OuterRail({ viewMode, activeId, onSelect, dark = false }: OuterRailProps) {
  const items = getOuterItems(viewMode);

  return (
    <Box
      as="nav"
      w={{ base: 'full', md: 'shell.rail' }}
      bg={dark ? 'navDark.bg' : 'bg'}
      // Subtle forest gradient; identical on rail + panel (both full-height),
      // so the unified surface reads as one piece.
      backgroundImage={dark ? 'linear-gradient(180deg, var(--chakra-colors-forest-900), var(--chakra-colors-forest-800))' : undefined}
      borderRightWidth={{ base: 0, md: dark ? 0 : '1px' }}
      borderTopWidth={{ base: '1px', md: 0 }}
      borderColor={dark ? 'navDark.border' : 'border.subtle'}
      flexShrink={0}
      display="flex"
      flexDir={{ base: 'row', md: 'column' }}
      alignItems="center"
      py={{ base: '2', md: '0' }}
      px={{ base: '2', md: '0' }}
      gap="0"
      position={{ base: 'fixed', md: 'sticky' }}
      top={{ base: 'auto', md: 0 }}
      h={{ base: 'auto', md: '100vh' }}
      bottom={{ base: 0, md: 'auto' }}
      left={{ base: 0, md: 'auto' }}
      zIndex={{ base: 100, md: 'auto' }}
      justifyContent={{ base: 'space-around', md: 'flex-start' }}
    >
      {/* Brand logo — header band, lines up with the topbar. On dark, the
          lime tile pops against the forest surface (accent takes dark marks). */}
      <Flex
        display={{ base: 'none', md: 'flex' }}
        h={HEADER_HEIGHT}
        w="full"
        align="center"
        justify="center"
        flexShrink={0}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSize="36px"
          rounded="lg"
          bg={dark ? 'accent.solid' : 'brand.solid'}
        >
          <Image
            src={dark ? '/brillian-logo.svg' : '/brillian-logo-white.svg'}
            alt="Brillian"
            h="18px"
            w="auto"
          />
        </Box>
      </Flex>

      {/* Outer items */}
      <Stack
        gap="1"
        flexDir={{ base: 'row', md: 'column' }}
        flex={{ base: 1, md: 'initial' }}
        justifyContent={{ base: 'space-around', md: 'flex-start' }}
        w={{ base: 'full', md: 'full' }}
        align="stretch"
        pt={{ base: '0', md: '1' }}
      >
        {items.map(item => (
          <RailItem
            key={item.id}
            item={item}
            active={activeId === item.id}
            dark={dark}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </Stack>

      {/* Spacer + Settings (desktop only) */}
      <Box flex="1" display={{ base: 'none', md: 'block' }} />
      <Box display={{ base: 'none', md: 'block' }} w="full" pb="4">
        <RailItem
          item={settingsItem}
          active={activeId === settingsItem.id}
          dark={dark}
          onClick={() => onSelect(settingsItem.id)}
        />
      </Box>
    </Box>
  );
}
