import { Flex } from '@chakra-ui/react';
import { AppSidebar } from './AppSidebar';
import { AppTopbar } from './AppTopbar';
import type { ViewMode } from '../../App';

interface AppShellProps {
  children: React.ReactNode;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  activeNav?: string;
  onNavChange?: (nav: string) => void;
  selectedClientId: string | null;
  onSelectClient: (clientId: string) => void;
}

export default function AppShell({
  children,
  viewMode,
  onViewModeChange,
  activeNav = 'dashboard',
  onNavChange,
  selectedClientId,
  onSelectClient,
}: AppShellProps) {
  return (
    <Flex minH="100vh" w="full" flexDir={{ base: 'column', md: 'row' }}>
      <AppSidebar viewMode={viewMode} activeNav={activeNav} onNavChange={onNavChange} />
      <Flex flex="1" minW="0" flexDir="column" pb={{ base: '16', md: '0' }}>
        <AppTopbar
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          selectedClientId={selectedClientId}
          onSelectClient={onSelectClient}
        />
        {children}
      </Flex>
    </Flex>
  );
}
