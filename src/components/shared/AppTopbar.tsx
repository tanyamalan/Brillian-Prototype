import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Menu,
  Portal,
  Text,
} from '@chakra-ui/react';
import { ArrowLeftRight, Bell, BookOpen, ChevronDown, LogOut, Menu as MenuIcon, Moon, Search, Settings, Sun, User } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { firmBrand } from '../../config/firmBrand';
import { HEADER_HEIGHT } from './navConfig';
import type { ViewMode } from './navConfig';

interface AppTopbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  /** Mobile-only callback to open the inner panel as a drawer. */
  onOpenMenu?: () => void;
  /** Demo toggle state: dark unified nav vs light two-column nav (advisor only). */
  navDark?: boolean;
  onToggleNavDark?: () => void;
  onSignOut?: () => void;
}

/** Sun/Moon segmented toggle for demoing the light vs dark advisor nav. */
function NavStyleToggle({ navDark, onToggle }: { navDark: boolean; onToggle: () => void }) {
  const segment = (active: boolean) => ({
    'aria-pressed': active,
    h: '7',
    minW: '7',
    px: '0',
    rounded: 'pill',
    bg: active ? 'bg' : 'transparent',
    shadow: active ? 'xs' : undefined,
    color: active ? 'fg' : 'fg.subtle',
    _hover: { color: 'fg' },
  });
  return (
    <HStack gap="0.5" bg="bg.dim" rounded="pill" p="0.5" display={{ base: 'none', md: 'flex' }}>
      <IconButton variant="ghost" aria-label="Light nav" {...segment(!navDark)} onClick={() => navDark && onToggle()}>
        <Sun size={14} />
      </IconButton>
      <IconButton variant="ghost" aria-label="Dark nav" {...segment(navDark)} onClick={() => !navDark && onToggle()}>
        <Moon size={14} />
      </IconButton>
    </HStack>
  );
}

function UserMenu({ viewMode, onViewModeChange, onSignOut }: Pick<AppTopbarProps, 'viewMode' | 'onViewModeChange' | 'onSignOut'>) {
  // Advisor mode: avatar is the firm logo (EJ, yellow); text is name / company / role.
  // Owner mode: avatar is the user; text is name / role.
  const isAdvisor = viewMode === 'advisor';
  const userName = isAdvisor ? 'Sarah K.' : 'John R.';
  const userCompany = isAdvisor ? firmBrand.name : null;
  const userRole = isAdvisor ? 'Advisor' : 'Acme Owner';

  // Advisor → firm logo (image if provided, otherwise initials).
  // Owner → personal initials in a neutral chip.
  const avatarProps = isAdvisor
    ? {
        label: firmBrand.initials,
        src: firmBrand.logoSrc,
        alt: firmBrand.name,
        color: firmBrand.color,
        textColor: firmBrand.textColor,
      }
    : { label: 'JR', color: 'bg.subtle', textColor: 'fg.muted' };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="ghost" h="auto" minH="11" py="1" px="2" gap="2" rounded="md" _hover={{ bg: 'nav.hoverBg' }}>
          <Avatar size="md" {...avatarProps} />
          <Box display={{ base: 'none', md: 'block' }} textAlign="left">
            <Text fontSize="13px" fontWeight={600} color="fg" lineHeight="1.15">
              {userName}
            </Text>
            {userCompany && (
              <Text fontSize="11px" fontWeight={500} color="fg.muted" lineHeight="1.15">
                {userCompany}
              </Text>
            )}
            <Text fontSize="11px" color="fg.subtle" lineHeight="1.15">
              {userRole}
            </Text>
          </Box>
          <Box as={ChevronDown} color="fg.subtle" w="14px" h="14px" display={{ base: 'none', md: 'block' }} />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="240px">
            <Menu.Item value="profile" gap="2" fontSize="13px">
              <User size={14} />
              <Box flex="1">My profile</Box>
            </Menu.Item>
            <Menu.Item value="settings" gap="2" fontSize="13px">
              <Settings size={14} />
              <Box flex="1">Settings</Box>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item
              value="switch-view"
              gap="2"
              fontSize="13px"
              fontWeight={500}
              color="brand.solid"
              onClick={() => onViewModeChange(viewMode === 'owner' ? 'advisor' : 'owner')}
            >
              <ArrowLeftRight size={14} />
              <Box flex="1">
                Switch to {viewMode === 'owner' ? 'Advisor' : 'Owner'} view
              </Box>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item
              value="style-guide"
              gap="2"
              fontSize="13px"
              onClick={() => { window.location.href = '/style-guide.html'; }}
            >
              <BookOpen size={14} />
              <Box flex="1">Open style guide</Box>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item value="signout" gap="2" fontSize="13px" color="brl.danger" onClick={onSignOut}>
              <LogOut size={14} />
              <Box flex="1">Sign out</Box>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export function AppTopbar({ viewMode, onViewModeChange, onOpenMenu, navDark, onToggleNavDark, onSignOut }: AppTopbarProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      h={{ base: 'auto', md: HEADER_HEIGHT }}
      minH={{ base: HEADER_HEIGHT, md: HEADER_HEIGHT }}
      px={{ base: '4', md: '8' }}
      py={{ base: '2', md: '0' }}
      borderBottomWidth="1px"
      borderColor="border.subtle"
      bg="bg"
      gap="2"
      flexShrink={0}
    >
      <HStack gap={{ base: '2', md: '4' }} flex="1">
        {/* Mobile-only hamburger to open the inner panel drawer (advisor only) */}
        {onOpenMenu && (
          <IconButton
            variant="ghost"
            color="fg.muted"
            aria-label="Open navigation"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpenMenu}
          >
            <MenuIcon size={22} />
          </IconButton>
        )}
        <InputGroup
          flex="1"
          maxW={{ base: 'full', md: '320px' }}
          startElement={<Search size={16} color="var(--chakra-colors-fg-subtle)" />}
        >
          <Input placeholder="Search" bg="bg.dim" />
        </InputGroup>
      </HStack>

      <HStack gap="4">
        {onToggleNavDark && navDark !== undefined && (
          <NavStyleToggle navDark={navDark} onToggle={onToggleNavDark} />
        )}
        <Box position="relative">
          <IconButton variant="ghost" aria-label="Notifications" color="fg.muted">
            <Bell size={22} />
          </IconButton>
          <Badge
            position="absolute"
            top="1"
            right="1"
            minW="4"
            h="4"
            rounded="full"
            bg="brl.danger"
            color="fg.onBrand"
            fontSize="9px"
            fontWeight={700}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="2px solid"
            borderColor="bg"
            px="0"
          >
            6
          </Badge>
        </Box>
        <UserMenu viewMode={viewMode} onViewModeChange={onViewModeChange} onSignOut={onSignOut} />
      </HStack>
    </Flex>
  );
}
