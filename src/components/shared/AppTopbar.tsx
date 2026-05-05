import {
  Avatar,
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
import { ArrowLeftRight, Bell, BookOpen, ChevronDown, LogOut, Menu as MenuIcon, Search, Settings, User } from 'lucide-react';
import type { ViewMode } from './navConfig';

interface AppTopbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  /** Mobile-only callback to open the inner panel as a drawer. */
  onOpenMenu?: () => void;
}

function UserMenu({ viewMode, onViewModeChange }: Pick<AppTopbarProps, 'viewMode' | 'onViewModeChange'>) {
  // Advisor mode: avatar is the firm logo (EJ, yellow); text is name / company / role.
  // Owner mode: avatar is the user; text is name / role.
  const isAdvisor = viewMode === 'advisor';
  const userName = isAdvisor ? 'Sarah K.' : 'John R.';
  const userCompany = isAdvisor ? 'Edward Jones' : null;
  const userRole = isAdvisor ? 'Advisor' : 'Acme Owner';
  const avatarInitials = isAdvisor ? 'EJ' : 'JR';
  const avatarBg = isAdvisor ? 'brl.warning' : 'bg.subtle';
  const avatarFg = isAdvisor ? 'white' : 'fg.muted';

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="ghost" h="auto" minH="11" py="1" px="2" gap="2" rounded="sm" _hover={{ bg: 'bg.dim' }}>
          <Avatar.Root size="sm" bg={avatarBg}>
            <Avatar.Fallback color={avatarFg} fontWeight={700} fontSize="14px">
              {avatarInitials}
            </Avatar.Fallback>
          </Avatar.Root>
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
            <Menu.Item value="signout" gap="2" fontSize="13px" color="brl.danger">
              <LogOut size={14} />
              <Box flex="1">Sign out</Box>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export function AppTopbar({ viewMode, onViewModeChange, onOpenMenu }: AppTopbarProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      px={{ base: '4', md: '8' }}
      py="2"
      borderBottomWidth="1px"
      borderColor="border"
      bg="bg"
      gap="2"
      flexShrink={0}
    >
      <HStack gap={{ base: '2', md: '4' }} flex="1">
        {/* Mobile-only hamburger to open the inner panel drawer */}
        <IconButton
          variant="ghost"
          color="fg.muted"
          aria-label="Open navigation"
          display={{ base: 'inline-flex', md: 'none' }}
          onClick={onOpenMenu}
        >
          <MenuIcon size={22} />
        </IconButton>
        <InputGroup
          flex="1"
          maxW={{ base: 'full', md: '320px' }}
          startElement={<Search size={16} color="var(--chakra-colors-fg-subtle)" />}
        >
          <Input placeholder="Search" bg="bg.dim" borderColor="border" />
        </InputGroup>
      </HStack>

      <HStack gap="4">
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
        <UserMenu viewMode={viewMode} onViewModeChange={onViewModeChange} />
      </HStack>
    </Flex>
  );
}
