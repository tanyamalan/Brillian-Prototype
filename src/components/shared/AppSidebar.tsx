import { useState } from 'react';
import { Box, Button, Circle, Collapsible, HStack, Stack, Text } from '@chakra-ui/react';
import { ChevronDown } from 'lucide-react';
import { advisorNavItems, ownerNavItems, settingsItem } from './navConfig';
import type { NavItem } from './navConfig';
import type { ViewMode } from '../../App';

interface AppSidebarProps {
  viewMode: ViewMode;
  activeNav: string;
  onNavChange?: (nav: string) => void;
}

function NavItemButton({
  item,
  activeNav,
  expandedId,
  onNavChange,
  onToggle,
}: {
  item: NavItem;
  activeNav: string;
  expandedId: string | null;
  onNavChange?: (nav: string) => void;
  onToggle: (id: string) => void;
}) {
  const isActive = activeNav === item.id || item.children?.some(c => activeNav === c.id);
  const isExpanded = expandedId === item.id;
  const hasChildren = !!item.children?.length;
  const { Icon } = item;

  return (
    <Box>
      <Button
        variant="ghost"
        w="full"
        px="2"
        justifyContent="flex-start"
        rounded="sm"
        fontWeight={isActive ? 600 : 500}
        color={isActive ? 'brand.fg' : 'fg.muted'}
        bg={isActive ? 'bg.dim' : 'transparent'}
        _hover={{ bg: 'bg.dim', color: 'fg' }}
        // Responsive layout: desktop row / mobile bottom-bar column
        flexDir={{ base: 'column', md: 'row' }}
        h={{ base: 'auto', md: '11' }}
        py={{ base: '1.5', md: '0' }}
        fontSize={{ base: '9px', md: 'sm' }}
        gap={{ base: '0.5', md: '2' }}
        minW={{ base: '12', md: 'auto' }}
        onClick={() => {
          if (hasChildren) onToggle(item.id);
          onNavChange?.(item.id);
        }}
      >
        <Icon size={20} />
        <Text flex="1" textAlign={{ base: 'center', md: 'left' }} truncate>
          {item.label}
        </Text>
        {hasChildren && (
          <Box
            as={ChevronDown}
            display={{ base: 'none', md: 'block' }}
            transition="transform 0.2s"
            transform={isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}
            color="fg.subtle"
          />
        )}
      </Button>

      {hasChildren && (
        <Collapsible.Root open={isExpanded} display={{ base: 'none', md: 'block' }}>
          <Collapsible.Content>
            <Stack pl="9" gap="0.5" mb="1" mt="0.5">
              {item.children!.map(child => {
                const childActive = activeNav === child.id;
                return (
                  <Button
                    key={child.id}
                    variant="ghost"
                    h="9"
                    px="2"
                    w="full"
                    justifyContent="flex-start"
                    rounded="sm"
                    fontSize="13px"
                    fontWeight={childActive ? 600 : 500}
                    color={childActive ? 'brand.fg' : 'fg.muted'}
                    bg="transparent"
                    _hover={{ bg: 'bg.dim', color: 'fg' }}
                    onClick={() => onNavChange?.(child.id)}
                  >
                    {child.label}
                  </Button>
                );
              })}
            </Stack>
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </Box>
  );
}

export function AppSidebar({ viewMode, activeNav, onNavChange }: AppSidebarProps) {
  const navItems = viewMode === 'advisor' ? advisorNavItems : ownerNavItems;
  const brandSublabel = viewMode === 'advisor' ? 'Advisor' : null;
  const [expandedId, setExpandedId] = useState<string | null>('dashboard');
  const handleToggle = (id: string) =>
    setExpandedId(prev => (prev === id ? null : id));

  return (
    <Box
      as="nav"
      w={{ base: 'full', md: '220px' }}
      bg="bg"
      borderRightWidth={{ base: 0, md: '1px' }}
      borderTopWidth={{ base: '1px', md: 0 }}
      borderColor="border"
      p={{ base: '1', md: '2' }}
      flexShrink={0}
      display="flex"
      flexDir={{ base: 'row', md: 'column' }}
      position={{ base: 'fixed', md: 'static' }}
      bottom={{ base: 0, md: 'auto' }}
      left={{ base: 0, md: 'auto' }}
      zIndex={{ base: 100, md: 'auto' }}
      justifyContent={{ base: 'space-around', md: 'flex-start' }}
      overflowY={{ base: 'hidden', md: 'auto' }}
      overflowX={{ base: 'auto', md: 'hidden' }}
    >
      {/* Brand header (desktop only) */}
      <HStack gap="2" p="2" mb="4" minH="11" display={{ base: 'none', md: 'flex' }}>
        <Circle size="32px" bg="brand.solid" color="white" rounded="md" fontWeight={700} fontSize="15px">
          B
        </Circle>
        <Box>
          <Text fontSize="md" fontWeight={600} color="fg" lineHeight="1.1">
            Brillian
          </Text>
          {brandSublabel && (
            <Text fontSize="11px" color="fg.subtle" lineHeight="1.1">
              {brandSublabel}
            </Text>
          )}
        </Box>
      </HStack>

      {/* Primary nav */}
      <Stack
        gap="0.5"
        flexDir={{ base: 'row', md: 'column' }}
        flex={{ base: 1, md: 'initial' }}
        justifyContent={{ base: 'space-around', md: 'flex-start' }}
        w="full"
      >
        {navItems.map(item => (
          <NavItemButton
            key={item.id}
            item={item}
            activeNav={activeNav}
            expandedId={expandedId}
            onNavChange={onNavChange}
            onToggle={handleToggle}
          />
        ))}
      </Stack>

      {/* Spacer pushes Settings to the bottom on desktop */}
      <Box flex="1" display={{ base: 'none', md: 'block' }} />

      {/* Settings (desktop only) */}
      <Box display={{ base: 'none', md: 'block' }}>
        <NavItemButton
          item={settingsItem}
          activeNav={activeNav}
          expandedId={expandedId}
          onNavChange={onNavChange}
          onToggle={handleToggle}
        />
      </Box>
    </Box>
  );
}
