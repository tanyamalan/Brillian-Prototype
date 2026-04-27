import { useState } from 'react';
import { Drawer, Flex, Portal } from '@chakra-ui/react';
import { OuterRail } from './OuterRail';
import { InnerPanel, InnerPanelBody } from './InnerPanel';
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
  const [innerDrawerOpen, setInnerDrawerOpen] = useState(false);

  // When the user picks a lens or client from inside the mobile drawer, close it.
  const handleInnerSelectAndClose = (id: string) => {
    onInnerSelect(id);
    setInnerDrawerOpen(false);
  };
  const handleClientSelectAndClose = (id: string | null) => {
    onSelectClient(id);
    setInnerDrawerOpen(false);
  };

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

      {/* Mobile drawer for the InnerPanel — opened from the topbar hamburger */}
      <Drawer.Root
        open={innerDrawerOpen}
        onOpenChange={(e) => setInnerDrawerOpen(e.open)}
        placement="start"
        size="xs"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content w="280px" h="100dvh">
              <InnerPanelBody
                viewMode={viewMode}
                outerSection={outerSection}
                activeItemId={innerActiveId}
                onSelectItem={handleInnerSelectAndClose}
                selectedClientId={selectedClientId}
                onSelectClient={handleClientSelectAndClose}
              />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      <Flex flex="1" minW="0" flexDir="column" pb={{ base: '20', md: '0' }}>
        <AppTopbar
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          onOpenMenu={() => setInnerDrawerOpen(true)}
        />
        {children}
      </Flex>
    </Flex>
  );
}
