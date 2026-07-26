import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Flex,
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
import { CoBrand } from '../ui/CoBrand';
import { navDarkGradient } from '../../theme/tokens';
import { clients, getClient } from '../Advisor/clientsData';
import {
  advisorActivitySubNav,
  advisorClientsSubNav,
  advisorHomeSubNav,
  companyLenses,
  documentsSubNav,
  HEADER_HEIGHT,
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
  /** Dark unified nav (advisor demo toggle) — panel continues the rail's forest surface. */
  dark?: boolean;
}

const ownerCompany = {
  name: 'Acme Inc',
  initials: 'JD',
  logoColor: 'citron.300',
};

function PanelHeader({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      h={HEADER_HEIGHT}
      align="center"
      px="2"
      flexShrink={0}
    >
      <Box w="full" minW="0">
        {children}
      </Box>
    </Flex>
  );
}

function CompanyChip({ name, initials, color }: { name: string; initials: string; color: string }) {
  return (
    <HStack gap="2" px="2" py="2" w="full" cursor="pointer" rounded="control" _hover={{ bg: 'nav.hoverBg' }}>
      <Avatar size="md" color={color} textColor="fg" label={initials} />
      <Text fontSize="14px" fontWeight={600} color="fg" flex="1" truncate>
        {name}
      </Text>
      <Box as={ChevronDown} color="fg.subtle" w="16px" h="16px" flexShrink={0} />
    </HStack>
  );
}

function ClientSwitcher({
  selectedClientId,
  onSelectClient,
  dark,
}: {
  selectedClientId: string | null;
  onSelectClient: (id: string | null) => void;
  dark: boolean;
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
          rounded="md"
          justifyContent="flex-start"
          _hover={{ bg: dark ? 'navDark.hoverBg' : 'nav.hoverBg' }}
        >
          <Avatar size="md" color={color} textColor={textColor} label={initials} />
          <Text fontSize="14px" fontWeight={600} color={dark ? 'navDark.fg' : 'fg'} flex="1" textAlign="left" truncate>
            {label}
          </Text>
          <Box as={ChevronDown} color={dark ? 'navDark.muted' : 'fg.subtle'} w="14px" h="14px" />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="320px" maxH="480px" display="flex" flexDirection="column" p="0">
            {/* Sticky search bar — stop propagation so typing doesn't trigger menu nav */}
            <Box
              p="2"
              borderBottomWidth="1px"
              borderColor="border.subtle"
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

// Light mode: forest tints on white. Dark mode (unified nav): the navDark
// scheme — active = Forest 700 pill, rest = Ink 300 on Forest 900.
function PanelItem({
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
      w="full"
      h="11"
      px="2"
      gap="2"
      justifyContent="flex-start"
      rounded="md"
      bg={active ? (dark ? 'navDark.activeBg' : 'nav.activeBg') : 'transparent'}
      color={
        active
          ? (dark ? 'navDark.fg' : 'nav.activeFg')
          : (dark ? 'navDark.muted' : 'fg.muted')
      }
      fontWeight={active ? 600 : 500}
      fontSize="14px"
      _hover={active
        ? { bg: dark ? 'navDark.activeBg' : 'nav.activeBg', color: dark ? 'navDark.fg' : 'nav.activeFg' }
        : { bg: dark ? 'navDark.hoverBg' : 'nav.hoverBg', color: dark ? 'navDark.fg' : 'fg' }}
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
  dark,
}: Pick<InnerPanelProps, 'viewMode' | 'outerSection' | 'selectedClientId' | 'onSelectClient'> & { dark: boolean }): PanelConfig {
  // Owner view
  if (viewMode === 'owner') {
    if (outerSection === 'home') {
      return {
        header: <CompanyChip name={ownerCompany.name} initials={ownerCompany.initials} color={ownerCompany.logoColor} />,
        items: companyLenses,
      };
    }
    if (outerSection === 'documents') {
      return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600} color="inherit">Documents</Text>, items: documentsSubNav };
    }
    if (outerSection === 'reports') {
      return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600} color="inherit">Reports</Text>, items: reportsSubNav };
    }
    return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600} color="inherit">Settings</Text>, items: settingsSubNav };
  }

  // Advisor view
  if (outerSection === 'home') {
    return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600} color="inherit">Home</Text>, items: advisorHomeSubNav };
  }
  if (outerSection === 'clients') {
    if (selectedClientId) {
      return {
        header: <ClientSwitcher selectedClientId={selectedClientId} onSelectClient={onSelectClient} dark={dark} />,
        items: companyLenses.filter(l => l.id !== 'onboarding'),
      };
    }
    return {
      header: <ClientSwitcher selectedClientId={null} onSelectClient={onSelectClient} dark={dark} />,
      items: advisorClientsSubNav,
    };
  }
  if (outerSection === 'activity') {
    return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600} color="inherit">Activity</Text>, items: advisorActivitySubNav };
  }
  if (outerSection === 'documents') {
    return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600} color="inherit">Documents</Text>, items: documentsSubNav };
  }
  if (outerSection === 'reports') {
    return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600} color="inherit">Reports</Text>, items: reportsSubNav };
  }
  return { header: <Text px="2" py="2" fontSize="14px" fontWeight={600} color="inherit">Settings</Text>, items: settingsSubNav };
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
  dark = false,
}: InnerPanelProps) {
  const { header, items } = getPanelConfig({ viewMode, outerSection, selectedClientId, onSelectClient, dark });

  return (
    <Box
      w="full"
      display="flex"
      flexDir="column"
      overflowY="auto"
      flex="1"
      // Section-header texts use color="inherit" so one switch flips them all.
      color={dark ? 'navDark.fg' : 'fg'}
    >
      <PanelHeader>{header}</PanelHeader>
      <Stack gap="0.5" p="2">
        {items.map(item => (
          <PanelItem
            key={item.id}
            item={item}
            active={activeItemId === item.id}
            dark={dark}
            onClick={() => onSelectItem(item.id)}
          />
        ))}
      </Stack>
      {/* Co-brand footer — the advisory firm's mark anchors the workspace */}
      <Box mt="auto" pt="4" pb="4" px="2" borderTopWidth="1px" borderColor={dark ? 'navDark.border' : 'border.subtle'}>
        <CoBrand variant="partnership" onDark={dark} />
      </Box>
    </Box>
  );
}

export function InnerPanel(props: InnerPanelProps) {
  const dark = props.dark ?? false;
  return (
    <Box
      as="aside"
      w={{ base: 'full', md: 'shell.panel' }}
      // Dark: continues the rail's forest surface — one nav block, no divider.
      bg={dark ? 'navDark.bg' : 'bg'}
      backgroundImage={dark ? navDarkGradient : undefined}
      backgroundAttachment={dark ? 'fixed' : undefined}
      borderRightWidth={{ base: 0, md: dark ? 0 : '1px' }}
      borderColor="border.subtle"
      flexShrink={0}
      display={{ base: 'none', md: 'flex' }}
      flexDir="column"
      position={{ base: 'static', md: 'sticky' }}
      top={{ md: 0 }}
      h={{ md: '100vh' }}
    >
      <InnerPanelBody {...props} />
    </Box>
  );
}

