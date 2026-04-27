import {
  Avatar,
  Badge,
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Menu,
  Portal,
  Text,
} from '@chakra-ui/react';
import { ArrowLeftRight, Bell, Check, ChevronDown, LogOut, Search, Settings, User } from 'lucide-react';
import { clients, getClient } from '../Advisor/clientsData';
import type { ViewMode } from '../../App';

interface AppTopbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedClientId: string | null;
  onSelectClient: (clientId: string) => void;
}

// Owner view: fixed company. In advisor view this is replaced by a client switcher.
const ownerCompany = {
  name: 'Acme Services LLC',
  initials: 'A',
  logoColor: '#4285F4',
};

function CompanyChip({
  viewMode,
  selectedClientId,
  onSelectClient,
}: Pick<AppTopbarProps, 'viewMode' | 'selectedClientId' | 'onSelectClient'>) {
  // Owner mode: fixed chip, no dropdown
  if (viewMode === 'owner') {
    return (
      <HStack gap="2" pr="4" borderRightWidth="1px" borderColor="border">
        <Circle size="32px" bg={ownerCompany.logoColor} color="white" fontWeight={700} fontSize="14px" rounded="md">
          {ownerCompany.initials}
        </Circle>
        <Text fontSize="14px" fontWeight={600} color="fg" display={{ base: 'none', md: 'inline' }} truncate>
          {ownerCompany.name}
        </Text>
      </HStack>
    );
  }

  // Advisor mode: client switcher menu
  const selectedClient = selectedClientId ? getClient(selectedClientId) : null;
  const triggerLabel = selectedClient ? selectedClient.name : 'All clients';
  const triggerInitials = selectedClient?.initials ?? '·';
  const triggerColor = selectedClient?.logoColor ?? 'var(--chakra-colors-bg-subtle)';
  const triggerTextColor = selectedClient ? 'white' : 'var(--chakra-colors-fg-muted)';

  return (
    <Box pr="4" borderRightWidth="1px" borderColor="border">
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            variant="ghost"
            h="11"
            px="2"
            gap="2"
            rounded="sm"
            _hover={{ bg: 'bg.dim' }}
          >
            <Circle size="32px" bg={triggerColor} color={triggerTextColor} fontWeight={700} fontSize="14px" rounded="md">
              {triggerInitials}
            </Circle>
            <Text fontSize="14px" fontWeight={600} color="fg" display={{ base: 'none', md: 'inline' }} truncate>
              {triggerLabel}
            </Text>
            <Box as={ChevronDown} color="fg.subtle" w="14px" h="14px" />
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content minW="280px" maxH="420px" overflowY="auto">
              <Menu.Item
                value="__all-clients"
                onClick={() => onSelectClient('')}
                fontSize="13px"
                fontWeight={500}
                color={!selectedClient ? 'brand.solid' : 'fg'}
                gap="2"
              >
                <Box flex="1">All clients</Box>
                {!selectedClient && <Check size={14} color="var(--chakra-colors-brand-solid)" />}
              </Menu.Item>
              <Menu.Separator />
              {clients.map(client => (
                <Menu.Item
                  key={client.id}
                  value={client.id}
                  onClick={() => onSelectClient(client.id)}
                  gap="2"
                  fontSize="13px"
                >
                  <Circle size="24px" bg={client.logoColor} color="white" fontWeight={700} fontSize="11px" rounded="sm">
                    {client.initials}
                  </Circle>
                  <Box flex="1">
                    <Text fontSize="13px" fontWeight={500} color="fg" lineHeight="1.2">
                      {client.name}
                    </Text>
                    <Text fontSize="11px" color="fg.subtle" lineHeight="1.2">
                      {client.industry}
                    </Text>
                  </Box>
                  {selectedClient?.id === client.id && (
                    <Check size={14} color="var(--chakra-colors-brand-solid)" />
                  )}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  );
}

function UserMenu({ viewMode, onViewModeChange }: Pick<AppTopbarProps, 'viewMode' | 'onViewModeChange'>) {
  const userName = viewMode === 'advisor' ? 'Sarah K.' : 'John R.';
  const userRole = viewMode === 'advisor' ? 'Brillian Advisor' : 'Acme Owner';
  const userInitials = viewMode === 'advisor' ? 'SK' : 'JR';

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="ghost" h="11" px="2" gap="2" rounded="sm" _hover={{ bg: 'bg.dim' }}>
          <Avatar.Root size="sm" bg="bg.subtle">
            <Avatar.Fallback color="fg.muted" fontWeight={600} fontSize="14px">
              {userInitials}
            </Avatar.Fallback>
          </Avatar.Root>
          <Box display={{ base: 'none', md: 'block' }} textAlign="left">
            <Text fontSize="13px" fontWeight={600} color="fg" lineHeight="1.2">
              {userName}
            </Text>
            <Text fontSize="11px" color="fg.subtle" lineHeight="1.2">
              {userRole}
            </Text>
          </Box>
          <Box as={ChevronDown} color="fg.subtle" w="14px" h="14px" />
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

export function AppTopbar({ viewMode, onViewModeChange, selectedClientId, onSelectClient }: AppTopbarProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      px={{ base: '4', md: '8' }}
      py="2"
      borderBottomWidth="1px"
      borderColor="border"
      bg="bg"
      gap="4"
      flexShrink={0}
    >
      <HStack gap="4" flex="1">
        <CompanyChip
          viewMode={viewMode}
          selectedClientId={selectedClientId}
          onSelectClient={onSelectClient}
        />
        <InputGroup
          flex="1"
          maxW="320px"
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
            color="white"
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
