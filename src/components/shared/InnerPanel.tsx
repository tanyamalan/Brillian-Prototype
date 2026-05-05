import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  Menu,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { clients, getClient } from '../Advisor/clientsData';
import {
  advisorActivitySubNav,
  advisorClientsSubNav,
  advisorHomeSubNav,
  companyLenses,
  documentsSubNav,
  reportsSubNav,
  settingsSubNav,
} from './navConfig';
import type { NavItem, ViewMode } from './navConfig';

export interface InnerPanelProps {
  viewMode: ViewMode;
  outerSection: string; // 'home' | 'clients' | 'documents' | 'reports' | 'settings'
  activeItemId: string;
  onSelectItem: (id: string) => void;
  selectedClientId: string | null;
  onSelectClient: (id: string | null) => void;
}

const ownerCompany = {
  name: 'Acme Services LLC',
  initials: 'A',
  logoColor: 'brand.500',
};

function PanelHeader({ children }: { children: React.ReactNode }) {
  return (
    <Box pb="2" mb="2" borderBottomWidth="1px" borderColor="border">
      {children}
    </Box>
  );
}

function CompanyChip({ name, initials, color }: { name: string; initials: string; color: string }) {
  return (
    <HStack gap="2" px="2" py="2">
      <Avatar size="md" color={color} label={initials} />
      <Text fontSize="14px" fontWeight={600} color="fg" truncate>
        {name}
      </Text>
    </HStack>
  );
}

function ClientSwitcher({
  selectedClientId,
  onSelectClient,
}: {
  selectedClientId: string | null;
  onSelectClient: (id: string | null) => void;
}) {
  const selected = selectedClientId ? getClient(selectedClientId) : null;
  const label = selected ? selected.name : 'All clients';
  const initials = selected?.initials ?? '·';
  const color = selected?.logoColor ?? 'var(--chakra-colors-bg-subtle)';
  const textColor = selected ? 'white' : 'var(--chakra-colors-fg-muted)';

  const [query, setQuery] = useState('');
  const filteredClients = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Menu.Root onOpenChange={(e) => { if (!e.open) setQuery(''); }}>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          w="full"
          h="auto"
          px="2"
          py="2"
          gap="2"
          rounded="sm"
          justifyContent="flex-start"
          _hover={{ bg: 'bg.dim' }}
        >
          <Avatar size="md" color={color} textColor={textColor} label={initials} />
          <Text fontSize="14px" fontWeight={600} color="fg" flex="1" textAlign="left" truncate>
            {label}
          </Text>
          <Box as={ChevronDown} color="fg.subtle" w="14px" h="14px" />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="320px" maxH="480px" display="flex" flexDirection="column" p="0">
            {/* Sticky search bar — stop propagation so typing doesn't trigger menu nav */}
            <Box
              p="2"
              borderBottomWidth="1px"
              borderColor="border"
              onKeyDown={e => e.stopPropagation()}
              onClick={e => e.stopPropagation()}
            >
              <InputGroup
                startElement={<Search size={14} color="var(--chakra-colors-fg-subtle)" />}
              >
                <Input
                  placeholder="Search clients"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  size="sm"
                  bg="bg.dim"
                  borderColor="border"
                  autoFocus
                />
              </InputGroup>
            </Box>

            {/* Scrollable result list */}
            <Box flex="1" overflowY="auto" py="1">
              <Menu.Item
                value="__all-clients"
                onClick={() => { onSelectClient(null); setQuery(''); }}
                fontSize="13px"
                fontWeight={500}
                color={!selected ? 'brand.solid' : 'fg'}
                gap="2"
              >
                <Box flex="1">All clients</Box>
                {!selected && <Check size={14} color="var(--chakra-colors-brand-solid)" />}
              </Menu.Item>
              <Menu.Separator />
              {filteredClients.length === 0 ? (
                <Box px="3" py="4" textAlign="center">
                  <Text fontSize="12px" color="fg.subtle">
                    No clients match &ldquo;{query}&rdquo;
                  </Text>
                </Box>
              ) : (
                filteredClients.map(c => (
              <Menu.Item
                key={c.id}
                value={c.id}
                onClick={() => { onSelectClient(c.id); setQuery(''); }}
                gap="2"
                fontSize="13px"
              >
                <Avatar size="sm" color={c.logoColor} label={c.initials} />
                <Box flex="1">
                  <Text fontSize="13px" fontWeight={500} color="fg" lineHeight="1.2">
                    {c.name}
                  </Text>
                  <Text fontSize="11px" color="fg.subtle" lineHeight="1.2">
                    {c.industry}
                  </Text>
                </Box>
                {selected?.id === c.id && <Check size={14} color="var(--chakra-colors-brand-solid)" />}
              </Menu.Item>
                ))
              )}
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

function PanelItem({
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
      w="full"
      h="11"
      px="2"
      gap="2"
      justifyContent="flex-start"
      rounded="sm"
      bg={active ? 'bg.dim' : 'transparent'}
      color={active ? 'brand.fg' : 'fg.muted'}
      fontWeight={active ? 600 : 500}
      fontSize="14px"
      _hover={{ bg: 'bg.dim', color: 'fg' }}
      onClick={onClick}
    >
      <Icon size={18} />
      <Text>{item.label}</Text>
    </Button>
  );
}

interface PanelConfig {
  header: React.ReactNode;
  items: NavItem[];
}

function getPanelConfig({
  viewMode,
  outerSection,
  selectedClientId,
  onSelectClient,
}: Pick<InnerPanelProps, 'viewMode' | 'outerSection' | 'selectedClientId' | 'onSelectClient'>): PanelConfig {
  // Owner view
  if (viewMode === 'owner') {
    if (outerSection === 'home') {
      return {
        header: <CompanyChip name={ownerCompany.name} initials={ownerCompany.initials} color={ownerCompany.logoColor} />,
        items: companyLenses,
      };
    }
    if (outerSection === 'documents') {
      return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600}>Documents</Text>, items: documentsSubNav };
    }
    if (outerSection === 'reports') {
      return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600}>Reports</Text>, items: reportsSubNav };
    }
    return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600}>Settings</Text>, items: settingsSubNav };
  }

  // Advisor view
  if (outerSection === 'home') {
    return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600}>Home</Text>, items: advisorHomeSubNav };
  }
  if (outerSection === 'clients') {
    if (selectedClientId) {
      return {
        header: <ClientSwitcher selectedClientId={selectedClientId} onSelectClient={onSelectClient} />,
        items: companyLenses.filter(l => l.id !== 'onboarding'),
      };
    }
    return {
      header: <ClientSwitcher selectedClientId={null} onSelectClient={onSelectClient} />,
      items: advisorClientsSubNav,
    };
  }
  if (outerSection === 'activity') {
    return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600}>Activity</Text>, items: advisorActivitySubNav };
  }
  if (outerSection === 'documents') {
    return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600}>Documents</Text>, items: documentsSubNav };
  }
  if (outerSection === 'reports') {
    return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600}>Reports</Text>, items: reportsSubNav };
  }
  return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600}>Settings</Text>, items: settingsSubNav };
}

/**
 * Renders just the panel header + items list. Used standalone on desktop and
 * inside a mobile Drawer (see AppShell).
 */
export function InnerPanelBody({
  viewMode,
  outerSection,
  activeItemId,
  onSelectItem,
  selectedClientId,
  onSelectClient,
}: InnerPanelProps) {
  const { header, items } = getPanelConfig({ viewMode, outerSection, selectedClientId, onSelectClient });

  return (
    <Box w="full" p="2" display="flex" flexDir="column" overflowY="auto" flex="1">
      <PanelHeader>{header}</PanelHeader>
      <Stack gap="0.5">
        {items.map(item => (
          <PanelItem
            key={item.id}
            item={item}
            active={activeItemId === item.id}
            onClick={() => onSelectItem(item.id)}
          />
        ))}
      </Stack>
    </Box>
  );
}

export function InnerPanel(props: InnerPanelProps) {
  return (
    <Box
      as="aside"
      w={{ base: 'full', md: '220px' }}
      bg="bg"
      borderRightWidth={{ base: 0, md: '1px' }}
      borderColor="border"
      flexShrink={0}
      display={{ base: 'none', md: 'flex' }}
      flexDir="column"
    >
      <InnerPanelBody {...props} />
    </Box>
  );
}

