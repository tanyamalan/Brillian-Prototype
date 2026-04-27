import { Flex } from '@chakra-ui/react';
import { OuterRail } from './OuterRail';
import { InnerPanel } from './InnerPanel';
import { AppTopbar } from './AppTopbar';
import type { ViewMode } from './navConfig';

interface AppShellProps {
  children: React.ReactNode;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  outerSection: string;
  onOuterSectionChange: (id: string) => void;
  innerActiveId: string;
  onInnerSelect: (id: string) => void;
  selectedClientId: string | null;
  onSelectClient: (id: string | null) => void;
}

export default function AppShell({
  children,
  viewMode,
  onViewModeChange,
  outerSection,
  onOuterSectionChange,
  innerActiveId,
  onInnerSelect,
  selectedClientId,
  onSelectClient,
}: AppShellProps) {
  return (
    <Flex minH="100vh" w="full" flexDir={{ base: 'column', md: 'row' }}>
      <OuterRail viewMode={viewMode} activeId={outerSection} onSelect={onOuterSectionChange} />
      <InnerPanel
        viewMode={viewMode}
        outerSection={outerSection}
        activeItemId={innerActiveId}
        onSelectItem={onInnerSelect}
        selectedClientId={selectedClientId}
        onSelectClient={onSelectClient}
      />
      <Flex flex="1" minW="0" flexDir="column" pb={{ base: '20', md: '0' }}>
        <AppTopbar viewMode={viewMode} onViewModeChange={onViewModeChange} />
        {children}
      </Flex>
    </Flex>
  );
}
