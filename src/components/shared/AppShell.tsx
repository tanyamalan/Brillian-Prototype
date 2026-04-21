import { Flex } from '@chakra-ui/react';
import { AppSidebar } from './AppSidebar';
import { AppTopbar } from './AppTopbar';

interface AppShellProps {
  children: React.ReactNode;
  activeNav?: string;
  onNavChange?: (nav: string) => void;
}

export default function AppShell({ children, activeNav = 'dashboard', onNavChange }: AppShellProps) {
  return (
    <Flex minH="100vh" w="full" flexDir={{ base: 'column', md: 'row' }}>
      <AppSidebar activeNav={activeNav} onNavChange={onNavChange} />
      <Flex flex="1" minW="0" flexDir="column" pb={{ base: '16', md: '0' }}>
        <AppTopbar />
        {children}
      </Flex>
    </Flex>
  );
}
